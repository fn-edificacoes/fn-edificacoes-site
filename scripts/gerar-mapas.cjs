// Gera public/mapas/uf-XX.json (um por estado) para a seção "Onde atuamos".
// Uso: node scripts/gerar-mapas.cjs
//
// Diferente do sistema, aqui todos os estados usam a MESMA projeção (o Brasil inteiro num
// plano só). É isso que deixa o site desenhar PE e PB lado a lado, encaixados — e, quando a
// Gerência ligar outra regional para o site, ela aparece no mesmo desenho sem refazer nada:
// a seção baixa os arquivos das UFs que a API mandar e enquadra o conjunto.
// Fonte: malhas e lista de municípios do IBGE (servicodados.ibge.gov.br).
"use strict";
const fs = require("node:fs");
const path = require("node:path");

const UFS = { 11: "RO", 12: "AC", 13: "AM", 14: "RR", 15: "PA", 16: "AP", 17: "TO", 21: "MA", 22: "PI", 23: "CE", 24: "RN",
  25: "PB", 26: "PE", 27: "AL", 28: "SE", 29: "BA", 31: "MG", 32: "ES", 33: "RJ", 35: "SP", 41: "PR", 42: "SC", 43: "RS",
  50: "MS", 51: "MT", 52: "GO", 53: "DF" };
const destino = path.join(__dirname, "..", "public", "mapas");
fs.mkdirSync(destino, { recursive: true });

// Projeção única: equiretangular com o cosseno de 12°S, ~140 unidades por grau — detalhe
// suficiente para um município pequeno da Região Metropolitana aparecer na tela.
const LON0 = -74, LAT0 = 5.3, FATOR = Math.cos((12 * Math.PI) / 180), K = 140;
const projetar = ([lon, lat]) => [(lon - LON0) * FATOR * K, (LAT0 - lat) * K];

const aneis = (geom) => (geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates);
function simplificar(pts, tol) {
  if (pts.length < 4) return pts;
  const dist = ([x, y], [x1, y1], [x2, y2]) => {
    const dx = x2 - x1, dy = y2 - y1, l = dx * dx + dy * dy;
    const t = l ? Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / l)) : 0;
    return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy));
  };
  let max = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) { const d = dist(pts[i], pts[0], pts[pts.length - 1]); if (d > max) { max = d; idx = i; } }
  if (max <= tol) return [pts[0], pts[pts.length - 1]];
  return [...simplificar(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplificar(pts.slice(idx), tol)];
}
function centroide(anel) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < anel.length - 1; i++) {
    const [x1, y1] = anel[i], [x2, y2] = anel[i + 1];
    const c = x1 * y2 - x2 * y1; a += c; cx += (x1 + x2) * c; cy += (y1 + y2) * c;
  }
  a /= 2;
  return { area: Math.abs(a), x: cx / (6 * a), y: cy / (6 * a) };
}
const arred = (n) => Math.round(n * 10) / 10;
function contornar(geom, tol) {
  let d = "", maior = { area: -1 };
  const caixa = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
  for (const poligono of aneis(geom)) {
    poligono.forEach((anel, i) => {
      const proj = anel.map(projetar);
      const simples = simplificar(proj, tol);
      if (simples.length < 4) return;
      for (const [x, y] of simples) { caixa.x0 = Math.min(caixa.x0, x); caixa.x1 = Math.max(caixa.x1, x); caixa.y0 = Math.min(caixa.y0, y); caixa.y1 = Math.max(caixa.y1, y); }
      d += "M" + simples.map(([x, y]) => `${arred(x)},${arred(y)}`).join("L") + "Z";
      if (i === 0) { const c = centroide(proj); if (c.area > maior.area) maior = c; }
    });
  }
  return { d, x: arred(maior.x), y: arred(maior.y), caixa: Object.fromEntries(Object.entries(caixa).map(([k, v]) => [k, arred(v)])) };
}

async function json(url) {
  for (let t = 0; t < 4; t++) {
    try { const r = await fetch(url); if (r.ok) return await r.json(); } catch {}
    await new Promise((res) => setTimeout(res, 1500 * (t + 1)));
  }
  throw new Error(`Falhou: ${url}`);
}

(async () => {
  const estados = await json("https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=UF");
  const contornoUf = Object.fromEntries(estados.features.map((f) => [UFS[Number(f.properties.codarea)], f.geometry]));
  let total = 0;
  for (const [cod, uf] of Object.entries(UFS)) {
    const malha = await json(`https://servicodados.ibge.gov.br/api/v3/malhas/estados/${cod}?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=municipio`);
    const lista = await json(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${cod}/municipios`);
    const nomes = Object.fromEntries(lista.map((m) => [String(m.id), m.nome]));
    const municipios = [];
    for (const f of malha.features) {
      const { d, x, y } = contornar(f.geometry, 0.7);
      if (d) municipios.push({ nome: nomes[String(f.properties.codarea)] || String(f.properties.codarea), d, x, y });
    }
    const estado = contornar(contornoUf[uf], 0.7);
    const conteudo = JSON.stringify({ uf, contorno: estado.d, x: estado.x, y: estado.y, caixa: estado.caixa, municipios });
    fs.writeFileSync(path.join(destino, `uf-${uf}.json`), conteudo);
    total += conteudo.length;
    console.log(`${uf}: ${municipios.length} municípios, ${(conteudo.length / 1024).toFixed(0)} KB`);
  }
  console.log(`total ${(total / 1024 / 1024).toFixed(2)} MB`);
})().catch((e) => { console.error(e); process.exit(1); });
