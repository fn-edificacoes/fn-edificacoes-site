import { useEffect, useMemo, useRef, useState } from "react";

/* ============================================================================
   Onde atuamos — mapa de calor das cidades atendidas.

   Os dados vêm do sistema (/api/nacional/mapa-publico), lidos do banco e relidos a cada
   minuto enquanto a página está aberta. Só entram as regionais que a Gerência marcou como
   "Mostrar no site" no sistema — hoje Pernambuco e Paraíba. Ligar outra regional lá faz ela
   aparecer aqui sem mexer no site: a seção baixa o desenho de cada estado que a API mandar
   (public/mapas/uf-XX.json, todos na mesma projeção) e enquadra o conjunto.

   O que é público é de propósito pouco: onde a FN atua, a intensidade de cada cidade (nível
   1 a 5, relativo à mais atendida) e quantos empreendimentos foram atendidos. Quantidade de
   clientes por cidade e parceiros ficam no sistema, só para a Gerência.

   Mesma postura dos depoimentos: se a API não responder, a seção não aparece — mapa vazio
   comunica o contrário do que pretende.
   ========================================================================== */

const SEM_ATENDIMENTO = "#E8ECF2";
// Calor amarelo → vermelho (mesma escala do sistema, validada para daltonismo).
const CALOR = ["#F7C460", "#F2A24A", "#EA7A37", "#D44E2C", "#9F2226"];
const NOME_UF = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará", DF: "Distrito Federal",
  ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais",
  PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
};
const ATUALIZAR_A_CADA_MS = 60 * 1000;

const normalizar = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const plural = (n, um, varios) => `${n.toLocaleString("pt-BR")} ${n === 1 ? um : varios}`;

export default function OndeAtuamos({ api }) {
  const [dados, setDados] = useState(null); // null = carregando; false = esconder a seção
  const [estados, setEstados] = useState({});
  const [dica, setDica] = useState(null);
  const [perto, setPerto] = useState(false);
  const quadroRef = useRef(null);

  useEffect(() => {
    let vivo = true;
    const carregar = () => fetch(`${api}/api/nacional/mapa-publico`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (vivo) setDados(d && d.regionais?.length ? d : false); })
      .catch(() => { if (vivo) setDados((atual) => atual || false); });
    carregar();
    const t = setInterval(() => { if (document.visibilityState === "visible") carregar(); }, ATUALIZAR_A_CADA_MS);
    return () => { vivo = false; clearInterval(t); };
  }, [api]);

  // Desenho de cada estado ligado, baixado uma vez.
  useEffect(() => {
    if (!dados) return;
    for (const { uf } of dados.regionais) {
      if (estados[uf]) continue;
      fetch(`/mapas/uf-${uf}.json`).then((r) => (r.ok ? r.json() : null))
        .then((m) => { if (m) setEstados((atual) => ({ ...atual, [uf]: m })); })
        .catch(() => {});
    }
  }, [dados]);

  const ufs = dados ? [...new Set(dados.regionais.map((r) => r.uf))] : [];
  const prontos = ufs.filter((uf) => estados[uf]);

  const nivelDe = useMemo(() => {
    const m = new Map();
    for (const c of dados?.cidades || []) m.set(`${c.uf}|${normalizar(c.cidade)}`, c);
    return m;
  }, [dados]);

  /* Cidades atendidas com a posição delas no desenho (centro do município). */
  const atendidas = useMemo(() => {
    const lista = [];
    for (const uf of prontos) {
      for (const m of estados[uf].municipios) {
        const c = nivelDe.get(`${uf}|${normalizar(m.nome)}`);
        if (c) lista.push({ ...m, uf, nivel: c.nivel, empreendimentos: c.empreendimentos });
      }
    }
    return lista.sort((a, b) => b.nivel - a.nivel || b.empreendimentos - a.empreendimentos);
  }, [prontos.join(), estados, nivelDe]);

  /* Enquadra só os estados ligados, com folga — o resto do Brasil não entra. "Aproximar"
     fecha o quadro em volta das cidades atendidas: no estado inteiro, a Região
     Metropolitana vira uma faixa fina no litoral. */
  const quadro = useMemo(() => {
    if (!prontos.length) return null;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    if (perto && atendidas.length) {
      for (const m of atendidas) { x0 = Math.min(x0, m.x); y0 = Math.min(y0, m.y); x1 = Math.max(x1, m.x); y1 = Math.max(y1, m.y); }
      const lado = Math.max(x1 - x0, y1 - y0, 160);
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      const w = lado * 1.5, h = lado * 1.05;
      return { x: cx - w / 2, y: cy - h / 2, w, h };
    }
    for (const uf of prontos) {
      const c = estados[uf].caixa;
      x0 = Math.min(x0, c.x0); y0 = Math.min(y0, c.y0); x1 = Math.max(x1, c.x1); y1 = Math.max(y1, c.y1);
    }
    const folga = Math.max(x1 - x0, y1 - y0) * 0.05;
    return { x: x0 - folga, y: y0 - folga, w: x1 - x0 + folga * 2, h: y1 - y0 + folga * 2 };
  }, [prontos.join(), estados, perto, atendidas]);
  const escala = quadro ? quadro.w / 680 : 1; // texto do mesmo tamanho em qualquer enquadramento

  /* Nomes das cidades mais atendidas, sem sobrepor: a mais forte entra primeiro. */
  const rotulos = useMemo(() => {
    if (!quadro) return [];
    // O nome fica logo acima do ponto da cidade, para não cobri-lo.
    const postos = [];
    for (const m of atendidas.slice(0, 12)) {
      const w = m.nome.length * 7 * escala, h = 15 * escala;
      const y = m.y - 11 * escala;
      const x = Math.min(Math.max(m.x, quadro.x + w / 2), quadro.x + quadro.w - w / 2);
      const caixa = { x0: x - w / 2, x1: x + w / 2, y0: y - h / 2, y1: y + h / 2 };
      if (caixa.y0 < quadro.y || caixa.y1 > quadro.y + quadro.h) continue;
      if (!postos.some((p) => caixa.x0 < p.x1 && caixa.x1 > p.x0 && caixa.y0 < p.y1 && caixa.y1 > p.y0)) postos.push({ ...caixa, x, y, nome: m.nome });
    }
    return postos;
  }, [quadro, atendidas, escala]);

  if (!dados) return null;

  const cidadesPorUf = (uf) => (dados.cidades || []).filter((c) => c.uf === uf)
    .sort((a, b) => b.nivel - a.nivel || b.empreendimentos - a.empreendimentos);
  const empreendimentosDaUf = (uf) => dados.ufs.find((u) => u.uf === uf)?.empreendimentos || 0;

  const dicaDaCidade = (m, c) => (
    <>
      <strong>{m.nome} – {m.uf}</strong>
      <span>{c ? `Atendemos aqui · ${plural(c.empreendimentos, "empreendimento", "empreendimentos")}` : "Ainda sem atendimento"}</span>
    </>
  );
  const mostrarDica = (e, conteudo) => {
    const r = quadroRef.current?.getBoundingClientRect();
    if (r) setDica({ x: e.clientX - r.left, y: e.clientY - r.top, largura: r.width, conteudo });
  };

  return (
    <section className="secao" id="atuacao">
      <div className="env atuacao">
        <div>
          <p className="olho">Onde atuamos</p>
          <h2>Cada cidade colorida é um lugar onde já entregamos laudo.</h2>
          <p className="atuacao__texto">
            Quanto mais quente a cor, mais atendimentos naquela cidade. O mapa é atualizado
            automaticamente com os atendimentos registrados no sistema da FN.
          </p>

          <div className="atuacao__estados">
            {ufs.map((uf) => {
              const cidades = cidadesPorUf(uf);
              return (
                <div className="atuacao__estado" key={uf}>
                  <strong>{NOME_UF[uf] || uf}</strong>
                  <span>
                    {plural(cidades.length, "cidade atendida", "cidades atendidas")}
                    {" · "}
                    {plural(empreendimentosDaUf(uf), "empreendimento", "empreendimentos")}
                  </span>
                  {cidades.length > 0 && (
                    <span className="atuacao__cidades">{cidades.map((c) => c.cidade).join(", ")}</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="atuacao__legenda" aria-label="Legenda do mapa">
            <span>Menos</span>
            {CALOR.map((c) => <i key={c} style={{ background: c }} />)}
            <span>Mais atendimentos</span>
            <span className="atuacao__legenda-vazio"><i style={{ background: SEM_ATENDIMENTO }} /> Ainda sem atendimento</span>
          </div>
        </div>

        <figure className="atuacao__mapa" ref={quadroRef} onMouseLeave={() => setDica(null)}>
          {atendidas.length > 0 && (
            <button type="button" className="atuacao__zoom" onClick={() => setPerto((v) => !v)} aria-pressed={perto}>
              {perto ? "Ver os estados inteiros" : "Aproximar das cidades atendidas"}
            </button>
          )}
          {quadro ? (
            <svg viewBox={`${quadro.x} ${quadro.y} ${quadro.w} ${quadro.h}`} role="img"
              aria-label={`Mapa das cidades atendidas pela FN Edificações em ${ufs.map((u) => NOME_UF[u] || u).join(" e ")}`}>
              {prontos.map((uf) => estados[uf].municipios.map((m) => {
                const c = nivelDe.get(`${uf}|${normalizar(m.nome)}`);
                return (
                  <path key={`${uf}-${m.nome}`} d={m.d} fill={c ? CALOR[c.nivel - 1] : SEM_ATENDIMENTO}
                    stroke="#fff" strokeWidth={0.6} vectorEffect="non-scaling-stroke" strokeLinejoin="round"
                    onMouseMove={(e) => mostrarDica(e, dicaDaCidade({ ...m, uf }, c))} />
                );
              }))}
              {prontos.map((uf) => (
                <path key={`c-${uf}`} d={estados[uf].contorno} fill="none" stroke="var(--azul-marinho)"
                  strokeWidth={1.6} vectorEffect="non-scaling-stroke" strokeLinejoin="round" pointerEvents="none" />
              ))}
              {/* Ponto em cada cidade atendida: município pequeno da Região Metropolitana
                  some no desenho, o ponto não. */}
              {atendidas.map((m) => (
                <circle key={`p-${m.uf}-${m.nome}`} cx={m.x} cy={m.y} r={5.5 * escala} fill={CALOR[m.nivel - 1]}
                  stroke="#fff" strokeWidth={1.6 * escala} style={{ cursor: "default" }}
                  onMouseMove={(e) => mostrarDica(e, dicaDaCidade(m, m))} />
              ))}
              {rotulos.map((r) => (
                <text key={r.nome} x={r.x} y={r.y} textAnchor="middle" dominantBaseline="middle" pointerEvents="none"
                  style={{ fontSize: 12.5 * escala, fontWeight: 700, fill: "var(--tinta)", paintOrder: "stroke", stroke: "#fff", strokeWidth: 3.2 * escala, strokeLinejoin: "round" }}>
                  {r.nome}
                </text>
              ))}
            </svg>
          ) : <div className="atuacao__carregando">Carregando o mapa…</div>}
          {dica && (
            <div className="atuacao__dica" style={{ top: dica.y + 14, left: Math.min(dica.x + 14, dica.largura - 230) }}>{dica.conteudo}</div>
          )}
          <figcaption>Malha municipal: IBGE.</figcaption>
        </figure>
      </div>
    </section>
  );
}
