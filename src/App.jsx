import { useState, useRef, useEffect } from "react";
import OndeAtuamos from "./OndeAtuamos.jsx";

/* ============================================================================
   Site institucional da FN Edificações.

   Duas decisões que explicam o resto do arquivo:

   1. Um funil, um nome. O site antigo tinha 7 botões levando ao mesmo lugar com
      4 nomes diferentes ("Solicitar orçamento", "Escolher serviço e cadastrar",
      "Escolher este serviço", "Começar meu atendimento"). Aqui a ação de virar
      cliente se chama sempre "Solicitar vistoria" e leva sempre para o mesmo
      lugar: o cadastro dentro do sistema.

   2. O sistema tem uma porta só. O site antigo tinha uma segunda área do cliente
      dentro dele, com os mesmos campos do cadastro real. Isso é armadilha: quem
      se cadastra na porta errada não chega até a equipe. Aqui existe um único
      caminho, o subdomínio onde o sistema realmente roda.
   ========================================================================== */

const SISTEMA = "https://sistema.fnedificacoes.com.br/";
const WHATSAPP = "https://wa.me/5581983061305?text=" +
  encodeURIComponent("Olá! Vim pelo site e gostaria de solicitar uma vistoria.");
const INSTAGRAM = "https://instagram.com/fn.edificacoes";
const TELEFONE_EXIBIDO = "(81) 98306-1305";
const CNPJ_EXIBIDO = "69.212.890/0001-00";

/* Seis itens, não mais. Com oito o menu quebrava em duas linhas num notebook de 1024px e a
   página ganhava rolagem lateral — o primeiro defeito que se vê ao abrir o site. "Contato"
   saiu porque o botão ao lado já é o contato; "Entregas" e "Onde atuamos" são alcançados
   rolando e pelo rodapé. */
const NAVEGACAO = [
  ["#servicos", "Serviços"],
  ["#como-funciona", "Como funciona"],
  ["#vistorias", "A vistoria"],
  ["#depoimentos", "Depoimentos"],
  ["#duvidas", "Dúvidas"],
  ["#parceiros", "FN Club"],
];

/* Ícones locais: nenhuma biblioteca externa só para desenhar cinco traços. */
const Check = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const Menu = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...p}>
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const Fechar = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...p}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ZapIcone = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.69-1.44 1.32-1.98 1.36-.53.05-1.02.24-3.45-.72-2.9-1.14-4.74-4.1-4.88-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.29.57-.36.76-.36l.54.01c.17.01.41-.07.64.49.25.6.84 2.07.91 2.22.07.15.12.32.02.51-.1.19-.15.31-.29.48l-.44.51c-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.26.09 1.68.79 1.96.94.29.14.48.22.55.34.07.12.07.7-.18 1.39Z" />
  </svg>
);

/* Traço de 1.75 em grade de 24: o mesmo peso em todos, para os ícones parecerem da mesma
   família. Antes as setas e o play eram caracteres de texto (‹ › ▶), que cada sistema
   desenha de um jeito — no Windows o play virava emoji. */
const Icone = ({ children, tamanho = 22, ...p }) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    {children}
  </svg>
);
const IconeLaudo = (p) => (
  <Icone {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></Icone>
);
const IconeTecnico = (p) => (
  <Icone {...p}><path d="M4 15a8 8 0 0 1 16 0" /><path d="M2 15h20v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" /><path d="M10 7V5h4v2" /></Icone>
);
const IconeTela = (p) => (
  <Icone {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /><path d="m8 10 2.5 2.5L16 8" /></Icone>
);
const IconeEscudo = (p) => (
  <Icone {...p}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z" /><path d="m8.8 12 2.2 2.2 4.2-4.4" /></Icone>
);
const IconeChave = (p) => (
  <Icone {...p}><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M16 7l3 3M14 9l2 2" /></Icone>
);
const IconeDocumento = (p) => (
  <Icone {...p}><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4" /><path d="M9 12h6M9 16h6" /></Icone>
);
const IconeLocal = (p) => (
  <Icone {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></Icone>
);
const IconeRelogio = (p) => (
  <Icone {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icone>
);
const IconeSetaEsq = (p) => <Icone {...p}><path d="m15 18-6-6 6-6" /></Icone>;
const IconeSetaDir = (p) => <Icone {...p}><path d="m9 18 6-6-6-6" /></Icone>;
const IconeMudo = (p) => (
  <Icone {...p}><path d="M11 5 6 9H3v6h3l5 4z" /><path d="m22 9-6 6M16 9l6 6" /></Icone>
);
const IconeInstagram = (p) => (
  <Icone {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></Icone>
);
const IconePlay = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);
const IconeAspas = (p) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M9.6 6C6.5 7.1 4.5 9.7 4.5 13.2V18h5.6v-5.4H7.4c.1-2 1.2-3.6 3-4.4zm9 0c-3.1 1.1-5.1 3.7-5.1 7.2V18h5.6v-5.4h-2.7c.1-2 1.2-3.6 3-4.4z" />
  </svg>
);

const SERVICOS = [
  {
    numero: "01",
    icone: IconeChave,
    destaque: true,
    titulo: "Vistoria de entrega de chaves",
    resumo:
      "Antes de assinar o aceite, um técnico independente percorre o imóvel e registra o que precisa ser corrigido pela construtora.",
    itens: [
      "Acabamentos, revestimentos e pintura",
      "Instalações elétricas e hidráulicas acessíveis",
      "Esquadrias, vidros e áreas molhadas",
      "Laudo digital com fotos e recomendações",
    ],
    textoBotao: "Solicitar vistoria",
  },
  {
    numero: "02",
    icone: IconeDocumento,
    titulo: "ART ou TRT para reforma",
    resumo:
      "Vai reformar e o condomínio pediu documento de responsabilidade técnica? Analisamos o escopo e emitimos o documento aplicável.",
    itens: [
      "Análise do escopo da reforma",
      "Documento para entregar ao condomínio",
      "Responsabilidade técnica registrada",
      "Acompanhamento até a aprovação",
    ],
    textoBotao: "Solicitar documentação",
  },
];

const PASSOS = [
  ["Solicitação", "Você informa o empreendimento, a unidade e a data prevista da entrega."],
  ["Agendamento", "Confirmamos o escopo, a disponibilidade e o acesso ao local."],
  ["Vistoria", "O técnico percorre os ambientes e registra cada item encontrado."],
  ["Laudo", "Você recebe o relatório digital com fotos e o que solicitar à construtora."],
];

const CLUB = [
  ["Climatização", "Ar-condicionado e infraestrutura"],
  ["Automação e segurança", "Fechaduras digitais e câmeras"],
  ["Móveis e acabamentos", "Marcenaria, gesso e pintura"],
  ["Vidraçaria", "Box, espelhos e fechamentos"],
  ["Reformas e manutenção", "Serviços técnicos para o imóvel"],
  ["Serviços para o lar", "Internet, limpeza e mudança"],
];

const DUVIDAS = [
  [
    "Vale a pena contratar uma vistoria independente?",
    "A construtora entrega o imóvel e pede o aceite na hora. A vistoria independente registra tecnicamente o estado da unidade antes disso, com fotos e descrição de cada item. Com o laudo em mãos, você solicita as correções com clareza — e tem prova do que foi apontado.",
  ],
  [
    "O cliente precisa estar presente?",
    "Não é obrigatório. Muitos clientes não conseguem se ausentar do trabalho no dia. Se você puder ir, melhor: o técnico mostra cada ponto no local. Se não puder, o laudo digital traz tudo registrado com foto.",
  ],
  [
    "O que acontece quando são encontrados defeitos?",
    "Cada item entra no laudo com foto, descrição técnica, a recomendação de correção e a norma aplicável. Esse documento é o que você apresenta à construtora para solicitar os reparos antes do aceite.",
  ],
  [
    "Toda reforma precisa de ART ou TRT?",
    "Depende do que será feito e do que o seu condomínio exige. Reformas que mexem em estrutura, instalações ou vedações normalmente exigem. Fale com a gente com o escopo em mãos que avaliamos qual documento se aplica ao seu caso.",
  ],
];

/* Fotos das entregas de chaves. São registros reais dos atendimentos — sem legenda
   inventada e sem nota: a avaliação de verdade vem dos clientes, pelo sistema, e
   aparece na seção de depoimentos quando o Atendimento aprova. */
/* As peças da galeria vêm prontas do Instagram (card de feed, story), cada uma com uma
   proporção — por isso o carrossel alinha pela altura e deixa a largura seguir a imagem, em
   vez de recortar todas num quadro fixo: recorte comeria o logo em cima e o telefone
   embaixo, que é justamente o que a peça quer mostrar.

   A lista, com a dimensão de cada arquivo, é gerada por "npm run otimizar-imagens" — não se
   edita à mão. A dimensão importa: sem ela o navegador só descobre a largura quando a
   imagem termina de baixar, e as que carregam preguiçosamente ficam com largura zero até
   lá, empilhadas no começo da fileira. */
import ENTREGAS from "./dados/entregas.json";
import VISTORIAS from "./dados/vistorias.json";

/* Vídeos curtos. Os de vistoria e defeito são mudos de propósito — som que dispara
   sozinho faz o visitante fechar a aba, e ali o que importa é a imagem. Nos de cliente
   recebendo as chaves o áudio fica, porque a fala é o conteúdo. */
/* Outubro/2026: entraram os editados (04 a 06 e cliente-03) no lugar de vistoria-02 (repetia
   a 01), defeito-01, defeito-03 (a capa era uma tela preta com texto) e cliente-01 (só se
   via a cliente de costas). Os novos vêm primeiro: são os que mais parecem trabalho de
   empresa, e é o que o visitante vê sem rolar a fileira. */
const VIDEOS_TRABALHO = [
  ["vistoria-04", "Chegada ao empreendimento"],
  ["vistoria-05", "Ambiente por ambiente"],
  ["vistoria-06", "Equipe em campo"],
  ["vistoria-01", "Verificação de instalações"],
  ["vistoria-03", "Teste de percussão"],
  ["defeito-02", "Falha de acabamento"],
];
const VIDEOS_CLIENTES = [
  ["cliente-03", "Entrega de chaves"],
  ["cliente-02", "Entrega de chaves"],
];

/* Depoimentos reais, vindos do sistema.

   Não há texto escrito por nós aqui: só avaliações que o cliente enviou pelo próprio
   sistema, com CPF conferido, e que o Atendimento aprovou para aparecer. Se não houver
   nenhuma aprovada, a seção some — vitrine vazia comunica o contrário do que pretende.

   A rota é pública e não pede login: devolve apenas o que já foi liberado para exibição. */
/* Endereço da API. O sistema saiu do Render e passou a rodar no servidor da própria FN, no
   mesmo domínio de sistema.fnedificacoes.com.br — e este endereço aqui ficou para trás: o
   antigo responde 503, o fetch falhava e a seção de depoimentos sumia da home sem avisar
   ninguém. Ficou invisível da migração (28/08/2026) até alguém reparar.
   VITE_API_URL sobrescreve quando for preciso apontar para outro lugar (homologação, API
   local) sem editar este arquivo. */
const API = import.meta.env.VITE_API_URL || "https://sistema.fnedificacoes.com.br";

/* ---------- Depoimentos que chegam fora do sistema ----------
   A avaliação do sistema é a fonte mais forte (vem do cliente identificado, com CPF conferido
   e liberada pelo Atendimento), mas ela só existe para quem clica no link do e-mail. Uma boa
   parte do retorno chega por WhatsApp, no grupo do prédio, logo depois da entrega — e é ali
   que o cliente escreve solto, do jeito que convence quem está decidindo contratar.

   Para incluir um depoimento novo: copie o texto como o cliente escreveu (sem "melhorar"),
   preencha nome e sobrenome como no contato, o empreendimento, e adicione ao final da lista.
   Atenção ao que parece sobrenome e não é: nos grupos de prédio o contato costuma vir como
   "Fulano de Tal PALMEIRAS", e esse final é o nome do condomínio. Só entra aqui o que o cliente
   autorizou a publicar — nome e imagem de pessoa são dados dela, não nossos.

   "foto" é opcional e recebe o nome do arquivo em public/img, sem o tamanho e sem a extensão
   (o mesmo padrão do componente Foto): "cliente-real-palace" carrega cliente-real-palace-800.webp.
   Sem foto, o cartão aparece só com o texto. */
const DEPOIMENTOS_RECEBIDOS = [
  {
    nome: "Patrícia",
    empreendimento: "Vila das Palmeiras",
    texto: "Gostaria de fazer um adendo para o profissional Felipe Neves. Na nossa vistoria, o profissional que havíamos contratado anteriormente não compareceu: primeiro atrasaria 20 minutos, depois o atraso virou 1h20 — ou seja, nos deixou na mão, mesmo com o pagamento antecipado de 50%. Graças à Gaby, engenheira da VL que acompanha as vistorias, que ao ver nosso desespero nos indicou a FN Edificações. Mesmo com o prazo estourado, com toda a paciência e atenção do mundo, realizou com maestria a nossa vistoria. E identificou vários pontos para ajuste, foram tantos pontos vermelhos, kkkk. Fica aqui, além do meu agradecimento, minha sugestão ao profissional competente.",
    foto: null,
  },
  {
    nome: "Bárbara Dias",
    empreendimento: "Real Palace",
    texto: "Acabei de terminar a vistoria com a FN Edificações. Foram ótimas! Eu sou muito emocionada, e aconselho contratarem um profissional como a FN Edificações. Teve alguns probleminhas, e graças a Deus e à FN Edificações esses problemas foram notados.",
    foto: null,
  },
  {
    nome: "Aryane",
    empreendimento: "Vila das Palmeiras",
    texto: "Hoje foi nossa vistoria com o Felipe e ele é top! Super detalhista e competente. Contratem sem medo, adorei o serviço dele.",
    foto: null,
  },
  {
    nome: "Fabyanne Montenegro",
    empreendimento: "Administração — Vila das Palmeiras",
    texto: "Felipe segue sendo o melhor como profissional e como pessoa. Obrigada pelo feedback.",
    foto: null,
  },
  {
    nome: "José Rodrigo",
    empreendimento: "Vila das Palmeiras",
    texto: "Também super indico o Felipe. Profissional muito bom de serviço.",
    foto: null,
  },
  {
    nome: "Moradora do condomínio",
    empreendimento: "Vila das Palmeiras",
    texto: "Vim compartilhar minha experiência de hoje na vistoria com a FN Edificações. Que profissional bom: tira suas dúvidas em tudo, começa explicando como funciona e para que serve, não deixa dúvida nenhuma, detalhista, faz as medições de tudo. Ele conseguiu achar falhas na pintura, no acabamento, na cerâmica de dois quartos e, principalmente, no banheiro — viu o desnivelamento da parede do box e o desnivelamento da cerâmica, onde a água iria ficar empoçada. Ele está de parabéns, e quem fizer com ele não vai se arrepender. Profissional ímpar.",
    foto: null,
  },
  {
    nome: "Cliente de entrega de chaves",
    empreendimento: null,
    texto: "Brigadão por hoje! Prazerzão conhecer você e seu trabalho impecável. Deixou essa reta final bem mais tranquila e leve, hehehe. Gratidão demais!",
    foto: null,
  },
];

/* O sistema guarda nome e empreendimento como o cliente digitou, e muita gente digita tudo
   em maiúsculas — na vitrine isso parece grito. Só mexe no que veio inteiro em maiúsculas;
   quem escreveu "Bárbara Dias" fica como escreveu. */
const MINUSCULAS = new Set(["de", "da", "das", "do", "dos", "e"]);
function nomeProprio(texto) {
  if (!texto || /\p{Ll}/u.test(texto)) return texto;
  return texto.toLowerCase().replace(/\S+/g, (p, i) =>
    i > 0 && MINUSCULAS.has(p) ? p : p.charAt(0).toUpperCase() + p.slice(1));
}
function iniciais(nome) {
  const partes = String(nome || "").split(/\s+/).filter((p) => p && !MINUSCULAS.has(p.toLowerCase()));
  return ((partes[0]?.[0] || "") + (partes.length > 1 ? partes[partes.length - 1][0] : "")).toUpperCase();
}

function Assinatura({ nome, empreendimento, origem }) {
  const exibido = nomeProprio(nome);
  return (
    <figcaption>
      <span className="depoimento__avatar" aria-hidden="true">{iniciais(exibido)}</span>
      <span className="depoimento__quem">
        <strong>{exibido}</strong>
        {empreendimento && <span>{nomeProprio(empreendimento)}</span>}
        {origem && <span className="depoimento__origem">{origem}</span>}
      </span>
    </figcaption>
  );
}

function EstrelasFixas({ nota }) {
  return (
    <span className="estrelas" aria-label={`Nota ${nota} de 5`}>
      {"★★★★★".slice(0, nota)}
      <span className="estrelas__vazias">{"★★★★★".slice(nota)}</span>
    </span>
  );
}

/* Mesmos cortes do CSS da antiga grade de depoimentos: 3 colunas no computador, 2 no
   tablet, 1 no celular. */
function colunasPara(largura) {
  return largura >= 900 ? 3 : largura >= 620 ? 2 : 1;
}
function useQuantasColunas() {
  const [n, setN] = useState(() => colunasPara(window.innerWidth));
  useEffect(() => {
    const aoMudar = () => setN(colunasPara(window.innerWidth));
    window.addEventListener("resize", aoMudar);
    return () => window.removeEventListener("resize", aoMudar);
  }, []);
  return n;
}

/* No celular os depoimentos viram uma coluna só, e os dez em fila davam umas seis telas de
   rolagem até a próxima seção. Ali aparecem os primeiros e um botão para o resto; em duas ou
   três colunas cabem todos sem cansar. */
const DEPOIMENTOS_NO_CELULAR = 4;

function Depoimentos() {
  const [avaliacoes, setAvaliacoes] = useState(null);
  const [verTodos, setVerTodos] = useState(false);

  useEffect(() => {
    let vivo = true;
    fetch(`${API}/api/avaliacoes/vitrine`)
      .then((r) => (r.ok ? r.json() : { avaliacoes: [] }))
      .then((d) => { if (vivo) setAvaliacoes(d.avaliacoes || []); })
      // Site fora do ar por causa de uma avaliação seria péssimo negócio: em qualquer
      // falha a seção simplesmente não aparece.
      .catch(() => { if (vivo) setAvaliacoes([]); });
    return () => { vivo = false; };
  }, []);

  /* Enquanto a API não responde, avaliacoes é null — mas os depoimentos recebidos por
     WhatsApp já estão aqui e não dependem de rede nenhuma. A seção só some quando não há
     absolutamente nada para mostrar: vitrine vazia comunica o contrário do que pretende. */
  const quantasColunas = useQuantasColunas();
  const daApi = avaliacoes || [];
  if (daApi.length === 0 && DEPOIMENTOS_RECEBIDOS.length === 0) return null;

  const media = daApi.length
    ? (daApi.reduce((s, a) => s + Number(a.nota || 0), 0) / daApi.length).toFixed(1)
    : null;

  const cartoes = [
    ...daApi.map((a, i) => ({
      texto: a.comentario,
      elemento: (
        <figure className="depoimento" key={`api-${i}`}>
          <EstrelasFixas nota={Number(a.nota) || 0} />
          {a.comentario && <blockquote>{a.comentario}</blockquote>}
          <Assinatura nome={a.cliente} empreendimento={a.empreendimento} origem="Avaliação pelo sistema" />
        </figure>
      ),
    })),
    ...DEPOIMENTOS_RECEBIDOS.map((d, i) => ({
      texto: d.texto,
      foto: Boolean(d.foto),
      elemento: (
        <figure className="depoimento" key={`recebido-${i}`}>
          {d.foto && (
            <Foto nome={d.foto} alt={`Cliente da FN Edificações no dia da vistoria`} className="depoimento__foto" />
          )}
          <IconeAspas className="depoimento__aspas" />
          <blockquote>{d.texto}</blockquote>
          <Assinatura nome={d.nome} empreendimento={d.empreendimento} origem="Mensagem enviada à equipe" />
        </figure>
      ),
    })),
  ];

  /* Colunas montadas aqui, e não com "columns" do CSS nem com grade comum. Os textos vão de
     uma linha a um parágrafo inteiro: na grade cada linha ficava da altura do maior, com
     buracos embaixo dos curtos; com "columns" o navegador deixava uma coluna com metade da
     altura das outras. Os maiores são distribuídos primeiro, cada um na coluna mais baixa até
     ali (pela estimativa: moldura + nome ≈ 200px, e ~0,62px por letra numa coluna de ~340px);
     depois cada coluna volta à ordem original, para os do sistema continuarem no alto. */
  const recolhido = quantasColunas === 1 && !verTodos && cartoes.length > DEPOIMENTOS_NO_CELULAR;
  // Recolhido, só os que têm texto: um cartão só de estrelas não convence ninguém sozinho.
  const exibidos = recolhido ? cartoes.filter((c) => c.texto).slice(0, DEPOIMENTOS_NO_CELULAR) : cartoes;

  const altura = (c) => 200 + (c.texto?.length || 0) * 0.62 + (c.foto ? 200 : 0);
  const colunas = Array.from({ length: quantasColunas }, () => ({ altura: 0, cartoes: [] }));
  exibidos
    .map((c, ordem) => ({ ...c, ordem }))
    .sort((a, b) => altura(b) - altura(a))
    .forEach((c) => {
      const maisBaixa = colunas.reduce((a, b) => (b.altura < a.altura ? b : a));
      maisBaixa.cartoes.push(c);
      maisBaixa.altura += altura(c);
    });
  colunas.forEach((col) => col.cartoes.sort((a, b) => a.ordem - b.ordem));

  return (
    <section className="secao" id="depoimentos">
      <div className="env">
        <div className="secao__intro secao__intro--linha">
          <div>
            <p className="olho">Quem já foi atendido</p>
            <h2>O que os clientes dizem.</h2>
            <p>
              O que os clientes escreveram depois da entrega das chaves — pelo sistema da FN, ao
              final do atendimento, e nas mensagens que eles mandam no dia da vistoria.
            </p>
          </div>
          {media && (
            <div className="nota-media">
              <strong>{media.replace(".", ",")}</strong>
              <span>
                <EstrelasFixas nota={Math.round(Number(media))} />
                <small>
                  {daApi.length === 1 ? "1 avaliação" : `${daApi.length} avaliações`} no sistema
                </small>
              </span>
            </div>
          )}
        </div>

        <div className="depoimentos" style={{ gridTemplateColumns: `repeat(${colunas.length}, minmax(0, 1fr))` }}>
          {colunas.map((coluna, i) => (
            <div className="depoimentos__coluna" key={i}>
              {coluna.cartoes.map((c) => c.elemento)}
            </div>
          ))}
        </div>
        {recolhido && (
          <button type="button" className="btn btn--contorno-escuro depoimentos__mais"
            onClick={() => setVerTodos(true)}>
            Ver todos os {cartoes.length} depoimentos
          </button>
        )}
      </div>
    </section>
  );
}

function Carrossel({ children, rotulo }) {
  const trilho = useRef(null);

  const rolar = (direcao) => {
    const el = trilho.current;
    if (!el) return;
    el.scrollBy({ left: direcao * (el.clientWidth * 0.9), behavior: "smooth" });
  };

  return (
    <div className="galeria">
      <div className="galeria__trilho" ref={trilho} tabIndex={0} role="region" aria-label={rotulo}>
        {children}
      </div>
      <button className="galeria__seta galeria__seta--esq" onClick={() => rolar(-1)} aria-label="Ver anteriores"><IconeSetaEsq /></button>
      <button className="galeria__seta galeria__seta--dir" onClick={() => rolar(1)} aria-label="Ver próximos"><IconeSetaDir /></button>
    </div>
  );
}

function LinhaDeFotos({ nomes, pasta, descricao, rotulo }) {
  return (
    <Carrossel rotulo={rotulo}>
      {nomes.map((peca, i) => {
        /* Aceita tanto o manifesto ({ nome, largura, altura }) quanto um nome solto, para uma
           galeria nova poder começar sem manifesto. Sem a dimensão o cartão volta ao antigo
           recorte 3:4, que é feio mas não quebra a fileira. */
        const nome = typeof peca === "string" ? peca : peca.nome;
        const proporcao = peca.largura && peca.altura ? peca.largura / peca.altura : null;
        return (
          <figure className="entrega" key={nome}>
            <img
              src={`/img/${pasta}/${nome}-540.webp`}
              srcSet={`/img/${pasta}/${nome}-320.webp 320w, /img/${pasta}/${nome}-540.webp 540w, /img/${pasta}/${nome}-1080.webp 1080w`}
              sizes="420px"
              width={peca.largura} height={peca.altura}
              style={proporcao ? { aspectRatio: String(proporcao) } : undefined}
              alt={`${descricao} (${i + 1} de ${nomes.length})`}
              loading={i < 3 ? "eager" : "lazy"} decoding="async"
            />
          </figure>
        );
      })}
    </Carrossel>
  );
}

/* O vídeo só é baixado quando a pessoa toca em play: até lá aparece o poster, que é
   uma imagem leve. Sem isso, oito vídeos custariam 8 MB a quem só queria ler a página. */
function CartaoVideo({ nome, legenda, comSom }) {
  const [tocando, setTocando] = useState(false);

  return (
    <figure className="videocard">
      {tocando ? (
        <video src={`/video/${nome}.mp4`} poster={`/video/${nome}.jpg`}
          controls autoPlay playsInline muted={!comSom} preload="auto" />
      ) : (
        <button className="videocard__capa" onClick={() => setTocando(true)}
          aria-label={`Assistir: ${legenda}`}>
          <img src={`/video/${nome}.jpg`} alt="" loading="lazy" decoding="async" />
          <span className="videocard__play" aria-hidden="true"><IconePlay /></span>
        </button>
      )}
      {/* A legenda fica por cima da capa e sai quando o vídeo toca, para não cobrir os
          controles do player. */}
      {!tocando && (
        <figcaption>
          {legenda}
          {!comSom && <span className="videocard__mudo"><IconeMudo tamanho={13} /> sem áudio</span>}
        </figcaption>
      )}
    </figure>
  );
}

function Foto({ nome, alt, className, ...resto }) {
  return (
    <img
      className={className}
      src={`/img/${nome}-1600.webp`}
      srcSet={`/img/${nome}-800.webp 800w, /img/${nome}-1600.webp 1600w`}
      sizes="(max-width: 900px) 100vw, 50vw"
      alt={alt}
      {...resto}
    />
  );
}

/* Qual seção do menu está no meio da tela agora. A página é longa e o menu fica fixo no
   alto: marcar onde a pessoa está é o que faz o menu servir de mapa, e não só de atalho.
   Fora das seções do menu (mapa, entregas, momento) nenhum item fica marcado. */
function useSecaoAtual() {
  const [atual, setAtual] = useState(null);
  useEffect(() => {
    const vistas = new Map();
    const observador = new IntersectionObserver((entradas) => {
      for (const e of entradas) vistas.set(e.target.id, e.isIntersecting);
      const primeira = NAVEGACAO.find(([href]) => vistas.get(href.slice(1)));
      setAtual(primeira ? primeira[0] : null);
    }, { rootMargin: "-45% 0px -50% 0px" });
    for (const [href] of NAVEGACAO) {
      const el = document.getElementById(href.slice(1));
      if (el) observador.observe(el);
    }
    return () => observador.disconnect();
  }, []);
  return atual;
}

/* Sombra no cabeçalho só depois que a página rola: no alto ele se funde com o topo escuro,
   e com sombra ali parecia uma faixa colada por cima. */
function useRolou() {
  const [rolou, setRolou] = useState(false);
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);
  return rolou;
}

export default function App() {
  const [gaveta, setGaveta] = useState(false);
  const secaoAtual = useSecaoAtual();
  const rolou = useRolou();

  return (
    <>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>

      <header className={`cabecalho${rolou ? " cabecalho--rolou" : ""}`}>
        <div className="env cabecalho__barra">
          <a className="marca" href="#inicio" aria-label="FN Edificações, página inicial">
            <img src="/img/logo-fn-transparente-800.webp" alt="" width="48" height="48" />
            <span>
              <span className="marca__nome">FN Edificações</span>
              <span className="marca__linha">Vistorias e responsabilidade técnica</span>
            </span>
          </a>

          <nav className="menu" aria-label="Navegação principal">
            {NAVEGACAO.map(([href, texto]) => (
              <a key={href} href={href} className={secaoAtual === href ? "ativo" : undefined}
                aria-current={secaoAtual === href ? "location" : undefined}>{texto}</a>
            ))}
          </nav>

          <div className="cabecalho__acoes">
            {/* Um botão só. Havia também um "Acessar o Sistema" ao lado, mas os dois levavam
                ao mesmo endereço — e a tela que abre já separa cliente, parceiro e equipe.
                Dois botões idênticos só fazem o visitante parar para escolher. */}
            <a className="btn btn--principal" href={SISTEMA} target="_blank" rel="noopener">
              Solicitar vistoria
            </a>
          </div>

          <button className="hamburguer" onClick={() => setGaveta((v) => !v)}
            aria-expanded={gaveta} aria-controls="gaveta" aria-label={gaveta ? "Fechar menu" : "Abrir menu"}>
            {gaveta ? <Fechar /> : <Menu />}
          </button>
        </div>

        {gaveta && (
          <div className="gaveta" id="gaveta">
            <div className="env">
              {NAVEGACAO.map(([href, texto]) => (
                <a key={href} className="gaveta__link" href={href} onClick={() => setGaveta(false)}>{texto}</a>
              ))}
              <div className="gaveta__acoes">
                <a className="btn btn--principal btn--bloco" href={SISTEMA} target="_blank" rel="noopener">
                  Solicitar vistoria
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="conteudo">
        {/* ---------------- Hero ---------------- */}
        <section className="hero" id="inicio">
          <div className="env hero__grade">
            <div>
              <span className="hero__olho">Vistoria técnica independente</span>
              <h1>Não assine o aceite <em>antes de saber</em> o que tem no seu imóvel.</h1>
              <p className="hero__texto">
                Um técnico em edificações percorre a unidade na entrega das chaves e registra,
                com foto e norma, tudo que a construtora ainda precisa corrigir.
              </p>
              <div className="hero__acoes">
                <a className="btn btn--principal" href={SISTEMA} target="_blank" rel="noopener">
                  Solicitar vistoria
                </a>
                <a className="btn btn--zap" href={WHATSAPP} target="_blank" rel="noopener">
                  <ZapIcone width="18" height="18" /> Tirar uma dúvida
                </a>
              </div>
              <ul className="hero__apoio">
                <li><IconeLocal tamanho={17} /> Paulista, Recife e Região Metropolitana</li>
                <li><IconeRelogio tamanho={17} /> Resposta no mesmo dia</li>
              </ul>
            </div>

            <figure className="hero__figura">
              {/* Retrato: a foto mostra o técnico agachado registrando um ralo — cortar
                  para paisagem tiraria ou ele ou o ponto verificado, que é a cena toda. */}
              <img className="hero__retrato"
                src="/img/hero-vistoria-1120.webp"
                srcSet="/img/hero-vistoria-560.webp 560w, /img/hero-vistoria-1120.webp 1120w"
                sizes="(max-width: 900px) 100vw, 46vw"
                alt="Técnico da FN Edificações registrando a verificação de um ralo durante vistoria" />
              {/* Aqui havia "+1.000 imóveis vistoriados", que não batia com o número de clientes
                  que o mapa mostra logo abaixo (vindo da base real). Número que o visitante não
                  consegue conferir enfraquece o que é conferível; o selo agora diz o que é
                  verdade por definição do serviço. */}
              <figcaption className="hero__selo">
                <span className="hero__selo-icone"><IconeEscudo /></span>
                <span>
                  <strong>Vistoria independente</strong>
                  <span>Sem vínculo com a construtora</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <div className="faixa">
          <div className="env faixa__grade">
            {[
              [IconeLaudo, "Laudo digital", "Com fotos, norma técnica e recomendações"],
              [IconeTecnico, "Técnico em edificações", "Responsabilidade técnica registrada"],
              [IconeTela, "Acompanhamento online", "Você segue cada etapa pelo sistema"],
            ].map(([IconeItem, titulo, texto]) => (
              <div className="faixa__item" key={titulo}>
                <span className="faixa__icone"><IconeItem /></span>
                <span className="faixa__texto">
                  <strong>{titulo}</strong>
                  <span>{texto}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Serviços ---------------- */}
        <section className="secao" id="servicos">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">O que fazemos</p>
              <h2>Dois serviços, sem letra miúda.</h2>
              <p>Escolha o que você precisa. O cadastro leva menos de dois minutos.</p>
            </div>

            <div className="servicos">
              {SERVICOS.map(({ icone: IconeServico, ...s }) => (
                <article className={`servico${s.destaque ? " servico--destaque" : ""}`} key={s.numero}>
                  {s.destaque && <span className="servico__selo">Serviço principal</span>}
                  <div className="servico__topo">
                    <span className="servico__icone"><IconeServico tamanho={26} /></span>
                    <span className="servico__num">{s.numero}</span>
                  </div>
                  <h3>{s.titulo}</h3>
                  <p>{s.resumo}</p>
                  <ul>
                    {s.itens.map((i) => (
                      <li key={i}><Check /> {i}</li>
                    ))}
                  </ul>
                  <a className={`btn ${s.destaque ? "btn--principal" : "btn--azul"}`}
                    href={SISTEMA} target="_blank" rel="noopener">
                    {s.textoBotao}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Como funciona ---------------- */}
        <section className="secao secao--alt" id="como-funciona">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">Como funciona</p>
              <h2>Da solicitação ao laudo, em quatro etapas.</h2>
              <p>Cada etapa fica registrada no sistema, e você acompanha de onde estiver.</p>
            </div>

            <div className="passos">
              {PASSOS.map(([titulo, texto], i) => (
                <div className="passo" key={titulo}>
                  <div className="passo__bola">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3>{titulo}</h3>
                    <p>{texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <OndeAtuamos api={API} />

        {/* ---------------- Entregas realizadas ---------------- */}
        <section className="secao secao--alt" id="entregas">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">Entregas realizadas</p>
              <h2>O dia da chave é o que a gente protege.</h2>
              <p>
                Cada peça é uma vistoria concluída antes do aceite — o cliente recebendo o
                imóvel com o laudo em mãos e as pendências registradas.
              </p>
            </div>
          </div>
          <LinhaDeFotos nomes={ENTREGAS} pasta="entregas" rotulo="Fotos de entregas de chaves"
            descricao="Entrega de chaves acompanhada pela equipe da FN Edificações" />
        </section>

        {/* ---------------- Vistoriadores em campo ---------------- */}
        <section className="secao" id="vistorias">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">A vistoria por dentro</p>
              <h2>É item por item, ambiente por ambiente.</h2>
              <p>
                Registros do trabalho em campo: o técnico percorrendo a unidade, testando
                e documentando cada ponto que entra no laudo.
              </p>
            </div>
          </div>

          <LinhaDeFotos nomes={VISTORIAS} pasta="vistorias" rotulo="Fotos de vistorias em campo"
            descricao="Técnico da FN Edificações durante vistoria" />

          <div className="env" style={{ marginTop: 40 }}>
            <p className="rotulo-linha">Em vídeo <span>· toque para assistir</span></p>
            <div className="videos">
              {VIDEOS_TRABALHO.map(([nome, legenda]) => (
                <CartaoVideo key={nome} nome={nome} legenda={legenda} comSom={false} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Clientes recebendo ---------------- */}
        <section className="secao secao--alt" id="momento">
          <div className="env momento">
            <div className="secao__intro">
              <p className="olho">O momento da chave</p>
              <h2>A parte que a gente faz por último.</h2>
              <p>Clientes recebendo o imóvel com o laudo em mãos.</p>
              <a className="btn btn--principal" style={{ marginTop: 26 }}
                href={SISTEMA} target="_blank" rel="noopener">
                Solicitar vistoria
              </a>
            </div>
            <div className="videos videos--duplo">
              {VIDEOS_CLIENTES.map(([nome, legenda]) => (
                <CartaoVideo key={nome} nome={nome} legenda={legenda} comSom />
              ))}
            </div>
          </div>
        </section>

        <Depoimentos />

        {/* ---------------- Dúvidas ---------------- */}
        <section className="secao secao--alt" id="duvidas">
          <div className="env duvidas">
            <div className="secao__intro">
              <p className="olho">Dúvidas frequentes</p>
              <h2>O que os clientes mais perguntam.</h2>
              <p>Não achou a sua? Mande pelo WhatsApp — quem responde é a equipe técnica.</p>
              <a className="btn btn--zap" style={{ marginTop: 22 }} href={WHATSAPP} target="_blank" rel="noopener">
                <ZapIcone width="18" height="18" /> Perguntar no WhatsApp
              </a>
            </div>

            <div className="faq">
              {DUVIDAS.map(([pergunta, resposta], i) => (
                <details key={pergunta} open={i === 0}>
                  <summary>{pergunta}</summary>
                  <p>{resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FN Club ---------------- */}
        <section className="secao" id="parceiros">
          <div className="env club">
            <div>
              <p className="olho">FN Club</p>
              <h2>Depois das chaves, você não fica sozinho.</h2>
              <p style={{ color: "var(--tinta-media)", marginTop: 12 }}>
                O FN Club reúne prestadores e fornecedores com condições especiais para quem
                foi atendido pela FN. Cada parceiro atua sob responsabilidade própria,
                conforme o serviço contratado.
              </p>
              {/* A vitrine de parceiros mora no sistema, que é onde o cadastro, a aprovação
                  e os cupons acontecem. O site antigo tinha um diretório próprio que
                  mostrava "0 parceiro(s)" — não vale recriar uma segunda lista vazia. */}
              <a className="btn btn--contorno-escuro" style={{ marginTop: 24 }}
                href={SISTEMA} target="_blank" rel="noopener">
                Ver parceiros e benefícios
              </a>
            </div>

            <div className="club__lista">
              {CLUB.map(([titulo, texto]) => (
                <div className="club__item" key={titulo}>
                  {titulo}
                  <span>{texto}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Chamada final ---------------- */}
        <section className="secao final" id="contato">
          <div className="env">
            <div className="final__painel">
              <div>
                <h2>Receba seu imóvel com clareza.</h2>
                <p>
                  Solicite sua vistoria pelo sistema ou mande uma mensagem — respondemos
                  no mesmo dia, em horário comercial.
                </p>
              </div>
              <div className="final__acoes">
                <a className="btn btn--principal" href={SISTEMA} target="_blank" rel="noopener">
                  Solicitar vistoria
                </a>
                <a className="btn btn--zap" href={WHATSAPP} target="_blank" rel="noopener">
                  <ZapIcone width="18" height="18" /> {TELEFONE_EXIBIDO}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="env">
          <div className="rodape__grade">
            <div>
              <div className="rodape__marca">
                <img src="/img/logo-fn-transparente-800.webp" alt="" width="44" height="44" loading="lazy" />
                <strong>FN Edificações</strong>
              </div>
              <p>Vistorias, laudos e responsabilidade técnica para o seu imóvel.</p>
              <p style={{ marginTop: 14 }}>
                <a className="rodape__social" href={INSTAGRAM} target="_blank" rel="noopener">
                  <IconeInstagram tamanho={18} /> @fn.edificacoes
                </a>
              </p>
            </div>

            <div>
              <h4>Atendimento</h4>
              <ul>
                <li>Paulista, Recife e RMR</li>
                <li><a href="#atuacao">Onde atuamos</a></li>
                <li><a href="#entregas">Entregas realizadas</a></li>
                <li><a href={WHATSAPP} target="_blank" rel="noopener">{TELEFONE_EXIBIDO}</a></li>
                {/* Única repetição do sistema na página, e em texto — não outro botão. */}
                <li><a href={SISTEMA} target="_blank" rel="noopener">Acessar o Sistema FN</a></li>
              </ul>
            </div>

            <div>
              <h4>Responsabilidade técnica</h4>
              <ul>
                <li>Técnico em edificações</li>
                <li>ART e TRT conforme o caso</li>
              </ul>
            </div>
          </div>

          <div className="rodape__base">
            {/* CNPJ no rodapé: é o que o cliente procura antes de fechar com uma empresa que
                ainda não conhece, e o que a nota fiscal vai mostrar. */}
            <span>© {new Date().getFullYear()} FN Edificações · CNPJ {CNPJ_EXIBIDO}</span>
            <span>Segurança, qualidade e responsabilidade técnica.</span>
          </div>
        </div>
      </footer>

      <a className="zap-flutuante" href={WHATSAPP} target="_blank" rel="noopener"
        aria-label="Falar pelo WhatsApp">
        <ZapIcone />
      </a>
    </>
  );
}
