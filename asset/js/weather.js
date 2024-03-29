import { pixelData, pixelDataLoad } from "./pixel.js";

const weather = document.querySelector('#weather');

/**
 * weather code
 * @param {*} code
 * 2xx : Thunderstorm 뇌우
 * 3xx : Drizzle 이슬비
 * 5xx : Rain 비
 * 6xx : Snow 눈
 * 7xx : Atmosphere 안개
 * 800 : Clear 맑음
 * 8xx : Clouds 구름
 */
function weatherDisplay(code) {
  if (code > 800) {
    console.log(code+' : 구름');
    pixelDataLoad(pixelData.cloud, weather);
  }
  else if (code >= 200 && code < 300) {
    console.log(code+' : 뇌우');
    pixelDataLoad(pixelData.rain, weather);
  }
  else if (code >= 300 && code < 400) {
    console.log(code+' : 이슬비');
    pixelDataLoad(pixelData.rain, weather);
  }
  else if (code >= 500 && code < 600) {
    console.log(code+' : 비');
    pixelDataLoad(pixelData.rain, weather);
  }
  else if (code >= 600 && code < 700) {
    console.log(code+' : 눈');
    pixelDataLoad(pixelData.snow, weather);
  }
  else if (code >= 700 && code < 800) {
    console.log(code+' : 안개');
    pixelDataLoad(pixelData.cloud, weather);
  }
  else {
    console.log(code+' : 맑음');
    pixelDataLoad(pixelData.clear, weather);
  }
}

const API_KEY = '652eb13f28a2b10354f103edee6fd79b';

const getWeather = (lat, lon) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const temperature = json.main.temp;
    const place = json.name;
    const description = json.weather[0].description;
    const id = json.weather[0].id;
    document.querySelector('#weatherData').innerHTML = `온도: ${temperature} // 지역: ${place} // 날씨: ${description} // 아이디: ${id}`;
    // weatherDisplay(id);
    weatherDisplay(500);
  })
  .catch((error) => {
    alert(error);
  });
}

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}
const fail = () => {
  alert("좌표를 받아올 수 없음");
}

navigator.geolocation.getCurrentPosition(success, fail);