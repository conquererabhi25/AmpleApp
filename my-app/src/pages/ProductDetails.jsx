import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/products";
import QRCode from "react-qr-code";
import { ClipLoader } from "react-spinners";
import NoProductImage from "../../public/no-products.jpg";
import { useCart } from "../context/CartContext";

function ImageCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);
  if (!images || images.length === 0) return null;

  return (
    <div className="relative">
      <img
        src={images[index]}
        alt={`img-${index}`}
        className="w-full h-96 object-contain bg-white rounded"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setIndex((i) => (i - 1 + images.length) % images.length)
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded shadow"
          >
            ◀
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded shadow"
          >
            ▶
          </button>
        </>
      )}
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        alert("Error loading product");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ClipLoader size={50} color="red" />
      </div>
    );
  if (!product)
    return (
      <div>
        <img src={NoProductImage} alt="No Product" />
      </div>
    );

  const availabilityStatus = product.stock > 0 ? "In stock" : "Out of stock";

  return (
    <div className="space-y-12 mt-12">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left column - images */}
        <div>
          <ImageCarousel images={product.images} />

          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className="h-20 w-full object-cover rounded border cursor-pointer"
                onClick={() => {}}
              />
            ))}
          </div>
        </div>

        {/* Right column - details */}
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="text-gray-600 mt-1">
            {product.brand} • {product.category}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="text-3xl font-extrabold">₹{product.price}</div>
            <div className="text-sm text-gray-800">
              Discount: {product.discountPercentage}%
            </div>
            <div className="text-sm text-yellow-800">⭐ {product.rating}</div>
          </div>

          <div className="mt-4 text-sm text-gray-700">
            {product.description}
          </div>

          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <strong>Stock:</strong> {product.stock}
            </li>
            <li>
              <strong>Availability:</strong> {availabilityStatus}
            </li>
            <li>
              <strong>Min order qty:</strong> 1
            </li>
            <li>
              <strong>Warranty:</strong> 6 months (example)
            </li>
            <li>
              <strong>Shipping:</strong> Free shipping above ₹999 (example)
            </li>
            <li>
              <strong>Dimensions:</strong>{" "}
              {product.dimensions ? JSON.stringify(product.dimensions) : "N/A"}
            </li>
            <li>
              <strong>Weight:</strong> {product.weight || "N/A"}
            </li>
          </ul>

          <div className="mt-6 gap-4 ">
            <button
              onClick={() => {
                addToCart(product);
                alert("Product added successfully! ✅");
              }}
              className="px-4 py-2 mr-3 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <button className="px-4 py-2 border rounded cursor-pointer">Buy now</button>
          </div>

          {/* QR Code Section */}
          <div className="mt-6    p-4 rounded">
            <div className="mb-2 font-semibold">Product QR Code</div>
            <div className="inline-block bg-white p-3 rounded">
              <QRCode
                value={
                  product?.meta?.qrCode ||
                  `https://dummyjson.com/products/${product.id}`
                }
                size={128}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-3">
            {product.reviews.map((r, i) => (
              <div key={i} className="p-3  rounded shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{r.user || "Anonymous"}</div>
                  <div className="text-yellow-800">⭐ {r.rating}</div>
                </div>
                <div className="text-sm text-gray-700 mt-1">{r.comment}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">
            No reviews available for this product.
          </div>
        )}
      </div> 
    </div>
  );
}
