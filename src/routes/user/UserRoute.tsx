// src/routes/UserRoutes.tsx
import { Routes, Route } from "react-router-dom";
import React from "react";
import NotFound from "@/pages/notFound/NotFound";

const SafetyFinding = React.lazy(
  () =>
    import("@/components/pages/officeAutomation/safetyFinding/SafetyFinding")
);
const HygieneFinding = React.lazy(
  () =>
    import("@/components/pages/officeAutomation/hygieneFinding/HygieneFinding")
);

const ProtectedRoute = React.lazy(()=>import("@/routes/auth/ProtectedRoute"))
const UserRoutes = () => {
  
  return (
    <Routes>
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
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />{" "}
      {/* 404 Not Found */}
      {/* Add more user routes as needed */}
    </Routes>
  );
};

export default UserRoutes;
