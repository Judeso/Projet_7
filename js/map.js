// Carte Gmap velo'v

function initMap() {
    var lyon = {
        lat: 45.750000,
        lng: 4.850000
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: lyon,
        zoom: 15
    });

    // Marker
    var marker = new MarkerClusterer();
    marker.init();
    marker.insert();
}

