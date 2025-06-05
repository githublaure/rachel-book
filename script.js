const pages = [
  ['images/cover.png'],
  ['images/page1.png', 'images/page2.png'],
  ['images/page3.png', 'images/page4.png'],
  ['images/page5.png', 'images/page6.png'],
  ['images/page7.png', 'images/page8.png'],
  ['images/page9.png', 'images/page10.png'],
  ['images/page11.png', 'images/page12.png'],
  ['images/page13.png', 'images/page14.png'],
  ['images/page15.png', 'images/page16.png'],
  ['images/backcover.png']
];




let currentIndex = 0;

const book = document.getElementById('book');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const themeSelector = document.getElementById('themeSelector');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// ✅ Assurer que le thème par défaut est appliqué
if (!document.body.className) {
  document.body.classList.add('light');
  themeSelector.value = 'light';
}

function renderPages() {
  book.innerHTML = '';

  if (document.body.classList.contains('magic')) {
    const stars = document.createElement('div');
    stars.className = 'starfield';
    book.appendChild(stars);
  }

  const spread = pages[currentIndex];

  // Classes principales
  book.classList.remove('singlepage', 'twopages');
  book.classList.add(spread.length === 1 ? 'singlepage' : 'twopages');

  // Affichage des pages
  spread.forEach((src, i) => {
    const page = document.createElement('div');
    page.className = 'page';

    if (spread.length === 1) {
      page.classList.add('solo');
    } else if (i === 0) {
      page.classList.add('left');
    } else {
      page.classList.add('right');
    }

    const img = document.createElement('img');
    img.src = src;
    img.className = 'page-img';
    page.appendChild(img);

    book.appendChild(page);

    setTimeout(() => page.classList.add('visible'), 10);
  });

  // ⚠️ corriger l'espacement entre les pages
  book.style.justifyContent = 'center';
}

function goToPage(index) {
  const oldPages = document.querySelectorAll('.page');
  oldPages.forEach(p => {
    p.classList.remove('visible');
    p.classList.add('turning');
  });

  setTimeout(() => {
    currentIndex = index;
    renderPages();
  }, 400);
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) goToPage(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < pages.length - 1) goToPage(currentIndex + 1);
});

book.addEventListener('click', (e) => {
  const rect = book.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  if (clickX < rect.width / 2) {
    if (currentIndex > 0) goToPage(currentIndex - 1);
  } else {
    if (currentIndex < pages.length - 1) goToPage(currentIndex + 1);
  }
});

themeSelector.addEventListener('change', () => {
  document.body.className = themeSelector.value;
  renderPages();
});

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    book.classList.add('fullscreen');
    book.requestFullscreen();
  } else {
    document.exitFullscreen().then(() => {
      book.classList.remove('fullscreen');
    });
  }
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    book.classList.remove('fullscreen');
    renderPages();
  }
});

renderPages();
