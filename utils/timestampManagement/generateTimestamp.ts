/**
 * Generates a timestamp string in DDMMYYYY.HHMMSS format.
 * Example: "15 July 2025, 15:45:10" → "15072025.154510"
 */
export function generateTimestamp(): string {
  const now = new Date();

  const pad = (n: number): string => n.toString().padStart(2, '0');

  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1); // Months are 0-indexed
  const year = now.getFullYear();
  const hour = pad(now.getHours());
  const min = pad(now.getMinutes());
  const sec = pad(now.getSeconds());

  return `${day}${month}${year}.${hour}${min}${sec}`;
}