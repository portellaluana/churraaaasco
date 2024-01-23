const checkbox = document.getElementById("checkbox");
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputCEP = document.querySelector("#cep");
const buttonCadastrar = document.getElementById("botao-cadastrar");
const arr = [];

buttonCadastrar.addEventListener("click", function (e) {
  const nome = inputNome.value;
  const email = inputEmail.value;
  const cep = inputCEP.value;

  const cadastro = {
    nome,
    email,
    cep,
  };


  let novoArr = JSON.stringify(cadastro);
  arr.push('novoArr',novoArr);

  localStorage.setItem("meuarr", arr);

  e.preventDefault();
});

// let fontLight = Array.from(document.querySelectorAll('.font-dark'))

// checkbox.addEventListener("change", function(){
//   document.body.classList.toggle("dark");
//   document.body.classList.toggle("font-light");
// });
