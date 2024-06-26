const pixelRoot = './assets/pixel/';

const pixelData = {
  // Hero
  rocketFire: 'rocket-fire.html',
  rocketObj: 'rocket-obj.html',
  rover: 'rover.html',
  roverWheel: 'rover-wheel.html',

  // Weather
  clear: 'w-clear.html',
  cloud: 'w-cloud.html',
  rain: 'w-rain.html',
  snow: 'w-snow.html',

  // Background
  ground: 'bg-ground.html',
  rock1: 'bg-rock1.html',
  rock2: 'bg-rock2.html',

  // structure
  aboutme: 'aboutme.html',
  portfolio: 'portfolio.html',
}

const pixelDataLoad = (uri, obj, custom) => {
  fetch(pixelRoot + uri, {method:'get'})
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

console.log('Module loaded - pixel data');