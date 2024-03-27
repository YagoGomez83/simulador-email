document.addEventListener("DOMContentLoaded", () => {
  // seleccionar lo elementos del formulario
  const inputEmail = document.querySelector("#email");

  const inputAsunto = document.querySelector("#asunto");

  const inputMensaje = document.querySelector("#mensaje");

  //Eventos
  inputEmail.addEventListener("blur", validar);
  inputAsunto.addEventListener("blur", validar);
  inputMensaje.addEventListener("blur", validar);
  function validar(e) {
    console.log(e.target.value);
  }
});
