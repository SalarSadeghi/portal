import { memo } from "react";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarList from "./SidebarList";
import { sidebarStore } from "../../../store/SidebarStore";

function Sidebar() {
  const isSidebarOpen = sidebarStore((state) => state.isSidebarOpen);

  return (
    <div
      className={`h-screen ${
        isSidebarOpen ? "w-64" : "w-16"
      } pb-4 flex flex-col justify-between border-r rtl:border-l border-light-border dark:border-dark-border transition-all duration-[0.3s] ease-out`}
    >
      <div>
        <SidebarHeader />
        <SidebarList />
      </div>
      <div>
        <SidebarFooter />
      </div>
    </div>
  );
}

export default memo(Sidebar);
