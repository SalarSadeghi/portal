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
