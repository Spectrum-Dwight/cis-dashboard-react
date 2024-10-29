import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Chart_Colors = [
  "rgba(70, 130, 180, 0.4)",   // Steel Blue
  "rgba(0, 0, 139, 0.4)",      // Dark Blue
  "rgba(139, 0, 0, 0.4)",      // Dark Red
  "rgba(105, 105, 105, 0.4)",  // Dim Gray
  "rgba(72, 61, 139, 0.4)",    // Dark Slate Blue
  "rgba(220, 20, 60, 0.4)",    // Crimson
  "rgba(25, 25, 112, 0.4)",    // Midnight Blue
  "rgba(178, 34, 34, 0.4)",    // Firebrick
  "rgba(0, 51, 102, 0.4)",     // Navy Darker
  "rgba(128, 0, 0, 0.4)",      // Maroon
];

export const Chart_Borders = [
  "rgba(70, 130, 180, 1)",
  "rgba(0, 0, 139, 1)",
  "rgba(139, 0, 0, 1)",
  "rgba(105, 105, 105, 1)",
  "rgba(72, 61, 139, 1)",
  "rgba(220, 20, 60, 1)",
  "rgba(25, 25, 112, 1)",
  "rgba(178, 34, 34, 1)",
  "rgba(0, 51, 102, 1)",
  "rgba(128, 0, 0, 1)",
];
