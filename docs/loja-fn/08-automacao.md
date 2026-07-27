# Etapa 8 — Automação, CRM e IA

**A tese:** a Loja FN não precisa de um algoritmo de recomendação sofisticado. Precisa de uma
variável que ninguém mais tem — **a data em que o cliente recebeu as chaves** — e de disciplina
para agir sobre ela. Um sistema simples com o dado certo derrota um sistema complexo com o dado
errado.

---

## 8.1 O modelo de dados que sustenta tudo

Três atributos por cliente bastam para 80% da personalização:

| Atributo | Origem | O que decide |
|---|---|---|
| `chavesEm` | Sistema FN (data de entrega registrada na vistoria) | **O momento da jornada** — e portanto tudo |
| `pendenciasDoLaudo` | Laudo digital | Quais categorias recomendar e quais **não** recomendar |
| `perfilDaUnidade` | Vistoria (área, quartos, orientação, infraestrutura) | Dimensionamento: BTU, medidas, quantidade |

O quarto atributo, comportamental, vem da loja: favoritos, cliques e categorias visitadas.

> **Uma regra que evita o maior desastre possível:** se o laudo aponta pendência que é obrigação
> da construtora, o sistema **bloqueia** a recomendação comercial daquele item e dispara, em vez
> disso, a orientação de cobrança. Vender solução para problema que o cliente tem direito de
> exigir de graça destrói a empresa inteira — e é uma linha de código, não uma boa intenção.

---

## 8.2 Régua de automação por gatilho

Cada linha é um gatilho implementável. `D+n` conta a partir da entrega das chaves.

| # | Gatilho | Quando | Canal | Conteúdo | Destino |
|---|---|---|---|---|---|
| 1 | `laudo_entregue` | D+0, 2h após o envio do laudo | WhatsApp (1 a 1) | "Seu laudo está no sistema. Separamos o que costuma faltar já na primeira noite." | Kit Primeira Noite |
| 2 | `primeira_noite` | D+2 | WhatsApp | "Vai dormir aí essa semana? Esta é a lista curta." | Kit Primeira Noite · Kit Limpeza |
| 3 | `mudanca` | D+5 | E-mail | Guia dos 7 primeiros dias | Kit Primeira Mudança |
| 4 | `ferramentas` | D+8 | Notificação + e-mail | "Antes de furar a primeira parede" | Kit Ferramentas · detector de fiação |
| 5 | `climatizacao` | D+20 | WhatsApp | **Com os dados da unidade:** "Seu quarto tem X m² e janela para o poente — a faixa indicada é Y BTUs" | Kit Climatização · instalador do Clube |
| 6 | `medidas` | D+25 | E-mail | "As medidas da sua unidade, para comprar móvel sem erro" | Kit Sala Montada · móveis |
| 7 | `banheiro` | D+35 | E-mail | Box e espelho: o que perguntar ao vidraceiro | Kit Banheiro · parceiro do Clube |
| 8 | `organizacao` | D+50 | Notificação | "Armário cheio? Antes de comprar mais, organize" | Kit Organização |
| 9 | `pendencia_construtora` | D+45 se houver pendência aberta | WhatsApp | **Sem link comercial:** "Sua pendência X ainda está aberta. Aqui está como cobrar." | Nenhum — é serviço |
| 10 | `avaliacao` | D+60 | WhatsApp | Pedido de avaliação da vistoria e da loja | Depoimento e indicação |
| 11 | `decoracao` | D+75 | E-mail | Antes e depois de apartamento parecido | Decoração · iluminação |
| 12 | `silencio` | D+90 a D+170 | — | **Nada.** Cadência cai para 1 e-mail/mês, só conteúdo | — |
| 13 | `manutencao_ar` | D+180 | Notificação | "Seis meses: hora da primeira limpeza do ar-condicionado" | Serviço do Clube · filtros |
| 14 | `chuva` | Sazonal (abril–julho) | E-mail para toda a base local | Mofo, vedação e infiltração | Limpeza · hidráulica |
| 15 | `lista_parada` | 14 dias após favoritar sem clicar | E-mail | "Sua lista continua salva" — **sem urgência falsa** | Itens favoritados |
| 16 | `preco_caiu` | Quando um favorito entra em promoção do parceiro | Notificação | "Um item da sua lista está mais barato hoje" | Item específico |
| 17 | `aniversario_chaves` | D+330 | WhatsApp + e-mail | "Um ano de chave: o que ainda dá para exigir na garantia" | **Vistoria de fim de garantia** (serviço FN) |
| 18 | `indicacao` | D+100, se o cliente avaliou bem | WhatsApp | "Conhece alguém recebendo apartamento?" | Programa de indicação |

### Regras de contenção

- **Máximo de 2 mensagens por semana por cliente**, somando todos os canais.
- **WhatsApp só em gatilho de alto valor** (1, 2, 5, 9, 10, 17, 18). WhatsApp queimado não se recupera.
- **Gatilho 9 nunca leva link comercial.** É o que dá autoridade aos outros dezessete.
- **Descadastro em um toque** em todos os canais, com honra imediata.
- **Silêncio é uma decisão de produto**, não uma falha de execução (gatilho 12).

---

## 8.3 Recuperação de lista (o "carrinho abandonado" desta loja)

A Loja FN não tem carrinho — a compra acontece no parceiro. Isso muda a mecânica de recuperação:

| Situação | O que dá para saber | Ação possível |
|---|---|---|
| Favoritou e não clicou | Sim, é dado nosso | E-mail em D+14: "sua lista continua salva" |
| Clicou e saiu para o parceiro | Sim | Nada imediato — perseguir aqui é invasivo e inútil |
| Comprou no parceiro | **Só depois da conciliação** (30–60 dias) | Pós-venda e pedido de avaliação |
| Abandonou o carrinho do parceiro | **Não sabemos, e não vamos saber** | Nenhuma — e é bom que seja assim |

**A limitação é estrutural e precisa ser dita ao conselho:** sem checkout próprio, a FN não vê o
funil final. Fingir que vê, comprando dados de terceiro para rastrear a pessoa até a compra,
seria contraditório com a política de privacidade da loja e um risco de LGPD desproporcional ao
ganho. A resposta certa não é rastrear mais — é **converter melhor antes do clique**.

---

## 8.4 Segmentação

| Segmento | Critério | Tratamento |
|---|---|---|
| **Chave quente** | D+0 a D+45 | Régua completa, WhatsApp liberado, prioridade máxima |
| **Chave morna** | D+46 a D+120 | E-mail e notificação, sem WhatsApp comercial |
| **Base madura** | D+121 a D+365 | 1 e-mail/mês, conteúdo técnico |
| **Base legada** | Cliente anterior ao lançamento da loja | Campanha de reapresentação, uma vez, e depois cadência mensal |
| **Audiência externa** | Não é cliente FN | Só conteúdo e newsletter; nunca WhatsApp |
| **Clube ativo** | Comprou ou usou benefício nos últimos 90 dias | Condições de parceiro, prioridade de agenda |
| **Com pendência aberta** | Laudo com item não resolvido | **Sobrepõe todos os outros:** prioridade de serviço, mensagem comercial reduzida |

O último segmento é uma escolha deliberada de reduzir receita de curto prazo. Um cliente
brigando com a construtora não é público de venda — é público de suporte.

---

## 8.5 IA aplicada: onde ajuda de verdade

Separado entre o que resolve problema real hoje e o que é vitrine.

### Alto valor, baixo risco — fazer

| Aplicação | O que faz | Ganho |
|---|---|---|
| **Extração do laudo** | Lê o laudo e transforma pendências em etiquetas estruturadas (`infiltracao`, `eletrica`, `esquadria`) | Alimenta a régua e o bloqueio do item 8.1 sem digitação manual |
| **Dimensionamento assistido** | A partir da área e da orientação da unidade, sugere faixa de BTU e quantidade de pontos de luz | Transforma recomendação genérica em consultoria — o diferencial do negócio |
| **Redação de variações de conteúdo** | Gera cortes, legendas e títulos a partir de um roteiro humano | Multiplica a produção sem multiplicar a equipe |
| **Triagem de atendimento** | Classifica mensagens recebidas em dúvida técnica, reclamação de parceiro ou intenção de compra | Faz a reclamação de parceiro chegar à curadoria automaticamente |
| **Resumo de reclamações por parceiro** | Agrupa ocorrências e detecta padrão | Dispara a regra de remoção de parceiro com evidência |

### Baixo valor ou alto risco — não fazer agora

| Aplicação | Por que não |
|---|---|
| Chatbot que recomenda produto sozinho | Erro técnico em BTU ou medida vira responsabilidade civil da FN. Recomendação técnica precisa de revisão humana |
| Geração automática de descrição de produto | Alucinação sobre especificação é propaganda enganosa (CDC art. 37) |
| Precificação dinâmica | Não temos preço — não faz sentido |
| Avaliação sintética de produto | É fraude. Fim da discussão |
| Recomendação por "quem viu isso viu aquilo" | Nossa vantagem é o momento e o laudo, não o comportamento de rebanho |

**Regra geral de IA nesta operação:** IA pode escrever, classificar e resumir. **Não pode
decidir recomendação técnica sem revisão humana.** A assinatura técnica da FN é o ativo, e ela
não pode ser delegada a um modelo.

---

## 8.6 Arquitetura técnica da automação

```
Sistema FN (fonte da verdade)
  ├── vistoria concluída → publica evento chaves_entregues { clienteId, data, unidade, pendências }
  ├── laudo emitido      → publica evento laudo_emitido
  └── expõe /loja/perfil/:id → momento, pendências, medidas

Motor de régua (agendador no backend)
  ├── lê os eventos e agenda os gatilhos D+n
  ├── aplica as regras de contenção (2/semana, bloqueio de pendência)
  └── dispara por canal: WhatsApp API · e-mail · notificação

Loja (/loja/)
  ├── recebe ?fn=<id>&chaves=<data> e personaliza sem exigir login
  ├── registra clique de saída com subid = clienteId
  └── envia evento para dataLayer e (quando existir) para o endpoint de coleta

Conciliação (mensal)
  ├── importa relatório de cada programa de afiliados
  ├── cruza com os cliques registrados por subid
  └── credita cashback do Clube só após confirmação do parceiro
```

O detalhamento de endpoints, payloads e schema está em `integracao-sistema.md`.

---

## 8.7 Ferramentas sugeridas

| Necessidade | Opção recomendada | Por quê |
|---|---|---|
| CRM e régua | Módulo no próprio Sistema FN | O dado que importa (chaves, laudo) já mora lá; integrar CRM externo dobraria a fonte da verdade |
| WhatsApp | API oficial (Cloud API) com provedor homologado | WhatsApp não oficial é banimento certo e risco jurídico |
| E-mail | Provedor transacional com boa reputação de entrega | Entrega importa mais que recurso |
| Analytics | GA4 + eventos próprios via `dataLayer` (já implementado) | O `dataLayer` já está emitindo `fn_loja_saida`; basta plugar |
| BI | Painel simples sobre o banco do Sistema | Ver Etapa Final, dashboard sugerido |

**Custo estimado das ferramentas:** R$ 600/mês no início, chegando a R$ 1.800/mês no ano 2 —
valores usados no modelo financeiro da Etapa 9.
