import hashController from './controller';

const mainElement = document.querySelector('.content');

export const getImageS = (data, name = '') => {
  const ulImage = document.createElement('ul');
  data.forEach((img, i) => {
    let liImage = document.createElement('li');
    ulImage.appendChild(liImage);
    let image = new Image();
    image.onload = () => {
      liImage.innerHTML = name[i] || '';
      liImage.appendChild(image);
    };
    image.onerror = () => {
      liImage.innerHTML = `Error: image-${img} load failure!`;
    };
    image.src = img;
  });
  return ulImage;
};

export const getElementFromTemplate = (nodeElement) => {
  let node = document.createElement('span');
  let trimElement = nodeElement.trim();
  node.innerHTML = trimElement;
  return node;
};

export const displayElement = (element) => {
  mainElement.innerHTML = '';
  mainElement.appendChild(element);
};

export const getImageName = (stringPath) => (
  decodeURIComponent(stringPath).match(/([^\/]*.[jpg|png|jpeg])$/)[1]
);

export const getAlbumName = (stringPath) => (
  decodeURIComponent(stringPath.match(/\/([^\/]*)\/[^\/]*$/)[1])
);

export const goToPage = (page) => {
  hashController().hash = page;
};
