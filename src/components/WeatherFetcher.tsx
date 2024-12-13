import React from "react";

interface WeatherData {
  weather: { icon: string; description: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  name: string;
}

interface WeatherPageProps {
  weatherData: WeatherData | null;
  error?: string;
}

const WeatherPage: React.FC<WeatherPageProps> = ({ weatherData, error }) => {
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Weather Info</h1>
      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Feels Like: {weatherData.main.feels_like}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { city = "New York" } = context.query;

  // Get the base URL dynamically
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${context.req.headers.host}`;

  const apiUrl = `${baseUrl}/api/weather?address=${city}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const jsonData = await response.json();

    return {
      props: {
        weatherData: jsonData.data || null,
      },
    };
  } catch (error: any) {
    console.error("Error fetching weather data:", error);

    return {
      props: {
        weatherData: null,
        error: error.message || "Failed to fetch weather data.",
      },
    };
  }
}

export default WeatherPage;
