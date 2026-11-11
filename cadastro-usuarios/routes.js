import express from "express";
import {
  cadastroUsuario,
  deletarUsuario,
  listaUsuarios,
  atualizarUsuario,
  buscarUsuarioPorEmail,
} from "./database.js";
import argon2 from "argon2";

const rota = express.Router();

rota.get("/usuarios", (req, res) => {
  const listaPessoas = listaUsuarios();

  return res.status(200).json({
    mensagem: "Usuarios listados com sucesso",
    clientes: listaPessoas,
  });
});

rota.post("/login", async (req, res) => {
  const { senha, email } = req.body;

  if (!senha || !email) {
    return res.status(400).json({
      mensagem: "Campos não prenchidos",
    });
  }

  try {
    const busca = buscarUsuarioPorEmail(email);

    if (!busca) {
      return res.status(401).json({
        mensagem: "Email ou senha inválidos",
      });
    }

    const senhaValida = await argon2.verify(busca.senha, senha);

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: "Email ou senha invalidos!",
      });
    } else {
      return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
      });
    }
  } catch (error) {
    console.error("Erro ao alterar email ou senha", error.message);

    return res.status(500).json({
      mensagem: "erro interno no servidor",
    });
  }
});

rota.post("/cadastro_usuarios", async (req, res) => {
  const { nome_usuario, email, senha } = req.body;

  if (!nome_usuario || !email || !senha) {
    return res.status(400).json({
      erro: "Campos obrigatorios ausentes.",
      campos: ["nome_usuario", "email", "senha"],
    });
  }

  try {
    const hash = await argon2.hash(senha);

    const novoUsuario = cadastroUsuario({ nome_usuario, email, senha: hash });

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

rota.patch("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nome_usuario } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "id invalido!",
    });
  }

  if (typeof nome_usuario !== "string" || !nome_usuario.trim()) {
    return res.status(404).json({
      mensagem: "Usuario invalido",
    });
  }

  try {
    const modificacao = atualizarUsuario(id, nome_usuario);

    if (modificacao.changes === 0) {
      return res.status(400).json({
        mensagem: "Usuario não encontrado",
      });
    } else {
      return res.status(200).json({
        mensagem: "Modificação feita com sucesso",
      });
    }
  } catch (error) {
    console.error("Erro ao alterar os valores:", error.message);

    return res.status(500).json({
      mensagem: "Erro interno do servidor",
    });
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
