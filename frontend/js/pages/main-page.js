import AbstractPageView from './abstract-page-view';
import imageView from '../templates/image-view';
import {AppData} from '../data/data';
import mainSliderView from '../templates/main-slider-view';
import Application from '../application';
import trustUsView from '../templates/trustUs-view';
import {getPageName, goToPage} from '../util';
import pages from '../data/pages';

class MainPageView extends AbstractPageView {

  constructor() {
    super();
    this.rightPictures = imageView(AppData.images.mainRight);
  }

  getMarkup() {
    return `
    <div class="row row-1">
      <div class="row__content">
      </div>
    </div>
    <div class="row row-2">
      <div class="row__caption">
        <div class="name">Хит продаж</div>
        <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>
      </div>
      <div class="row__image">
      </div>
    </div>
    <div class="row row-3">
      <div class="row__caption">
        <div class="name">Акции</div>
        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
      </div>
      <div class="row__image row__image-threeImg">
      </div>
    </div>
    <div class="row row-trust"></div>
    `;
  }

  addElements() {
    this.rightPictures.classList.add('rightPictures');

    this.element.querySelector('.row-1 .row__content').appendChild(mainSliderView(AppData.images.mainSlider));
    this.element.querySelector('.row-1 .row__content').appendChild(this.rightPictures);
    this.element.querySelector('.row-2 .row__image').appendChild(imageView(AppData.images.mainHit));
    this.element.querySelector('.row-3 .row__image').appendChild(imageView(AppData.images.mainStock));
    this.element.querySelector('.row-trust').appendChild(trustUsView());
  }

  bindHandlers() {
    const bestseller = this.element.querySelector('.row-2 .name');
    const shares = this.element.querySelector('.row-3 .name');
    const slider = this.element.querySelector('.slider-onLeft');
    const sliderImages = this.element.querySelectorAll('.slider-onLeft li');
    const mainHit = this.element.querySelector('.row-2 .row__image');
    const mainStock = this.element.querySelector('.row-3 .row__image');
    // bestseller.addEventListener('click', Application.showBestsellerPage);
    // shares.addEventListener('click', Application.showSharesPage);
    this.rightPictures.addEventListener('click', (e) => {
      goToPage(pages[getPageName(e.target.src)]);
    });
    slider.addEventListener('click', (e) => {
      if (!(e.target.localName === 'a')) {
        sliderImages.forEach((li, i) => {
          if (li.classList.contains('animate')) {
            try {
              if (Application.hasOwnProperty(`show${getPageName(AppData.images.mainSlider[i])}Page`)) {
                Application[`show${getPageName(AppData.images.mainSlider[i])}Page`]();
              } else {
                Application.showPortfolioPage(getPageName(AppData.images.mainSlider[i]));
              }
            } catch (err) {
              Application.showErrorPage();
            }
          }
        });
      }
    });
    mainHit.addEventListener('click', (e) => {
      Application.showPortfolioPage(getPageName(e.target.src).split('___')[1]);
    });
    mainStock.addEventListener('click', (e) => {
      Application.showPortfolioPage(getPageName(e.target.src).split('___')[1]);
    });
  }

}

export default () => new MainPageView().element;
