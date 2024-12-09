"use client";
import React from "react";
import "./globals.css";

function getCurrentDate(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    const monthName = currentDate.toLocaleString("en-US", options);
    const date = new Date().getDate() + ", " + monthName;
    return date;
  }

const Home: React.FC = () => {
  return (
    <main className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-900 w-full h-[100vh]">
      <h1 className="text-white text-4xl">Weather App</h1>
    </main>
  );
};

export default Home;