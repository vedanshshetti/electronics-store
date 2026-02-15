export default function sort(filtered: any[], sortOption: string) {
    switch (sortOption) {
        case "a-z":
          return [...filtered].sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en', { sensitivity: 'base' })
          );
        case "z-a":
          return [...filtered].sort((a, b) =>
            b.name.toLowerCase().localeCompare(a.name.toLowerCase(), 'en', { sensitivity: 'base' })
          );
        case "id-old":
          return [...filtered].sort((a, b) => parseInt(a.id) - parseInt(b.id));
        case "id-new":
          return [...filtered].sort((a, b) => parseInt(b.id) - parseInt(a.id));
        case "price-asc":
          return [...filtered].sort((a, b) => a.price - b.price);
        case "price-desc":
          return [...filtered].sort((a, b) => b.price - a.price);
        case "rating-asc":
          return [...filtered].sort((a, b) => a.reviews - b.reviews);
        case "rating-desc":
          return [...filtered].sort((a, b) => b.reviews - a.reviews);
        default:
          return filtered;
      }
}