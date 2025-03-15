"use client";
import React, { useState } from "react";
import useFetchProducts from "@/hooks/useFetchProducts";
import ProductAdmin from "@/components/ProductAdmin";
import NavBarAdmin from "@/components/NavBarAdmin";
import ModalCreateProduct from "@/components/ModalCreateProduct"; // Import the modal component

const Page = () => {
  const { products, loading, error } = useFetchProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="h-full w-full bg-blue-100 flex flex-col p-4 gap-2">
      <NavBarAdmin />
      <div className="w-full h-fit bg-pink-200">
        <button className="btn btn-soft" onClick={openModal}>
          New Product
        </button>
      </div>

      <div className="w-full h-full bg-orange-100">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div className="flex flex-wrap gap-4">
            {products.map((product) => (
              <ProductAdmin key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>

      {/* Modal for creating new product */}
      <ModalCreateProduct isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
};

export default Page;
