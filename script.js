let inputCity = document.getElementById("cityInput");
let cityOutput = document.getElementById("city");
let gpsOutput = document.getElementById("gps");
let temperatureOutput = document.getElementById("temperature");
let submitButton = document.getElementById("submitBtn");
let detailSection = document.getElementById("details");

submitButton.addEventListener("click", () => {
  let cityName = inputCity.value;

  fetchCoordinates(cityName);
});

async function fetchCoordinates(cityName) {
  const url = "https://nominatim.openstreetmap.org/search?";
  try {
    let paramCoord = new URLSearchParams({
      q: cityName,
      format: "json",
      limit: 1,
    });

    const response = await fetch(url + paramCoord.toString());
    const data = await response.json();
    console.log(data);
    if (data.length === 0) {
      cityOutput.textContent = "Ville non trouvée.";
      gpsOutput.textContent = "Veuillez vérifier le nom de la ville.";
      temperatureOutput.style.display = "none";
      detailSection.style.display = "none";
      return;
    } else {
      cityOutput.textContent = cityName;
      let lat = data[0].lat;
      let lon = data[0].lon;
      temperatureOutput.style.display = "block";
      detailSection.style.display = "block";
      gpsOutput.textContent = `Latitude: ${lat}, Longitude: ${lon}`;
      fetchWeather(lat, lon);
    }
  } catch (error) {
    gpsOutput.innerText = "Erreur de récupération des coordonnées.";
  }
}

async function fetchWeather(lat, lon) {
  const url = "https://api.open-meteo.com/v1/forecast?";
  try {
    let paramWeather = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current_weather: true,
    });

    const response = await fetch(url + paramWeather.toString());
    const data = await response.json();
    console.log(data);

    let temperature = data.current_weather.temperature;
    temperatureOutput.textContent = `${temperature}°C`;
    detailSection.innerText = "Temperature actuelle";
  } catch (error) {
    temperatureOutput.textContent =
      " Erreur de récupération de la temperature.";
  }
}
