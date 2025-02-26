import React from "react";
import { Box, Typography } from "@mui/material";
import NewSnippet from "../../features/snippets/NewSnippet";

const CreateSnippetPage: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", color: "#000" }}
      >
        Create new snippet!
      </Typography>
      <div className="new__snippet-container">
        <NewSnippet />
      </div>
    </Box>
  );
};

export default CreateSnippetPage;
