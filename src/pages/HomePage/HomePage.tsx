import React from "react";
import { Box, Typography } from "@mui/material";
import SnippetList from "../../widgets/SnippetList/SnippetList";

const HomePage: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", color: "#000" }}
      >
        Welcome to Codelang!
      </Typography>
      <div className="homepage__snippets-container">
        <SnippetList />
      </div>
    </Box>
  );
};

export default HomePage;
