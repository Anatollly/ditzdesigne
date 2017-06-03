import AbstractPageView from './abstract-page-view';

class ErrorPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row errorPage">
      <div class="row__caption">
        <div class="name">Такой страницы не существует</div>
        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
      </div>
    </div>`;
  }

}

export default () => new ErrorPageView().element;
