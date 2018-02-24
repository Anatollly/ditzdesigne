import AbstractPageView from './abstract-page-view';
import imageView from '../templates/image-view';
import {AppData} from '../data/data';
import trustUsView from '../templates/trustUs-view';

class TechnologiesPageView extends AbstractPageView {

  constructor() {
    super();
    this.bigTop = imageView(AppData.images.technologiesBigTop);
    this.rightTop = imageView(AppData.images.technologiesRightTop);
    this.bigBottom = imageView(AppData.images.technologiesBigBottom);
    this.rightBottom = imageView(AppData.images.technologiesRightBottom);
  }

  getMarkup() {
    return `
    <div class="row technologiesPage">
      <div class="row__caption">
        <div class="name">Ткани и технологии</div>
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
          В своём производстве DitzDesinge использует только проверенные качественные ткани и<br>
          технологии работы с ними.
        </p>
        <p class="paragraph">
          В DitzDesigne мы работаем с такими тканями для защитного, корпоративного,<br>
          медицинского и сервисноготекстиля:
        </p>
        <p class="paragraph">
          <div class="needle needle__paragraph"></div>
          Carrington Textiles Ltd® (Великобритания)<br>
          крупнейший европейский производитель тканей для профессиональной рабочей и<br>
          защитной одежды. Одежда из тканей компании Кэррингтон (Carrington) –<br>
          это современная спецодежда соответствующая самым высоким требованиям и стандартам.
        </p>
        <p class="paragraph">
          <div class="needle needle__paragraph"></div>
          Satory®<br>
          Смесовые ткани для медицинских изделий и сервисной одежды с твиловым переплетением.<br>
          Состав: 50% хлопок, 50% полиэфир.<br>
          Натуральные волокна придают ткани хорошую воздухопроницаемость и гигроскопичность.<br>
          Благодаря полиэфиру в составе, ткань Satory® износостойкая и формоустойчива.
        </p>
        <div class="row__caption row__caption-split">
          <div class="name"></div>
          <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>
        </div>
        <p class="paragraph">
          Логотип на форменной одежде или на интерьерном текстиле -<br>
          это Ваш фирменный стиль и обозначение принадлежности к компании,<br>
          но и дополнительная реклама перед глазами людей.<br>
          В DitzDesigne есть несколько технологий нанесения Вашего логотипа на униформу:
        </p>
        <p class="paragraph">
          <div class="needle needle__paragraph"></div>
          Шелкография<br>
          При этом логотип наносится прямо на ткань с помощью специальной сетки.<br>
          Преимущества метода: долговечность, красочность.<br>
          Недостатки: дороговизна при малых партиях.
        </p>
        <p class="paragraph">
          <div class="needle needle__paragraph"></div>
          Трансфер<br>
          При таком методе нанесения логотипа изображение печатают на специальной бумаге и<br>
          переносят на необходимую поверхность (термоперенос).<br>
          Преимущества: очень качественная картинка, возможно нанесение на любое место.<br>
          Недостатки: сложноконтролируемый процесс,<br>
          который может привести к неполному совпадению цветов.
        </p>
        <p class="paragraph">
          <div class="needle needle__paragraph"></div>
          Вышивка<br>
          Наиболее популярный и оптимальный способ нанесения логотипа.<br>
          Достоинства: долговечность, надежность, красочность, престиж.<br>
          Недостатки: применим не для всех тканей.
        </p>
        <div class="row__caption row__caption-split">
          <div class="name"></div>
          <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>
        </div>
        <p class="paragraph paragraph-bottom">
          Для каждого проекта подбирается свой тип ткани и технологии<br>
          специалисты DitzDesigne обязательно подскажут Вам лучший вариант.<br>
          Звоните, пишите Whatsapp +7 913 704-77-78 или<br>
          на почту
          <a href="mailto:ditzdesigne@mail.ru">
            ditzdesigne@mail.ru
          </a>
        </p>
        <p class="paragraph paragraph-bottom paragraph-right">
          «Когда в магазине тебя встречает сотрудник<br>
          в безупречной униформе,<br>
          разработанной в фирменном стиле сети,<br>
          то понимаешь, что это и есть тот<br>
          ненавязчивый безупречный сервис и качество»
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

export default () => new TechnologiesPageView().element;
