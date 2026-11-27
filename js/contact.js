const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-msg");

const validators = {
  name: (value) => {
    if (!value) return "El nombre es obligatorio.";
    if (value.length < 2) return "El nombre debe tener al menos 2 caracteres.";
    return "";
  },
  email: (value) => {
    if (!value) return "El correo es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Introduce un correo válido.";
    return "";
  },
  message: (value) => {
    if (!value) return "El mensaje es obligatorio.";
    if (value.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
    return "";
  },
};

function showError(field, message) {
  const input = form.elements[field];
  const errorEl = form.querySelector(`.error-msg[data-for="${field}"]`);
  errorEl.textContent = message;
  errorEl.classList.toggle("hidden", !message);
  input.classList.toggle("input-error", Boolean(message));
}

function validateField(field) {
  const error = validators[field](form.elements[field].value.trim());
  showError(field, error);
  return !error;
}

Object.keys(validators).forEach((field) => {
  form.elements[field].addEventListener("input", () => validateField(field));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMsg.classList.add("hidden");

  const results = Object.keys(validators).map(validateField);
  if (results.every(Boolean)) {
    successMsg.textContent = "¡Gracias! Tu mensaje ha sido enviado.";
    successMsg.classList.remove("hidden");
    form.reset();
  }
});
