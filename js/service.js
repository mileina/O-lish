 const vehicleCards = document.querySelectorAll('.vehicle-card');
  const choiceSection = document.querySelector('.formule-lavage-choice');
  const choiceButtons = document.querySelectorAll('.choice-btn');
  const pricingFormule = document.querySelector('.pricing-section');
  const pricingLavage = document.querySelector('.lavage-section');
  const prestationSection = document.querySelector('.prestations-section');
  const resumeSection = document.querySelector('.resume-section');
  const resumeVehicule = document.getElementById('resume-vehicule');
  const resumeLavage = document.getElementById('resume-lavage');
  const resumePrestations = document.getElementById('resume-prestations');
  const resumeTotal = document.getElementById('resume-total');
  const prestationsCheckboxes = document.querySelectorAll('.prestations-list input[type="checkbox"]');
  const suivantBtn = document.querySelector('.btn-wrapper .btn-reserver');

  let selectedVehicle = null;
  let selectedLavage = null;
  let lavagePrice = 0;

  prestationSection.style.display = 'none';
  resumeSection.style.display = 'none';

  vehicleCards.forEach(card => {
    card.addEventListener('click', () => {
      vehicleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedVehicle = card.querySelector('p').innerText.split('\n')[0].trim();
      choiceSection.style.display = 'block';
      choiceButtons.forEach(b => b.classList.remove('active'));
      pricingFormule.style.display = 'none';
      pricingLavage.style.display = 'none';
      prestationSection.style.display = 'none';
      resumeSection.style.display = 'none';
      choiceSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  choiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = btn.classList.contains('active');
      const choice = btn.dataset.choice;

      choiceButtons.forEach(b => b.classList.remove('active'));
      pricingFormule.style.display = 'none';
      pricingLavage.style.display = 'none';
      prestationSection.style.display = 'none';
      resumeSection.style.display = 'none';

      if (!isActive) {
        btn.classList.add('active');
        if (choice === 'formule') {
          pricingFormule.style.display = 'block';
          pricingFormule.scrollIntoView({ behavior: 'smooth' });
        } else {
          pricingLavage.style.display = 'block';
          pricingLavage.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  function updateResume() {
    resumeVehicule.textContent = selectedVehicle || '-';
    resumeLavage.textContent = selectedLavage ? `${selectedLavage} - ${lavagePrice.toFixed(2)}€` : '-';

    const selectedOptions = Array.from(prestationsCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => {
        const label = cb.parentElement.innerText.trim();
        return { label: label, price: parseFloat(cb.value) };
      });

    resumePrestations.innerHTML = '';
    let prestationsTotal = 0;
    if (selectedOptions.length === 0) {
      resumePrestations.innerHTML = '<li>Aucune prestation sélectionnée.</li>';
    } else {
      selectedOptions.forEach(opt => {
        const li = document.createElement('li');
        li.textContent = opt.label;
        resumePrestations.appendChild(li);
        prestationsTotal += opt.price;
      });
    }

    const total = lavagePrice + prestationsTotal;
    resumeTotal.textContent = total.toFixed(2) + '€';
  }

  const selectBtns = document.querySelectorAll('.pricing-card .btn-reserver');
  selectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.pricing-card');
      selectedLavage = card.querySelector('h3').innerText;
      lavagePrice = parseFloat(card.querySelector('.price').innerText.replace(',', '.').replace('€', '').trim());

      prestationSection.style.display = 'block';
      resumeSection.style.display = 'block';
      updateResume();

      prestationSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  prestationsCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      if (resumeSection.style.display !== 'none') {
        updateResume();
      }
    });
  });

  suivantBtn.addEventListener('click', e => {
    e.preventDefault();
    if (!selectedVehicle || !selectedLavage) {
      alert('Veuillez sélectionner un véhicule et une formule/type de lavage.');
      return;
    }
    updateResume();
    resumeSection.scrollIntoView({ behavior: 'smooth' });
  });

