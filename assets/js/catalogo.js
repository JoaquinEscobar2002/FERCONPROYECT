/* ==============================
   FERCON - Catálogo (catalogo.js)
   ============================== */

/**
 * ✅ CONFIG: editá tus links una vez
 */
const FERCON_CONFIG = {
  whatsappNumberInternational: "5491127871902", // cambiá por tu número
  whatsappDefaultMessage: "Hola FERCON, vi un proyecto en el catálogo y quiero cotizar.",
  email: "contacto@fercon.com"
};

function buildWhatsAppLink(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/* Menú mobile */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

/* Links dinámicos (header/footer) */
const wa = buildWhatsAppLink(FERCON_CONFIG.whatsappNumberInternational, FERCON_CONFIG.whatsappDefaultMessage);
const whatsHeader = document.getElementById("whatsHeader");
const whatsFooter = document.getElementById("whatsFooter");
const mailFooter = document.getElementById("mailFooter");
if (whatsHeader) whatsHeader.href = wa;
if (whatsFooter) whatsFooter.href = wa;
if (mailFooter) mailFooter.href = `mailto:${FERCON_CONFIG.email}`;
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

/**
 * ✅ DATA: acá cargás tus proyectos.
 * - id: único
 * - title: nombre visible
 * - location/desc: texto
 * - services: array con etiquetas (construccion, herreria, carpinteria, electrica, plomeria)
 * - images: rutas a tus imágenes
 */
const PROJECTS = [
  {
    id: "p1",
    title: "Casa Moderna • 2 plantas",
    location: "Residencial • 240m²",
    desc: "Proyecto integral: planos, obra y terminaciones.",
    services: ["construccion", "electrica", "plomeria", "carpinteria"],
    images: ["assets/img/proyecto1-1.jpg", "assets/img/proyecto1-2.jpg","assets/img/proyecto1-3.jpg","assets/img/proyecto1-4.jpg"]
  },
  {
    id: "p2",
    title: "Edificio • Desarrollo completo",
    location: "Urbano • 6 unidades",
    desc: "Gestión integral: coordinación de contratistas y ejecución.",
    services: ["construccion", "electrica", "plomeria"],
    images: ["assets/img/proyecto2-1.jpg", "assets/img/proyecto2-2.jpg"]
  },
  {
    id: "p3",
    title: "Portón y rejas • Herrería",
    location: "A medida",
    desc: "Fabricación e instalación de estructura metálica.",
    services: ["herreria"],
    images: ["assets/img/proyecto1-1.jpg", "assets/img/proyecto1-2.jpg"]
  }
];

/* DOM */
const projectsGrid = document.getElementById("projectsGrid");
const chips = document.querySelectorAll(".chip");
const searchInput = document.getElementById("searchInput");

let activeFilter = "todos";
let activeSearch = "";

/* Lee filtro desde URL: catalogo.html?servicio=construccion */
function readFilterFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const servicio = params.get("servicio");
  if (!servicio) return;

  const allowed = new Set(["construccion", "herreria", "carpinteria", "electrica", "plomeria"]);
  if (allowed.has(servicio)) {
    activeFilter = servicio;
    // marcar chip
    chips.forEach(chip => {
      chip.classList.toggle("is-active", chip.dataset.filter === servicio);
    });
  }
}

function matchesFilter(project) {
  if (activeFilter === "todos") return true;
  return project.services.includes(activeFilter);
}

function matchesSearch(project) {
  if (!activeSearch) return true;
  const hay = (project.title + " " + project.location + " " + project.desc).toLowerCase();
  return hay.includes(activeSearch);
}

function serviceLabel(service) {
  const map = {
    construccion: "Construcción",
    herreria: "Herrería",
    carpinteria: "Carpintería",
    electrica: "Eléctrica",
    plomeria: "Plomería"
  };
  return map[service] || service;
}

function renderProjects() {
  if (!projectsGrid) return;

  const filtered = PROJECTS
    .filter(matchesFilter)
    .filter(matchesSearch);

  if (filtered.length === 0) {
    projectsGrid.innerHTML = `
      <div style="padding:14px; border:1px solid rgba(0,0,0,.12); border-radius:16px;">
        No se encontraron proyectos con esos filtros.
      </div>
    `;
    return;
  }

  projectsGrid.innerHTML = filtered.map(project => {
    const badgeHtml = project.services
      .map(s => `<span class="badge">${serviceLabel(s)}</span>`)
      .join("");

    // ✅ 1) Preview: 1 o 2 imágenes antes de expandir
    const previewImages = (project.images || []).slice(0, 2);
    const previewHtml = previewImages.length
      ? previewImages.map((src, idx) => `
          <img class="preview__img" src="${src}" alt="${project.title} (preview ${idx + 1})" loading="lazy">
        `).join("")
      : `<div class="preview__placeholder">Sin imágenes</div>`;

    // ✅ 2) Imágenes restantes (para mostrar al expandir)
    const remainingImages = (project.images || []).slice(2);
    const galleryHtml = remainingImages.length
      ? remainingImages.map(src => `<img src="${src}" alt="${project.title}" loading="lazy">`).join("")
      : `<p class="muted">No hay más imágenes para mostrar en este proyecto.</p>`;

    const message = `Hola FERCON, me interesa el proyecto "${project.title}". ¿Me pasan presupuesto/tiempos?`;
    const waLink = buildWhatsAppLink(FERCON_CONFIG.whatsappNumberInternational, message);

    return `
  <details class="project">
    <summary>
      <div class="summary__left">
        <h3 class="project__title">${project.title}</h3>
        <p class="project__meta">${project.location || ""}</p>

        <div class="badges">
          ${badgeHtml}
        </div>

        <!-- ✅ Preview debajo de las etiquetas -->
        <div class="preview" aria-hidden="true">
          ${previewHtml}
        </div>
      </div>

      <span class="summary__icon" aria-hidden="true">＋</span>
    </summary>

    <div class="project__body">
      <p>${project.desc || ""}</p>

      <div class="gallery">
        ${galleryHtml}
      </div>

      <div class="project__actions">
        <a class="btn btn--primary" href="${waLink}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
        <a class="btn btn--ghost" href="contacto.html">Ir a contacto</a>
      </div>
    </div>
  </details>
`;
  }).join("");
}


/* Eventos chips */
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    activeFilter = chip.dataset.filter;

    chips.forEach(c => c.classList.toggle("is-active", c === chip));
    renderProjects();

    // Actualiza la URL sin recargar (mejor UX)
    const url = new URL(window.location.href);
    if (activeFilter === "todos") url.searchParams.delete("servicio");
    else url.searchParams.set("servicio", activeFilter);
    window.history.replaceState({}, "", url);
  });
});

/* Búsqueda */
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    activeSearch = e.target.value.trim().toLowerCase();
    renderProjects();
  });
}

/* Init */
readFilterFromUrl();
renderProjects();
