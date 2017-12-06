import AbstractView from './abstract-view';
import albumView from './album-view';
import {getImageS, getAlbumName} from '../util';

class AllAlbumsView extends AbstractView {

  constructor(data, box) {
    super();
    this.data = data;
    this.coversOfAlbums = [];
    this.namesOfAlbums = [];
    this.arrData = Object.keys(this.data);
    this.albumBox = box;
  }

  getDataOfAlbum() {
    for (let i = 0; i < this.arrData.length; i++) {
      this.coversOfAlbums.push(this.data[this.arrData[i]][0]);
      this.namesOfAlbums.push(`<div>${this.arrData[i]}</div>`);
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
          if (name === getAlbumName(e.target.src)) {
            this.albumBox.innerHTML = '';
            this.albumBox.appendChild(albumView(this.data[name]));
          }
        });
      }
    });
  }

}

export default (data, box) => new AllAlbumsView(data, box).element;
