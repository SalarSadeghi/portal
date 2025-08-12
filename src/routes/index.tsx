import { Suspense, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import ErrorBoundary from "../pages/errorBoundary/ErrorBoundary";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import Home from "../pages/home.tsx/Home";
import AuthRoutes from "./auth/AuthRoute";
import AdminRoutes from "./admin/AdminRoute";
import UserRoutes from "./user/UserRoute";
import NotFound from "../pages/notFound/NotFound";
import HygieneFinding from "../components/pages/officeAutomation/hygieneFinding/HygieneFinding";
import SafetyFinding from "../components/pages/officeAutomation/safetyFinding/SafetyFinding";

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route
                index
                element={
                  //<ProtectedRoute>
                  <Home />
                  //</ProtectedRoute>
                }
              />
              <Route
                path="/safety-finding-form"
                element={
                  <ProtectedRoute>
                    <SafetyFinding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hygiene-finding-form"
                element={
                  <ProtectedRoute>
                    <HygieneFinding />
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
            <Route path="*" element={<NotFound />} /> {/* 404 Not Found */}
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
