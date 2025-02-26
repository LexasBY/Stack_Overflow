import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useCurrentUser } from "../../entities/user/model/useCurrentUser";
import { useMySnippets } from "../../features/snippets/model/useMySnippets";
import MySnippetsList from "../../features/snippets/ui/MySnippetsList/MySnippetsList";

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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", color: "#000" }}
      >
        My Snippets
      </Typography>
      <MySnippetsList snippets={data || []} />
    </Box>
  );
};

export default MySnippetsPage;
