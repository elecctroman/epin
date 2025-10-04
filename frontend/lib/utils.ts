import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskKey(code: string) {
  const sanitized = code.trim();
  if (sanitized.length <= 4) return "****";
  const visible = sanitized.slice(0, 4);
  return `${visible}-${"*".repeat(Math.max(0, sanitized.length - 4))}`;
}
