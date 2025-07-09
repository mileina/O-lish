  const formuleBtn = document.querySelector('[data-choice="formule"]');
  const lavageBtn = document.querySelector('[data-choice="lavage"]');
  const formuleSection = document.querySelector('.pricing-section');
  const lavageSection = document.querySelector('.lavage-section');

  formuleBtn.addEventListener('click', () => {
    formuleBtn.classList.add('active');
    lavageBtn.classList.remove('active');
    formuleSection.style.display = 'block';
    lavageSection.style.display = 'none';
  });

  lavageBtn.addEventListener('click', () => {
    lavageBtn.classList.add('active');
    formuleBtn.classList.remove('active');
    lavageSection.style.display = 'block';
    formuleSection.style.display = 'none';
  });