import AbstractSliderView from './abstract-slider-view';

export default class ScreenSliderView extends AbstractSliderView {

  constructor(data) {
    super(data);
    this.screenImage = document.querySelector('.screenImage');
    this.closeImage = document.createElement('a');
  }

  getAddElement() {
    this.closeImage.classList.add('slider__closeImage');
    return this.closeImage;
  }

  setAddClass() {
    return 'slider-fullScreen';
  }

  bindAddHandlers() {
    this.closeImage.addEventListener('click', () => {
      this.screenImage.classList.remove('visible');
      this.images[this.i].classList.remove('animate');
      this.arrowRight.removeEventListener('click', this.showNextImage.bind(this));
      this.arrowLeft.removeEventListener('click', this.showPrevImage.bind(this));
      this.screenImage.innerHTML = '';
    });
  }
}
