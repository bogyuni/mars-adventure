const API_KEY = '652eb13f28a2b10354f103edee6fd79b';
const getWeather = (lat, lon) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    const temperature = json.main.temp;
    const place = json.name;
    const description = json.weather[0].description;

    document.querySelector('#weatherData').innerHTML = `${temperature} // ${place} // ${description}`
  })
  .catch((error) => {
    alert(error);
  });
}

const success = (position) => {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}
const fail = () => {
  alert("좌표를 받아올 수 없음");
}


navigator.geolocation.getCurrentPosition(success, fail);
