import AbstractPageView from './abstract-page-view';

class AboutUsPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row aboutUsPage">
      <div class="row__caption">
        <div class="name">О нас</div>
        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
      </div>
    </div>`;
  }

}

export default () => new AboutUsPageView().element;
