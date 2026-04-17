// --- DADOS DINÂMICOS ---
const TITULOS = [
    { ano: '2012', nome: 'Mundial de Clubes FIFA', icone: '🏆' },
    { ano: '2012', nome: 'Libertadores Invicta', icone: '🌎' },
    { ano: '1990-2017', nome: '7 Títulos Brasileiros', icone: '🇧🇷' }
];

const ELENCO = [
    { nome: 'Cássio', posicao: 'Goleiro', status: 'Ídolo Eterno' },
    { nome: 'Rodrigo Garro', posicao: 'Meio-Campo', status: 'Maestro' },
    { nome: 'Yuri Alberto', posicao: 'Atacante', status: 'Artilheiro' }
];

// --- RENDERIZAÇÃO DINÂMICA ---
function renderData() {
    const gridTitulos = document.getElementById('grid-titulos');
    gridTitulos.innerHTML = TITULOS.map(t => `
        <article class="card">
            <span>${t.icone}</span>
            <h3>${t.nome}</h3>
            <p>${t.ano}</p>
        </article>
    `).join('');

    const carouselInner = document.getElementById('carousel-elenco');
    carouselInner.innerHTML = ELENCO.map(j => `
        <div class="carousel-item">
            <h3>${j.nome}</h3>
            <p>${j.posicao} - ${j.status}</p>
        </div>
    `).join('');
}

// --- ACESSIBILIDADE: FONTE E CONTRASTE ---
let currentFontSize = 16;
function changeFontSize(action) {
    currentFontSize = action === 'increase' ? currentFontSize + 2 : currentFontSize - 2;
    document.documentElement.style.setProperty('--font-base', currentFontSize + 'px');
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// --- COMPONENTES: ACORDEÃO ---
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    btn.setAttribute('aria-expanded', !isExpanded);
    content.hidden = isExpanded;
}

// --- COMPONENTES: CARROSSEL ---
let currentIndex = 0;
function moveCarousel(direction) {
    const inner = document.getElementById('carousel-elenco');
    const items = document.querySelectorAll('.carousel-item');
    currentIndex = (currentIndex + direction + items.length) % items.length;
    inner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// --- ANIMAÇÃO DE SCROLL (REVEAL) ---
function revealSections() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
}

// --- INICIALIZAÇÃO ---
window.addEventListener('scroll', revealSections);
document.addEventListener('DOMContentLoaded', () => {
    renderData();
    revealSections();
});
