// src/widgets/SnippetCard/SnippetCard.tsx
import React from "react";
import "./snippetCard.css";
import { Snippet } from "../../hooks/useSnippets";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { IconButton, Typography } from "@mui/material";
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
      <div className="snippet-card__header">
        <span className="snippet-card__author">{snippet.user.username}</span>
        <span className="snippet-card__language">{snippet.language}</span>
      </div>

      {/* место для кода */}
      <div className="snippet-card__code">{snippet.code}</div>

      <div className="snippet-card__footer">
        <div className="snippet-card__likes">
          <IconButton
            onClick={handleLike}
            disabled={!user}
            size="small"
            style={{ padding: "4px" }}
          >
            <ThumbUpIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{likesCount}</Typography>

          <IconButton
            onClick={handleDislike}
            disabled={!user}
            size="small"
            style={{ padding: "4px" }}
          >
            <ThumbDownIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{dislikesCount}</Typography>
        </div>

        <span className="snippet-card__comments">{commentsCount} comments</span>
      </div>
    </div>
  );
};

export default SnippetCard;
