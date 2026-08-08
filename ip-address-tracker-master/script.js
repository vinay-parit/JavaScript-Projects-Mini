const apiKey = "at_EHxil6VCkfZZiCV0YJd6Vw3AhG8fa";

// Get DOM elements
const input = document.getElementById("ip-input");
const searchBtn = document.getElementById("search-btn");

const ipDisplay = document.getElementById("ip-address");
const locationDisplay = document.getElementById("location");
const timezoneDisplay = document.getElementById("timezone");
const ispDisplay = document.getElementById("isp");

// Initialize the map
const map = L.map("map").setView([51.505, -0.09], 13);

// Add tile layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let marker; // Store the marker to update later

// Function to fetch IP data and update map/UI
function getIPData(ip) {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`
  )
    .then((response) => response.json())
    .then((data) => {
      const { ip, isp, location } = data;
      const { lat, lng, city, country, timezone } = location;

      // Update UI
      ipDisplay.textContent = ip;
      locationDisplay.textContent = `${city}, ${country}`;
      timezoneDisplay.textContent = `UTC ${timezone}`;
      ispDisplay.textContent = isp;

      // Update map
      map.setView([lat, lng], 13);

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }

      marker.bindPopup(`<b>${ip}</b><br>${city}, ${country}`).openPopup();
    })
    .catch((err) => {
      alert("Invalid IP address or network issue.");
      console.error(err);
    });
}

// Event listener
searchBtn.addEventListener("click", () => {
  const ip = input.value.trim();
  if (ip) {
    getIPData(ip);
  } else {
    alert("Please enter an IP address or domain.");
  }
});

// OPTIONAL: load user's IP info on page load
window.addEventListener("load", () => {
  getIPData(""); // empty ip = your own IP
});
