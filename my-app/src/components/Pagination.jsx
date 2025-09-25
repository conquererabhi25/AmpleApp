import React from "react";

export default function Pagination({ onLoadMore, canLoadMore }) {
  return (
    <div className="mt-6 text-center">
      {canLoadMore ? (
        <button
          onClick={onLoadMore}
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Load more products
        </button>
      ) : (
        <div className="text-gray-500">No more products</div>
      )}
    </div>
  );
}
