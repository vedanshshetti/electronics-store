// ─── React & Next Core ─────────────────────────────
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// ─── UI Components ────────────────────────────────
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";

// ─── Filters ──────────────────────────────────────
import MaxPriceSlider from "../../components/ViewPage/filters/MaxPriceSlider";
import MinScreenSizeSlider from "../../components/ViewPage/filters/MInScreenSizeSlider";
import MinStorageSlider from "../../components/ViewPage/filters/MinStorageSlider";
import MinReview from "@/app/components/ViewPage/filters/ReviewFilter";
import { Combobox as BrandCombobox } from "../../components/ViewPage/filters/BrandCombobox";
import { Combobox as CategoryCombobox } from "../../components/ViewPage/filters/CategoryCombobox";

// ─── Dynamic Components ───────────────────────────
import dynamic from "next/dynamic";
const ProductCard = dynamic(() => import("../../components/ViewPage/ProductCard"), {
  loading: () => <Skeleton className="border rounded-sm h-[116px] m-2 w-[255px]" />,
  ssr: false,
  
});

// ─── Utilities & Hooks ────────────────────────────
import { useLocale } from "@/locales";
import apiFetch from "./utils/apiFetch";
import useURLSync from "./hooks/useURLSync";
import { categoryMap } from "./constants/categoryMap";
import { filterData } from "./utils/filtering/filterData";
import sort from "./utils/sort";




const Page = () => {
  const { locale } = useParams() as { locale: string };
  const router = useRouter();
  const searchParams = useSearchParams();
  const translations: any= useLocale();

  const {
    defaultSearch,
    defaultBrand,
    defaultCategory,
    defaultMaxPrice,
    defaultMinScreenSize,
    defaultStorageOptions,
    defaultSortOption,
    defaultMinReview
  } = {
    defaultSearch: searchParams.get("search") || "",
    defaultBrand: searchParams.get("brand") || "",
    defaultCategory: searchParams.get("category") || "",
    defaultMaxPrice: parseInt(searchParams.get("maxPrice") || "25000"),
    defaultMinScreenSize: parseFloat(searchParams.get("minScreenSize") || "0"),
    defaultStorageOptions: searchParams.get("storageOpt") || "0",
    defaultSortOption: searchParams.get("sortBy") || "a-z",
    defaultMinReview: parseInt(searchParams.get("minReview") || "0")
  };

  const [productData, setProductData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(defaultSearch);
  const [brand, setBrand] = useState(defaultBrand);
  const [category, setCategory] = useState(defaultCategory);
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
  const [minScreenSize, setMinScreenSize] = useState(defaultMinScreenSize);
  const [minStorageOptions, setMinStorageOptions] = useState<any>(defaultStorageOptions);
  const [sortOption, setSortOption] = useState(defaultSortOption);
  const [minReview, setMinReview] = useState(defaultMinReview);
  const [brands, setBrands] = useState<{ name: string; value: string }[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await apiFetch("/api/cloudData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": ("Bearer "+ process.env.NEXT_PUBLIC_API_KEY+"___"+new Date().getUTCMinutes().toString())
          },
        });
        setProductData(req.data);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsFetching(false);
      }
    };
  
    fetchData();
  }, []);
  useEffect(() => {
  const params = new URLSearchParams();
  if (searchTerm) params.set("search", searchTerm);
  if (brand) params.set("brand", brand);
  if (category) params.set("category", category);
  params.set("maxPrice", maxPrice.toString());
  params.set("minScreenSize", minScreenSize.toString());
  params.set("storageOpt", minStorageOptions.toString());
  params.set("sortBy", sortOption);
  const newURL = `?${params.toString()}`;
  if (window.location.search !== newURL) router.replace(newURL);
}, [searchTerm, brand, maxPrice, category, minScreenSize, minStorageOptions, minReview]);

  const filteredProducts = useMemo(() => {
    const filtered = filterData({
      productData,
      maxPrice,
      minScreenSize,
      minStorageOptions,
      minReview,
      brand,
      category,
      searchTerm
    });
  
    return sort(filtered, sortOption);
  }, [
    productData,
    searchTerm,
    maxPrice,
    minScreenSize,
    minStorageOptions,
    brand,
    category,
    minReview,
    sortOption,
  ]);
  
  const ct = useMemo(() =>
    [...new Set(productData.map((item) => item.category))]
      .filter(Boolean)
      .map((c) => ({ name: categoryMap[c]+` (${productData.filter((I)=> I.category==c).length})`, value: c }))
  , [productData]);

  const categories= [{ name: "All ("+productData.length+")", value: "" }, ...ct]


  useEffect(() => {
    if (!category) {
      const allBrands = [...new Set(productData.map((item) => item.brand))]
        .filter(Boolean)
        .map((b) => ({ name: b, value: b }));
      setBrands(allBrands);
      setBrand(defaultBrand ? defaultBrand : "");
      return;
    }

    const filtered = productData.filter((item) => item.category === category);
    const updatedBrands = [...new Set(filtered.map((item) => item.brand))]
      .filter(Boolean)
      .map((b) => ({ name: b, value: b }));
    setBrands(updatedBrands);
    setBrand(defaultBrand ? defaultBrand : "");
  }, [category, productData]);



  useURLSync(searchParams, {setSearchTerm, setBrand, setCategory, setMaxPrice, setMinScreenSize, setMinStorageOptions, setMinReview, setSortOption });
  
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-semibold">
        {translations.viewpage.view[locale ?? "en-US"]}
      </h1>
  
      <Input
        className="w-[50%]"
        placeholder={translations.viewpage.search[locale ?? "en-US"]}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  
      <Accordion type="single" collapsible>
        <AccordionItem value="filters">
          <AccordionTrigger>{translations.viewpage.filters[locale ?? "en-US"]}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2.5">
            <CategoryCombobox data={categories} value={category} onChange={setCategory} />
            <BrandCombobox data={brands} value={brand} onChange={setBrand} />
            <MaxPriceSlider setMaxPrice={setMaxPrice} maxPrice={maxPrice} />
            <MinScreenSizeSlider
              minScreenSize={minScreenSize}
              setMinScreenSize={setMinScreenSize}
            />
            <MinStorageSlider
              setMinStorage={setMinStorageOptions}
              minStorage={minStorageOptions}
            />
            <MinReview 
              setMinReview={setMinReview}
              minReview={minReview}
            >
            </MinReview>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  
      {/* Sort By Dropdown + Load More */}
      <div className="w-full max-w-7xl px-6 mt-4 flex gap-2 justify-start mb-2">
        <Select onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={translations.viewpage.sortBy[locale ?? "en-US"]} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id-new"><strong>Default:</strong>Newest to Oldest</SelectItem>
            <SelectItem value="id-old"><strong>Default:</strong>Oldest to Newest</SelectItem>
            <SelectItem value="a-z"><strong>Name:</strong>A to Z</SelectItem>
            <SelectItem value="z-a"><strong>Name:</strong>Z to A</SelectItem>
            <SelectItem value="price-asc"><strong>Price:</strong>Low to High</SelectItem>
            <SelectItem value="price-desc"><strong>Price:</strong>High to Low</SelectItem>
            <SelectItem value="rating-asc"><strong>Rating:</strong>Low to High</SelectItem>
            <SelectItem value="rating-desc"><strong>Rating:</strong>High to Low</SelectItem>
          </SelectContent>
        </Select>
  
      </div>
  
      <div className="grid w-full max-w-7xl px-6 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-10">
  {isFetching ? (
    <div className="col-span-full flex flex-col items-center justify-center w-full py-10">
      <p className="mt-4 text-black text-sm">Loading...</p>
    </div>
  ) : filteredProducts.length === 0 ? (
    <p className="col-span-full mt-6 text-black">No products matched your filters.</p>
  ) : (
    // Render the filtered products
    filteredProducts.map((item: any, index: any) => (
      <ProductCard key={index} product={item} />
    ))
  )}
</div>
      
    </div>
  );
};

export default React.memo(Page);