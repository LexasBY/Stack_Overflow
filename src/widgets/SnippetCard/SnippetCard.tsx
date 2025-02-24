import React from "react";
import "./snippetCard.css";
import { Editor } from "@monaco-editor/react";
import { Snippet } from "../../hooks/useSnippets";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { IconButton, Typography, Box } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useMarkSnippet, MarkType } from "../../hooks/useMarkSnippet";

interface SnippetCardProps {
  snippet: Snippet;
}

const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  const { data: user } = useCurrentUser();
  const markMutation = useMarkSnippet();

  const userLike = user
    ? snippet.marks.some((m) => m.user.id === user.id && m.type === "like")
    : false;

  snippet.marks.forEach((m, i) => console.log(`Mark ${i}:`, m.user.id, m.type));

  const userDislike = user
    ? snippet.marks.some(
        (m) => m.user.id === String(user.id) && m.type === "dislike"
      )
    : false;

  const likesCount = snippet.marks.filter((m) => m.type === "like").length;
  const dislikesCount = snippet.marks.filter(
    (m) => m.type === "dislike"
  ).length;
  const commentsCount = snippet.comments.length;

  const handleMark = (mark: MarkType) => {
    if (!user) return;
    if ((mark === "like" && userLike) || (mark === "dislike" && userDislike)) {
      return;
    }
    markMutation.mutate({ id: snippet.id, mark });
  };

  const language = snippet.language.toLowerCase();

  return (
    <div className="snippet-card">
      <div className="snippet-card__header">
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {snippet.user.username}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          {snippet.language}
        </Typography>
      </div>

      <Box sx={{ marginBottom: 2 }}>
        <Editor
          height="250px"
          width="1000px"
          defaultLanguage={language}
          value={snippet.code}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
        />
      </Box>

      <div className="snippet-card__footer">
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <IconButton
            onClick={() => handleMark("like")}
            disabled={!user}
            size="small"
            sx={{ color: userLike ? "#1abc1f" : "#666" }}
          >
            <ThumbUpIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{likesCount}</Typography>

          <IconButton
            onClick={() => handleMark("dislike")}
            disabled={!user}
            size="small"
            sx={{ color: userDislike ? "#e74c3c" : "#666" }}
          >
            <ThumbDownIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{dislikesCount}</Typography>
        </Box>

        <Typography variant="body2" sx={{ marginLeft: "auto" }}>
          {commentsCount} comments
        </Typography>
      </div>
    </div>
  );
};

export default SnippetCard;
