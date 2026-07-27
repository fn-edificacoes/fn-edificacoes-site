/* ============================================================================
   Kits FN — a unidade de venda da Loja Recomendada.

   Kit não é "lista de produtos com desconto". É a resposta pronta para uma
   pergunta que o cliente faz sozinho, à meia-noite, com a caixa da mudança
   ainda fechada: "o que eu preciso comprar AGORA?". Cada kit resolve um
   momento da jornada, não uma categoria de loja — por isso um mesmo produto
   aparece em kits diferentes.

   Os itens são referenciados pelo NOME do produto no catálogo, e resolvidos
   em tempo de carga. Se alguém renomear um produto e esquecer do kit, o kit
   fica visivelmente incompleto no console de desenvolvimento em vez de sumir
   silenciosamente da vitrine.
   ========================================================================== */

import { PRODUTOS } from "./catalogo.js";

const porNome = new Map(PRODUTOS.map((p) => [p.nome, p]));

const DEFINICOES = [
  {
    id: "primeira-noite",
    nome: "Kit Primeira Noite",
    chamada: "O que precisa estar pronto antes de você dormir no apartamento novo.",
    momento: "D0",
    publico: "Quem recebe a chave e dorme lá na mesma semana",
    destaque: true,
    porque:
      "É o kit de maior urgência e menor dúvida. Quem recebeu a chave hoje não vai pesquisar " +
      "colchão por três dias: vai comprar o primeiro que couber no prazo. Estar presente nesse " +
      "momento vale mais do que qualquer desconto.",
    itens: [
      "Colchão queen de molas ensacadas",
      "Base box queen",
      "Jogo de cama queen de 200 fios",
      "Par de travesseiros antialérgicos",
      "Protetor de colchão impermeável",
      "Jogo de 5 toalhas de banho",
      "Kit com 10 lâmpadas LED bulbo de 9W",
      "Extensão elétrica reforçada de 5 metros",
      "Cortina blackout com forro térmico",
      "Kit com rodo, vassoura e pá",
    ],
  },
  {
    id: "dia-das-chaves",
    nome: "Kit Dia das Chaves",
    chamada: "O que levar na mão no dia da vistoria — a lista que o vistoriador usa.",
    momento: "D0",
    publico: "Cliente que vai acompanhar a vistoria de entrega",
    destaque: true,
    porque:
      "Nenhum concorrente consegue montar este kit com credibilidade: ele sai da rotina real de " +
      "quem vistoria imóvel todo dia. É o kit-manifesto da loja — barato, útil e impossível de " +
      "copiar sem ter feito mil vistorias antes.",
    itens: [
      "Trena manual de 5 metros",
      "Testador de tomada e sequência de fase",
      "Fita isolante e fita crepe em kit",
      "Kit de vedação: veda-rosca, silicone e fita",
      "Luz de emergência com bateria recarregável",
      "Kit com 10 panos de microfibra",
      "Pasta sanfonada para documentos do imóvel",
      "Escada doméstica de 5 degraus",
    ],
  },
  {
    id: "primeira-mudanca",
    nome: "Kit Primeira Mudança",
    chamada: "Tudo que some da lista até você perceber que faltou.",
    momento: "S1",
    publico: "Quem está com a mudança marcada",
    destaque: true,
    porque:
      "Ticket baixo, decisão instantânea e altíssima taxa de conversão: são itens que a pessoa " +
      "compra sem comparar preço porque precisa hoje. É o kit que gera volume de cliques e " +
      "constrói o histórico de comissão nos primeiros meses.",
    itens: [
      "Kit com 30 cabides de veludo antideslizante",
      "Kit de caixas organizadoras transparentes",
      "Kit de ganchos adesivos de alta fixação",
      "Mop giratório com balde",
      "Kit com rodo, vassoura e pá",
      "Kit de limpeza para vidros e box",
      "Kit com 10 panos de microfibra",
      "Lixeira de pia com tampa basculante",
      "Varal de chão dobrável",
      "Kit com 50 cabides e prendedores",
    ],
  },
  {
    id: "cozinha-essencial",
    nome: "Kit Cozinha Essencial",
    chamada: "Cozinhar de verdade na primeira semana, sem comprar o que não usa.",
    momento: "D0",
    publico: "Primeiro apartamento, orçamento controlado",
    destaque: true,
    porque:
      "Cozinha é a primeira sala a funcionar e a última a ficar pronta. Este kit corta a lista " +
      "de 60 itens que a internet manda comprar para os 10 que realmente entram em uso na " +
      "primeira semana — curadoria por subtração, que é o que dá autoridade à marca.",
    itens: [
      "Jogo de panelas antiaderente com 5 peças",
      "Panela de pressão de 4,5 litros",
      "Frigideira antiaderente de 24 cm",
      "Jogo de facas com cepo de madeira",
      "Kit com 3 tábuas de corte",
      "Faqueiro inox com 24 peças",
      "Aparelho de jantar com 20 a 30 peças",
      "Escorredor de louça em inox",
      "Kit com 10 potes herméticos para mantimentos",
      "Lixeira de pia com tampa basculante",
    ],
  },
  {
    id: "cozinha-eletro",
    nome: "Kit Cozinha Equipada",
    chamada: "Os eletroportáteis que valem a tomada — e os que só ocupam bancada.",
    momento: "S1",
    publico: "Quem já resolveu o básico e vai equipar",
    porque:
      "Categoria de compra por impulso com ticket médio confortável e recompra real. Funciona " +
      "muito bem em vídeo curto e é a porta de entrada mais barata para o cliente experimentar " +
      "comprar pela indicação da FN.",
    itens: [
      "Micro-ondas 20 a 30 litros",
      "Air fryer de 4 litros",
      "Liquidificador de alta rotação",
      "Cafeteira elétrica com jarra de vidro",
      "Chaleira elétrica com controle de temperatura",
      "Sanduicheira e grill elétrico",
      "Balança digital de cozinha",
      "Filtro de água para torneira",
    ],
  },
  {
    id: "banheiro",
    nome: "Kit Banheiro",
    chamada: "Do chuveiro à escova sanitária, sem esquecer a ducha higiênica que não veio.",
    momento: "D0",
    publico: "Todo apartamento novo",
    destaque: true,
    porque:
      "Banheiro de apartamento novo é entregue quase vazio, e a ausência de ducha higiênica é " +
      "uma das queixas mais frequentes na entrega. A FN sabe disso pelo laudo — e transforma " +
      "uma queixa recorrente em recomendação certeira.",
    itens: [
      "Kit de acessórios de banheiro com 5 peças",
      "Ducha higiênica com registro e suporte",
      "Tapete antiderrapante para box",
      "Kit de tapetes de banheiro antiderrapantes",
      "Lixeira de banheiro com pedal",
      "Escova sanitária com suporte fechado",
      "Porta-toalha de parede",
      "Organizador de chuveiro em inox",
      "Assento sanitário com fechamento suave",
      "Cortina de box impermeável com ganchos",
    ],
  },
  {
    id: "organizacao",
    nome: "Kit Organização",
    chamada: "Armário de apartamento novo é menor do que parece na planta.",
    momento: "S1",
    publico: "Apartamentos de 1 e 2 quartos",
    destaque: true,
    porque:
      "Maior alcance orgânico de todo o catálogo e a melhor relação entre comissão percentual e " +
      "facilidade de venda. É o kit que puxa tráfego de fora da base FN — gente que ainda não é " +
      "cliente e chega pela busca ou pelo vídeo curto.",
    itens: [
      "Kit organizador modular para armário",
      "Kit com 30 cabides de veludo antideslizante",
      "Organizador colmeia para gavetas",
      "Kit de caixas organizadoras transparentes",
      "Sapateira vertical para closet",
      "Organizador plano para embaixo da cama",
      "Divisórias ajustáveis para prateleira",
      "Organizador escalonado para despensa",
      "Carrinho organizador de 3 andares",
      "Kit de ganchos adesivos de alta fixação",
    ],
  },
  {
    id: "lavanderia",
    nome: "Kit Lavanderia",
    chamada: "Área de serviço de 1,5 m² resolvida sem obra.",
    momento: "S1",
    publico: "Apartamentos compactos",
    porque:
      "Problema universal e mal atendido: as lojas vendem os produtos, ninguém vende a solução " +
      "para o espaço. Kit de utilidade pura, com recompra em consumíveis e ótimo desempenho em " +
      "conteúdo de antes e depois.",
    itens: [
      "Varal de teto retrátil para área de serviço",
      "Varal de chão dobrável",
      "Ferro de passar a vapor",
      "Tábua de passar com capa térmica",
      "Cesto para roupa suja com tampa",
      "Kit com 50 cabides e prendedores",
      "Kit de mangueira e vedação para máquina",
      "Base com rodízios para máquina de lavar",
      "Prateleira e organizador sobre a máquina",
    ],
  },
  {
    id: "seguranca",
    nome: "Kit Segurança",
    chamada: "A porta que a construtora entregou não é a porta que você quer.",
    momento: "S1",
    publico: "Todo apartamento novo, prioridade para térreo e primeiro andar",
    destaque: true,
    porque:
      "Ticket alto, urgência real e coerência total com a marca: quem contrata a FN contrata " +
      "segurança. Detector de fumaça e de gás quase ninguém lembra de comprar — e recomendar " +
      "isso é exatamente o tipo de conselho que faz o cliente confiar na loja inteira.",
    itens: [
      "Fechadura digital com senha e biometria",
      "Detector de fumaça autônomo com bateria",
      "Detector de vazamento de gás com alarme",
      "Extintor ABC 1kg com suporte de parede",
      "Câmera de segurança interna Wi-Fi",
      "Sensor de abertura para porta e janela",
      "Trava de segurança para janela de correr",
      "Olho mágico digital com visor e gravação",
    ],
  },
  {
    id: "apartamento-inteligente",
    nome: "Kit Apartamento Inteligente",
    chamada: "Automação que funciona no Wi-Fi do prédio — e não vira dor de cabeça.",
    momento: "M3",
    publico: "Público 25-40 anos, primeiro apartamento próprio",
    porque:
      "Kit de valor de marca. Conversão menor, mas gera o melhor conteúdo de YouTube e atrai um " +
      "cliente que volta várias vezes ao longo do ano. Também é a ponte natural com os " +
      "instaladores do FN Club.",
    itens: [
      "Roteador Wi-Fi 6 em kit mesh com 2 unidades",
      "Kit com 2 tomadas inteligentes Wi-Fi",
      "Kit com 4 lâmpadas inteligentes",
      "Fechadura inteligente com aplicativo",
      "Controle universal infravermelho Wi-Fi",
      "Smart speaker compacto",
      "Campainha inteligente com câmera",
      "Aparelho de streaming 4K",
      "Robô aspirador com mapeamento",
    ],
  },
  {
    id: "home-office",
    nome: "Kit Home Office",
    chamada: "Um canto de trabalho decente em 2 m² de quarto.",
    momento: "M1",
    publico: "Quem trabalha em casa em apartamento compacto",
    porque:
      "Nicho fiel, ticket saudável e baixa concorrência de curadoria voltada a apartamento " +
      "pequeno. Cadeira ergonômica sozinha justifica o kit em valor de comissão.",
    itens: [
      "Cadeira de escritório ergonômica",
      "Mesa de escritório compacta",
      "Suporte para monitor e notebook",
      "Teclado e mouse sem fio",
      "Luminária de mesa com luz ajustável",
      "Organizador de cabos para mesa",
      "Repetidor de sinal Wi-Fi",
      "Nobreak para computador",
    ],
  },
  {
    id: "ferramentas",
    nome: "Kit Ferramentas do Morador",
    chamada: "O mínimo para furar parede sem furar o cano.",
    momento: "D0",
    publico: "Quem nunca teve casa própria",
    destaque: true,
    porque:
      "O kit mais alinhado com a autoridade técnica da FN e o de melhor conteúdo educativo. " +
      "O detector de fiação é o item-símbolo: ninguém compra sozinho, todo mundo precisa, e " +
      "quem avisa é lembrado.",
    itens: [
      "Furadeira e parafusadeira de impacto",
      "Kit de brocas para concreto e cerâmica",
      "Jogo de chaves de fenda e Philips",
      "Detector de fiação e metal na parede",
      "Kit de buchas e parafusos sortidos",
      "Trena manual de 5 metros",
      "Martelo, alicate e chave inglesa em kit",
      "Escada doméstica de 5 degraus",
      "Nível a laser autonivelante",
      "Óculos de proteção e luvas de trabalho",
    ],
  },
  {
    id: "limpeza-pos-mudanca",
    nome: "Kit Limpeza Pós-Mudança",
    chamada: "Poeira de obra sai com o produto certo — e sem riscar o porcelanato novo.",
    momento: "S1",
    publico: "Todo apartamento recém-entregue",
    porque:
      "Compra imediata, sem pesquisa de preço e com recompra garantida em 60 dias. É a categoria " +
      "que mantém a loja viva depois que as compras grandes acabam.",
    itens: [
      "Aspirador de pó vertical sem fio",
      "Mop giratório com balde",
      "Kit com rodo, vassoura e pá",
      "Kit de limpeza para vidros e box",
      "Kit com 10 panos de microfibra",
      "Balde espremedor com organizador",
      "Antimofo e removedor para armários",
      "Desentupidor e limpa-ralo",
      "Lixeiras e organizador de reciclagem",
    ],
  },
  {
    id: "climatizacao",
    nome: "Kit Climatização",
    chamada: "O BTU certo para o seu quarto — e a infraestrutura que a construtora deixou.",
    momento: "M1",
    publico: "Todo apartamento em PE",
    destaque: true,
    porque:
      "Maior ticket do primeiro trimestre. Aqui a FN faz o que marketplace nenhum faz: usa os " +
      "dados do laudo (área, orientação solar, ponto elétrico, dreno) para dizer qual aparelho " +
      "cabe. Recomendação com laudo por trás não é anúncio, é consultoria.",
    itens: [
      "Ar-condicionado split inverter 9.000 BTUs",
      "Ar-condicionado split inverter 12.000 BTUs",
      "Suporte de parede para condensadora",
      "Kit de instalação com tubulação de cobre",
      "Protetor de surto para ar-condicionado",
      "Ventilador de teto com controle remoto",
      "Cortina blackout com forro térmico",
      "Película de controle solar para vidro",
    ],
  },
  {
    id: "protecao-eletrica",
    nome: "Kit Proteção de Eletrodomésticos",
    chamada: "R$ 300 que protegem R$ 15 mil em eletrodomésticos novos.",
    momento: "S1",
    publico: "Quem acabou de comprar geladeira, TV e ar-condicionado",
    porque:
      "O argumento mais fácil de vender do catálogo inteiro, e o mais raro de ouvir de um " +
      "marketplace. Ticket baixo, margem percentual boa e risco praticamente zero.",
    itens: [
      "Filtro de linha com proteção contra surto",
      "Protetor de surto para ar-condicionado",
      "Estabilizador para eletrodomésticos",
      "Disjuntor DR e DPS para quadro de distribuição",
      "Nobreak para modem e roteador",
      "Testador de tomada e sequência de fase",
      "Medidor de consumo de energia de tomada",
    ],
  },
  {
    id: "varanda-segura",
    nome: "Kit Varanda Segura",
    chamada: "Criança e pet no apartamento novo: o que instalar antes de mudar.",
    momento: "D0",
    publico: "Famílias com criança pequena ou animal de estimação",
    destaque: true,
    porque:
      "Urgência máxima e alto valor percebido. É também o kit de maior responsabilidade: só " +
      "entram parceiros com instalação certificada e garantia, porque aqui um erro não é " +
      "reclamação — é acidente.",
    itens: [
      "Rede de proteção para varanda com instalação",
      "Tela de proteção para janelas",
      "Trava de segurança para janela de correr",
      "Trava de proteção para gavetas e armários",
      "Sensor de abertura para porta e janela",
      "Detector de vazamento de gás com alarme",
    ],
  },
  {
    id: "sala-montada",
    nome: "Kit Sala Montada",
    chamada: "Sofá, TV e cortina na medida da sala que você acabou de receber.",
    momento: "M1",
    publico: "Quem já dorme no apartamento e vai montar a sala",
    porque:
      "Segundo maior bolso do cliente. Requer a curadoria mais rigorosa do catálogo: só entra " +
      "vendedor com prazo publicado e montagem inclusa, porque atraso de sofá é a reclamação " +
      "mais comum do varejo de móveis no Brasil.",
    itens: [
      "Sofá retrátil e reclinável de 3 lugares",
      "Rack para TV de até 65 polegadas",
      "Suporte de parede articulado para TV",
      "Smart TV 50 polegadas 4K",
      "Tapete de sala 2,00 x 1,50 m",
      "Cortinas e persianas sob medida",
      "Trilho e varão para cortina",
      "Kit com 4 almofadas decorativas e capas",
      "Soundbar para televisão",
    ],
  },
  {
    id: "primeiro-ano",
    nome: "Kit Primeiro Ano",
    chamada: "A manutenção que evita a primeira dor de cabeça — e preserva sua garantia.",
    momento: "M12",
    publico: "Cliente com 9 a 12 meses de chave",
    porque:
      "Reativa a base quando o ciclo de compras esfria e cria o gancho perfeito para o " +
      "e-mail de aniversário de chaves, que é o momento de reabrir a conversa sobre garantia " +
      "e vistoria de fim de garantia — serviço da FN, não da loja.",
    itens: [
      "Kit de manutenção e renovação de rejunte",
      "Kit de reparo de parede com massa e espátula",
      "Rolo, pincel e bandeja para pintura",
      "Cola de montagem e silicone neutro",
      "Kit de vedação: veda-rosca, silicone e fita",
      "Antimofo e removedor para armários",
      "Sifão flexível universal para pia",
      "Mangueira flexível para vaso e pia",
      "Aerador economizador para torneira",
    ],
  },
];

/* Resolve nomes em produtos e calcula a faixa de investimento do kit somando as
   pontas. É estimativa, e a interface diz isso — a soma de faixas indicativas
   nunca vira promessa de preço. */
export const KITS = DEFINICOES.map((kit) => {
  const itens = kit.itens.map((nome) => {
    const produto = porNome.get(nome);
    if (!produto && typeof console !== "undefined") {
      console.warn(`[kits] produto não encontrado no catálogo: "${nome}" (kit ${kit.id})`);
    }
    return produto;
  }).filter(Boolean);

  return {
    ...kit,
    itens,
    faixa: [
      itens.reduce((s, p) => s + p.faixa[0], 0),
      itens.reduce((s, p) => s + p.faixa[1], 0),
    ],
  };
});

export const kitPorId = Object.fromEntries(KITS.map((k) => [k.id, k]));
