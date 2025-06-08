import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function formatDateLong(isoString: string): string {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0'); // e.g., "01"
  const month = date.toLocaleString('default', { month: 'short' }); // e.g., "Jan"
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }); // "Jan", "Feb", etc.
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0'); // "09"
  const minutes = String(date.getMinutes()).padStart(2, '0'); // "05"

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

export function formatDateForInput(isoString: string | undefined): string {
  if (!isoString) {
    return "";
  }
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      // If date is invalid, return empty string
      return "";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad with '0' if needed
    const day = String(date.getDate()).padStart(2, '0'); // Pad with '0' if needed
    return `${year}-${month}-${day}`;
  } catch (e) {
    // In case of any error with date string
    return "";
  }
}
