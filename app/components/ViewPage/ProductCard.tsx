"use client";
import React, { useEffect, useState } from "react";
import { useLocale } from "@/locales";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, StarHalf } from "lucide-react";
import { ShareButton } from "../Share";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react"

interface Product {
  id_public: string;
  id: string;
  name: string;
  brand: string;
  displayPrice: string;
  desc: string;
  img: string;
  reviews?: string;
  [key: string]: any
}

interface ProductCardProps {
  loading?: boolean;
  product?: Product;
  from?: string;
  cb?: ()=>void;
}

const ProductCard = ({ loading = false, product, from = "default", cb }: ProductCardProps) => {
  const { locale } = useParams() as { locale: string };
  const translations: any = useLocale();
  const [isAdded, setIsAdded] = useState(false);
  const [learning, setLearning] = useState(false);

  const toggleLearning= ()=> setLearning((prev)=> !prev);

  useEffect(() => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    setIsAdded(cart.includes(product.id_public));
  }, [product]);

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    if (!cart.includes(product.id_public)) {
      cart.push(product.id_public);
      localStorage.setItem("cart", JSON.stringify(cart));
      setIsAdded(true);
    }
  };

  const removeFromCart = (cb: ()=> void) => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const updatedCart = cart.filter((id: string) => id !== product.id_public);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsAdded(false);
    cb();
  };

  if (loading || !product) {
    return <Skeleton className="border rounded-sm h-[116px] m-2 w-[255px]" />;
  }

  if(!learning){
    return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.95}}} className={"border-2 rounded-md p-2 text-center w-40 sm:w-[180px] md:w-[200px] flex flex-col items-center gap-2 shadow-sm "}>
      <h2 className="text-md font-extrabold">
        <Link href={`/${locale ?? "en-US"}/view/${product.id_public}`}>
          {product.name}
        </Link>
      </h2>
      <p>
        <strong>{translations.viewpage.price[locale ?? "en-US"]}</strong>{" "}
        {product.displayPrice}
      </p>
      <p>
        <strong>{translations.viewpage.brand[locale ?? "en-US"]}</strong>{" "}
        {product.brand}
      </p>
      {product.os &&  <p className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
        <strong>OS:</strong> {(product.os=="/") ? "N/A" : product.os}
      </p>}
     
      <Image
        alt="Product Image"
        width={120}
        height={140}
        src={product.img}
        className="object-contain"
        loading="lazy"
      />


      <ShareButton
        props={{
          link: `https://vedansh-eshop.netlify.app/${locale ?? "en-US"}/view/${product.id}`,
          name: product.name,
          animate: true
        }}
      />

       <ToggleButton t={toggleLearning} msg="Learn More"></ToggleButton>

      <StarRating rating={parseFloat(product.reviews || "0")} />

      {from === "default" ? (
        <Button onClick={addToCart} disabled={isAdded} variant="outline">
          {isAdded ? "Added" : "Add to Wishlist"}
        </Button>
      ) : (
        <Button onClick={()=> removeFromCart(()=> cb!())}>Remove from Wishlist</Button>
      )}
    </motion.div>
  );
  }
  return (
    <motion.div initial={{opacity: 0.1}} animate={{opacity: 1, alignItems: "center", transition: {duration: 0.95}}}  className={"border-2 rounded-md p-2 text-center w-40 sm:w-[180px] md:w-[200px] flex flex-col items-center gap-2 shadow-sm "}>
      <h2 className="text-md font-extrabold">
        <Link href={`/${locale ?? "en-US"}/view/${product.id_public}`}>
          {product.name}
        </Link>
      </h2>
      <p>
        {product.desc}
      </p>

      

      <ShareButton
        props={{
          link: `https://vedansh-eshop.netlify.app/${locale ?? "en-US"}/view/${product.id}`,
          name: product.name,
          animate: false
        }}
      />
      <ToggleButton t={toggleLearning} msg="Go Back"></ToggleButton>
      <StarRating rating={parseFloat(product.reviews || "0")} />

      {from === "default" ? (
        <Button onClick={addToCart} disabled={isAdded} variant="outline">
          {isAdded ? "Added" : "Add to Wishlist"}
        </Button>
      ) : (
        <Button onClick={()=> removeFromCart(()=> cb!())}>Remove from Wishlist</Button>
      )}
    </motion.div>
  );
};

export default React.memo(ProductCard);

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  return (
    <div className="flex flex-row gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`star-full-${i}`} className="w-4 h-4 text-yellow-500" fill="currentColor" />
      ))}
      {hasHalfStar && <StarHalf key="star-half" className="w-4 h-4 text-yellow-500" />}
      {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`star-empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

const ToggleButton= ({t, msg}: {t: ()=>void, msg: string})=>{
  return <button className="border p-1.5 text-md sm:p-1 rounded-md" onClick={t}>{msg}</button>
}