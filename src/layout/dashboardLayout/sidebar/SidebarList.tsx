import { Items, type SidebarItem } from "./SidebarItems";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React from "react";

import { sidebarStore } from "../../../store/SidebarStore";
import { useNavigate } from "react-router-dom";

function SidebarList() {
  const isSidebarOpen = sidebarStore((state) => state.isSidebarOpen);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClick = (item: SidebarItem) => {
    if (item.children) {
      setOpen(!open);
      return;
    } else {
      if (item.href) {
        navigate(item.href);
      }
    }
  };
  return (
    <>
      {Items.map((group) => (
        <>
          <List
            sx={{
              width: "100%",
              "& ul": { padding: 0 },
            }}
          >
            {group.map((item) => (
              <>
                {item.kind === "header" && isSidebarOpen && (
                  <ListSubheader className="dark:bg-dark-background dark:text-dark-text">
                    {item.title}
                  </ListSubheader>
                )}
                {item.kind === "item" && (
                  <>
                    <ListItemButton onClick={() => handleClick(item)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      {isSidebarOpen && <ListItemText primary={item.title} />}
                      {item.children &&
                        isSidebarOpen &&
                        (open ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                    {item.children && (
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.children.map((child) => (
                            <ListItemButton
                              onClick={() => handleClick(child)}
                              sx={{
                                padding: `${
                                  isSidebarOpen ? "0 2rem" : "0 1.5rem"
                                }`,
                              }}
                            >
                              <ListItemIcon>{child.icon}</ListItemIcon>
                              {isSidebarOpen && (
                                <ListItemText primary={child.title} />
                              )}
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </>
                )}
              </>
            ))}
          </List>
          <Divider className="dark:bg-dark-border" />
        </>
      ))}
    </>
  );
}

export default SidebarList;
