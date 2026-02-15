"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const rating=[];


  useEffect(() => {
    if (!id) return;
  
  
    fetch(`/api/cloudData/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched product:", data);
        setProduct(data.data);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product && true) {
    return (
      <div className="flex flex-col items-center">
        <Skeleton className="w-[600px] h-[269px]" />
      </div>
    );
  }
  for (let i = 0; i < parseFloat(product.reviews); i++) {
    rating.push(i);
  }
  return (
    <main className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-col items-center text-center p-4 text-sm md:text-lg">
        <h1 className="text-2xl font-bold italic md:text-3xl">{product.name} - {product.displayPrice}</h1> 
        <small className="font-mono w-96 p-2 rounded-md hover:bg-slate-100 transition-all duration-1000">{product.desc}</small>
      </div>
      <div>
        <Accordion className="w-96 border m-1 rounded-md hover:bg-slate-50 transition-all duration-700 p-1.5" type="single" collapsible>
        <AccordionItem value="specs">
          <AccordionTrigger>Specifications</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2.5">
              <p> <strong className="text-md">Brand: </strong>{product.brand}</p>
              <hr />
              {product.screenSize!=="/" &&
              <><p> <strong className="text-md">Screen Size: </strong>{product.screenSize}</p><hr /></>}
              {product.dataStorageOptions.length>6 && 
              <><p> <strong className="text-md">  Storage/SSD Size: </strong>{JSON.parse(product.dataStorageOptions).join(" | ")}</p> <hr /></>}
               {product["chip/cpu"]!=="/" && 
              <><p> <strong className="text-md">  CPU/Chipset: </strong>{product["chip/cpu"]}</p> <hr /></>}
              {product.os!=="/" &&  
              <p> <strong className="text-md">OS: </strong>{product.os}</p>}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>

      <h2 className="text-lg font-semibold text-center mt-4">Product Image</h2>
      <div className="flex justify-center">
        <Image 
          alt={`Image of ${product.name}`}
          className="size-64 hover:mb-0.5 transition-all duration-200 ease-in-out rounded-lg object-cover" 
          src={product.image} 
          width={200} 
          height={180} 
        />
      </div>
    </main>
  );
};

export default ProductPage;