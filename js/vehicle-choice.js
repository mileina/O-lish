document.querySelectorAll('.vehicle-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.vehicle-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

