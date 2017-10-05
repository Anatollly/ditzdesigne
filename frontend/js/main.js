import Application from './application';
import hashController from './controller';
import {AppData} from './data/data';
import 'whatwg-fetch';

window.fetch('./images').
    then(status).
    then((response) => response.json()).
    then((data) => {
      console.log(data);
      AppData.images = data;
      // showPage();
    }).
    then(() => {
      fetch('./albums').
          then(status).
          then((response) => response.json()).
          then((data) => {
            console.log(data);
            AppData.albums = data;
            showPage();
          });
    }).
    catch(() => {
      Application.showErrorPage();
    });

// window.fetch('./albums').
//     then(status).
//     then((response) => response.json()).
//     then((data) => {
//       AppData.albums = data;
//       showPage();
//     }).
//     catch(() => {
//       Application.showErrorPage();
//     });

const checkValidHash = () => {
  try {
    let h = hashController().hash.slice(1);
    let page = 'show' + (h.charAt(0).toUpperCase() + h.slice(1)) + 'Page';
    console.log(page);
    Application[page]();
  } catch (err) {
    console.log(err);
    history.replaceState({page: 1}, '', '#/error');
    // Application.showErrorPage();
  }
};

// checkValidHash();

window.onpopstate = (e) => {
  console.log('popstate');
  checkValidHash();
};

const showPage = () => {
  if (hashController().hash) {
    checkValidHash();
  } else {
    Application.showMainPage();
  }
};


const logoMain = document.querySelector('.logo_main');
const aboutUs = document.querySelector('.aboutUs');
const portfolio = document.querySelector('.portfolio');
const services = document.querySelector('.services');
const technologies = document.querySelector('.technologies');
const contacts = document.querySelector('.contacts');

logoMain.addEventListener('click', Application.showMainPage);
aboutUs.addEventListener('click', Application.showAboutUsPage);
portfolio.addEventListener('click', Application.showPortfolioPage);
services.addEventListener('click', Application.showServicesPage);
technologies.addEventListener('click', Application.showTechnologiesPage);
contacts.addEventListener('click', Application.showContactsPage);
