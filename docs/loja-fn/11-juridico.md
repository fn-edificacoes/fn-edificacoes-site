# Etapa 11 — Plano jurídico e de conformidade

> **Aviso.** Este capítulo foi escrito para orientar a estruturação do negócio e servir de base
> ao trabalho de um advogado, **não como parecer jurídico**. Nenhum texto aqui substitui a
> revisão profissional prevista na Etapa 10, tarefa 4. As referências legais estão indicadas para
> permitir a verificação.

---

## 11.1 O risco jurídico central deste negócio

Não é a LGPD. Não são os termos de uso. É este:

> **A FN emite laudo técnico que aponta defeitos e, no mesmo relacionamento, recomenda produtos
> com comissão.**

Se essa relação for percebida — ou provada — como "aponta defeito para vender solução", três
coisas acontecem ao mesmo tempo: a credibilidade do laudo evapora, a responsabilidade técnica do
profissional é questionada, e a FN passa a responder por publicidade enganosa. Nenhum contrato
resolve isso depois. Só a estrutura resolve antes.

**As quatro barreiras estruturais adotadas:**

1. **Separação de momento.** A loja não existe antes da entrega do laudo. Na fase 0 da jornada
   (Etapa 2), nenhuma comunicação comercial acontece.
2. **Bloqueio técnico.** Item que é pendência da construtora tem a recomendação comercial
   bloqueada por regra de sistema (Etapa 8, item 8.1), não por boa intenção.
3. **Separação de discurso.** O vistoriador em campo tem roteiro escrito do que pode e não pode
   dizer sobre a loja (Etapa 10, tarefa 17), com auditoria trimestral.
4. **Transparência ativa.** O modelo de remuneração é declarado antes do primeiro link, em toda
   página — e a comissão recebida por categoria é exibida ao cliente.

---

## 11.2 Enquadramento da atividade

| Questão | Posição adotada | Fundamento |
|---|---|---|
| A FN é fornecedora do produto? | **Não.** É indicadora; o fornecedor é a loja parceira | CDC art. 3º — fornecedor é quem comercializa |
| A FN responde por vício do produto? | **Não**, salvo se tiver prestado informação falsa ou enganosa sobre ele | CDC arts. 18, 30 e 37 |
| A recomendação é publicidade? | **Sim**, quando há comissão | Código do CONAR; CDC art. 36 |
| Precisa identificar como publicidade? | **Sim**, de forma imediata e ostensiva | CDC art. 36; CONAR — "#publi" na primeira tela |
| A FN pode ser responsabilizada solidariamente? | **Sim, se** a informação que publicou for enganosa, ou se induzir a erro | CDC art. 37; jurisprudência sobre corresponsabilidade de quem divulga |
| Recomendação técnica gera responsabilidade profissional? | **Sim.** Orientação técnica assinada pela FN carrega a responsabilidade do técnico | Legislação profissional (CREA/CFT), ART/TRT |

**Consequência prática:** a informação publicada na loja precisa ser *verdadeira e verificável*.
É por isso que a loja publica **faixa de preço rotulada como estimativa** e não preço exato, e
por isso não usa foto nem descrição técnica copiada do parceiro.

---

## 11.3 Documentos necessários

| Documento | Status | O que precisa conter |
|---|---|---|
| **Política de afiliados e identificação publicitária** | **Publicada** em `/loja/transparencia/` | Natureza dos links, ausência de acréscimo de preço, identificação em redes sociais |
| **Política comercial e regras de curadoria** | **Publicada** | As 5 regras: comissão não define entrada, ninguém compra posição, preço é do parceiro, parceiro ruim sai, recomendação técnica não vira venda |
| **Política de responsabilidades** | **Publicada** | Quem responde pelo quê; direito de arrependimento (CDC art. 49) exercido junto ao parceiro |
| **Política de privacidade (LGPD)** | **Publicada — falta preencher** | Controlador com razão social e CNPJ, DPO nomeado, e-mail de titular, bases legais, prazos |
| **Política de cookies e armazenamento** | **Publicada** | As 4 chaves de `localStorage` estão descritas nominalmente |
| **Termos de uso da loja** | **Publicada** | Gratuidade, ausência de oferta vinculante, propriedade intelectual do catálogo |
| **Contrato com parceiro do FN Club** | **A redigir** | Ver 11.5 |
| **Termo de autorização de uso de imagem** | **A revisar** | Precisa cobrir **uso comercial**, não só portfólio (Etapa 7, item 7.6) |
| **Contrato de licenciamento de marca** | **A redigir** (ano 2) | Ver Etapa 12 |
| **Registro da marca "Loja Recomendada FN"** | **A protocolar** | INPI, classes 35 (serviços de comércio e publicidade) e 42/37 conforme o serviço técnico |

> **Pendências que bloqueiam a publicação em produção** (Etapa 10, tarefa 5): razão social, CNPJ,
> e-mail oficial para requisições de titular e nome do Encarregado de Dados. Estão marcadas em
> comentário no próprio arquivo `loja/transparencia/index.html`.

---

## 11.4 LGPD — o desenho de privacidade adotado

O princípio aplicado foi **minimização** (Lei 13.709/2018, art. 6º, III): a loja não coleta o que
não precisa. Isso reduz obrigação, risco de incidente e custo de conformidade ao mesmo tempo.

| Dado | Coletado? | Base legal | Retenção |
|---|---|---|---|
| Nome, e-mail, telefone, CPF | **Não pela loja** (ficam no Sistema FN, sob o contrato de serviço) | Execução de contrato (art. 7º, V) | Conforme o contrato de vistoria |
| Identificador opaco de navegação | Sim | Legítimo interesse (art. 7º, IX) | Até o titular apagar |
| Data das chaves | Sim, se informada ou vinda do cadastro | Execução de contrato / legítimo interesse | Até o titular apagar |
| Favoritos e cliques | Sim, no navegador do próprio titular | Legítimo interesse | Até o titular apagar |
| Dados de pagamento | **Nunca** | — | — |

**Compartilhamento:** apenas o identificador opaco, anexado ao link, para as plataformas de
afiliados atribuírem a comissão. Não há venda de dados nem enriquecimento com base de terceiros.

**Direitos do titular** (art. 18): atendidos pelo canal oficial em até 15 dias. Além disso, o
titular pode eliminar tudo sozinho, limpando os dados do site no navegador — o que é a forma mais
honesta de portabilidade que uma loja sem cadastro pode oferecer.

**Avaliação de legítimo interesse:** documentar por escrito, antes do lançamento, o teste de
proporcionalidade da atribuição de indicação (finalidade legítima, necessidade e expectativa do
titular). É exigência prática de qualquer fiscalização e leva uma página.

**Plano de resposta a incidente:** definir responsável, prazo de comunicação à ANPD e ao titular,
e registro de incidentes. Mesmo com dado mínimo, a obrigação existe.

---

## 11.5 Contrato com parceiro do FN Club — cláusulas indispensáveis

Este é o contrato mais importante do negócio, porque é onde está a margem e onde está o risco
reputacional.

1. **Objeto:** indicação de clientes, sem intermediação de pagamento e sem representação comercial.
2. **Comissão:** percentual, base de cálculo, prazo e forma de pagamento, com relatório mensal.
3. **Padrão de qualidade:** prazo máximo de atendimento, garantia mínima do serviço, obrigação de
   emitir nota fiscal.
4. **Cláusula de descredenciamento imediato** por reclamação recorrente — com o critério objetivo
   (três ocorrências em 30 dias) escrito no contrato, e não deixado ao arbítrio.
5. **Responsabilidade técnica:** o parceiro responde integralmente pela execução; a FN indica e
   não executa. Serviços que exijam ART/TRT são de responsabilidade do profissional habilitado.
6. **Uso de marca:** o parceiro não pode se anunciar como "FN" nem sugerir vínculo societário.
7. **Proteção de dados:** o parceiro é controlador independente dos dados que receber; fica
   proibido de usar a base para outra finalidade.
8. **Seguro e habilitação:** obrigatório para serviços de risco — rede de proteção, elétrica,
   instalação em altura.
9. **Confidencialidade** sobre informações de clientes e sobre o laudo.
10. **Vigência, rescisão e foro.**

---

## 11.6 Publicidade — regras operacionais para a equipe de conteúdo

| Situação | O que fazer |
|---|---|
| Post com link de afiliado | `#publi` ou `#publicidade` **no início** do texto ou na primeira tela do vídeo |
| Vídeo com produto recomendado | Menção verbal e escrita da parceria comercial |
| Conteúdo do pilar 5 (direito do comprador) | **Sem link comercial** — e sem marcação, porque não é publicidade |
| Comparativo entre produtos | Critério de comparação declarado; nunca omitir que os dois pagam comissão |
| Depoimento de cliente | Autorização por escrito para uso comercial; nunca editar fala para sugerir resultado que não houve |
| Afirmação técnica ("economiza 30% de energia") | Só com fonte verificável citada; na dúvida, não afirmar |
| Imagem de apartamento de cliente | Autorização específica; nunca identificar unidade e condomínio junto com dado pessoal |

**Proibições absolutas na Loja FN:** contador regressivo falso, "últimas unidades" sobre estoque
que não é nosso, preço riscado sem base real, avaliação inventada, "recomendado por engenheiros"
sem que um profissional habilitado tenha de fato revisado.

---

## 11.7 Boas práticas que viram vantagem competitiva

Cada item abaixo é conformidade que, publicada, funciona como marketing:

1. **Relatório anual de transparência da curadoria** — quantos itens entraram, quantos saíram e
   por quê, quantos parceiros foram descredenciados.
2. **Comissão exibida por categoria** ao cliente, na própria vitrine.
3. **Canal de reclamação de parceiro** com prazo de resposta declarado.
4. **Política de "não compre agora"** — casos em que a recomendação certa é cobrar a construtora.
5. **Revisão jurídica semestral** com data publicada na página de políticas.
6. **Registro de decisões de curadoria** — por que cada item entrou, auditável internamente.

---

## 11.8 Matriz de risco jurídico

| Risco | Probabilidade | Impacto | Barreira principal |
|---|---|---|---|
| Percepção de conflito laudo × loja | Média | **Crítico** | Bloqueio técnico + auditoria trimestral + roteiro de campo |
| Publicidade enganosa por informação de produto | Baixa | Alto | Não publicar preço exato nem especificação copiada |
| Responsabilização solidária por vício de produto | Baixa | Médio | Política de responsabilidades publicada e linguagem clara em cada saída |
| Falha de identificação publicitária em redes | **Média** | Médio | Checklist de publicação e treinamento da equipe de conteúdo |
| Incidente de dados | Baixa | Médio | Minimização — quase não há dado pessoal na loja |
| Descumprimento de regra de programa de afiliados | Média | Médio | Ler as regras de cada programa antes de usar WhatsApp e e-mail |
| Uso indevido de imagem de cliente | Média | Alto | Termo específico para uso comercial |
| Parceiro do Clube causar dano ao cliente | Média | **Alto** | Exigência de seguro, habilitação e nota fiscal em contrato |
