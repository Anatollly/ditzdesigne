import {getImageS} from '../util';
import AbstractView from './abstract-view';

export class ImageView extends AbstractView {

  constructor(data) {
    super();
    this.data = data;
  }

  getMarkup() {
    return getImageS(this.data);
  }

}

export default (data) => new ImageView(data).element;
