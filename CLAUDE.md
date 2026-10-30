# FN Edificações — Site institucional

Site público da FN Edificações, em **fnedificacoes.com.br**. É a vitrine: explica os
serviços, mostra as entregas de chaves e manda quem é cliente, equipe ou parceiro para o
sistema. Não tem login nem banco.

**Conversa com a API em três pontos**, todos públicos e sem token: a seção de depoimentos
busca `/api/avaliacoes/vitrine` (só o que o Atendimento aprovou para aparecer), a seção
"Onde atuamos" busca `/api/nacional/mapa-publico` e a seção FN Home busca
`/api/afiliados/mercadolivre/vitrine` (ver "FN Home" abaixo). O topo da página reaproveita as duas primeiras
respostas para mostrar o total de clientes e a nota média (`NumerosDoSistema` no `App.jsx`;
cada endereço é chamado uma vez só, pelo cache de `src/dadosPublicos.js`). Se a chamada
falhar, a seção (ou o número do topo) se esconde em vez de quebrar o site —
o que é bom para o visitante e traiçoeiro para quem mantém: quando a API mudou de endereço
na migração de 28/08/2026, os depoimentos sumiram da home e ninguém percebeu por uma
semana, porque não havia erro em lugar nenhum. Ao mexer no endereço da API, **abra a home e
confira se a seção aparece.**

## Onde este repositório fica no todo

São três repositórios, todos em `github.com/fn-edificacoes`:

| Repositório | O que é | Endereço |
|---|---|---|
| `fn-edificacoes-site` | **este aqui** — site institucional | fnedificacoes.com.br |
| `fn-edificacoes-frontend` | o sistema (laudos, clientes, parceiros) | sistema.fnedificacoes.com.br |
| `fn-edificacoes-backend` | a API do sistema **e o banco** | servidor próprio da FN (VPS) |

Uma tarefa que atravessa os três (por exemplo, mexer no caminho do parceiro) precisa dos
três anexados na sessão. Cada um tem o seu `CLAUDE.md`.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
```

## Publicação

Push na `main` dispara `.github/workflows/deploy-pages.yml`, que faz o build e publica no
GitHub Pages. O domínio vem de `public/CNAME`. **Não existe outro passo**: não há Netlify,
não há upload manual. O deploy leva cerca de um minuto.

## Estrutura

```
index.html          meta tags, SEO e dados estruturados (ProfessionalService)
src/dadosPublicos.js cache das chamadas públicas à API, divididas entre topo, mapa e depoimentos
src/App.jsx         a página inteira, numa única componente por seção
src/OndeAtuamos.jsx a seção do mapa (a única em arquivo próprio, pelo tamanho)
public/mapas/       desenho de cada estado (IBGE) para o mapa, gerado por scripts/gerar-mapas.cjs
src/estilos.css     todo o CSS, sem framework (fontes Inter e Manrope, do Google Fonts, no index.html)
public/img/         imagens já otimizadas em .webp, em 2 ou 3 larguras
public/video/       vídeos já comprimidos
public/404.html     página de erro do Pages
scripts/*.js        geram public/img e public/video a partir de assets-originais/
assets-originais/   originais pesados (PNG, JPEG, MP4) — fonte, nunca servidos
```

As imagens **não** são otimizadas na mão: coloque o original em `assets-originais/` e rode
`npm run otimizar-imagens` (ou o script específico da pasta). Os outros scripts —
`otimizar-entregas`, `otimizar-vistorias`, `otimizar-videos` — são chamados direto com
`node scripts/<arquivo>.js`. Para trocar um vídeo: aponte a entrada em
`scripts/otimizar-videos.js` para o original, rode o script e ajuste `VIDEOS_TRABALHO` ou
`VIDEOS_CLIENTES` no `App.jsx`. Vídeo editado no CapCut leva `semMarca: true` (corta o logo
do CapCut) e `capaEm: 2` (a capa sai do segundo 2, não da transição de abertura).

## Imagem de compartilhamento

A prévia que aparece quando o link é mandado no WhatsApp/Facebook/LinkedIn é
`public/img/compartilhar.jpg` (1200×630, JPG — WebP nem sempre aparece no WhatsApp). O desenho
está em `scripts/compartilhar.html`; para mudar texto ou foto, edite o HTML e rode
`node scripts/gerar-imagem-compartilhar.js` (usa o Chrome instalado na máquina). O WhatsApp
guarda a prévia de cada link por alguns dias: um link já compartilhado pode demorar a trocar.

## Onde atuamos (mapa de calor)

`src/OndeAtuamos.jsx`, logo depois de "Como funciona". Mostra só as regionais que a Gerência
marcou como **"No site"** no sistema (Rede Nacional → Regionais) — hoje Pernambuco e Paraíba.
Ligar outra lá faz ela aparecer aqui **sem mexer no site**: a seção baixa o desenho de cada UF
que a API mandar, de `public/mapas/uf-XX.json`. Os 27 estados já estão gerados, todos na mesma
projeção (é isso que encaixa PE e PB lado a lado); refazer com `node scripts/gerar-mapas.cjs`.

O que vai a público é pouco de propósito: **clientes atendidos** (total e por estado, contados
por pessoa/CPF), cidades, empreendimentos e a intensidade de cada cidade em nível 1–5. Clientes
cidade a cidade e parceiros ficam só no sistema. O hero dizia "+1.000 imóveis", que não batia
com o indicador da mesma página; saiu em outubro/2026 a pedido do dono, e no lugar entraram os
números lidos da base (clientes atendidos e nota média, esta só com 3 avaliações ou mais).
**Não escreva número de atendimentos à mão no site**: o único número público é o que vem da base.

Os números são **da base real** do sistema, nunca escritos aqui. Sem nenhum cliente posicionado
no mapa (ex.: logo depois de publicar, antes de os empreendimentos ganharem cidade e regional
no sistema), a seção não aparece — "0 clientes atendidos" na home seria pior que nada.

**Não está no menu do topo**: o menu tem seis itens e não cabe mais nenhum — com oito ele
quebrava em duas linhas num notebook de 1024px e a página ganhava rolagem lateral. O link fica
no rodapé. Abaixo de 1100px o menu vira o botão de três traços.

## FN Home (loja)

`FnHome` no `App.jsx`, logo antes do FN Club. Divulga a loja que mora no sistema
(`LOJA_FN_HOME`, `?pagina=fn-home`): os produtos que a Gerência cadastra lá, com o link de
afiliado do Mercado Livre da FN. O site mostra uma amostra de até 12, alternando as categorias,
no mesmo carrossel das entregas; cada cartão é o próprio link do Mercado Livre, e o clique é
contado no sistema (`POST .../clique` com `mode: "no-cors"`, sem esperar resposta).

- Produto novo cadastrado no sistema aparece aqui **sem mexer no site**. Não escreva produto
  nem preço à mão.
- Ao contrário dos depoimentos e do mapa, **a seção não some** se a API falhar: mostra as
  categorias (`FN_HOME_CATEGORIAS`) e o botão da loja. Se só aparecerem as categorias, a
  vitrine não respondeu — confira a API antes de mexer no site.
- A vitrine precisa de CORS aberto, que o backend dá em `ROTAS_PUBLICAS_ABERTAS`
  (`src/server.js`) desde out/2026.
- O aviso de link de afiliado embaixo dos cartões é obrigatório (publicidade com afiliado se
  identifica) e repete o da loja no sistema.
- O texto e as três linhas de proposta (`fnhome__proposta`) dizem que a loja é **aberta a todos**,
  sem ser cliente nem ter cadastro — é verdade no sistema (`?pagina=fn-home` não pede login) e é o
  que o visitante que ainda não contratou vistoria precisa ler.
- Menu do topo com **sete itens** desde out/2026: o FN Home entrou ao lado do FN Club, em destaque
  (`menu__loja`, contorno de areia e selo "Loja"). Para caber, o respiro dos itens diminui até
  1280px e o subtítulo da marca some entre 1101 e 1240px — medido sem rolagem lateral em 1101,
  1241 e 1281px. Um oitavo item não cabe. Link curto para divulgar: **fnedificacoes.com.br/fn-home**.

## Rotas de redirecionamento

Páginas estáticas em `public/`, criadas para não quebrar links do site antigo e de
material impresso. Cada uma faz `<meta refresh>` + `location.replace`:

- `/acesso` e `/sistema` → `https://sistema.fnedificacoes.com.br/`
- `/fn-club` → `https://fnedificacoes.com.br/#parceiros`
- `/fn-home` → `https://sistema.fnedificacoes.com.br/?pagina=fn-home` (a loja, para Instagram e panfleto)

Se um link novo for divulgado em panfleto ou Instagram, o padrão é criar mais uma pasta
dessas, e não uma rota de SPA — o Pages não conhece rotas de aplicação.

## Convenções

- **Tudo em português**, inclusive nomes de componentes, constantes e comentários.
- Os comentários no código explicam **por que** aquilo está assim, não o que a linha faz —
  em geral registram uma decisão já tomada (por que só existe um botão no cabeçalho, por
  que a avaliação não é inventada). Antes de "melhorar" algo que parece estranho, leia o
  comentário em volta: costuma ser deliberado.
- Constantes de destino (`SISTEMA`, `WHATSAPP`, `INSTAGRAM`, `TELEFONE_EXIBIDO`, `CNPJ_EXIBIDO`)
  ficam no topo do `App.jsx`. Trocar o telefone ou o link do sistema é mexer só ali.
- Não há testes automatizados. A verificação é `npm run build` e olhar a página.
