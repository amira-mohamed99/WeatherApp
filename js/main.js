const firstCarddata = document.getElementById("firstCard");
const secondCarddata = document.getElementById("secondCard");
const thirdCarddata = document.getElementById("thirdCard");
const search = document.getElementById("search");
const form = document.getElementById("form");

async function getWeather(city = "alexandria") {
  const key = "2c32262e1bd84b5ca56162222251906";
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3&aqi=no&alerts=no`;
  let data = await fetch(url);
  let response = await data.json();
  firstCard(response);
  secondCard(response);
  thirdCard(response);
  console.log(response);
}
getWeather();
function formatDate(dateString) {
  const date = new Date(dateString);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString("en-US", { month: "long" });

  return {
    dayName: dayName,
    fullDate: `${dayNumber} ${monthName}`,
  };
}
function firstCard(array) {
  const forecastDay = array.forecast.forecastday[0];
  const { dayName, fullDate } = formatDate(forecastDay.date);
  let items = "";
  items += `  <div class="card h-100 border-0 rounded-3 firstCard" >
                <h5 class="card-header d-flex justify-content-between">
                  ${dayName} <span class="bg-transparent">${fullDate}</span>
                </h5>
                <div class="card-body">
                  <h5 class="card-title bg-transparent">${array.location.name}</h5>
                  <div class=" d-flex justify-content-around align-items-center bg-transparent">
                  <h1 class="bg-transparent text-center">${array.current.temp_c}&deg;C</h1>
                  <img src="${array.current.condition.icon}" alt="weather icon" class="bg-transparent img-fluid w-40">
                  </div>
                  <p class="card-text bg-transparent text-primary">${array.current.condition.text}</p>
                  <p class="icons bg-transparent">
                  <span><i class="fa-solid fa-umbrella"></i>  ${array.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                  <span><i class="fa-solid fa-wind"></i>  ${array.current.wind_kph}  Km/h</span>
                  <span><i class="fa-regular fa-compass"></i>  ${array.current.wind_dir}</span>
                  </p>
                </div>`;
  firstCarddata.innerHTML = items;
}
function secondCard(array) {
  const forecastDay = array.forecast.forecastday[1];
  const { dayName, fullDate } = formatDate(forecastDay.date);

  var items = "";
  items += `
  <div class="card h-100 border-0 rounded-3 secondCard" >
  <h5 class="card-header text-center"> ${dayName} </h5>
                <div class="card-body text-center">
                  <div class="cardimg bg-transparent text-primary">
                  <img src= '${array.forecast.forecastday[1].day.condition.icon}' alt="" class="bg-transparent">
                  </div>
                  <h1 class="bg-transparent m-4">${array.forecast.forecastday[1].day.maxtemp_c}&deg;</h1>
                  <h6 class="bg-transparent">${array.forecast.forecastday[1].day.mintemp_c}&deg;</h6>
                  <p class="card-text bg-transparent text-primary m-3">${array.forecast.forecastday[1].day.condition.text}</p>
                </div>
                </div>`;
  secondCarddata.innerHTML = items;
}
function thirdCard(array) {
  const forecastDay = array.forecast.forecastday[2];
  const { dayName, fullDate } = formatDate(forecastDay.date);
  var items = "";
  items += `
  <div class="card h-100 border-0 rounded-3 thirdCard" >
  <h5 class="card-header text-center">${dayName}</h5>
                <div class="card-body text-center">
                  <div class="cardimg bg-transparent">
                  <img src= '${array.forecast.forecastday[2].day.condition.icon}' alt="" class="bg-transparent">
                  </div>
                  <h1 class="bg-transparent m-4">${array.forecast.forecastday[2].day.maxtemp_c}&deg;</h1>
                  <h6 class="bg-transparent">${array.forecast.forecastday[2].day.mintemp_c}&deg;</h6>
                  <p class="card-text bg-transparent text-primary m-3">${array.forecast.forecastday[2].day.condition.text}</p>
                </div>
                </div>`;
  thirdCarddata.innerHTML = items;
}
search.addEventListener("input", function (e) {
  e.preventDefault();
  search.classList.replace("bg-dark", "bg-white");
  let city = search.value.trim();
  getWeather(city);
});
