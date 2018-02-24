import AbstractPageView from './abstract-page-view';
import albumView from '../templates/album-view';
import {AppData} from '../data/data';

class InterTextilePageView extends AbstractPageView {

  getMarkup() {
    return `
      <div class="row interTextilePage">
        <div class="row__caption">
          <div class="name">Интерьерный текстиль</div>
          <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
        </div>
        <div class="row__image row__image-album">
        </div>
      </div>
    `;
  }

  addElements() {
    this.element.querySelector('.row__image').appendChild(albumView(AppData.albums.interTextil));
  }

}

export default () => new InterTextilePageView().element;
