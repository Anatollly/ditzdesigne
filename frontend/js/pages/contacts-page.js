import AbstractPageView from './abstract-page-view';

class ContactsPageView extends AbstractPageView {

  constructor() {
    super();
    this.head = document.querySelector('head');
  }

  getMarkup() {
    return `
    <div class="row contactsPage">
      <div class="row__caption">
        <div class="name">Контакты</div>
        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
      </div>
      <div id="contacts"></div>
      <div class="text">
        <div class="row__caption row__caption-split">
          <div class="name"></div>
          <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>
        </div>
        <p class="paragraph paragraph-bottom paragraph-left">
          По всем вопросам звоните, пишите Whatsapp +7 913 704-77-78<br>
          или на почту
          <a href="mailto:ditzdesigne@mail.ru">
            ditzdesigne@mail.ru
          </a>
        </p>
      </div>
    </div>`;
  }

  bindHandlers() {
    const oldScript = document.querySelector('head script');
    if (oldScript) {
      this.head.removeChild(oldScript);
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9d921e30fe6335c9e8fd994117785845e3e28e4a3a82ff7b268c2e213e296d4b&amp;height=380&amp;id=contacts';
    this.head.appendChild(script);
  }

}

export default () => new ContactsPageView().element;
