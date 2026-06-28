import React, { useEffect } from "react";
import { FaCheckCircle, FaMotorcycle, FaRegClock, FaReceipt } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function OrderSuccessModal() {
  const { orderInfo, resetOrder } = useApp();

  // Scroll to top when this modal mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!orderInfo) return null;

  const getPaymentLabel = (method) => {
    switch (method) {
      case "cod":
        return "Cash on Delivery (COD)";
      case "card":
        return "Credit/Debit Card (Paid)";
      case "easypaisa_jazzcash":
        return "EasyPaisa / JazzCash Wallet (Paid)";
      default:
        return "Cash on Delivery (COD)";
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[99] flex flex-col justify-between overflow-y-auto">
      {/* Top Section: Celebration Header */}
      <div className="bg-gradient-to-b from-emerald-50/50 to-white px-6 py-12 flex-grow flex flex-col items-center justify-center text-center">
        {/* Animated Check icon */}
        <div className="w-24 h-24 bg-emerald-100/70 border border-emerald-200/50 rounded-full flex items-center justify-center mb-6 shadow-sm animate-bounce">
          <FaCheckCircle className="text-emerald-500" size={56} />
        </div>

        <h1 className="text-[28px] font-black text-gray-800 tracking-tight">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-500 font-medium mt-2 max-w-[360px] text-[14.5px] leading-relaxed">
          Your order from <strong className="text-gray-800 font-bold">{orderInfo.restaurantName}</strong> has been received. Our chef is preparing your meal.
        </p>

        {/* Estimated Time Indicator */}
        <div className="mt-8 flex items-center justify-center gap-4 bg-orange-50/70 border border-orange-100 rounded-2xl px-6 py-4 max-w-[400px] w-full shadow-sm">
          <FaRegClock className="text-[#fc8019]" size={24} />
          <div className="text-left">
            <p className="text-xs uppercase font-extrabold text-orange-600 tracking-wider">Estimated Delivery</p>
            <p className="text-[17px] font-black text-gray-800">{orderInfo.deliveryTime}</p>
          </div>
        </div>

        {/* Receipt Container */}
        <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6 max-w-[500px] w-full text-left shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="flex items-center gap-1.5 text-xs uppercase font-black text-gray-400 tracking-wider">
              <FaReceipt /> Order Invoice
            </span>
            <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
              {orderInfo.orderNumber}
            </span>
          </div>

          {/* List of items */}
          <div className="py-4 space-y-2 max-h-[180px] overflow-y-auto pr-1">
            {orderInfo.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm font-semibold text-gray-600">
                <span>
                  {item.name} <span className="text-gray-400 font-normal">x{item.quantity}</span>
                </span>
                <span>Rs. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Calculations */}
          <div className="border-t border-dashed border-gray-200 pt-4 space-y-1.5 text-xs font-semibold text-gray-500">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {orderInfo.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>Rs. {orderInfo.deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span>Rs. {orderInfo.gst}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-gray-800 pt-2 border-t border-gray-100">
              <span>Grand Total Paid</span>
              <span className="text-[#fc8019] text-[15px]">Rs. {orderInfo.total}</span>
            </div>
          </div>

          {/* Payment info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">Method</span>
            <span className="text-xs font-bold text-gray-700">{getPaymentLabel(orderInfo.paymentMethod)}</span>
          </div>
        </div>

        {/* Simple tracker note */}
        <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-[#fc8019]">
          <FaMotorcycle className="animate-pulse" size={16} />
          <span>Our delivery partner is arriving at Jhelum City address shortly.</span>
        </div>
      </div>

      {/* Footer / Control Button */}
      <div className="bg-white border-t border-gray-100 p-5 flex items-center justify-center">
        <button
          onClick={resetOrder}
          className="max-w-[400px] w-full bg-[#fc8019] text-white py-3.5 rounded-xl font-extrabold shadow-lg hover:bg-[#e17013] active:scale-95 transition text-center cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default OrderSuccessModal;
