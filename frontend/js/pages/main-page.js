import AbstractPageView from './abstract-page-view';
import imageView from '../templates/image-view';
import mainSliderView from '../templates/main-slider-view';
import {AppData} from '../data/data';
import Application from '../application';

class MainPageView extends AbstractPageView {

  constructor() {
    super();
    this.rightPictures = imageView(AppData.imagesData.rowRight);
  }

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
    this.rightPictures.classList.add('rightPictures');

    this.element.querySelector('.row-1 .row__content').appendChild(mainSliderView(AppData.imagesData.mainSlider));
    this.element.querySelector('.row-1 .row__content').appendChild(this.rightPictures);

    this.element.querySelector('.row-2 .row__image').appendChild(imageView(AppData.imagesData.row2));
    this.element.querySelector('.row-3 .row__image').appendChild(imageView(AppData.imagesData.row3));
  }

  bindHandlers() {
    const bestseller = this.element.querySelector('.row-2 .name');
    const shares = this.element.querySelector('.row-3 .name');
    const slider = this.element.querySelector('.slider-onLeft');
    const sliderImages = this.element.querySelectorAll('.slider-onLeft li');
    bestseller.addEventListener('click', Application.showBestsellerPage);
    shares.addEventListener('click', Application.showSharesPage);
    this.rightPictures.addEventListener('click', (e) => {
      try {
        Application['show' + e.target.src.split('/')[4].split('.')[0] + 'Page']();
      } catch (err) {
        Application.showErrorPage();
      }
    });
    slider.addEventListener('click', (e) => {
      if (!(e.target.localName === 'a')) {
        sliderImages.forEach((li, i) => {
          if (li.classList.contains('animate')) {
            try {
              Application['show' + sliderData[i].split('.')[0].split('-')[1] + 'Page']();
            } catch (err) {
              Application.showErrorPage();
            }
          }
        });
      }
    });
  }

}

export default () => new MainPageView().element;
