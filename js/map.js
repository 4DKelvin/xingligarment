// JavaScript Document
$(document).ready(function(){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://maps.google.com/maps/api/js?sensor=true&callback=initialize';
    document.body.appendChild(script);
});

function initialize() {        
    new google.maps.Geocoder().geocode({ 'latLng':new google.maps.LatLng(23.185308,113.70741)  }, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;
            var map = new google.maps.Map(document.getElementById('map_canvas'),
            {
                zoom: 17,
                center: new google.maps.LatLng(location.lat() + 0.0004, location.lng() + 0.0001 ),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
            var infowindow = new google.maps.InfoWindow({
                content: '广州增城市新塘仙村基岗村尖锋（土名）',
                position: location
            });
            infowindow.open(map);
        }
    });
}