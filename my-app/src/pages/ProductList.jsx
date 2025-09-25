import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";
import { fetchProducts, fetchCategories } from "../api/products";
import { ClipLoader } from "react-spinners";

export default function ProductList() {
  const LIMIT = 12;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState(""); // New sorting state

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    // When search, category, or sort changes, reset list
    setProducts([]);
    setSkip(0);
    setHasMore(true);
    loadProducts({ reset: true, search, category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, sortBy]);

  const loadProducts = async ({
    reset = false,
    search: s = "",
    category: c = "",
  } = {}) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetchProducts({
        limit: LIMIT,
        skip: reset ? 0 : skip,
        search: s,
        category: c,
      });
      let newItems = res.products || [];
      
      // Apply sorting to the fetched products
      newItems = sortProducts(newItems);
      
      setProducts((prev) => {
        const updatedProducts = reset ? newItems : [...prev, ...newItems];
        // If it's not a reset, we need to re-sort the entire array
        return reset ? updatedProducts : sortProducts(updatedProducts);
      });
      setSkip((prev) => (reset ? newItems.length : prev + newItems.length));
      setHasMore(
        (res.total || 0) > (reset ? newItems.length : skip + newItems.length)
      );
    } catch (err) {
      console.error(err);
      alert("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  // Sorting function
  const sortProducts = (productsToSort) => {
    if (!sortBy) return productsToSort;

    return [...productsToSort].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating-high":
          return (b.rating || 0) - (a.rating || 0);
        case "rating-low":
          return (a.rating || 0) - (b.rating || 0);
        case "discount-high":
          const discountA = a.discountPercentage || 0;
          const discountB = b.discountPercentage || 0;
          return discountB - discountA;
        case "discount-low":
          const discountA2 = a.discountPercentage || 0;
          const discountB2 = b.discountPercentage || 0;
          return discountA2 - discountB2;
        default:
          return 0;
      }
    });
  };

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    // Re-sort existing products immediately for better UX
    setProducts(prev => sortProducts(prev));
  };

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4 text-center">Products</h1>
      
      <div className="mb-6 space-y-4">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          categories={categories}
          category={category}
          setCategory={setCategory}
        />

        {/* Sorting Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between  bg-gradient-to-r from-blue-300 to-purple-300  p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-1 border  bg-gray-800 text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
            >
              <option value="">Default</option>
              <optgroup label="Price">
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </optgroup>
              <optgroup label="Rating">
                <option value="rating-high">Rating: High to Low</option>
                <option value="rating-low">Rating: Low to High</option>
              </optgroup>
              <optgroup label="Discount">
                <option value="discount-high">Discount: High to Low</option>
                <option value="discount-low">Discount: Low to High</option>
              </optgroup>
            </select>
          </div>
          
          {/* Results count */}
          <div className="text-sm text-gray-600">
            Showing {products.length} products
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {loading && (
        <div className="w-full h-full flex flex-col items-center justify-center py-8">
          <ClipLoader size={50} color="red" />
        </div>
      )}

      <Pagination
        onLoadMore={() => loadProducts({ reset: false, search, category })}
        canLoadMore={hasMore && !loading}
      />
    </div>
  );
}