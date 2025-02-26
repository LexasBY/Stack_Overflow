import React, { useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { Editor } from "@monaco-editor/react";
import { useUpdateSnippet } from "../../model/useUpdateSnippet";
import { Snippet } from "../../../../entities/snippet/snippet.types";

interface EditSnippetFormProps {
  snippet: Snippet;
  onSuccess?: () => void;
}

const LANGUAGES = ["JavaScript", "TypeScript", "Python", "Java", "C#", "Go"];

const EditSnippetForm: React.FC<EditSnippetFormProps> = ({
  snippet,
  onSuccess,
}) => {
  const [language, setLanguage] = useState(snippet.language);
  const [code, setCode] = useState(snippet.code);

  const updateSnippetMutation = useUpdateSnippet();

  const handleSubmit = () => {
    updateSnippetMutation.mutate(
      { id: snippet.id, code, language },
      {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      }
    );
  };

  return (
    <Box sx={{ width: "1000px", margin: 0, padding: 0, mt: 4 }}>
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
        onClick={handleSubmit}
        disabled={updateSnippetMutation.isPending}
        fullWidth
      >
        {updateSnippetMutation.isPending ? "Saving..." : "Save"}
      </Button>

      {updateSnippetMutation.isError && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {updateSnippetMutation.error?.message || "Error updating snippet"}
        </Typography>
      )}
    </Box>
  );
};

export default EditSnippetForm;
