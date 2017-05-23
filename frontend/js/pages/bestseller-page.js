import AbstractPageView from './abstract-page-view';

class BestsellerPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row bestsellerPage">
      <div class="row__caption">
        <div class="name">Хит продаж</div>
        <div class="image"><img src="img/pic-1.png" alt=""></div>
      </div>
    </div>`;
  }

}

export default () => new BestsellerPageView().element;
