import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSnippets } from "../../hooks/useSnippets";
import SnippetCard from "../SnippetCard/SnippetCard";

const SnippetList: React.FC = () => {
  const { data, isLoading, isError } = useSnippets();

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading snippets</Typography>;
  if (!data || data.length === 0)
    return <Typography>No snippets available</Typography>;

  return (
    <Box>
      {data.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </Box>
  );
};

export default SnippetList;
