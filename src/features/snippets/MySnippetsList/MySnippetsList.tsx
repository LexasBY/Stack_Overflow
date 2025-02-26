import React from "react";
import { Box, Typography } from "@mui/material";
import SnippetList from "../SnippetList/SnippetList";
import { Snippet } from "../../../entities/snippet/snippet.types";

interface MySnippetsListProps {
  snippets: Snippet[];
}

const MySnippetsList: React.FC<MySnippetsListProps> = ({ snippets }) => {
  if (!snippets || snippets.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
        You haven't created any snippets yet.
      </Typography>
    );
  }

  return (
    <Box>
      <SnippetList snippets={snippets} />
    </Box>
  );
};

export default MySnippetsList;
