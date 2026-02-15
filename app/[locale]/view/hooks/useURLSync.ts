import { useEffect } from "react";


    function useURLSync(searchParams: URLSearchParams, { 
        setSearchTerm, setBrand, setCategory, setMaxPrice, setMinScreenSize, setMinStorageOptions, setSortOption, setMinReview
    }: any) {      
        useEffect(() => {
          setSearchTerm(searchParams.get("search") || "");
          setBrand(searchParams.get("brand") || "");
          setCategory(searchParams.get("category") || "");
          setMaxPrice(parseInt(searchParams.get("maxPrice") || "25000"));
          setMinScreenSize(parseFloat(searchParams.get("minScreenSize") || "0"));
          setMinStorageOptions(searchParams.get("storageOpt") || "0");
          setSortOption(searchParams.get("sortBy") || "a-z");
          setMinReview(parseInt(searchParams.get("minReview") || "0"));
        }, [searchParams]);
      
}

export default useURLSync