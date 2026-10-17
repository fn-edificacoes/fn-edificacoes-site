/* Endereços públicos da API lidos por mais de uma seção.

   O topo da página mostra o total de clientes e a nota média, que também aparecem mais
   abaixo — no mapa ("Onde atuamos") e nos depoimentos. Sem este cache, cada número custava
   uma segunda ida à API no carregamento. Aqui a primeira seção que pede faz a chamada e as
   outras recebem a mesma resposta.

   Em qualquer falha (API fora, resposta de erro) devolve null: cada seção decide sozinha se
   some ou se esconde o número, e nenhuma quebra a página. */
const pedidos = new Map();

export function buscarUmaVez(url) {
  if (!pedidos.has(url)) {
    pedidos.set(url, fetch(url).then((r) => (r.ok ? r.json() : null)).catch(() => null));
  }
  return pedidos.get(url);
}
