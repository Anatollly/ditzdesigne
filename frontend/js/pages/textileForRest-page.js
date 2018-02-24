import AbstractPageView from './abstract-page-view';
import albumView from '../templates/album-view';
import {AppData} from '../data/data';

class TextileForRestPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row textileForRestPage">
      <div class="row__caption">
        <div class="name">Текстиль для ресторанов</div>
        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
      </div>
      <div class="row__image row__image-album">
      </div>
    </div>`;
  }

  addElements() {
    this.element.querySelector('.row__image').appendChild(albumView(AppData.albums.textileForRest));
  }

}

export default () => new TextileForRestPageView().element;
