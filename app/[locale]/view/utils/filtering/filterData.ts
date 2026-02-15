export function filterData(props: any) {
  const {
    productData,
    maxPrice,
    minScreenSize,
    minStorageOptions,
    minReview,
    brand,
    category,
    searchTerm,
  } = props;

  // const minStorageGB = parseFloat(minStorageOptions);

  return productData.filter((item: any) => {
    const screenSize = item.screenSize !== "/" ? parseFloat(item.screenSize) : null;

    // let hasEnoughStorage = true;

    // try {
    //   const storageOptions: string[] = JSON.parse(item.dataStorageOptions);
    //   const isPlaceholder = storageOptions.length === 1 && storageOptions[0] === "/";

    //   if (minStorageGB > 0) {
    //     if (isPlaceholder) {
    //       hasEnoughStorage = false; // exclude products with ["/"]
    //     } else {
    //       const validStorageOptions = storageOptions
    //         .map(convertToGB)
    //         .filter((gb) => gb > 0);

    //       hasEnoughStorage = validStorageOptions.some((gb) => gb >= minStorageGB);
    //     }
    //   }
    //   // else: minStorageGB === 0 → include everything
    // } catch {
    //   hasEnoughStorage = false; // if parsing fails, exclude item
    // }

    const match =
      item.name.replaceAll(" ", "").toLowerCase().includes(searchTerm.replaceAll(" ", "").toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.replace("&", "").toLowerCase().includes(searchTerm.replaceAll(" ", "").toLowerCase());

    return (
      match &&
      // hasEnoughStorage && ← commented out
      (!brand || item.brand === brand) &&
      parseFloat(item.price) <= maxPrice &&
      (!category || item.category === category) &&
      (!screenSize || screenSize >= minScreenSize) &&
      minReview <= parseFloat(item.reviews)
    );
  });
}