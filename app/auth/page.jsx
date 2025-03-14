"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Page = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (!user) return;
    } catch (error) {
      console.error("Login failed:", error);
      if (error.status === 400) {
        alert("Invalid email or password!");
      }
    }
  };

  return (
    <main
      className="h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: "url('/images/bg-filter.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Login Card */}
      <section className="w-96 h-fit bg-[#F8F8FF] shadow-lg flex flex-col items-center justify-center p-6 rounded-lg gap-5">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-black mb-6">Please Login</h1>
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-fit px-4 py-2 w-full text-black rounded-lg bg-white shadow-md placeholder:text-gray-800"
        />
        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-fit w-full px-4 py-2 rounded-lg bg-white shadow-md placeholder:text-gray-800 text-black"
        />
        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleLogin}
          className="w-full h-fit px-4 py-2 bg-blue-400 m-auto rounded-lg text-[#F8F8FF] cursor-pointer shadow-lg"
        >
          Login
        </button>
      </section>
    </main>
  );
};

export default Page;
