import express from "express";
import { cadastroUsuario, deletarUsuario, listaUsuarios } from "./database.js";

const rota = express.Router();

rota.get("/usuarios", (req, res) => {
  const listaPessoas = listaUsuarios();

  return res.status(200).json({
    mensagem: "Usuarios listados com sucesso",
    clientes: listaPessoas,
  });
});

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

rota.delete("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "ID invalido",
    });
  }

  try {
    const resultado = deletarUsuario(id);

    if (resultado.changes === 0) {
      return res.status(404).json({
        mensagem: "Usuario não encontrado",
      });
    } else {
      return res.status(200).json({
        mensagem: "Sucesso!",
      });
    }
  } catch (error) {
    console.error("Erro ao apagar o id:", error.message);
    return res.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
});

export default rota;
