import AbstractPageView from './abstract-page-view';
import allAlbumsView from '../templates/all-albums-view';
import {galleryData} from '../data/data';

class PortfolioPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row row-4">
      <div class="row__caption">
        <div class="name">Портфолио</div>
        <div class="image"><img src="img/pic-1.png" alt=""></div>
      </div>
      <div class="row__image row__image-album">
      </div>
      <div class="screenImage">
      </div>
    </div>`;
  }

  addElements() {
    const backButton = this.element.querySelector('.row-4 .row__caption .name');
    const albumBox = this.element.querySelector('.row-4 .row__image');
    const screenImage = this.element.querySelector('.screenImage');

    albumBox.appendChild(allAlbumsView(galleryData, albumBox));
    backButton.addEventListener('click', () => {
      albumBox.innerHTML = '';
      screenImage.innerHTML = '';
      albumBox.appendChild(allAlbumsView(galleryData, albumBox));
    });
  }

  bindHandlers() {

  }

}

export default () => new PortfolioPageView().element;
