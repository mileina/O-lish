const calendarDays = document.getElementById("calendar-days");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let currentDate = new Date();
let today = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days = [];
  const startOffset = (firstDay === 0 ? 6 : firstDay - 1);

  for (let i = 0; i < startOffset; i++) {
    days.push('');
  }

  for (let d = 1; d <= lastDate; d++) {
    days.push(d);
  }

  const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  monthYear.innerText = `${monthNames[month]} ${year}`;

  calendarDays.innerHTML = '';
  const weekDays = ['LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.', 'DIM.'];
  weekDays.forEach(day => {
    const div = document.createElement('div');
    div.style.fontWeight = 'bold';
    div.textContent = day;
    calendarDays.appendChild(div);
  });

  days.forEach((day) => {
    const div = document.createElement('div');
    div.textContent = day;

    if (day === '') {
      div.classList.add('disabled');
    } else {
      const dateCheck = new Date(year, month, day);
      const isPast = dateCheck < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isWeekend = [0, 6].includes(dateCheck.getDay());

      if (isPast || isWeekend) {
        div.classList.add('disabled');
      } else {
        div.addEventListener('click', () => {
          document.querySelectorAll('.calendar-grid div').forEach(el => el.classList.remove('active'));
          div.classList.add('active');
        });
      }
    }
    calendarDays.appendChild(div);
  });
}

renderCalendar(currentDate);

prevMonth.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonth.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});
