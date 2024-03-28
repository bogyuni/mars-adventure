const pixelRoot = './asset/pixel/';

const pixelData = {
  rocketFire: pixelRoot + 'rocket-fire.html',
  rocketObj: pixelRoot + 'rocket-obj.html',

  rover: pixelRoot + 'rover.html',
  roverWheel: pixelRoot + 'rover-wheel.html',

  clear: pixelRoot + 'w-clear.html',
  cloud: pixelRoot + 'w-cloud.html',
  rain: pixelRoot + 'w-rain.html',
  snow: pixelRoot + 'w-snow.html',

}

const pixelDataLoad = (uri, obj, custom) => {
  fetch(uri, {method:'get'})
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    obj.insertAdjacentHTML('beforeend', text);
    if (custom) {
      obj.lastChild.classList.add(custom);
    }
  })
  .catch((error) => {
    console.log('error: '+error);
  });
};

export { pixelData, pixelDataLoad };