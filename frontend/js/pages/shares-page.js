import AbstractPageView from './abstract-page-view';

class SharesPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row sharesPage">
      <div class="row__caption">
        <div class="name">Акции</div>
        <div class="image"><img src="img/pic-1.png" alt=""></div>
      </div>
    </div>`;
  }

}

export default () => new SharesPageView().element;
