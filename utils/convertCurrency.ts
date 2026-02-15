export function convertPrice(num: number, locale: string): string {
  const currencies = {
    eur: 1,       // Base currency
    inr: 103,     // Approx conversion rate as of 11th Sep 2025
    usd: 1.17,    // Approx conversion rate as of 11th Sep 2025
  };

  const localeMap: Record<string, "usd" | "inr" | "eur"> = {
    "en-US": "usd",
    "hi-IN": "inr",
    "kn-IN": "inr",
  };

  const currencyCode = localeMap[locale] ?? "eur";
  const converted = num * currencies[currencyCode];

  // Adjust price to end in .99 if it doesn't already
  const formatted = converted.toFixed(2);
  const adjustedPrice = formatted.endsWith("99")
    ? formatted
    : formatted.slice(0, -2) + "99";

  // Add currency symbol
  switch (currencyCode) {
    case "usd":
      return `$${adjustedPrice}`;
    case "eur":
      return `${adjustedPrice}€`;
    case "inr":
      return `₹${adjustedPrice}`;
    default:
      return "ERROR WHILE CONVERTING";
  }
}