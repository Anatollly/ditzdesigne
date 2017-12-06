import {ImageView} from './image-view';
import ScreenSliderView from './screen-slider-view';
import {getImageName} from '../util';

class AlbumView extends ImageView {
  constructor(data) {
    super(data);
    console.log('data: ', data);
    this.data = data;
    console.log('data AlbumView: ', this.data);
    this.screenImage = document.querySelector('.screenImage');
    // this.Slider = new ScreenSliderView(this.data);
    // this.screenImage.appendChild(this.Slider.element);
  }

  getBigImagesData() {
    this.bigImages = this.data.map((item) => (
      item.replace(/albums_min/, 'albums')
    ));
  }

  bindHandlers() {
    this.getBigImagesData();
    this.Slider = new ScreenSliderView(this.bigImages);
    this.screenImage.appendChild(this.Slider.element);
    this.element.addEventListener('click', (e) => {
      if (e.target.src) {
        this.data.forEach((img, i) => {
          if (getImageName(img) === getImageName(e.target.src)) {
            console.log('imgonclick: ', i);
            this.Slider.setImgOnClick(i);
          }
        });
        this.screenImage.classList.add('visible');
      }
    });
  }
}

export default (data) => new AlbumView(data).element;
