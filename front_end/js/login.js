const formularioLogin = document.getElementById("form-login");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const mensagemLogin = document.getElementById("mensagem-login");

formularioLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = {
    email: campoEmail.value,
    senha: campoSenha.value,
  };

  envioLogin(usuario);
});

async function envioLogin(login) {
  if (!login) return;

  try {
    const resposta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mensagemLogin.textContent = dados.mensagem;
      return;
    }

    alert(dados.mensagem);

    window.location.href = "painel.html";

    console.log(dados.mensagem);
  } catch (error) {
    console.error("Erro:", error.message);
  }
}
