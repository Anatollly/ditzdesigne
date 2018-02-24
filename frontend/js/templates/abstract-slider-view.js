import {getImageS} from '../util';
import AbstractView from './abstract-view';

export default class AbstractSliderView extends AbstractView {

  constructor(data) {
    super(data);
    this.data = data;
    this.sliderBox = document.createElement('div');
    this.arrowRight = document.createElement('a');
    this.arrowLeft = document.createElement('a');
    this.i = 0;
  }

  get images() {
    if (!this._images) {
      this._images = this.element.querySelectorAll('li');
    }
    return this._images;
  }

  setImgOnClick(i) {
    this.images[i].classList.add('animate');
    this.i = i;
  }

  getMarkup() {
    this.sliderBox.classList.add('slider');
    this.arrowRight.classList.add('slider__arrowRight');
    this.arrowLeft.classList.add('slider__arrowLeft');
    this.sliderBox.appendChild(getImageS(this.data));
    this.sliderBox.appendChild(this.arrowRight);
    this.sliderBox.appendChild(this.arrowLeft);
    if (this.getAddElement()) {
      this.sliderBox.appendChild(this.getAddElement());
    }
    if (this.setAddClass()) {
      this.sliderBox.classList.add(this.setAddClass());
    }
    return this.sliderBox;
  }

  getAddElement() {

  }

  setAddClass() {

  }

  showNextImage() {
    this.images[this.i].classList.remove('animate');
    this.i = (this.i + 1) % this.images.length;
    this.images[this.i].classList.add('animate');
  }

  showPrevImage() {
    this.images[this.i].classList.remove('animate');
    this.i = this.i || this.images.length;
    this.i = (this.i - 1) % this.images.length;
    this.images[this.i].classList.add('animate');
  }

  bindHandlers() {
    this.arrowRight.addEventListener('click', this.showNextImage.bind(this));
    this.arrowLeft.addEventListener('click', this.showPrevImage.bind(this));

    this.bindAddHandlers();
  }

  bindAddHandlers() {

  }

}
