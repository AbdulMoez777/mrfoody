import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";

function OnlineDelivery() {
  const [data, setData] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const filterRef = useRef(null);

  const fetchTopRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:5000/top-restaurant-chains");
      const apiData = await response.json();
      setData(apiData);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  useEffect(() => {
    fetchTopRestaurants();

    const currentFilter = filterRef.current;
    if (!currentFilter) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Condition checking if element has crossed the navbar height threshold
        setIsSticky(!entry.isIntersecting);
      },
      {
        rootMargin: "-96px 0px 0px 0px",
        threshold: [1],
      }
    );

    observer.observe(currentFilter);

    return () => {
      if (currentFilter) observer.unobserve(currentFilter);
    };
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto px-2">
      {/* Header Section */}
      <div className="flex my-5 items-center justify-between">
        <div className="text-[25px] font-bold">
          Restaurants with online delivery in Jhelum
        </div>
      </div>

      {/* Filter and Sorting Row */}
      <div
        ref={filterRef}
        className={`sticky top-[95px] flex items-center gap-3 py-3 mb-6 transition-all duration-200 z-30 ${
          isSticky 
            ? "bg-white border-b border-gray-100 shadow-md px-4" 
            : "bg-transparent"
        }`}
      >
        <div className="p-2.5 px-4 rounded-full border border-gray-300 text-[14px] font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer transition">
          Filter
        </div>
        <div className="p-2.5 px-4 rounded-full border border-gray-300 text-[14px] font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer transition">
          Sort By
        </div>
        <div className="p-2.5 px-4 rounded-full border border-gray-300 text-[14px] font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer transition">
          Fast Delivery
        </div>
        <div className="p-2.5 px-4 rounded-full border border-gray-300 text-[14px] font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer transition">
          Ratings 4.0+
        </div>
      </div>

      {/* Restaurant Cards Grid Component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {
          Array.isArray(data) && data.length > 0 ? (
            data.map((d, i) => {
              return <Card {...d} key={i} />;
            })
          ) : (
            <div className="col-span-4 text-center py-10 text-gray-500">
              Loading or no restaurants found...
            </div>
          )
        }
      </div>
    </div>
  );
}

export default OnlineDelivery;