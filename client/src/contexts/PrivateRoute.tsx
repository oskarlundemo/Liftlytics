

import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";
import type { JSX } from "react";
import {LoadingPage} from "../components/MiscComponents/LoadingPage.tsx";

type PrivateRouteProps = {
    children: JSX.Element;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { user, loading } = useAuth();

    if (loading) return <LoadingPage title={'Loading...'}/>

    if (!user) return <Navigate to="/" replace />;

    return children;
};