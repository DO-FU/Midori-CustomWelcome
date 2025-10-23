document.addEventListener("DOMContentLoaded", () => {
  // --- Selección de Elementos del DOM ---
  const steps = document.querySelectorAll(".step");
  const buttons = document.querySelectorAll(
    "button[data-step], .btn-secondary, .btn-finish",
  );
  const skipLink = document.querySelector(".skip-setup");
  const importOptions = document.querySelectorAll(".import-option");
  const themeSwitcher = document.querySelector(".theme-switcher");
  const colorDots = document.querySelectorAll(".color-dot");
  const layoutOptions = document.querySelectorAll(
    ".layout-option[data-layout]",
  );
  const feedOptions = document.querySelectorAll(".layout-option[data-feed]");
  const adblockToggle = document.getElementById("adblock-toggle");

  let currentStep = 1;

  // --- Función para Navegar entre Pasos ---
  const showStep = (stepIndex) => {
    steps.forEach((step) => step.classList.remove("active"));
    const nextStep = document.getElementById(`step${stepIndex}`);
    if (nextStep) {
      nextStep.classList.add("active");
      currentStep = stepIndex;
    }
  };

  // --- Lógica de los Botones de Navegación ---
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.step) {
        showStep(parseInt(button.dataset.step));
      } else if (button.classList.contains("btn-finish")) {
        savePreferences();
        showToast("¡Configuración completada! Disfruta tu navegador.");
      }
    });
  });

  // --- Lógica del Botón de Omitir ---
  skipLink.addEventListener("click", (e) => {
    e.preventDefault();
    showToast("Configuración omitida. Usando valores por defecto.");
  });

  // --- Lógica para Opciones de Importación ---
  importOptions.forEach((option) => {
    option.addEventListener("click", () => {
      if (option.classList.contains("active")) {
        option.classList.remove("active");
      } else {
        importOptions.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");
        const sourceName = option.querySelector("span").textContent;
        showToast(`Listo para importar desde ${sourceName}.`);
      }
    });
  });

  // --- Lógica para Selector de Tema ---
  themeSwitcher.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const selectedTheme = e.target.dataset.theme;
      themeSwitcher.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");
      document.body.classList.remove("dark-theme");
      if (selectedTheme === "dark") {
        document.body.classList.add("dark-theme");
      }
      showToast(`Tema cambiado a: ${selectedTheme}`);
    }
  });

  // --- Lógica para Paleta de Colores ---
  colorDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      document.querySelector(".color-dot.active").classList.remove("active");
      dot.classList.add("active");
      document.documentElement.style.setProperty(
        "--color-primary",
        dot.dataset.color,
      );
    });
  });

  // --- Lógica para Selector de Disposición de Pestañas ---
  layoutOptions.forEach((option) => {
    option.addEventListener("click", () => {
      document
        .querySelector(".layout-option[data-layout].active")
        .classList.remove("active");
      option.classList.add("active");
      showToast(`Diseño de pestañas: ${option.dataset.layout}`);
    });
  });

  // --- Lógica para Selector de Feed de Noticias ---
  feedOptions.forEach((option) => {
    option.addEventListener("click", () => {
      document
        .querySelector(".layout-option[data-feed].active")
        .classList.remove("active");
      option.classList.add("active");
      showToast(`Feed de noticias: ${option.dataset.feed}`);
    });
  });

  // --- Lógica para el Adblocker ---
  adblockToggle.addEventListener("change", () => {
    showToast(
      `Bloqueador de anuncios ${adblockToggle.checked ? "activado" : "desactivado"}.`,
    );
  });

  // --- Función para Crear Notificaciones Toast ---
  const showToast = (message) => {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // --- Función para Guardar Preferencias ---
  const savePreferences = () => {
    const activeImportOption = document.querySelector(".import-option.active");
    const preferences = {
      importSource: activeImportOption
        ? activeImportOption.dataset.source
        : "skipped",
      theme: document.querySelector(".theme-switcher .active").dataset.theme,
      accentColor: document.querySelector(".color-dot.active").dataset.color,
      tabLayout: document.querySelector(".layout-option[data-layout].active")
        .dataset.layout,
      feedLayout: document.querySelector(".layout-option[data-feed].active")
        .dataset.feed,
      adblockEnabled: document.getElementById("adblock-toggle").checked,
    };
    console.log("Preferencias guardadas:", preferences);
  };
});
