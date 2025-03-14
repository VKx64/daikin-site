"use client";
import React, { useState, useEffect } from "react";
import useFetchProducts from "@/hooks/useFetchProducts";
import ProductCard from "@/components/ProductCard";
import NavBar from "@/components/NavBar";

const Page = () => {
  const { products, loading, error } = useFetchProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!loading && !error) {
      console.log("Fetched products in Page component:", products);
    }
  }, [products, loading, error]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  return (
    <main className="h-full w-full flex flex-col items-center bg-white p-4 gap-2">
      <NavBar />

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="py-4 px-4 bg-gray-200 w-full placeholder:text-black rounded-xl border border-gray-400"
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="w-full h-full overflow-y-scroll">
          <div className="flex flex-wrap gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
