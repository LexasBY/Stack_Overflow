import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useUsers } from "../../features/users/model/useUsers";
import UsersTable from "../../features/users/ui/UsersTable";

const UsersPage: React.FC = () => {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading users</Typography>;
  if (!users || users.length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1" sx={{ color: "#000" }}>
          No users found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, width: "1200px" }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", color: "#000" }}
      >
        All Users
      </Typography>
      <UsersTable users={users} />
    </Box>
  );
};

export default UsersPage;
