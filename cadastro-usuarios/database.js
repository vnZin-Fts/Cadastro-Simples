import Database from "better-sqlite3";
import { readFileSync } from "node:fs";

const db = new Database("../database/usuarios.db");
const leitura = readFileSync("../database/usuarios.sql", "utf-8");

db.exec(leitura);

export function cadastroUsuario(usuarios) {
  const inserir = db.prepare(
    "INSERT INTO usuarios (nome_usuario, email, senha) VALUES (@nome_usuario, @email, @senha)",
  );

  inserir.run(usuarios);
}
