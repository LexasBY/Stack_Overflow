import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import CommentList from "./CommentList";
import { useCreateComment } from "../../comments/model/useCreateComment";
import { Snippet } from "../../../entities/snippet/snippet.types";

interface CommentSectionProps {
  snippet: Snippet;
}

const PostCommentSection: React.FC<CommentSectionProps> = ({ snippet }) => {
  const [commentText, setCommentText] = useState("");
  const createCommentMutation = useCreateComment();

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
  );
};

export default PostCommentSection;
