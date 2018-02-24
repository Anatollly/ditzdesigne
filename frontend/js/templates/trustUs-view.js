import AbstractPageView from '../pages/abstract-page-view';
import imageView from '../templates/image-view';
import {AppData} from '../data/data';

class TrustUsView extends AbstractPageView {
  getMarkup() {
    return `
      <div class="row__caption">
        <div class="name">Нам доверяют</div>
        <div class="image"><img src="frontend/img/pic-4.png" alt=""></div>
      </div>
      <div class="row__image row__image-sixImg">
      </div>
    `;
  }

  addElements() {
    this.element.querySelector('.row__image').appendChild(imageView(AppData.images.logos));
  }
}

export default () => new TrustUsView().element;
