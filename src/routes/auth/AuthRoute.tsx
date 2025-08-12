import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "@/pages/notFound/NotFound";

function AuthRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="login"
          element={
            <div className="flex justify-center items-center flex-col h-full">
              <span className="text-blue-900 font-bold text-xl">
                صفحه در دسترس نمی‌باشد.
              </span>
            </div>
          }
        />
        {/* <Route path="register" element={<Register />} /> */}
        {/* <Route path="forgot-password" element={<ForgotPassword />} /> */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
        {/* Add more auth routes as needed */}
      </Routes>
    </>
  );
}

export default AuthRoutes;
