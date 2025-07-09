// BOUTONS
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");
const confirmLogin = document.getElementById("confirmLogin");

const sections = document.querySelectorAll(".content-section");
const menuLinks = document.querySelectorAll(".menu-link");

// Gestion de navigation dans les onglets
menuLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    menuLinks.forEach(btn => btn.classList.remove("active"));
    link.classList.add("active");

    const sectionId = link.getAttribute("data-section");

    sections.forEach(section => {
      section.classList.toggle("active", section.id === sectionId);
    });
  });
});

// Affichage modal connexion
loginBtn.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
});

// Fermeture croix
closeLogin.addEventListener("click", () => {
  loginModal.classList.add("hidden");
});

// Simule une connexion
confirmLogin.addEventListener("click", () => {
  loginModal.classList.add("hidden");
  loginBtn.classList.add("hidden");
  logoutBtn.classList.remove("hidden");
});

// Déconnexion
logoutBtn.addEventListener("click", () => {
  loginBtn.classList.remove("hidden");
  logoutBtn.classList.add("hidden");
});
