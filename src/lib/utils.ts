import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Chart_Colors = [
  "rgba(124, 181, 236, 0.2)",
  "rgba(145, 232, 224, 0.2)",
  "rgba(67, 67, 72, 0.2)",
  "rgba(144, 237, 125, 0.2)",
  "rgba(40, 138, 137, 0.2)",
  "rgba(247, 163, 93, 0.2)",
  "rgba(128, 133, 233, 0.2)",
  "rgba(224, 84, 84, 0.2)",
  "rgba(241, 92, 128, 0.2)",
  "rgba(227, 210, 84, 0.2)",
]

export const Chart_Borders = [
  "rgba(124, 181, 236, 1)",
  "rgba(145, 232, 224, 1)",
  "rgba(67, 67, 72, 1)",
  "rgba(144, 237, 125, 1)",
  "rgba(40, 138, 137, 1)",
  "rgba(247, 163, 93, 1)",
  "rgba(128, 133, 233, 1)",
  "rgba(224, 84, 84, 1)",
  "rgba(241, 92, 128, 1)",
  "rgba(227, 210, 84, 1)",
]