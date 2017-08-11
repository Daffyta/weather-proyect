
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
