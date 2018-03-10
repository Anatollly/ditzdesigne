import AbstractPageView from './abstract-page-view';
import allAlbumsView from '../templates/all-albums-view';
import {AppData} from '../data/data';

class PortfolioPageView extends AbstractPageView {

  constructor(albumName) {
    super();
    this.albumName = albumName || '';
  }

  getMarkup() {
    return `<div class="row row-4">
      <div class="row__caption">
        <div class="name">Портфолио</div>
        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
      </div>
      <div class="row__image row__image-album">
      </div>
    </div>`;
  }

  addElements() {
    const backButton = this.element.querySelector('.row-4 .row__caption .name');
    const albumBox = this.element.querySelector('.row-4 .row__image');
    const screenImage = this.element.querySelector('.screenImage');
    albumBox.appendChild(allAlbumsView(AppData.albums, albumBox, this.albumName));
    backButton.addEventListener('click', () => {
      albumBox.innerHTML = '';
      albumBox.appendChild(allAlbumsView(AppData.albums, albumBox));
    });
  }

  bindHandlers() {

  }

}

export default (albumName) => new PortfolioPageView(albumName).element;
