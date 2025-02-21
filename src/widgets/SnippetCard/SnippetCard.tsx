import React from "react";
import "./snippetCard.css";
import { Editor } from "@monaco-editor/react";
import { Snippet } from "../../hooks/useSnippets";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { IconButton, Typography, Box } from "@mui/material";
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
    // TODO: Реализовать логику лайка
  };

  const handleDislike = () => {
    // TODO: Реализовать логику дизлайка
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
          <IconButton onClick={handleLike} disabled={!user} size="small">
            <ThumbUpIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{likesCount}</Typography>

          <IconButton onClick={handleDislike} disabled={!user} size="small">
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
