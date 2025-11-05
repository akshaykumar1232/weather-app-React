import React, { useState } from 'react'
import './Weather.css'
import { FaSearchengin ,FaWind } from "react-icons/fa";
import { WiHumidity } from 'react-icons/wi';
import { MdLocationOn } from 'react-icons/md';

const Weather = () => {


    const[city ,setCity] = useState('');
    const[weather , setWeather] = useState();
    const[error ,setError] = useState('');

    const API_KEY = "5acc1683650652bab831ecf7d57fd397";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    function handleOnChange(event){
        setCity(event.target.value)
        
    }

    async function fetchData(){
        try{
            let res = await fetch(url);
            let outPut = await res.json();
            if(res.ok){
                setWeather(outPut);
                console.log(outPut);
                setError('');
            }else{
                setError("Please Enter a valid City Name")
            }
            
        }catch(error){
            
        }
    }




  return (
    <div className='container'>
        <div className="city">
            <input type="text" onChange={handleOnChange} placeholder='Enter Cityname.....'value={city} />
            <button onClick={() => fetchData()}>
                <FaSearchengin />
            </button>
        </div>
        {
            error && <p className='error-meassege'>  {error} </p>
        }
        
        {
            weather && weather.weather && 
            <div className='content'>

                <div className='weather-imag'>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                    <h3 className='desc'>{weather.weather[0].description}</h3>
                </div>

                <div className='weather-temp'>
                    <h2> {weather.main.temp}°C</h2>
                </div>

            <div className='weather-city'>
                <div className="location">
                    <MdLocationOn/>
                </div>
                <a>{weather.name} .<span>{weather.sys.country}</span></a>
                </div>

                <div className='weather-state'>
                    <div className='wind'>
                        <div className='wind-icon'>
                            <FaWind/>
                        </div>
                        <h3 className='wind-speed'>{weather.wind.speed} <span>KM/S</span></h3>
                        <h3 className='wind-heading'>Wind Speed</h3>
                    </div>

                        <div className='humidity'>
                        <div className='humidity-icon'>
                            <WiHumidity/>
                        </div>
                        <h3 className='humidity-percent'>{weather.main.humidity} <span>%</span></h3>
                        <h3 className='humidty-heading'>Humidity</h3>
                    </div>
                </div>
            </div>
        }



    </div>
  )
}

export default Weather;