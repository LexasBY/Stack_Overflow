import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSnippets } from "../../hooks/useSnippets";
import SnippetList from "../../widgets/SnippetList/SnippetList";

const HomePage: React.FC = () => {
  const { data, isLoading, isError } = useSnippets();

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading snippets</Typography>;
  if (!data) return null;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", color: "#000" }}
      >
        Welcome to Codelang!
      </Typography>

      <SnippetList snippets={data} />
    </Box>
  );
};

export default HomePage;
