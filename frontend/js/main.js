import Application from './application';

const logoMain = document.querySelector('.logo_main');
const portfolio = document.querySelector('.portfolio');

Application.showMainPage();

logoMain.addEventListener('click', Application.showMainPage);
portfolio.addEventListener('click', Application.showPortfolioPage);
