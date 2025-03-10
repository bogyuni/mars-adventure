const pixelRoot = './assets/pixel/';

const pixelData = {
  // Hero
  rocketFire: 'rocket-fire3.html',
  rocketObj: 'rocket-obj4.html',
  rover: 'rover2.html',
  roverWheel: 'rover-wheel2.html',
  roverLight: 'rover-light.html',
  manFront: 'man-front.html',
  manSide: 'man-side.html',
  manBack: 'man-back.html',

  // Weather
  clear: 'w-clear.html',
  cloud: 'w-cloud.html',
  rain: 'w-rain.html',
  snow: 'w-snow.html',

  // Background
  ground: 'bg-ground4.html',
  rock1: 'bg-rock1.html',
  rock2: 'bg-rock2.html',
  portfolioInBG: 'portfolio-inbg.html',

  // structure
  aboutme: 'aboutme2.html',
  aboutmeOutline: 'aboutme-outline.html',
  portfolio: 'portfolio2.html',
  portfolioOutline: 'portfolio-outline.html',
  guestbook: 'guestbook.html',
  guestbookOutline: 'guestbook-outline.html',
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