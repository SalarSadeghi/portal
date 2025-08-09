// src/routes/UserRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import NotFound from '../../pages/notFound/NotFound';


const UserRoutes = () => {
    return (
        <Routes>
            {/* <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
            <Route path="settings" element={<ProtectedRoute><h1>settings</h1></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} /> {/* 404 Not Found */}
            {/* Add more user routes as needed */}
        </Routes>
    );
};

export default UserRoutes;
