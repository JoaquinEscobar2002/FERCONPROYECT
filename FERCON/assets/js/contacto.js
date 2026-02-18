/* ==============================
   FERCON - Contacto (contacto.js)
   ============================== */

const FERCON_CONFIG = {
  whatsappNumberInternational: "5491127871902",
  whatsappDefaultMessage: "Hola FERCON, quiero pedir un presupuesto.",
  emailTo: "contacto@fercon.com",
  instagramUrl: "https://instagram.com/",
  facebookUrl: "https://facebook.com/",
  tiktokUrl: "https://tiktok.com/"
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

/* Links de WhatsApp / Redes */
const waDefault = buildWhatsAppLink(FERCON_CONFIG.whatsappNumberInternational, FERCON_CONFIG.whatsappDefaultMessage);
const whatsHeader = document.getElementById("whatsHeader");
const whatsAside = document.getElementById("whatsAside");
if (whatsHeader) whatsHeader.href = waDefault;
if (whatsAside) whatsAside.href = waDefault;

const igLink = document.getElementById("igLink");
const fbLink = document.getElementById("fbLink");
const ttLink = document.getElementById("ttLink");
if (igLink) igLink.href = FERCON_CONFIG.instagramUrl;
if (fbLink) fbLink.href = FERCON_CONFIG.facebookUrl;
if (ttLink) ttLink.href = FERCON_CONFIG.tiktokUrl;

const mailFooter = document.getElementById("mailFooter");
if (mailFooter) mailFooter.href = `mailto:${FERCON_CONFIG.emailTo}`;

/* Año */
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

/* Form: validación simple + mailto + WA */
const form = document.getElementById("contactForm");
const waFromForm = document.getElementById("waFromForm");

function setError(fieldName, message) {
  const el = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (el) el.textContent = message || "";
}

function validate(fields) {
  let ok = true;

  if (!fields.name.trim()) { setError("name", "Ingresá tu nombre."); ok = false; }
  else setError("name", "");

  if (!fields.phone.trim()) { setError("phone", "Ingresá un teléfono."); ok = false; }
  else setError("phone", "");

  if (!fields.service.trim()) { setError("service", "Elegí un servicio."); ok = false; }
  else setError("service", "");

  if (!fields.message.trim()) { setError("message", "Contanos un poco más sobre lo que necesitás."); ok = false; }
  else setError("message", "");

  return ok;
}

function buildMessage(fields) {
  return `Solicitud de presupuesto - FERCON

Nombre: ${fields.name}
Teléfono: ${fields.phone}
Servicio: ${fields.service}

Mensaje:
${fields.message}
`;
}

/* Actualiza el botón de WhatsApp mientras escriben */
function updateWhatsAppButton(fields) {
  const text = `Hola FERCON, soy ${fields.name || "..."}. Mi teléfono es ${fields.phone || "..."}. 
Servicio: ${fields.service || "..."}.
Mensaje: ${fields.message || "..."}`;

  const link = buildWhatsAppLink(FERCON_CONFIG.whatsappNumberInternational, text);
  if (waFromForm) waFromForm.href = link;
}

if (form) {
  const fields = {
    name: form.querySelector("#name"),
    phone: form.querySelector("#phone"),
    service: form.querySelector("#service"),
    message: form.querySelector("#message")
  };

  const readFields = () => ({
    name: fields.name.value,
    phone: fields.phone.value,
    service: fields.service.value,
    message: fields.message.value
  });

  ["input", "change"].forEach(evt => {
    form.addEventListener(evt, () => updateWhatsAppButton(readFields()));
  });

  updateWhatsAppButton(readFields());

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const values = readFields();
    if (!validate(values)) return;

    // mailto (sin backend): abre tu app de correo para enviar
    const subject = encodeURIComponent("Consulta desde la web - FERCON");
    const body = encodeURIComponent(buildMessage(values));
    const mailto = `mailto:${FERCON_CONFIG.emailTo}?subject=${subject}&body=${body}`;

    window.location.href = mailto;
  });
}
