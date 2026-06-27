import React from "react";
import { FcRating } from "react-icons/fc";

function Card(props) {
  console.log("Card props data:", props);
  
  return (
    
    <div className="w-[260px] shrink-0 grow group cursor-pointer transition duration-200 hover:scale-[0.98] mb-3">
      
      {/* Image Container */}
      <div className="h-[185px] rounded-[16px] overflow-hidden relative shadow-sm">
        <img
          src={"http://localhost:5000/images/" + props.image}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          alt={props.title || "Restaurant"}
        />
        
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3 text-white text-[22px] font-extrabold tracking-tight uppercase">
          {props.offer}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="px-1">
        {/* Restaurant Title */}
        <div className="mt-3 text-[18px] font-bold text-gray-800 line-clamp-1 group-hover:text-[#fc8019] transition duration-150">
          {props.title}
        </div>
        
        {/* Rating and Delivery Meta Info Row */}
        <div className="flex items-center gap-1.5 mt-1 text-[15px] font-bold text-gray-700">
          <FcRating className="text-[18px] shrink-0" />
          <span>{props.rating}</span>
          <span className="text-gray-400 font-normal mx-0.5">•</span>
          <span>{props.minTime}-{props.maxTime} mins</span>
        </div>
        
        {/* Cuisines / Food Names */}
        <div className="text-[14px] text-gray-500 mt-1 line-clamp-1 font-medium tracking-tight">
          {props.name || "North Indian, Fast Food, Beverages"}
        </div>
        
        {/* Location / Place */}
        <div className="text-[14px] text-gray-400 font-medium tracking-tight">
          {props.place || "Jhelum City"}
        </div>
      </div>

    </div>
  );
}

export default Card;