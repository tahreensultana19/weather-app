"use client";
import React, { useState, useEffect } from "react";
import {
  FaTemperatureHigh,
  FaTemperatureLow,
  FaWind,
  FaTint,
  FaCompressArrowsAlt,
  FaEye,
  FaCloud,
} from "react-icons/fa";
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

  const fetchData = async (input: string): Promise<void> => {
    try {
      let url;
      if (/^\d+$/.test(input)) {
        // If input is a number, treat it as a postal code
        url = `http://localhost:3000/api/weather?postalcode=${input}`;
      } else {
        // Otherwise, treat it as a city name
        url = `http://localhost:3000/api/weather?address=${input}`;
      }
  
      const response = await fetch(url);
      const jsonData = (await response.json()).data;
      console.log("Weather data:", jsonData); // Debug log
      setWeatherData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function fetchDataByCoordinates(
    latitude: number,
    longitude: number
  ): Promise<void> {
    try {
      const response = await fetch(
        `http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`
      );
      const jsonData = (await response.json()).data;
      console.log("Weather data by coordinates:", jsonData); // Debug log
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
        <>
          <div className="flex justify-center items-center gap-10 mt-12">
            <div
              className={`text-9xl ${
                weatherData?.weather[0]?.description === "clear sky" ||
                (weatherData?.weather[0]?.description === "few clouds" &&
                  weatherData?.weather[0]?.icon.endsWith("d")) ||
                (weatherData?.weather[0]?.description === "scattered clouds" &&
                  weatherData?.weather[0]?.icon.endsWith("d")) ||
                (weatherData?.weather[0]?.description === "broken clouds" &&
                  weatherData?.weather[0]?.icon.endsWith("d")) ||
                weatherData?.weather[0]?.description === "overcast clouds" ||
                (weatherData?.weather[0]?.description === "light rain" &&
                  weatherData?.weather[0]?.icon.endsWith("d"))
                  ? "text-yellow-400"
                  : "text-gray-600"
              }`}
            >
              {(() => {
                const description = weatherData?.weather[0]?.description;
                const icon = weatherData?.weather[0]?.icon;
                const isDay = icon && icon.endsWith("d");
                let iconClass = "";

                switch (description) {
                  case "clear sky":
                    iconClass = isDay ? "wi wi-day-sunny" : "wi wi-night-clear";
                    break;
                  case "few clouds":
                    iconClass = isDay
                      ? "wi wi-day-cloudy"
                      : "wi wi-night-alt-cloudy";
                    break;
                  case "scattered clouds":
                    iconClass = isDay
                      ? "wi wi-day-cloudy-gusts"
                      : "wi wi-night-alt-cloudy-gusts";
                    break;
                  case "broken clouds":
                    iconClass = "wi wi-cloudy";
                    break;
                  case "shower rain":
                    iconClass = isDay
                      ? "wi wi-day-showers"
                      : "wi wi-night-alt-showers";
                    break;
                  case "moderate rain":
                    iconClass = isDay
                      ? "wi wi-day-showers"
                      : "wi wi-night-alt-showers";
                    break;
                  case "rain":
                    iconClass = isDay
                      ? "wi wi-day-rain"
                      : "wi wi-night-alt-rain";
                    break;
                  case "light rain":
                    iconClass = isDay
                      ? "wi wi-day-rain"
                      : "wi wi-night-alt-rain";
                    break;
                  case "thunderstorm":
                    iconClass = isDay
                      ? "wi wi-day-thunderstorm"
                      : "wi wi-night-alt-thunderstorm";
                    break;
                  case "snow":
                    iconClass = isDay
                      ? "wi wi-day-snow"
                      : "wi wi-night-alt-snow";
                    break;
                  case "mist":
                    iconClass = isDay ? "wi wi-day-fog" : "wi wi-night-alt-fog";
                    break;
                  default:
                    iconClass = "wi wi-day-rain";
                }

                return <i className={iconClass}></i>;
              })()}
            </div>
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
            <p className="flex items-center">
              <FaEye className="inline-block mr-2 text-green-500 text-4xl" />
              Visibility: {weatherData.visibility} meters
            </p>
            <p className="flex items-center">
              <FaWind className="inline-block mr-2 text-gray-500 text-4xl" />
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
            <p className="flex items-center">
              <FaWind className="inline-block mr-2 text-gray-500 text-4xl" />
              Wind Direction: {weatherData.wind.deg} degrees
            </p>
            <p className="flex items-center">
              <FaCloud className="inline-block mr-2 text-gray-300 text-4xl" />
              Cloudiness: {weatherData.clouds.all}%
            </p>
          </div>
        </>
      ) : (
        <div className="text-center text-4xl mt-16 text-white p-32">
          Loading...
        </div>
      )}
    </main>
  );
};

export default Home;
