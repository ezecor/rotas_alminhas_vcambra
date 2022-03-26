var osm_mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var osm_topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
var map = L.map('map', {
    center: [40.85, -8.41],
    zoom: 12,
    layers: [osm_mapnik]
});
var baseMaps = {
    "OpenStreetMap": osm_mapnik,
    "OpenTopoMap": osm_topo,
    "Satélite": Esri_WorldImagery
};
L.control.layers(baseMaps, null, {
    collapsed: false
}).addTo(map);
L.control.scale({
    position: 'bottomleft',
    imperial: false
}).addTo(map);
map.attributionControl.setPrefix(
    '&copy; <a href="https://sites.google.com/view/fmtcultura/projeto">Projecto Alminhas</a>' + ' &copy; Mapa Interactivo: <a href="mailto:ezcorreia@gmail.com">Ezequiel Correia</a> | &copy; PR1: <a href="https://www.cm-valedecambra.pt/pages/505">CM Vale de Cambra</a> | <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
);
var lc = L.control.locate({
    strings: {
        title: "A minha posição!"
    },
    locateOptions: {
               maxZoom: 15
    }
});
lc.addTo(map);
var elevation_options = {
    theme: "ec-theme",
    title: "qqq",
    detached: false,
    elevationDiv: "#elevation-div",
    autohide: false,
    collapsed: true,
    position: "bottomleft",
    followMarker: true,
    autofitBounds: true,
    imperial: false,
    reverseCoords: false,
    acceleration: false,
    slope: "summary",
    speed: false,
    time: false,
    distance: true,
    altitude: true,
    summary: 'line',
    downloadLink: false,
    ruler: true,
    legend: false,
    almostOver: true,
    distanceMarkers: true,
    yAxisMin: 200,
    waypoints: true,
    wptIcons: {
      '': L.divIcon({
            className: 'elevation-waypoint-marker',
            html: '<i class="elevation-waypoint-icon"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 30] //[4, 15] //[8, 30]
      }),
      'alm': L.divIcon({
            className: 'elevation-waypoint-marker',
            html: '<i class="elevation-waypoint-icon alm"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 30] //[8, 30]
      }),
      'start': L.divIcon({
            className: 'elevation-waypoint-marker',
            html: '<i class="elevation-waypoint-icon start"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 30] //[8, 30]
      }),
      'end': L.divIcon({
            className: 'elevation-waypoint-marker',
            html: '<i class="elevation-waypoint-icon end"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 30] //[8, 30]
      })

    },
    wptLabels: true,
    preferCanvas: true,
};
var mylocale = {
    "Total Length: ":"Dist. total: ",
    "Max Elevation: ":" Alt. max: ",
    "Min Elevation: ":" Alt. min: ",
    "Total Ascent: ":" D+ ",
    "Total Descent: ":" D- ",
    "Elevation" : "Perfil",
    "y:" : "Alt: ",
    "x:" : "Dist: ",
    "m:" : "Dec: ",
};
L.registerLocale('pt', mylocale);
L.setLocale('pt');
var controlElevation = L.control.elevation(elevation_options).addTo(map);
controlElevation.load("data/alminhas_pr1_vcambra.gpx");