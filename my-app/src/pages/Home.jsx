import React from "react";

export default function Home() {
   
  
    return (
      <div className="flex flex-col min-h-screen font-sans">
        
        <div
          className="relative flex flex-col items-center justify-center min-h-screen font-sans text-white bg-cover bg-center"
         
        >
          <div className="absolute inset-0  opacity-60"></div>
  
          {/* Main Content Banner */}
          <div className="relative text-center p-8 md:p-16 rounded-3xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 border border-gray-100 border-opacity-30 shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105">
            <h1 className="text-black text-xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md">
              Buy Your Favourite Products
            </h1>
            <p className=" text-black text-lg md:text-xl font-light mb-8 opacity-90 max-w-2xl mx-auto drop-shadow-sm">
              Discover the latest trends and exclusive collections. Explore a world of unique products designed for you.
            </p>
            <a
              href="/product"
              className="inline-block bg-gray-200 cursor-pointer text-purple-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    );
  }
  