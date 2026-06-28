import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Category() {
  const [categories, setCategories] = useState([]);
  const [slide, setslide] = useState(0);

  const fetchCategory = async () => {
    try {
      const response = await fetch("http://localhost:5000/categories");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const nextSlide = () => {
    // We display about 7 categories at once (each is ~140px, container is 1100px)
    // Categories total is around 18 items.
    if (slide >= categories.length - 7) return;
    setslide(prev => Math.min(prev + 3, categories.length - 7));
  };

  const prevSlide = () => {
    if (slide === 0) return;
    setslide(prev => Math.max(prev - 3, 0));
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const isAtStart = slide === 0;
  const isAtEnd = slide >= categories.length - 7;

  return (
    <div className="max-w-[1100px] mx-auto px-4 mt-6">
      <div className="flex items-center my-4 justify-between">
        <div className="text-[24px] font-extrabold text-gray-800 tracking-tight">What's on your mind?</div>
        
        <div className="flex gap-2">
          <button 
            disabled={isAtStart}
            className={`flex items-center justify-center h-[34px] w-[34px] rounded-full transition duration-200 border border-gray-200 shadow-sm ${
              isAtStart 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-gray-800 hover:bg-gray-50 active:scale-95 cursor-pointer"
            }`} 
            onClick={prevSlide}
            aria-label="Previous categories"
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
            aria-label="Next categories"
          >
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden relative w-full pb-2">
        <div 
          className="flex transition-transform duration-500 ease-out gap-5"
          style={{ transform: `translateX(-${slide * 158}px)` }} // ~138px width + 20px gap
        >
          {categories.map((cat, index) => {
            return (
              <div
                key={index} 
                className="w-[138px] shrink-0 text-center cursor-pointer group select-none"
              >
                <div className="w-[130px] h-[130px] mx-auto rounded-full bg-orange-50/50 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:scale-105 group-hover:bg-orange-50 border border-transparent group-hover:border-orange-100">
                  <img 
                    src={`http://localhost:5000/images/${cat.image}`} 
                    className="w-[90%] h-[90%] object-contain" 
                    alt={cat.name || "Pakistani Dish"} 
                    loading="lazy"
                  />
                </div>
                <div className="text-gray-700 font-bold mt-3 text-[14.5px] group-hover:text-[#fc8019] transition duration-200 line-clamp-1">
                  {cat.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="my-8 border-gray-200"/>
    </div>
  );
}

export default Category;