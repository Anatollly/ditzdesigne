import {ImageView} from './image-view';

class AlbumView extends ImageView {
  constructor(data) {
    super(data);
    this.data = data;
    this.screenImage = document.querySelector('.screenImage');
  }

  bindHandlers() {
    this.element.addEventListener('click', (e) => {
      console.log(e.target.src);
      if (e.target.src) {
        this.screenImage.classList.add('visible');
        console.log(e.target.src.split('/')[4]);
        this.data.forEach((img, i) => {
          if (img === e.target.src.split('/')[4]) {
            console.log(i);
          }
        })
      }
    });
  }
}

export default (data) => new AlbumView(data).element;
