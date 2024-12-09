"use client";
import React from "react";
import "./globals.css";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-900 w-full h-[100vh]">
      <h1 className="text-white text-4xl">Weather App</h1>
    </main>
  );
};

export default Home;