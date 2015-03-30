/*
 * When you add a marker using a Place instead of a location, the Maps API
 * will automatically add a 'Save to Google Maps' link to any info window
 * associated with that marker.
 */

function initialize() {
  var mapOptions = {
    zoom: 17,
    center: {lat: -33.8666, lng: 151.1958}
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  var infowindow = new google.maps.InfoWindow();

  var marker = new google.maps.Marker({
    map: map,
    // Define the place with a location, and a query string.
    place: {
      location: {lat: -33.8666, lng: 151.1958},
      query: 'Google, Sydney, Australia'

    },
    // Attributions help users find your site again.
    attribution: {
      source: 'Google Maps JavaScript API',
      webUrl: 'https://developers.google.com/maps/'
    }
  });

  // Construct a new InfoWindow.
  var infowindow = new google.maps.InfoWindow({
    content: 'Google Sydney'
  });

  // Opens the InfoWindow when marker is clicked.
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
var map;

function LocalizeMe() {
  var mapOptions = {
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Coordonée : ' + position.coords.latitude + ' - ' + position.coords.longitude
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}
