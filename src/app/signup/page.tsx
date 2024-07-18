"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    if (!user.username || !user.email || !user.password) {
      toast.error("Fill out all the fields");
    }
    if (user.username && user.email && user.password) {
      try {
        toast.info("A verification email is sent to your email address");
        setLoading(true);
        await axios.post("/api/users/signup", user);
        router.push("/login");
      } catch (error: any) {
        toast.error("Signup failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-2">
      <Toaster richColors position="top-center" />
      <div className="flex flex-col gap-3 bg-white text-black p-4 rounded-lg">
        <h1 className="text-center text-lg font-semibold">
          {loading ? "PROCESSING" : "SIGNUP"}
        </h1>
        <label htmlFor="username">Username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onSignup}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Signup
        </button>
        <Link href="/login">Visit login page</Link>
      </div>
    </div>
  );
}
