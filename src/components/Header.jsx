import React, { useState } from "react";
import { RxCaretDown, RxCross2 } from "react-icons/rx"; 
import { IoIosSearch } from "react-icons/io";
import { CiDiscount1 } from "react-icons/ci";
import { useApp } from "../context/AppContext";

function Header() {
  const [toogle, settoogle] = useState(false);
  const { cart, setCartDrawerOpen, setCurrentView } = useApp();

  function showSideMenu() {
    settoogle(true);
  }

  function hideSideMenu() {
    settoogle(false);
  }

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLinkClick = (name) => {
    if (name === "Cart") {
      setCartDrawerOpen(true);
    } else if (name === "Home" || name === "Logo") {
      setCurrentView("home");
    } else {
      // Just simple toggle side menu or notification for demo
      alert(`${name} feature coming soon! Focus on ordering delicious food!`);
    }
  };

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
          className="w-[400px] h-full bg-white absolute duration-[400ms] p-5 shadow-2xl z-50"
          style={{ left: toogle ? "0%" : "-100%" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="text-xl font-bold text-gray-800">Menu Options</div>
            <RxCross2 
              onClick={hideSideMenu} 
              className="text-[26px] text-gray-500 cursor-pointer hover:text-black hover:rotate-90 transition duration-200" 
            />
          </div>

          <div className="text-sm text-gray-400 mb-6">Apply location or cuisine modifications...</div>
          
          <div className="space-y-4">
            <div className="p-3 border rounded-lg hover:border-[#fc8019] cursor-pointer transition" onClick={() => { setCurrentView("home"); hideSideMenu(); }}>
              <h4 className="font-bold text-gray-800">Go to Home</h4>
              <p className="text-xs text-gray-500">View all Pakistani food categories & top restaurants.</p>
            </div>
            <div className="p-3 border rounded-lg hover:border-[#fc8019] cursor-pointer transition" onClick={() => { setCartDrawerOpen(true); hideSideMenu(); }}>
              <h4 className="font-bold text-gray-800">Open Cart ({totalItems} items)</h4>
              <p className="text-xs text-gray-500">Modify items or checkout with your preferred payment method.</p>
            </div>
            <div className="p-3 border rounded-lg opacity-60">
              <h4 className="font-bold text-gray-800">Manage Addresses</h4>
              <p className="text-xs text-gray-500">Select Jhelum Cantt, G.T. Road, etc.</p>
            </div>
          </div>
        </div>
      </div>

      <header className="p-3 shadow-md sticky top-0 bg-white z-[40]">
        <div className="max-w-[1100px] mx-auto flex items-center gap-5">
          <div className="w-[100px] cursor-pointer hover:opacity-90 transition" onClick={() => handleLinkClick("Logo")}>
            <img src="http://localhost:5000/images/mrfoody-logo.webp" className="w-full" alt="MrFoody Logo" />
          </div>
          
          <div className="flex items-center gap-1">
            <span className="font-bold border-b-[3px] border-black text-gray-800 cursor-pointer" onClick={showSideMenu}>
              Jhelum
            </span>{" "}
            <span className="text-[#686b78] text-sm">, Punjab Pakistan</span>
            <RxCaretDown
              onClick={showSideMenu}
              fontSize={22}
              className="inline text-[#fc8019] cursor-pointer hover:scale-110 transition"
            />
          </div>
          
          <nav className="flex list-none gap-8 ml-auto text-[14px] font-semibold text-[#686b78]">
            <li 
              className="flex items-center gap-2 hover:text-[#fc8019] cursor-pointer transition"
              onClick={() => handleLinkClick("Search")}
            >
              <IoIosSearch fontSize={22} />
              <span>Search</span>
            </li>
            <li 
              className="flex items-center gap-2 hover:text-[#fc8019] cursor-pointer transition"
              onClick={() => handleLinkClick("Offers")}
            >
              <CiDiscount1 fontSize={22} />
              <span>Offers</span>
              <sup className="text-[#fc8019] text-[9px] font-bold uppercase tracking-wider bg-orange-100 px-1 rounded-sm">New</sup>
            </li>
            <li 
              className="flex items-center gap-2 hover:text-[#fc8019] cursor-pointer transition"
              onClick={() => handleLinkClick("Help")}
            >
              <span>Help</span>
            </li>
            <li 
              className="flex items-center gap-2 hover:text-[#fc8019] cursor-pointer transition"
              onClick={() => handleLinkClick("Sign in")}
            >
              <span>Sign In</span>
            </li>
            <li 
              className="flex items-center gap-2 hover:text-[#fc8019] cursor-pointer transition relative group"
              onClick={() => handleLinkClick("Cart")}
            >
              <div className="relative">
                <span className="bg-emerald-100 text-emerald-800 group-hover:bg-[#fc8019] group-hover:text-white px-2 py-0.5 rounded-full text-xs font-bold transition">
                  Cart ({totalItems})
                </span>
              </div>
            </li>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;