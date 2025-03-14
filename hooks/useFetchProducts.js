import { useState, useEffect } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://dbdaikin.07130116.xyz");

// Custom hook to fetch products
const useFetchProducts = () => {
  // State to store products data
  const [products, setProducts] = useState([]);
  // State to track loading state
  const [loading, setLoading] = useState(true);
  // State to track errors
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await pb.collection("products").getList(1, 100, {
          requestKey: null
        });
        console.log("Fetched products:", result.items); // Log the fetched data
        setProducts(result.items);
      } catch (error) {
        setError("Error fetching products.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    // Fetch products when the component mounts
    fetchProducts();
  }, []);

  // Return the products data, loading state, and errors
  return { products, loading, error };
};

export default useFetchProducts;