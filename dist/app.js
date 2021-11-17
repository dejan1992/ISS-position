let lat = document.getElementById('lat');
let lon = document.getElementById('lon');
let alt = document.getElementById('alt');
let vel = document.getElementById('vel');
let vis = document.getElementById('vis');
let sLat = document.getElementById('s-lat');
let sLon = document.getElementById('s-lon');

//map boxes

const basicMap = document.querySelector('.basic');
const pastelMap = document.querySelector('.pastel');
const outdoorMap = document.querySelector('.outdoor');
const voyagerMap = document.querySelector('.voyager');
const hybridMap = document.querySelector('.hybrid');

//map types

//basic map
basicMap.addEventListener('click', (e) => {
  if (e.target.parentElement.className === 'basic') {
    tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  }
  tiles = L.tileLayer(tileURL, { attribution }).addTo(mymap);
  e.preventDefault();
})

//pastel map
pastelMap.addEventListener('click', (e) => {
  if (e.target.parentElement.className === 'pastel') {
    tileURL = 'https://api.maptiler.com/maps/pastel/256/{z}/{x}/{y}.png?key=D9wD0YekNQcQMm1QSyBH';
    attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
  }
  tiles = L.tileLayer(tileURL, { attribution }).addTo(mymap);
  e.preventDefault();
})

//outdoor map
outdoorMap.addEventListener('click', (e) => {
  if (e.target.parentElement.className === 'outdoor') {
    tileURL = 'https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=D9wD0YekNQcQMm1QSyBH';
    attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
  }
  tiles = L.tileLayer(tileURL, { attribution }).addTo(mymap);
  e.preventDefault();
})

//voyager map
voyagerMap.addEventListener('click', (e) => {
  if (e.target.parentElement.className === 'voyager') {
    tileURL = 'https://api.maptiler.com/maps/voyager/{z}/{x}/{y}.png?key=D9wD0YekNQcQMm1QSyBH';
    attribution = '<a href="https://carto.com/" target="_blank">&copy; CARTO</a> <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
  }
  tiles = L.tileLayer(tileURL, { attribution }).addTo(mymap);
  e.preventDefault();
})

//hybrid map
hybridMap.addEventListener('click', (e) => {
  if (e.target.parentElement.className === 'hybrid') {
    tileURL = 'https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=D9wD0YekNQcQMm1QSyBH';
    attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
  }
  tiles = L.tileLayer(tileURL, { attribution }).addTo(mymap);
  e.preventDefault();
})


// GET Map
//Basic Map is default
let mymap = L.map('map').setView([0, 0], 2);
let tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

let tiles = L.tileLayer(tileURL, { attribution }).addTo(mymap);

// Icon
let issIcon = L.icon({
  iconUrl: './img/PikPng.com_space-station-png_859150.PNG',
  iconSize: [50, 42],
  iconAnchor: [25, 21]
});

let marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

//get iss
const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS() {
  const response = await fetch(iss_url)
  const data = await response.json();
  const { latitude, longitude, altitude, velocity, visibility, solar_lat, solar_lon } = data;
  marker.setLatLng([latitude, longitude]);
  mymap.setView([latitude, longitude])

  lat.textContent = latitude.toFixed(2);
  lon.textContent = longitude.toFixed(2);
  alt.textContent = altitude.toFixed(2);
  vel.textContent = velocity.toFixed(2);
  vis.textContent = visibility;
  sLat.textContent = solar_lat.toFixed(2);
  sLon.textContent = solar_lon.toFixed(2);
};

getISS();
setInterval(getISS, 1500);
