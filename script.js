'use strict';

///////////////////////////////////////
// Modal window
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

const openModalWindow = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModalWindow.length; i++)
  btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.innerHTML =
//   'Мы испольуем на етом сайте cookie для улучшения функциональности. <button class="btn--close-cookie">Ок!</button>';

// const header = document.querySelector('.header');

// header.append(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// message.style.backgroundColor = '#076785';

// message.style.width = '120%';

// console.log(getComputedStyle(message).color); // ! узнаем свойства ну указывая их

// const logo = document.querySelectorAll('.nav__logo')

// console.log(logo.alt)

//

// const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   alert('addevetnliseteren');
// });
// ! напрямую добавляем евентлисенер
// h1.onclick = function (e) {
//   alert('2');
// };

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const getRandomColor = () =>
//   `rgb(${getRandomInt(0, 225)}, ${getRandomInt(0, 225)}, ${getRandomInt(
//     0,
//     225
//   )})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {});

// ! плавная навигация

// document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
//   htmlElement.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     console.log(href);
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// ! добавляем евент лисенер для общего родителя
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    console.log(href);
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// ! вкладки

tabContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  if (!clickedButton) return;

  // Зніміть клас operations__tab--active з усіх вкладок перед додаванням його для клікнутої вкладки
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  // Додайте клас operations__tab--active тільки для клікнутої вкладки
  clickedButton.classList.add('operations__tab--active');
  tabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

// ! анимация потускнения на панели навигации

const navLinksHoverAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkOwer = e.target;
    const siblingLinks = linkOwer
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOwer.closest('.nav').querySelector('img');
    const logoText = linkOwer.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(el => {
      if (el !== linkOwer) el.style.opacity = this;
    });
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};
nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));
nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));

// ! STICKY NAVIGATOR
// const section1Coords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// ! styky navigator СПОСОБ ДЛЯ ПАЦАНОВ
// const observeCallbeck = function (entries, observer) {
//   entries.forEach(entry => {});
// };
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(observeCallbeck, observerOptions);

// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const getStickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerobserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerobserver.observe(header);

//! появление частей сайта
const allsections = document.querySelectorAll('.section');
const apperianceSections = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionsobserver = new IntersectionObserver(apperianceSections, {
  root: null,
  threshold: 0.2,
});

allsections.forEach(function (section) {
  sectionsobserver.observe(section);
  section.classList.add('section--hidden');
});

// ! КОМПЛИМИТАЦИЯ ДОЛГОЙ ЗАГРУЗКИ (LAZY LOADING)

const lazyImages = document.querySelectorAll('img[data-src]');
const loadIMages = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;

  // ! меняем на фул хд рес
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const lazyImagesObserver = new IntersectionObserver(loadIMages, {
  root: null,
  threshold: 0.7,
});
lazyImages.forEach(image => lazyImagesObserver.observe(image));

// ! sozdanie slaidera
const dotContainer = document.querySelector('.dots');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const slidesNumber = slides.length;
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
// const slider = document.querySelector('.slider');
const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
  );
};
// slider.style.transform = 'scale(0.4) translateX(1300px)';
// slider.style.overflow = 'visible';
moveToSlide(0);

const activeCurrentDor = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const nextSlide = function () {
  if (currentSlide == slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  moveToSlide(currentSlide);
  activeCurrentDor(currentSlide);
};

btnRight.addEventListener('click', nextSlide);

const previousSlide = function () {
  if (currentSlide == 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }
  moveToSlide(currentSlide);
  activeCurrentDor(currentSlide);
};

btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') nextSlide();
});

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

createDots();

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activeCurrentDor(slide);
  }
});

activeCurrentDor(0)


