import {getElementFromTemplate} from '../util';

export default class AbstractPageView {

  get element() {
    if (!this._element) {
      this._element = getElementFromTemplate(this.getMarkup());
      this.addElements();
      this.bindHandlers();
    }
    return this._element;
  }

  getMarkup() {
    throw new Error('Abstract method should be implemented');
  }

  addElements() {
    // By default there is nothing to add
  }

  bindHandlers() {
    // By default there is nothing to bind
  }

}
