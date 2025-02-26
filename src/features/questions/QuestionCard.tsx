import React from "react";
import { Box, Typography } from "@mui/material";
import { Question } from "../../features/questions/useQuestionsInfinite";
import { Editor } from "@monaco-editor/react";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const language = question.attachedCode ? "javascript" : undefined;
  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#fff",
        width: "1100px",
      }}
    >
      <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
        {question.title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
        asked by {question.user.username}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#000", whiteSpace: "pre-wrap", mb: 2 }}
      >
        {question.description}
      </Typography>
      {question.attachedCode && question.attachedCode.trim() !== "" && (
        <Box sx={{ mb: 2 }}>
          <Editor
            height="200px"
            width="100%"
            defaultLanguage={language}
            value={question.attachedCode}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default QuestionCard;
