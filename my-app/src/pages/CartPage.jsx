import React from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <div className="p-6 text-center">Your cart is empty.</div>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
                <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
              <h2 className="font-semibold">{item.title}</h2>
              <p>
                ${item.price} × {item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
      <button
        onClick={clearCart}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Clear Cart
      </button>
    </div>
  );
}
