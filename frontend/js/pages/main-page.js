import AbstractPageView from './abstract-page-view';
import imageView from '../templates/image-view';
import mainSliderView from '../templates/main-slider-view';
import {sliderData, imageData} from '../data/data';

class MainPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row row-1">
      <div class="row__content">
      </div>
    </div>
    <div class="row row-2">
      <div class="row__caption">
        <div class="name">Хит продаж</div>
        <div class="image"><img src="img/pic-2.png" alt=""></div>
      </div>
      <div class="row__image">
      </div>
    </div>
    <div class="row row-3">
      <div class="row__caption">
        <div class="name">Акции</div>
        <div class="image"><img src="img/pic-1.png" alt=""></div>
      </div>
      <div class="row__image row__image-threeImg">
      </div>
    </div>`;
  }

  addElements() {
    const rightPictures = imageView(imageData.row1);
    rightPictures.classList.add('rightPictures');

    this.element.querySelector('.row-1 .row__content').appendChild(mainSliderView(sliderData));
    this.element.querySelector('.row-1 .row__content').appendChild(rightPictures);

    this.element.querySelector('.row-2 .row__image').appendChild(imageView(imageData.row2));
    this.element.querySelector('.row-3 .row__image').appendChild(imageView(imageData.row3));
  }

  bindHandlers() {

  }

}

export default () => new MainPageView().element;
