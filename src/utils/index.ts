import { useMediaQuery, useTheme } from "@mui/material";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

type RouterLocation = ReturnType<typeof useLocation>;
export const TOKEN_STORAGE = import.meta.env.VITE_TOKEN_STORAGE;
export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export const getTokenFromStorage = () => {
  switch (TOKEN_STORAGE) {
    case "localStorage":
      return localStorage.getItem(TOKEN_KEY);
    case "cookie":
      return Cookies.get(TOKEN_KEY);
    default:
      console.error(`Unsupported token storage method: ${TOKEN_STORAGE}`);
      return null;
  }
};

export const isAuthLayout = (location: RouterLocation) => {
  // lacation is made of useLocation()
  const currentPath = location.pathname;
  return currentPath?.includes("auth/");
};

export const isDesktop = () => {
  const theme = useTheme();
  const isDesktopMode = useMediaQuery(theme.breakpoints.up("sm"));
  return isDesktopMode;
};

const persianToArabicMap: Record<string, string> = {
  ک: "ك",
  ی: "ي",
};

export function normalizePersianToArabic(text: string): string {
  return text
    .split("")
    .map((char) => persianToArabicMap[char] ?? char)
    .join("");
}

export async function sha256(input: any): Promise<string> {
  let data: ArrayBuffer;
  if (input instanceof ArrayBuffer) {
    // Already ArrayBuffer
    data = input;
  } else if (input instanceof Blob || input instanceof File) {
    // File or Blob → ArrayBuffer
    data = await input.arrayBuffer();
  } else if (typeof input === "string") {
    // String → UTF-8 bytes
    data = new TextEncoder().encode(input);
  } else if (typeof input === "object" && input !== null) {
    // Object or Array → JSON string → bytes
    const json = JSON.stringify(input);
    data = new TextEncoder().encode(json);
  } else if (typeof input === "number" || typeof input === "boolean") {
    // Number or boolean → string → bytes
    data = new TextEncoder().encode(String(input));
  } else if (input == null) {
    // null or undefined → empty string
    data = new TextEncoder().encode("");
  } else {
    throw new Error("Unsupported data type for sha256");
  }

  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
