import AbstractPageView from './abstract-page-view';

class InterTextilePageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row interTextilePage">
      <div class="row__caption">
        <div class="name">Интерьерный текстиль</div>
        <div class="image"><img src="img/pic-1.png" alt=""></div>
      </div>
    </div>`;
  }

}

export default () => new InterTextilePageView().element;
