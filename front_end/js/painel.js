const tabela = document.getElementById("tabela-usuarios");

async function carregaUsuarios() {
  try {
    const resposta = await fetch("http://localhost:3000/usuarios");

    const usuarios = await resposta.json();

    console.log("Dados recebidos:", usuarios);
    console.log("É um array?", Array.isArray(usuarios));
    console.log("Chaves disponíveis:", Object.keys(usuarios));

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    tabela.replaceChildren();

    usuarios.clientes.forEach((usuario) => {
      const linha = document.createElement("tr");

      const celulaNome = document.createElement("td");
      celulaNome.textContent = usuario.nome_usuario;

      const celulaEmail = document.createElement("td");
      celulaEmail.textContent = usuario.email;

      linha.appendChild(celulaNome);
      linha.appendChild(celulaEmail);
      tabela.appendChild(linha);
    });

    console.log(usuarios);
  } catch (error) {
    console.error("Erro", error.message);
  }
}

carregaUsuarios();
