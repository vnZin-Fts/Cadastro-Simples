const cadastroForm = document.getElementById("form-cadastro");
const nomeUsuario = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");

let usuario = [];

function dadosCliente() {
  if (/[0-9]/.test(nomeUsuario.value)) {
    alert("O nome não pode conter números!");
    return false;
  }

  const dados = {
    nome_usuario: nomeUsuario.value,
    email: campoEmail.value,
    senha: campoSenha.value,
  };

  usuario.push(dados);

  return dados;
}

async function envioDados(dados) {
  if (!dados) return;

  try {
    const resposta = await fetch("http://localhost:3000/cadastro_usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

cadastroForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const cliente = dadosCliente();

  if (!cliente) {
    return;
  }

  envioDados(cliente);
  console.log(usuario);
});
