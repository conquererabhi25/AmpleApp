import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col justify-center items-center 
                 bg-gradient-to-r from-blue-300 to-purple-300 
                 rounded-lg shadow hover:shadow-md overflow-hidden transition-transform transform hover:scale-105"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-[50vw] md:w-[10vw] h-44 object-cover"
      />
      <div className="p-3 bg-white/80 w-full">
        <h3 className="font-semibold text-sm truncate">{product.title}</h3>
        <div className="mt-2 flex items-center justify-between text-sm">
          <div>
            <div className="text-green-600 font-bold">₹{product.price}</div>
            <div className="text-gray-500 text-xs">{product.category}</div>
          </div>
          <div className="text-yellow-600 text-sm">⭐ {product.rating}</div>
        </div>
      </div>
    </Link>
  );
}
