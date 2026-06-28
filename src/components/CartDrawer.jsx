import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FaTrashAlt, FaMoneyBillWave, FaCreditCard, FaWallet, FaShoppingBag } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function CartDrawer() {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    paymentMethod,
    setPaymentMethod,
    updateQuantity,
    clearCart,
    placeOrder
  } = useApp();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 60 : 0;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + gst;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity duration-500 z-[100]"
        style={{
          opacity: cartDrawerOpen ? 1 : 0,
          visibility: cartDrawerOpen ? "visible" : "hidden",
        }}
        onClick={() => setCartDrawerOpen(false)}
      >
        {/* Drawer panel sliding from right */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-0 h-full w-[450px] max-w-[95vw] bg-gray-50 shadow-2xl transition-all duration-300 flex flex-col text-gray-800"
          style={{
            transform: cartDrawerOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {/* Header */}
          <div className="bg-white p-5 border-b border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <FaShoppingBag className="text-[#fc8019]" size={20} />
              <h2 className="text-[19px] font-black text-gray-800 tracking-tight">Your Cart</h2>
              <span className="bg-orange-100 text-[#fc8019] px-2 py-0.5 rounded-full text-xs font-black">
                {cart.reduce((a, c) => a + c.quantity, 0)}
              </span>
            </div>
            
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              <RxCross2 size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-48 h-48 mb-6 flex items-center justify-center bg-orange-50 rounded-full border border-orange-100/50">
                <img 
                  src="http://localhost:5000/images/mrfoody-logo.webp" 
                  alt="Empty Cart Logo" 
                  className="w-[70%] opacity-40 grayscale"
                />
              </div>
              <h3 className="text-[18px] font-extrabold text-gray-700">Hungry? Let's fill the cart!</h3>
              <p className="text-gray-400 text-sm mt-2 max-w-[280px]">
                Browse our menu of traditional Pakistani food and add some tasty dishes.
              </p>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="mt-6 bg-[#fc8019] text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-[#e17013] active:scale-95 transition"
              >
                Start Ordering
              </button>
            </div>
          ) : (
            /* Content with items */
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex justify-between items-center pb-2">
                  <span className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">Items in Order</span>
                  <button 
                    onClick={clearCart} 
                    className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 transition"
                  >
                    <FaTrashAlt size={10} /> Clear Cart
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white p-3.5 rounded-2xl border border-gray-100 flex gap-3.5 items-center shadow-sm">
                      <img
                        src={`http://localhost:5000/images/${item.image}`}
                        alt={item.name}
                        className="w-[50px] h-[50px] object-cover rounded-xl border border-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-[14.5px] text-gray-800 truncate">{item.name}</h4>
                        <p className="text-gray-500 text-xs font-semibold mt-0.5">Rs. {item.price}</p>
                      </div>
                      
                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-2.5 border border-gray-200 rounded-lg p-1 px-2.5 bg-gray-50 text-sm font-bold">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-gray-500 hover:text-[#fc8019] transition w-4 h-4 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-gray-800 text-xs min-w-[12px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-gray-500 hover:text-[#fc8019] transition w-4 h-4 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right min-w-[65px]">
                        <span className="font-black text-gray-800 text-[14.5px]">Rs. {item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill details and payment section */}
              <div className="bg-white border-t border-gray-100 p-5 space-y-5 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
                
                {/* Select Payment Method */}
                <div>
                  <h3 className="text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-3">
                    Payment Method
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {/* COD */}
                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-center ${
                        paymentMethod === "cod"
                          ? "border-[#fc8019] bg-orange-50/50 text-[#fc8019]"
                          : "border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <FaMoneyBillWave size={16} />
                      <span className="text-[11px] font-bold">Cash on Del.</span>
                    </button>

                    {/* Card */}
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-center ${
                        paymentMethod === "card"
                          ? "border-[#fc8019] bg-orange-50/50 text-[#fc8019]"
                          : "border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <FaCreditCard size={16} />
                      <span className="text-[11px] font-bold">Card</span>
                    </button>

                    {/* EasyPaisa / JazzCash */}
                    <button
                      onClick={() => setPaymentMethod("easypaisa_jazzcash")}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-center ${
                        paymentMethod === "easypaisa_jazzcash"
                          ? "border-[#fc8019] bg-orange-50/50 text-[#fc8019]"
                          : "border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <FaWallet size={16} />
                      <span className="text-[11px] font-bold">EasyPaisa</span>
                    </button>
                  </div>
                </div>

                {/* Calculation Summary */}
                <div className="space-y-2 border-t border-gray-100 pt-3 text-sm">
                  <div className="flex justify-between text-gray-500 font-semibold">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-semibold">
                    <span>Delivery Fee</span>
                    <span>Rs. {deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-semibold">
                    <span>GST (5%)</span>
                    <span>Rs. {gst}</span>
                  </div>
                  <div className="flex justify-between text-gray-800 font-black text-[16px] pt-1.5 border-t border-dashed border-gray-100">
                    <span>Grand Total</span>
                    <span className="text-[#fc8019]">Rs. {total}</span>
                  </div>
                </div>

                {/* Place Order button */}
                <button
                  onClick={placeOrder}
                  className="w-full bg-[#fc8019] text-white py-3.5 rounded-xl font-extrabold shadow-lg hover:bg-[#e17013] active:scale-[0.99] transition text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  Place Order • Rs. {total}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartDrawer;
