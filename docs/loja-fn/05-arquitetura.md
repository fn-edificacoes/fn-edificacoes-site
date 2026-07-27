# Etapa 5 — Arquitetura da Loja FN

> **Estado de execução.** Este capítulo descreve a arquitetura completa. As partes marcadas
> **[no ar]** já estão implementadas neste repositório em `/loja/`; as marcadas **[sistema]**
> dependem do Sistema FN (repositórios `fn-edificacoes-frontend` e `fn-edificacoes-backend`) e
> estão especificadas em `integracao-sistema.md`. Nada aqui é wireframe de apresentação.

---

## 5.1 O princípio que organiza tudo

Uma loja comum se organiza por **departamento**, porque é assim que o estoque é gerido. A Loja FN
não tem estoque — então ela pode se organizar pelo que realmente importa ao cliente: **o tempo
desde a entrega das chaves**.

Essa é a decisão de arquitetura mais importante do projeto, e a única impossível de copiar sem os
dados da FN. O eixo primário da navegação não é "Cozinha / Banheiro / Móveis". É:

`Dia das chaves → Primeira semana → Primeiro mês → Até 3 meses → Até 6 meses → Primeiro ano`

As categorias existem, mas como **eixo secundário** — para quem já sabe o que procura.

---

## 5.2 Estrutura de páginas

| Rota | O que é | Estado |
|---|---|---|
| `/` | Site institucional, com seção da loja | **[no ar]** |
| `/loja/` | Vitrine: momento, kits, catálogo, filtros, painéis | **[no ar]** |
| `/loja/?p=<slug>` | Produto aberto direto (compartilhável) | [próxima iteração] |
| `/loja/transparencia/` | Afiliados, curadoria, responsabilidades, LGPD, cookies, termos | **[no ar]** |
| `/loja/kit/<id>/` | Página própria de kit, indexável | [fase 2 — hoje o kit abre em painel] |
| `/loja/momento/<id>/` | Landing por momento, para SEO e campanha | [fase 2] |
| Sistema FN → Minha Loja | Área logada: recomendações com base no laudo | **[sistema]** |

**Por que páginas estáticas e não um aplicativo:** o site é servido pelo GitHub Pages. Cada
página precisa existir como arquivo para abrir direto, ser indexada pelo Google e sobreviver a um
F5. A página de transparência não carrega JavaScript nenhum — política que depende de script é
política que pode não aparecer.

---

## 5.3 Taxonomia

### Eixo primário — momento (6)

| Momento | Rótulo | Cobertura |
|---|---|---|
| `D0` | Dia das chaves | Vistoria, aceite e primeira noite |
| `S1` | Primeira semana | Mudança, montagem e o que faltou |
| `M1` | Primeiro mês | Instalações, medidas e compras grandes |
| `M3` | Até 3 meses | Acabamento, conforto e decoração |
| `M6` | Até 6 meses | Melhorias e upgrades |
| `M12` | Primeiro ano | Manutenção, reposição e garantia |

### Eixo secundário — 19 categorias

Segurança e fechaduras · Climatização · Hidráulica e áreas molhadas · Elétrica e proteção ·
Cozinha (eletroportáteis) · Cozinha (utensílios e mesa) · Organização · Linha branca ·
Iluminação · Cama, mesa e banho · Banheiro · Móveis essenciais · Ferramentas · Lavanderia ·
Casa inteligente · Limpeza e manutenção · Decoração · Varanda e área externa · Home office

A lista completa, com métricas de portfólio e os 300 produtos, está na Etapa 3 — gerada
automaticamente a partir da mesma fonte que alimenta a loja.

### Eixo terciário — prioridade de curadoria

`A` Essencial (106 itens) · `B` Recomendado (122) · `C` Complementar (72)

O filtro "Só essenciais" existe porque é a pergunta que o cliente realmente faz: *o que eu
recomendaria a um parente?*

---

## 5.4 Filtros **[no ar]**

| Filtro | Tipo | Por que existe |
|---|---|---|
| Momento da jornada | Botões + campo de data | O eixo principal. Preenchido automaticamente quando o cliente vem do Sistema |
| Categoria | Seleção | Para quem já sabe o que quer |
| Busca textual | Campo livre | Busca por produto e por categoria |
| Só essenciais | Alternância | Corta o catálogo para o núcleo defensável |
| Minha lista | Alternância | Mostra apenas os favoritos salvos |

**Deliberadamente ausentes:** filtro por preço (não temos preço, temos faixa), por marca (a
curadoria é por função, não por marca) e por avaliação (não temos avaliação própria ainda — e
inventar uma seria fraude).

---

## 5.5 As telas

### Página inicial da loja **[no ar]**

Ordem das seções, e o motivo de cada uma:

1. **Herói** — a promessa em uma frase: "Você acabou de receber as chaves. A gente já esteve aí
   dentro."
2. **Aviso de afiliado** — logo abaixo do herói, *antes do primeiro link*. Exigência do CONAR e
   decisão editorial: quem lê precisa saber o modelo do negócio antes de ver a primeira oferta.
3. **Por onde começar** — o seletor de momento. É a primeira pergunta da loja.
4. **Kits FN** — a resposta pronta. Reordenados conforme o momento escolhido.
5. **Catálogo** — filtros e grade, com o "porquê da categoria" aparecendo ao filtrar.
6. **Como funciona** — as seis regras da casa, em texto direto.
7. **FN Club** — a ponte para o Sistema.
8. **Dúvidas** — as seis perguntas que antecedem o clique.
9. **Chamada para vistoria** — porque quem chegou aqui sem ser cliente ainda pode virar um.

### Página de produto (painel lateral) **[no ar]**

- Categoria, nome e **faixa estimada** com a ressalva de que o preço válido é o do parceiro
- Três dados: quando comprar, prioridade, onde comprar
- **Por que está na loja** — texto voltado ao cliente, não ao investidor
- **Antes de comprar** — o alerta técnico que evita o erro caro (medida, BTU, compatibilidade)
- Botão de saída, marcado `rel="sponsored nofollow"`, com subid do cliente
- Botão de salvar na lista
- Aviso de comissão ao pé do botão, não escondido no rodapé

**O que a página de produto não tem, de propósito:** foto do produto (seria foto do parceiro,
com risco de direito de imagem e de desatualização), preço exato, contador de estoque, selo de
urgência. Nada que force decisão.

### Página de kit **[no ar como painel]**

Momento, chamada, faixa somada dos itens, público-alvo, o porquê do kit e a lista completa com
botão de saída por item. Cada clique carrega a origem `kit:<id>` para o relatório saber que a
venda nasceu de um kit — informação que decide onde investir conteúdo.

### Página de recomendações **[sistema]**

A versão logada da loja: em vez de perguntar o momento, ela *sabe*. Detalhada em
`integracao-sistema.md`.

---

## 5.6 Sistemas transversais

| Sistema | Estado | Como funciona | Onde vive |
|---|---|---|---|
| **Favoritos** | **[no ar]** | Lista de compras salva no navegador; sincroniza com o cadastro quando o cliente vem logado | `rastreio.js` + Sistema |
| **Rastreio de saída** | **[no ar]** | Monta o link no clique com `tag` do programa e `subid` do cliente; registra origem e envia ao `dataLayer` | `rastreio.js` |
| **Avaliações** | [fase 2] | **Só avaliação de cliente FN verificado**, importada do Sistema. Nunca avaliação anônima — seria copiar o pior do marketplace | Sistema |
| **Cupons** | [fase 2] | Cupom é do parceiro, não da FN. A loja exibe e registra o uso; quem honra é o parceiro | Sistema |
| **Cashback** | [fase 2] | Percentual da comissão devolvido ao cliente FN, creditado só após a confirmação do programa (60–90 dias) | Sistema |
| **Indicação** | [fase 2] | Cliente indica quem vai receber chaves; ambos ganham crédito no Clube | Sistema |
| **Painel do cliente** | **[sistema]** | Laudo, pendências, lista de compras, cashback, indicações | Sistema |
| **Painel administrativo** | **[sistema]** | Curadoria, parceiros, comissões, conteúdo, alertas de reclamação | Sistema |

> **Regra de honestidade que atravessa a tabela:** cashback e cupom só podem ser prometidos
> depois que a comissão for confirmada pelo programa. Prometer crédito antes de receber é
> assumir risco financeiro sobre dinheiro de terceiro — e é assim que programas de fidelidade
> quebram. O saldo do cliente só vira sacável após a janela de conferência do parceiro.

---

## 5.7 Painel administrativo — o que precisa existir

| Módulo | Função | Prioridade |
|---|---|---|
| Curadoria de catálogo | Adicionar, despublicar e repriorizar itens; editar o "porquê" | Alta |
| Gestão de parceiros | Cadastro, comissão vigente, prazo médio, **contador de reclamações** | Alta |
| Conciliação de comissões | Importar relatório de cada programa e cruzar com os cliques registrados | Alta |
| Alerta de reclamação | Três ocorrências no mesmo parceiro em 30 dias dispara revisão obrigatória | Alta |
| Desempenho por momento e por kit | Onde o clique vira venda; onde investir conteúdo | Média |
| Fila de curadoria | Itens sugeridos pelo atendimento a partir de perguntas reais de cliente | Média |
| Gestão de conteúdo | Calendário editorial ligado a produto (Etapa 7) | Média |

---

## 5.8 Decisões de arquitetura registradas

| Decisão | Alternativa descartada | Motivo |
|---|---|---|
| Faixa de preço, nunca preço exato | Espelhar o preço do parceiro | Preço envelhece em dias; publicá-lo é risco de publicidade enganosa (CDC art. 37) sobre um valor que não controlamos |
| Link montado no clique | Guardar a URL de afiliado no catálogo | Trocar de programa passa a ser mudar uma linha, e não reescrever 300 |
| Sem foto de produto | Usar as fotos dos parceiros | Direito de imagem e desatualização silenciosa; nossa foto é o apartamento real |
| Momento como eixo primário | Categoria como eixo primário | Categoria qualquer um copia; momento exige o laudo |
| Página de política sem JavaScript | Modal dentro do aplicativo | Política que depende de script é política que pode não aparecer |
| Aviso de comissão no topo | Aviso no rodapé | Exigência do CONAR e a única forma de a transparência ser real |
| Comissão exibida ao cliente | Ocultar a taxa | É a prova mais forte de que não há nada escondido entre o laudo e o clique |
| Identificador opaco, sem dado pessoal | Rastrear por e-mail ou CPF | Minimização de dados (LGPD art. 6º, III) e menor superfície de vazamento |
