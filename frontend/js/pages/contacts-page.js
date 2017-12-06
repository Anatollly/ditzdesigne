import AbstractPageView from './abstract-page-view';

class ContactsPageView extends AbstractPageView {

  constructor() {
    super();
    this.head = document.querySelector('head');
  }

  getMarkup() {
    return `<div class="row contactsPage">
      <div class="row__caption">
        <div class="name">Контакты</div>
        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
      </div>
      <div id="contacts"></div>
    </div>`;
  }

  bindHandlers() {
    const oldScript = document.querySelector('head script');
    if (oldScript) {
      console.log('oldScript: ', oldScript);
      this.head.removeChild(oldScript);
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9d921e30fe6335c9e8fd994117785845e3e28e4a3a82ff7b268c2e213e296d4b&amp;height=326&amp;id=contacts';
    this.head.appendChild(script);
  }

}

export default () => new ContactsPageView().element;
