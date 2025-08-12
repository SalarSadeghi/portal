import { Outlet, useLocation } from "react-router-dom";
import { isAuthLayout, TOKEN_KEY } from "../../utils";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { useEffect } from "react";

const DashboardLayout = () => {
  const location = useLocation();
  const { search } = useLocation();
  const getTokenFromUrl = () => {
    const params = new URLSearchParams(search);
    return params.get("token");
  };

  const setTokenToStorage = () => {
    const token = getTokenFromUrl();
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  };

  useEffect(() => {
    setTokenToStorage();
  }, []);

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

export default DashboardLayout;
