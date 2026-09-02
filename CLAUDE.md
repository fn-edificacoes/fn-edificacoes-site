# FN Edificações — Site institucional

Site público da FN Edificações, em **fnedificacoes.com.br**. É a vitrine: explica os
serviços, mostra as entregas de chaves e manda quem é cliente, equipe ou parceiro para o
sistema. Não tem login nem banco.

**Conversa com a API em um ponto só**, e vale saber qual: a seção de depoimentos busca
`/api/avaliacoes/vitrine` (rota pública, sem token, que devolve só o que o Atendimento
aprovou para aparecer). Se a chamada falhar, a seção se esconde em vez de quebrar o site —
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
src/App.jsx         a página inteira, numa única componente por seção
src/estilos.css     todo o CSS, sem framework
public/img/         imagens já otimizadas em .webp, em 2 ou 3 larguras
public/video/       vídeos já comprimidos
public/404.html     página de erro do Pages
scripts/*.js        geram public/img e public/video a partir de assets-originais/
assets-originais/   originais pesados (PNG, JPEG, MP4) — fonte, nunca servidos
```

As imagens **não** são otimizadas na mão: coloque o original em `assets-originais/` e rode
`npm run otimizar-imagens` (ou o script específico da pasta). Os outros scripts —
`otimizar-entregas`, `otimizar-vistorias`, `otimizar-videos` — são chamados direto com
`node scripts/<arquivo>.js`.

## Rotas de redirecionamento

Páginas estáticas em `public/`, criadas para não quebrar links do site antigo e de
material impresso. Cada uma faz `<meta refresh>` + `location.replace`:

- `/acesso` e `/sistema` → `https://sistema.fnedificacoes.com.br/`
- `/fn-club` → `https://fnedificacoes.com.br/#parceiros`

Se um link novo for divulgado em panfleto ou Instagram, o padrão é criar mais uma pasta
dessas, e não uma rota de SPA — o Pages não conhece rotas de aplicação.

## Convenções

- **Tudo em português**, inclusive nomes de componentes, constantes e comentários.
- Os comentários no código explicam **por que** aquilo está assim, não o que a linha faz —
  em geral registram uma decisão já tomada (por que só existe um botão no cabeçalho, por
  que a avaliação não é inventada). Antes de "melhorar" algo que parece estranho, leia o
  comentário em volta: costuma ser deliberado.
- Constantes de destino (`SISTEMA`, `WHATSAPP`, `INSTAGRAM`, `TELEFONE_EXIBIDO`) ficam no
  topo do `App.jsx`. Trocar o telefone ou o link do sistema é mexer só ali.
- Não há testes automatizados. A verificação é `npm run build` e olhar a página.
