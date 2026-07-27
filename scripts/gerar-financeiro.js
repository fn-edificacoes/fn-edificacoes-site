/* ============================================================================
   Gera a Etapa 9 — plano financeiro de 24 meses em três cenários.

       npm run docs:financeiro

   Por que gerado e não digitado: uma planilha de 24 meses × 3 cenários tem 72
   colunas de contas encadeadas. Escrita à mão, ela chega ao conselho com erro
   de arredondamento em algum lugar — e um número errado desmonta a confiança
   no documento inteiro. Aqui as premissas ficam explícitas no topo e a
   aritmética é responsabilidade da máquina.

   A tese que o modelo revela — e que é o achado mais importante do plano:
   a receita de afiliados sobre a base própria da FN NUNCA chega a R$ 100 mil
   por mês. A base é pequena demais para isso, por melhor que seja a conversão.
   O dinheiro grande está em (B) audiência que não é cliente da FN e, sobretudo,
   em (C) serviços locais com comissão negociada. O marketplace de afiliados é
   o motor de tráfego e de confiança; a margem vem depois dele.
   ========================================================================== */

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const destino = resolve(raiz, "docs/loja-fn");
mkdirSync(destino, { recursive: true });

const MESES = 24;
/* O plano pede 24 meses, mas as duas metas declaradas (R$ 100 mil/mês e
   R$ 1 milhão/ano) podem cair fora dessa janela. Projetar 36 meses só para
   responder "quando" é mais útil ao conselho do que dizer "não atingido". */
const MESES_META = 36;

/* Curva de compra do cliente novo: quanto do gasto de 12 meses acontece em cada
   mês depois da chave. Vem da Etapa 2 — a compra é fortemente concentrada no
   primeiro trimestre e cai rápido. Soma 1. */
const CURVA = [0.26, 0.21, 0.15, 0.11, 0.08, 0.06, 0.045, 0.035, 0.025, 0.015, 0.01, 0.005];

/* Folha em degraus. Uma unidade nova não contrata o time inteiro no mês 1 —
   ela contrata quando a receita anterior justifica. Modelar folha achatada em
   cenário ruim é modelar uma empresa sem gestão: no cenário conservador o time
   simplesmente não cresce, porque não houve resultado que pagasse o próximo
   contratado. */
const escada = (degraus) => degraus.flatMap(([meses, valor]) => Array(meses).fill(valor));

const CENARIOS = {
  conservador: {
    rotulo: "Conservador",
    resumo: "Programas de afiliados demoram a aprovar, o conteúdo não engata e o FN Club " +
            "converte pouco. É o cenário de teste da tese, não de fracasso.",
    // (A) base própria da FN
    novosMes: 45, crescimentoNovos: 0.010, ativacao: 0.40, conversao: 0.35,
    gmvComprador: 2400, comissaoBase: 0.038,
    legado: 1000, reativacaoLegado: 0.12, conversaoLegado: 0.18, gmvLegado: 600,
    /* (B) audiência externa (conteúdo e busca).
       `tetoSessoes` e `tetoServ` não são limites de esforço: representam o
       tamanho do mercado endereçável na Região Metropolitana do Recife. Sem
       sair de PE, é aqui que a curva para — e é essa constatação, e não a
       falta de empenho, que justifica os planos de expansão e licenciamento
       da Etapa 12. */
    sessoes0: 1200, crescimentoSessoes: 0.14, tetoSessoes: 45000,
    ctrSaida: 0.09, conversaoClique: 0.045, gmvPedido: 320, comissaoExterna: 0.045,
    // (C) serviços locais com comissão negociada
    serv0: 2, crescimentoServ: 0.13, tetoServ: 45, ticketServ: 2400, comissaoServ: 0.10,
    // custos
    investimentoInicial: 34000,
    /* Time mínimo, quase todo compartilhado com a operação de vistoria: um
       coordenador de meio período e um freelancer de conteúdo. Nesse cenário a
       unidade não contrata ninguém novo, porque o resultado não apareceu. */
    pessoal: escada([[3, 3500], [3, 5000], [3, 6500], [3, 7500], [6, 9000], [6, 10500]]),
    midia: (m) => (m <= 6 ? 500 : m <= 12 ? 1200 : 2500),
    ferramentas: (m) => (m <= 6 ? 400 : m <= 12 ? 700 : 1100),
    conteudo: (m) => (m <= 6 ? 600 : 1200),
    juridicoContabil: 700,
  },
  realista: {
    rotulo: "Realista",
    resumo: "Execução disciplinada do plano de implantação, com os quatro programas " +
            "principais aprovados até o mês 3 e o FN Club estruturado no primeiro semestre.",
    novosMes: 60, crescimentoNovos: 0.025, ativacao: 0.55, conversao: 0.45,
    gmvComprador: 3200, comissaoBase: 0.042,
    legado: 1000, reativacaoLegado: 0.22, conversaoLegado: 0.25, gmvLegado: 800,
    sessoes0: 2000, crescimentoSessoes: 0.19, tetoSessoes: 130000,
    ctrSaida: 0.12, conversaoClique: 0.06, gmvPedido: 380, comissaoExterna: 0.05,
    serv0: 4, crescimentoServ: 0.17, tetoServ: 115, ticketServ: 2800, comissaoServ: 0.12,
    investimentoInicial: 65000,
    /* Começa com um coordenador e conteúdo terceirizado; o curador entra no
       mês 4, o analista de parcerias no mês 7 e o CS dedicado no mês 13 —
       cada um depois de a receita anterior justificar. */
    pessoal: escada([[3, 5000], [3, 8500], [6, 12000], [6, 17000], [6, 22000]]),
    midia: (m) => (m <= 6 ? 1200 : m <= 12 ? 3500 : 6500),
    ferramentas: (m) => (m <= 6 ? 600 : m <= 12 ? 1200 : 1800),
    conteudo: (m) => (m <= 6 ? 1200 : 2200),
    juridicoContabil: 1200,
  },
  agressivo: {
    rotulo: "Agressivo",
    resumo: "A FN trata a loja como unidade de negócio desde o dia 1: time dedicado, " +
            "verba de mídia real, acordo com duas construtoras e licenciamento iniciado no ano 2.",
    novosMes: 85, crescimentoNovos: 0.038, ativacao: 0.65, conversao: 0.52,
    gmvComprador: 3900, comissaoBase: 0.046,
    legado: 1000, reativacaoLegado: 0.32, conversaoLegado: 0.30, gmvLegado: 1000,
    sessoes0: 3500, crescimentoSessoes: 0.24, tetoSessoes: 320000,
    ctrSaida: 0.14, conversaoClique: 0.07, gmvPedido: 430, comissaoExterna: 0.055,
    serv0: 7, crescimentoServ: 0.21, tetoServ: 300, ticketServ: 3200, comissaoServ: 0.13,
    investimentoInicial: 96000,
    /* Time dedicado desde o início, porque a tese aqui é ocupar o espaço antes
       de qualquer concorrente perceber que ele existe. */
    pessoal: escada([[3, 9000], [3, 14000], [6, 20000], [6, 28000], [6, 35000]]),
    midia: (m) => (m <= 6 ? 3500 : m <= 12 ? 9000 : 18000),
    ferramentas: (m) => (m <= 6 ? 900 : m <= 12 ? 1800 : 3000),
    conteudo: (m) => (m <= 6 ? 3000 : 5000),
    juridicoContabil: 1800,
  },
};

function projetar(p, horizonte = MESES) {
  const linhas = [];
  /* Coortes de clientes novos: o gasto de quem recebeu a chave no mês m se
     espalha pelos 12 meses seguintes segundo a CURVA. */
  const gmvBasePorMes = new Array(horizonte + 13).fill(0);

  for (let m = 1; m <= horizonte; m++) {
    const novos = p.novosMes * Math.pow(1 + p.crescimentoNovos, m - 1);
    const compradores = novos * p.ativacao * p.conversao;
    const gmvCoorte = compradores * p.gmvComprador;
    CURVA.forEach((peso, i) => { gmvBasePorMes[m + i] += gmvCoorte * peso; });
  }

  /* Base legada: 1.000 clientes atendidos, reativados ao longo do primeiro
     semestre. Compram menos e uma vez só — já montaram o apartamento. */
  const legadoAtivadoPorMes = p.legado * p.reativacaoLegado / 6;
  for (let m = 1; m <= 6; m++) {
    const gmv = legadoAtivadoPorMes * p.conversaoLegado * p.gmvLegado;
    CURVA.slice(0, 6).forEach((peso, i) => { gmvBasePorMes[m + i] += gmv * peso * 1.6; });
  }

  let caixa = -p.investimentoInicial;
  let mesBreakeven = null, mesPayback = null;
  let acumReceita = 0, acumCusto = p.investimentoInicial;

  for (let m = 1; m <= horizonte; m++) {
    // (A) base própria
    const gmvA = gmvBasePorMes[m];
    const recA = gmvA * p.comissaoBase;

    // (B) audiência externa
    const sessoes = Math.min(p.sessoes0 * Math.pow(1 + p.crescimentoSessoes, m - 1), p.tetoSessoes);
    const cliques = sessoes * p.ctrSaida;
    const pedidos = cliques * p.conversaoClique;
    const gmvB = pedidos * p.gmvPedido;
    const recB = gmvB * p.comissaoExterna;

    // (C) serviços do FN Club
    const servicos = Math.min(p.serv0 * Math.pow(1 + p.crescimentoServ, m - 1), p.tetoServ);
    const gmvC = servicos * p.ticketServ;
    const recC = gmvC * p.comissaoServ;

    const receita = recA + recB + recC;
    /* Depois do mês 24 a folha segue no último degrau: o modelo estendido
       existe para datar as metas, não para planejar contratação do ano 3. */
    const custoPessoal = p.pessoal[Math.min(m, p.pessoal.length) - 1];
    const outros = p.midia(m) + p.ferramentas(m) + p.conteudo(m) + p.juridicoContabil;
    /* Impostos: Simples Nacional sobre receita de serviço/comissão, faixa
       inicial. Conservador o bastante para não subestimar. */
    const impostos = receita * 0.115;
    const custo = custoPessoal + outros + impostos;
    const resultado = receita - custo;

    caixa += resultado;
    acumReceita += receita;
    acumCusto += custo;

    if (mesBreakeven === null && resultado > 0) mesBreakeven = m;
    if (mesPayback === null && caixa > 0) mesPayback = m;

    linhas.push({
      m, sessoes, cliques, pedidos, servicos,
      gmv: gmvA + gmvB + gmvC, recA, recB, recC, receita,
      custo, resultado, caixa, acumReceita, acumCusto,
    });
  }

  const ultimo = linhas[Math.min(horizonte, MESES) - 1];
  const roi = (acumReceita - acumCusto) / acumCusto;

  return { linhas, mesBreakeven, mesPayback, roi, ultimo, acumReceita, acumCusto };
}

/* ---------------------------------------------------------------------------
   Saída
   --------------------------------------------------------------------------- */
const r0 = (v) => Math.round(v).toLocaleString("pt-BR");
const rs = (v) => `R$ ${r0(v)}`;
const mil = (v) => `R$ ${(v / 1000).toFixed(1).replace(".", ",")} mil`;

const resultados = Object.fromEntries(
  Object.entries(CENARIOS).map(([k, p]) => [k, projetar(p)])
);

const l = [];
l.push("# Etapa 9 — Plano financeiro: 24 meses em três cenários\n");
l.push(
  "> Documento gerado por `npm run docs:financeiro` a partir de `scripts/gerar-financeiro.js`.\n" +
  "> As premissas estão no topo do script e são o objeto real da discussão do conselho —\n" +
  "> o resto é aritmética. Para simular outro cenário, mude a premissa e rode de novo.\n"
);
l.push("");
l.push("## Aviso de método\n");
l.push(
  "Estas são **projeções construídas sobre premissas declaradas**, não previsões. Nenhum número " +
  "aqui vem de contrato assinado: as taxas de comissão são as faixas públicas dos programas de " +
  "afiliados, e as taxas de conversão são referências de mercado aplicadas à realidade da FN. " +
  "O valor do modelo não está no número final — está em tornar discutível **qual premissa** " +
  "precisa ser verdadeira para o negócio funcionar.\n"
);

l.push("## O achado que reorganiza o plano\n");
l.push(
  "A base própria da FN **não sustenta sozinha** a meta de R$ 100 mil/mês em comissões, e isso não " +
  "é falha de execução: é aritmética. Com ~60 entregas novas por mês e um gasto capturável de " +
  "~R$ 3.200 por cliente, a receita de afiliados sobre a base própria estabiliza na casa de poucos " +
  "milhares de reais mensais. Para chegar a R$ 100 mil/mês seriam necessários mais de R$ 2 milhões " +
  "de GMV mensal — cerca de 600 apartamentos comprando tudo pela loja, todo mês.\n"
);
l.push(
  "A conclusão estratégica não é abandonar a meta: é entender **de onde ela vem**. Três motores, " +
  "em ordem crescente de margem e decrescente de volume:\n"
);
l.push(
  "| Motor | O que é | Papel | Comissão típica |\n|---|---|---|---|\n" +
  "| **A. Base FN** | Clientes de vistoria, no momento da chave | Prova de conceito, confiança e conteúdo real | 3–5% |\n" +
  "| **B. Audiência externa** | Quem recebeu apartamento e chega por busca e vídeo | Escala de volume | 4–6% |\n" +
  "| **C. Serviços do FN Club** | Box, cortina, climatização, marcenaria, rede de proteção | **Onde está a margem** | 10–15% |\n"
);
l.push(
  "O marketplace de afiliados é o **motor de tráfego e de credibilidade**. A margem que paga a " +
  "operação vem dos serviços locais negociados — que só existem porque a curadoria e o laudo " +
  "vieram antes. Quem tentar copiar a loja sem o laudo copia o motor errado.\n"
);

/* --- comparativo --- */
l.push("---\n\n## Comparativo dos três cenários\n");
l.push("| Indicador | Conservador | Realista | Agressivo |");
l.push("|---|---|---|---|");
const linhaComp = (rotulo, fn) =>
  l.push(`| ${rotulo} | ${fn(resultados.conservador)} | ${fn(resultados.realista)} | ${fn(resultados.agressivo)} |`);

l.push(`| Investimento inicial | ${rs(CENARIOS.conservador.investimentoInicial)} | ${rs(CENARIOS.realista.investimentoInicial)} | ${rs(CENARIOS.agressivo.investimentoInicial)} |`);
linhaComp("Receita mês 12", (r) => rs(r.linhas[11].receita));
linhaComp("Receita mês 24", (r) => rs(r.ultimo.receita));
linhaComp("Receita acumulada 24 meses", (r) => rs(r.acumReceita));
linhaComp("GMV mês 24", (r) => rs(r.ultimo.gmv));
linhaComp("Resultado mensal no mês 24", (r) => rs(r.ultimo.resultado));
linhaComp("Caixa acumulado no mês 24", (r) => rs(r.ultimo.caixa));
linhaComp("Mês do primeiro resultado positivo", (r) => (r.mesBreakeven ? `Mês ${r.mesBreakeven}` : "Não atinge em 24m"));
linhaComp("Mês de payback do investimento", (r) => (r.mesPayback ? `Mês ${r.mesPayback}` : "Não atinge em 24m"));
linhaComp("ROI em 24 meses", (r) => `${(r.roi * 100).toFixed(0)}%`);

/* --- as duas metas declaradas --- */
l.push("\n### Quando cada meta declarada acontece\n");
l.push(
  "A pergunta do briefing é direta: quando a loja faz **R$ 100 mil por mês em comissões** e quando " +
  "faz **R$ 1 milhão por ano em receita**? Para responder sem chutar, o modelo foi estendido a " +
  `${MESES_META} meses mantendo as mesmas premissas — a folha congela no último degrau, porque a ` +
  "extensão existe para datar a meta, não para planejar o ano 3.\n"
);
l.push("| Cenário | R$ 100 mil/mês | R$ 1 milhão/ano (receita acumulada em 12 meses) | Receita no mês 36 |");
l.push("|---|---|---|---|");
for (const [chave, p] of Object.entries(CENARIOS)) {
  const longo = projetar(p, MESES_META);
  const meta100 = longo.linhas.find((x) => x.receita >= 100000);
  const anualizado = longo.linhas.find((x, i) =>
    longo.linhas.slice(Math.max(0, i - 11), i + 1).reduce((s2, y) => s2 + y.receita, 0) >= 1000000);
  l.push(
    `| **${p.rotulo}** | ${meta100 ? `Mês ${meta100.m}` : `Não atinge em ${MESES_META} meses`} | ` +
    `${anualizado ? `Mês ${anualizado.m}` : `Não atinge em ${MESES_META} meses`} | ` +
    `${rs(longo.linhas[MESES_META - 1].receita)} |`
  );
}
l.push(
  "\nA leitura honesta, e ela é desconfortável: **o cenário realista nunca chega a R$ 100 mil por " +
  "mês.** Não por falta de execução — por falta de mercado. Ele estabiliza perto de R$ 60 mil " +
  "mensais porque, por volta do mês 20, a loja já terá alcançado praticamente todo mundo que " +
  "recebe apartamento na Região Metropolitana do Recife. Mais esforço sobre o mesmo território " +
  "produz mais custo, não mais receita.\n\n" +
  "Disso saem exatamente **dois caminhos para a meta**, e o conselho precisa escolher um:\n\n" +
  "1. **Postura agressiva desde o início** (investir ~50% a mais e contratar antes da receita): " +
  "leva a R$ 100 mil/mês no mês 18 e a R$ 1 milhão/ano no mês 21.\n" +
  "2. **Postura realista seguida de expansão geográfica ou licenciamento** a partir do mês 15, " +
  "quando o modelo já estiver provado em PE: cada nova praça replica a curva com investimento " +
  "marginal muito menor, porque catálogo, kits, automação e jurídico já existem.\n\n" +
  "O que **não** funciona é a terceira via silenciosa: manter a postura realista e esperar que a " +
  "meta chegue sozinha. Ela não chega. É por isso que a Etapa 12 não é um capítulo de sonho — é a " +
  "consequência aritmética deste modelo.\n"
);

/* --- detalhamento por cenário --- */
for (const [chave, res] of Object.entries(resultados)) {
  const p = CENARIOS[chave];
  l.push(`\n---\n\n## Cenário ${p.rotulo}\n`);
  l.push(`*${p.resumo}*\n`);
  l.push("### Premissas\n");
  l.push("| Premissa | Valor |\n|---|---|");
  l.push(`| Entregas novas atendidas pela FN no mês 1 | ${p.novosMes}/mês |`);
  l.push(`| Crescimento mensal das entregas | ${(p.crescimentoNovos * 100).toFixed(1).replace(".", ",")}% |`);
  l.push(`| Cliente FN que visita a loja | ${(p.ativacao * 100).toFixed(0)}% |`);
  l.push(`| Visitante FN que compra | ${(p.conversao * 100).toFixed(0)}% |`);
  l.push(`| GMV capturado por comprador em 12 meses | ${rs(p.gmvComprador)} |`);
  l.push(`| Comissão média sobre a base FN | ${(p.comissaoBase * 100).toFixed(1).replace(".", ",")}% |`);
  l.push(`| Sessões externas no mês 1 → teto | ${r0(p.sessoes0)} → ${r0(p.tetoSessoes)}/mês |`);
  l.push(`| Cliques de saída sobre sessões | ${(p.ctrSaida * 100).toFixed(0)}% |`);
  l.push(`| Cliques que viram pedido | ${(p.conversaoClique * 100).toFixed(1).replace(".", ",")}% |`);
  l.push(`| Ticket médio do pedido externo | ${rs(p.gmvPedido)} |`);
  l.push(`| Serviços FN Club fechados: mês 1 → teto | ${p.serv0} → ${p.tetoServ}/mês |`);
  l.push(`| Ticket médio do serviço · comissão | ${rs(p.ticketServ)} · ${(p.comissaoServ * 100).toFixed(0)}% |`);
  l.push(`| Investimento inicial (mês 0) | ${rs(p.investimentoInicial)} |`);
  l.push(`| Carga tributária sobre a receita | 11,5% (Simples Nacional, faixa inicial) |`);

  l.push("\n### Projeção mês a mês\n");
  l.push("| Mês | Sessões | Pedidos | Serviços | GMV | Rec. base | Rec. externa | Rec. serviços | **Receita** | Custo | Resultado | Caixa |");
  l.push("|---|---|---|---|---|---|---|---|---|---|---|---|");
  for (const x of res.linhas) {
    l.push(
      `| ${x.m} | ${r0(x.sessoes)} | ${r0(x.pedidos)} | ${r0(x.servicos)} | ${rs(x.gmv)} | ${rs(x.recA)} | ` +
      `${rs(x.recB)} | ${rs(x.recC)} | **${rs(x.receita)}** | ${rs(x.custo)} | ${rs(x.resultado)} | ${rs(x.caixa)} |`
    );
  }

  const a1 = res.linhas.slice(0, 12);
  const a2 = res.linhas.slice(12);
  const soma = (arr, k) => arr.reduce((s, x) => s + x[k], 0);
  l.push("\n### Resumo por ano\n");
  l.push("| | Ano 1 | Ano 2 |\n|---|---|---|");
  l.push(`| Receita | ${rs(soma(a1, "receita"))} | ${rs(soma(a2, "receita"))} |`);
  l.push(`| GMV movimentado | ${rs(soma(a1, "gmv"))} | ${rs(soma(a2, "gmv"))} |`);
  l.push(`| Custos | ${rs(soma(a1, "custo"))} | ${rs(soma(a2, "custo"))} |`);
  l.push(`| Resultado | ${rs(soma(a1, "resultado"))} | ${rs(soma(a2, "resultado"))} |`);
  l.push(`| Receita média mensal | ${rs(soma(a1, "receita") / 12)} | ${rs(soma(a2, "receita") / 12)} |`);

  l.push("\n### Indicadores\n");
  l.push(`- **Ponto de equilíbrio operacional:** ${res.mesBreakeven ? `mês ${res.mesBreakeven}` : "não atingido em 24 meses"}`);
  l.push(`- **Payback do investimento inicial:** ${res.mesPayback ? `mês ${res.mesPayback}` : "não atingido em 24 meses"}`);
  l.push(`- **ROI acumulado em 24 meses:** ${(res.roi * 100).toFixed(0)}%`);
  l.push(`- **Receita por cliente FN atendido (mês 24):** ${rs(res.ultimo.recA / (p.novosMes * Math.pow(1 + p.crescimentoNovos, 23)))}`);
  l.push(`- **Participação dos serviços FN Club na receita do mês 24:** ${((res.ultimo.recC / res.ultimo.receita) * 100).toFixed(0)}%`);
}

/* --- sensibilidade --- */
l.push("\n---\n\n## Análise de sensibilidade (cenário realista)\n");
l.push(
  "Qual premissa realmente move o resultado? Abaixo, o efeito de variar uma premissa por vez em " +
  "±25%, medido na receita do mês 24. É o mapa de onde vale gastar energia de gestão.\n"
);
const base = projetar(CENARIOS.realista).ultimo.receita;
const alavancas = [
  ["Comissão negociada dos serviços FN Club", "comissaoServ"],
  ["Volume de serviços FN Club fechados", "tetoServ"],
  ["Sessões externas (SEO e conteúdo)", "tetoSessoes"],
  ["Conversão do clique em pedido", "conversaoClique"],
  ["Ticket médio do serviço", "ticketServ"],
  ["GMV capturado por cliente FN", "gmvComprador"],
  ["Entregas novas por mês", "novosMes"],
  ["Ativação do cliente FN na loja", "ativacao"],
];
l.push("| Alavanca | −25% | Base | +25% | Amplitude |");
l.push("|---|---|---|---|---|");
for (const [rotulo, chave] of alavancas) {
  const menos = projetar({ ...CENARIOS.realista, [chave]: CENARIOS.realista[chave] * 0.75 }).ultimo.receita;
  const mais = projetar({ ...CENARIOS.realista, [chave]: CENARIOS.realista[chave] * 1.25 }).ultimo.receita;
  l.push(`| ${rotulo} | ${mil(menos)} | ${mil(base)} | ${mil(mais)} | **${mil(mais - menos)}** |`);
}
l.push(
  "\nA leitura é direta: **as três alavancas de maior amplitude são todas do motor C e do motor B**. " +
  "Nenhuma variação plausível na base própria da FN muda o destino do negócio — o que confirma que a " +
  "loja precisa nascer olhando para fora da base, usando a base como prova e não como mercado.\n"
);

writeFileSync(resolve(destino, "09-plano-financeiro.md"), l.join("\n"), "utf8");

console.log("Etapa 9 gerada. Resumo:");
for (const [k, r] of Object.entries(resultados)) {
  console.log(
    `  ${CENARIOS[k].rotulo.padEnd(12)} m12 ${rs(r.linhas[11].receita).padStart(12)} | ` +
    `m24 ${rs(r.ultimo.receita).padStart(12)} | acum ${rs(r.acumReceita).padStart(13)} | ` +
    `equilíbrio ${String(r.mesBreakeven ?? "—").padStart(3)} | payback ${String(r.mesPayback ?? "—").padStart(3)} | ` +
    `ROI ${(r.roi * 100).toFixed(0)}%`
  );
}
