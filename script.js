const checkbox = document.getElementById("checkbox");
const containerForm = document.querySelector(".container-form");

const label = document.getElementsByTagName("label");
// const input = document.getElementsByTagName("input");
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputCEP = document.querySelector("#cep");
const botaoCadastrar = document.getElementById("botao-cadastrar");
const botaoEnviar = document.getElementById("botao-enviar");

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

const mais = document.querySelectorAll(".mais");
const menos = document.querySelectorAll(".menos");
const inputHomem = document.getElementById("input-homem");
const inputMulher = document.getElementById("input-mulher");
const inputCrianca = document.getElementById("input-crianca");
const inputBebida = document.getElementById("input-bebida");

let contadores = {
  homem: 0,
  mulher: 0,
  crianca: 0,
  bebida: 0,
};

function get(tipo) {
  return contadores[tipo];
}

function adiciona(tipo) {
  contadores[tipo]++;
}

function diminui(tipo) {
  if (contadores[tipo] > 0) {
    contadores[tipo]--;
  }
}

mais.forEach((button) => {
  button.addEventListener("click", (e) => {
    const tipo = e.target.classList.value.split("-")[1];
    adiciona(tipo);
    atualizaInput();
  });
});

menos.forEach((button) => {
  button.addEventListener("click", (e) => {
    const tipo = e.target.classList.value.split("-")[1];
    diminui(tipo);
    atualizaInput();
  });
});

function atualizaInput() {
  inputHomem.value = get("homem");
  inputMulher.value = get("mulher");
  inputCrianca.value = get("crianca");
  inputBebida.value = get("bebida");
  valorInput();
}

function valorInput() {
  let inputs = document.querySelectorAll(".input-value");

  for (let item of inputs) {
    if (item.value < 0) {
      item.value = "";
    }

    if (item.value.includes(",") || item.value.includes(".")) {
      item.value = "";
    }

    if (
      inputHomem.value != 0 ||
      inputMulher.value != 0 ||
      inputCrianca.value != 0 ||
      inputBebida.value != 0
    ) {
      botaoEnviar.classList.add("botao-primario");
      botaoEnviar.classList.remove("botao-disable");
      botaoEnviar.disabled = false;
    } else {
      botaoEnviar.classList.add("botao-disable");
      botaoEnviar.classList.remove("botao-primario");
      botaoEnviar.disabled = true;
    }
  }
}

let carne = {
  homem: 0.4,
  mulher: 0.32,
  crianca: 0.2,
};
let paoAlho = {
  adulto: 2,
  crianca: 1,
};
let carvao = {
  pessoa: 1,
};
let sal = {
  pessoa: 0.04,
};
let gelo = {
  pessoa: 0.5,
};
let refri = {
  pessoa: 0.4,
};
let agua = {
  pessoa: 0.2,
};
let cerveja = {
  adulto: 3,
};

botaoEnviar.addEventListener("click", function (e) {
  let totalPessoas =
    Number(inputHomem.value) +
    Number(inputMulher.value) +
    Number(inputCrianca.value);
  let totalAdultos = Number(inputHomem.value) + Number(inputMulher.value);

  let totalCarne =
    Number(inputHomem.value) * 400 +
    Number(inputMulher.value) * 320 +
    Number(inputCrianca.value) * 200;
  console.log("totalCarne", totalCarne + "gramas de carne");

  let totalPaoAlho = Number(totalAdultos) * 2 + Number(inputCrianca.value) * 1;
  console.log("totalPaoAlho", totalPaoAlho + "pães de alho");

  let totalCarvao = Number(totalPessoas);
  console.log("totalCarvao", totalCarvao + "sacos de carvão");

  let totalSal = Number(totalPessoas) * 0.04;
  console.log("totalSal", totalSal + "gramas de sal");

  let totalGelo = Number(totalPessoas) * 0.5;
  console.log("totalGelo", totalGelo);

  let totalRefri = Number(totalPessoas) * 0.4;
  console.log("totalRefri", totalRefri + "litros de refri");

  let totalAgua = Number(totalPessoas) * 0.2;
  console.log("totalAgua", totalAgua + "litros de água");

  let totalCerveja = Number(totalAdultos) * 3;
  console.log("totalCerveja", totalCerveja + "garrafas");

  let numerosConvidados = document.querySelector(".numero-convidados");
  if (totalPessoas > 1) {
    numerosConvidados.textContent = totalPessoas + " pessoas";
  } else numerosConvidados.textContent = totalPessoas + " pessoa";

  let numeroHomens = document.querySelector(".numero-homens");
  let numeroMulheres = document.querySelector(".numero-mulheres");
  let numeroCriancas = document.querySelector(".numero-criancas");

  if (inputHomem.value > 1) {
    numeroHomens.textContent = inputHomem.value + " homens";
  }
  if (inputHomem.value == 1) {
    numeroHomens.textContent = inputHomem.value + " homem";
  }
  if (inputMulher.value > 1) {
    numeroMulheres.textContent = inputMulher.value + " mulheres";
  }
  if (inputMulher.value == 1) {
    numeroMulheres.textContent = inputMulher.value + " mulher";
  }
  if (inputCrianca.value > 1) {
    numeroCriancas.textContent = inputCrianca.value + " crianças";
  }
  if (inputCrianca.value == 1) {
    numeroCriancas.textContent = inputCrianca.value + " criança";
  }
  let secttionResultado = document.querySelector(".container-resultado");
  secttionResultado.style.display = "block";
  sectionUsuario.style.display = "none";
  sectionPessoas.style.display = "none";

  e.preventDefault();
});
