import React from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { Editor } from "@monaco-editor/react";
import { useQuestionsInfinite } from "../../hooks/useQuestionsInfinite";

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
    <Box sx={{ padding: 2, width: "1200px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", color: "#000" }}
      >
        Questions
      </Typography>

      {questions.map((q) => (
        <Box
          key={q.id}
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
            {q.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
            asked by user: {q.user.username}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#000", whiteSpace: "pre-wrap", mb: 2 }}
          >
            {q.description}
          </Typography>

          {q.attachedCode && q.attachedCode.trim() !== "" && (
            <Box sx={{ mb: 2 }}>
              <Editor
                height="200px"
                width="100%"
                defaultLanguage="javascript"
                value={q.attachedCode}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </Box>
          )}
        </Box>
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
