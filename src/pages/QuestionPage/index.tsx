import React from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useQuestionsInfinite } from "../../features/questions/useQuestionsInfinite";
import QuestionCard from "../../features/questions/QuestionCard";

const QuestionsPage: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useQuestionsInfinite();

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading questions</Typography>;
  if (!data) return null;

  const questions = data.pages.flatMap((page) => page.data);

  return (
    <Box sx={{ padding: 2, maxWidth: 1200, margin: "0 auto" }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", color: "#000" }}
      >
        Questions
      </Typography>

      {questions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}

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

export default QuestionsPage;
