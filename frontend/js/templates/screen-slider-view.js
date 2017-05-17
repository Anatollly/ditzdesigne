import AbstractSliderView from './abstract-slider-view';

class ScreenSliderView extends AbstractSliderView {

  constructor(data, i) {
    super(data, i);
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
    });
  }
}

export default (data, i) => new ScreenSliderView(data, i).element;
