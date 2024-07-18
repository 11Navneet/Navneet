"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    if (!user.email || !user.password) {
      toast.error("Fill out all the fields")
    }
    if(user.email && user.password){
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        toast.success("Login success");
        router.push("/profile");
      } catch (error: any) {
        toast.error("Login failed");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen py-2">
      <Toaster richColors position="top-center" />
      <div className="flex flex-col gap-4 bg-white text-black p-4 rounded-lg">
        <h1 className="text-center text-lg font-semibold">{loading ? "PROCESSING" : "LOGIN"}</h1>
        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
        <button
          onClick={onLogin}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Login
        </button>
        <Link href="/signup">Visit Signup page</Link>
      </div>
    </div>
  );
}
