import React from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useSnippetsInfinite } from "../../features/snippets/useSnippetsInfinite";
import SnippetList from "../../features/snippets/SnippetList/SnippetList";

const HomePage: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSnippetsInfinite();

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading snippets</Typography>;
  if (!data) return null;

  const snippets = data.pages.flatMap((page) => page.data);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", color: "#000" }}
      >
        Welcome to Codelang!
      </Typography>

      <SnippetList snippets={snippets} />

      {hasNextPage && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more..." : "Load more"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
