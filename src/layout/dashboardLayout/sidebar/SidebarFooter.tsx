import { Logout } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// import { useTranslation } from "react-i18next";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { getTokenFromStorage } from "../../../utils";
import { sidebarStore } from "../../../store/SidebarStore";

const SidebarFooter = React.memo(function SidebarFooter() {
  // const { t } = useTranslation();
  const isSidebaropen = sidebarStore((store) => store.isSidebarOpen);
  // const navigate = useNavigate();
  const handleLogoutClick = () => {
    localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
    const token = getTokenFromStorage();
    if (!token) {
      // navigate("/auth/login");
      window.location.href = "/auth/login";
    }
  };
  return (
    <>
      <List>
        <ListItemButton onClick={handleLogoutClick}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          {isSidebaropen && <ListItemText primary={"logout"} />}
        </ListItemButton>
      </List>
    </>
  );
});

export default SidebarFooter;
