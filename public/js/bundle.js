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
        container(response);


				var weatherWeekly = response.daily.data;
					weatherWeekly.forEach(function(response){
						containerWeekly(response);
					});
    });
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
    template.replace("_icon_",response.currently.icon)
		.replace("_temperature_",response.currently.apparentTemperature)
    .replace("_wind_", response.currently.windSpeed)
    .replace("_humidity_", response.currently.humidity)
    .replace("_uvIndex_", response.currently.uvIndex)
    .replace("_pressure_",response.currently.pressure)
  );
};

var template =
 '<div class="container">'
	 +'<div class="weather-indicator-weekly row">'
		 +'<img src="assets/img/iconos/clear-day.png" alt="iconWeather" class="col s1" width="100px">'
		 +'<span class="day col s5 format">_day_</span>'
		 +'<span class="temperatureMin col s3 format">_temperatureMin_ °</span>'
		 +'<span class="temperatureMax col s3 format">_temperatureMax_ °</span>'
	 +'</div>'
 +'</div>';

function containerWeekly(response){

  var $fullContainerW = $("#weekly");
		$fullContainerW.append(
		template.replace("_day_",response.time)
  	.replace("_temperatureMin_",response.temperatureMin)
		.replace("_temperatureMax_",response.temperatureMax)
  	);
};

$(document).ready(loadWeather);


var loadPage = function() {
  uploadBg();
};

var api = {
  url : "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=f94100e7273cf0613b828721c463b610&per_page=10&format=json&nojsoncallback=1&api_sig=398928acc5ae3f4d558d09fa901b8738"
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
