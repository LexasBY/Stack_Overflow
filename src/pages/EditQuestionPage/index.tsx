import React from "react";
import { useParams, useNavigate } from "react-router";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useQuestionDetail } from "../../features/questions/model/useQuestionDetail";
import { useCurrentUser } from "../../entities/user/model/useCurrentUser";
import EditQuestionForm from "../../features/questions/ui/EditQuestionForm";

const EditQuestionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: question, isLoading, isError } = useQuestionDetail(id);
  const { data: currentUser } = useCurrentUser();

  if (isLoading) return <CircularProgress />;
  if (isError || !question) {
    return <Typography color="error">Error loading question</Typography>;
  }

  if (!currentUser || question.user.id !== currentUser.id) {
    return (
      <Typography color="error">
        You do not have permission to edit this question.
      </Typography>
    );
  }

  const handleSuccess = () => {
    navigate(`/questions`);
  };

  return (
    <Box
      sx={{
        padding: 2,
        maxWidth: "1200px",
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
        Edit Question
      </Typography>

      <EditQuestionForm
        initialValues={{
          id: question.id,
          title: question.title,
          description: question.description,
          attachedCode: question.attachedCode || "",
        }}
        onSuccess={handleSuccess}
      />
    </Box>
  );
};

export default EditQuestionPage;
