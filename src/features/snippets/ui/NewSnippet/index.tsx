import React, { useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { Editor } from "@monaco-editor/react";
import { useCreateSnippet } from "../../model/useCreateSnippet";
import { useCurrentUser } from "../../../../entities/user/model/useCurrentUser";
import { useNavigate } from "react-router";

const LANGUAGES = ["JavaScript", "TypeScript", "Python", "Java", "C#", "Go"];

const NewSnippet: React.FC = () => {
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();
  const createSnippetMutation = useCreateSnippet();

  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState("// Write your code here");

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          You need to be logged in to create a snippet.
        </Typography>
      </Box>
    );
  }

  const handleCreateSnippet = () => {
    createSnippetMutation.mutate(
      { language, code },
      {
        onSuccess: (data) => {
          console.log("Snippet created:", data.data);
          navigate(`/snippets/${data.data.id}`);
        },
      }
    );
  };

  return (
    <Box sx={{ width: "1000px", margin: "0 auto", mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          select
          label="Language of your snippet"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          fullWidth
        >
          {LANGUAGES.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box className="snippet-card snippet-card__code-container" sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Code of your snippet:
        </Typography>
        <Editor
          height="300px"
          defaultLanguage={language.toLowerCase()}
          value={code}
          onChange={(val) => setCode(val || "")}
          onMount={(editor) => {
            editor.onDidFocusEditorText(() => {
              if (code === "// Write your code here") {
                setCode("");
              }
            });
          }}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateSnippet}
        disabled={createSnippetMutation.isPending}
        fullWidth
      >
        {createSnippetMutation.isPending ? "CREATING..." : "CREATE SNIPPET"}
      </Button>

      {createSnippetMutation.isError && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {createSnippetMutation.error?.response?.data?.message ||
            "Error creating snippet"}
        </Typography>
      )}
    </Box>
  );
};

export default NewSnippet;
