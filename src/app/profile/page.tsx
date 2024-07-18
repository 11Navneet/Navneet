"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  interface CartItem {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    rating: {
      rate: number;
    };
  }
  const router = useRouter();
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [data, setData] = useState("Profile");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCartData = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://fakestoreapi.com/products");
        const cartItem = await response.data;
        setCartItem(cartItem);
      } catch (error: any) {
        toast.error("Error while fetching products data");
      }finally {
        setLoading(false);
      }
    };
    getCartData();
  }, []);

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/api/users/me");
      setData(res.data.data.username);
    };
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between w-full px-5">
        <p className="text-xl">{data}</p>
        <button
          onClick={logout}
          className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-4">
        {loading && (
          <div>LOADING YOUR PRODUCTS DATA</div>
        )}
        <div className="grid grid-cols-4 gap-6 px-4">
          {cartItem.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-1 p-3 bg-white text-slate-900 rounded-lg text-sm "
            >
              <img src={item.image} alt="" className="h-52 object-contain" />
              <p className="font-bold truncate">{item.title}</p>
              <p className="h-20 overflow-hidden text-ellipsis -webkit-line-clamp-2">
                {item.description}
              </p>
              <p>{item.rating.rate} ⭐</p>
              <p className="font-bold">$ {item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
