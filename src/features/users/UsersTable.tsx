import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { User } from "./useUsers";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
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
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "100%", margin: "0 auto" }}
    >
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#000", fontWeight: "bold" }}>№</TableCell>
            <TableCell sx={{ color: "#000", fontWeight: "bold" }}>ID</TableCell>
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
  );
};

export default UsersTable;
