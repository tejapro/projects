import { useState } from 'react';
import './App.css';

// Global Variables
const locations = {
  Hyderabad: {"latitude": 17.375, "longitude": 78.5},
  Vizag: {"latitude": 17.625, "longitude": 83.25},
  Vijayawada: {"latitude": 16.5, "longitude": 80.625},
  Bengaluru: {"latitude": 13.00, "longitude": 77.63},
  Delhi: {"latitude": 28.63, "longitude": 77.25},
  Mumbai: {"latitude": 19.13, "longitude": 72.88},
  Calcutta: {"latitude": 22.63, "longitude": 88.38},
  Chennai: {"latitude": 13.00, "longitude": 80.13},
  Kohima: {"latitude": 25.63, "longitude": 94.13},
  Pune: {"latitude": 18.63, "longitude": 74.00}
};

const month = [
  ["Jan", "January"],
  ["Feb", "February"],
  ["Mar", "March"],
  ["Apr", "April"],
  ["May", "May"],
  ["Jun", "June"],
  ["Jul", "July"],
  ["Aug", "August"],
  ["Sep", "September"],
  ["Oct", "October"],
  ["Nov", "November"],
  ["Dec", "December"]
];

const weatherCode = {
  0: ["moon", "sun", "Clear Sky"],
  1: ["moon", "sun", "Mainly Clear"],
  2: ["partly-cloudy-night", "partly-cloudy-day", "Partly Cloudy"],
  3: ["clouds--v3", "clouds--v1", "Overcast"],
  45: ["fog-night", "fog-day", "Fog"],
  48: ["fog-night", "fog-day","Rime Fog"],
  51: ["light-rain-2", "light-rain-2", "Drizzle: Light"], 
  53: ["rain", "rain", "Drizzle: Moderate"], 
  55: ["light-rain", "light-rain", "Drizzle: Dense"],
  56: ["sleet", "sleet","Freezing, Drizzle: Light"],
  57: ["sleet", "sleet","Freezing, Drizzle: Dense"],
  61: ["rainy-night", "partly-cloudy-rain","Rain: Slight"],
  63: ["light-rain", "light-rain","Rain: Moderate"],
  65:	["intense-rain", "intense-rain","Rain: Heavy"],
  66: ["sleet", "sleet","Freezing, Rain: Light"],
  67:	["sleet", "sleet","Freezing, Rain: Heavy"],
  71: ["light-snow", "light-snow", "Snowfall: Slight"],
  73: ["snow", "snow","Snowfall: Moderate"],
  75: ["snow", "snow","Snowfall: Heavy"],
  77:	["snow-storm", "snow-storm","Snow Grains"],
  80: ["light-rain", "light-rain", "Rain Showers: Slight"],
  81: ["intense-rain", "intense-rain","Rain Showers: Moderate"],
  82: ["torrential-rain", "torrential-rain", "Rain Showers: Violent"],
  85: ["light-snow", "light-snow", "Snow Showers: Slight"],
  86:	["snow", "snow", "Snow Showers: Heavy"],
  95:	["stormy-night", "chance-of-storm","Thunderstorm: Slight/Moderate"],
  96: ["storm-with-heavy-rail", "storm-with-heavy-rain","Thunderstorm: Slight Hail"],
  99: ["hail","hail","Thunderstorm: Heavy Hail"]
}


// App Component - Parent component
function App() {
  const [appSettings, setappSettings] = useState({location: "", currentDay: 0, hours: false, settings: ""});
  const [weather, setWeather] = useState({});

  // Handle the location
  function handleLocation(e) {
    setappSettings({...appSettings, location: e.target.value});
    handleWeatherAPI(locations[e.target.value], appSettings.settings);
  }
  
  // Handle weather app settings
  function handleWeatherSettings(e) {
    e.preventDefault();
    let str = '';
    let settings = document.querySelectorAll('input[type="radio"]');
    for (let index = 0; index < settings.length; index++) {
      if (settings[index].checked)
      str += settings[index].value;
    }
    setappSettings({...appSettings, settings: str});
    handleWeatherAPI(locations[appSettings.location], str);
    closeNav();
  }

  // Handle weatherAPI
  function handleWeatherAPI({latitude, longitude}, weatherUnits) {
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,apparent_temperature,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto${weatherUnits}`;
    
    const xhttp = new XMLHttpRequest();
    
    xhttp.onload = () => setWeather(xhttp.response);
    
    xhttp.open("GET", url);
    xhttp.responseType = 'json';
    xhttp.send();
    
  }

  function openNav() {
    document.getElementById("myNav").style.height = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }

  function handleDayWeather(index) {
    setappSettings({...appSettings, currentDay: index});
  }

  function handleClock(e) {
    setappSettings({...appSettings, hours: Boolean(e.target.value)});
  }
  
  const {current, current_units, daily, daily_units, hourly, hourly_units} = {...weather};

  return (
    <>

    {/* Overlay Menu navigation */}
    <div id="myNav" className="overlay">
      <button className="closebtn button" onClick={closeNav}>X</button>
      <div className="overlay-content">

        <form onSubmit={handleWeatherSettings}> 
          <h1>Weather Settings</h1>
          <fieldset>
            <legend>Temperature</legend>

            <div>
              <label htmlFor="c-option">
                <input type="radio" id="c-option" value="" name="temperature" defaultChecked/>
                <span>Celsius ( &deg;C )</span>
              </label>
              <label htmlFor="f-option">
                <input type="radio" id="f-option" value="&temperature_unit=fahrenheit" name="temperature"/>
                <span>Fahrenheit ( &deg;F )</span>
              </label>
            </div>

          </fieldset>

          <fieldset>
            <legend>Wind Speed</legend>

            <div>
              <label htmlFor="kmh-option">
                <input type="radio" id="kmh-option" value="" name="wind_speed" defaultChecked/>
                <span>km/h</span>
              </label>
              <label htmlFor="ms-option">
                <input type="radio" id="ms-option" value="&wind_speed_unit=ms" name="wind_speed"/>
                <span>m/s</span>
              </label>
              <label htmlFor="mph-option">
                <input type="radio" id="mph-option" value="&wind_speed_unit=mph" name="wind_speed"/>
                <span>m/h</span>
              </label>
              <label htmlFor="knots-option">
                <input type="radio" id="knots-option" value="&wind_speed_unit=kn" name="wind_speed"/>
                <span>knots</span>
              </label>
            </div>

          </fieldset>

          <fieldset>
            <legend>Precipitation</legend>

            <div>
              <label htmlFor="mm-option">
                <input type="radio" id="mm-option" value="" name="precipitation" defaultChecked/>
                <span>Millimeter ( mm )</span>
              </label>
              <label htmlFor="inch-option">
                <input type="radio" id="inch-option" value="&precipitation_unit=inch" name="precipitation"/>
                <span>Inch ( inch )</span>
              </label>
            </div>

          </fieldset>

          <button className="button" type="submit">Save</button>

        </form>        




      </div>
    </div>






    <section>
    {(Object.keys(weather).length === 0) ?
    <div id="overlay">
    <img width="188" height="188" src="https://img.icons8.com/3d-fluency/188/umbrella.png" alt="umbrella"/>
    <h1>Weather App</h1><hr/>
    <div id="startApp">  
      <p>Please select a location</p><br/>
      <Location location={appSettings.location} handleLocation={handleLocation} />
    </div>
    <small>This App only works on <br/> <i>Desktop(s) / Laptop(s)</i>.</small>
    </div>
    :
    <>
    {/* main content of weather app */}
    <div className="firstItem">

      {/* Header of the weather app */}
      <div id="header">
        <div>
          <button className="button" style={{marginRight: "1rem"}} onClick={openNav}><b><span>&#9776;</span> Weather</b></button>
          <button className="button" onClick={()=>handleWeatherAPI(locations[appSettings.location], appSettings.settings)}><b><span>&#10227;</span> Refresh</b></button>
        </div>
        {(appSettings.currentDay)?<h1>{Number(daily.time[appSettings.currentDay].split("-").reverse()[0])} {month[daily.time[appSettings.currentDay].split("-")[1]-1][1]} {daily.time[appSettings.currentDay].split("-")[0]}</h1>: <h1>{Number(current.time.split("T")[0].split("-").reverse()[0])} {month[current.time.split("T")[0].split("-")[1]-1][1]} {current.time.split("T")[0].split("-")[0]}, {(appSettings.hours)?((current.time.split("T")[1].split(":")[0]>12)?(current.time.split("T")[1].split(":")[0]-12+":"+current.time.split("T")[1].split(":")[1]+" pm"):(current.time.split("T")[1].split(":")[0]+":"+current.time.split("T")[1].split(":")[1]+" am")):current.time.split("T")[1]}</h1>}
        <div>
          <select style={{marginRight: "1rem"}} onChange={handleClock} className="button">
            <option value="">24 - Clock</option>
            <option value="true">12 - Clock</option>
          </select>
          <Location location={appSettings.location} handleLocation={handleLocation} />
        </div>
      </div>

      {/* Current weather section details */}
      <div id="currentWeather">
        {(appSettings.currentDay === 0)?
        <>
        <div>
          <h2><span>{appSettings.location}</span></h2>
          <p style={{margin:"0.5rem 0rem"}}>{weatherCode[current.weather_code][2]}</p>
          <p style={{margin:"0.5rem 0rem"}}>Sunrise: <b>{(appSettings.hours)?(Number(daily.sunrise[appSettings.currentDay].split("T")[1].split(":")[0])+":"+daily.sunrise[appSettings.currentDay].split("T")[1].split(":")[1]+" am"):daily.sunrise[appSettings.currentDay].split("T")[1]}</b> / Sunset: <b>{(appSettings.hours)?(Number(daily.sunset[appSettings.currentDay].split("T")[1].split(":")[0])-12+":"+daily.sunset[appSettings.currentDay].split("T")[1].split(":")[1]+" pm"):daily.sunset[appSettings.currentDay].split("T")[1]}</b></p>
          <h1><span>{current.temperature_2m}</span><span>{current_units.temperature_2m}</span></h1>
        </div>
        <div>
          <img width="144" height="144" src={"https://img.icons8.com/fluency/144/"+ weatherCode[current.weather_code][current.is_day] +".png"} alt={weatherCode[current.weather_code][current.is_day]}/>
        </div>
        </>
        :
        <>
        <div>
          <h2><span>{appSettings.location}</span></h2>
          <p style={{margin:"0.5rem 0rem"}}>{weatherCode[daily.weather_code[appSettings.currentDay]][2]}</p>
          <p style={{margin:"0.5rem 0rem"}}>Sunrise: <b>{(appSettings.hours)?(Number(daily.sunrise[appSettings.currentDay].split("T")[1].split(":")[0])+":"+daily.sunrise[appSettings.currentDay].split("T")[1].split(":")[1]+" am"):daily.sunrise[appSettings.currentDay].split("T")[1]}</b> / Sunset: <b>{(appSettings.hours)?(Number(daily.sunset[appSettings.currentDay].split("T")[1].split(":")[0])-12+":"+daily.sunset[appSettings.currentDay].split("T")[1].split(":")[1]+" pm"):daily.sunset[appSettings.currentDay].split("T")[1]}</b></p>
          <h1><span>{daily.temperature_2m_max[appSettings.currentDay]}</span><span>{daily_units.temperature_2m_max} ( max )</span> / <span>{daily.temperature_2m_min[appSettings.currentDay]}</span><span>{daily_units.temperature_2m_min} ( min )</span></h1>
        </div>
        <div>
          <img width="144" height="144" src={"https://img.icons8.com/fluency/144/"+ weatherCode[daily.weather_code[appSettings.currentDay]][1] +".png"} alt={weatherCode[daily.weather_code[appSettings.currentDay]][1]}/>
        </div>
        </>}
      </div>

      {(appSettings.currentDay === 0) &&
      <div id="weatherDetails">
        <h2>Weather Details</h2>
        <ul>
          <li>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/hygrometer.png" alt="hygrometer"/>
            <p>Humidity</p>
            <h1>{current.relative_humidity_2m}{current_units.relative_humidity_2m}</h1>
          </li>
          <li>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/thermometer.png" alt="thermometer"/>
            <p>Feel like</p>
            <h1>{current.apparent_temperature}{current_units.apparent_temperature}</h1>
          </li>
          <li>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/rain-sensor.png" alt="rain-sensor"/>
            <p>Precipitation</p>
            <h1>{current.precipitation} {current_units.precipitation}</h1>
          </li>
          <li>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/rain-gauge.png" alt="rain-gauge"/>
            <p>Rain</p>
            <h1>{current.rain} {current_units.rain}</h1>
          </li>
          <li>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/light-rain-2.png" alt="light-rain-2"/>
            <p>Showers</p>
            <h1>{current.showers} {current_units.showers}</h1>
          </li>
          <li>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/winter.png" alt="winter"/>
            <p>Snowfall</p>
            <h1>{current.snowfall} {current_units.snowfall}</h1>
          </li>
          <li>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/barometer-gauge.png" alt="barometer-gauge"/>
            <p>Pressure - Sea level</p>
            <h1>{current.pressure_msl} {current_units.pressure_msl}</h1>
          </li>
          <li>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/atmospheric-pressure.png" alt="atmospheric-pressure"/>
            <p>Surface Pressure</p>
            <h1>{current.surface_pressure} {current_units.surface_pressure}</h1>
          </li>
          <li>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/wind-gauge.png" alt="wind-gauge"/>
            <p>Wind (speed)</p>
            <h1>{current.wind_speed_10m} {current_units.wind_speed_10m}</h1>
          </li>
          <li>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/windsock.png" alt="windsock"/>
            <p>Wind (direction)</p>
            <h1>{current.wind_direction_10m} {current_units.wind_direction_10m}N</h1>
          </li>
          <li>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/wind.png" alt="wind"/>
            <p>Wind (gusts)</p>
            <h1>{current.wind_gusts_10m} {current_units.wind_gusts_10m}</h1>
          </li>      
        </ul>
      </div>}

      {/* Hourly weather details section */}
      <div id="hourlyWeather">
        <h1>Hourly Forecast</h1>
        <ul>
          {(appSettings.currentDay === 0) ?
          [...Array(24-Number(current.time.split("T")[1].split(":")[0]))].map((e, i) => 
            <li key={i}>
              <div>
                {(appSettings.hours)?<p>{Number(hourly.time[Number(current.time.split("T")[1].split(":")[0])+i].split("T")[1].split(":")[0])>12?Number(hourly.time[Number(current.time.split("T")[1].split(":")[0])+i].split("T")[1].split(":")[0])-12:Number(hourly.time[Number(current.time.split("T")[1].split(":")[0])+i].split("T")[1].split(":")[0])?Number(hourly.time[Number(current.time.split("T")[1].split(":")[0])+i].split("T")[1].split(":")[0]):12} {Number(hourly.time[Number(current.time.split("T")[1].split(":")[0])+i].split("T")[1].split(":")[0])>12?"pm":"am"}</p>:<p>{hourly.time[Number(current.time.split("T")[1].split(":")[0])+i].split("T")[1]}</p>}
                <img width="48" height="48" src={"https://img.icons8.com/fluency/48/"+ weatherCode[hourly.weather_code[Number(current.time.split("T")[1].split(":")[0])+i]][((Number(daily.sunrise[0].split("T")[1].split(":")[0])<Number(hourly.time[Number(current.time.split("T")[1].split(":")[0])+i].split("T")[1].split(":")[0]))&&(Number(daily.sunset[0].split("T")[1].split(":")[0])<Number(hourly.time[Number(current.time.split("T")[1].split(":")[0])+i].split("T")[1].split(":")[0])))?0:1] +".png"} alt={weatherCode[hourly.weather_code[Number(current.time.split("T")[1].split(":")[0])+i]][current.is_day]}/>
                <p><b>{hourly.temperature_2m[Number(current.time.split("T")[1].split(":")[0])+i]}{hourly_units.temperature_2m}</b></p>
                <p>Feel {hourly.apparent_temperature[Number(current.time.split("T")[1].split(":")[0])+i]}{hourly_units.apparent_temperature}</p>
              </div>
            </li>
          ):
          [...Array(24)].map((e, i) => 
            <li key={i}>
              <div>
                {(appSettings.hours)?<p>{Number(hourly.time[(24*appSettings.currentDay)+i].split("T")[1].split(":")[0])>12?Number(hourly.time[(24*appSettings.currentDay)+i].split("T")[1].split(":")[0])-12:(Number(hourly.time[(24*appSettings.currentDay)+i].split("T")[1].split(":")[0]))?Number(hourly.time[(24*appSettings.currentDay)+i].split("T")[1].split(":")[0]):12} {(Number(hourly.time[(24*appSettings.currentDay)+i].split("T")[1].split(":")[0])>=12)?"pm":"am"}</p>:<p>{hourly.time[(24*appSettings.currentDay)+i].split("T")[1]}</p>}
                <img width="48" height="48" src={"https://img.icons8.com/fluency/48/"+ weatherCode[hourly.weather_code[(24*appSettings.currentDay)+i]][((Number(daily.sunset[appSettings.currentDay].split("T")[1].split(":")[0]) > Number(hourly.time[(24*appSettings.currentDay)+i].split("T")[1].split(":")[0]))&&(Number(daily.sunrise[appSettings.currentDay].split("T")[1].split(":")[0]) < Number(hourly.time[(24*appSettings.currentDay)+i].split("T")[1].split(":")[0])))? 1 : 0] +".png"} alt={weatherCode[hourly.weather_code[(24*appSettings.currentDay)+i]][1]}/>
                <p><b>{hourly.temperature_2m[(24*appSettings.currentDay)+i]}{hourly_units.temperature_2m}</b></p>
                <p>Feel {hourly.apparent_temperature[(24*appSettings.currentDay)+i]}{hourly_units.apparent_temperature}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    
    </div>

    {/* Second column section details */}
    <div id="secondItem">
      <h2>Weekly Forecast</h2>
      <ul>
        {daily.time.map((val, index) => 
          <li key={index} onClick={()=>handleDayWeather(index)} className={(appSettings.currentDay === index)?"active":""}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div>
            {(index)?<b>{Number(daily.time[index].split("-").reverse()[0])} {month[Number(daily.time[index].split("-")[1])-1][0]}</b>:<b>Today</b>}
            <p><small>{weatherCode[daily.weather_code[index]][2]}</small></p>
            <p><b>{daily.temperature_2m_max[index]}{daily_units.temperature_2m_max}</b> / {daily.temperature_2m_min[index]}{daily_units.temperature_2m_min}</p>
            </div>
            <div>
            <img width="48" height="48" src={"https://img.icons8.com/fluency/48/"+weatherCode[daily.weather_code[index]][1]+".png"} alt={weatherCode[daily.weather_code[index]][1]}/>
            </div>
            </div>
          </li>
        )}
      </ul>
    </div>
    </>
    }
  </section>
  </>
  );
}


// Location Component
function Location({location, handleLocation}) {
  return (
    <select className="button" value={location} onChange={handleLocation}>
      <option value="" disabled hidden>Select a location. . .</option>
      {/* render locations */}
      {Object.keys(locations).map((location, index) => <option key={index} value={location}>{location}</option>)}
    </select>
  );
}

export default App;