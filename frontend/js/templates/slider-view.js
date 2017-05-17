import {getImageS} from '../util';
import AbstractView from './abstract-view';
import Controller from '../controller';

const TIME_CHANGE = 3000;

export default class Slider extends AbstractView {

  constructor(data, slider = '.slider') {
    super();
    this.data = data;
    this.sliderBox = document.querySelector(slider);
    this.arrowRight = document.createElement('a');
    this.arrowLeft = document.createElement('a');
    this.contr = new Controller();
  }

  getMarkup() {
    const wrapSlider = document.createElement('span');
    this.arrowRight.classList.add('arrow-right');
    this.arrowLeft.classList.add('arrow-left');
    wrapSlider.appendChild(getImageS(this.data));
    wrapSlider.appendChild(this.arrowRight);
    wrapSlider.appendChild(this.arrowLeft);
    return wrapSlider;
  }

  bindHandlers() {
    const images = this.element.querySelectorAll('li');
    const ulSlider = this.element.querySelector('ul');
    let timerID;
    let i = 0;

    images[i].classList.add('animate');

    const showNextImage = () => {
      images[i].classList.remove('animate');
      i = (i + 1) % images.length;
      images[i].classList.add('animate');
    };

    const showPrevImage = () => {
      images[i].classList.remove('animate');
      i = i || images.length;
      i = (i - 1) % images.length;
      images[i].classList.add('animate');
    };

    this.arrowRight.addEventListener('click', () => {
      clearInterval(timerID);
      showNextImage();
      startInterval();
    });

    this.arrowLeft.addEventListener('click', () => {
      clearInterval(timerID);
      showPrevImage();
      startInterval();
    });

    const startInterval = () => {
      timerID = setInterval(() => {
        showNextImage();
      }, TIME_CHANGE);
    };

    ulSlider.addEventListener('click', () => {
      this.contr.hash = this.data[i].slice(0, -4);
    });

    startInterval();
  }

  showSlider() {
    this.sliderBox.appendChild(this.element);
  }
}
