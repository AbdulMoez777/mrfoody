import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useApp } from "../context/AppContext";

function Footer() {
  const { setCurrentView } = useApp();

  const handleLinkClick = (name) => {
    if (name === "home") {
      setCurrentView("home");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert(`${name} details are available in our official brochure. Stay tuned for offline launches!`);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Shukriya! Thank you for subscribing to MrFoody newsletter. We will send you exclusive food promo codes soon!");
  };

  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 border-t-4 border-[#fc8019]">
      <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Branding & Info */}
        <div className="space-y-4">
          <div className="w-[120px] bg-white p-2 rounded-xl inline-block cursor-pointer" onClick={() => handleLinkClick("home")}>
            <img src="http://localhost:5000/images/mrfoody-logo.webp" alt="MrFoody Logo" className="w-full" />
          </div>
          <p className="text-sm font-semibold leading-relaxed text-gray-400">
            Delivering authentic and scrumptious Pakistani flavors right to your doorstep in Jhelum. Fresh, warm, and hyper-local!
          </p>
          <div className="flex gap-3 pt-2">
            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#fc8019] hover:text-white rounded-full flex items-center justify-center transition duration-300 text-gray-400">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#fc8019] hover:text-white rounded-full flex items-center justify-center transition duration-300 text-gray-400">
              <FaTwitter size={14} />
            </a>
            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#fc8019] hover:text-white rounded-full flex items-center justify-center transition duration-300 text-gray-400">
              <FaInstagram size={14} />
            </a>
            <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#fc8019] hover:text-white rounded-full flex items-center justify-center transition duration-300 text-gray-400">
              <FaYoutube size={14} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-extrabold text-[15px] tracking-wider uppercase mb-5 border-l-3 border-[#fc8019] pl-3">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-[14px]">
            <li>
              <button onClick={() => handleLinkClick("home")} className="hover:text-white hover:underline transition">
                Home / Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("About Us")} className="hover:text-white hover:underline transition">
                About MrFoody
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("Careers")} className="hover:text-white hover:underline transition">
                Careers / Ride With Us
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("Help & Support")} className="hover:text-white hover:underline transition">
                Help & Support
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("Terms of Service")} className="hover:text-white hover:underline transition">
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Local Coverage (Jhelum) */}
        <div>
          <h3 className="text-white font-extrabold text-[15px] tracking-wider uppercase mb-5 border-l-3 border-[#fc8019] pl-3">
            Delivery Areas
          </h3>
          <ul className="space-y-2 text-[14px] font-medium">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Jhelum Cantt
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> G.T. Road / Civil Lines
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Machine Mohallah
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Kala Gujran / Jada
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> River Bank / Kazamabad
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Contact */}
        <div className="space-y-5">
          <div>
            <h3 className="text-white font-extrabold text-[15px] tracking-wider uppercase mb-5 border-l-3 border-[#fc8019] pl-3">
              Newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                required
                type="email"
                placeholder="Enter email..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#fc8019] transition"
              />
              <button type="submit" className="bg-[#fc8019] hover:bg-[#e17013] text-white px-3.5 rounded-lg transition">
                Go
              </button>
            </form>
          </div>

          <div className="space-y-2.5 text-[13.5px]">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#fc8019]" />
              <span>+92 (544) 111-FOODY (36639)</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#fc8019]" />
              <span>support@mrfoody.pk</span>
            </div>
            <div className="flex items-center gap-3 items-start">
              <FaMapMarkerAlt className="text-[#fc8019] mt-1 shrink-0" />
              <span>Block 12-A, G.T. Road Bypass, Jhelum, Pakistan</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="max-w-[1100px] mx-auto px-4 mt-12 pt-6 border-t border-gray-800 text-center text-xs font-semibold">
        <p>© {new Date().getFullYear()} MrFoody Food Delivery Networks Pakistan. All rights reserved.</p>
        <p className="text-gray-600 mt-1">Developed with pure passion & love for Desi Food.</p>
      </div>
    </footer>
  );
}

export default Footer;
