import AbstractPageView from './abstract-page-view';
import imageView from '../templates/image-view';
import {AppData} from '../data/data';
import trustUsView from '../templates/trustUs-view';

class AboutUsPageView extends AbstractPageView {

  constructor() {
    super();
    this.bigTop = imageView(AppData.images.aboutUsBigTop);
    this.rightTop = imageView(AppData.images.aboutUsRightTop);
    this.bigBottom = imageView(AppData.images.aboutUsBigBottom);
    this.rightBottom = imageView(AppData.images.aboutUsRightBottom);
  }

  getMarkup() {
    return `
      <div class="row aboutUsPage">
        <div class="row__caption">
          <div class="name">О нас</div>
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
            Cтудия текстильного дизайна DitzDesigne начинает свою историю в 2015 году,<br>
            за это время мы разработали и пошили более 500 различных идей,<br>
            с которыми Вы можете познакомиться в разделе портфолио.
          </p>
          <p class="paragraph">
            DitzDesigne предлагает своим клиентам качественную продукцию и<br>
            достойный сервис благодаря ряду преимуществ:
          </p>
          <p class="paragraph">
            <div class="needle needle__paragraph"></div>
            Собственный швейный цех позволяет нам осуществлять<br>
            пошив униформы, текстиля для ресторанов, магазинов,<br>
            сервисов и заведений на заказ премиального качества
          </p>
          <p class="paragraph">
            <div class="needle needle__paragraph"></div>
            Со дня своего основания мы сотрудничаем исключительно<br>
            с ответственными поставщиками текстиля, фурнитуры,<br>
            отделочных материалов. И это помогает шить продукцию<br>
            не только прекрасную по внешнему виду,<br>
            но и по качеству и свойствам
          </p>
          <p class="paragraph">
            <div class="needle needle__paragraph"></div>
            Мы выполняем работы по пошиву, как по эскизам заказчика,<br>
            так и по собственным дизайнерским разработкам
          </p>
          <p class="paragraph">
            <div class="needle needle__paragraph"></div>
            Сотрудничество со студией DitzDesigne очень удобно.<br>
            Мы предлагаем заказчику несколько вариантов эскизов,<br>
            можем изготовить образец и, при необходимости,<br>
            сами выезжаем к заказчику для снятия мерок
          </p>
          <div class="row__caption row__caption-split">
            <div class="name"></div>
            <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>
          </div>
          <p class="paragraph paragraph-bottom">
            Мы очень благодарны всем нашим партнерам,<br>
            которые оказывают нам доверие и вдохновляют<br>
            на новые достижения!
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

export default () => new AboutUsPageView().element;


// <span>
//   <img class="slider__imgSize" src="frontend/img/empty.jpg" alt="">
// </span>
