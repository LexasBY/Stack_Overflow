import React from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Editor } from "@monaco-editor/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useCreateQuestion } from "../../hooks/useCreateQuestion";

interface FormValues {
  title: string;
  description: string;
  attachedCode: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  attachedCode: Yup.string().nullable(),
});

const CreateQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const createQuestionMutation = useCreateQuestion();

  const initialValues: FormValues = {
    title: "",
    description: "",
    attachedCode: "",
  };

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
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Ask a question
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          createQuestionMutation.mutate(values, {
            onSuccess: () => {
              navigate("/questions");
            },
          });
        }}
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          isSubmitting,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              label="Question title"
              name="title"
              fullWidth
              sx={{ mb: 2 }}
              value={values.title}
              onChange={(e) => setFieldValue("title", e.target.value)}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />

            <TextField
              label="Question description"
              name="description"
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
              value={values.description}
              onChange={(e) => setFieldValue("description", e.target.value)}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />

            <Typography variant="body1" sx={{ mb: 1 }}>
              Attached Code:
            </Typography>
            <Editor
              height="200px"
              width="100%"
              defaultLanguage="javascript"
              value={values.attachedCode}
              onChange={(newValue) =>
                setFieldValue("attachedCode", newValue || "")
              }
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || createQuestionMutation.isPending}
              >
                {createQuestionMutation.isPending ? (
                  <CircularProgress size={24} />
                ) : (
                  "Create Question"
                )}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateQuestionPage;
