// main.js: menu, temas e carrossel

function openMenu() { document.getElementById('menu_aba').style.display = 'block'; }
function closeMenu() { document.getElementById('menu_aba').style.display = 'none'; }

function temaLim() {
  const cores = { '--cor-click': '#38184C', '--cor-sombra':'#9b0a59', '--cor-text':'#111', '--cor-back1':'#CEF09D', '--cor-back2':'#4f6a93' };
  applyTheme(cores);
}

function temaInatel() {
  const cores = { '--cor-click':'#126ae2', '--cor-sombra':'#0a599b', '--cor-text':'#111', '--cor-back1':'#edf2f4', '--cor-back2':'#6a937a' };
  applyTheme(cores);
}

function temaDark() {
  const cores = { '--cor-click':'#CEF09D', '--cor-sombra':'#9b0a59', '--cor-text':'#fff', '--cor-back1':'#2b2436', '--cor-back2':'#4f6a93' };
  applyTheme(cores);
}

function applyTheme(cores) {
  Object.entries(cores).forEach(([k,v]) => document.documentElement.style.setProperty(k,v));
  // salvar nome simbólico para persistência
}

// Ciclar temas e persistir
const THEMES = ['inatel','limao','dark'];
function setThemeByKey(key){
  if(key==='inatel') temaInatel();
  if(key==='limao') temaLim();
  if(key==='dark') temaDark();
  localStorage.setItem('site-theme', key);
}
function cycleTheme(){
  const cur = localStorage.getItem('site-theme') || 'inatel';
  const idx = THEMES.indexOf(cur);
  const next = THEMES[(idx+1)%THEMES.length];
  setThemeByKey(next);
}

// Carrossel simples
const eventos = [
  { id:1, title: 'Semana do Software 2025', date: '12/05', time: '10:00', location: 'Salão de Eventos', description: 'Uma semana inteira dedicada à tecnologia e inovação.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400' },
  { id:2, title: 'Workshop de IoT', date: '12/01', time: '08:00', location: 'Laboratório CS&I', description: 'Workshop prático sobre Internet das Coisas.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400' },
  { id:3, title: 'Festa dos Alunos 2025', date: '18/05', time: '19:00', location: 'Área Esportiva', description: 'Venha comemorar a melhor Festa dos Alunos!', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400' }
];

function createCards() {
  const carousel = document.querySelector('.carousel');
  carousel.innerHTML = '';
  eventos.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${ev.image}" alt="${ev.title}">
      <div class="info">
        <h3>${ev.title}</h3>
        <p>${ev.description}</p>
        <p><span class="material-symbols-outlined icon">event</span> ${ev.date} às ${ev.time} <span class="material-symbols-outlined icon">pin_drop</span> ${ev.location}</p>
      </div>
    `;
    carousel.appendChild(card);
  });
}

let index = 0;
function updateCarousel() {
  const carousel = document.querySelector('.carousel');
  carousel.style.transform = `translateX(-${index * 100}%)`;
}
function nextCard() { index = (index + 1) % eventos.length; updateCarousel(); }
function prevCard() { index = (index - 1 + eventos.length) % eventos.length; updateCarousel(); }

document.addEventListener('DOMContentLoaded', () => {
  createCards();
  document.getElementById('nextBtn').addEventListener('click', nextCard);
  document.getElementById('prevBtn').addEventListener('click', prevCard);
  setInterval(nextCard, 5000);

  // touch
  const carousel = document.querySelector('.carousel');
  let startX = 0;
  carousel.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  carousel.addEventListener('touchend', e => { const endX = e.changedTouches[0].clientX; if (startX - endX > 50) nextCard(); if (endX - startX > 50) prevCard(); });
});

// inicializar tema salvo
document.addEventListener('DOMContentLoaded', ()=>{
  const saved = localStorage.getItem('site-theme') || 'inatel';
  setThemeByKey(saved);
  const btn = document.getElementById('themeToggle');
  if(btn) btn.addEventListener('click', cycleTheme);
});
