import AbstractView from './abstract-view';
import albumView from './album-view';
import {getImageS, getAlbumName} from '../util';

class AllAlbumsView extends AbstractView {

  constructor(data, albumBox) {
    super();
    this.data = data;
    this.coversOfAlbums = [];
    this.namesOfAlbums = [];
    this.namesOfAlbumsLabel = [];
    this.arrData = Object.keys(this.data);
    this.albumBox = albumBox;
  }

  getDataOfAlbum() {
    for (let i = 0; i < this.arrData.length; i++) {
      if (!(
        this.arrData[i] === 'interTextil'
        || this.arrData[i] === 'textileForRest'
        || this.arrData[i] === 'uniforms'
      )) {
        this.coversOfAlbums.push(this.data[this.arrData[i]][0]);
        const space = this.arrData[i].replace(/__/g, '&nbsp');
        const quot = space.replace(/99/g, '&quot');
        const newName = quot.replace(/--/g, '<br>');
        const newNameLabel = quot.replace(/--/g, '&nbsp');
        this.namesOfAlbums.push(`<div>${newName}</div>`);
        this.namesOfAlbumsLabel.push(`<div>${newNameLabel}</div>`);
      }
    }
  }

  getMarkup() {
    this.getDataOfAlbum();
    return getImageS(this.coversOfAlbums, this.namesOfAlbums);
  }

  bindHandlers() {
    this.element.addEventListener('click', (e) => {
      const {src, nextSibling} = e.target;
      if (src) {
        this.arrData.forEach((name, i) => {
          if (name === getAlbumName(e.target.src)) {
            this.albumBox.innerHTML = `
              <div class="row__caption">
                <div class="name">${this.namesOfAlbumsLabel[i]}</div>
              </div>
            `;
            this.albumBox.appendChild(albumView(this.data[name]));
          }
        });
      } else if (nextSibling && nextSibling.nodeName === 'IMG') {
        this.arrData.forEach((name, i) => {
          if (name === getAlbumName(nextSibling.src)) {
            this.albumBox.innerHTML = `
              <div class="row__caption">
                <div class="name">${this.namesOfAlbumsLabel[i]}</div>
              </div>
            `;
            this.albumBox.appendChild(albumView(this.data[name]));
          }
        });
      }
    });
  }

}

export default (data, box) => new AllAlbumsView(data, box).element;
