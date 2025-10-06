let p = fetch(
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_EHxil6VCkfZZiCV0YJd6Vw3AhG8fa&ipAddress=8.8.8.8"
);

p.then((response)  =>{
    return response.json()
}).then((data) =>{
    console.log("city name:" , data.location.city) 
    console.log("country:", data.location.country)

})


var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup("A pretty CSS popup.<br> Easily customizable.")
  .openPopup();
