import hashController from './controller';

const mainElement = document.querySelector('.content');

const createImage = (srcImage, htmlTag, nameImage) => {
  const domElement = document.createElement(htmlTag);
  const image = new Image();
  image.onload = () => {
    domElement.innerHTML = nameImage || '';
    domElement.appendChild(image);
  };
  image.onerror = () => {
    domElement.innerHTML = `Error: image-${srcImage} load failure!`;
  };
  image.src = srcImage;
  return domElement;
};

export const getImageS = (data, name = '') => {
  if (data.length === 1) {
    return createImage(data[0], 'div', name);
  } else {
    const ulImage = document.createElement('ul');
    data.forEach((img, i) => {
      ulImage.appendChild(createImage(img, 'li', name[i]));
    });
    return ulImage;
  }
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
  decodeURIComponent(stringPath).match(/([^\/]*.(jpg|png|jpeg))$/)[1]
);

export const getPageName = (stringPath) => (
  decodeURIComponent(stringPath).match(/([^\/]*.).(png|jpg|jpeg)$/)[1]
);

export const getAlbumName = (stringPath) => (
  decodeURIComponent(stringPath.match(/\/([^\/]*)\/[^\/]*$/)[1])
);

export const goToPage = (page) => {
  hashController().hash = page;
};
