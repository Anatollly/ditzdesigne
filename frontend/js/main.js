import 'whatwg-fetch';

import Application from './application';
import hashController from './controller';
import {AppData} from './data/data';
import pages from './data/pages';
import {goToPage} from './util';

const logoMain = document.querySelector('.logo_main');
const mainMenuItems = document.querySelectorAll('.main-menu li');

logoMain.addEventListener('click', () => {
  goToPage(pages.main);
});

mainMenuItems.forEach((item) => {
  item.addEventListener('click', () => {
    goToPage(pages[item.className]);
  });
});

window.fetch('./images').
    then(status).
    then((response) => response.json()).
    then((data) => {
      AppData.images = data;
    }).
    then(() => {
      fetch('./albums').
          then(status).
          then((response) => response.json()).
          then((data) => {
            AppData.albums = data;
            showPage();
          });
    }).
    catch(() => {
      Application.showErrorPage();
    });

const checkValidHash = (url) => {
  try {
    let h = hashController().hash.slice(1);
    let page = 'show' + (h.charAt(0).toUpperCase() + h.slice(1)) + 'Page';
    Application[page]();
  } catch (err) {
    console.log('checkValidHash: ', err);
    history.replaceState({page: 1}, '', '#/error');
    goToPage(pages.error);
  }
};

// checkValidHash();

window.onpopstate = (e) => {
  console.log('onpopstate');
  checkValidHash();
};


const showPage = () => {
  if (hashController().hash) {
    checkValidHash();
  } else {
    goToPage(pages.main);
  }
};
