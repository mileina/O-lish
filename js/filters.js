// Boutons de filtre
const filterButtons = document.querySelectorAll(".blog-filters button");
const blogCards = document.querySelectorAll(".blog-card");
const searchInput = document.getElementById("search-input");

// Filtres par catégorie
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedCategory = button.getAttribute("data-category");

    blogCards.forEach((card) => {
      const badge = card.querySelector(".blog-badge");
      const classList = badge.classList;

      if (selectedCategory === "all") {
        card.style.display = "flex";
      } else {
        const categoryMatch = [...classList].some(cls =>
          cls.includes("categorie-") && cls.includes(selectedCategory)
        );
        card.style.display = categoryMatch ? "flex" : "none";
      }
    });

    searchInput.value = "";
  });
});

// Recherche par mot-clé dans les titres
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  blogCards.forEach((card) => {
    const title = card.querySelector(".blog-title").textContent.toLowerCase();
    const match = title.includes(searchValue);
    card.style.display = match ? "flex" : "none";
  });

  filterButtons.forEach(btn => btn.classList.remove("active"));
});

// MODAL : affichage d’un article en grand
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("article-modal");
  const modalContent = document.querySelector(".modal-body");
  const closeModal = document.querySelector(".modal-close");

  document.querySelectorAll(".blog-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const card = this.closest(".blog-card");
      const img = card.querySelector("img").src;
      const title = card.querySelector(".blog-title").innerText;
      const date = card.querySelector(".blog-date").innerText;
      const badge = card.querySelector(".blog-badge").innerText;

      modalContent.innerHTML = `
        <h2>${title}</h2>
        <p><strong>${badge}</strong> - ${date}</p>
        <img src="${img}" alt="Image Article">
        <p style="margin-top:15px;">Contenu de l'article ici... (à personnaliser)</p>
      `;

      modal.style.display = "flex";
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

const articlesPerPage = 6;
let currentPage = 1;

function showPage(page) {
  currentPage = page;
  const start = (page - 1) * articlesPerPage;
  const end = start + articlesPerPage;

  blogCards.forEach((card, index) => {
    card.style.display = index >= start && index < end ? "flex" : "none";
  });

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(blogCards.length / articlesPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.toggle("active", i === currentPage);
    btn.addEventListener("click", () => showPage(i));
    paginationContainer.appendChild(btn);
  }
}

// Réaffiche la bonne page après un filtre
function resetPaginationAfterFilter() {
  const visibleCards = [...blogCards].filter(card => card.style.display !== "none");
  blogCards.forEach(card => card.style.display = "none");
  visibleCards.slice(0, articlesPerPage).forEach(card => card.style.display = "flex");
  currentPage = 1;
  const totalPages = Math.ceil(visibleCards.length / articlesPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === 1) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      blogCards.forEach(card => card.style.display = "none");
      visibleCards.slice((i - 1) * articlesPerPage, i * articlesPerPage).forEach(card => card.style.display = "flex");
      updatePagination();
    });
    paginationContainer.appendChild(btn);
  }
}

// Modifie l’événement existant des filtres pour intégrer la pagination
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedCategory = button.getAttribute("data-category");

    blogCards.forEach((card) => {
      const badge = card.querySelector(".blog-badge");
      const classList = badge.classList;
      const match = selectedCategory === "all" || [...classList].some(cls =>
        cls.includes("categorie-") && cls.includes(selectedCategory)
      );
      card.style.display = match ? "flex" : "none";
    });

    searchInput.value = "";
    resetPaginationAfterFilter();
  });
});

// Modifie l’événement du champ de recherche pour intégrer la pagination
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  blogCards.forEach((card) => {
    const title = card.querySelector(".blog-title").textContent.toLowerCase();
    const match = title.includes(searchValue);
    card.style.display = match ? "flex" : "none";
  });

  filterButtons.forEach(btn => btn.classList.remove("active"));
  resetPaginationAfterFilter();
});

// Au chargement initial
showPage(1);
