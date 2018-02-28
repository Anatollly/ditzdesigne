import AbstractPageView from './abstract-page-view';
import imageView from '../templates/image-view';
import {AppData} from '../data/data';
import trustUsView from '../templates/trustUs-view';

class ServicesPageView extends AbstractPageView {

  constructor() {
    super();
    this.bigTop = imageView(AppData.images.servicesBigTop);
    this.rightTop = imageView(AppData.images.servicesRightTop);
    this.bigBottom = imageView(AppData.images.servicesBigBottom);
    this.rightBottom = imageView(AppData.images.servicesRightBottom);
  }

  getMarkup() {
    return `
    <div class="row servicesPage">
      <div class="row__caption">
        <div class="name">Услуги</div>
        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>
      </div>
      <div class="row__content image-top">
        <div class="slider slider-onLeft">
          <span>
            <img class="slider__imgSize" src="frontend/img/empty.jpg" alt="">
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="row__caption">
        <div class="name"></div>
        <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>
      </div>
      <div class="text">
        <p class="paragraph">
          DitzDesinge предлагает широкий спектр услуг по разработке и<br>
          изготовлению текстильных изделий
        </p>
        <p class="paragraph">
          В DitzDesigne Вы можете заказать:
        </p>
        <p class="paragraph">
          <div class="needle needle__paragraph"></div>
          Разработку дизайнерских эскизов униформы, интерьерного текстиля,<br>
          текстиля для заведений, текстильных игрушек
        </p>
        <p class="paragraph">
          <div class="needle needle__paragraph"></div>
          Униформу для персонала, будь то магазин, ресторан,<br>
          автосервис, медицинский центр,<br>
          гостиница, общественная сауна или команда спортсменов.<br>
          Как стандартных моделей, так и разработку уникального решения
        </p>
        <p class="paragraph">
          <div class="needle needle__paragraph"></div>
          Вы можете заказать нанесение Вашего логотипа на форму различного типа
        </p>
        <p class="paragraph">
          <div class="needle needle__paragraph"></div>
          Текстильные изделия для решения интерьерного вопроса-<br>
          шторы, занавески, мягкие подушки, сидения,<br>
          необычный текстильный декор
        </p>
        <p class="paragraph">
          <div class="needle needle__paragraph"></div>
          Текстиль для ресторана, кафе, гостиницы- столовый и банкетный текстиль<br>
          скатерти, салфетки, напероны
        </p>
        <p class="paragraph">
          <div class="needle needle__paragraph"></div>
          Разработать для Вас рекламную продукцию, текстильные игрушки
        </p>
        <div class="row__caption row__caption-split">
          <div class="name"></div>
          <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>
        </div>
        <p class="paragraph paragraph-bottom">
          У Вас есть идеи для текстиля Вашего заведения?<br>
          В DitzDesigne помогут подобрать решение и создать их<br>
          звоните, пишите Whatsapp +7 913 704-77-78 или<br>
          на почту
          <a href="mailto:ditzdesigne@mail.ru">
            ditzdesigne@mail.ru
          </a>
        </p>
        <p class="paragraph paragraph-bottom">
        «Красивая одежда - что рекомендательное письмо»<br>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspитальянская пословица
        </p>
      </div>
    </div>
    <div class="row">
      <div class="row__content image-bottom">
        <div class="slider slider-onLeft">
          <span>
            <img class="slider__imgSize" src="frontend/img/empty.jpg" alt="">
          </span>
        </div>
      </div>
    </div>
    <div class="row row-trust"></div>
    `;
  }

  addElements() {
    // this.bigTop.classList.add('animate');
    this.rightTop.classList.add('rightPictures');
    // this.bigBottom.classList.add('');
    this.rightBottom.classList.add('rightPictures');

    // const element = this.element.querySelector('.row .row__content.image-top .slider');
    // this.element.querySelector('.row .row__content.image-top').insertBefore(this.rightTop, element);
    this.element.querySelector('.row .row__content.image-top .slider').appendChild(this.bigTop);
    this.element.querySelector('.row .row__content.image-top').appendChild(this.rightTop);
    this.element.querySelector('.row .row__content.image-bottom .slider').appendChild(this.bigBottom);
    this.element.querySelector('.row .row__content.image-bottom').appendChild(this.rightBottom);
    this.element.querySelector('.row-trust').appendChild(trustUsView());
  }

}

export default () => new ServicesPageView().element;
