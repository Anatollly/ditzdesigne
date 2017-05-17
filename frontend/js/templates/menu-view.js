import {menuData, linksData} from '../data/data';
import Controller from '../controller';

const contr = new Controller();
console.log(contr);
console.log(window.history.state);

window.onpopstate = () => {
  console.log('popstate');
};

const wrapperMenu = document.querySelector('.wrapper-menu');
const content = document.querySelector('.content');
let itemMenu;
let subMenu;
let subItemMenu;

console.log(window.location);
console.log(window.location.pathname);

const getPage = () => {
  content.innerHTML = linksData[window.location.hash.slice(1)];
};

const setHash = (hash) => {
  window.location.hash = hash;
  getPage();
};

const addLinks = (element, hash) => {
  element.addEventListener('click', (e) => {
    contr.hash = hash;
    e.stopPropagation();
  });
};

export default () => {
  for (let i in menuData) {
    if (menuData.hasOwnProperty(i)) {
      itemMenu = document.createElement('div');
      itemMenu.innerHTML = linksData[i];
      addLinks(itemMenu, i);
      if (menuData[i].length > 0) {
        subMenu = document.createElement('ul');
        for (let k of menuData[i]) {
          subItemMenu = document.createElement('li');
          subItemMenu.innerHTML = linksData[k];
          addLinks(subItemMenu, k);
          subMenu.appendChild(subItemMenu);
        }
        itemMenu.appendChild(subMenu);
      }
      wrapperMenu.appendChild(itemMenu);
    }
  }
};
