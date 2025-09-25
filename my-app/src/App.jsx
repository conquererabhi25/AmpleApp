// In App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import NotFoundPages from "./pages/NotFoundPages";
import { useCart } from "./context/CartContext"; 
import { FaShoppingCart, FaAccusoft } from "react-icons/fa";
import { useTheme } from "./context/ThemeContext";
import Home from "./pages/Home";

export default function App() {
  const { cart } = useCart(); 
  const { darkMode, setDarkMode } = useTheme();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 ">
      <header className="bg-gradient-to-r from-blue-400 via-purple-500 to-black shadow-sm">
        <div className="max-w-6xl gap-3 mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold flex gap-3">
            <FaAccusoft/>
            NeoTrendz
          </Link>
          <nav className="flex items-center">
            <Link to="/product" className="mr-4 text-sm text-white">
              Products
            </Link>
            <Link to="/cart" className="flex items-center text-white">
              <FaShoppingCart/> {cartCount > 0 && <span className="text-sm ml-1 bottom-15">{cartCount}</span>}
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPages />} /> 
        </Routes>
      </main>
    </div>
  );
}

