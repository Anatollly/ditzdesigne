import Application from './application';
import hashController from './controller';
import {AppData} from './data/data';

window.fetch('./images').
    then(status).
    then((response) => response.json()).
    then((data) => {
      AppData.imagesData = data;
      showPage();
    }).
    catch(() => {
      Application.showErrorPage();
    });

window.fetch('./albums').
    then(status).
    then((response) => response.json()).
    then((data) => {
      AppData.albumsData = data;
    }).
    catch(() => {
      Application.showErrorPage();
    });

const checkValidHash = () => {
  try {
    let w = hashController().hash.slice(1);
    Application['show' + (w.charAt(0).toUpperCase() + w.slice(1)) + 'Page']();
  } catch (err) {
    history.replaceState({page: 1}, '', '#/error');
    Application.showErrorPage();
  }
};

window.onpopstate = (e) => {
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
