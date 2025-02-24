// src/pages/MySnippetsPage/MySnippetsPage.tsx
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useMySnippets } from "../../hooks/useMySnippets";
import SnippetList from "../../widgets/SnippetList/SnippetList";

const MySnippetsPage: React.FC = () => {
  const { data: user } = useCurrentUser();

  const { data, isLoading, isError } = useMySnippets(user?.id || "");

  if (!user) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ textAlign: "center", mt: 4 }}
      >
        You need to be logged in to see your snippets.
      </Typography>
    );
  }

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading your snippets</Typography>;
  if (!data || data.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
        You haven't created any snippets yet.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        My Snippets
      </Typography>

      <SnippetList snippets={data} />
    </Box>
  );
};

export default MySnippetsPage;
