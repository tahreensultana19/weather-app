// SearchButton.tsx
"use client";

import React from "react";

const SearchButton: React.FC = () => {
  const handleClick = () => {
    const city = (document.getElementById("cityInput") as HTMLInputElement)
      .value;
    if (city) {
      window.location.href = `/forecast/${city}`;
    }
  };

  return (
    <button
      className="p-2 bg-blue-600 text-white rounded-r-lg"
      onClick={handleClick}
    >
      Search
    </button>
  );
};

export default SearchButton;
