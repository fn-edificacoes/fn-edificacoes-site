# Integração com o Sistema FN

> **Escopo desta sessão.** A vitrine foi implementada aqui, em `fn-edificacoes-site`. O Sistema FN
> vive em outros dois repositórios — `fn-edificacoes-frontend` e `fn-edificacoes-backend` — que
> não fazem parte da branch autorizada para este trabalho. Este documento é a especificação
> pronta para execução lá: contratos, payloads, schema e telas. Nada aqui depende de decisão
> pendente; é implementável como está.

---

## 1. O que a loja já faz sozinha, sem o Sistema

A loja funciona hoje, em produção, sem nenhuma integração:

- Reconhece `?fn=<clienteId>` e `?chaves=<AAAA-MM-DD>` na URL e personaliza a vitrine
- Calcula o momento da jornada a partir da data das chaves
- Guarda favoritos e histórico de cliques no navegador
- Monta o link de saída com `tag` do programa e `subid` do cliente
- Emite o evento `fn_loja_saida` no `window.dataLayer`

**Portanto a integração é incremental, não bloqueante.** Cada etapa abaixo acrescenta valor sem
que nenhuma delas seja pré-requisito para a loja gerar comissão.

---

## 2. Etapa 1 — Assinar os links de saída *(esforço: baixo; impacto: alto)*

**Onde:** `fn-edificacoes-frontend`, em todo lugar que hoje aponta para a loja ou para o FN Club.

Todo link do Sistema para a loja deve carregar a identidade e a data das chaves:

```
https://fnedificacoes.com.br/loja/?fn=<clienteId>&chaves=<AAAA-MM-DD>
```

| Parâmetro | Formato | Origem |
|---|---|---|
| `fn` | Identificador **opaco** do cliente, `[A-Za-z0-9_-]{1,64}` | Do cadastro. **Nunca** CPF, e-mail ou telefone |
| `chaves` | `AAAA-MM-DD` | Data de entrega registrada na vistoria |

> **Requisito de privacidade, não de estilo:** o identificador precisa ser opaco. Ele viaja em
> URL, entra no `subid` do programa de afiliados e chega a terceiros. Um identificador que
> permita reidentificar a pessoa transformaria cada clique em compartilhamento de dado pessoal
> com plataforma estrangeira — exatamente o que a política publicada diz que não acontece.
> Sugestão: `sha256(clienteId + segredo)` truncado em 16 caracteres, estável por cliente.

A loja já valida e sanitiza o parâmetro (`rastreio.js`, função `identidade`), descartando
qualquer coisa fora do formato — isso impede que alguém injete o subid de outro cliente pela URL.

**Pontos de saída a assinar:** botão do FN Club, rodapé do laudo digital, e-mail de conclusão da
vistoria, mensagem de WhatsApp da régua de automação.

---

## 3. Etapa 2 — Endpoint de perfil *(esforço: médio; impacto: alto)*

**Onde:** `fn-edificacoes-backend`.

```
GET /api/loja/perfil/:clienteId
Authorization: Bearer <token de serviço>
```

```json
{
  "cliente": "a1b2c3d4e5f6a7b8",
  "chavesEm": "2026-06-14",
  "momento": "M1",
  "unidade": {
    "empreendimento": "Residencial Exemplo",
    "areaUtil": 52.4,
    "quartos": 2,
    "orientacaoSolar": "oeste",
    "temPontoDreno": true,
    "temPontoAntena": false,
    "vaoPortaEntrada": 0.82,
    "medidas": { "boxBanheiro": [0.9, 1.2], "vaoArmarioCozinha": 2.4 }
  },
  "pendencias": [
    { "categoria": "hidraulica", "item": "Sifão da pia com vazamento", "status": "aberta",
      "responsavel": "construtora" }
  ],
  "bloqueios": ["hidraulica"],
  "clube": { "ativo": true, "cashbackDisponivel": 0, "cashbackPendente": 47.30 }
}
```

### O campo `bloqueios` é o mais importante do payload

Ele lista categorias em que a loja **não pode fazer recomendação comercial**, porque há pendência
aberta que é obrigação da construtora corrigir. Vender solução para um problema que o cliente tem
direito de exigir de graça é o erro que destrói a credibilidade do laudo (Etapa 11).

Regra de derivação, a implementar no backend:

```
bloqueios = categorias distintas de pendencias
            onde status = "aberta" e responsavel = "construtora"
```

Na loja, uma categoria bloqueada exibe a orientação de cobrança no lugar dos produtos.

---

## 4. Etapa 3 — Coleta de cliques *(esforço: baixo; impacto: médio)*

**Onde:** `fn-edificacoes-backend`.

```
POST /api/loja/clique
Content-Type: application/json
```

```json
{
  "fn_id": "a1b2c3d4e5f6a7b8",
  "id": "ar-condicionado-split-inverter-12-000-btus",
  "nome": "Ar-condicionado split inverter 12.000 BTUs",
  "categoria": "climatizacao",
  "parceiro": "mgl",
  "origem": "kit:climatizacao",
  "em": "2026-07-27T14:32:00.000Z"
}
```

Deve aceitar `sendBeacon` (corpo `application/json`, resposta `204`, sem exigir preflight
complexo). Para ativar, basta preencher a constante `ENDPOINT_CLIQUES` em
`src/loja/rastreio.js` — hoje `null`, e enquanto for `null` nada sai do dispositivo do usuário.

**Para que serve:** é o que permite a conciliação. O relatório do programa de afiliados diz
"houve uma venda com subid X"; o registro de cliques diz *qual produto, qual kit e qual conteúdo*
originou aquele subid naquele dia. Sem isso, sabe-se quanto entrou, mas não de onde veio.

---

## 5. Etapa 4 — Schema de banco

```sql
-- Cliques de saída (dado de primeira parte)
CREATE TABLE loja_clique (
  id            BIGSERIAL PRIMARY KEY,
  fn_id         VARCHAR(64) NOT NULL,
  cliente_id    BIGINT NULL REFERENCES cliente(id),
  produto_slug  VARCHAR(120) NOT NULL,
  categoria     VARCHAR(40)  NOT NULL,
  parceiro      VARCHAR(10)  NOT NULL,
  origem        VARCHAR(60)  NOT NULL,   -- catalogo | kit:<id> | momento:<M>
  criado_em     TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX ON loja_clique (fn_id, criado_em);
CREATE INDEX ON loja_clique (parceiro, criado_em);

-- Comissões conciliadas com o relatório do programa
CREATE TABLE loja_comissao (
  id             BIGSERIAL PRIMARY KEY,
  parceiro       VARCHAR(10) NOT NULL,
  fn_id          VARCHAR(64) NULL,       -- subid devolvido pelo programa
  pedido_externo VARCHAR(80) NULL,
  valor_gmv      NUMERIC(12,2) NOT NULL,
  valor_comissao NUMERIC(12,2) NOT NULL,
  status         VARCHAR(20) NOT NULL,   -- pendente | confirmada | cancelada
  competencia    DATE NOT NULL,
  conciliado_em  TIMESTAMPTZ NULL
);

-- Parceiros do FN Club (o motor de margem)
CREATE TABLE clube_parceiro (
  id                BIGSERIAL PRIMARY KEY,
  nome              VARCHAR(120) NOT NULL,
  categoria         VARCHAR(40)  NOT NULL,
  comissao_pct      NUMERIC(5,2) NOT NULL,
  prazo_medio_dias  INT NULL,
  contrato_assinado BOOLEAN NOT NULL DEFAULT false,
  possui_seguro     BOOLEAN NOT NULL DEFAULT false,
  status            VARCHAR(20)  NOT NULL DEFAULT 'ativo', -- ativo | suspenso | descredenciado
  criado_em         TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Indicações a parceiro local
CREATE TABLE clube_indicacao (
  id            BIGSERIAL PRIMARY KEY,
  parceiro_id   BIGINT NOT NULL REFERENCES clube_parceiro(id),
  cliente_id    BIGINT NOT NULL REFERENCES cliente(id),
  valor_servico NUMERIC(12,2) NULL,
  comissao      NUMERIC(12,2) NULL,
  status        VARCHAR(20) NOT NULL,   -- aberta | fechada | perdida
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reclamações: alimenta a regra objetiva de descredenciamento
CREATE TABLE clube_reclamacao (
  id           BIGSERIAL PRIMARY KEY,
  parceiro_id  BIGINT NOT NULL REFERENCES clube_parceiro(id),
  cliente_id   BIGINT NOT NULL REFERENCES cliente(id),
  motivo       VARCHAR(40) NOT NULL,    -- prazo | execucao | atendimento | preco
  descricao    TEXT,
  resolvida_em TIMESTAMPTZ NULL,
  criado_em    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Favoritos sincronizados (a lista de compras do cliente)
CREATE TABLE loja_favorito (
  cliente_id   BIGINT NOT NULL REFERENCES cliente(id),
  produto_slug VARCHAR(120) NOT NULL,
  criado_em    TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (cliente_id, produto_slug)
);
```

**Regra de negócio a implementar como job diário:** três registros em `clube_reclamacao` para o
mesmo parceiro em 30 dias mudam o status para `suspenso` e abrem tarefa de revisão. O critério é
objetivo de propósito — está escrito assim no contrato do parceiro (Etapa 11, cláusula 4) para
não depender de arbítrio.

---

## 6. Etapa 5 — Telas no Sistema

### "Minha Loja" (área do cliente)

| Bloco | Conteúdo |
|---|---|
| Momento atual | "Você recebeu as chaves há 23 dias — fase de instalações e compras grandes" |
| Recomendado agora | 6 itens do momento, **excluindo as categorias bloqueadas** |
| Minha lista | Favoritos sincronizados, com botão de saída |
| Pendências abertas | O que ainda é obrigação da construtora, com orientação de cobrança |
| FN Club | Parceiros disponíveis para a categoria da vez |
| Cashback | Saldo confirmado e saldo pendente, com a data prevista de confirmação |

### Painel administrativo

| Módulo | Função |
|---|---|
| Conciliação | Importar CSV de cada programa e cruzar por `fn_id` com `loja_clique` |
| Parceiros | Cadastro, comissão, prazo médio, **contador de reclamações**, status |
| Indicações | Funil das indicações ao Clube: aberta → fechada → comissão |
| Desempenho | Cliques por produto, kit, momento e canal |
| Curadoria | Fila de itens sugeridos pelo atendimento a partir de dúvidas reais |

---

## 7. Etapa 6 — Régua de automação

Os 18 gatilhos estão definidos na Etapa 8. O backend precisa expor os eventos que os disparam:

```
chaves_entregues { clienteId, data, unidadeId }
laudo_emitido    { clienteId, laudoId, pendencias[] }
pendencia_resolvida { clienteId, pendenciaId }
indicacao_fechada   { clienteId, parceiroId, valor }
```

O agendador lê os eventos, agenda `D+n` e aplica as duas regras de contenção que não podem ser
esquecidas: **máximo de 2 mensagens por semana por cliente** e **gatilho de pendência nunca
carrega link comercial**.

---

## 8. Ordem de implementação sugerida

| Ordem | Etapa | Esforço | Desbloqueia |
|---|---|---|---|
| 1 | Assinar links com `?fn=` e `?chaves=` | Baixo | Atribuição por cliente — pré-requisito de tudo |
| 2 | Endpoint de perfil | Médio | Recomendação por laudo e o bloqueio comercial |
| 3 | Coleta de cliques | Baixo | Conciliação e medição real |
| 4 | Tabelas de parceiro, indicação e reclamação | Médio | O motor de margem (Etapa 9, motor C) |
| 5 | Régua de automação | Alto | Conversão no momento certo |
| 6 | Cashback e favoritos sincronizados | Médio | Retenção |

> A ordem não é arbitrária: os itens 1 e 4 sozinhos habilitam a maior parte da receita projetada,
> e ambos são de esforço baixo a médio. O item 5, que é o mais caro, é também o que mais depende
> de os anteriores estarem corretos.
