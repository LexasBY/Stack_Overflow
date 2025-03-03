import React, { useState, useEffect } from "react";
import "./snippetCard.css";
import { Editor } from "@monaco-editor/react";
import { useCurrentUser } from "../../../../entities/user/model/useCurrentUser";
import { IconButton, Typography, Box } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import EditIcon from "@mui/icons-material/Edit";
import { useMarkSnippet, MarkType } from "../../model/useMarkSnippet";
import { Link, useNavigate } from "react-router";
import { Snippet } from "../../../../entities/snippet/snippet.types";

interface SnippetCardProps {
  snippet: Snippet;
}

const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  const { data: user } = useCurrentUser();
  const markMutation = useMarkSnippet();
  const navigate = useNavigate();

  const [localMarks, setLocalMarks] = useState(snippet.marks);

  useEffect(() => {
    setLocalMarks(snippet.marks);
  }, [snippet.marks]);

  const userLike = user
    ? localMarks.some(
        (m) => String(m.user.id) === String(user.id) && m.type === "like"
      )
    : false;
  const userDislike = user
    ? localMarks.some(
        (m) => String(m.user.id) === String(user.id) && m.type === "dislike"
      )
    : false;

  const likesCount = localMarks.filter((m) => m.type === "like").length;
  const dislikesCount = localMarks.filter((m) => m.type === "dislike").length;
  const commentsCount = snippet.comments.length;

  const isAuthor = user && snippet.user.id === user.id;

  const handleMark = (mark: MarkType) => {
    if (!user) return;
    if ((mark === "like" && userLike) || (mark === "dislike" && userDislike)) {
      return;
    }
    const previousMarks = localMarks;
    const updatedMarks = localMarks.filter(
      (m) => String(m.user.id) !== String(user.id)
    );
    updatedMarks.push({
      id: "optimistic-" + mark,
      type: mark,
      user: { id: user.id, username: user.username, role: user.role },
    });
    setLocalMarks(updatedMarks);

    markMutation.mutate(
      { id: snippet.id, mark },
      {
        onError: () => {
          setLocalMarks(previousMarks);
        },
      }
    );
  };

  const handleEdit = () => {
    navigate(`/snippets/${snippet.id}/edit`);
  };

  const language = snippet.language.toLowerCase();

  return (
    <div className="snippet-card">
      <div className="snippet-card__header">
        <Typography
          variant="subtitle1"
          className="snippet-card__author"
          sx={{ fontWeight: "bold" }}
        >
          {snippet.user.username}
        </Typography>
        <Typography
          variant="body2"
          className="snippet-card__language"
          sx={{ color: "gray" }}
        >
          {snippet.language}
        </Typography>
      </div>

      <Box className="snippet-card__code-container" sx={{ marginBottom: 2 }}>
        <Editor
          height="250px"
          width="100%"
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
        <Box
          className="snippet-card__likes"
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
        >
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
          {user ? (
            <Link to={`/snippets/${snippet.id}`}>{commentsCount} comments</Link>
          ) : (
            <Typography variant="body2" color="textSecondary">
              {commentsCount} comments
            </Typography>
          )}
        </Typography>

        {isAuthor && (
          <IconButton size="small" onClick={handleEdit} sx={{ ml: 1 }}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default SnippetCard;
