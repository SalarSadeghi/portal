import { Outlet, useLocation } from "react-router-dom";
import { isAuthLayout } from "../../utils";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { memo } from "react";

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {!isAuthLayout(location) && (
        <div className={`h-screen flex max-w-[42%]`}>
          <Sidebar />
        </div>
      )}
      <div className="flex flex-col grow">
        <Header />
        <div className="p-4 grow overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default memo(DashboardLayout);
