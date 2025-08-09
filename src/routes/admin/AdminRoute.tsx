// src/routes/AdminRoutes.tsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import { Dashboard } from "@mui/icons-material";
import NotFound from "../../pages/notFound/NotFound";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} /> {/* 404 Not Found */}
      {/* Add more admin routes as needed */}
    </Routes>
  );
};

export default AdminRoutes;
