import express from "express";
import rotasUsuarios from "./routes.js";

const app = express();

app.use(express.static("../front_end"));

app.use(express.json());

app.use(rotasUsuarios);

app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
