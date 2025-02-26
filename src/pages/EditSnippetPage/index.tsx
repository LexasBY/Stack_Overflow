import React from "react";
import { useParams, useNavigate } from "react-router";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useSnippetDetail } from "../../features/snippets/model/useSnippetDetail";
import { useCurrentUser } from "../../entities/user/model/useCurrentUser";
import EditSnippetForm from "../../features/snippets/ui/EditSnippet/EditSnippetForm";

const EditSnippetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: snippet, isLoading, isError } = useSnippetDetail(id);
  const { data: currentUser } = useCurrentUser();

  if (isLoading) return <CircularProgress />;
  if (isError || !snippet) {
    return <Typography color="error">Error loading snippet</Typography>;
  }

  if (!currentUser || snippet.user.id !== currentUser.id) {
    return (
      <Typography color="error">
        You do not have permission to edit this snippet.
      </Typography>
    );
  }

  const handleSuccess = () => {
    navigate(`/snippets/${id}`);
  };

  return (
    <Box
      sx={{
        padding: 2,
        maxWidth: "1300px",
        margin: "0 auto",
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
      }}
    >
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "#666" }}
      >
        &larr; Back
      </Button>
      <Typography variant="h4" sx={{ mb: 2, color: "#000" }}>
        Edit Snippet
      </Typography>
      <EditSnippetForm snippet={snippet} onSuccess={handleSuccess} />
    </Box>
  );
};

export default EditSnippetPage;
