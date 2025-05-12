import React from "react";

const NextFiveDays = ({ data }) => {
  if (!data?.list || !data?.city) return null;

 
  const dailyForecast = data.list
    .filter((item) => item.dt_txt.includes("12:00:00")) // I want to get the dt_txt wich only contains 12:00:00
    .slice(0, 5); // use slice for 5 to get next 5 days 
  return (
    <div className="mt-5">
      <h2 className="text-lg mb-2 text-white">
        Next 5-Days Forecast for {data.city.name}
      </h2>
      <div className="flex justify-around overflow-x-auto">
        {dailyForecast.map((item, index) => (
          <div key={index} className="bg-white/20 p-4 rounded-xl text-white min-w-[150px]">
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} //getting weather icon dynamically using base url and using icon number in waether api
              alt={item.weather[0].description}
            />
            <p>{Math.round(item.main.temp - 273.15)}°C</p> 
            <p>{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextFiveDays;
