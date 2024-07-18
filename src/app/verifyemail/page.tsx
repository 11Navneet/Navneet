"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {verified && (
        <div className="bg-white text-black p-4 font-bold rounded-lg">
          <h2 className="text-2xl mb-5">Email Verified</h2>
          <Link href="/login">Go To Login Page</Link>
        </div>
      )}
      {error && (
        <div className="text-black p-4 font-bold rounded-lg">
          <h2 className="text-2xl">Email Not Verified</h2>
        </div>
      )}
    </div>
  );
}
