import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useSnippetDetail } from "../../hooks/useSnippetDetail";
import CommentList from "../../widgets/CommentList/CommentList";
import { useCreateComment } from "../../hooks/useCreateComment";
import SnippetCard from "../../widgets/SnippetCard";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: snippet, isLoading, isError } = useSnippetDetail(id);
  const [commentText, setCommentText] = useState("");
  const createCommentMutation = useCreateComment();

  if (isLoading) return <CircularProgress />;
  if (isError || !snippet)
    return <Typography color="error">Error loading snippet</Typography>;

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    createCommentMutation.mutate(
      { snippetId: snippet.id, content: commentText },
      {
        onSuccess: () => setCommentText(""),
      }
    );
  };

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

      {/* Выводим сниппет полностью (SnippetCard включает редактор кода, лайки, комментарии) */}
      <SnippetCard snippet={snippet} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1, color: "#000" }}>
          Comments:
        </Typography>
        <CommentList comments={snippet.comments} />

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            color: "#000",
          }}
        >
          <TextField
            label="Add a comment"
            multiline
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined" onClick={() => setCommentText("")}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddComment}
              disabled={createCommentMutation.isPending || !commentText.trim()}
            >
              {createCommentMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostPage;
