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
      cepError.style.display = 'flex';
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
  if(inputNome.value === ''){
    let error = document.querySelector('.nome-error');
    error.style.display = 'flex'
  } else error.style.display = 'none'
}

function verificaEmail() {
  const email = inputEmail.value;
  const verifica = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailError = document.querySelector(".email-error");

  if (!verifica.test(email)) {
    emailError.style.display = 'flex';
  } else {
    emailVerificado = true;
    emailError.style.display = 'none';
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
      inputMulher.value != 0
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

  let totalPessoas = Number(inputHomem.value) + Number(inputMulher.value) + Number(inputCrianca.value);
  let totalAdultos = Number(inputHomem.value) + Number(inputMulher.value);
  
  let totalCarne = Number(inputHomem.value) * 400 + Number(inputMulher.value) * 320 + Number(inputCrianca.value) * 200;
  let totalPaoAlho = Number(totalAdultos) * 2 + Number(inputCrianca.value) * 1;
  let  totalCarvao = Number(totalPessoas);
  let  totalSal = Number(totalPessoas) * 0.04;
  let  totalGelo = Number(totalPessoas) * 0.5;
  let  totalRefri = Number(totalPessoas) * 400;
  let  totalAgua = Number(totalPessoas) * 200;
  let  totalCerveja = Number(inputBebida.value) * 3;

  let numerosConvidados = document.querySelector(".numero-convidados");

  let convidados = document.querySelector('.linha-convidados')

  if (totalPessoas > 1) {
    numerosConvidados.textContent = totalPessoas + " pessoas";
  } else numerosConvidados.textContent = totalPessoas + " pessoa";

  let homens = document.createElement('span');
  convidados.appendChild(homens)
  homens.classList.add('numero-homens')

  let mulheres = document.createElement('span');
  convidados.appendChild(mulheres)
  mulheres.classList.add('numero-mulheres')

  let criancas = document.createElement('span');
  convidados.appendChild(criancas)
  criancas.classList.add('numero-criancas')

  if (inputHomem.value > 1) {
    homens.textContent = inputHomem.value + " homens";
  }
  if (inputHomem.value == 1) {
    homens.textContent = inputHomem.value + " homem";
  }
  if (inputMulher.value > 1) {
    mulheres.textContent = inputMulher.value + " mulheres";
  }
  if (inputMulher.value == 1) {
    mulheres.textContent = inputMulher.value + " mulher";
  }
  if (inputCrianca.value > 1) {
    criancas.textContent = inputCrianca.value + " crianças";
  }
  if (inputCrianca.value == 1) {
    criancas.textContent = inputCrianca.value + " criança";
  }

  let secttionResultado = document.querySelector(".container-resultado");
  secttionResultado.style.display = "block";
  sectionUsuario.style.display = "none";
  sectionPessoas.style.display = "none";

  let itemCarne = document.querySelector('.carne');
  let Carne = document.createElement('td');
  let qntCarne = document.createElement('td');
  itemCarne.appendChild(Carne)
  itemCarne.appendChild(qntCarne)
  Carne.innerHTML = `<td >Carne</td>`;
  qntCarne.innerHTML = `<td >${totalCarne} g</td>`;

  let itemPaoAlho = document.querySelector('.pao-alho');
  let paoAlho = document.createElement('td');
  let qntPaoAlho = document.createElement('td');
  itemPaoAlho.appendChild(paoAlho)
  itemPaoAlho.appendChild(qntPaoAlho)
  paoAlho.innerHTML = `<td >Pão de alho</td>`;
  qntPaoAlho.innerHTML = `<td >${totalPaoAlho} unidades</td>`;

  let itemCarvao = document.querySelector('.carvao');
  let carvao = document.createElement('td');
  let qntCarvao = document.createElement('td');
  itemCarvao.appendChild(carvao)
  itemCarvao.appendChild(qntCarvao)
  carvao.innerHTML = `<td >Carvão</td>`;
  qntCarvao.innerHTML = `<td >${totalCarvao} kg</td>`;

  let itemSal = document.querySelector('.sal');
  let sal = document.createElement('td');
  let qntSal = document.createElement('td');
  itemSal.appendChild(sal)
  itemSal.appendChild(qntSal)
  sal.innerHTML = `<td >Sal</td>`;
  qntSal.innerHTML = `<td >${totalSal} g</td>`;
 
  let itemGelo = document.querySelector('.gelo');
  let gelo = document.createElement('td');
  let qntGelo = document.createElement('td');
  itemGelo.appendChild(gelo)
  itemGelo.appendChild(qntGelo)
  gelo.innerHTML = `<td >Gelo</td>`;
  qntGelo.innerHTML = `<td >${totalGelo} saco</td>`;

  let itemRefri = document.querySelector('.refri');
  let refri = document.createElement('td');
  let qntRefri = document.createElement('td');
  itemRefri.appendChild(refri)
  itemRefri.appendChild(qntRefri)
  refri.innerHTML = `<td >Refrigerante</td>`;
  qntRefri.innerHTML = `<td >${totalRefri} ml</td>`;

  let itemAgua = document.querySelector('.agua');
  let agua = document.createElement('td');
  let qntAgua = document.createElement('td');
  itemAgua.appendChild(agua)
  itemAgua.appendChild(qntAgua)
  agua.innerHTML = `<td >Água</td>`;
  qntAgua.innerHTML = `<td >${totalAgua} ml</td>`;

  if(inputBebida.value != 0){
  let itemCerveja = document.querySelector('.cerveja');
  let cerveja = document.createElement('td');
  let qntCerveja = document.createElement('td');
  itemCerveja.appendChild(cerveja)
  itemCerveja.appendChild(qntCerveja)
  cerveja.innerHTML = `<td >Cerveja</td>`;
  qntCerveja.innerHTML = `<td >${totalCerveja} garrafas</td>`;
  }
 
  e.preventDefault();
});