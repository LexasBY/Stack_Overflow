import React from "react";
import {
  CircularProgress,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useUsers } from "../../hooks/useUsers";

const UsersPage: React.FC = () => {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading users</Typography>;
  if (!users || users.length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1" sx={{ color: "#000" }}>
          No users found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        sx={{ width: "1200px", mb: 2, textAlign: "center", color: "#000" }}
      >
        All Users
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1000, margin: "0 auto" }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#000", fontWeight: "bold" }}>
                №
              </TableCell>
              <TableCell sx={{ color: "#000", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "#000", fontWeight: "bold" }}>
                Username
              </TableCell>
              <TableCell sx={{ color: "#000", fontWeight: "bold" }}>
                Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell sx={{ color: "#000" }}>{index + 1}</TableCell>
                <TableCell sx={{ color: "#000" }}>{user.id}</TableCell>
                <TableCell sx={{ color: "#000" }}>{user.username}</TableCell>
                <TableCell sx={{ color: "#000" }}>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersPage;
