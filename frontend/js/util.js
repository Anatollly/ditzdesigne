export const getImageS = (data) => {
  const ulImage = document.createElement('ul');
  data.forEach((img, i) => {
    let liImage = document.createElement('li');
    ulImage.appendChild(liImage);
    let image = new Image();
    image.onload = () => {
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
