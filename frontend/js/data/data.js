
export const menuData = {
  aboutUs: ['quality', 'branding'],
  portfolio: [],
  services: ['uniforms', 'devDesign', 'depSpec', 'howToMakeAnOrder'],
  materials: ['textile', 'decor'],
  contacts: [],
};

export const linksData = {
  main: 'Главная',
  aboutUs: 'О нас',
  portfolio: 'Портфолио',
  services: 'Услуги',
  materials: 'Ткани и технологии',
  contacts: 'Контакты',
  quality: 'Гарантия качества',
  branding: 'Брендирование',
  uniforms: 'Униформа на заказ',
  devDesign: 'Разработка дизайна',
  depSpec: 'Выезд специалиста',
  howToMakeAnOrder: 'Как сделать заказ',
  textile: 'Текстиль для ресторана',
  decor: 'Декор текстильный',
  phone: '+7-913-123-45-67',
  phone2: '+7-913-987-65-43',
  address: 'ул. Красный проспект, д.220',
};


let albumDataVar;
let imagesDataVar;

export class AppData {

  set albums(data) {
    albumDataVar = data;
  }

  get albums() {
    return albumDataVar;
  }

  set images(data) {
    imagesDataVar = data;
  }

  get albums() {
    return imagesDataVar;
  }
}
