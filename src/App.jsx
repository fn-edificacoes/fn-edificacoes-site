import { useState, useRef } from "react";

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

const LOJA = "/loja/";

/* A ordem do menu segue a ordem da página. Parece detalhe, mas menu que salta
   para trás faz o visitante perder o lugar em que estava. */
const NAVEGACAO = [
  ["#servicos", "Serviços"],
  ["#como-funciona", "Como funciona"],
  ["#loja", "Loja FN"],
  ["#parceiros", "FN Club"],
  ["#entregas", "Entregas"],
  ["#vistorias", "A vistoria"],
  ["#duvidas", "Dúvidas"],
  ["#contato", "Contato"],
];

/* Os kits que aparecem na chamada da loja no site institucional. São os quatro
   de maior urgência no dia da chave — a lista completa mora em /loja/, e
   duplicar o catálogo aqui só criaria duas verdades para manter. */
const KITS_VITRINE = [
  ["Kit Dia das Chaves", "O que levar na vistoria"],
  ["Kit Primeira Noite", "Dormir lá já na primeira semana"],
  ["Kit Ferramentas do Morador", "Furar parede sem furar o cano"],
  ["Kit Varanda Segura", "Criança e pet antes da mudança"],
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

const SERVICOS = [
  {
    numero: "01",
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
const ENTREGAS = Array.from({ length: 24 }, (_, i) => `entrega-${String(i + 1).padStart(2, "0")}`);
const VISTORIAS = Array.from({ length: 9 }, (_, i) => `vistoria-${String(i + 1).padStart(2, "0")}`);

/* Vídeos curtos. Os de vistoria e defeito são mudos de propósito — som que dispara
   sozinho faz o visitante fechar a aba, e ali o que importa é a imagem. Nos de cliente
   recebendo as chaves o áudio fica, porque a fala é o conteúdo. */
const VIDEOS_TRABALHO = [
  ["vistoria-01", "Verificação de instalações"],
  ["vistoria-02", "Conferência de acabamentos"],
  ["vistoria-03", "Teste de percussão em revestimento"],
  ["defeito-01", "Não conformidade registrada"],
  ["defeito-02", "Falha de acabamento"],
  ["defeito-03", "Verificação de esquadria"],
];
const VIDEOS_CLIENTES = [
  ["cliente-01", "Entrega de chaves"],
  ["cliente-02", "Entrega de chaves"],
];

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
      <button className="galeria__seta galeria__seta--esq" onClick={() => rolar(-1)} aria-label="Ver anteriores">‹</button>
      <button className="galeria__seta galeria__seta--dir" onClick={() => rolar(1)} aria-label="Ver próximos">›</button>
    </div>
  );
}

function LinhaDeFotos({ nomes, pasta, descricao, rotulo }) {
  return (
    <Carrossel rotulo={rotulo}>
      {nomes.map((nome, i) => (
        <figure className="entrega" key={nome}>
          <img
            src={`/img/${pasta}/${nome}-540.webp`}
            srcSet={`/img/${pasta}/${nome}-320.webp 320w, /img/${pasta}/${nome}-540.webp 540w, /img/${pasta}/${nome}-1080.webp 1080w`}
            sizes="(max-width: 700px) 70vw, 340px"
            alt={`${descricao} (${i + 1} de ${nomes.length})`}
            loading={i < 3 ? "eager" : "lazy"} decoding="async"
          />
        </figure>
      ))}
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
          <span className="videocard__play" aria-hidden="true">▶</span>
        </button>
      )}
      <figcaption>
        {legenda}
        {!comSom && <span className="videocard__mudo"> · sem áudio</span>}
      </figcaption>
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

export default function App() {
  const [gaveta, setGaveta] = useState(false);

  return (
    <>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>

      <header className="cabecalho">
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
              <a key={href} href={href}>{texto}</a>
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
              <p className="hero__apoio">Paulista, Recife e Região Metropolitana · Resposta no mesmo dia</p>
            </div>

            <figure className="hero__figura" style={{ margin: 0 }}>
              {/* Retrato: a foto mostra o técnico agachado registrando um ralo — cortar
                  para paisagem tiraria ou ele ou o ponto verificado, que é a cena toda. */}
              <img className="hero__retrato"
                src="/img/hero-vistoria-1120.webp"
                srcSet="/img/hero-vistoria-560.webp 560w, /img/hero-vistoria-1120.webp 1120w"
                sizes="(max-width: 900px) 100vw, 46vw"
                alt="Técnico da FN Edificações registrando a verificação de um ralo durante vistoria" />
              <figcaption className="hero__selo">
                <strong>+1.000</strong>
                <span>imóveis vistoriados em PE</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <div className="faixa">
          <div className="env faixa__grade">
            <div className="faixa__item">
              <strong>Laudo digital</strong>
              <span>Com fotos, norma técnica e recomendações</span>
            </div>
            <div className="faixa__item">
              <strong>Técnico em edificações</strong>
              <span>Responsabilidade técnica registrada</span>
            </div>
            <div className="faixa__item">
              <strong>Acompanhamento online</strong>
              <span>Você segue cada etapa pelo sistema</span>
            </div>
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
              {SERVICOS.map((s) => (
                <article className="servico" key={s.numero}>
                  <span className="servico__num">{s.numero}</span>
                  <h3>{s.titulo}</h3>
                  <p>{s.resumo}</p>
                  <ul>
                    {s.itens.map((i) => (
                      <li key={i}><Check /> {i}</li>
                    ))}
                  </ul>
                  <a className="btn btn--azul" href={SISTEMA} target="_blank" rel="noopener">
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

        {/* ---------------- Loja Recomendada FN ----------------
            A vistoria termina no aceite, mas o problema do cliente não: no dia
            seguinte ele tem um apartamento vazio e uma lista de compras que não
            sabe montar. A loja é a continuação natural do laudo — e é a única
            recomendação do mercado feita por quem esteve dentro da unidade. */}
        <section className="secao secao--alt" id="loja">
          <div className="env loja-chamada">
            <div>
              <p className="olho">Loja Recomendada FN</p>
              <h2>Depois do laudo, a lista de compras.</h2>
              <p style={{ color: "var(--tinta-media)", marginTop: 12 }}>
                Reunimos em um só lugar o que mais de mil vistorias mostraram que falta em
                apartamento novo — organizado por tempo de chave, não por prateleira de loja.
                A FN não vende nem estoca nada: indicamos, e a compra acontece no site do
                parceiro, pelo mesmo preço que você pagaria indo direto.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "grid", gap: 9 }}>
                {[
                  "300 produtos curados e 18 kits por momento da jornada",
                  "Recomendação que considera o que o laudo encontrou na sua unidade",
                  "Comissão paga pelo parceiro, sem alterar o seu preço",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: ".94rem" }}>
                    <Check style={{ marginTop: 4, color: "var(--azul-medio)", flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
              <a className="btn btn--azul" style={{ marginTop: 24 }} href={LOJA}>
                Entrar na Loja FN
              </a>
            </div>

            <div className="loja-chamada__kits">
              {KITS_VITRINE.map(([titulo, texto]) => (
                <div className="loja-chamada__kit" key={titulo}>
                  {titulo}
                  <span>{texto}</span>
                </div>
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

        {/* ---------------- Entregas realizadas ---------------- */}
        <section className="secao" id="entregas">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">Entregas realizadas</p>
              <h2>O dia da chave é o que a gente protege.</h2>
              <p>
                Cada foto é uma vistoria concluída antes do aceite — o cliente recebendo
                o imóvel com o laudo em mãos e as pendências registradas.
              </p>
            </div>
          </div>
          <LinhaDeFotos nomes={ENTREGAS} pasta="entregas" rotulo="Fotos de entregas de chaves"
            descricao="Entrega de chaves acompanhada pela equipe da FN Edificações" />
        </section>

        {/* ---------------- Vistoriadores em campo ---------------- */}
        <section className="secao secao--alt" id="vistorias">
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

          <div className="env" style={{ marginTop: 34 }}>
            <div className="videos">
              {VIDEOS_TRABALHO.map(([nome, legenda]) => (
                <CartaoVideo key={nome} nome={nome} legenda={legenda} comSom={false} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Clientes recebendo ---------------- */}
        <section className="secao" id="depoimentos">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">O momento da chave</p>
              <h2>A parte que a gente faz por último.</h2>
              <p>Clientes recebendo o imóvel com o laudo em mãos.</p>
            </div>
            <div className="videos videos--duplo">
              {VIDEOS_CLIENTES.map(([nome, legenda]) => (
                <CartaoVideo key={nome} nome={nome} legenda={legenda} comSom />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Dúvidas ---------------- */}
        <section className="secao secao--alt" id="duvidas">
          <div className="env">
            <div className="secao__intro">
              <p className="olho">Dúvidas frequentes</p>
              <h2>O que os clientes mais perguntam.</h2>
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

        {/* ---------------- Chamada final ---------------- */}
        <section className="secao final" id="contato">
          <div className="env">
            <h2>Receba seu imóvel com clareza.</h2>
            <p>
              Solicite sua vistoria pelo sistema ou mande uma mensagem — respondemos
              no mesmo dia, em horário comercial.
            </p>
            <div className="final__acoes">
              <a className="btn btn--principal" href={SISTEMA} target="_blank" rel="noopener">
                Solicitar vistoria
              </a>
              <a className="btn btn--zap" href={WHATSAPP} target="_blank" rel="noopener">
                <ZapIcone width="18" height="18" /> {TELEFONE_EXIBIDO}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="env">
          <div className="rodape__grade">
            <div>
              <h4>FN Edificações</h4>
              <p>Vistorias, laudos e responsabilidade técnica para o seu imóvel.</p>
              <p style={{ marginTop: 12 }}>
                <a href={INSTAGRAM} target="_blank" rel="noopener">@fn.edificacoes</a>
              </p>
            </div>

            <div>
              <h4>Atendimento</h4>
              <ul>
                <li>Paulista, Recife e RMR</li>
                <li><a href={WHATSAPP} target="_blank" rel="noopener">{TELEFONE_EXIBIDO}</a></li>
                {/* Única repetição do sistema na página, e em texto — não outro botão. */}
                <li><a href={SISTEMA} target="_blank" rel="noopener">Acessar o Sistema FN</a></li>
                <li><a href={LOJA}>Loja Recomendada FN</a></li>
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
            <span>© {new Date().getFullYear()} FN Edificações</span>
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
