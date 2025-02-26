import React from "react";
import { Box, Typography } from "@mui/material";

export interface Comment {
  id: string;
  content: string;
  user?: {
    id: string;
    username: string;
    role: string;
  };
  timestamp?: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!comments.length) {
    return <Typography variant="body2">No comments yet.</Typography>;
  }

  return (
    <Box>
      {comments.map((comment) => (
        <Box
          key={comment.id}
          sx={{
            borderBottom: "1px solid #e0e0e0",
            py: 1,
            mb: 1,
          }}
        >
          {comment.user && (
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", mb: 0.5, color: "#333" }}
            >
              {comment.user.username}
            </Typography>
          )}
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              color: "#333",
            }}
          >
            {comment.content}
          </Typography>
          {comment.timestamp && (
            <Typography
              variant="caption"
              sx={{ display: "block", mt: 0.5, color: "#888" }}
            >
              {new Date(comment.timestamp).toLocaleString()}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CommentList;
