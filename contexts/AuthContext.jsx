"use client";
import { createContext, useContext, useState, useEffect } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

  useEffect(() => {
    const authData = pb.authStore.model;
    setUser(authData);
  }, []);

  const login = async (email, password) => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      console.log("Login successful:", authData);

      setUser(authData.record);
      redirectUser(authData.record.role);
      return authData.record;
    } catch (error) {
      if (error.status === 400) {
        // Handle invalid credentials without logging an error in the console
        alert("Invalid email or password! Please try again.");
      } else {
        // Log unexpected errors for debugging
        console.error("Login failed:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  // IF USER LOGS OUT = SENT TO /AUTH (AKA LOGIN PAGE)
  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    router.push("/auth");
  };

  // IF ROLE = ADMIN/TECHNICIAN/USER PUSH THEM TO THEIR CORRESPONDING LANDING PAGE
  const redirectUser = (role) => {
    if (role === "admin") return router.push("/admin");
    if (role === "technician") return router.push("/technician");
    router.push("/customer");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
