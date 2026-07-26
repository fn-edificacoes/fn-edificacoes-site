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

const ORIGEM = "C:/Users/user/Downloads/clientes";
const DESTINO = "public/video";
mkdirSync(DESTINO, { recursive: true });

/* [pasta, arquivo, nome de saída, manter áudio] */
const ESCOLHIDOS = [
  ["videos", "WhatsApp Video 2026-07-26 at 20.09.59.mp4", "vistoria-01", false],
  ["videos", "WhatsApp Video 2026-07-26 at 20.09.52.mp4", "vistoria-02", false],
  ["videos", "teste de percurção.mp4", "vistoria-03", false],

  ["defeitos", "WhatsApp Video 2026-07-26 at 20.10.26.mp4", "defeito-01", false],
  ["defeitos", "WhatsApp Video 2026-07-26 at 20.20.04.mp4", "defeito-02", false],
  ["defeitos", "WhatsApp Video 2026-07-26 at 20.20.09.mp4", "defeito-03", false],

  ["videos clientes", "WhatsApp Video 2026-07-26 at 20.10.25.mp4", "cliente-01", true],
  ["videos clientes", "WhatsApp Video 2026-07-26 at 20.13.42.mp4", "cliente-02", true],
];

const rodar = (args) => execFileSync(ffmpeg, ["-y", "-loglevel", "error", ...args], { stdio: ["ignore", "pipe", "pipe"] });

let antes = 0, depois = 0;

for (const [pasta, arquivo, nome, comAudio] of ESCOLHIDOS) {
  const entrada = path.join(ORIGEM, pasta, arquivo);
  if (!existsSync(entrada)) { console.log(`FALTOU: ${entrada}`); continue; }
  antes += statSync(entrada).size;

  const saida = path.join(DESTINO, `${nome}.mp4`);
  rodar([
    "-i", entrada,
    "-vf", "scale=-2:832",          // altura fixa; largura par, exigência do H.264
    "-c:v", "libx264", "-crf", "30", "-preset", "slow", "-profile:v", "main",
    ...(comAudio ? ["-c:a", "aac", "-b:a", "96k"] : ["-an"]),
    "-movflags", "+faststart",       // começa a tocar antes de baixar tudo
    "-map_metadata", "-1",           // tira localização e dados do aparelho
    saida,
  ]);
  depois += statSync(saida).size;

  // Poster: primeiro quadro, para a página não mostrar retângulo preto.
  rodar(["-i", saida, "-frames:v", "1", "-vf", "scale=-2:832", "-q:v", "4",
    path.join(DESTINO, `${nome}.jpg`)]);

  const mb = (statSync(saida).size / 1048576).toFixed(1);
  console.log(`${nome.padEnd(12)} ${mb.padStart(5)} MB  ${comAudio ? "com áudio" : "sem áudio"}`);
}

console.log(`\nOriginais: ${(antes / 1048576).toFixed(1)} MB`);
console.log(`Publicados: ${(depois / 1048576).toFixed(1)} MB`);
