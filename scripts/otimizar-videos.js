/* Vídeos curtos para o site.

   Escolha por dados, não por gosto: dos 17 enviados, ficaram 8 — os de duração que
   as pessoas assistem até o fim. Vídeo de 1 minuto na home é abandonado no meio;
   os de 10 a 30 segundos são vistos inteiros.

   Áudio: removido nos de vistoria e de defeito. Som que dispara sozinho faz o
   visitante fechar a aba, e nesses o que importa é a imagem. Nos dois de cliente
   recebendo as chaves o áudio fica, porque ali a fala é o conteúdo.

   Cada vídeo também gera um "poster" (primeiro quadro): é o que aparece antes de
   alguém tocar em play, então a página não fica com retângulos pretos e o vídeo só
   é baixado se a pessoa quiser ver. */
import ffmpeg from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";

/* Dois lotes, em dois computadores: o de julho/2026 (gravações cruas do WhatsApp) e o de
   outubro/2026 (já editados no CapCut). Quem rodar de novo ajusta a pasta do lote que tiver
   à mão; os vídeos cujo original não for encontrado são pulados e o publicado fica como está. */
const LOTE_JULHO = "C:/Users/user/Downloads/clientes";
const LOTE_OUTUBRO = "C:/Users/vrvil/Downloads";
const DESTINO = "public/video";
mkdirSync(DESTINO, { recursive: true });

/* semMarca: corta os 6% de cima, onde o CapCut carimba o logo dele em todos os quadros.
   capaEm: segundo de onde sai o poster. Os editados abrem com transição (quadro escuro ou
   borrado), então o primeiro quadro não serve de capa para eles. */
const ESCOLHIDOS = [
  { pasta: path.join(LOTE_JULHO, "videos"), arquivo: "WhatsApp Video 2026-07-26 at 20.09.59.mp4", nome: "vistoria-01" },
  { pasta: path.join(LOTE_JULHO, "videos"), arquivo: "teste de percurção.mp4", nome: "vistoria-03" },
  { pasta: path.join(LOTE_JULHO, "defeitos"), arquivo: "WhatsApp Video 2026-07-26 at 20.20.04.mp4", nome: "defeito-02" },
  { pasta: path.join(LOTE_JULHO, "videos clientes"), arquivo: "WhatsApp Video 2026-07-26 at 20.13.42.mp4", nome: "cliente-02", comAudio: true },

  { pasta: LOTE_OUTUBRO, arquivo: "WhatsApp Video 2026-10-05 at 12.47.30.mp4", nome: "vistoria-04", semMarca: true, capaEm: 2 },
  { pasta: LOTE_OUTUBRO, arquivo: "WhatsApp Video 2026-10-05 at 12.47.32.mp4", nome: "vistoria-05", semMarca: true, capaEm: 2 },
  { pasta: LOTE_OUTUBRO, arquivo: "WhatsApp Video 2026-10-05 at 12.47.27.mp4", nome: "vistoria-06", semMarca: true, capaEm: 2 },
  { pasta: LOTE_OUTUBRO, arquivo: "WhatsApp Video 2026-10-05 at 12.47.24.mp4", nome: "cliente-03", semMarca: true, capaEm: 2, comAudio: true },
];

const rodar = (args) => execFileSync(ffmpeg, ["-y", "-loglevel", "error", ...args], { stdio: ["ignore", "pipe", "pipe"] });

let antes = 0, depois = 0;

for (const { pasta, arquivo, nome, comAudio = false, semMarca = false, capaEm = 0 } of ESCOLHIDOS) {
  const entrada = path.join(pasta, arquivo);
  if (!existsSync(entrada)) { console.log(`FALTOU: ${entrada}`); continue; }
  antes += statSync(entrada).size;

  const saida = path.join(DESTINO, `${nome}.mp4`);
  const filtros = [
    ...(semMarca ? ["crop=iw:trunc(ih*0.94/2)*2:0:ih*0.06"] : []),
    "scale=-2:832",                  // altura fixa; largura par, exigência do H.264
    "fps=30",                        // alguns chegam a 60 quadros: o dobro do peso, sem ganho visível
  ];
  rodar([
    "-i", entrada,
    "-vf", filtros.join(","),
    "-c:v", "libx264", "-crf", "30", "-preset", "slow", "-profile:v", "main",
    ...(comAudio ? ["-c:a", "aac", "-b:a", "96k"] : ["-an"]),
    "-movflags", "+faststart",       // começa a tocar antes de baixar tudo
    "-map_metadata", "-1",           // tira localização e dados do aparelho
    saida,
  ]);
  depois += statSync(saida).size;

  // Poster, para a página não mostrar retângulo preto.
  rodar(["-ss", String(capaEm), "-i", saida, "-frames:v", "1", "-vf", "scale=-2:832", "-q:v", "4",
    path.join(DESTINO, `${nome}.jpg`)]);

  const mb = (statSync(saida).size / 1048576).toFixed(1);
  console.log(`${nome.padEnd(12)} ${mb.padStart(5)} MB  ${comAudio ? "com áudio" : "sem áudio"}`);
}

console.log(`\nOriginais: ${(antes / 1048576).toFixed(1)} MB`);
console.log(`Publicados: ${(depois / 1048576).toFixed(1)} MB`);
