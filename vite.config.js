import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Domínio próprio na raiz (fnedificacoes.com.br), então sem prefixo de caminho.
export default defineConfig({
  plugins: [react()],
  server: { port: 5174, strictPort: true },
});
