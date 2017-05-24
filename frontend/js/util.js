import 'whatwg-fetch';

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
      liImage.innerHTML = `Error: image-${i + 1} load failure!`;
    };
    image.src = './img/' + img;
  });
  return ulImage;
};

export const getElementFromTemplate = (nodeElement) => {
  let node = document.createElement('span');
  let trimElement = nodeElement.trim();
  node.innerHTML = trimElement;
  return node;
};

const mainElement = document.querySelector('.content');

export const displayElement = (element) => {
  mainElement.innerHTML = '';
  mainElement.appendChild(element);
};

export const getDataFromServer = () => {
  let dataImg = [];
  window.fetch('./data').
      then(status).
      then((response) => response.json()).
      then((data) => {
        console.log(data);
        dataImg = data;
      }).
      catch(() => {
        console.log('error');
      });
  return dataImg;
};
