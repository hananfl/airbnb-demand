var map,
    heatmap,
    locations = {
        1: 'new york',
        2: 'miami',
        3: 'london'
    },
    coordinations = {
        1: { lat: 40.754932, lng: -73.984016 },
        2: { lat: 25.761681, lng: -80.191788 },
        3: { lat: 51.508530, lng: -0.076132 }
    };

function receiveListings() {
    var url  = '/listings?' + requestData();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            updateHeatMap(JSON.parse(xmlhttp.response));
            showMap();
        }
    };

    xmlhttp.send();
}

function requestData() {
    var queryString = '';
    queryString += 'location=' + locations[document.getElementsByClassName('location-select')[0].value];
    queryString += '&start_date=' + document.getElementsByClassName('month-select')[0].value;
    return queryString;
}

function initMap() {
    map     = newMap(coordinations[1].lat, coordinations[1].lng);
    heatmap = newHeatMap([], map);
}

function newMap(latitude, longitude) {
    return new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: latitude, lng: longitude },
        mapTypeId: 'satellite'
    });
}

function newHeatMap(data, map) {
    return new google.maps.visualization.HeatmapLayer({
        data: data,
        map:  map
    });
}

function updateHeatMap(data) {
    var heatMapData = [];

    for ( var listingId in data ) {
        var latitude  = data[listingId].property.latitude;
        var longitude = data[listingId].property.longitude;
        heatMapData.push({ location: new google.maps.LatLng(latitude, longitude), weight: data[listingId].demand });
    }

    var $locationSelect = document.getElementsByClassName('location-select')[0];
    var center = {
        lat: coordinations[$locationSelect.value].lat,
        lng: coordinations[$locationSelect.value].lng
    };
    map     = newMap(center.lat, center.lng);
    heatmap = newHeatMap(new google.maps.MVCArray(heatMapData), map);
    heatmap.setMap(map);
}

function showMap() {
    var $map = document.getElementById('map');
    $map.style.display  = 'block';
}