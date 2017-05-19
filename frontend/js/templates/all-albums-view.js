import AbstractView from './abstract-view';
import albumView from './album-view';
import {getImageS} from '../util';

class AllAlbumsView extends AbstractView {

  constructor(data) {
    super();
    this.data = data;
    this.coversOfAlbums = [];
    this.namesOfAlbums = [];
    this.arrData = Object.keys(this.data);
    this.albumBox = document.querySelector('.row-4 .row__image');
  }

  getDataOfAlbum() {
    for (let i = 0; i < this.arrData.length; i++) {
      this.coversOfAlbums.push(this.data[this.arrData[i]].content[0]);
      this.namesOfAlbums.push(`<div>${this.data[this.arrData[i]].name}</div>`);
    }
  }

  getMarkup() {
    this.getDataOfAlbum();
    return getImageS(this.coversOfAlbums, this.namesOfAlbums);
  }

  bindHandlers() {
    this.element.addEventListener('click', (e) => {
      if (e.target.src) {
        this.arrData.forEach((name, i) => {
          if (this.data[name].content[0] === e.target.src.split('/')[4]) {
            this.albumBox.innerHTML = '';
            this.albumBox.appendChild(albumView(this.data[name].content));
          }
        });
      }
    });
  }

}

export default (data) => new AllAlbumsView(data).element;
