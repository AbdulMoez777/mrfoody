import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaStar, FaClock, FaSearch } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function RestaurantMenu() {
  const { activeRestaurant, setCurrentView, cart, addToCart, updateQuantity } = useApp();
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'veg' | 'nonveg'

  useEffect(() => {
    if (!activeRestaurant) return;

    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/menu/${activeRestaurant.id}`);
        const data = await response.json();
        setMenuItems(data);
        setFilteredItems(data);
      } catch (err) {
        console.error("Error fetching menu items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [activeRestaurant]);

  useEffect(() => {
    let result = menuItems;

    // Filter by tab
    if (activeTab === "veg") {
      result = result.filter((item) => item.isVeg);
    } else if (activeTab === "nonveg") {
      result = result.filter((item) => !item.isVeg);
    }

    // Filter by search
    if (searchTerm.trim() !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(result);
  }, [searchTerm, activeTab, menuItems]);

  if (!activeRestaurant) {
    return (
      <div className="max-w-[1100px] mx-auto text-center py-20">
        <p className="text-gray-500 mb-4">No restaurant selected.</p>
        <button 
          onClick={() => setCurrentView("home")}
          className="bg-[#fc8019] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#e17013]"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  // Helper to find item quantity in cart
  const getItemQtyInCart = (itemId) => {
    const cartItem = cart.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 mt-6">
      {/* Back button */}
      <button
        onClick={() => setCurrentView("home")}
        className="flex items-center gap-2 text-gray-500 hover:text-[#fc8019] font-bold text-sm mb-6 transition"
      >
        <FaArrowLeft /> Back to Restaurants
      </button>

      {/* Restaurant Header Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-xl p-6 mb-8 relative overflow-hidden">
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 to-[#fc8019]"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
          <div>
            <h1 className="text-[28px] font-black text-gray-800 tracking-tight">
              {activeRestaurant.title}
            </h1>
            <p className="text-gray-500 text-[14px] mt-1 font-medium">
              {activeRestaurant.name}
            </p>
            <p className="text-gray-400 text-[13px] mt-0.5">
              {activeRestaurant.place}
            </p>
          </div>

          <div className="flex gap-4 items-center">
            {/* Rating */}
            <div className="bg-emerald-50 text-emerald-800 px-3 py-2 rounded-xl flex flex-col items-center justify-center border border-emerald-100 min-w-[70px]">
              <span className="flex items-center gap-1 text-[16px] font-extrabold">
                <FaStar className="text-amber-500 text-[14px]" /> {activeRestaurant.rating}
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wide mt-0.5">Ratings</span>
            </div>

            {/* Delivery Time */}
            <div className="bg-orange-50 text-[#fc8019] px-3 py-2 rounded-xl flex flex-col items-center justify-center border border-orange-100 min-w-[80px]">
              <span className="flex items-center gap-1 text-[16px] font-extrabold">
                <FaClock className="text-[14px]" /> {activeRestaurant.minTime}-{activeRestaurant.maxTime}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#fc8019] tracking-wide mt-0.5">Mins</span>
            </div>
          </div>
        </div>

        {/* Promo Code Info */}
        <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex items-center gap-2 text-[#fc8019] font-bold text-[14px]">
          <span className="bg-orange-100 text-[#fc8019] px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">Offer</span>
          <span>{activeRestaurant.offer}</span>
        </div>
      </div>

      {/* Menu Filters and Search Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 sticky top-[73px] bg-white py-3 z-20 border-b border-gray-100">
        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition duration-200 ${
              activeTab === "all"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            All Menu
          </button>
          <button
            onClick={() => setActiveTab("veg")}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition duration-200 ${
              activeTab === "veg"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Veg & Sweet
          </button>
          <button
            onClick={() => setActiveTab("nonveg")}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition duration-200 ${
              activeTab === "nonveg"
                ? "bg-white text-red-700 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Non-Veg / BBQ
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search within menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#fc8019] focus:bg-white transition"
          />
          <FaSearch className="absolute left-3.5 top-3 text-gray-400 text-[13px]" />
        </div>
      </div>

      {/* Menu List */}
      <div>
        <h2 className="text-[20px] font-black text-gray-800 mb-6">Recommended items ({filteredItems.length})</h2>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#fc8019] mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">Preparing delectable items...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredItems.map((item) => {
              const qty = getItemQtyInCart(item.id);
              return (
                <div key={item.id} className="py-6 flex gap-6 justify-between items-start">
                  <div className="flex-1">
                    {/* Veg/Non-Veg Dot Indicator */}
                    <div className="mb-2">
                      {item.isVeg ? (
                        <span className="inline-flex items-center justify-center border border-emerald-500 rounded p-[1px] w-4 h-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center border border-red-500 rounded p-[1px] w-4 h-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-[17px] font-extrabold text-gray-800">{item.name}</h3>
                    <p className="text-[#fc8019] font-black text-[15px] mt-1">Rs. {item.price}</p>
                    <p className="text-gray-400 text-[13.5px] mt-2 font-medium leading-relaxed max-w-[480px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Food Image and ADD controls */}
                  <div className="relative shrink-0 w-[120px] h-[120px]">
                    <img
                      src={`http://localhost:5000/images/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-2xl border border-gray-100 shadow-sm"
                    />

                    {/* Plus/Minus quantity adjustment block */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 shadow-md rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center min-w-[90px] h-[34px] font-bold">
                      {qty > 0 ? (
                        <div className="flex justify-between items-center w-full px-2 text-[#fc8019]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="hover:bg-gray-50 w-6 h-6 flex items-center justify-center rounded transition"
                          >
                            -
                          </button>
                          <span className="text-sm font-black text-gray-800">{qty}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="hover:bg-gray-50 w-6 h-6 flex items-center justify-center rounded transition"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full h-full text-emerald-600 hover:bg-emerald-50 text-[13px] tracking-wide uppercase transition font-extrabold"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 font-bold mb-2">No items match your criteria.</p>
            <p className="text-gray-400 text-xs">Try clearing search filters or choosing another tab.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantMenu;
