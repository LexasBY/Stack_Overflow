// src/components/GuestOnly.tsx
import { Navigate, Outlet } from "react-router";
import { CircularProgress } from "@mui/material";
import { useCurrentUser } from "../../entities/user/model/useCurrentUser";

const GuestOnly = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <CircularProgress />;
  }
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestOnly;
