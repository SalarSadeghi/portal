import { Menu, MenuOpen } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { sidebarStore } from "../../../store/SidebarStore";

function SidebarHeader() {
  const isSidebarOpen = sidebarStore((state) => state.isSidebarOpen);
  const toggleSidebar = sidebarStore((state) => state.toggleSidebar);
  return (
    <div className="h-16 w- flex flex-col pt-4">
      <div className={`w-full px-4 flex justify-end`}>
        <IconButton onClick={() => toggleSidebar(isSidebarOpen)}>
          {isSidebarOpen ? <MenuOpen className="rtl:rotate-180" /> : <Menu />}
        </IconButton>
      </div>
    </div>
  );
}

export default SidebarHeader;
