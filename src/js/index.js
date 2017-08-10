var loadPage = function() {
  uploadBg();
};

var api = {
  url : "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=bce6a5153199d7ab52d017e628b2fea1&per_page=10&format=json&nojsoncallback=1&api_sig=e1e396c61417d182bbf4d2f7691ceb9d"
};

var uploadBg = function() {
  $.getJSON(api.url, function (response) {
    dynamicPhoto(response.photos.photo);
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
