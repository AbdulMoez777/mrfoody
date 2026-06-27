import React, { useState } from "react";
import { RxCaretDown, RxCross2 } from "react-icons/rx"; 
import { IoIosSearch } from "react-icons/io";
import { CiDiscount1 } from "react-icons/ci";

function Header() {
  const [toogle, settoogle] = useState(false);

  function showSideMenu() {
    settoogle(true);
  }

  function hideSideMenu() {
    settoogle(false);
  }

  const links = [
    {
      icon: <IoIosSearch fontSize={25} />,
      name: "Search",
    },
    {
      icon: <CiDiscount1 fontSize={25} />,
      name: "Offers",
      sup: "New"
    },
    {
      icon: "",
      name: "Help",
    },
    {
      icon: "",
      name: "Sign in"
    },
    {
      icon: "",
      name: "Cart",
      sup: "0"
    }
  ];

  return (
    <>
      {/* Black Dimmed Overlay Backdrop Layout Screen Section */}
      <div
        className="black-overlay w-full h-full fixed top-0 left-0 bg-black/50 duration-500 z-50"
        style={{
          opacity: toogle ? 1 : 0,
          visibility: toogle ? "visible" : "hidden",
        }}
        onClick={hideSideMenu}
      >
        {/* Sliding White Sidebar Wrapper Container Block */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-[400px] h-full bg-white absolute duration-[400ms] p-5 shadow-2xl"
          style={{ left: toogle ? "0%" : "-100%" }}
        >
         
          <div className="flex items-center justify-between mb-6">
            <div className="text-xl font-bold text-gray-800">Menu Options</div>
            <RxCross2 
              onClick={hideSideMenu} 
              className="text-[26px] text-gray-500 cursor-pointer hover:text-black hover:rotate-90 transition duration-200" 
            />
          </div>

          {/* You can safely drop down any input fields or filter side links below here */}
          <div className="text-sm text-gray-400">Apply location or cuisine modifications...</div>
        </div>
      </div>

      <header className="p-3 shadow-xl sticky top-0 bg-white z-[40]">
        <div className="max-w-[1100px] mx-auto flex items-center gap-5">
          <div className="w-[100px]">
            <img src="http://localhost:5000/images/mrfoody-logo.webp" className="w-full" alt="MrFoody Logo" />
          </div>
          <div className="">
            <span className="font-bold border-b-[3px] border-black">
              Jhelum
            </span>{" "}
            <span className="text-[#686b78]">, Punjab Pakistan </span>
            <RxCaretDown
              onClick={showSideMenu}
              fontSize={25}
              className="inline text-[#fc8019] cursor-pointer"
            />
          </div>
          <nav className="flex list-none gap-5 ml-auto text-[14px] font-semibold text-[#686b78]">
            {
              links.map((link, index) => {
                return (
                  <li key={index} className="flex items-center gap-2 hover:text-[#fc8019] cursor-pointer">
                    {link.icon}
                    {link.name}
                    <sup>{link.sup}</sup>
                  </li>
                );
              })
            }
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;