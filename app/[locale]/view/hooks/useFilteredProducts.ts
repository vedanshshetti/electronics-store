import { useMemo } from 'react';
import sort from '../utils/sort';         // adjust path as needed
import { filterData } from '../utils/filtering/filterData';


function useFilteredProducts({
  productData,
  maxPrice,
  minScreenSize,
  minStorageOptions,
  minReview,
  brand,
  category,
  searchTerm,
  sortOption,
}: any) {
  const filteredAndSorted = useMemo(() => {
    const filtered = filterData({
      productData,
      maxPrice,
      minScreenSize,
      minStorageOptions,
      minReview, 
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

  return filteredAndSorted;
}

export default useFilteredProducts;