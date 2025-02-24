import React from "react";
import { Box, Typography } from "@mui/material";
import SnippetCard from "../SnippetCard/SnippetCard";
import { Snippet } from "../../hooks/useSnippets";

interface SnippetListProps {
  snippets: Snippet[];
}

const SnippetList: React.FC<SnippetListProps> = ({ snippets }) => {
  if (!snippets || snippets.length === 0) {
    return <Typography>No snippets available</Typography>;
  }

  return (
    <Box>
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </Box>
  );
};

export default SnippetList;
