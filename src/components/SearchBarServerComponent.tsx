import React, { useState } from "react";

interface SearchBarServerComponentProps {
  onSearch: (cityName: string) => void;
}

const SearchBarServerComponent: React.FC<SearchBarServerComponentProps> = ({
  onSearch,
}) => {
  const [city, setCity] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(city);
  };

  return (
    <form
      className="flex items-center justify-center rounded-2xl p-10"
      onSubmit={handleSubmit}
    >
      <input
        className="min-w-96 rounded-full border-none h-10 mr-5 text-center text-lg text-black"
        placeholder="Enter city name"
        type="text"
        id="cityName"
        name="cityName"
        value={city}
        onChange={handleSearch}
      />
      <button
        className="w-20 h-10 rounded-full bg-black text-white border border-transparent transition duration-300 hover:bg-purple-500"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBarServerComponent;
