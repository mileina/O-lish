// js/realisation.js
document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     SÉLECTEURS & ÉTAT
  ------------------------------------------------------------------ */
  const cardsSection = document.querySelector('.realisation-section'); // <—
  const filterBtns   = [...document.querySelectorAll('.filter-btn')];
  const serviceSelect= document.getElementById('filter-select');
  const prevBtn      = document.querySelector('.page-btn.prev');
  const nextBtn      = document.querySelector('.page-btn.next');
  const pageInfo     = document.querySelector('.page-numbers');
  const paginWrap    = document.querySelector('.pagination');

  const PER_PAGE  = 4;
  let currentCat  = 'all';
  let currentServ = '';
  let currentPage = 1;

  /* ------------------------------------------------------------------
     HELPERS
  ------------------------------------------------------------------ */
  const allCards = () => [...cardsSection.querySelectorAll('.realisation-card')]; // <—

  const matchCard = (card) => {
    const catOK  = currentCat === 'all' || card.classList.contains(currentCat);
    const servOK = !currentServ       || card.classList.contains(currentServ);
    return catOK && servOK;
  };

  const filteredCards = () => allCards().filter(matchCard);
  const totalPages    = () => Math.ceil(filteredCards().length / PER_PAGE) || 1;

  /* ------------------------------------------------------------------
     RENDER
  ------------------------------------------------------------------ */
  const render = (scrollTop = false) => {
    const cards = filteredCards();
    currentPage = Math.min(currentPage, totalPages());

    allCards().forEach(c => (c.style.display = 'none'));
    cards.forEach((c, i) => {
      const inPage = i >= (currentPage - 1) * PER_PAGE && i < currentPage * PER_PAGE;
      if (inPage) c.style.display = 'flex';
    });

    /* Pagination */
    const max = totalPages();
    paginWrap.style.display = max > 1 ? 'flex' : 'none';
    pageInfo.textContent    = `Page ${currentPage} / ${max}`;
    prevBtn.disabled        = currentPage === 1;
    nextBtn.disabled        = currentPage === max;

    if (scrollTop) {
      cardsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* ------------------------------------------------------------------
     FILTRES
  ------------------------------------------------------------------ */
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCat  = btn.dataset.filter || 'all';
    currentPage = 1;
    render(true);                      
  }));
  serviceSelect.addEventListener('change', () => {
    currentServ = serviceSelect.value.trim();
    currentPage = 1;
    render(true);                   
  });

  /* ------------------------------------------------------------------
     PAGINATION
  ------------------------------------------------------------------ */
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      render(true);                     // scroll vers le haut
    }
  });
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages()) {
      currentPage++;
      render(true);                     // scroll vers le haut
    }
  });

  render(); // première exécution (sans scroll)

 /* ------------------------------------------------------------------
   MODAL
------------------------------------------------------------------ */

const modal = document.createElement('div');
modal.className = 'article-modal';
modal.innerHTML = `
  <div class="article-modal__dialog">
    <button class="article-modal__close" aria-label="Fermer">&times;</button>
    <div class="article-modal__body"></div>
  </div>`;
document.body.appendChild(modal);

const modalBody = modal.querySelector('.article-modal__body');
const closeBtn = modal.querySelector('.article-modal__close');

const closeModal = () => {
  modal.classList.remove('is-open');
  document.documentElement.style.overflow = '';
  modalBody.innerHTML = '';
};
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.realisation-btn');
  if (!btn) return;
  e.preventDefault();
  const card = btn.closest('.realisation-card');
  if (card) openModal(card);
});

const openModal = (card) => {
  modalBody.innerHTML = '';

  // Vérifie s'il y a un iframe (vidéo YouTube ou TikTok)
  const iframe = card.querySelector('.realisation-media iframe');
  if (iframe) {
    const iframeClone = iframe.cloneNode(true);
    iframeClone.style.width = '100%';
    iframeClone.style.maxHeight = '70vh';
    iframeClone.style.display = 'block';
    iframeClone.style.marginBottom = '20px';
    modalBody.appendChild(iframeClone);
  }

  // Sinon, gère les images (carrousel)
  const images = card.querySelectorAll('.realisation-media img');
  if (images.length > 0) {
    let currentIndex = 0;

    const container = document.createElement('div');
    container.className = 'carousel-container';
    container.style.position = 'relative';

    const imgElement = document.createElement('img');
    imgElement.src = images[currentIndex].src;
    imgElement.alt = images[currentIndex].alt;
    imgElement.style.width = '100%';
    imgElement.style.display = 'block';

    const leftArrow = document.createElement('button');
    leftArrow.innerHTML = '&#10094;';
    leftArrow.className = 'carousel-arrow left';
    Object.assign(leftArrow.style, {
      position: 'absolute',
      top: '50%',
      left: '10px',
      transform: 'translateY(-50%)',
      fontSize: '2rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#000',
      zIndex: 1
    });

    const rightArrow = document.createElement('button');
    rightArrow.innerHTML = '&#10095;';
    rightArrow.className = 'carousel-arrow right';
    Object.assign(rightArrow.style, {
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      fontSize: '2rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#000',
      zIndex: 1
    });

    leftArrow.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      imgElement.src = images[currentIndex].src;
      imgElement.alt = images[currentIndex].alt;
    });

    rightArrow.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex].src;
      imgElement.alt = images[currentIndex].alt;
    });

    container.appendChild(imgElement);
    if (images.length > 1) {
      container.appendChild(leftArrow);
      container.appendChild(rightArrow);
    }

    modalBody.appendChild(container);
  }

  // Infos textuelles (titre + catégorie)
  const content = card.querySelector('.realisation-content');
  if (content) {
    const cloneContent = content.cloneNode(true);
    cloneContent.querySelector('.realisation-btn')?.remove();
    modalBody.appendChild(cloneContent);
  }

  // Texte caché
  const description = card.querySelector('.realisation-article-text');
  if (description) {
    const textClone = description.cloneNode(true);
    textClone.style.display = 'block';
    textClone.style.marginTop = '1rem';
    modalBody.appendChild(textClone);
  }

  modal.classList.add('is-open');
  document.documentElement.style.overflow = 'hidden';
};

});
