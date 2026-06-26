import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Category() {
  const [categories, setCategories] = useState([]);
  const [slide, setslide] = useState(0);

  const fetchCategory = async () => {
    const response = await fetch("http://localhost:5000/categories");
    const data = await response.json();
    setCategories(data);
  };

  const nextSlide = () => {
    // Prevent sliding out of bounds
    // If we can't fit another full step of 3 items, stay put
    if (slide >= categories.length - 8) return;
    setslide(slide + 3);
  };

  const prevSlide = () => {
    if (slide === 0) return;
    setslide(slide - 3);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto items-center">
      <div className="flex items-center my-3 justify-between">
        <div className="text-[25px] font-bold">What's on your mind?</div>
        <div className="flex">
          <div 
            className="flex items-center justify-center h-[30px] w-[30px] bg-[#e2e2e7] rounded-full mx-2 cursor-pointer" 
            onClick={prevSlide}
          >
            <FaArrowLeft />
          </div>
          <div 
            className="flex items-center justify-center h-[30px] w-[30px] bg-[#e2e2e7] rounded-full mx-2 cursor-pointer" 
            onClick={nextSlide}
          >
            <FaArrowRight />
          </div>
        </div>
      </div>

      <div className="flex overflow-hidden">
        {categories.map((cat, index) => {
          return (
            <div
              // FIX: Each item is 138px wide. Shifting by `slide * 100%` transitions perfectly per item.
              style={{ transform: `translateX(-${slide * 100}%)` }}
              key={index} 
              className="w-[138px] shrink-0 duration-500 p-2"
            >
              {/* FIX: Points directly to your backend port 5000 folder */}
              <img 
                src={`http://localhost:5000/images/${cat.image}`} 
                className="w-full h-auto object-contain" 
                alt={cat.name} 
              />
              <div className="text-center text-gray-700 font-medium mt-2 text-[14px]">
                {cat.name}
              </div>
            </div>
          );
        })}
      </div>
      <hr className="my-12 border-[1px] border-gray-300"/>
    </div>
  );
}

export default Category;