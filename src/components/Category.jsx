import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Category() {
  const [categories, setCategories] = useState([]);
  const [slide, setslide] = useState(0)

  const fetchCategory = async () => {
    const response = await fetch("http://localhost:5000/categories");
    const data = await response.json();
    setCategories(data);
  };

  const nextSlide = () => {

    if (categories.length - 8 == slide) return false;
    
    setslide(slide + 3)
  }

  const prevSlide = () => {

    if (slide == 0) return false;

    setslide(slide - 3)
  }


  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className="max-w-[1100px] mx-auto  items-center ">
      <div className="flex items-center my-3 justify-between ">
        <div className="text-[25px] font-bold">What's on your mind?</div>
        <div className="flex">
          <div className="flex items-center justify-center h-[30px] w-[30px] bg-[#e2e2e7] rounded-full mx-2 cursor-pointer" onClick={prevSlide}>
            <FaArrowLeft />
          </div>
          <div className="flex items-center justify-center h-[30px] w-[30px] bg-[#e2e2e7] rounded-full mx-2 cursor-pointer" onClick={nextSlide}>
            <FaArrowRight />
          </div>
        </div>
      </div>

      <div className="flex overflow-hidden">
        {categories.map((cat, index) => {
          return (
            <div
            style={{transform: `translateX(-${slide * 100}%)`}}
             key={index} className="w-[138px] shrink-0 duration-500">
                <img src={"/images/" + cat.image} alt={cat.name} />
            </div>
          );
        })}
      </div>
      <hr  className="my-12 border-[1px] border-gray-300"/>
    </div>
  );
}

export default Category;
