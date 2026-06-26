import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Card from './Card';

function TopRest() {

  const [data, setData] = useState([]);

  const constTopRestaurant = async () => {
    const response = await fetch("http://localhost:5000/top-restaurant-chains");
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    constTopRestaurant();
  },[] )


  return (
    <div className="max-w-[1100px] mx-auto  items-center ">
          <div className="flex items-center my-3 justify-between ">
            <div className="text-[25px] font-bold">Top Restaurants in Jhelum</div>
            <div className="flex">
              <div className="flex items-center justify-center h-[30px] w-[30px] bg-[#e2e2e7] rounded-full mx-2 cursor-pointer" >
                <FaArrowLeft />
              </div>
              <div className="flex items-center justify-center h-[30px] w-[30px] bg-[#e2e2e7] rounded-full mx-2 cursor-pointer" >
                <FaArrowRight />
              </div>
            </div>
          </div>
          <div className='flex gap-5 overflow-hidden'>
            {
              data.map((d, i) => {

                return <Card {...d} key={i} />

              })
            }
          </div>
    </div>
  )
}

export default TopRest