import {ImageView} from './image-view';
import ScreenSliderView from './screen-slider-view';

class AlbumView extends ImageView {
  constructor(data) {
    super(data);
    this.data = data;
    this.screenImage = document.querySelector('.screenImage');
    this.Slider = new ScreenSliderView(this.data);
    this.screenImage.appendChild(this.Slider.element);
  }

  bindHandlers() {
    this.element.addEventListener('click', (e) => {
      if (e.target.src) {
        this.data.forEach((img, i) => {
          if (img === e.target.src.split('/')[4]) {
            this.Slider.setImgOnClick(i);
          }
        });
        this.screenImage.classList.add('visible');
      }
    });
  }
}

export default (data) => new AlbumView(data).element;
