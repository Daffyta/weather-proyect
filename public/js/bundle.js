var loadWeather = function(){
	weatherIndicator();
};

var weatherIndicator = function() {

  var apiKey = '380b8fe1ed7812e2e4c1b9171deb4352';
  var url = 'https://api.forecast.io/forecast/';
  var lati = 37.8267;
  var longi = -122.4233;
  var data;

    $.getJSON(url + apiKey + "/" + lati + "," + longi + "?callback=?",
      function (response) {
        console.log(response);
        var weather = response.currently;
				var weatherWeekly = response.daily.data;
				console.log(weatherWeekly);
        forecast(weather);
        container(response);
    });
};

function forecast(weather) {
  var $seccion = $("#weather-forecast");
  var $icon = $("<img/>",{"src":"assets/img/iconos/clear-day.png", "alt":"iconWeather"});
  var $temperature = $("<p/>", {"class":"temperature"});
  var $wind = $("<p/>", {"class":"wind"});
  var $humidity = $("<p/>", {"class":"humidity"});
  var $uvIndex = $("<p/>", {"class":"uvIndex"});
  var $pressure = $("<p/>", {"class":"pressure"});

  $seccion.append($icon);
  $seccion.append($temperature);
  $seccion.append($wind);
  $seccion.append($humidity);
  $seccion.append($uvIndex);
  $seccion.append($pressure);
};


function container(response) {
  var template =
    '<div class="container">'
			+'<div class="weather-indicator ">'
      	+'<img src="assets/img/iconos/clear-day.png" alt="iconWeather">'
			+"</div>"
      +'<div class="col s12">'
        +'<h2 class="center">_temperature_°F</h2>'
      +'</div>'
      +'<div class="row">'
        +'<h5 class="col s6"> Wind </h5>' + '<h5 class="col s6 right-align">_wind_ m/s</5>'
      +'</div>'
      +'<div class="row">'
        +'<h5 class="col s6"> Humidity </h5>' + '<h5 class="col s6 right-align">_humidity_ %</5>'
      +'</div>'
      +'<div class="row">'
        +'<h5 class="col s6"> UV Index </h5>' + '<h5 class="col s6 right-align">_uvIndex_</5>'
      +'</div>'
      +'<div class="row">'
        +'<h5 class="col s6"> Pressure </h5>' + '<h5 class="col s6 right-align">_pressure_ hPa</5>'
      +'</div>'
    +'</div>';
  var $fullContainer = $("#weather-forecast");

  $fullContainer.html(
    template.replace("_temperature_",response.currently.apparentTemperature)
    .replace("_wind_", response.currently.windSpeed)
    .replace("_humidity_", response.currently.humidity)
    .replace("_uvIndex_", response.currently.uvIndex)
    .replace("_pressure_",response.currently.pressure)
  );
};

$(document).ready(loadWeather);


var loadPage = function() {
  uploadBg();
};

var api = {
  url : "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=f78755583fac5d9ece56b77eb3dd331e&per_page=10&format=json&nojsoncallback=1&api_sig=e417cd5be87e286b65e45a4c516b8190"
};

var uploadBg = function() {
  $.getJSON(api.url, function (response) {
    dynamicPhoto(response.photos.photo);
    console.log(response);
  });
};

function dynamicPhoto(photos) {
  setInterval(function() {

    var photoId = Math.floor(Math.random() * (9 - 0) + 0);
    var photo = photos[photoId];

    var photoUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
    var backgroundUrl = 'url(' + photoUrl + ')';

    $("#bg-flickr").css('background-image', backgroundUrl);

  }, 5000);
};

$(document).ready(loadPage);
