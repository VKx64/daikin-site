"use client";
import { customers, products, carts, categories } from "../helper/dummyData";
import { useAuth } from "@/contexts/AuthContext";
import React, { useMemo } from "react";

const Page = () => {
  const { logout } = useAuth();

  // Memoized category and product maps
  const categoryMap = useMemo(() => {
    return categories.reduce((map, { categoryID, categoryName }) => {
      map.set(categoryID, categoryName);
      return map;
    }, new Map());
  }, []);

  const productMap = useMemo(() => {
    return products.reduce(
      (map, { productID, productName, categoryID, price, stock }) => {
        map.set(productID, { name: productName, categoryID, price, stock });
        return map;
      },
      new Map(),
    );
  }, []);

  // Memoized user cart mapping
  const userCarts = useMemo(() => {
    return carts.reduce((cartMap, { userID, productID, quantity }) => {
      if (!cartMap.has(userID)) cartMap.set(userID, []);
      const product = productMap.get(productID) || {
        name: "Unknown",
        categoryID: null,
        price: "-",
        stock: "-",
      };
      const categoryName =
        categoryMap.get(product.categoryID) || "Unknown Category";
      cartMap.get(userID).push({ ...product, categoryName, quantity });
      return cartMap;
    }, new Map());
  }, [productMap, categoryMap]);

  return (
    // MAIN DIV
    <main className="flex h-screen w-full flex-col items-center justify-center gap-y-5 bg-white">
      {/* CUSTOMER LIST SECTION WITH TABLE*/}
      <section className="w-full max-w-3xl rounded-lg bg-black p-5 shadow-lg">
        <h2 className="mb-3 text-center text-xl font-bold text-white">
          CUSTOMER LIST
        </h2>
        {/* Data table */}
        <table className="w-full text-white">
          {/* Table head */}
          <thead className="bg-gray-800 border border-gray-600">
            {/* Table row */}
            <tr>
              {["ID", "NAME", "EMAIL"].map((heading, index) => (
                <th key={index} className="px-4 py-2">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          {/* Table columns and their data */}
          <tbody>
            {customers.map(({ userID, userName, userEmail }) => (
              <tr
                key={userID}
                className="bg-black text-center hover:bg-gray-600 border border-gray-600"
              >
                <td className="px-4 py-2 text-center border border-gray-600">{userID}</td>
                <td className="px-4 py-2 border border-gray-600">{userName}</td>
                <td className="px-4 py-2">{userEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* CUSTOMER CART SECTION WITH TABLE*/}
      <section className="w-[80%] rounded-lg bg-black p-5">
        <h2 className="mb-3 text-center text-xl font-bold text-white">
          CUSTOMER CART
        </h2>
        <table className="w-full text-white">
          {/* Table head */}
          <thead className="bg-gray-800">
            {/* Table rows with their headings */}
            <tr>
              {[
                "CUSTOMER ID",
                "NAME",
                "CART",
                "PROD CATEGORY",
                "PRODUCT STOCK",
                "PRODUCT PRICE",
                "QUANTITY",
              ].map((heading, index) => (
                <th key={index} className="px-4 py-2">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table body */}
          <tbody className="border border-gray-600">
            {customers.map(({ userID, userName }) => {
              const userCart = userCarts.get(userID) || [];
              if (userCart.length === 0) {
                return (
                  // IF USER HAS NO PRODUCTS IN THEIR CART
                  <tr
                    key={userID}
                    className="border-gray-600 bg-black hover:bg-gray-600 text-center"
                  >
                    <td className="px-4 py-2 text-center">{userID}</td>
                    <td className="px-4 py-2 border border-gray-600 ">{userName}</td>
                    <td colSpan="5" className="px-4 py-2 text-center">
                      NO ITEMS
                    </td>
                  </tr>
                );
              }
              // TABLE ROWS WITH DATA
              return userCart.map((product, index) => (
                <tr
                  key={`${userID}-${index}`}
                  className="border border-gray-600 bg-black text-center hover:bg-gray-600"
                >
                  {/* TABLE CELLS WITH MAPPED DATA */}
                  <td className="px-4 py-2 text-center">{userID}</td>
                  <td className="px-4 py-2 border border-gray-600">{userName}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.categoryName}</td>
                  <td className="px-4 py-2">{product.stock}</td>
                  <td className="px-4 py-2">₱{product.price}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </section>

      {/* LOGOUT BUTTON */}
      <button
        onClick={logout}
        className="cursor-pointer rounded-full bg-red-600 px-6 py-2 text-lg font-semibold text-white transition hover:bg-red-700"
      >
        LOGOUT
      </button>
    </main>
  );
};

export default Page;
