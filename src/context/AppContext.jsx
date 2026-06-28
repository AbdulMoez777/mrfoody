import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('mrfoody_cart');
    return localData ? JSON.parse(localData) : [];
  });
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'restaurant'
  const [activeRestaurant, setActiveRestaurant] = useState(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'card' | 'upi'
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    localStorage.setItem('mrfoody_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem.quantity === 1) {
        return prevCart.filter((cartItem) => cartItem.id !== itemId);
      }
      return prevCart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    });
  };

  const updateQuantity = (itemId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((cartItem) => {
          if (cartItem.id === itemId) {
            const newQty = cartItem.quantity + delta;
            return { ...cartItem, quantity: newQty };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const selectRestaurant = (restaurant) => {
    setActiveRestaurant(restaurant);
    setCurrentView('restaurant');
    // Scroll to top when selecting a restaurant
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const placeOrder = () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 60;
    const gst = Math.round(totalAmount * 0.05);
    const finalTotal = totalAmount + deliveryFee + gst;

    setOrderInfo({
      items: [...cart],
      subtotal: totalAmount,
      deliveryFee,
      gst,
      total: finalTotal,
      paymentMethod,
      restaurantName: activeRestaurant ? activeRestaurant.title : "MrFoody Partner",
      orderNumber: "MFD-" + Math.floor(100000 + Math.random() * 900000),
      deliveryTime: activeRestaurant ? `${activeRestaurant.minTime + 10} mins` : "35 mins"
    });

    setCart([]);
    setCartDrawerOpen(false);
    setOrderSuccess(true);
  };

  const resetOrder = () => {
    setOrderSuccess(false);
    setOrderInfo(null);
    setCurrentView('home');
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        currentView,
        setCurrentView,
        activeRestaurant,
        setActiveRestaurant,
        selectRestaurant,
        cartDrawerOpen,
        setCartDrawerOpen,
        paymentMethod,
        setPaymentMethod,
        orderSuccess,
        setOrderSuccess,
        orderInfo,
        placeOrder,
        resetOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
