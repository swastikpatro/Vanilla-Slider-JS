// console.log('Hare Krishna');
import people from './data.js';

const slideContainer = document.querySelector('.slide-container');
let current, prevEle, nextEle;
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function displayPeople(peopleData) {
  // console.log(peopleData);
  const myHTML = peopleData
    .map((person, i) => {
      const { img, name, job, text } = person;
      return `
    <!-- single slide -->
        <article class="slide ${i === 0 ? 'active' : ''}">
          <img
            src="${img}"
            alt="${name}"
            class="img profile-img"
          />

          <h4>${name}</h4>
          <p class="title">${job}</p>
          <p class="text">${text}</p>

          <div class="quote-icon">
            <i class="fa fa-quote-right"></i>
          </div>
        </article> 
    <!-- end of single slide -->
    `;
    })
    .join('');

  slideContainer.innerHTML = myHTML;
}

function startSlider() {
  current =
    slideContainer.querySelector('.active') || slideContainer.firstElementChild;
  prevEle = current.previousElementSibling || slideContainer.lastElementChild;
  nextEle = current.nextElementSibling || slideContainer.firstElementChild;
}

function applyClasses() {
  current.classList.add('active');
  prevEle.classList.add('prev');
  nextEle.classList.add('next');
}

function move(direction) {
  const classesToRemove = ['prev', 'next', 'active'];
  prevEle.classList.remove(...classesToRemove);
  nextEle.classList.remove(...classesToRemove);
  current.classList.remove(...classesToRemove);

  if (direction === 'back') {
    [prevEle, current, nextEle] = [
      prevEle.previousElementSibling || slideContainer.lastElementChild,
      prevEle,
      current,
    ];
  } else {
    [prevEle, current, nextEle] = [
      current,
      nextEle,
      nextEle.nextElementSibling || slideContainer.firstElementChild,
    ];
  }

  applyClasses();
}

const throttleFunction = (func, delay) => {
  // Previously called time of the function
  let prev = 0;
  return (...args) => {
    // Current called time of the function
    let now = new Date().getTime();

    // Logging the difference between previously
    // called and current called timings
    // console.log(now - prev, delay);

    // If difference is greater than delay call
    // the function again.
    if (now - prev > delay) {
      prev = now;

      // "..." is the spread operator here
      // returning the function with the
      // array of arguments
      return func(...args);
    }
  };
};

window.addEventListener('DOMContentLoaded', () => {
  displayPeople([...structuredClone(people)]);

  startSlider();
  applyClasses();

  prevBtn.addEventListener(
    'click',
    throttleFunction(() => {
      move('back');
    }, 500)
  );
  nextBtn.addEventListener('click', throttleFunction(move, 500));
});
