import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import CreateQuestionForm from "../../features/create-question/CreateQuestionForm";

const CreateQuestionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "1200px",
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        color: "#000",
      }}
    >
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "#666" }}
      >
        &larr; Back
      </Button>
      <CreateQuestionForm />
    </Box>
  );
};

export default CreateQuestionPage;
