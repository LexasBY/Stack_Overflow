import React from "react";
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
import { useUpdateQuestion } from "../model/useUpdateQuestion";
import { useNavigate } from "react-router";

interface EditQuestionFormProps {
  initialValues: {
    id: string;
    title: string;
    description: string;
    attachedCode: string;
  };
  onSuccess?: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  attachedCode: Yup.string().nullable(),
});

const EditQuestionForm: React.FC<EditQuestionFormProps> = ({
  initialValues,
  onSuccess,
}) => {
  const updateQuestionMutation = useUpdateQuestion();
  const navigate = useNavigate();

  const handleSubmit = (
    values: EditQuestionFormProps["initialValues"],
    resetForm: () => void
  ) => {
    updateQuestionMutation.mutate(values, {
      onSuccess: () => {
        resetForm();
        if (onSuccess) onSuccess();
      },
    });
  };

  return (
    <Box sx={{ width: "1100px" }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, textAlign: "center", color: "#000" }}
      >
        Edit question
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({
          values,
          resetForm,
          setFieldValue,
          errors,
          touched,
          isSubmitting,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
              <Button
                variant="outlined"
                onClick={() => {
                  resetForm();
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || updateQuestionMutation.isPending}
              >
                {updateQuestionMutation.isPending ? (
                  <CircularProgress size={24} />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Box>

            {updateQuestionMutation.isError && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {updateQuestionMutation.error?.message ||
                  "Error updating question"}
              </Typography>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditQuestionForm;
