/*
 * script.js
 * Lógica de interacción para la interfaz de configuración de Midori.
 * Maneja la navegación entre pantallas, selección de opciones y estado del indicador de pasos.
 */

// Estado global de la aplicación
let currentStep = 1; // Paso actual (1, 2, 3 o 4)
const totalSteps = 4; // Número total de pasos

// Elementos del DOM
const screens = document.querySelectorAll(".setup-screen");
const stepDots = document.querySelectorAll(".step-dot");
const nextBtn1 = document.getElementById("nextBtn1");
const nextBtn2 = document.getElementById("nextBtn2");
const continueBtn3 = document.getElementById("continueBtn3");
const finishBtn = document.getElementById("finishBtn");
const diveInBtn = document.getElementById("diveInBtn");
const skipBtn = document.getElementById("skipBtn");
const skipSetupBtn = document.getElementById("skipSetupBtn");

// Elementos de selección
const templateCards = document.querySelectorAll(".template-card");
const designCards = document.querySelectorAll(".design-card");
const themeButtons = document.querySelectorAll(".theme-btn");
const colorOptions = document.querySelectorAll(".color-option");
const favoriteItems = document.querySelectorAll(".favorite-item");
const pinToggles = document.querySelectorAll(".pin-toggle");

// Función para mostrar la pantalla correspondiente al paso actual
function showCurrentScreen() {
  // Ocultar todas las pantallas
  screens.forEach((screen) => screen.classList.remove("active"));

  // Mostrar solo la pantalla del paso actual
  const currentScreen = document.getElementById(`screen${currentStep}`);
  if (currentScreen) {
    currentScreen.classList.add("active");
  }

  // Actualizar el indicador de pasos
  updateStepIndicator();

  // Actualizar visibilidad de botones según el paso
  updateNavigationButtons();
}

// Función para actualizar el indicador de pasos horizontal
function updateStepIndicator() {
  stepDots.forEach((dot, index) => {
    dot.classList.remove("active", "completed");

    if (index + 1 === currentStep) {
      dot.classList.add("active");
    } else if (index + 1 < currentStep) {
      dot.classList.add("completed");
    }
  });
}

// Función para actualizar la visibilidad de los botones de navegación
function updateNavigationButtons() {
  // Botón "Siguiente" en pantalla 1 y 2
  nextBtn1.style.display = currentStep === 1 ? "block" : "none";
  nextBtn2.style.display = currentStep === 2 ? "block" : "none";
  // Botón "Continuar" en pantalla 3
  continueBtn3.style.display = currentStep === 3 ? "block" : "none";
  // Botón "Finalizar" en pantalla 4
  finishBtn.style.display = currentStep === 4 ? "block" : "none";

  // Botones finales en el footer
  diveInBtn.style.display = currentStep === 4 ? "inline-block" : "none";
  skipBtn.style.display = currentStep === 4 ? "inline-block" : "none";

  // Botón "Omitir configuración" en pantalla 1
  skipSetupBtn.style.display = currentStep === 1 ? "block" : "none";
}

// Función para manejar el avance al siguiente paso
function goToNextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    showCurrentScreen();
  }
}

// Función para manejar el retroceso al paso anterior
function goToPreviousStep() {
  if (currentStep > 1) {
    currentStep--;
    showCurrentScreen();
  }
}

// Función para manejar la selección de una plantilla
function handleTemplateSelection(selectedCard) {
  // Quitar la clase 'selected' de todas las tarjetas
  templateCards.forEach((card) => card.classList.remove("selected"));

  // Añadir la clase 'selected' a la tarjeta seleccionada
  selectedCard.classList.add("selected");

  // Aquí podrías guardar la selección en una variable o enviarla a un backend
  console.log(`Plantilla seleccionada: ${selectedCard.dataset.template}`);
}

// Función para manejar la selección de un diseño
function handleDesignSelection(selectedCard) {
  // Quitar la clase 'selected' de todas las tarjetas
  designCards.forEach((card) => card.classList.remove("selected"));

  // Añadir la clase 'selected' a la tarjeta seleccionada
  selectedCard.classList.add("selected");

  // Aquí podrías guardar la selección en una variable o enviarla a un backend
  console.log(`Diseño seleccionado: ${selectedCard.dataset.design}`);
}

// Función para manejar la selección de un tema
function handleThemeSelection(selectedButton) {
  // Quitar la clase 'active' de todos los botones
  themeButtons.forEach((button) => button.classList.remove("active"));

  // Añadir la clase 'active' al botón seleccionado
  selectedButton.classList.add("active");

  // Aquí podrías aplicar el tema al navegador (por ejemplo, cambiar clases en el body)
  console.log(`Tema seleccionado: ${selectedButton.dataset.theme}`);
}

// Función para manejar la selección de un color
function handleColorSelection(selectedOption) {
  // Quitar la clase 'selected' de todas las opciones
  colorOptions.forEach((option) => option.classList.remove("selected"));

  // Añadir la clase 'selected' a la opción seleccionada
  selectedOption.classList.add("selected");

  // Aquí podrías aplicar el color al navegador (por ejemplo, cambiar una variable CSS)
  console.log(`Color seleccionado: ${selectedOption.dataset.color}`);
}

// Función para manejar el pin de un sitio favorito
function togglePin(siteItem) {
  const pinToggle = siteItem.querySelector(".pin-toggle");
  pinToggle.classList.toggle("pinned");

  // Alternar entre ○ y ● (o simplemente cambiar el estado visual)
  if (pinToggle.classList.contains("pinned")) {
    pinToggle.textContent = "●";
  } else {
    pinToggle.textContent = "○";
  }

  // Aquí podrías guardar la selección en una variable o enviarla a un backend
  console.log(
    `Sitio ${siteItem.dataset.site} ${pinToggle.classList.contains("pinned") ? "pinneado" : "despinneado"}`,
  );
}

// Event Listener para el botón "Siguiente" en la pantalla 1
nextBtn1.addEventListener("click", () => {
  // Validar que se haya seleccionado una plantilla (opcional)
  const selectedTemplate = Array.from(templateCards).find((card) =>
    card.classList.contains("selected"),
  );
  if (selectedTemplate) {
    goToNextStep();
  } else {
    alert("Por favor, selecciona una plantilla antes de continuar.");
  }
});

// Event Listener para el botón "Siguiente" en la pantalla 2
nextBtn2.addEventListener("click", () => {
  // Validar que se haya seleccionado un diseño (opcional)
  const selectedDesign = Array.from(designCards).find((card) =>
    card.classList.contains("selected"),
  );
  if (selectedDesign) {
    goToNextStep();
  } else {
    alert("Por favor, selecciona un diseño antes de continuar.");
  }
});

// Event Listener para el botón "Continuar" en la pantalla 3
continueBtn3.addEventListener("click", () => {
  // Validar que se haya seleccionado un tema y un color (opcional)
  const selectedTheme = Array.from(themeButtons).find((button) =>
    button.classList.contains("active"),
  );
  const selectedColor = Array.from(colorOptions).find((option) =>
    option.classList.contains("selected"),
  );

  if (selectedTheme && selectedColor) {
    goToNextStep();
  } else {
    alert("Por favor, selecciona un tema y un color antes de continuar.");
  }
});

// Event Listener para el botón "Finalizar" en la pantalla 4
finishBtn.addEventListener("click", () => {
  // Aquí podrías guardar todas las configuraciones y redirigir al usuario
  alert("¡Configuración completada! Tus preferencias han sido guardadas.");
  // Redirigir a la página de inicio o a la aplicación principal
  // window.location.href = '/home';
});

// Event Listener para el botón "¿Listo para sumergirte?"
diveInBtn.addEventListener("click", () => {
  alert(
    "¡Bienvenido a Midori! Disfruta de tu nueva experiencia de navegación.",
  );
  // Redirigir a la página de inicio o a la aplicación principal
  // window.location.href = '/home';
});

// Event Listener para el botón "Omitir para empezar a navegar"
skipBtn.addEventListener("click", () => {
  alert(
    "Has omitido la configuración. Puedes personalizar tu navegador más tarde desde las preferencias.",
  );
  // Redirigir a la página de inicio o a la aplicación principal
  // window.location.href = '/home';
});

// Event Listener para el botón "Omitir configuración" en la pantalla 1
skipSetupBtn.addEventListener("click", () => {
  // Saltar directamente a la última pantalla
  currentStep = 4;
  showCurrentScreen();
});

// Event Listeners para la selección de plantillas
templateCards.forEach((card) => {
  card.addEventListener("click", () => {
    handleTemplateSelection(card);
  });
});

// Event Listeners para la selección de diseños
designCards.forEach((card) => {
  card.addEventListener("click", () => {
    handleDesignSelection(card);
  });
});

// Event Listeners para la selección de temas
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleThemeSelection(button);
  });
});

// Event Listeners para la selección de colores
colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    handleColorSelection(option);
  });
});

// Event Listeners para el pin de sitios favoritos
favoriteItems.forEach((item) => {
  item.addEventListener("click", () => {
    togglePin(item);
  });
});

// Event Listeners para los indicadores de paso horizontal
stepDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const stepNumber = parseInt(dot.dataset.step);
    if (stepNumber <= currentStep) {
      currentStep = stepNumber;
      showCurrentScreen();
    }
  });
});

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", () => {
  showCurrentScreen(); // Mostrar la primera pantalla al cargar

  // Añadir efecto de hover a los indicadores de paso
  stepDots.forEach((dot) => {
    dot.addEventListener("mouseenter", () => {
      if (
        !dot.classList.contains("active") &&
        !dot.classList.contains("completed")
      ) {
        dot.style.backgroundColor = "#999";
      }
    });

    dot.addEventListener("mouseleave", () => {
      if (
        !dot.classList.contains("active") &&
        !dot.classList.contains("completed")
      ) {
        dot.style.backgroundColor = "#ccc";
      }
    });
  });
});
