import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string | undefined): string {
  if (price === undefined) return '0';
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return Math.round(num).toString();
}
