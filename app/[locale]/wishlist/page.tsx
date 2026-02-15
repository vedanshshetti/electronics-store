"use client";
import React, { useEffect, useState } from "react";
import apiFetch from "../view/utils/apiFetch";
import ProductCard from "@/app/components/ViewPage/ProductCard";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const { locale } = useParams() as { locale: string };
  const [cartItems, setCartItems] = useState<any>([]);
  const [cartProducts, setCartProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const router= useRouter();
  const [dummy, setDummy]=useState(0);

  const refreshData= ()=> setDummy((prev)=>prev+1);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCartItems(parsedCart);
  }, [dummy]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cartItems.length === 0) {
        setCartProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const responses = await Promise.all(
  cartItems.map((id: string) =>
    apiFetch("/api/cloudData/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authentication:
          "Bearer " +
          process.env.NEXT_PUBLIC_API_KEY! +
          "___" +
          new Date().getUTCMinutes().toString(),
      },
    })
  )
);

// 🔥 Extract the actual product objects
const products = responses.map((res: any) => res.data);
setCartProducts(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [cartItems]);

  const totalPrice = cartProducts.reduce((sum: any, item: any) => sum + parseFloat(item.price || "0"), 0);

  return (
    <div className="text-center flex flex-col gap-4 p-4 m-1">
      <h1 className="text-3xl font-extrabold">🛒 Your Wishlist</h1>
      <hr />
      <div>
        <h2 className="text-lg font-semibold mb-2">Overview</h2>
        <p>{cartItems.length > 0 ? `${cartItems.length} Item(s)` : "Your wishlist is empty"}</p>
        <p>{cartItems.length > 0 ? `${totalPrice.toFixed(2)}€ total.` : "0€ total."}</p>
      </div>
      <div className={loading ? "" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center"}>
        {loading
          ? "Loading Cart..."
          : cartProducts.map((product: any, index: number) => (
              <ProductCard from="cart" key={product.id || index} product={product} cb={()=> refreshData()} />
            ))}
      </div>
    </div>
  );
};

export default Page;