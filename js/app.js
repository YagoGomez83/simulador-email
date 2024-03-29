document.addEventListener("DOMContentLoaded", () => {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  // seleccionar lo elementos del formulario
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const inputCC = document.querySelector("#cc");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  //Eventos
  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);
  inputCC.addEventListener("input", validar);
  formulario.addEventListener("submit", enviarEmail);
  btnReset.addEventListener("click", (e) => {
    e.preventDefault();
    resetFormulario();
  });

  function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");
      //reiniciar el objeto
      resetFormulario();

      //
      // Crear una alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";
      formulario.appendChild(alertaExito);
      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validar(e) {
    const campo = e.target.id;
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El campo ${campo} es oblligatorio`,
        e.target.parentElement
      );
      email[e.target.id] = "";
      comprobarEmail();
      return;
    }
    if (
      (e.target.id === "email" || e.target.id === "cc") &&
      !validarEmail(e.target.value)
    ) {
      mostrarAlerta("El Email no es valido", e.target.parentElement);
      email[e.target.id] = "";
      comprobarEmail();
      return;
    }
    limpiarAlerta(e.target.parentElement);
    //Asingnar los valores
    email[e.target.id] = e.target.value.trim().toLowerCase();
    // comprobar el email

    comprobarEmail();
  }
  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add(
      "bg-red-600",
      "text-white",
      "text-center",
      "font-bold",
      "uppercase",
      "rounded-lg",
      "p-1"
    );
    //Insertar el error al formulario
    referencia.appendChild(error);
  }
  //Limpia la alerta
  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }
  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }
  function resetFormulario() {
    //reiniciar el objeto
    email.email = "";
    email.asunto = "";
    email.mensaje = "";
    formulario.reset();
    comprobarEmail();
  }
});
