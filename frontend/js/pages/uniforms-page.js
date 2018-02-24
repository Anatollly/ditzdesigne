import AbstractPageView from './abstract-page-view';
import albumView from '../templates/album-view';
import {AppData} from '../data/data';

class UniformsPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row uniformsPage">
      <div class="row__caption">
        <div class="name">Изготовление униформы на заказ</div>
        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
      </div>
      <div class="row__image row__image-album">
      </div>
    </div>`;
  }

  addElements() {
    this.element.querySelector('.row__image').appendChild(albumView(AppData.albums.uniforms));
  }
}

export default () => new UniformsPageView().element;
