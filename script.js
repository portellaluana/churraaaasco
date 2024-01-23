const checkbox = document.getElementById("checkbox");
const label = document.getElementsByTagName("label");
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputCEP = document.querySelector("#cep");
const buttonCadastrar = document.getElementById("botao-cadastrar");

const dadosUsuarios = [];

buttonCadastrar.addEventListener("click", function (e) {
  const nome = inputNome.value;
  const email = inputEmail.value;
  const cep = inputCEP.value;

  const cadastro = {
    nome,
    email,
    cep,
  };

  let dadoUsuario = JSON.stringify(cadastro);
  dadosUsuarios.push("dadoUsuario", dadoUsuario);

  localStorage.setItem("usuários", dadosUsuarios);

  e.preventDefault();
});

checkbox.addEventListener("change", function () {
  document.body.classList.toggle("dark");

  for (let item of label) {
    item.classList.toggle("font-light");
  }
});
