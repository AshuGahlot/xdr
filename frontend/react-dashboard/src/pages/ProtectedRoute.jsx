import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { authData } = useAuth();

    // Check if the user is authenticated
    if (!authData.username || !authData.password) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login/" />;
    }

    // Render children if authenticated
    return children;
};

export default ProtectedRoute;
