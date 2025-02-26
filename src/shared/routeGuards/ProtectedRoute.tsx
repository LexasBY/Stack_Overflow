// src/shared/routeGuards/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router";
import { CircularProgress } from "@mui/material";
import { useCurrentUser } from "../../entities/user/model/useCurrentUser";

const ProtectedRoute: React.FC = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <CircularProgress />;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
