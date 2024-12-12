import React from "react";
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
import WeatherFetcher from "../components/WeatherFetcher";
const Home: React.FC = () => {
  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <WeatherFetcher city="Cuba">
      {(weatherData) => (
        <div>
          <main className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-900 w-full h-[100vh]">
            <div className="flex justify-center items-center mt-8">
              <input
                type="text"
                placeholder="Search for a city"
                className="p-2 rounded-l-lg border-none focus:outline-none"
                id="cityInput"
              />
              <button
                className="p-2 bg-blue-600 text-white rounded-r-lg"
                onClick={() => {
                  const city = (
                    document.getElementById("cityInput") as HTMLInputElement
                  ).value;
                  if (city) {
                    window.location.href = `/forecast/${city}`;
                  }
                }}
              >
                Search
              </button>
            </div>
            {weatherData && weatherData.weather && weatherData.weather[0] ? (
              <>
                <div className="flex justify-center items-center gap-10 mt-12">
                  <div className="text-9xl text-yellow-400">
                    <i className={`wi ${weatherData.weather[0].icon}`} />
                  </div>
                  <div className="text-white">
                    <div className="text-6xl">
                      {(weatherData.main.temp - 273.15).toFixed(1)}°C
                    </div>
                    <div className="text-2xl">
                      {weatherData.weather[0].description.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="text-center text-4xl mt-16 text-white">
                  {weatherData.name}
                </div>
                <div className="text-center text-xl mt-5 text-white">
                  {date}
                </div>
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
        </div>
      )}
    </WeatherFetcher>
  );
};

export default Home;
