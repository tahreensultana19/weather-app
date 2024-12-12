import React, { ReactNode, useState } from "react";

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

interface WeatherFetcherProps {
  children: (data: WeatherData | null) => ReactNode;
  city?: string;
  lat?: number;
  lon?: number;
}

async function fetchWeatherData({
  city,
  lat,
  lon,
}: {
  city?: string;
  lat?: number;
  lon?: number;
}): Promise<WeatherData | null> {
  try {
    const url = city
      ? `http://localhost:3000/api/weather?address=${city}`
      : `http://localhost:3000/api/weather?lat=${lat}&lon=${lon}`;
    const response = await fetch(url);
    const jsonData = (await response.json()).data;
    return jsonData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

const WeatherFetcher: React.FC<WeatherFetcherProps> = ({
  children,
  city,
  lat,
  lon,
}) => {
  const [searchQuery, setSearchQuery] = useState(city || "");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleSearch = async () => {
    const data = await fetchWeatherData({ city: searchQuery, lat, lon });
    setWeatherData(data);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a city"
      />
      <button onClick={handleSearch}>Search</button>
      {children(weatherData)}
    </div>
  );
};

export default WeatherFetcher;
