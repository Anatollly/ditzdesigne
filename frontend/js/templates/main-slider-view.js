import AbstractSliderView from './abstract-slider-view';
import {getElementFromTemplate} from '../util';

const TIME_CHANGE = 3000;

class MainSliderView extends AbstractSliderView {

  constructor(data) {
    super(data);
    this.timerID = 0;
    this.images[this.i].classList.add('animate');
  }

  startInterval() {
    this.timerID = setInterval(() => {
      this.showNextImage();
    }, TIME_CHANGE);
  }

  bindHandlers() {

    this.arrowRight.addEventListener('click', () => {
      clearInterval(this.timerID);
      this.showNextImage();
      this.startInterval();
    });

    this.arrowLeft.addEventListener('click', () => {
      clearInterval(this.timerID);
      this.showPrevImage();
      this.startInterval();
    });

    this.startInterval();
  }

  getAddElement() {
    return getElementFromTemplate('<img class="slider__imgSize" src="img/empty.jpg" alt="">');
  }

  setAddClass() {
    return 'slider-onLeft';
  }
}

export default (data) => new MainSliderView(data).element;
