// variables
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

// Inicializar
const btnEnviar = document.querySelector("#enviar");
const formularioEnviar = document.querySelector("#enviar-mail");
const resetBtn = document.querySelector("#resetBtn");

// validacion de email con expresiones regulares
const er =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// event Listener

eventListeners();

function eventListeners() {
  // Inicio de la aplicación y deshabilitar submit
  document.addEventListener("DOMContentLoaded", inicioApp);

  // Campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  // Boton de enviar en el submit
  formularioEnviar.addEventListener("submit", enviarEmail);

  // Boton de reset
  resetBtn.addEventListener("click", resetFormulario);
}

// funciones
function inicioApp() {
  // deshabilitar el envio
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

// Valida que el campo tengo algo escrito

function validarFormulario(e) {
  if (e.target.value.length > 0) {
    const error = document.querySelector(".error");
    if (error) {
      error.remove();
    }
    e.target.classList.remove("border-red-500");
    e.target.classList.add("border-green-500");
  } else {
    e.target.classList.add("border-red-500");
    e.target.classList.remove("border-green-500");

    mostrarError("Todos los campos son obligatorios");
  }
  // Validar unicamente el email
  if (e.target.type == "email") {
    if (er.test(e.target.value)) {
      //elimina errores...
      const error = document.querySelector(".error");
      if (error) {
        error.remove();
      }
      e.target.classList.remove("border-red-500");
      e.target.classList.add("border-green-500");
    } else {
      e.target.classList.add("border-red-500");
      e.target.classList.remove("border-green-500");
      mostrarError("El email no es valido");
    }
  }
  if (
    er.test(email.value) &&
    asunto.value.length > 0 &&
    mensaje.value.length > 0
  ) {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

// Resetear el formulario
function resetFormulario(e) {
  formularioEnviar.reset();
  btnEnviar.disabled = true;
  btnEnviar.classList.add("opacity-50");
  e.target.classList.remove("border-green-500");
  e.target.classList.remove("green");
  e.preventDefault();
}

// Cuando se envia el correo
function enviarEmail(e) {
  e.preventDefault();

  // Spinner al presionar Enviar
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  // Gif que envia email
  const enviado = document.createElement("p");
  enviado.textContent = "Mensaje Enviado Correctamente";
  enviado.classList.add("text-center", "text-white", "bg-green-500");

  // Ocultar Spinner y mostrar gif de enviado
  setTimeout(() => {
    spinner.style.display = "none";

    document.querySelector("#header").appendChild(enviado);

    setTimeout(() => {
      enviado.remove();
      formularioEnviar.reset();
    }, 5000);
  }, 3000);
}

function validarEmail(campo) {
  const mensaje = campo.value;

  if (re.test(mensaje.toLowerCase())) {
    campo.style.borderBottomColor = "green";
    campo.classList.remove(".error");
  } else {
    campo.style.borderBottomColor = "red";
    campo.classList.add(".error");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border-red-500",
    "text-red-500",
    "background-color-100",
    "text-xs",
    "px-4",
    "py-2",
    "mt-3",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formularioEnviar.appendChild(mensajeError);
  }
}
