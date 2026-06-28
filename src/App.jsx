import React from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Header from './components/Header'
import Category from './components/Category'
import TopRest from './components/TopRest'
import OnlineDelivery from './components/OnlineDelivery'
import RestaurantMenu from './components/RestaurantMenu'
import CartDrawer from './components/CartDrawer'
import OrderSuccessModal from './components/OrderSuccessModal'
import Footer from './components/Footer'

function AppContent() {
  const { currentView, orderSuccess } = useApp();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-gray-800">
      <Header />
      
      <main className="flex-grow">
        {currentView === 'home' ? (
          <div className="pb-10">
            <Category />
            <TopRest />
            <OnlineDelivery />
          </div>
        ) : (
          <div className="pb-10">
            <RestaurantMenu />
          </div>
        )}
      </main>
      
      <Footer />
      
      <CartDrawer />
      
      {orderSuccess && <OrderSuccessModal />}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App