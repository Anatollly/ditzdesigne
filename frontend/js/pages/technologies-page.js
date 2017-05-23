import AbstractPageView from './abstract-page-view';

class TechnologiesPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row technologiesPage">
      <div class="row__caption">
        <div class="name">Ткани и технологии</div>
        <div class="image"><img src="img/pic-1.png" alt=""></div>
      </div>
    </div>`;
  }

}

export default () => new TechnologiesPageView().element;
