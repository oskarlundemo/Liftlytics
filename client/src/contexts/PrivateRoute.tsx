

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // adjust path as needed
import type { JSX } from "react";

type PrivateRouteProps = {
    children: JSX.Element;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/" replace />;

    return children;
};