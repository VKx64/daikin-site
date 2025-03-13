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
        
        if (user) {
            if (user.role === "admin") {
                router.push("/admin");
            } else if (user.role === "technician") {
                router.push("/technician");
            } else {
                router.push("/customer");
            }
        }
    } catch (error) {
        console.error("Login failed:", error);
        
        if (error.status === 400) {
            alert("Invalid email or password!");
        }
    }
};


  return (
    // MAIN DIV
    <main className="h-screen w-full bg-white flex justify-center items-center">
      {/* LOGIN CARD */}
      <section className="w-[20%] h-[40%] bg-[#F8F8FF] shadow-lg flex flex-col items-center justify-center p-6 rounded-lg">
        {/* LOGIN HEADER */}
        <h1 className="text-2xl font-semibold text-black mb-6">LOGIN</h1>
        {/* EMAIL INPUT FIELD */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 w-[80%] px-4 mb-4 text-black rounded-lg bg-white shadow-md placeholder:text-black"
        />
        {/* PASSWORD INPUT FIELD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-12 w-[80%] px-4 rounded-lg bg-white shadow-md placeholder:text-black text-black"
        />
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          onClick={handleLogin}
          className="w-[40%] h-[10%] bg-blue-400 m-auto rounded-[200px] text-[#F8F8FF] cursor-pointer shadow-lg"
        >
          SUBMIT
        </button>
      </section>
    </main>
  );
};

export default Page;
