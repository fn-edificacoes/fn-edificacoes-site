import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Loja from "./Loja.jsx";
import "../estilos.css";
import "./loja.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Loja />
  </StrictMode>
);
