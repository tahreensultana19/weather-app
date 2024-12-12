"use client";
import React from "react";

interface CityInputProps {
  onCityChange: (city: string) => void;
}

const CityInput: React.FC<CityInputProps> = ({ onCityChange }) => {
  const [city, setCityState] = React.useState("Cuba");

  function setCity(value: string): void {
    setCityState(value);
    onCityChange(value);
  }

  return (
    <div className="flex justify-center items-center mt-8">
      <input
        type="text"
        placeholder="Enter city name"
        className="p-2 rounded-lg text-black"
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        className="ml-4 p-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setCity(city)}
      >
        Search
      </button>
    </div>
  );
};

export default CityInput;
