import React, { Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  // useLocation,
} from "react-router-dom";
import ErrorBoundary from "../pages/errorBoundary/ErrorBoundary";
// import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
// import Home from "../pages/home.tsx/Home";
import AuthRoutes from "./auth/AuthRoute";
import AdminRoutes from "./admin/AdminRoute";
import UserRoutes from "./user/UserRoute";
import NotFound from "../pages/notFound/NotFound";
import FallbackLazyLoad from "@/components/lazyLoad/FallbackLazyLoad";
// import DashboardLayout from "@/layout/dashboardLayout/DashboardLayout";
// import LazyLoad from "../components/lazyLoad/LazyLoad";
const DashboardLayout = React.lazy(
  () => import("@/layout/dashboardLayout/DashboardLayout")
);
const Home = React.lazy(() => import("@/pages/home.tsx/Home"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<FallbackLazyLoad />}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              {/* Auth Routes */}
              <Route path="/auth/*" element={<AuthRoutes />} />
              {/* Admin Routes */}
              <Route path="/admin/*" element={<AdminRoutes />} />
              {/* User Routes */}
              <Route path="/user/*" element={<UserRoutes />} />
            </Route>
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <NotFound />
                </ProtectedRoute>
              }
            />{" "}
            {/* 404 Not Found */}
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
