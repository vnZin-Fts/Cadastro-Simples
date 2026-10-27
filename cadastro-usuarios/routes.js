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

  try {
    const novoUsuario = cadastroUsuario({ nome_usuario, email, senha });

    return res.status(201).json({
      mensagem: "Usuario cadastrado com sucesso!",
      usuario: novoUsuario,
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuario:", error.message);

    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        erro: "Usuario já existente",
        campos: ["email"],
      });
    } else {
      return res.status(500).json({
        erro: "Erro interno do servidor",
      });
    }
  }
});

rota.delete("/delete/:id", (req, res) => {});

export default rota;
