import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Card from './Card';

function TopRest() {
  const [data, setData] = useState([]);
  const [slide, setSlide] = useState(0);

  const constTopRestaurant = async () => {
    try {
      const response = await fetch("http://localhost:5000/top-restaurant-chains");
      const apiData = await response.json();
      setData(apiData);
    } catch (err) {
      console.error("Error fetching top restaurants:", err);
    }
  }

  useEffect(() => {
    constTopRestaurant();
  }, [])

  const nextSlide = () => {
    if (slide >= data.length - 4) return;
    setSlide(prev => Math.min(prev + 1, data.length - 4));
  };

  const prevSlide = () => {
    if (slide === 0) return;
    setSlide(prev => Math.max(prev - 1, 0));
  };

  const isAtStart = slide === 0;
  const isAtEnd = slide >= data.length - 4;

  return (
    <div className="max-w-[1100px] mx-auto px-4 mt-4">
      <div className="flex items-center my-4 justify-between">
        <div className="text-[24px] font-extrabold text-gray-800 tracking-tight">Top Restaurants in Jhelum</div>
        
        <div className="flex gap-2">
          <button 
            disabled={isAtStart}
            className={`flex items-center justify-center h-[34px] w-[34px] rounded-full transition duration-200 border border-gray-200 shadow-sm ${
              isAtStart 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-gray-800 hover:bg-gray-50 active:scale-95 cursor-pointer"
            }`}
            onClick={prevSlide}
            aria-label="Previous restaurants"
          >
            <FaArrowLeft size={12} />
          </button>
          
          <button 
            disabled={isAtEnd}
            className={`flex items-center justify-center h-[34px] w-[34px] rounded-full transition duration-200 border border-gray-200 shadow-sm ${
              isAtEnd 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-gray-800 hover:bg-gray-50 active:scale-95 cursor-pointer"
            }`}
            onClick={nextSlide}
            aria-label="Next restaurants"
          >
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden relative w-full pb-4">
        <div 
          className="flex transition-transform duration-500 ease-out gap-5"
          style={{ transform: `translateX(-${slide * 280}px)` }} // 260px width + 20px gap (gap-5)
        >
          {data.map((d, i) => {
            return <Card {...d} key={i} />
          })}
        </div>
      </div>
      <hr className="my-8 border-gray-200"/>
    </div>
  )
}

export default TopRest;