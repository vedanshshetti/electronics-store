export default function convertToGB(val: string): number {
    val = val.toUpperCase().replace(/\s+/g, "").trim();
    if (val === "/" || val === "") return 0;
    if (val.endsWith("TB")) return parseFloat(val.replace("TB", "")) * 1024;
    if (val.endsWith("GB")) return parseFloat(val.replace("GB", ""));
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  }