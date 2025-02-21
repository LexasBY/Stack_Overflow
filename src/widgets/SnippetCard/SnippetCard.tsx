import React from "react";
import "./snippetCard.css";
import { Snippet } from "../../hooks/useSnippets";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Box, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface SnippetCardProps {
  snippet: Snippet;
}

const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  const { data: user } = useCurrentUser();

  const likesCount = snippet.marks.filter((m) => m.type === "like").length;
  const dislikesCount = snippet.marks.filter(
    (m) => m.type === "dislike"
  ).length;
  const commentsCount = snippet.comments.length;

  const handleLike = () => {
    // TODO: Логика лайка
  };

  const handleDislike = () => {
    // TODO: Логика дизлайка
  };

  return (
    <div className="snippet-card">
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {snippet.language}
      </Typography>
      <Typography variant="body2" sx={{ color: "gray" }}>
        by {snippet.user.username}
      </Typography>

      <Box sx={{ mt: 1 }}>{snippet.code}</Box>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 2 }}>
        <IconButton onClick={handleLike} disabled={!user}>
          <ThumbUpIcon />
        </IconButton>
        <Typography>{likesCount}</Typography>

        <IconButton onClick={handleDislike} disabled={!user}>
          <ThumbDownIcon />
        </IconButton>
        <Typography>{dislikesCount}</Typography>

        <Typography sx={{ ml: 2 }}>{commentsCount} comments</Typography>
      </Box>
    </div>
  );
};

export default SnippetCard;
