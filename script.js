const pages = [
  ['images/cover.png'],
    ['images/intro1.png', 'images/intro2.png'],
  ['images/page1.png', 'images/page2.png'],
  ['images/page3.png', 'images/page4.png'],
  ['images/page5.png', 'images/page6.png'],
  ['images/page7.png', 'images/page8.png'],
  ['images/page9.png', 'images/page10.png'],
  ['images/page11.png', 'images/page12.png'],
  ['images/page13.png', 'images/page14.png'],
  ['images/page15.png', 'images/page16.png'],
    ['images/page17.png', 'images/page18.png'],
  ['images/backcover.png']
];

let currentIndex = 0;

const book = document.getElementById('book');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const firstBtn = document.getElementById('firstBtn');
const lastBtn = document.getElementById('lastBtn');
const themeSelector = document.getElementById('themeSelector');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const pageInput = document.getElementById('pageInput');
const pageTotal = document.getElementById('pageTotal');
const pagesOnScreen = book.querySelectorAll('.page');


// ✅ Appliquer le thème "light" par défaut
if (!document.body.className) {
  document.body.classList.add('light');
  themeSelector.value = 'light';
}

// ✅ Met à jour l'affichage du numéro de page
function updatePageIndicator() {
  if (pageInput) pageInput.value = currentIndex + 1;
  if (pageTotal) pageTotal.textContent = pages.length;
}

// ✅ Changer de page depuis input
if (pageInput) {
  pageInput.addEventListener('change', () => {
    const value = parseInt(pageInput.value, 10);
    if (!isNaN(value) && value >= 1 && value <= pages.length) {
      goToPage(value - 1);
    } else {
      updatePageIndicator();
    }
  });
}

// ✅ Navigation clavier
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
    goToPage(currentIndex + 1);
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    goToPage(currentIndex - 1);
  }
});

function renderPages() {
  book.innerHTML = '';

  // Nettoyer les anciennes animations
  book.querySelectorAll('.page').forEach(p => {
    p.classList.remove('turning-left', 'turning-right');
  });

  if (document.body.classList.contains('magic')) {
    const stars = document.createElement('div');
    stars.className = 'starfield';
    book.appendChild(stars);
  }

  const spread = pages[currentIndex];

  book.classList.remove('singlepage', 'twopages');
  book.classList.add(spread.length === 1 ? 'singlepage' : 'twopages');

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

  book.style.flexDirection = spread.length === 2 ? 'row' : 'column';

  updatePageIndicator();
}

function goToPage(index) {
  if (index < 0 || index >= pages.length) return;

  const direction = index > currentIndex ? 'forward' : 'backward';
  const oldPages = document.querySelectorAll('.page');

  oldPages.forEach(p => {
    p.classList.remove('visible');
    
    const isLeft = p.classList.contains('left');
    const isRight = p.classList.contains('right');
    const isSolo = p.classList.contains('solo');

    if (pages[currentIndex].length === 2) {
      if (direction === 'forward' && isRight) {
        p.classList.add('turning-right');
      } else if (direction === 'backward' && isLeft) {
        p.classList.add('turning-left');
      }
    } else if (isSolo) {
      p.classList.add('turning-left');
    }
  });

  setTimeout(() => {
    currentIndex = index;
    renderPages();
  }, 500);
}


// ✅ Navigation par clic
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) goToPage(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < pages.length - 1) goToPage(currentIndex + 1);
});

book.addEventListener('click', (e) => {
  const rect = book.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  const pagesOnScreen = book.querySelectorAll('.page');
  pagesOnScreen.forEach(p => p.classList.remove('turning-left', 'turning-right'));

  if (clickX < rect.width / 2 && currentIndex > 0) {
    if (pages[currentIndex].length === 1) {
      pagesOnScreen[0]?.classList.add('turning-left');
    } else {
      pagesOnScreen[0]?.classList.add('turning-left');
    }
    goToPage(currentIndex - 1);
  } else if (clickX >= rect.width / 2 && currentIndex < pages.length - 1) {
    if (pages[currentIndex].length === 1) {
      pagesOnScreen[0]?.classList.add('turning-right');
    } else {
      pagesOnScreen[1]?.classList.add('turning-right');
    }
    goToPage(currentIndex + 1);
  }
});



// ✅ Changement de thème
themeSelector.addEventListener('change', () => {
  document.body.className = themeSelector.value;
  renderPages();
});

// ✅ Plein écran
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
firstBtn.addEventListener('click', () => {
  goToPage(0);
});

lastBtn.addEventListener('click', () => {
  goToPage(pages.length - 1);
});



document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    book.classList.remove('fullscreen');
    renderPages();
  }
});

// ✅ Initialisation
renderPages();
