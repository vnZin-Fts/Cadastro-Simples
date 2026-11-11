import Database from "better-sqlite3";
import { readFileSync } from "node:fs";

const db = new Database("../database/usuarios.db");
const leitura = readFileSync("../database/usuarios.sql", "utf-8");

db.exec(leitura);

export function cadastroUsuario(usuarios) {
  const inserir = db.prepare(
    "INSERT INTO usuarios (nome_usuario, email, senha) VALUES (@nome_usuario, @email, @senha)",
  );

  return inserir.run(usuarios);
}

export function deletarUsuario(id) {
  const deletar = db.prepare("DELETE FROM usuarios WHERE id = ?");

  return deletar.run(id);
}

export function listaUsuarios() {
  const listagem = db.prepare("SELECT id, nome_usuario, email FROM usuarios");

  return listagem.all();
}

export function atualizarUsuario(id, novoNome) {
  const atualizacao = db.prepare(
    "UPDATE usuarios SET nome_usuario = ? WHERE id = ?",
  );

  return atualizacao.run(novoNome, id);
}

export function buscarUsuarioPorEmail(email) {
  const busacaEmailUsuario = db.prepare(
    "SELECT email, senha FROM usuarios WHERE email = ? ",
  );

  return busacaEmailUsuario.get(email);
}
