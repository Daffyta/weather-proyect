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
				var weatherWeekly = response.currently.daily;
				console.log(weatherWeekly);
        forecast(weather);
        container(response);
				forecastWeekly(weatherWeekly);
				containerWeekly(response);
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

function container(response){
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

function forecastWeekly(weatherWeekly){
	var $seccionW = $("#weekly");
	// weatherWeekly.forEach(function(data){
	// console.log($seccionW);
		var $iconW = $("<img/>",{"src":"assets/img/iconos/clear-day.png", "alt":"iconWeather"});
		var $day = $("<p/>", {"class": "day"});
		var $temperatureMin = $("<p/>", {"class":"temperatureMin"});
		var $temperatureMax = $("<p/>", {"class":"temperatureMax"});

		$seccionW.append($iconW);
		$seccionW.append($day);
		$seccionW.append($temperatureMin);
		$seccionW.append($temperatureMax);
	// });
};

function containerWeekly(response){
  var template =
    '<div class="container">'
			+'<div class="weather-indicator-weekly row">'
      	+'<img src="assets/img/iconos/clear-day.png" alt="iconWeather" width="25px">'
				+'<span class="day">_day_</span>'
				+'<span class="temperatureMin">_temperatureMin_</span>'
				+'<span class="temperatureMax">_temperatureMax_</span>'
      +'</div>'
    +'</div>';

  var $fullContainerW = $("#weekly");
	// console.log($fullContainerW);
  $fullContainerW.html(
    template.replace("_day_",response.daily.data[1].time)
  	.replace("_temperatureMin_",response.daily.data[1].temperatureMin)
		.replace("_temperatureMax_",response.daily.data[1].temperatureMax)
  );
	// console.log(template);
};

$(document).ready(loadWeather);
