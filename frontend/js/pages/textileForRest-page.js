import AbstractPageView from './abstract-page-view';

class TextileForRestPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row textileForRestPage">
      <div class="row__caption">
        <div class="name">Текстиль для ресторанов</div>
        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
      </div>
    </div>`;
  }

}

export default () => new TextileForRestPageView().element;
