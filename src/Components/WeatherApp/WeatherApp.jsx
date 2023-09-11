import React from 'react'
import { useState } from "react"
import './WeatherApp.css'

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import thunder_icon from '../Assets/thunder.png';

export const WeatherApp = () => {

    let api_key ="2644563b224bf20dde01658321b5c703";

    const [wicon,setWicon] = useState(cloud_icon);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    }

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value==="")
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&lang=fr&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        if (data.cod === "404") {
            // Si le code de réponse est 404, cela signifie que la ville n'a pas été trouvée
            alert("Le nom de la ville n'est pas reconnu, veuillez rééssayer");
            return;
        }

        

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+"°C";
        location[0].innerHTML = data.name+" "+"("+data.sys.country+")";

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
        {
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
        {
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
        {
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
        {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
        {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="11d" || data.weather[0].icon==="11n")
        {
            setWicon(thunder_icon);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
        {
            setWicon(snow_icon);
        }
        else{
            setWicon(clear_icon);
        }
    }

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Rechercher' onKeyPress={handleKeyPress} />
            <div className="search-icon">
                <img src={search_icon} alt="Loupe" onClick={()=>{search()}} />
            </div>

        </div>
        <div className="weather-image">
            <img src={wicon} alt="Nuageux" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-location">Londres</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="Humidité" className='icon'/>
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidité</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="Vent" className='icon'/>
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Vitesse du vent</div>
                </div>
            </div>
        </div>
    </div>
  )
}
