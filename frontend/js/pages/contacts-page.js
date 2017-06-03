import AbstractPageView from './abstract-page-view';

class ContactsPageView extends AbstractPageView {

  getMarkup() {
    return `<div class="row contactsPage">
      <div class="row__caption">
        <div class="name">Контакты</div>
        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
      </div>
    </div>`;
  }

}

export default () => new ContactsPageView().element;
