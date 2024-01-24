const checkbox = document.getElementById("checkbox");
const containerForm = document.querySelector(".container-form");

const label = document.getElementsByTagName("label");
const input = document.getElementsByTagName("input");
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputCEP = document.querySelector("#cep");
const botaoCadastrar = document.getElementById("botao-cadastrar");
const botaoEnviar = document.getElementById("botao-enviar");

const inputHomem = document.getElementById("homem");
const inputMulher = document.getElementById("mulher");
const inputCrianca = document.getElementById("criança");
const inputBebida = document.getElementById("bebidas");

const sectionUsuario = document.querySelector(".content-1");
const sectionPessoas = document.querySelector(".pessoas-container");
const dadosUsuarios = [];

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
  localStorage.setItem("usuários", dadosUsuarios);

  let cepVerificado;
  
  fetchCep(cep)
    .then((CEP) => {
      cepVerificado = CEP;
        sectionUsuario.style.display = "none";
        sectionPessoas.style.display = "inline-flex";
        sectionPessoas.style.flexDirection = "column";
      
    })
    .catch((error) => {
      console.error("error");
    });

  e.preventDefault();
});

const fetchCep = async (cep,e) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const CEP = await response.json();
    return CEP;
  } catch (error) {
    alert('cep não encontrado')
    //colocar aviso no input
  }
  e.preventDefault();

};

botaoEnviar.addEventListener("click", function (e) {
  const homem = inputHomem.value;
  const mulher = inputMulher.value;
  const crianca = inputCrianca.value;
  const bebida = inputBebida.value;

  console.log("homem", homem);
  console.log("mulher", mulher);
  console.log("crianca", crianca);
  console.log("bebida", bebida);

  e.preventDefault();
});

checkbox.addEventListener("change", function () {
  document.body.classList.toggle("dark");

  for (let item of label) {
    item.classList.toggle("font-light");
  }

  for (item of containerForm) {
    item.classList.toggle("input-dark");
  }
});
