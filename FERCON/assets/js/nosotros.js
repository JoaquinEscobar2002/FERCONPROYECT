/* ==============================
   FERCON - Nosotros (nosotros.js)
   ============================== */

const FERCON_CONFIG = {
  whatsappNumberInternational: "5491127871902",
  whatsappDefaultMessage: "Hola FERCON, quiero conocer más sobre sus servicios y pedir presupuesto.",
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

/* Links dinámicos */
const wa = buildWhatsAppLink(FERCON_CONFIG.whatsappNumberInternational, FERCON_CONFIG.whatsappDefaultMessage);
const whatsHeader = document.getElementById("whatsHeader");
const whatsFooter = document.getElementById("whatsFooter");
const mailFooter = document.getElementById("mailFooter");

if (whatsHeader) whatsHeader.href = wa;
if (whatsFooter) whatsFooter.href = wa;
if (mailFooter) mailFooter.href = `mailto:${FERCON_CONFIG.email}`;

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
