import React from "react";
import { useParams, useNavigate } from "react-router";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useSnippetDetail } from "../../features/snippets/model/useSnippetDetail";
import SnippetCard from "../../features/snippets/ui/SnippetCard";
import PostCommentSection from "../../features/comments/ui/CommentSection";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: snippet, isLoading, isError } = useSnippetDetail(id);

  if (isLoading) return <CircularProgress />;
  if (isError || !snippet)
    return <Typography color="error">Error loading snippet</Typography>;

  return (
    <Box
      sx={{
        padding: 2,
        maxWidth: "1300px",
        margin: "0 auto",
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
      }}
    >
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "#666" }}
      >
        &larr; Back
      </Button>

      <SnippetCard snippet={snippet} />

      <PostCommentSection snippet={snippet} />
    </Box>
  );
};

export default PostPage;
