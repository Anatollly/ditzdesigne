import Application from './application';

const logoMain = document.querySelector('.logo_main');
const aboutUs = document.querySelector('.aboutUs');
const portfolio = document.querySelector('.portfolio');
const services = document.querySelector('.services');
const technologies = document.querySelector('.technologies');
const contacts = document.querySelector('.contacts');

Application.showMainPage();

logoMain.addEventListener('click', Application.showMainPage);
aboutUs.addEventListener('click', Application.showAboutUsPage);
portfolio.addEventListener('click', Application.showPortfolioPage);
services.addEventListener('click', Application.showServicePage);
technologies.addEventListener('click', Application.showTechnologiesPage);
contacts.addEventListener('click', Application.showContactsPage);
