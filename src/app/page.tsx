"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";

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
      <h1 className="text-white text-4xl">Weather App</h1>
    </main>
  );
};

export default Home;