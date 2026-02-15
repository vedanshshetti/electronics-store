const monthNames: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Converts a raw timestamp in DDMMYYYY.HHMMSS format to a readable string.
 * Example: "15072025.154510" → "15 July 2025, 15:45:10"
 */
export function formatTimestamp(raw: string): string {
  const [datePart, timePart] = raw.split(".");
  const day = datePart.slice(0, 2);
  const month = datePart.slice(2, 4);
  const year = datePart.slice(4);
  const hour = timePart.slice(0, 2);
  const minute = timePart.slice(2, 4);
  const second = timePart.slice(4);

  const monthIndex = parseInt(month, 10) - 1;

  return `${day} ${monthNames[monthIndex]} ${year}, ${hour}:${minute}:${second}`;
}