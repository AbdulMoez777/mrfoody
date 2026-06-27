import React, { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
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
      {/* FIX 1: Added z-50 so it stacks above the content images.
        FIX 2: Added bg-black/50 to dim the page when active.
        FIX 3: Added top-0 left-0 to fix it properly to the browser frame views.
      */}
      <div
        className="black-overlay w-full h-full fixed top-0 left-0 bg-black/50 duration-500 z-50"
        style={{
          opacity: toogle ? 1 : 0,
          visibility: toogle ? "visible" : "hidden",
        }}
        onClick={hideSideMenu}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-[400px] h-full bg-white absolute duration-[400ms]"
          style={{ left: toogle ? "0%" : "-100%" }}
        >
          {/* You can add your sidebar navigation content or close buttons here */}
        </div>
      </div>

      <header className="p-3 shadow-xl">
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