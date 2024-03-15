const date = new Date();
const getY = date.getFullYear().toString();
const getM = (date.getMonth()+1) < 10 ? '0'+((date.getMonth()+1).toString()) : (date.getMonth()+1).toString();
const getD = (date.getDate()-1).toString();
const startDt = getY+getM+getD;
const startHh = date.getHours().toString();
const endDt = getY+getM+((date.getDate()-1).toString());
const endHh = (date.getHours()+1).toString();
console.log(
  startDt,
  startHh,
  endHh
  );

var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1360000/AsosHourlyInfoService/getWthrDataList';
// var url = 'http://apis.data.go.kr/1360000/TourStnInfoService1';
const sKey = '0uXFwGZMS%2FfWS0yaupjnfKe3I03i4B%2F8QUYmt5yvFI6zXh7XS5nM4fYeSn6BpcbzbHrYJkfdHdLMSLlvD8sObg%3D%3D';
// const sKey = '0uXFwGZMS/fWS0yaupjnfKe3I03i4B/8QUYmt5yvFI6zXh7XS5nM4fYeSn6BpcbzbHrYJkfdHdLMSLlvD8sObg==';



var queryParams = '?' + encodeURIComponent('serviceKey') + '='+sKey;
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
queryParams += '&' + encodeURIComponent('dataCd') + '=' + encodeURIComponent('ASOS');
queryParams += '&' + encodeURIComponent('dateCd') + '=' + encodeURIComponent('HR');
queryParams += '&' + encodeURIComponent('startDt') + '=' + encodeURIComponent(startDt);
queryParams += '&' + encodeURIComponent('startHh') + '=' + encodeURIComponent(startHh);
queryParams += '&' + encodeURIComponent('endDt') + '=' + encodeURIComponent(endDt);
queryParams += '&' + encodeURIComponent('endHh') + '=' + encodeURIComponent(endHh);
queryParams += '&' + encodeURIComponent('stnIds') + '=' + encodeURIComponent('108');
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
  if (this.readyState == 4) {
    console.log(this);
    document.querySelector('#weatherData').innerHTML = 
      'Status: '+this.status+
      '<br>nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+
      '<br>nBody: '+this.responseText;
  }
};

xhr.send('');

