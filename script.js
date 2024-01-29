const checkbox = document.getElementById("checkbox");
const containerForm = document.querySelector(".container-form");

const label = document.getElementsByTagName("label");
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

botaoCadastrar.addEventListener("click", async function (e) {
  e.preventDefault();

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

  try {
    await fetchCep(cep);
    cepVerificado = true;

    if (cepVerificado && emailVerificado && inputValidado) {
      sectionUsuario.style.display = "none";
      sectionPessoas.style.display = "inline-flex";
      sectionPessoas.style.flexDirection = "column";
      localStorage.setItem("usuários", JSON.stringify(dadosUsuarios));
    }
  } catch (error) {
    cepError.style.display = "flex";
  }
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
  if (inputNome.value === "") {
    let error = document.querySelector(".nome-error");
    error.style.display = "flex";
  } else error.style.display = "none";
}

function verificaEmail() {
  const email = inputEmail.value;
  const verifica = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailError = document.querySelector(".email-error");

  if (!verifica.test(email)) {
    emailError.style.display = "flex";
  } else {
    emailVerificado = true;
    emailError.style.display = "none";
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

    if (inputHomem.value != 0 || inputMulher.value != 0) {
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

const ingredientes = {
  carne: { homem: 0.4, mulher: 0.32, crianca: 0.2 },
  paoAlho: { adulto: 2, crianca: 1 },
  carvao: { pessoa: 1 },
  sal: { pessoa: 0.04 },
  gelo: { pessoa: 0.5 },
  refri: { pessoa: 0.4 },
  agua: { pessoa: 0.2 },
  cerveja: { adulto: 3 },
};

const calcularTotal = (quantidade, unidade) => {
  return (
    quantidade * ingredientes[unidade][inputBebida.value ? "adulto" : "pessoa"]
  );
};

const criarElemento = (classe, label, quantidade, unidade) => {
  const item = document.querySelector(`.${classe}`);
  const elemento = document.createElement("td");
  const qntElemento = document.createElement("td");

  item.appendChild(elemento);
  item.appendChild(qntElemento);

  elemento.innerHTML = `<td>${label}</td>`;
  qntElemento.innerHTML = `<td>${quantidade} ${ingredientes[unidade].unidade}</td>`;
};

botaoEnviar.addEventListener("click", function (e) {
  e.preventDefault();

  let totalPessoas =
    Number(inputHomem.value) +
    Number(inputMulher.value) +
    Number(inputCrianca.value);

  let totalAdultos = Number(inputHomem.value) + Number(inputMulher.value);

  let totalCarne = calcularTotal(totalAdultos, "carne");
  let totalPaoAlho = calcularTotal(totalAdultos, "paoAlho");
  let totalCarvao = totalPessoas;
  let totalSal = totalPessoas * ingredientes.sal.pessoa;
  let totalGelo = totalPessoas * ingredientes.gelo.pessoa;
  let totalRefri = totalPessoas * 400;
  let totalAgua = totalPessoas * 200;
  let totalCerveja =
    inputBebida.value !== "0"
      ? inputBebida.value * ingredientes.cerveja.adulto
      : 0;

  function criarElemento(tag, classe, nomeItem) {
    const element = document.createElement(tag);
    element.classList.add(classe);
    element.textContent = nomeItem;
    return element;
  }

  function adicionaTd(tr, ...td) {
    td.forEach((nomeItem) => {
      const td = document.createElement("td");
      td.textContent = nomeItem;
      tr.appendChild(td);
    });
  }

  const inputHomemValue = Number(inputHomem.value);
  const inputMulherValue = Number(inputMulher.value);
  const inputCriancaValue = Number(inputCrianca.value);

  totalPessoas = inputHomemValue + inputMulherValue + inputCriancaValue;
  totalAdultos = inputHomemValue + inputMulherValue;

  totalCarne =
    inputHomemValue * 400 + inputMulherValue * 320 + inputCriancaValue * 200;

  totalPaoAlho = totalAdultos * 2 + inputCriancaValue * 1;
  totalCarvao = totalPessoas;
  totalSal = totalPessoas * 0.04;
  totalGelo = totalPessoas * 0.5;
  totalRefri = totalPessoas * 400;
  totalAgua = totalPessoas * 200;
  totalCerveja = Number(inputBebida.value) * 3;

  const numerosConvidados = document.querySelector(".numero-convidados");
  numerosConvidados.textContent =
    totalPessoas > 1 ? `${totalPessoas} pessoas` : `${totalPessoas} pessoa`;

  const convidados = document.querySelector(".linha-convidados");
  convidados.innerHTML = "";

  if (inputHomemValue > 0)
    convidados.appendChild(
      criarElemento(
        "span",
        "numero-homens",
        inputHomemValue > 1
          ? `${inputHomemValue} homens`
          : `${inputHomemValue} homem`
      )
    );

  if (inputMulherValue > 0)
    convidados.appendChild(
      criarElemento(
        "span",
        "numero-mulheres",
        inputMulherValue > 1
          ? `${inputMulherValue} mulheres`
          : `${inputMulherValue} mulher`
      )
    );
  if (inputCriancaValue > 0)
    convidados.appendChild(
      criarElemento(
        "span",
        "numero-criancas",
        inputCriancaValue > 1
          ? `${inputCriancaValue} crianças`
          : `${inputCriancaValue} criança`
      )
    );

  const secttionResultado = document.querySelector(".container-resultado");
  secttionResultado.style.display = "block";
  sectionUsuario.style.display = "none";
  sectionPessoas.style.display = "none";

  adicionaTd(document.querySelector(".carne"), "Carne", `${totalCarne} g`);
  adicionaTd(
    document.querySelector(".pao-alho"),
    "Pão de alho",
    `${totalPaoAlho} unidades`
  );
  adicionaTd(document.querySelector(".carvao"), "Carvão", `${totalCarvao} kg`);
  adicionaTd(document.querySelector(".sal"), "Sal", `${totalSal} g`);
  adicionaTd(document.querySelector(".gelo"), "Gelo", `${totalGelo} saco`);
  adicionaTd(
    document.querySelector(".refri"),
    "Refrigerante",
    `${totalRefri} ml`
  );
  adicionaTd(document.querySelector(".agua"), "Água", `${totalAgua} ml`);

  if (inputBebida.value != 0)
    adicionaTd(
      document.querySelector(".cerveja"),
      "Cerveja",
      `${totalCerveja} garrafas`
    );
});
