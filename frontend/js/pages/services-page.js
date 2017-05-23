import AbstractPageView from './abstract-page-view';

class ServicesPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row servicesPage">
      <div class="row__caption">
        <div class="name">Услуги</div>
        <div class="image"><img src="img/pic-1.png" alt=""></div>
      </div>
    </div>`;
  }

}

export default () => new ServicesPageView().element;
