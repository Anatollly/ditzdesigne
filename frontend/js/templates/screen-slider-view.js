import AbstractSliderView from './abstract-slider-view';

export default class ScreenSliderView extends AbstractSliderView {

  constructor(data) {
    super(data);
    this.screenImage = document.querySelector('.screenImage');
  }

  getAddElement() {
    const closeImage = document.createElement('a');
    closeImage.classList.add('slider__closeImage');
    return closeImage;
  }

  setAddClass() {
    return 'slider-fullScreen';
  }

  bindAddHandlers() {
    const closeImage = this.element.querySelector('.slider__closeImage');
    closeImage.addEventListener('click', () => {
      this.screenImage.classList.remove('visible');
      this.images[this.i].classList.remove('animate');
    });
  }
}
