import React, { useState, useEffect } from "react";
import {Search,MapPin,Calendar,ThermometerSun,Wind,Droplet,} from "lucide-react";
import bgimg from './assets/bgimage.jpg'

import NextFiveDays from "./components/NextFiveDays";

const App = () => {
  const api_key = "cb699b250ef980d5bea649f753ba2844";

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  

  useEffect(() => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Hyderabad&appid=${api_key}` //used use effect to fectch hyderabad data at first render of the component
  )
    .then((res) => res.json())
    .then((result) => setWeatherData(result))
    .catch((error) => console.log(error));
}, []);

  const SubHandler = (e) => {
    e.preventDefault();

    if (!city) {
      window.alert("please enter city name");
    } else {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`
      )
        .then((res) => res.json())
        .then((result) => setWeatherData(result))
        .catch((error) => console.log(error));
    }
  };


  const locationHandler =()=>{

    navigator.geolocation.getCurrentPosition(
      (position)=>{
        const lat = position.coords.latitude
        const long = position.coords.longitude

        fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${api_key}`  // used weather api with latitude and longitude to fetch current clocation data
      )
        .then((res) => res.json())
        .then((result) => setWeatherData(result))
        .catch((error) => console.log(error));
    }

    
    )
    setCity('')

  }

  return (
    <div className=" justify-center align-middle   h-screen overflow-x-hidden  bg-cover bg-center "   style={{ backgroundImage: `url(${bgimg})` }}>
      {/* TITLE DIV */}

      <div>
        <h1 className="text-2xl text-center text-blue-950">
          WEATHER APPLICATION
        </h1>
      </div>

      {/* div----2 */}

      {/* crad-container */}
      <div className="flex justify-center items-center  ">
        <div className="mt-2 bg-white h-10  flex shadow-2xl border-2 rounded-xl ">
          <form onSubmit={SubHandler} className="flex">
            <Search className=" mt-2 w-5" />

            <input
              type="text"
              placeholder="enter city name"
              className=" outline-none py-1 "
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </form>
          <button className="bg-green-400 px-4 rounded-xl" onClick={locationHandler}>
            <MapPin />
          </button>
        </div>
      </div>

      {/* current day weather info div */}
      <div className="flex justify-center mt-10">
        <div className="bg-black/30  p-3 w-[80%] rounded-xl text-white ">
          <div className=" flex justify-center gap-40">
            <div className="grid gap-3 ">
              <h1 className="text-xl">{weatherData?.city?.name}</h1>
              <p className="flex gap-4">
                <Calendar />
                {new Date().toLocaleDateString()}
              </p>
              <p className="flex gap-4">
                <ThermometerSun />
                {weatherData?.list?.[0]?.main?.temp}°K
              </p>
              <p className="flex gap-4">
                <Droplet />
                {weatherData?.list?.[0]?.main?.humidity}%
              </p>
              <p className="flex gap-4">
                <Wind />
                {weatherData?.list?.[0]?.wind?.speed} m/s
              </p>
            </div>

            <div className="flex align-middle">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData?.list?.[0]?.weather?.[0]?.icon}@2x.png`}//getting weather icon dynamically using base url and using icon number in waether api
                alt=""
              />
              <p className="text-3xl font-medium">
               {weatherData?.list?.[0]?.main?.temp ? `${Math.floor(weatherData.list[0].main.temp - 273.15)}°C` : ""}
              </p>
            </div>
          </div>


{/* passing weatherData as props to NextFiveDays component */}
<div ><NextFiveDays data={weatherData} /></div> 
        </div>
      </div>
    </div>
  );
};

export default App;
