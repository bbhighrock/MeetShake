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
