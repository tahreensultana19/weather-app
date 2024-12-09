"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
import SearchBarServerComponent from "../components/SearchBarServerComponent";

function getCurrentDate(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    const monthName = currentDate.toLocaleString("en-US", options);
    const date = new Date().getDate() + ", " + monthName;
    return date;
}
interface WeatherData {
    weather: {
      icon: string;
      description: string;
    }[];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    name: string;
  }

const Home: React.FC = () => {
    const date = getCurrentDate();
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    async function fetchData(cityName: string): Promise<void> {
        try {
          const response = await fetch(
            "http://localhost:3000/api/weather?address=" + cityName
          );
          const jsonData = (await response.json()).data;
          console.log("Weather data by city:", jsonData);
          setWeatherData(jsonData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      async function fetchDataByCoordinates(
        latitude: number,
        longitude: number
      ): Promise<void> {
        try {
          const response = await fetch(
            `http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`
          );
          const jsonData = (await response.json()).data;
          console.log("Weather data by coordinates:", jsonData);
          setWeatherData(jsonData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              fetchDataByCoordinates(latitude, longitude);
            },
            (error) => {
              console.error("Error getting geolocation:", error);
            }
          );
        }
    }, []);
    
      
    return (
      
        <main className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-900 w-full h-[100vh]">
            <SearchBarServerComponent onSearch={fetchData} />
            {weatherData && weatherData.weather && weatherData.weather[0] ? (


  <div className="text-white">
    <div className="text-6xl">
      <span>
        {(weatherData.main.temp - 273.5).toFixed(1) +
          String.fromCharCode(176)}
      </span>
    </div>
    <div className="text-2xl">
      {weatherData.weather[0].description.toUpperCase()}
    </div>
  </div>
  <div className="text-center text-4xl mt-16 text-white">
    {weatherData.name}
          </div>
          <div className="text-center text-xl mt-5 text-white">{date}</div>
          <div className="grid grid-cols-2 gap-4 text-white text-lg mt-8 p-5">
            <p className="flex items-center">
  <FaTemperatureHigh className="inline-block mr-2 text-yellow-400 text-4xl" />
  Feels Like:{" "}
  {(weatherData.main.feels_like - 273.5).toFixed(1) +
    String.fromCharCode(176)}
</p>

<p className="flex items-center">
  <FaTemperatureLow className="inline-block mr-2 text-blue-500 text-4xl" />
  Min Temp:{" "}
  {(weatherData.main.temp_min - 273.5).toFixed(1) +
    String.fromCharCode(176)}
</p>

<p className="flex items-center">
  <FaTemperatureHigh className="inline-block mr-2 text-red-500 text-4xl" />
  Max Temp:{" "}
  {(weatherData.main.temp_max - 273.5).toFixed(1) +
    String.fromCharCode(176)}
</p>
<p className="flex items-center">
  <FaTint className="inline-block mr-2 text-blue-300 text-4xl" />
  Humidity: {weatherData.main.humidity}%
</p>
<p className="flex items-center">
  <FaCompressArrowsAlt className="inline-block mr-2 text-yellow-500 text-4xl" />
  Pressure: {weatherData.main.pressure} hPa
</p>

</div>
          
  
) : (
  <div className="text-center text-4xl mt-16 text-white p-32">
    Loading...
  </div>
)}
      <h1 className="text-white text-4xl">Weather App</h1>
    
    </main>
  );
};

export default Home;