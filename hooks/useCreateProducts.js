import { useState } from "react";
import PocketBase from "pocketbase";

// Initialize PocketBase instance
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to create a product
  const createProduct = async (formData) => {
    setLoading(true);
    setError(null);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("image", formData.image); // Append image file if provided

    try {
      // Assuming 'products' is the collection name in PocketBase
      await pb.collection("products").create(formDataToSubmit);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading, error };
};

export default useCreateProduct;
