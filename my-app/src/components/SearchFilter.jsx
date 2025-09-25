import React from "react";

export default function SearchFilter({
  search,
  setSearch,
  categories,
  category,
  setCategory,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      {/* Gradient outline wrapper for input */}
      <div className="flex-1 p-[2px] text-white bg-gradient-to-r from-blue-400 to-purple-500 rounded">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product title..."
          className="w-full p-2 rounded bg-white dark:bg-gray-800 border-none outline-none"
        />
      </div>

      {/* Gradient outline wrapper for select */}
      <div className="w-52 p-[2px] bg-gradient-to-r from-blue-400 to-purple-500 rounded">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded text-white bg-white dark:bg-gray-800 border-none outline-none"
        >
          <option value="" className="text-gray-400">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
