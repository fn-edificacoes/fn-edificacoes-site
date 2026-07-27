/* ============================================================================
   Rastreio de saída — como a comissão encontra o caminho de volta.

   A loja não vende: ela encaminha. Todo o negócio depende de duas perguntas
   serem respondidas em cada clique:

     1. Esse clique veio da FN?      → resolvido pela `tag` do parceiro
     2. De QUAL cliente da FN veio?  → resolvido pelo `subid`

   A segunda é a que ninguém faz direito. Sem ela, o relatório do programa de
   afiliados diz "você vendeu R$ 40 mil" e não diz de quem — o que impede
   cashback do Clube, comissão de indicação e qualquer medição de LTV por
   cliente. Por isso o subid é tratado aqui como cidadão de primeira classe.

   Origem do subid, em ordem:
     ?fn=<id>   — o Sistema FN assina o link quando o cliente sai do painel
     localStorage — mantém a atribuição em visitas seguintes
     anônimo    — id aleatório, sem dado pessoal, só para não perder o funil

   O que NÃO é guardado: nome, e-mail, telefone, CPF. O identificador é opaco
   e criado pelo Sistema; a loja nunca precisa saber quem é a pessoa.
   ========================================================================== */

import { PARCEIROS } from "../dados/catalogo.js";

const CHAVE_ID = "fn.loja.id";
const CHAVE_CLIQUES = "fn.loja.cliques";
const CHAVE_FAVORITOS = "fn.loja.favoritos";
const CHAVE_CHAVES_EM = "fn.loja.chavesEm";

/* Endpoint de coleta. Fica nulo até o Sistema FN expor a rota — ver
   docs/loja-fn/integracao-sistema.md. Enquanto for nulo, o clique é
   registrado só no navegador e nada sai do dispositivo. */
const ENDPOINT_CLIQUES = null;

const temArmazenamento = (() => {
  try {
    const t = "__fn__";
    window.localStorage.setItem(t, t);
    window.localStorage.removeItem(t);
    return true;
  } catch {
    return false; // navegação anônima ou storage bloqueado: a loja continua funcionando
  }
})();

function ler(chave, padrao = null) {
  if (!temArmazenamento) return padrao;
  try {
    const bruto = window.localStorage.getItem(chave);
    return bruto === null ? padrao : JSON.parse(bruto);
  } catch {
    return padrao;
  }
}

function gravar(chave, valor) {
  if (!temArmazenamento) return;
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* cota estourada: perder o registro local é aceitável, quebrar a loja não */
  }
}

/* ---------------------------------------------------------------------------
   Identidade
   --------------------------------------------------------------------------- */

function idAnonimo() {
  const aleatorio =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  return `anon-${aleatorio.replace(/-/g, "").slice(0, 16)}`;
}

export function identidade() {
  const url = new URLSearchParams(window.location.search);
  const doSistema = url.get("fn");

  if (doSistema) {
    /* Só aceitamos o formato que o Sistema emite. Isso evita que alguém injete
       um subid arbitrário pela URL e roube atribuição de outro cliente. */
    const limpo = doSistema.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
    if (limpo) {
      gravar(CHAVE_ID, limpo);
      return { id: limpo, tipo: "cliente" };
    }
  }

  const guardado = ler(CHAVE_ID);
  if (guardado) {
    return { id: guardado, tipo: guardado.startsWith("anon-") ? "anonimo" : "cliente" };
  }

  const novo = idAnonimo();
  gravar(CHAVE_ID, novo);
  return { id: novo, tipo: "anonimo" };
}

/* Data de entrega das chaves, quando o Sistema informa (?chaves=AAAA-MM-DD).
   É o que permite recomendar por momento da jornada em vez de por categoria. */
export function dataDasChaves() {
  const url = new URLSearchParams(window.location.search);
  const doLink = url.get("chaves");
  if (doLink && /^\d{4}-\d{2}-\d{2}$/.test(doLink)) {
    gravar(CHAVE_CHAVES_EM, doLink);
    return doLink;
  }
  return ler(CHAVE_CHAVES_EM);
}

export function definirDataDasChaves(iso) {
  if (iso === null) {
    if (temArmazenamento) window.localStorage.removeItem(CHAVE_CHAVES_EM);
    return;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) gravar(CHAVE_CHAVES_EM, iso);
}

/* Converte "recebi as chaves em tal dia" no momento da jornada. Os cortes
   seguem a Etapa 2 do plano: são os pontos em que a necessidade do morador
   muda de natureza, não divisões redondas de calendário. */
export function momentoPelaData(iso) {
  if (!iso) return null;
  const dias = Math.floor((Date.now() - new Date(`${iso}T12:00:00`).getTime()) / 86_400_000);
  if (Number.isNaN(dias)) return null;
  if (dias < 3) return "D0";
  if (dias < 15) return "S1";
  if (dias < 45) return "M1";
  if (dias < 120) return "M3";
  if (dias < 240) return "M6";
  return "M12";
}

/* ---------------------------------------------------------------------------
   Link de saída
   --------------------------------------------------------------------------- */

/* O link é montado no clique, nunca guardado no catálogo: trocar de programa
   de afiliados passa a ser mudar uma linha em PARCEIROS, e não reescrever 300
   produtos. Enquanto `tag` estiver vazia, a URL sai limpa — busca do parceiro,
   sem parâmetro de comissão. */
export function montarLink(produto) {
  const parceiro = PARCEIROS[produto.parceiro];
  if (!parceiro?.busca) return null;

  const termo = encodeURIComponent(produto.nome);
  const base = `${parceiro.busca}${termo}${parceiro.sufixo ?? ""}`;

  const extras = [];
  if (parceiro.tag) extras.push(parceiro.tag);
  if (parceiro.subid) extras.push(`${parceiro.subid}=${encodeURIComponent(identidade().id)}`);
  if (!extras.length) return base;

  return `${base}${base.includes("?") ? "&" : "?"}${extras.join("&")}`;
}

/* ---------------------------------------------------------------------------
   Registro do clique
   --------------------------------------------------------------------------- */

export function registrarClique(produto, origem) {
  const evento = {
    id: produto.id,
    nome: produto.nome,
    categoria: produto.categoria,
    parceiro: produto.parceiro,
    origem,                       // "catalogo" | "kit:<id>" | "momento:<M>"
    em: new Date().toISOString(),
  };

  const historico = ler(CHAVE_CLIQUES, []);
  historico.push(evento);
  gravar(CHAVE_CLIQUES, historico.slice(-300));

  /* dataLayer é o contrato com o GTM: quando o Marketing plugar a tag, os
     eventos já estarão lá, sem precisar mexer no código da loja. */
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: "fn_loja_saida", ...evento, fn_id: identidade().id });
  }

  if (ENDPOINT_CLIQUES && navigator.sendBeacon) {
    try {
      navigator.sendBeacon(
        ENDPOINT_CLIQUES,
        new Blob([JSON.stringify({ ...evento, fn_id: identidade().id })], { type: "application/json" })
      );
    } catch {
      /* falha de rede não pode impedir a pessoa de chegar na loja do parceiro */
    }
  }
}

export function cliques() {
  return ler(CHAVE_CLIQUES, []);
}

/* ---------------------------------------------------------------------------
   Favoritos — a lista de compras do apartamento
   --------------------------------------------------------------------------- */

export function favoritos() {
  return new Set(ler(CHAVE_FAVORITOS, []));
}

export function alternarFavorito(id) {
  const atual = favoritos();
  atual.has(id) ? atual.delete(id) : atual.add(id);
  gravar(CHAVE_FAVORITOS, [...atual]);
  return atual;
}
