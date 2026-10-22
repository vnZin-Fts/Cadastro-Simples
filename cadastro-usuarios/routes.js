import express from "express";
import { cadastroUsuario } from "./database.js";

const rota = express.Router();

rota.post("/cadastro_usuarios", (req, res) => {
  const { nome_usuario, email, senha } = req.body;

  if (!nome_usuario || !email || !senha) {
    return res.status(400).json({
      erro: "Campos obrigatorios ausentes.",
      campos: ["nome_usuario", "email", "senha"],
    });
  }

  const novoUsuario = cadastroUsuario({ nome_usuario, email, senha });

  return res.status(201).json({
    mensagem: "Usuario cadastrado com sucesso!",
    usuario: novoUsuario,
  });
});
export default rota;
