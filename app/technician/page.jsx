"use client"
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const Page = () => {
  const { logout } = useAuth();
  return (
    <main className="h-screen w-full justify-center items-center flex">
      <button onClick={logout} className="bg-red-600 w-[30%] h-[10%] rounded-[200px] cursor-pointer">
        LOGOUT
      </button>
    </main>
  );
};

export default Page;
