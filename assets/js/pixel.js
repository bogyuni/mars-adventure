const pixelRoot = './assets/pixel/';

const pixelData = {
  // Hero
  rocketFire: 'rocket-fire3.html',
  rocketObj: 'rocket-obj4.html',
  rover: 'rover2.html',
  roverWheel: 'rover-wheel2.html',
  roverLight: 'rover-light.html',

  // Weather
  clear: 'w-clear.html',
  cloud: 'w-cloud.html',
  rain: 'w-rain.html',
  snow: 'w-snow.html',

  // Background
  ground: 'bg-ground2.html',
  rock1: 'bg-rock1.html',
  rock2: 'bg-rock2.html',

  // structure
  aboutme: 'aboutme.html',
  portfolio: 'portfolio2.html',
  portfolioHover: 'portfolio-hover.html',
  guestbook: 'guestbook.html',
  guestbookHover: 'guestbook-hover.html',
}

const pixelDataLoad = (uri, obj, custom) => {
  fetch(pixelRoot + uri, {method:'get'})
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    obj.insertAdjacentHTML('beforeend', text);
    if (custom) {
      const className = custom.split(' ');
      obj.lastChild.classList.add(...className);
    }
  })
  .catch((error) => {
    console.log('error: '+error);
  });
};

export { pixelData, pixelDataLoad };

console.log('Module loaded - pixel data');