import axios from "axios";

const BASE = "https://dummyjson.com/products";

export const fetchProducts = async ({
  limit = 12,
  skip = 0,
  search = "",
  category = "",
} = {}) => {
  // If search provided, use search endpoint
  let url;
  if (search) {
    url = `${BASE}/search?q=${encodeURIComponent(
      search
    )}&limit=${limit}&skip=${skip}`;
  } else if (category) {
    url = `${BASE}/category/${encodeURIComponent(
      category
    )}?limit=${limit}&skip=${skip}`;
  } else {
    url = `${BASE}?limit=${limit}&skip=${skip}`;
  }
  const res = await axios.get(url);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE}/${id}`);
  return res.data;
};

export const fetchCategories = async () => {
  const res = await axios.get(`${BASE}/categories`);
  return res.data;
};
