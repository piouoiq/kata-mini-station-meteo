let inputCity = document.getElementById("cityInput");
let cityOutput = document.getElementById("city");
let gpsOutput = document.getElementById("gps");
let temperatureOutput = document.getElementById("temperature");
let submitButton = document.getElementById("submitBtn");

submitButton.addEventListener("click", () => {
  let cityName = inputCity.value;
  cityOutput.textContent = cityName;
  fetchCoordinates(cityName);
});

async function fetchCoordinates(cityName) {
  const url = "https://nominatim.openstreetmap.org/search?";
  try {
    param = new URLSearchParams({
      q: cityName,
      format: "json",
      limit: 1,
    });

    const response = await fetch(url + param.toString());
    const data = await response.json();
    console.log(data);

    let lat = data[0].lat;
    let lon = data[0].lon;
    gpsOutput.textContent = `Latitude: ${lat}, Longitude: ${lon}`;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
}
