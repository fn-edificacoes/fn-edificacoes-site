import { useEffect, useMemo, useRef, useState } from "react";
import {
  CATEGORIAS, PRODUTOS, PARCEIROS, MOMENTOS, TOTAL_PRODUTOS,
  categoriaPorId, formatarFaixa,
} from "../dados/catalogo.js";
import { KITS } from "../dados/kits.js";
import {
  montarLink, registrarClique, favoritos as lerFavoritos, alternarFavorito,
  dataDasChaves, definirDataDasChaves, momentoPelaData, identidade,
} from "./rastreio.js";

/* ============================================================================
   Loja Recomendada FN.

   A tese da loja cabe em uma frase: a FN é a única empresa que está dentro do
   apartamento no dia em que ele é entregue. Isso não dá direito a vender
   qualquer coisa — dá direito a dizer o que comprar primeiro.

   Três decisões estruturais:

   1. O eixo é o TEMPO DE CHAVE, não a categoria. Nenhum marketplace consegue
      copiar isso, porque nenhum sabe quando o cliente recebeu o imóvel. A FN
      sabe: está no laudo. Por isso a primeira pergunta da página não é "o que
      você procura", é "quando você recebeu as chaves".

   2. Nada de preço fixo. A loja não tem estoque nem controle de preço; publicar
      valor exato seria informação vencida em uma semana e risco de publicidade
      enganosa. Faixa indicativa, sempre rotulada como estimativa.

   3. A comissão é dita na cara do usuário, não escondida no rodapé. É exigência
      do CONAR e do CDC — e, principalmente, é o que mantém de pé a única coisa
      que a FN tem para vender aqui, que é a confiança do laudo.
   ========================================================================== */

const SISTEMA = "https://sistema.fnedificacoes.com.br/";
const WHATSAPP = "https://wa.me/5581983061305?text=" +
  encodeURIComponent("Olá! Vim pela Loja Recomendada FN e queria uma orientação.");
const SITE = "/";

const Check = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const Estrela = ({ cheia, ...p }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={cheia ? "currentColor" : "none"}
    stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M12 3.5l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.9l6-.9z" />
  </svg>
);
const Saida = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ORDEM_MOMENTOS = ["D0", "S1", "M1", "M3", "M6", "M12"];

const DUVIDAS = [
  [
    "A FN vende esses produtos?",
    "Não. A FN não tem estoque, não emite a nota fiscal e não entrega nada. A loja é uma lista de " +
    "recomendações: você clica, vai para o site do parceiro (Amazon, Mercado Livre, Leroy Merlin e " +
    "outros) e a compra acontece lá, sob as regras e a garantia daquele parceiro.",
  ],
  [
    "Como a FN ganha com isso?",
    "Quando você compra pelo nosso link, o parceiro repassa uma comissão à FN. Essa comissão sai da " +
    "margem do parceiro — o preço que você paga é exatamente o mesmo que pagaria indo direto ao site. " +
    "Se um dia isso mudar, estará escrito aqui antes de você clicar.",
  ],
  [
    "Vocês recomendam o que paga mais comissão?",
    "Não, e a regra é escrita: nenhum produto entra no catálogo por causa da comissão. Entra porque " +
    "aparece na rotina de quem acabou de receber um apartamento. Há itens aqui com comissão baixíssima " +
    "e outros sem comissão nenhuma, que ficam porque o cliente precisa.",
  ],
  [
    "Os preços mostrados estão certos?",
    "São faixas indicativas, para você se planejar — não são o preço da loja. O valor real é o que " +
    "aparecer no site do parceiro no momento do clique, e só ele vale.",
  ],
  [
    "E se der problema com o produto?",
    "A relação de consumo é com quem vendeu. Troca, devolução, garantia e prazo seguem o parceiro e o " +
    "Código de Defesa do Consumidor. Ainda assim, avise a gente: parceiro que dá problema recorrente " +
    "sai da lista, e é por isso que a curadoria significa alguma coisa.",
  ],
  [
    "Sou cliente da FN. Muda algo para mim?",
    "Muda. Entrando pelo Sistema FN, a loja já sabe há quanto tempo você recebeu as chaves e mostra " +
    "primeiro o que faz sentido agora. É também assim que as condições de parceiro do FN Club ficam " +
    "vinculadas ao seu cadastro.",
  ],
];

/* --------------------------------------------------------------------------
   Cartão de produto
   -------------------------------------------------------------------------- */
function CartaoProduto({ produto, favorito, onFavoritar, onAbrir }) {
  const categoria = categoriaPorId[produto.categoria];
  return (
    <article className="prod">
      <button className="prod__corpo" onClick={() => onAbrir(produto)}
        aria-label={`Ver detalhes de ${produto.nome}`}>
        <span className="prod__cat">{categoria.nome}</span>
        <span className="prod__nome">{produto.nome}</span>
        <span className="prod__faixa">
          {formatarFaixa(produto.faixa)}
          <small>faixa estimada</small>
        </span>
      </button>
      <div className="prod__rodape">
        <span className={`selo selo--${produto.prioridade.toLowerCase()}`}>
          {MOMENTOS[produto.momento].rotulo}
        </span>
        <button className="prod__fav" onClick={() => onFavoritar(produto.id)}
          aria-pressed={favorito}
          aria-label={favorito ? `Tirar ${produto.nome} da minha lista` : `Salvar ${produto.nome} na minha lista`}>
          <Estrela cheia={favorito} />
        </button>
      </div>
    </article>
  );
}

/* --------------------------------------------------------------------------
   Painel lateral: detalhe do produto ou do kit.

   Um painel só, com conteúdo trocado, em vez de dois componentes de diálogo:
   o comportamento de teclado e foco é idêntico e vale escrever uma vez.
   -------------------------------------------------------------------------- */
function Painel({ aberto, aoFechar, titulo, children }) {
  const fechar = useRef(null);

  useEffect(() => {
    if (!aberto) return;
    fechar.current?.focus();
    const naTecla = (e) => { if (e.key === "Escape") aoFechar(); };
    document.addEventListener("keydown", naTecla);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", naTecla);
      document.body.style.overflow = "";
    };
  }, [aberto, aoFechar]);

  if (!aberto) return null;

  return (
    <div className="painel__fundo" onClick={aoFechar}>
      <div className="painel" role="dialog" aria-modal="true" aria-label={titulo}
        onClick={(e) => e.stopPropagation()}>
        <button className="painel__x" onClick={aoFechar} ref={fechar} aria-label="Fechar">×</button>
        {children}
      </div>
    </div>
  );
}

function BotaoParceiro({ produto, origem, bloco }) {
  const parceiro = PARCEIROS[produto.parceiro];
  const link = montarLink(produto);

  /* Parceiro local do FN Club não tem vitrine online: a conversa vai para o
     Atendimento, que faz a ponte e registra a indicação no sistema. */
  if (!link) {
    return (
      <a className={`btn btn--zap ${bloco ? "btn--bloco" : ""}`}
        href={`${WHATSAPP.split("?")[0]}?text=${encodeURIComponent(
          `Olá! Quero orçamento de "${produto.nome}" com um parceiro do FN Club.`)}`}
        target="_blank" rel="noopener"
        onClick={() => registrarClique(produto, origem)}>
        Pedir orçamento pelo FN Club
      </a>
    );
  }

  return (
    <a className={`btn btn--principal ${bloco ? "btn--bloco" : ""}`}
      href={link} target="_blank" rel="noopener sponsored nofollow"
      onClick={() => registrarClique(produto, origem)}>
      Ver {parceiro.artigo} {parceiro.nome} <Saida />
    </a>
  );
}

/* --------------------------------------------------------------------------
   Página
   -------------------------------------------------------------------------- */
export default function Loja() {
  const [momento, setMomento] = useState(null);
  const [categoria, setCategoria] = useState("todas");
  const [busca, setBusca] = useState("");
  const [soEssenciais, setSoEssenciais] = useState(false);
  const [soFavoritos, setSoFavoritos] = useState(false);
  const [favs, setFavs] = useState(() => new Set());
  const [produtoAberto, setProdutoAberto] = useState(null);
  const [kitAberto, setKitAberto] = useState(null);
  const [chavesEm, setChavesEm] = useState(null);
  const [quem, setQuem] = useState({ tipo: "anonimo" });

  /* localStorage e query string só existem no navegador; ler em efeito mantém
     o componente puro na primeira renderização. */
  useEffect(() => {
    setFavs(lerFavoritos());
    setQuem(identidade());
    const data = dataDasChaves();
    if (data) {
      setChavesEm(data);
      setMomento(momentoPelaData(data));
    }
  }, []);

  const naData = (valor) => {
    setChavesEm(valor || null);
    definirDataDasChaves(valor || null);
    setMomento(valor ? momentoPelaData(valor) : null);
  };

  const favoritar = (id) => setFavs(new Set(alternarFavorito(id)));

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const ordemPrio = { A: 0, B: 1, C: 2 };
    return PRODUTOS
      .filter((p) => (categoria === "todas" ? true : p.categoria === categoria))
      .filter((p) => (momento ? p.momento === momento : true))
      .filter((p) => (soEssenciais ? p.prioridade === "A" : true))
      .filter((p) => (soFavoritos ? favs.has(p.id) : true))
      .filter((p) =>
        !termo ||
        p.nome.toLowerCase().includes(termo) ||
        categoriaPorId[p.categoria].nome.toLowerCase().includes(termo))
      .sort((a, b) =>
        ordemPrio[a.prioridade] - ordemPrio[b.prioridade] ||
        a.nome.localeCompare(b.nome, "pt-BR"));
  }, [categoria, momento, soEssenciais, soFavoritos, favs, busca]);

  const kitsVisiveis = useMemo(
    () => (momento ? [...KITS].sort((a, b) => (b.momento === momento) - (a.momento === momento)) : KITS),
    [momento]
  );

  const limpar = () => {
    setCategoria("todas"); setBusca(""); setSoEssenciais(false); setSoFavoritos(false); setMomento(null);
  };

  return (
    <>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>

      <header className="cabecalho">
        <div className="env cabecalho__barra">
          <a className="marca" href={SITE} aria-label="FN Edificações, página inicial">
            <img src="/img/logo-fn-transparente-800.webp" alt="" width="48" height="48" />
            <span>
              <span className="marca__nome">Loja Recomendada FN</span>
              <span className="marca__linha">Curadoria de quem vistoria seu apartamento</span>
            </span>
          </a>
          <nav className="menu" aria-label="Navegação da loja">
            <a href="#momento">Por onde começar</a>
            <a href="#kits">Kits FN</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#transparencia">Como funciona</a>
          </nav>
          <div className="cabecalho__acoes">
            <a className="btn btn--principal" href={SISTEMA} target="_blank" rel="noopener">
              Entrar no Sistema FN
            </a>
          </div>
        </div>
      </header>

      <main id="conteudo">
        {/* ---------------- Hero ---------------- */}
        <section className="hero">
          <div className="env">
            <span className="hero__olho">Loja oficial recomendada</span>
            <h1>Você acabou de receber as chaves. <em>A gente já esteve aí dentro.</em></h1>
            <p className="hero__texto" style={{ maxWidth: "44em" }}>
              Depois de mais de mil vistorias de entrega, sabemos o que falta em um apartamento novo
              antes de você descobrir. Esta é a lista do que comprar — na ordem certa, no momento certo.
              Sem estoque, sem vendedor e sem empurrar o que rende mais.
            </p>
            <div className="hero__acoes">
              <a className="btn btn--principal" href="#momento">Começar pelo meu momento</a>
              <a className="btn btn--contorno" href="#kits">Ver os Kits FN</a>
            </div>
            <p className="hero__apoio">
              {TOTAL_PRODUTOS} produtos curados · {KITS.length} kits · {CATEGORIAS.length} categorias
            </p>
          </div>
        </section>

        {/* A regra da casa, dita antes de qualquer link — não no rodapé. */}
        <div className="aviso-topo">
          <div className="env">
            <strong>Como esta loja se sustenta:</strong> ao comprar pelos nossos links, a FN recebe uma
            comissão do parceiro. <strong>O preço para você é o mesmo</strong> de ir direto ao site dele.
            Nenhum produto entra aqui por pagar mais. <a href="/loja/transparencia/">Ler a política completa</a>
          </div>
        </div>

        {/* ---------------- Momento da jornada ---------------- */}
        <section className="secao" id="momento">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">Por onde começar</p>
              <h2>Quando você recebeu as chaves?</h2>
              <p>
                A necessidade de quem pegou a chave ontem não é a mesma de quem está lá há seis meses.
                Diga o momento e a loja se reorganiza — é para isso que ela existe.
              </p>
            </div>

            <div className="momentos" role="group" aria-label="Momento da jornada">
              {ORDEM_MOMENTOS.map((m) => (
                <button key={m} className={`momento ${momento === m ? "momento--ativo" : ""}`}
                  onClick={() => setMomento(momento === m ? null : m)} aria-pressed={momento === m}>
                  <strong>{MOMENTOS[m].rotulo}</strong>
                  <span>{MOMENTOS[m].descricao}</span>
                </button>
              ))}
            </div>

            <div className="momento__data">
              <label htmlFor="chaves">Ou informe a data da entrega e a gente calcula:</label>
              <input id="chaves" type="date" value={chavesEm ?? ""} max={new Date().toISOString().slice(0, 10)}
                onChange={(e) => naData(e.target.value)} />
              {chavesEm && (
                <button className="link-sutil" onClick={() => naData("")}>limpar</button>
              )}
              {quem.tipo === "cliente" && (
                <span className="momento__cliente"><Check /> Reconhecemos seu acesso pelo Sistema FN</span>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- Kits ---------------- */}
        <section className="secao secao--alt" id="kits">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">Kits FN</p>
              <h2>A resposta pronta para “o que eu compro agora?”</h2>
              <p>
                Cada kit resolve um momento inteiro, não uma prateleira. São listas fechadas: se um item
                está aqui, é porque a gente viu falta dele em apartamento de verdade.
              </p>
            </div>

            <div className="kits">
              {kitsVisiveis.map((kit) => (
                <article className={`kit ${kit.destaque ? "kit--destaque" : ""}`} key={kit.id}>
                  <span className="kit__momento">{MOMENTOS[kit.momento].rotulo}</span>
                  <h3>{kit.nome}</h3>
                  <p className="kit__chamada">{kit.chamada}</p>
                  <p className="kit__meta">
                    {kit.itens.length} itens · {formatarFaixa(kit.faixa)}
                    <small>estimativa somando as faixas</small>
                  </p>
                  <button className="btn btn--azul btn--bloco" onClick={() => setKitAberto(kit)}>
                    Ver o kit
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Catálogo ---------------- */}
        <section className="secao" id="catalogo">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">Catálogo curado</p>
              <h2>{TOTAL_PRODUTOS} itens que fazem sentido em apartamento novo.</h2>
              <p>
                Organizados por categoria e por prioridade. “Essenciais” é o corte que a gente
                recomendaria a um parente — o resto é bom, mas pode esperar.
              </p>
            </div>

            <div className="filtros">
              <input className="filtros__busca" type="search" value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar produto ou categoria…" aria-label="Buscar no catálogo" />

              <select className="filtros__sel" value={categoria} onChange={(e) => setCategoria(e.target.value)}
                aria-label="Filtrar por categoria">
                <option value="todas">Todas as categorias</option>
                {CATEGORIAS.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>

              <label className="chip">
                <input type="checkbox" checked={soEssenciais} onChange={(e) => setSoEssenciais(e.target.checked)} />
                Só essenciais
              </label>

              <label className="chip">
                <input type="checkbox" checked={soFavoritos} onChange={(e) => setSoFavoritos(e.target.checked)} />
                Minha lista ({favs.size})
              </label>
            </div>

            <p className="filtros__resultado">
              {filtrados.length} {filtrados.length === 1 ? "item" : "itens"}
              {momento && <> · momento: <strong>{MOMENTOS[momento].rotulo}</strong></>}
              {(momento || categoria !== "todas" || busca || soEssenciais || soFavoritos) && (
                <button className="link-sutil" onClick={limpar}>limpar filtros</button>
              )}
            </p>

            {categoria !== "todas" && (
              <div className="cat-porque">
                <strong>Por que esta categoria está na loja</strong>
                <p>{categoriaPorId[categoria].porqueCliente}</p>
                <ul>
                  <li><span>Faixa de preço</span>{formatarFaixa(categoriaPorId[categoria].ticket)}</li>
                  <li><span>Quando costuma entrar</span>{MOMENTOS[categoriaPorId[categoria].momento].rotulo}</li>
                  {/* Dizer quanto ganhamos é incomum e é o ponto. A loja inteira se
                      apoia em não haver nada escondido entre o laudo e o clique. */}
                  <li><span>Comissão que recebemos</span>{categoriaPorId[categoria].comissao[0]}% a {categoriaPorId[categoria].comissao[1]}%</li>
                  <li><span>Itens curados</span>{PRODUTOS.filter((p) => p.categoria === categoria).length}</li>
                </ul>
                {categoriaPorId[categoria].antesDeComprar && (
                  <p className="cat-porque__nota">Antes de comprar: {categoriaPorId[categoria].antesDeComprar}</p>
                )}
              </div>
            )}

            {filtrados.length === 0 ? (
              <p className="vazio">
                Nada com esses filtros. {soFavoritos && "Sua lista ainda está vazia — toque na estrela de um produto para salvar. "}
                <button className="link-sutil" onClick={limpar}>Limpar filtros</button>
              </p>
            ) : (
              <div className="prods">
                {filtrados.map((p) => (
                  <CartaoProduto key={p.id} produto={p} favorito={favs.has(p.id)}
                    onFavoritar={favoritar} onAbrir={setProdutoAberto} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ---------------- Transparência ---------------- */}
        <section className="secao secao--alt" id="transparencia">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">Como funciona</p>
              <h2>Uma loja que não vende nada.</h2>
              <p>
                É estranho e é de propósito. A FN vive de laudo técnico — no dia em que a recomendação
                virar propaganda paga, o laudo perde valor. Então a regra é simples e pública.
              </p>
            </div>

            <div className="regras">
              {[
                ["Não temos estoque", "Nenhum produto é vendido, faturado ou entregue pela FN. A compra acontece no site do parceiro, sob as regras dele."],
                ["O preço é o mesmo", "A comissão sai da margem do parceiro, não do seu bolso. Comprar pelo nosso link não encarece nada."],
                ["Comissão não define curadoria", "Item entra por utilidade no apartamento novo. Há produtos aqui que pagam pouco ou nada — e ficam."],
                ["Parceiro ruim sai", "Reclamação recorrente de prazo, montagem ou atendimento tira o parceiro da lista. É o que faz a curadoria valer."],
                ["Faixa, não preço", "Mostramos faixas indicativas para planejamento. O preço válido é o da tela do parceiro, no momento da compra."],
                ["Você é dono dos seus dados", "Guardamos um identificador opaco para atribuir a indicação. Sem nome, e-mail ou telefone na loja."],
              ].map(([titulo, texto]) => (
                <div className="regra" key={titulo}>
                  <Check /><div><strong>{titulo}</strong><p>{texto}</p></div>
                </div>
              ))}
            </div>

            <p style={{ marginTop: 26 }}>
              <a className="btn btn--contorno-escuro" href="/loja/transparencia/">
                Políticas, LGPD e programa de afiliados
              </a>
            </p>
          </div>
        </section>

        {/* ---------------- Clube FN ---------------- */}
        <section className="secao" id="clube">
          <div className="env club">
            <div>
              <p className="olho">FN Club</p>
              <h2>Quem foi cliente da FN entra por outra porta.</h2>
              <p style={{ color: "var(--tinta-media)", marginTop: 12 }}>
                Entrando pelo Sistema FN, a loja já sabe há quanto tempo você recebeu as chaves e mostra
                primeiro o que faz sentido agora. É também no sistema que ficam as condições negociadas
                com prestadores locais — instalação, marcenaria, vidraçaria e climatização — vinculadas
                ao seu cadastro e ao seu laudo.
              </p>
              <a className="btn btn--contorno-escuro" style={{ marginTop: 24 }}
                href={SISTEMA} target="_blank" rel="noopener">
                Acessar o Sistema FN
              </a>
            </div>
            <div className="club__lista">
              {[
                ["Recomendação com laudo", "Sugestões que consideram a sua unidade"],
                ["Condições de parceiro", "Prestadores locais com preço negociado"],
                ["Lista de compras salva", "Seus favoritos acompanham o cadastro"],
                ["Alertas por momento", "Avisamos quando é hora de cada etapa"],
                ["Instalação com quem a FN conhece", "Parceiro que já atendeu nossos clientes"],
                ["Suporte pós-chaves", "Dúvida técnica continua com a gente"],
              ].map(([titulo, texto]) => (
                <div className="club__item" key={titulo}>{titulo}<span>{texto}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Dúvidas ---------------- */}
        <section className="secao secao--alt" id="duvidas">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">Dúvidas frequentes</p>
              <h2>O que perguntam antes de clicar.</h2>
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

        <section className="secao final">
          <div className="env">
            <h2>Ainda não recebeu as chaves?</h2>
            <p>
              A hora de falar com a gente é antes do aceite. A vistoria técnica independente registra o
              que a construtora ainda precisa corrigir — e é dela que sai tudo que você vê nesta loja.
            </p>
            <div className="final__acoes">
              <a className="btn btn--principal" href={SISTEMA} target="_blank" rel="noopener">
                Solicitar vistoria
              </a>
              <a className="btn btn--contorno" href={SITE}>Conhecer a FN Edificações</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="env">
          <div className="rodape__grade">
            <div>
              <h4>Loja Recomendada FN</h4>
              <p>
                Curadoria de produtos para quem acabou de receber um apartamento novo. Uma unidade da
                FN Edificações.
              </p>
            </div>
            <div>
              <h4>Na loja</h4>
              <ul>
                <li><a href="#momento">Por onde começar</a></li>
                <li><a href="#kits">Kits FN</a></li>
                <li><a href="#catalogo">Catálogo</a></li>
                <li><a href="#duvidas">Dúvidas</a></li>
              </ul>
            </div>
            <div>
              <h4>Transparência</h4>
              <ul>
                <li><a href="/loja/transparencia/">Política de afiliados</a></li>
                <li><a href="/loja/transparencia/#privacidade">Privacidade e LGPD</a></li>
                <li><a href="/loja/transparencia/#cookies">Cookies</a></li>
                {/* Analista de rede de afiliados procura exatamente por isto no rodapé
                    antes de aprovar um credenciamento. Discreto, mas presente. */}
                <li><a href="/loja/parceiros/">Para anunciantes</a></li>
                <li><a href={SITE}>Site da FN Edificações</a></li>
              </ul>
            </div>
          </div>
          <div className="rodape__base">
            <span>© {new Date().getFullYear()} FN Edificações</span>
            <span>Recomendamos. Quem vende é o parceiro.</span>
          </div>
        </div>
      </footer>

      {/* ---------------- Painéis ---------------- */}
      <Painel aberto={!!produtoAberto} aoFechar={() => setProdutoAberto(null)}
        titulo={produtoAberto?.nome ?? ""}>
        {produtoAberto && (
          <>
            <span className="painel__olho">{categoriaPorId[produtoAberto.categoria].nome}</span>
            <h2>{produtoAberto.nome}</h2>
            <p className="painel__faixa">
              {formatarFaixa(produtoAberto.faixa)}
              <small>faixa estimada — o preço válido é o do parceiro</small>
            </p>

            <dl className="painel__dados">
              <div><dt>Quando comprar</dt><dd>{MOMENTOS[produtoAberto.momento].rotulo}</dd></div>
              <div><dt>Prioridade</dt><dd>{produtoAberto.prioridade === "A" ? "Essencial" : produtoAberto.prioridade === "B" ? "Recomendado" : "Complementar"}</dd></div>
              <div><dt>Onde comprar</dt><dd>{PARCEIROS[produtoAberto.parceiro].nome}</dd></div>
            </dl>

            <p className="painel__porque">
              <strong>Por que está na loja:</strong> {categoriaPorId[produtoAberto.categoria].porqueCliente}
            </p>
            {categoriaPorId[produtoAberto.categoria].antesDeComprar && (
              <p className="painel__nota">
                <strong>Antes de comprar:</strong> {categoriaPorId[produtoAberto.categoria].antesDeComprar}
              </p>
            )}

            <div className="painel__acoes">
              <BotaoParceiro produto={produtoAberto} origem="catalogo" bloco />
              <button className="btn btn--contorno-escuro btn--bloco" onClick={() => favoritar(produtoAberto.id)}>
                {favs.has(produtoAberto.id) ? "Tirar da minha lista" : "Salvar na minha lista"}
              </button>
            </div>
            <p className="painel__aviso">
              Link de afiliado: a FN recebe comissão do parceiro se você comprar. O preço para você não muda.
            </p>
          </>
        )}
      </Painel>

      <Painel aberto={!!kitAberto} aoFechar={() => setKitAberto(null)} titulo={kitAberto?.nome ?? ""}>
        {kitAberto && (
          <>
            <span className="painel__olho">{MOMENTOS[kitAberto.momento].rotulo}</span>
            <h2>{kitAberto.nome}</h2>
            <p className="painel__chamada">{kitAberto.chamada}</p>
            <p className="painel__faixa">
              {formatarFaixa(kitAberto.faixa)}
              <small>somando as faixas dos {kitAberto.itens.length} itens</small>
            </p>
            <p className="painel__porque"><strong>Para quem:</strong> {kitAberto.publico}</p>

            <ul className="painel__itens">
              {kitAberto.itens.map((p) => (
                <li key={p.id}>
                  <div>
                    <strong>{p.nome}</strong>
                    <span>{formatarFaixa(p.faixa)} · {PARCEIROS[p.parceiro].nome}</span>
                  </div>
                  <BotaoParceiro produto={p} origem={`kit:${kitAberto.id}`} />
                </li>
              ))}
            </ul>
            <p className="painel__aviso">
              Cada item leva ao site do parceiro. A FN recebe comissão sobre a compra; o preço para
              você é o mesmo. Faixas são estimativas de planejamento, não preços da loja.
            </p>
          </>
        )}
      </Painel>
    </>
  );
}
