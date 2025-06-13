import React, { useState } from 'react';
import './Weather.css';
import { FaSearch, FaWind } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '5acc1683650652bab831ecf7d57fd397';

  const handleOnChange = (event) => {
    setCity(event.target.value);
  };

  const fetchData = async () => {
    if (!city.trim()) {
      setError('City name cannot be empty.');
      setWeather(null);
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const output = await response.json();

      if (response.ok) {
        setWeather(output);
        setError('');
      } else {
        setError('No data found. Please enter a valid city name.');
        setWeather(null);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Something went wrong. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div className='container'>
      <div className='city'>
        <input
          type='text'
          value={city}
          onChange={handleOnChange}
          placeholder='Enter any city name'
        />
        <button onClick={fetchData}>
          <FaSearch />
        </button>
      </div>

      {error && <p className='error-message'>{error}</p>}

      {weather && weather.weather && (
        <div className='content'>
          <div className='weather-image'>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt='weather icon'
            />
            <h3 className='desc'>{weather.weather[0].description}</h3>
          </div>

          <div className='weather-temp'>
            <h2>{weather.main.temp}<span>&deg;C</span></h2>
          </div>

          <div className='weather-city'>
            <MdLocationOn className='location' />
            <p>{weather.name}, <span>{weather.sys.country}</span></p>
          </div>

          <div className='weather-stats'>
            <div className='wind'>
              <FaWind className='wind-icon' />
              <h3 className='wind-speed'>{weather.wind.speed}<span> Km/h</span></h3>
              <h3 className='wind-heading'>Wind Speed</h3>
            </div>

            <div className='humidity'>
              <WiHumidity className='humidity-icon' />
              <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
              <h3 className='humidity-heading'>Humidity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
