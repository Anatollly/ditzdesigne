// import showMenu from './templates/menu-view';
// import Slider from './templates/slider-view';
// import albumView from './templates/album-view';
import imageView from './templates/image-view';
import mainSliderView from './templates/main-slider-view';
import allAlbumsView from './templates/all-albums-view';
import {sliderData, galleryData, imageData} from './data/data';


//
// showMenu();
//

const rightPictures = document.querySelector('.rightPictures');
const backButton = document.querySelector('.row-4 .row__caption .name');
const albumBox = document.querySelector('.row-4 .row__image');
const screenImage = document.querySelector('.screenImage');

document.querySelector('.row-1 .row__content').insertBefore(mainSliderView(sliderData), rightPictures);

document.querySelector('.row-2 .row__image').appendChild(imageView(imageData.row2));
document.querySelector('.row-3 .row__image').appendChild(imageView(imageData.row3));

albumBox.appendChild(allAlbumsView(galleryData));
backButton.addEventListener('click', () => {
  albumBox.innerHTML = '';
  screenImage.innerHTML = '';
  albumBox.appendChild(allAlbumsView(galleryData));
});


// class Zero {
//
//   constructor(name) {
//     console.log('Zero-constructor-start');
//     this.name = name;
//     console.log('Zero-constructor-end');
//   }
//
//   getLog() {
//     console.log('Zero-getLog-start');
//     console.log('my name ' + this.name);
//     console.log(this.getAddLog());
//     console.log('Zero-getLog-end');
//   }
//
//   // getAddLog() {
//   //
//   // }
// }
//
// class First extends Zero {
//
//   constructor(name, years) {
//     console.log('First-constructor-start');
//     super(name);
//     console.log('First-constructor-afterSuper');
//     this.years = years;
//     console.log('First-constructor-end');
//   }
//
//   getAddLog() {
//     console.log('First-getAddLog-start');
//     return this.years + ' years old and I ' + this.getSuperAddLog();
//   }
//
// }
//
// class Second extends First {
//
//   constructor(name, years) {
//     console.log('Second-constructor-start');
//     super(name, years);
//     console.log('Second-constructor-afterSuper');
//     this.sentiment = 'happy';
//     console.log('Second-constructor-end');
//   }
//
//   getSuperAddLog() {
//     console.log('Second-getSuperAddLog-start');
//     return this.sentiment;
//   }
// }
//
// const myClass = new Second('mike', '30');
//
// console.log(myClass);
//
// myClass.getAddLog();
