/* ============================================================================
   Gera as Etapas 3 e 6 do plano executivo a partir do catálogo.

   Escrever 300 linhas de tabela à mão em um documento de conselho é garantia de
   duas coisas: erro de contagem e divergência com o que está no ar. Aqui o
   documento é uma função do dado. Mudou o catálogo, roda:

       npm run docs:catalogo

   e as Etapas 3 e 6 nascem de novo, coerentes com a loja em produção.
   ========================================================================== */

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  CATEGORIAS, PRODUTOS, PARCEIROS, MOMENTOS, TOTAL_PRODUTOS, formatarFaixa,
} from "../src/dados/catalogo.js";
import { KITS } from "../src/dados/kits.js";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const destino = resolve(raiz, "docs/loja-fn");
mkdirSync(destino, { recursive: true });

const AVISO =
  "> Documento gerado por `npm run docs:catalogo` a partir de `src/dados/catalogo.js` e\n" +
  "> `src/dados/kits.js` — as mesmas fontes que alimentam a loja em produção. Não edite\n" +
  "> este arquivo à mão: edite o dado e rode o comando de novo.\n";

const rotuloPrioridade = { A: "A — Lançamento", B: "B — Segunda onda", C: "C — Cauda longa" };
const dinheiro = (v) => `R$ ${v.toLocaleString("pt-BR")}`;
const pct = (v) => String(v).replace(".", ",");

/* ---------------------------------------------------------------------------
   Etapa 3 — catálogo
   --------------------------------------------------------------------------- */
function etapa3() {
  const l = [];
  l.push("# Etapa 3 — Os 300 produtos, por categoria e prioridade\n");
  l.push(AVISO);
  l.push("");
  l.push(
    `O catálogo de lançamento tem **${TOTAL_PRODUTOS} produtos** em **${CATEGORIAS.length} categorias**. ` +
    "A regra de entrada é uma só: o item precisa aparecer na rotina real de quem acabou de receber " +
    "um apartamento. Comissão não é critério de entrada — é critério de esforço de mídia depois que " +
    "o item já provou que é útil.\n"
  );
  l.push("## Como ler as métricas\n");
  l.push(
    "| Métrica | O que significa na prática |\n|---|---|\n" +
    "| **Ticket** | Faixa de preço observada no varejo brasileiro para os itens da categoria. Indicativa: a loja não controla preço. |\n" +
    "| **Comissão** | Faixa realista dos programas de afiliados para a categoria. É a receita bruta da FN por venda. |\n" +
    "| **Recompra** | Chance de o mesmo cliente comprar de novo dentro de 12 meses. É o que separa categoria de aquisição de categoria de retenção. |\n" +
    "| **Facilidade** | Quanto esforço de convencimento a venda exige. Alta = o cliente já quer, só precisa saber onde. |\n" +
    "| **Logística** | Atrito de entrega e instalação. Importa porque atrito de terceiro respinga na reputação da FN. |\n" +
    "| **Risco** | Combinação de risco reputacional, jurídico e de devolução. |\n"
  );

  l.push("\n## Resumo do portfólio\n");
  l.push("| # | Categoria | Itens | Ticket | Comissão | Recompra | Facilidade | Logística | Risco |");
  l.push("|---|---|---|---|---|---|---|---|---|");
  for (const c of CATEGORIAS) {
    const n = PRODUTOS.filter((p) => p.categoria === c.id).length;
    l.push(
      `| ${c.prioridade} | **${c.nome}** | ${n} | ${formatarFaixa(c.ticket)} | ${pct(c.comissao[0])}–${pct(c.comissao[1])}% | ` +
      `${c.recompra} | ${c.facilidade} | ${c.logistica} | ${c.risco} |`
    );
  }

  const porPrioridade = { A: 0, B: 0, C: 0 };
  PRODUTOS.forEach((p) => porPrioridade[p.prioridade]++);
  l.push("\n**Distribuição por prioridade de curadoria:** " +
    Object.entries(porPrioridade).map(([k, v]) => `${rotuloPrioridade[k]} — ${v} itens`).join(" · "));

  const porMomento = {};
  PRODUTOS.forEach((p) => { porMomento[p.momento] = (porMomento[p.momento] ?? 0) + 1; });
  l.push("\n**Distribuição por momento da jornada:** " +
    Object.keys(MOMENTOS).filter((m) => porMomento[m])
      .map((m) => `${MOMENTOS[m].rotulo} — ${porMomento[m]}`).join(" · "));

  const porParceiro = {};
  PRODUTOS.forEach((p) => { porParceiro[p.parceiro] = (porParceiro[p.parceiro] ?? 0) + 1; });
  l.push("\n**Concentração por parceiro** (risco de dependência — nenhum deve passar de ~30%):\n");
  l.push("| Parceiro | Itens | Participação |");
  l.push("|---|---|---|");
  for (const [k, v] of Object.entries(porParceiro).sort((a, b) => b[1] - a[1])) {
    l.push(`| ${PARCEIROS[k].nome} | ${v} | ${((v / TOTAL_PRODUTOS) * 100).toFixed(1)}% |`);
  }

  l.push("\n---\n\n## Catálogo completo\n");
  for (const c of CATEGORIAS) {
    const itens = PRODUTOS.filter((p) => p.categoria === c.id)
      .sort((a, b) => ({ A: 0, B: 1, C: 2 })[a.prioridade] - ({ A: 0, B: 1, C: 2 })[b.prioridade]
        || a.nome.localeCompare(b.nome, "pt-BR"));

    l.push(`### ${c.prioridade}. ${c.nome}\n`);
    l.push(`**Por que esta categoria existe (visão de portfólio).** ${c.porque}\n`);
    l.push(`**O que dizemos ao cliente.** ${c.porqueCliente}\n`);
    if (c.antesDeComprar) l.push(`**Alerta de curadoria.** ${c.antesDeComprar}\n`);
    if (c.nota) l.push(`**Regra interna.** ${c.nota}\n`);
    l.push(
      `| Ticket | Comissão | Recompra | Facilidade | Logística | Risco | Momento-âncora |\n` +
      `|---|---|---|---|---|---|---|\n` +
      `| ${formatarFaixa(c.ticket)} | ${pct(c.comissao[0])}–${pct(c.comissao[1])}% | ${c.recompra} | ${c.facilidade} | ` +
      `${c.logistica} | ${c.risco} | ${MOMENTOS[c.momento].rotulo} |\n`
    );
    l.push("| # | Produto | Prioridade | Faixa de preço | Momento | Parceiro sugerido |");
    l.push("|---|---|---|---|---|---|");
    itens.forEach((p, i) => {
      l.push(`| ${i + 1} | ${p.nome} | ${p.prioridade} | ${formatarFaixa(p.faixa)} | ` +
        `${MOMENTOS[p.momento].rotulo} | ${PARCEIROS[p.parceiro].nome} |`);
    });
    l.push("");
  }

  return l.join("\n");
}

/* ---------------------------------------------------------------------------
   Etapa 6 — kits
   --------------------------------------------------------------------------- */
function etapa6() {
  const l = [];
  l.push("# Etapa 6 — Os Kits FN\n");
  l.push(AVISO);
  l.push("");
  l.push(
    `São **${KITS.length} kits**, cobrindo ${new Set(KITS.map((k) => k.momento)).size} momentos da jornada. ` +
    "Kit não é 'lista com desconto': é a resposta pronta para uma pergunta que o cliente faz sozinho, " +
    "à meia-noite, com a caixa da mudança ainda fechada. Por isso o recorte é por **momento**, não por " +
    "departamento de loja — e por isso o mesmo produto aparece em kits diferentes.\n"
  );

  l.push("## Visão geral\n");
  l.push("| Kit | Momento | Itens | Investimento estimado | Destaque no lançamento |");
  l.push("|---|---|---|---|---|");
  for (const k of KITS) {
    l.push(`| **${k.nome}** | ${MOMENTOS[k.momento].rotulo} | ${k.itens.length} | ` +
      `${dinheiro(k.faixa[0])} – ${dinheiro(k.faixa[1])} | ${k.destaque ? "Sim" : "—"} |`);
  }
  l.push("\n> As faixas somam as pontas de cada item e servem para o cliente se planejar. " +
    "Não são preço de kit: a FN não vende kit, ela indica os itens.\n");

  l.push("---\n");
  for (const k of KITS) {
    l.push(`## ${k.nome}\n`);
    l.push(`*${k.chamada}*\n`);
    l.push(`- **Momento:** ${MOMENTOS[k.momento].rotulo} — ${MOMENTOS[k.momento].descricao}`);
    l.push(`- **Para quem:** ${k.publico}`);
    l.push(`- **Investimento estimado:** ${dinheiro(k.faixa[0])} a ${dinheiro(k.faixa[1])} (${k.itens.length} itens)`);
    l.push(`\n**Por que este kit existe.** ${k.porque}\n`);
    l.push("| Item | Faixa | Categoria | Parceiro |");
    l.push("|---|---|---|---|");
    for (const p of k.itens) {
      const cat = CATEGORIAS.find((c) => c.id === p.categoria);
      l.push(`| ${p.nome} | ${formatarFaixa(p.faixa)} | ${cat.nome} | ${PARCEIROS[p.parceiro].nome} |`);
    }
    l.push("");
  }

  return l.join("\n");
}

writeFileSync(resolve(destino, "03-catalogo-300-produtos.md"), etapa3(), "utf8");
writeFileSync(resolve(destino, "06-kits-fn.md"), etapa6(), "utf8");
console.log(`Etapa 3 e Etapa 6 geradas em docs/loja-fn/ (${TOTAL_PRODUTOS} produtos, ${KITS.length} kits).`);
