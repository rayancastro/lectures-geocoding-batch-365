import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const buildMap = () => {
  return (
    new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/rayancastro/cjw99aj4q11j51cm5q1ibork0'
    })
  )
}

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 140, maxZoom: 15, duration: 5000 });
}

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
  const popup = new mapboxgl.Popup().setHTML(marker.infoWindow); // add this

  // Create a HTML element for your custom marker
  const element = document.createElement('div');
  element.className = 'marker';
  element.style.backgroundImage = `url('${marker.image_url}')`;
  element.style.backgroundSize = 'contain';
  element.style.width = '25px';
  element.style.height = '25px';

  new mapboxgl.Marker(element)
    .setLngLat([ marker.lng, marker.lat ])
    .setPopup(popup)
    .addTo(map);
  });
}

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const markers = JSON.parse(mapElement.dataset.markers);


    const map = buildMap();
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);

    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
                                      mapboxgl: mapboxgl }));
  }
};

export { initMapbox };
