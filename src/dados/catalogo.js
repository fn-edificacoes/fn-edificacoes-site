/* ============================================================================
   Catálogo da Loja Recomendada FN — fonte única de verdade.

   Este arquivo alimenta ao mesmo tempo a vitrine em /loja/ e a documentação
   executiva em docs/loja-fn/. Se um produto sai daqui, ele some dos dois
   lugares — é de propósito: catálogo que vive em planilha vira catálogo
   desatualizado.

   Três decisões que explicam o formato:

   1. Faixa de preço, não preço. A FN não tem estoque nem controle de preço.
      Publicar "R$ 249,90" seria informação que envelhece em uma semana e
      arrasta responsabilidade de publicidade enganosa (CDC, art. 37). Cada
      item carrega uma FAIXA indicativa; o preço real é sempre o do parceiro,
      no momento do clique, e a interface diz isso.

   2. Métricas ficam na categoria, não no item. Ticket, margem, recompra e
      risco são decisões de portfólio. São elas que dizem onde a curadoria
      investe esforço — não o SKU individual.

   3. Nenhum link fixo de afiliado no dado. O produto guarda o parceiro
      sugerido; o link é montado em tempo de clique por `rastreio.js`, com a
      tag de afiliado e o subid do cliente. Assim, trocar de programa não
      exige reescrever 300 linhas.
   ========================================================================== */

/* Parceiros.

   `tag` é o fragmento de query que identifica a FN no programa de afiliados
   ("tag=fnedificacoes-20"); `subid` é o nome do parâmetro que carrega o
   identificador do cliente, para saber DE QUEM veio cada comissão.

   Os dois nascem vazios de propósito. Enquanto estiverem vazios, o link leva à
   busca do parceiro sem parâmetro nenhum: funciona, é honesto e não promete
   comissão que não existe. Preencher aqui — depois da aprovação em cada
   programa — é o único passo que liga a monetização da loja inteira.

   `artigo` existe porque "Ver no Amazon" e "Ver no Casas Bahia" soam como
   tradução automática — e a loja inteira depende de parecer escrita por gente. */
export const PARCEIROS = {
  ml:  { nome: "Mercado Livre",  artigo: "no",  busca: "https://lista.mercadolivre.com.br/",          tag: "", subid: "" },
  amz: { nome: "Amazon",         artigo: "na",  busca: "https://www.amazon.com.br/s?k=",              tag: "", subid: "" },
  shp: { nome: "Shopee",         artigo: "na",  busca: "https://shopee.com.br/search?keyword=",       tag: "", subid: "" },
  mgl: { nome: "Magalu",         artigo: "no",  busca: "https://www.magazineluiza.com.br/busca/",     tag: "", subid: "" },
  cb:  { nome: "Casas Bahia",    artigo: "nas", busca: "https://www.casasbahia.com.br/busca/",        tag: "", subid: "" },
  mm:  { nome: "MadeiraMadeira", artigo: "na",  busca: "https://www.madeiramadeira.com.br/busca?q=",  tag: "", subid: "" },
  lm:  { nome: "Leroy Merlin",   artigo: "na",  busca: "https://www.leroymerlin.com.br/search?term=", tag: "", subid: "" },
  /* AliExpress fecha a URL de busca com .html — daí o sufixo. */
  ali: { nome: "AliExpress", artigo: "no", busca: "https://pt.aliexpress.com/w/wholesale-", sufixo: ".html", tag: "", subid: "" },
  cf:  { nome: "Carrefour",      artigo: "no",  busca: "https://mercado.carrefour.com.br/busca/",     tag: "", subid: "" },
  /* Parceiro local do FN Club: não é marketplace. A conversa acontece pelo
     WhatsApp do Atendimento, que faz o encaminhamento e registra a indicação. */
  fab: { nome: "Parceiro do FN Club", artigo: "com", busca: "", tag: "", subid: "" },
};

/* Momentos da jornada. O mesmo eixo usado no plano executivo (Etapa 2) e nos
   gatilhos de automação (Etapa 8): é o que permite recomendar por tempo de
   chave, e não por "quem viu isso também viu". */
export const MOMENTOS = {
  D0: { rotulo: "Dia das chaves",      ordem: 0, descricao: "Vistoria, aceite e primeira noite" },
  S1: { rotulo: "Primeira semana",     ordem: 1, descricao: "Mudança, montagem e o que faltou" },
  M1: { rotulo: "Primeiro mês",        ordem: 2, descricao: "Instalações, medidas e compras grandes" },
  M3: { rotulo: "Até 3 meses",         ordem: 3, descricao: "Acabamento, conforto e decoração" },
  M6: { rotulo: "Até 6 meses",         ordem: 4, descricao: "Melhorias e upgrades" },
  M12:{ rotulo: "Primeiro ano",        ordem: 5, descricao: "Manutenção, reposição e garantia" },
};

/* Prioridade de curadoria:
   A = entra no ar no lançamento e aparece nos kits e nas automações.
   B = segunda onda, entra quando a categoria provar conversão.
   C = cauda longa, serve para completar busca e SEO, sem esforço de mídia. */
export const PRIORIDADES = { A: "Lançamento", B: "Segunda onda", C: "Cauda longa" };

/* ---------------------------------------------------------------------------
   Categorias, em ordem de prioridade estratégica.

   comissao  = faixa realista do programa de afiliados na categoria (%)
   recompra  = probabilidade de o mesmo cliente comprar de novo em 12 meses
   facilidade= quão pouco esforço de convencimento o item exige
   logistica = atrito de entrega/instalação que respinga na reputação da FN
   risco     = risco combinado (reputacional, jurídico, de devolução)

   ATENÇÃO: o campo `porque` aqui é raciocínio de portfólio — fala de ticket,
   comissão e concorrência. É para o conselho, não para o morador. O texto que
   o cliente lê na loja é o de PARA_O_CLIENTE, mais abaixo. Misturar os dois
   faria a vitrine explicar ao cliente por que ele é lucrativo, que é
   exatamente o oposto do que esta loja vende.
   --------------------------------------------------------------------------- */
const CATEGORIAS_BASE = [
  {
    id: "seguranca", nome: "Segurança e fechaduras", prioridade: 1, momento: "D0",
    porque:
      "É a única categoria em que a FN fala de dentro do laudo: quem acabou de receber um " +
      "apartamento com porta de entrada padrão da construtora tem uma dor concreta e datada. " +
      "Ticket médio alto para o esforço, decisão rápida e quase nenhuma concorrência de curadoria séria.",
    ticket: [80, 1600], comissao: [5, 9], recompra: "Baixa", facilidade: "Alta",
    logistica: "Simples, exceto instalação", risco: "Médio",
    nota: "Fechadura mal instalada gera chamado. Sempre oferecer instalador do FN Club junto.",
  },
  {
    id: "climatizacao", nome: "Climatização e conforto térmico", prioridade: 2, momento: "M1",
    porque:
      "Maior ticket do primeiro trimestre e item que praticamente todo apartamento novo no Nordeste " +
      "compra. A FN já sabe, pelo laudo, se a unidade tem infraestrutura de dreno e ponto elétrico — " +
      "isso transforma uma recomendação genérica em consultoria, que é o nosso diferencial.",
    ticket: [130, 5200], comissao: [3, 6], recompra: "Baixa", facilidade: "Alta",
    logistica: "Volumosa e com instalação", risco: "Alto",
    nota: "Nunca recomendar BTU sem os dados da unidade. Erro de dimensionamento vira reclamação da FN.",
  },
  {
    id: "hidraulica", nome: "Hidráulica e áreas molhadas", prioridade: 3, momento: "D0",
    porque:
      "Nasce direto das não conformidades do laudo: ralo, sifão, vedação, ducha higiênica ausente. " +
      "É a categoria onde a recomendação FN tem autoridade técnica inquestionável e o cliente compra " +
      "no mesmo dia, porque a dor é imediata.",
    ticket: [15, 1500], comissao: [4, 8], recompra: "Média", facilidade: "Alta",
    logistica: "Simples", risco: "Baixo",
  },
  {
    id: "eletrica", nome: "Elétrica, energia e proteção", prioridade: 4, momento: "D0",
    porque:
      "Baixo ticket, altíssima facilidade e recompra real. Protege os eletrodomésticos que o cliente " +
      "acabou de comprar — argumento que se vende sozinho e ancora bem no laudo elétrico.",
    ticket: [20, 900], comissao: [4, 8], recompra: "Média", facilidade: "Alta",
    logistica: "Simples", risco: "Baixo",
  },
  {
    id: "cozinha-eletro", nome: "Cozinha — eletroportáteis", prioridade: 5, momento: "S1",
    porque:
      "Categoria de entrada do e-commerce brasileiro: o cliente já compraria de qualquer jeito, " +
      "a questão é onde. Alta frequência, decisão rápida e ótimo desempenho em conteúdo curto.",
    ticket: [35, 2500], comissao: [3, 6], recompra: "Alta", facilidade: "Alta",
    logistica: "Simples", risco: "Baixo",
  },
  {
    id: "cozinha-utensilios", nome: "Cozinha — utensílios e mesa", prioridade: 6, momento: "D0",
    porque:
      "Ticket individual baixo, mas é a categoria que mais entra em kit. Serve como recheio de " +
      "cesta e eleva o valor do pedido sem elevar o esforço de venda.",
    ticket: [30, 900], comissao: [4, 10], recompra: "Alta", facilidade: "Alta",
    logistica: "Simples", risco: "Baixo",
  },
  {
    id: "organizacao", nome: "Organização e armazenamento", prioridade: 7, momento: "S1",
    porque:
      "Conteúdo de organização é o formato de maior alcance orgânico em vídeo curto no Brasil. " +
      "Comissão percentual alta, produto barato, devolução baixa: é a categoria que sustenta " +
      "volume de cliques enquanto as categorias de ticket alto maturam.",
    ticket: [25, 450], comissao: [6, 14], recompra: "Alta", facilidade: "Alta",
    logistica: "Simples", risco: "Baixo",
  },
  {
    id: "eletro-grandes", nome: "Eletrodomésticos de linha branca", prioridade: 8, momento: "D0",
    porque:
      "Onde está o dinheiro do cliente: sozinha responde por perto da metade do orçamento de " +
      "montar o apartamento. Comissão percentual baixa, mas o valor absoluto por conversão é o " +
      "maior do catálogo. Exige curadoria de medidas — e medida é o que a FN tem no laudo.",
    ticket: [350, 8000], comissao: [1.5, 4], recompra: "Baixa", facilidade: "Média",
    logistica: "Volumosa, com agendamento", risco: "Alto",
    nota: "Checar vão de embutir e porta de entrada antes de recomendar. É a causa nº 1 de devolução.",
  },
  {
    id: "iluminacao", nome: "Iluminação", prioridade: 9, momento: "S1",
    porque:
      "Apartamento novo é entregue com ponto de luz pendurado. Necessidade universal, ticket " +
      "acessível, e o cliente compra várias vezes ao longo do primeiro ano conforme mobilia.",
    ticket: [15, 700], comissao: [4, 10], recompra: "Alta", facilidade: "Alta",
    logistica: "Simples", risco: "Baixo",
  },
  {
    id: "cama-mesa-banho", nome: "Cama, mesa e banho", prioridade: 10, momento: "D0",
    porque:
      "Compra obrigatória da primeira noite e uma das poucas com recompra previsível dentro dos " +
      "12 meses. Colchão e base puxam o ticket da categoria para cima.",
    ticket: [35, 4000], comissao: [3, 8], recompra: "Alta", facilidade: "Alta",
    logistica: "Mista (colchão é volumoso)", risco: "Médio",
  },
  {
    id: "banheiro", nome: "Banheiro", prioridade: 11, momento: "M1",
    porque:
      "Box e espelho são as duas primeiras compras de acabamento de quase toda unidade nova, e " +
      "ambas são serviço com medida — território natural do FN Club, com comissão negociada " +
      "direto e sem depender de marketplace.",
    ticket: [25, 3500], comissao: [5, 15], recompra: "Média", facilidade: "Alta",
    logistica: "Sob medida, com instalação", risco: "Médio",
  },
  {
    id: "moveis", nome: "Móveis essenciais", prioridade: 12, momento: "M1",
    porque:
      "Segundo maior bolso do cliente. Comissão percentual média, mas o valor absoluto é alto e " +
      "MadeiraMadeira remunera bem. Requer o maior cuidado de curadoria: montagem e prazo são " +
      "a origem mais comum de frustração.",
    ticket: [120, 4500], comissao: [4, 10], recompra: "Baixa", facilidade: "Média",
    logistica: "Volumosa, prazo longo, montagem", risco: "Alto",
    nota: "Só recomendar vendedor com prazo publicado e montagem inclusa. Prazo estourado vira dor da FN.",
  },
  {
    id: "ferramentas", nome: "Ferramentas e instalação", prioridade: 13, momento: "D0",
    porque:
      "A categoria mais coerente com a marca: quem confia na FN para vistoriar confia para dizer " +
      "qual furadeira comprar. Ticket baixo, decisão rápida, e é o item que o cliente descobre " +
      "que precisa exatamente no dia em que recebe as chaves.",
    ticket: [20, 800], comissao: [3, 8], recompra: "Média", facilidade: "Alta",
    logistica: "Simples", risco: "Baixo",
  },
  {
    id: "lavanderia", nome: "Lavanderia e cuidado com roupas", prioridade: 14, momento: "S1",
    porque:
      "Área de serviço de apartamento novo é apertada e mal resolvida de fábrica. Categoria de " +
      "solução, não de desejo: converte por utilidade e tem recompra em consumíveis.",
    ticket: [25, 900], comissao: [5, 10], recompra: "Média", facilidade: "Alta",
    logistica: "Simples", risco: "Baixo",
  },
  {
    id: "casa-inteligente", nome: "Casa inteligente", prioridade: 15, momento: "M3",
    porque:
      "Categoria de maior valor de marca: posiciona a FN como referência técnica moderna e gera " +
      "o melhor conteúdo de YouTube. Conversão menor, mas o cliente que entra aqui volta várias vezes.",
    ticket: [60, 3000], comissao: [3, 8], recompra: "Alta", facilidade: "Média",
    logistica: "Simples", risco: "Médio",
    nota: "Evitar produto sem suporte em português. Suporte ruim de terceiro respinga na FN.",
  },
  {
    id: "limpeza", nome: "Limpeza e manutenção", prioridade: 16, momento: "S1",
    porque:
      "A categoria de maior recompra do catálogo e a melhor porta para assinatura futura. " +
      "Ticket baixo, risco quase nulo, e é o que mantém a loja relevante no mês 8, quando " +
      "as compras grandes já acabaram.",
    ticket: [25, 1500], comissao: [4, 10], recompra: "Alta", facilidade: "Alta",
    logistica: "Simples", risco: "Baixo",
  },
  {
    id: "decoracao", nome: "Decoração e acabamento", prioridade: 17, momento: "M3",
    porque:
      "Entra depois que o essencial está resolvido. Cortina sob medida é o item de maior comissão " +
      "negociada da lista e casa perfeitamente com parceiro local do FN Club.",
    ticket: [25, 1200], comissao: [5, 12], recompra: "Média", facilidade: "Média",
    logistica: "Mista", risco: "Médio",
  },
  {
    id: "varanda", nome: "Varanda e área externa", prioridade: 18, momento: "M3",
    porque:
      "Rede de proteção é compra de urgência para quem tem criança ou pet, e acontece na primeira " +
      "semana. O resto da categoria é upgrade de médio prazo com ticket alto (fechamento em vidro).",
    ticket: [45, 12000], comissao: [5, 12], recompra: "Baixa", facilidade: "Média",
    logistica: "Sob medida, com instalação", risco: "Médio",
    nota: "Rede de proteção é item de segurança infantil: só parceiro com instalação certificada.",
  },
  {
    id: "home-office", nome: "Home office", prioridade: 19, momento: "M1",
    porque:
      "Recorte menor, mas com ticket saudável e público fiel: o comprador de apartamento de 1 e 2 " +
      "quartos hoje quase sempre monta um canto de trabalho. Boa categoria para conteúdo de nicho.",
    ticket: [30, 2000], comissao: [3, 8], recompra: "Média", facilidade: "Média",
    logistica: "Simples", risco: "Baixo",
  },
];

/* ---------------------------------------------------------------------------
   O que o cliente lê.

   Mesma categoria, outro interlocutor. Aqui não se fala de comissão, ticket
   nem concorrência: fala-se do apartamento dele. `antes` é o conselho técnico
   que a FN daria de graça numa conversa de WhatsApp — e que, dito antes do
   clique, evita a compra errada mesmo quando a compra errada pagaria mais.
   --------------------------------------------------------------------------- */
const PARA_O_CLIENTE = {
  seguranca: {
    porque:
      "A porta que a construtora entrega vem com a fechadura mais barata que passa na norma, e a " +
      "chave dela circulou pela obra inteira. Trocar o miolo ou instalar fechadura digital é a " +
      "primeira coisa que recomendamos a quem recebe as chaves.",
    antes:
      "Fechadura digital exige furação correta na porta — mal instalada, ela trava com você do lado " +
      "de fora. Vale contratar instalação com quem já fez isso antes.",
  },
  climatizacao: {
    porque:
      "Em Pernambuco, ar-condicionado não é luxo. A questão é comprar o aparelho certo para o cômodo " +
      "certo — e usar a infraestrutura que a construtora já deixou pronta, em vez de quebrar parede depois.",
    antes:
      "Não escolha BTU no chute. Confira a área do cômodo, a incidência de sol, o ponto elétrico e o " +
      "dreno deixados pela construtora. Se você tem laudo da FN, esses dados estão nele.",
  },
  hidraulica: {
    porque:
      "São os itens que mais aparecem como pendência nas nossas vistorias: sifão que vaza, ralo que " +
      "cheira, vedação malfeita e a ducha higiênica que quase nunca vem. Resolver na primeira semana " +
      "custa pouco e evita infiltração.",
    antes:
      "Antes de comprar, confira se a pendência não é obrigação da construtora corrigir dentro da " +
      "garantia. Se estiver no laudo, cobre — não compre.",
  },
  eletrica: {
    porque:
      "Você acabou de colocar geladeira, TV e ar-condicionado novos em uma instalação que nunca foi " +
      "testada com carga. Proteção contra surto é o item mais barato desta loja e o que evita o " +
      "prejuízo mais caro.",
    antes:
      "Filtro de linha comum não protege contra raio: procure o que informa capacidade de absorção em " +
      "joules. Para o ar-condicionado, o protetor precisa ser dimensionado para a corrente dele.",
  },
  "cozinha-eletro": {
    porque:
      "A cozinha é o primeiro cômodo a funcionar de verdade. Estes são os aparelhos que a gente vê em " +
      "uso em todo apartamento que visita — e não os vinte que a internet manda comprar.",
    antes:
      "Some a potência do que vai ficar ligado ao mesmo tempo na bancada. Muitos apartamentos novos " +
      "entregam poucas tomadas na cozinha, e o disjuntor desarma.",
  },
  "cozinha-utensilios": {
    porque:
      "Ninguém muda para um apartamento com a cozinha montada. Esta é a lista curta do que entra em " +
      "uso na primeira semana, sem o excesso que fica guardado no armário para sempre.",
    antes:
      "Se o seu cooktop for de indução, panela comum não funciona: confira se o fundo é magnético " +
      "antes de comprar o jogo.",
  },
  organizacao: {
    porque:
      "Armário de apartamento novo é sempre menor do que parecia na planta. Organização é o que faz o " +
      "espaço render — e custa uma fração de qualquer marcenaria planejada.",
    antes:
      "Meça a profundidade útil do armário antes, não a largura da porta. É onde quase todo mundo erra " +
      "e acaba com caixa que não entra.",
  },
  "eletro-grandes": {
    porque:
      "É onde vai a maior parte do seu orçamento. Vale escolher com calma, olhando consumo e medida — " +
      "e não só o preço da vitrine.",
    antes:
      "Meça o vão de embutir, a porta de entrada e o elevador antes de fechar. Geladeira que não passa " +
      "na porta é a devolução mais comum do varejo brasileiro.",
  },
  iluminacao: {
    porque:
      "O apartamento é entregue com um fio pendurado em cada cômodo. Iluminação é a mudança mais " +
      "barata que transforma a sensação do imóvel inteiro.",
    antes:
      "Confira se o ponto de luz tem a caixa e o suporte adequados antes de comprar luminária pesada. " +
      "Plafon parafusado no gesso sem reforço cai.",
  },
  "cama-mesa-banho": {
    porque:
      "É a compra da primeira noite, e a que mais se arrepende quem escolhe às pressas. Colchão bom " +
      "dura dez anos; colchão errado, você troca em dois.",
    antes:
      "Confira a medida real da cama antes: queen e king mudam de fabricante para fabricante, e a " +
      "roupa de cama errada não tem troca depois de aberta.",
  },
  banheiro: {
    porque:
      "Box e espelho são as duas primeiras compras de acabamento de quase todo apartamento novo. " +
      "Ambas dependem de medida no local — e é aí que vale ter alguém de confiança.",
    antes:
      "Box de vidro é sob medida e não tem devolução. Confira se a construtora entregou o desnível e " +
      "o ralo na posição do projeto antes de mandar medir.",
  },
  moveis: {
    porque:
      "Depois dos eletrodomésticos, é o maior gasto. Também é onde mais se perde tempo: prazo longo, " +
      "montagem complicada e peça que não cabe no elevador.",
    antes:
      "Confira o prazo de entrega e se a montagem está inclusa antes de finalizar. Atraso de móvel é a " +
      "reclamação mais comum do setor — e ninguém avisa antes.",
  },
  ferramentas: {
    porque:
      "Você vai precisar furar parede na primeira semana. A pergunta não é se, é com o quê — e se você " +
      "sabe o que tem atrás daquele ponto da parede.",
    antes:
      "Use o detector antes de furar. Em apartamento novo, eletroduto e tubulação passam onde você não " +
      "imagina, e furar um cano embutido é um prejuízo de milhares de reais.",
  },
  lavanderia: {
    porque:
      "A área de serviço é o cômodo que a construtora mais aperta. Resolver bem esse metro e meio muda " +
      "a rotina da casa toda.",
    antes:
      "Confira o ponto de água, o dreno e a tomada da máquina antes de comprar. Extensão em máquina de " +
      "lavar é risco de incêndio, não é solução.",
  },
  "casa-inteligente": {
    porque:
      "Automação bem escolhida resolve coisas chatas de apartamento: luz, tomada e fechadura sem obra. " +
      "Mal escolhida, vira gaveta cheia de aparelho que ninguém usa.",
    antes:
      "Prefira produto com aplicativo em português e suporte no Brasil. E teste o sinal do Wi-Fi no " +
      "ponto onde o dispositivo vai ficar: parede de concreto derruba sinal.",
  },
  limpeza: {
    porque:
      "Apartamento recém-entregue vem com poeira de obra, respingo de rejunte e resíduo de argamassa. " +
      "Produto errado risca porcelanato novo, e risco em porcelanato não sai.",
    antes:
      "Nada de ácido ou abrasivo no porcelanato e no inox da primeira limpeza. Comece sempre pelo " +
      "produto mais neutro.",
  },
  decoracao: {
    porque:
      "Depois que o essencial funciona, é o que faz o apartamento parecer seu. Cortina é o item que " +
      "mais muda a percepção do ambiente — e o que mais se erra na medida.",
    antes:
      "Meça a largura do vão mais a folga de cada lado e a altura até o teto antes de encomendar. " +
      "Cortina sob medida não tem troca.",
  },
  varanda: {
    porque:
      "Se você tem criança pequena ou animal, rede de proteção é a primeira coisa a instalar — antes " +
      "mesmo da mudança entrar. O resto da varanda pode esperar.",
    antes:
      "Rede de proteção é item de segurança da vida. Só instale com empresa que emita nota fiscal do " +
      "serviço e dê garantia por escrito, e confira as regras do seu condomínio antes.",
  },
  "home-office": {
    porque:
      "Quase todo apartamento novo de 1 ou 2 quartos precisa acomodar um canto de trabalho. Cadeira " +
      "boa é o item que faz diferença de verdade — o resto é acessório.",
    antes:
      "Meça o espaço com a cadeira puxada para trás, não só a mesa. É o erro mais comum em quarto pequeno.",
  },
};

/* A categoria que o resto do sistema enxerga carrega os dois textos. A vitrine
   usa `porqueCliente` e `antesDeComprar`; a documentação executiva usa `porque`
   e `nota`. Uma categoria sem texto de cliente falha alto no desenvolvimento em
   vez de publicar raciocínio de margem para o morador. */
export const CATEGORIAS = CATEGORIAS_BASE.map((c) => {
  const cliente = PARA_O_CLIENTE[c.id];
  if (!cliente && typeof console !== "undefined") {
    console.warn(`[catalogo] categoria sem texto para o cliente: ${c.id}`);
  }
  return { ...c, porqueCliente: cliente?.porque ?? "", antesDeComprar: cliente?.antes ?? "" };
});

/* ---------------------------------------------------------------------------
   Os 300 produtos.

   Formato compacto — [nome, categoria, prioridade, preçoMín, preçoMáx, momento,
   parceiro] — porque 300 objetos literais seriam 2.400 linhas de chaves e vírgulas
   para a mesma informação.
   --------------------------------------------------------------------------- */
const ITENS = [
  // Segurança e fechaduras (15)
  ["Fechadura digital com senha e biometria", "seguranca", "A", 450, 1600, "D0", "ml"],
  ["Fechadura digital com tag e aplicativo", "seguranca", "A", 380, 1200, "D0", "shp"],
  ["Detector de fumaça autônomo com bateria", "seguranca", "A", 70, 250, "S1", "amz"],
  ["Detector de vazamento de gás com alarme", "seguranca", "A", 90, 300, "S1", "ml"],
  ["Extintor ABC 1kg com suporte de parede", "seguranca", "A", 90, 220, "S1", "lm"],
  ["Câmera de segurança interna Wi-Fi", "seguranca", "A", 120, 450, "S1", "amz"],
  ["Olho mágico digital com visor e gravação", "seguranca", "B", 220, 700, "S1", "ml"],
  ["Câmera externa Wi-Fi com visão noturna", "seguranca", "B", 180, 600, "M1", "amz"],
  ["Vídeo porteiro Wi-Fi para apartamento", "seguranca", "B", 350, 1100, "M1", "ml"],
  ["Sensor de abertura para porta e janela", "seguranca", "B", 60, 180, "M1", "shp"],
  ["Sensor de presença com sirene", "seguranca", "B", 80, 250, "M1", "shp"],
  ["Trava de segurança para janela de correr", "seguranca", "B", 25, 90, "S1", "shp"],
  ["Corrente e trava auxiliar de porta", "seguranca", "C", 30, 110, "S1", "lm"],
  ["Cofre digital de embutir", "seguranca", "C", 250, 800, "M3", "mgl"],
  ["Trava de proteção para gavetas e armários", "seguranca", "C", 20, 70, "M3", "shp"],

  // Climatização e conforto térmico (15)
  ["Ar-condicionado split inverter 9.000 BTUs", "climatizacao", "A", 1800, 3200, "M1", "mgl"],
  ["Ar-condicionado split inverter 12.000 BTUs", "climatizacao", "A", 2200, 3900, "M1", "mgl"],
  ["Ventilador de teto com controle remoto", "climatizacao", "A", 250, 900, "M1", "mgl"],
  ["Ventilador de coluna silencioso", "climatizacao", "A", 150, 500, "D0", "amz"],
  ["Ar-condicionado split inverter 18.000 BTUs", "climatizacao", "B", 3000, 5200, "M3", "mgl"],
  ["Kit de instalação com tubulação de cobre", "climatizacao", "B", 180, 500, "M1", "mm"],
  ["Suporte de parede para condensadora", "climatizacao", "B", 90, 260, "M1", "lm"],
  ["Circulador de ar de mesa", "climatizacao", "B", 130, 420, "S1", "amz"],
  ["Cortina blackout com forro térmico", "climatizacao", "B", 90, 400, "M1", "shp"],
  ["Película de controle solar para vidro", "climatizacao", "B", 60, 300, "M1", "ml"],
  ["Desumidificador de ar para ambiente fechado", "climatizacao", "B", 300, 1500, "M6", "amz"],
  ["Climatizador de ar evaporativo", "climatizacao", "C", 350, 1200, "M3", "mgl"],
  ["Purificador de ar com filtro HEPA", "climatizacao", "C", 400, 1800, "M6", "amz"],
  ["Termo-higrômetro digital de ambiente", "climatizacao", "C", 30, 120, "M1", "shp"],
  ["Aquecedor elétrico portátil", "climatizacao", "C", 120, 500, "M6", "mgl"],

  // Hidráulica e áreas molhadas (16)
  ["Chuveiro elétrico multitemperatura", "hidraulica", "A", 120, 450, "D0", "mgl"],
  ["Ducha higiênica com registro e suporte", "hidraulica", "A", 90, 350, "S1", "lm"],
  ["Filtro de água para torneira", "hidraulica", "A", 70, 260, "S1", "ml"],
  ["Purificador de água refrigerado", "hidraulica", "A", 400, 1500, "M1", "mgl"],
  ["Sifão flexível universal para pia", "hidraulica", "A", 20, 70, "D0", "lm"],
  ["Mangueira flexível para vaso e pia", "hidraulica", "A", 20, 80, "D0", "lm"],
  ["Kit de vedação: veda-rosca, silicone e fita", "hidraulica", "A", 25, 90, "D0", "lm"],
  ["Ducha pressurizada com aquecimento", "hidraulica", "B", 250, 900, "M1", "lm"],
  ["Torneira gourmet com bica flexível", "hidraulica", "B", 150, 700, "M1", "mm"],
  ["Misturador monocomando para lavatório", "hidraulica", "B", 130, 600, "M3", "mm"],
  ["Válvula de escoamento com ralo click", "hidraulica", "B", 30, 120, "S1", "lm"],
  ["Assento sanitário com fechamento suave", "hidraulica", "B", 90, 350, "M1", "mm"],
  ["Registro de gaveta com acabamento", "hidraulica", "B", 60, 250, "M3", "lm"],
  ["Ralo linear em inox para box", "hidraulica", "C", 80, 350, "M3", "mm"],
  ["Aerador economizador para torneira", "hidraulica", "C", 15, 60, "M3", "shp"],
  ["Bomba pressurizadora para chuveiro", "hidraulica", "C", 400, 1400, "M6", "ml"],

  // Elétrica, energia e proteção (16)
  ["Filtro de linha com proteção contra surto", "eletrica", "A", 40, 160, "D0", "amz"],
  ["Extensão elétrica reforçada de 5 metros", "eletrica", "A", 35, 130, "D0", "shp"],
  ["Kit de adaptadores de tomada padrão brasileiro", "eletrica", "A", 20, 70, "D0", "shp"],
  ["Protetor de surto para ar-condicionado", "eletrica", "A", 60, 220, "M1", "ml"],
  ["Testador de tomada e sequência de fase", "eletrica", "A", 30, 120, "D0", "ml"],
  ["Estabilizador para eletrodomésticos", "eletrica", "B", 120, 400, "S1", "ml"],
  ["Régua de tomadas com portas USB", "eletrica", "B", 50, 190, "S1", "amz"],
  ["Tomada de parede com carregador USB", "eletrica", "B", 40, 150, "M1", "lm"],
  ["Interruptor inteligente Wi-Fi", "eletrica", "B", 60, 220, "M3", "shp"],
  ["Disjuntor DR e DPS para quadro de distribuição", "eletrica", "B", 90, 350, "M1", "lm"],
  ["Canaleta e organizador de fios adesivo", "eletrica", "B", 25, 100, "S1", "shp"],
  ["Cabo HDMI 2.1 de 2 metros", "eletrica", "B", 25, 90, "S1", "shp"],
  ["Multímetro digital para uso doméstico", "eletrica", "C", 45, 180, "M3", "amz"],
  ["Kit de cabos, conectores e fita isolante", "eletrica", "C", 40, 160, "M3", "lm"],
  ["Nobreak para modem e roteador", "eletrica", "C", 250, 900, "M6", "amz"],
  ["Medidor de consumo de energia de tomada", "eletrica", "C", 60, 220, "M6", "ali"],

  // Cozinha — eletroportáteis (17)
  ["Micro-ondas 20 a 30 litros", "cozinha-eletro", "A", 450, 1200, "D0", "mgl"],
  ["Air fryer de 4 litros", "cozinha-eletro", "A", 250, 700, "S1", "mgl"],
  ["Liquidificador de alta rotação", "cozinha-eletro", "A", 120, 500, "S1", "mgl"],
  ["Cafeteira elétrica com jarra de vidro", "cozinha-eletro", "A", 120, 500, "S1", "amz"],
  ["Garrafa térmica com bomba de pressão", "cozinha-eletro", "B", 60, 250, "S1", "shp"],
  ["Batedeira planetária com tigela", "cozinha-eletro", "B", 250, 1200, "M1", "mgl"],
  ["Cafeteira de cápsula", "cozinha-eletro", "B", 250, 900, "M1", "mgl"],
  ["Sanduicheira e grill elétrico", "cozinha-eletro", "B", 90, 300, "S1", "mgl"],
  ["Mixer de mão com acessórios", "cozinha-eletro", "B", 90, 400, "M1", "amz"],
  ["Chaleira elétrica com controle de temperatura", "cozinha-eletro", "B", 90, 400, "M1", "amz"],
  ["Air fryer forno de 12 litros", "cozinha-eletro", "B", 500, 1500, "M3", "mgl"],
  ["Balança digital de cozinha", "cozinha-eletro", "C", 35, 130, "M1", "shp"],
  ["Processador de alimentos multifunção", "cozinha-eletro", "C", 200, 800, "M3", "mgl"],
  ["Panela elétrica de arroz", "cozinha-eletro", "C", 150, 500, "M3", "ml"],
  ["Torradeira elétrica", "cozinha-eletro", "C", 90, 350, "M3", "mgl"],
  ["Espremedor de frutas elétrico", "cozinha-eletro", "C", 80, 300, "M3", "mgl"],
  ["Adega climatizada compacta", "cozinha-eletro", "C", 700, 2500, "M6", "mgl"],

  // Cozinha — utensílios e mesa (18)
  ["Jogo de panelas antiaderente com 5 peças", "cozinha-utensilios", "A", 200, 900, "D0", "mgl"],
  ["Panela de pressão de 4,5 litros", "cozinha-utensilios", "A", 120, 500, "S1", "mgl"],
  ["Frigideira antiaderente de 24 cm", "cozinha-utensilios", "A", 60, 280, "D0", "amz"],
  ["Jogo de facas com cepo de madeira", "cozinha-utensilios", "A", 80, 450, "S1", "amz"],
  ["Kit com 3 tábuas de corte", "cozinha-utensilios", "A", 40, 160, "D0", "shp"],
  ["Faqueiro inox com 24 peças", "cozinha-utensilios", "A", 90, 400, "D0", "mgl"],
  ["Aparelho de jantar com 20 a 30 peças", "cozinha-utensilios", "A", 150, 700, "D0", "mgl"],
  ["Kit com 10 potes herméticos para mantimentos", "cozinha-utensilios", "A", 80, 320, "S1", "shp"],
  ["Escorredor de louça em inox", "cozinha-utensilios", "A", 70, 260, "D0", "ml"],
  ["Lixeira de pia com tampa basculante", "cozinha-utensilios", "A", 40, 160, "D0", "shp"],
  ["Suporte de papel-toalha com porta-detergente", "cozinha-utensilios", "B", 35, 140, "D0", "shp"],
  ["Kit de utensílios de silicone para antiaderente", "cozinha-utensilios", "B", 45, 180, "S1", "shp"],
  ["Jogo de copos e taças de vidro", "cozinha-utensilios", "B", 60, 300, "S1", "shp"],
  ["Ralador, descascador e abridor em kit", "cozinha-utensilios", "B", 30, 120, "D0", "shp"],
  ["Peneira, funil e escorredor de macarrão", "cozinha-utensilios", "B", 35, 140, "S1", "shp"],
  ["Kit de assadeiras e formas antiaderentes", "cozinha-utensilios", "B", 60, 250, "M1", "ml"],
  ["Jogo de tigelas de vidro com tampa", "cozinha-utensilios", "B", 60, 250, "M1", "ml"],
  ["Porta-temperos giratório para bancada", "cozinha-utensilios", "C", 50, 200, "M1", "shp"],

  // Organização e armazenamento (18)
  ["Kit organizador modular para armário", "organizacao", "A", 60, 250, "S1", "shp"],
  ["Kit com 30 cabides de veludo antideslizante", "organizacao", "A", 50, 200, "D0", "shp"],
  ["Kit de caixas organizadoras transparentes", "organizacao", "A", 60, 250, "S1", "shp"],
  ["Organizador colmeia para gavetas", "organizacao", "A", 30, 120, "S1", "shp"],
  ["Sapateira vertical para closet", "organizacao", "A", 70, 300, "S1", "mgl"],
  ["Kit de ganchos adesivos de alta fixação", "organizacao", "A", 25, 100, "D0", "shp"],
  ["Kit com 3 nichos de parede", "organizacao", "B", 70, 300, "M1", "mm"],
  ["Arara de roupas com rodízios", "organizacao", "B", 90, 350, "M1", "shp"],
  ["Organizador plano para embaixo da cama", "organizacao", "B", 45, 180, "M1", "shp"],
  ["Divisórias ajustáveis para prateleira", "organizacao", "B", 40, 160, "M1", "shp"],
  ["Organizador de banheiro com ventosa", "organizacao", "B", 25, 100, "S1", "shp"],
  ["Carrinho organizador de 3 andares", "organizacao", "B", 90, 350, "M1", "ml"],
  ["Organizador escalonado para despensa", "organizacao", "B", 40, 160, "M1", "shp"],
  ["Pasta sanfonada para documentos do imóvel", "organizacao", "B", 35, 140, "S1", "amz"],
  ["Organizador suspenso para bolsas", "organizacao", "C", 35, 140, "M3", "shp"],
  ["Etiquetadora portátil com fitas", "organizacao", "C", 60, 250, "M3", "amz"],
  ["Baú organizador com tampa e assento", "organizacao", "C", 120, 450, "M3", "mm"],
  ["Cesto organizador de brinquedos", "organizacao", "C", 50, 200, "M3", "shp"],

  // Eletrodomésticos de linha branca (14)
  ["Geladeira frost free de 300 a 400 litros", "eletro-grandes", "A", 2000, 4500, "D0", "mgl"],
  ["Fogão de 4 bocas com forno", "eletro-grandes", "A", 700, 1800, "D0", "mgl"],
  ["Máquina de lavar de 11 a 14 kg", "eletro-grandes", "A", 1600, 3500, "D0", "mgl"],
  ["Smart TV 50 polegadas 4K", "eletro-grandes", "A", 1700, 3500, "M1", "mgl"],
  ["Geladeira duplex inverter acima de 450 litros", "eletro-grandes", "B", 3500, 8000, "M1", "mgl"],
  ["Fogão de 5 bocas com forno autolimpante", "eletro-grandes", "B", 1000, 2800, "D0", "mgl"],
  ["Cooktop de indução com 4 bocas", "eletro-grandes", "B", 900, 3000, "M1", "mgl"],
  ["Coifa ou depurador de parede", "eletro-grandes", "B", 400, 2500, "M1", "mm"],
  ["Lava-louças de 8 a 14 serviços", "eletro-grandes", "B", 2200, 5500, "M3", "mgl"],
  ["Lava e seca de 11 kg", "eletro-grandes", "B", 3000, 7000, "M1", "mgl"],
  ["Forno elétrico de embutir", "eletro-grandes", "B", 1200, 3500, "M3", "mgl"],
  ["Micro-ondas de embutir", "eletro-grandes", "C", 900, 2500, "M3", "mgl"],
  ["Secadora de roupas", "eletro-grandes", "C", 1800, 4500, "M6", "mgl"],
  ["Soundbar para televisão", "eletro-grandes", "C", 350, 1800, "M3", "amz"],

  // Iluminação (16)
  ["Kit com 10 lâmpadas LED bulbo de 9W", "iluminacao", "A", 45, 140, "D0", "shp"],
  ["Lâmpada LED inteligente RGB Wi-Fi", "iluminacao", "A", 35, 120, "S1", "shp"],
  ["Plafon LED de sobrepor de 24W", "iluminacao", "A", 60, 220, "S1", "lm"],
  ["Luz de emergência com bateria recarregável", "iluminacao", "B", 45, 160, "S1", "ml"],
  ["Kit de painéis LED de embutir 18W", "iluminacao", "B", 80, 260, "M1", "lm"],
  ["Fita LED de 5 metros com fonte", "iluminacao", "B", 40, 160, "M1", "shp"],
  ["Spot LED de embutir direcionável", "iluminacao", "B", 25, 90, "M1", "lm"],
  ["Luminária pendente para bancada", "iluminacao", "B", 90, 450, "M1", "mm"],
  ["Trilho eletrificado com spots", "iluminacao", "B", 150, 600, "M3", "lm"],
  ["Arandela de parede para interior", "iluminacao", "B", 70, 320, "M3", "mm"],
  ["Sensor de presença para iluminação", "iluminacao", "B", 40, 150, "M3", "lm"],
  ["Perfil de alumínio para fita LED", "iluminacao", "C", 35, 140, "M3", "ml"],
  ["Abajur de mesa com cúpula", "iluminacao", "C", 60, 300, "M3", "mgl"],
  ["Luminária de piso para sala", "iluminacao", "C", 150, 700, "M6", "mm"],
  ["Dimmer de parede para LED", "iluminacao", "C", 45, 180, "M3", "lm"],
  ["Lâmpada para forno e geladeira", "iluminacao", "C", 15, 60, "M3", "shp"],

  // Cama, mesa e banho (16)
  ["Colchão queen de molas ensacadas", "cama-mesa-banho", "A", 1200, 4000, "D0", "mgl"],
  ["Base box queen", "cama-mesa-banho", "A", 600, 2200, "D0", "mgl"],
  ["Jogo de cama queen de 200 fios", "cama-mesa-banho", "A", 90, 400, "D0", "mgl"],
  ["Par de travesseiros antialérgicos", "cama-mesa-banho", "A", 90, 400, "D0", "amz"],
  ["Protetor de colchão impermeável", "cama-mesa-banho", "A", 70, 280, "D0", "mgl"],
  ["Jogo de 5 toalhas de banho", "cama-mesa-banho", "A", 90, 400, "D0", "mgl"],
  ["Edredom ou duvet queen", "cama-mesa-banho", "A", 150, 700, "S1", "mgl"],
  ["Jogo de cama king em percal 400 fios", "cama-mesa-banho", "B", 200, 800, "M1", "mgl"],
  ["Colchão de solteiro em espuma D33", "cama-mesa-banho", "B", 400, 1500, "M1", "mgl"],
  ["Kit de toalhas de rosto e lavabo", "cama-mesa-banho", "B", 45, 180, "S1", "shp"],
  ["Capa de travesseiro impermeável", "cama-mesa-banho", "B", 35, 140, "S1", "shp"],
  ["Kit com 4 almofadas decorativas e capas", "cama-mesa-banho", "B", 70, 280, "M1", "shp"],
  ["Manta decorativa para sofá", "cama-mesa-banho", "B", 60, 250, "M1", "shp"],
  ["Cobre-leito matelassado", "cama-mesa-banho", "B", 120, 500, "M3", "mgl"],
  ["Kit com 6 jogos americanos", "cama-mesa-banho", "C", 40, 160, "M1", "shp"],
  ["Toalha de mesa para jantar", "cama-mesa-banho", "C", 60, 250, "M3", "shp"],

  // Banheiro (16)
  ["Box de vidro temperado sob medida", "banheiro", "A", 900, 3500, "M1", "fab"],
  ["Espelho com LED e sistema antiembaçante", "banheiro", "A", 250, 1200, "M1", "mm"],
  ["Gabinete de banheiro com cuba", "banheiro", "A", 400, 1800, "M1", "mm"],
  ["Kit de acessórios de banheiro com 5 peças", "banheiro", "A", 70, 300, "D0", "shp"],
  ["Tapete antiderrapante para box", "banheiro", "A", 30, 120, "D0", "shp"],
  ["Lixeira de banheiro com pedal", "banheiro", "A", 40, 160, "D0", "shp"],
  ["Escova sanitária com suporte fechado", "banheiro", "A", 25, 100, "D0", "shp"],
  ["Porta-toalha de parede", "banheiro", "A", 45, 180, "S1", "lm"],
  ["Cuba de apoio para bancada", "banheiro", "B", 120, 600, "M1", "mm"],
  ["Cortina de box impermeável com ganchos", "banheiro", "B", 35, 140, "D0", "shp"],
  ["Suporte de papel higiênico com prateleira", "banheiro", "B", 40, 160, "S1", "shp"],
  ["Organizador de chuveiro em inox", "banheiro", "B", 60, 250, "S1", "ml"],
  ["Kit de tapetes de banheiro antiderrapantes", "banheiro", "B", 50, 200, "D0", "mgl"],
  ["Armário aéreo com espelho", "banheiro", "B", 200, 800, "M1", "mm"],
  ["Dispenser automático de sabonete", "banheiro", "C", 60, 250, "M3", "amz"],
  ["Toalheiro elétrico aquecido", "banheiro", "C", 250, 900, "M6", "ml"],

  // Móveis essenciais (16)
  ["Guarda-roupa de casal com 6 portas", "moveis", "A", 900, 3000, "D0", "mm"],
  ["Rack para TV de até 65 polegadas", "moveis", "A", 350, 1500, "D0", "mm"],
  ["Sofá compacto de 2 lugares", "moveis", "A", 700, 2500, "D0", "mm"],
  ["Sofá retrátil e reclinável de 3 lugares", "moveis", "A", 1200, 4500, "M1", "mm"],
  ["Mesa de jantar com 4 a 6 cadeiras", "moveis", "A", 700, 3000, "M1", "mm"],
  ["Armário de cozinha modulado", "moveis", "A", 800, 3500, "M1", "mm"],
  ["Par de criados-mudos", "moveis", "B", 200, 800, "D0", "mm"],
  ["Painel para TV com prateleiras", "moveis", "B", 300, 1200, "M1", "mm"],
  ["Cômoda com gavetas", "moveis", "B", 350, 1400, "M1", "mm"],
  ["Balcão e gabinete para pia de cozinha", "moveis", "B", 400, 1600, "M1", "mm"],
  ["Par de banquetas altas para bancada", "moveis", "B", 200, 800, "M1", "mm"],
  ["Cabeceira estofada para cama", "moveis", "B", 250, 1200, "M3", "mm"],
  ["Mesa de centro e mesa lateral", "moveis", "C", 150, 700, "M3", "mm"],
  ["Puff e banco baú", "moveis", "C", 120, 500, "M3", "mm"],
  ["Estante para livros e objetos", "moveis", "C", 250, 1000, "M3", "mm"],
  ["Poltrona decorativa para quarto", "moveis", "C", 400, 1800, "M6", "mm"],

  // Ferramentas e instalação (17)
  ["Furadeira e parafusadeira de impacto", "ferramentas", "A", 200, 800, "D0", "lm"],
  ["Kit de brocas para concreto e cerâmica", "ferramentas", "A", 40, 160, "D0", "lm"],
  ["Jogo de chaves de fenda e Philips", "ferramentas", "A", 35, 140, "D0", "shp"],
  ["Detector de fiação e metal na parede", "ferramentas", "A", 90, 350, "D0", "amz"],
  ["Kit de buchas e parafusos sortidos", "ferramentas", "A", 30, 120, "D0", "lm"],
  ["Trena manual de 5 metros", "ferramentas", "A", 20, 80, "D0", "lm"],
  ["Martelo, alicate e chave inglesa em kit", "ferramentas", "A", 60, 250, "D0", "lm"],
  ["Escada doméstica de 5 degraus", "ferramentas", "A", 150, 600, "S1", "lm"],
  ["Fita isolante e fita crepe em kit", "ferramentas", "A", 20, 80, "D0", "lm"],
  ["Cola de montagem e silicone neutro", "ferramentas", "A", 25, 100, "D0", "lm"],
  ["Trena a laser de 20 metros", "ferramentas", "B", 90, 350, "S1", "amz"],
  ["Nível a laser autonivelante", "ferramentas", "B", 150, 600, "M1", "amz"],
  ["Maleta de ferramentas com 100 peças", "ferramentas", "B", 150, 600, "S1", "mgl"],
  ["Kit de reparo de parede com massa e espátula", "ferramentas", "B", 40, 160, "M1", "lm"],
  ["Rolo, pincel e bandeja para pintura", "ferramentas", "B", 45, 180, "M1", "lm"],
  ["Óculos de proteção e luvas de trabalho", "ferramentas", "B", 30, 120, "D0", "lm"],
  ["Serra tico-tico ou serrote manual", "ferramentas", "C", 150, 600, "M3", "lm"],

  // Lavanderia e cuidado com roupas (15)
  ["Varal de teto retrátil para área de serviço", "lavanderia", "A", 90, 350, "S1", "lm"],
  ["Varal de chão dobrável", "lavanderia", "A", 70, 280, "D0", "shp"],
  ["Ferro de passar a vapor", "lavanderia", "A", 90, 350, "S1", "mgl"],
  ["Tábua de passar com capa térmica", "lavanderia", "A", 90, 350, "S1", "mgl"],
  ["Cesto para roupa suja com tampa", "lavanderia", "A", 45, 180, "D0", "shp"],
  ["Kit com 50 cabides e prendedores", "lavanderia", "A", 30, 120, "D0", "shp"],
  ["Vaporizador vertical de roupas", "lavanderia", "B", 150, 600, "M1", "amz"],
  ["Armário multiuso para área de serviço", "lavanderia", "B", 250, 900, "M1", "mm"],
  ["Prateleira e organizador sobre a máquina", "lavanderia", "B", 90, 350, "M1", "ml"],
  ["Base com rodízios para máquina de lavar", "lavanderia", "B", 80, 300, "M1", "shp"],
  ["Kit de mangueira e vedação para máquina", "lavanderia", "B", 30, 120, "D0", "lm"],
  ["Cesto de roupa com divisórias", "lavanderia", "B", 70, 260, "M1", "ml"],
  ["Sacos protetores para lavagem delicada", "lavanderia", "C", 25, 90, "M1", "shp"],
  ["Removedor de bolinhas de tecido", "lavanderia", "C", 30, 120, "M3", "shp"],
  ["Tanque auxiliar com esfregador", "lavanderia", "C", 120, 450, "M3", "lm"],

  // Casa inteligente (16)
  ["Roteador Wi-Fi 6 em kit mesh com 2 unidades", "casa-inteligente", "A", 350, 1200, "D0", "amz"],
  ["Repetidor de sinal Wi-Fi", "casa-inteligente", "A", 90, 350, "D0", "ml"],
  ["Kit com 2 tomadas inteligentes Wi-Fi", "casa-inteligente", "A", 60, 250, "S1", "shp"],
  ["Kit com 4 lâmpadas inteligentes", "casa-inteligente", "A", 90, 350, "S1", "shp"],
  ["Fechadura inteligente com aplicativo", "casa-inteligente", "A", 500, 1800, "M1", "ml"],
  ["Controle universal infravermelho Wi-Fi", "casa-inteligente", "B", 90, 300, "M1", "ali"],
  ["Smart speaker compacto", "casa-inteligente", "B", 150, 500, "M3", "amz"],
  ["Assistente de voz com tela", "casa-inteligente", "B", 250, 900, "M3", "amz"],
  ["Campainha inteligente com câmera", "casa-inteligente", "B", 250, 900, "M3", "amz"],
  ["Robô aspirador com mapeamento", "casa-inteligente", "B", 700, 3000, "M3", "mgl"],
  ["Aparelho de streaming 4K", "casa-inteligente", "B", 200, 700, "M1", "amz"],
  ["Sensor de temperatura e umidade Zigbee", "casa-inteligente", "C", 60, 250, "M3", "ali"],
  ["Hub Zigbee para automação", "casa-inteligente", "C", 150, 600, "M6", "ali"],
  ["Motor para automatizar cortina", "casa-inteligente", "C", 400, 1600, "M6", "ali"],
  ["Cabo de rede e adaptador powerline", "casa-inteligente", "C", 60, 250, "M3", "ml"],
  ["Robô aspirador compacto de entrada", "casa-inteligente", "C", 400, 1200, "M3", "shp"],

  // Limpeza e manutenção (14)
  ["Aspirador de pó vertical sem fio", "limpeza", "A", 300, 1500, "S1", "mgl"],
  ["Mop giratório com balde", "limpeza", "A", 90, 350, "D0", "shp"],
  ["Kit com rodo, vassoura e pá", "limpeza", "A", 45, 180, "D0", "shp"],
  ["Kit de limpeza para vidros e box", "limpeza", "A", 40, 160, "D0", "shp"],
  ["Kit com 10 panos de microfibra", "limpeza", "A", 30, 120, "D0", "shp"],
  ["Antimofo e removedor para armários", "limpeza", "A", 25, 100, "S1", "shp"],
  ["Desentupidor e limpa-ralo", "limpeza", "A", 25, 100, "D0", "shp"],
  ["Lavadora de alta pressão", "limpeza", "B", 350, 1200, "M3", "lm"],
  ["Balde espremedor com organizador", "limpeza", "B", 60, 250, "S1", "shp"],
  ["Kit de manutenção e renovação de rejunte", "limpeza", "B", 40, 160, "M3", "lm"],
  ["Lixeiras e organizador de reciclagem", "limpeza", "B", 45, 180, "S1", "shp"],
  ["Limpador telescópico para teto e ventilador", "limpeza", "C", 40, 160, "M3", "shp"],
  ["Vaporizador de limpeza doméstica", "limpeza", "C", 250, 900, "M6", "mgl"],
  ["Aspirador de pó e água", "limpeza", "C", 300, 1200, "M3", "lm"],

  // Decoração e acabamento (16)
  ["Cortinas e persianas sob medida", "decoracao", "A", 200, 1200, "M1", "fab"],
  ["Trilho e varão para cortina", "decoracao", "A", 60, 250, "M1", "lm"],
  ["Suporte de parede articulado para TV", "decoracao", "A", 60, 250, "D0", "ml"],
  ["Tapete de sala 2,00 x 1,50 m", "decoracao", "A", 150, 800, "M1", "mgl"],
  ["Persiana rolô blackout", "decoracao", "B", 90, 400, "M1", "ml"],
  ["Papel de parede autoadesivo", "decoracao", "B", 60, 250, "M3", "shp"],
  ["Kit com 3 quadros decorativos", "decoracao", "B", 70, 300, "M3", "shp"],
  ["Espelho decorativo de corpo inteiro", "decoracao", "B", 200, 900, "M3", "mm"],
  ["Rodapé e acabamento em poliestireno", "decoracao", "B", 90, 400, "M3", "lm"],
  ["Kit de fixação para pendurar quadros", "decoracao", "B", 25, 100, "S1", "shp"],
  ["Vasos decorativos com plantas artificiais", "decoracao", "C", 50, 250, "M3", "shp"],
  ["Adesivo decorativo para porta e armário", "decoracao", "C", 40, 160, "M3", "shp"],
  ["Prateleira decorativa com iluminação", "decoracao", "C", 90, 400, "M6", "ml"],
  ["Difusor de ambiente e velas aromáticas", "decoracao", "C", 40, 160, "M3", "shp"],
  ["Cestos e mantas decorativas", "decoracao", "C", 60, 250, "M3", "shp"],
  ["Relógio de parede", "decoracao", "C", 40, 180, "M3", "shp"],

  // Varanda e área externa (15)
  ["Rede de proteção para varanda com instalação", "varanda", "A", 300, 1200, "D0", "fab"],
  ["Tela de proteção para janelas", "varanda", "A", 200, 800, "D0", "fab"],
  ["Fechamento de varanda em vidro", "varanda", "B", 3000, 12000, "M6", "fab"],
  ["Conjunto de mesa e cadeiras para varanda", "varanda", "B", 400, 2000, "M3", "mm"],
  ["Deck modular de madeira para varanda", "varanda", "B", 150, 700, "M3", "lm"],
  ["Vasos e floreiras com suporte", "varanda", "B", 70, 300, "M3", "shp"],
  ["Churrasqueira elétrica para varanda", "varanda", "B", 250, 900, "M3", "mgl"],
  ["Varal de parede para área externa", "varanda", "B", 70, 280, "S1", "lm"],
  ["Iluminação de varanda à prova de tempo", "varanda", "B", 90, 400, "M3", "lm"],
  ["Poltrona para área externa", "varanda", "C", 250, 1200, "M3", "mm"],
  ["Grama sintética para varanda", "varanda", "C", 90, 400, "M3", "ml"],
  ["Kit de jardinagem com substrato", "varanda", "C", 45, 180, "M3", "lm"],
  ["Cortina de vidro retrátil e toldo", "varanda", "C", 300, 1500, "M6", "ml"],
  ["Ombrelone e guarda-sol", "varanda", "C", 200, 800, "M6", "mgl"],
  ["Persiana externa de bambu", "varanda", "C", 120, 500, "M6", "shp"],

  // Home office (14)
  ["Cadeira de escritório ergonômica", "home-office", "A", 400, 2000, "M1", "mgl"],
  ["Mesa de escritório compacta", "home-office", "A", 250, 1000, "M1", "mm"],
  ["Suporte para monitor e notebook", "home-office", "B", 60, 250, "M1", "amz"],
  ["Monitor de 24 a 27 polegadas", "home-office", "B", 600, 2000, "M3", "mgl"],
  ["Teclado e mouse sem fio", "home-office", "B", 90, 350, "M1", "amz"],
  ["Luminária de mesa com luz ajustável", "home-office", "B", 70, 300, "M1", "amz"],
  ["Organizador de cabos para mesa", "home-office", "B", 30, 120, "M1", "shp"],
  ["Apoio de pés ergonômico", "home-office", "C", 60, 250, "M3", "amz"],
  ["Webcam Full HD", "home-office", "C", 120, 450, "M3", "amz"],
  ["Headset com cancelamento de ruído", "home-office", "C", 200, 1200, "M3", "amz"],
  ["Painel acústico decorativo", "home-office", "C", 90, 400, "M6", "shp"],
  ["Nobreak para computador", "home-office", "C", 350, 1200, "M6", "ml"],
  ["Impressora multifuncional tanque de tinta", "home-office", "C", 700, 1800, "M6", "mgl"],
  ["Gaveteiro e arquivo para escritório", "home-office", "C", 200, 800, "M6", "mm"],
];

/* Identificador estável a partir do nome: usado na URL (?p=slug), nos favoritos
   e no relatório de cliques. Se o nome mudar, o slug muda — por isso o nome é
   descritivo e genérico, nunca uma marca específica. */
function paraSlug(texto) {
  return texto
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const PRODUTOS = ITENS.map(([nome, categoria, prioridade, min, max, momento, parceiro]) => ({
  id: paraSlug(nome),
  nome,
  categoria,
  prioridade,
  faixa: [min, max],
  momento,
  parceiro,
}));

export const TOTAL_PRODUTOS = PRODUTOS.length;

export const categoriaPorId = Object.fromEntries(CATEGORIAS.map((c) => [c.id, c]));

export function produtosDaCategoria(id) {
  const ordem = { A: 0, B: 1, C: 2 };
  return PRODUTOS.filter((p) => p.categoria === id).sort(
    (a, b) => ordem[a.prioridade] - ordem[b.prioridade] || a.nome.localeCompare(b.nome, "pt-BR")
  );
}

export function formatarFaixa([min, max]) {
  const reais = (v) =>
    v >= 1000 ? `R$ ${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1).replace(".", ",")} mil` : `R$ ${v}`;
  return `${reais(min)} a ${reais(max)}`;
}
