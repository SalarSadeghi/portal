import { Outlet, useLocation } from "react-router-dom";
import { isAuthLayout } from "../../utils";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";


const DashboardLayout = () => {
  const location = useLocation();
  return (
    <div className="flex w-full h-screen overflow-hidden ">
      {!isAuthLayout(location) && (
        <div className={`h-screen flex`}>
          <Sidebar />
        </div>
      )}
      <div className="flex flex-col grow">
        <Header />
        <div className="p-4 grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;


