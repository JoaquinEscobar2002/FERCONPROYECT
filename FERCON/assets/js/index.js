/* ===========================
   FERCON - Inicio (index.js)
   =========================== */

/**
 * ✅ Editá estos datos una sola vez
 * y se actualizan en header/footer:
 */
const FERCON_CONFIG = {
  whatsappNumberInternational: "5491127871902", // <-- cambiá por tu número (formato internacional sin +)
  whatsappDefaultMessage: "Hola FERCON, quiero pedir un presupuesto. ¿Me cuentan cómo trabajan?",
  email: "contacto@fercon.com", // <-- cambiá por tu email real
  instagramUrl: "https://instagram.com/",
  facebookUrl: "https://facebook.com/",
  tiktokUrl: "https://tiktok.com/",
  mapsUrl: "https://www.google.com/maps"
};

function buildWhatsAppLink(number, message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
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

/* Links dinámicos */
const whatsHeader = document.getElementById("whatsHeader");
const whatsFooter = document.getElementById("whatsFooter");
const mailFooter = document.getElementById("mailFooter");
const mapsFooter = document.getElementById("mapsFooter");

const igLink = document.getElementById("igLink");
const fbLink = document.getElementById("fbLink");
const ttLink = document.getElementById("ttLink");

const waLink = buildWhatsAppLink(
  FERCON_CONFIG.whatsappNumberInternational,
  FERCON_CONFIG.whatsappDefaultMessage
);

if (whatsHeader) whatsHeader.href = waLink;
if (whatsFooter) whatsFooter.href = waLink;

if (mailFooter) mailFooter.href = `mailto:${FERCON_CONFIG.email}`;
if (mapsFooter) mapsFooter.href = FERCON_CONFIG.mapsUrl;

if (igLink) igLink.href = FERCON_CONFIG.instagramUrl;
if (fbLink) fbLink.href = FERCON_CONFIG.facebookUrl;
if (ttLink) ttLink.href = FERCON_CONFIG.tiktokUrl;

/* Año automático en footer */
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
