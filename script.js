const checkbox = document.getElementById("checkbox");
const containerForm = document.querySelector(".container-form");

const label = document.getElementsByTagName("label");
const input = document.getElementsByTagName("input");
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputCEP = document.querySelector("#cep");
const botaoCadastrar = document.getElementById("botao-cadastrar");
const botaoEnviar = document.getElementById("botao-enviar");

let inputHomem = document.getElementById("homem");
let inputMulher = document.getElementById("mulher");
let inputCrianca = document.getElementById("criança");
let inputBebida = document.getElementById("bebidas");

const sectionUsuario = document.querySelector(".content-1");
const sectionPessoas = document.querySelector(".pessoas-container");
const dadosUsuarios = [];

let emailVerificado = false;
let inputValidado = false;
let cepVerificado = false;

if (localStorage.getItem("usuários")) {
  sectionUsuario.style.display = "none";
  sectionPessoas.style.display = "inline-flex";
  sectionPessoas.style.flexDirection = "column";
}

botaoCadastrar.addEventListener("click", function (e) {
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

  const cepError = document.querySelector(".cep-error");

  fetchCep(cep)
    .then((CEP) => {
      cepVerificado = true;
    })
    .catch((error) => {
      cepError.style.opacity = 1;
    });

  if (cepVerificado && emailVerificado && inputValidado) {
    sectionUsuario.style.display = "none";
    sectionPessoas.style.display = "inline-flex";
    sectionPessoas.style.flexDirection = "column";
    localStorage.setItem("usuários", dadosUsuarios);
  }
  e.preventDefault();
});

const fetchCep = async (cep, e) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const CEP = await response.json();
    return CEP;
  } catch (error) {}
  e.preventDefault();
};

checkbox.addEventListener("change", function () {
  document.body.classList.toggle("dark");

  for (let item of label) {
    item.classList.toggle("font-light");
  }

  for (item of containerForm) {
    item.classList.toggle("input-dark");
  }
});

function validaInputs() {
  if (inputNome.value != "" && inputCEP.value != "") {
    botaoCadastrar.classList.add("botao-primario");
    botaoCadastrar.classList.remove("botao-disable");
    botaoCadastrar.disabled = false;
    inputValidado = true;
  }
}

function verificaEmail() {
  const email = inputEmail.value;
  const verifica = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailError = document.querySelector(".email-error");

  if (!verifica.test(email)) {
    emailError.style.opacity = 1;
  } else {
    emailVerificado = true;
    emailError.style.opacity = 0;
  }
}

botaoEnviar.addEventListener("click", function (e) {
  console.log("mulher", mulher);
  console.log("crianca", crianca);
  console.log("bebida", bebida);
  e.preventDefault();
});

function valorInput() {
  let inputs = document.querySelectorAll(".input-error");  
  for (let item of inputs) {    
    if (item.value < 0) {
      item.value = "";
    }

    if (item.value.includes(",") || item.value.includes(".")) {
       item.value = "";
    } 

    if(item.value != 0){
      botaoEnviar.classList.add("botao-primario");
      botaoEnviar.classList.remove("botao-disable");
      botaoEnviar.disabled = false;
    }
    // if(item.value == 0){
    //   botaoEnviar.classList.add("botao-disable");
    //   botaoEnviar.classList.remove("botao-primario");
    //   botaoEnviar.disabled = true;
    // }
  }
}
