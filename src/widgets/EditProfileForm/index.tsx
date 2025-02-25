import React from "react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { useChangeUsername } from "../../hooks/useChangeUsername";
import { AxiosError } from "axios";

interface ErrorResponse {
  statusCode: number;
  endpoint: string;
  message: string;
}

const schema = Yup.object().shape({
  newUsername: Yup.string().min(8, "At least 8 chars").required("Required"),
});

interface EditProfileFormProps {
  currentUsername: string;
}

const EditProfileForm: React.FC<EditProfileFormProps> = () => {
  const mutation = useChangeUsername();

  return (
    <Box>
      <Formik
        initialValues={{ newUsername: "" }}
        validationSchema={schema}
        onSubmit={(
          values,
          {
            setSubmitting,
            setStatus,
            resetForm,
          }: FormikHelpers<{ newUsername: string }>
        ) => {
          mutation.mutate(
            { username: values.newUsername },
            {
              onError: (error) => {
                const axiosError = error as AxiosError;
                const errData = axiosError.response?.data as ErrorResponse;
                setStatus(errData.message || "An error occurred");
              },
              onSuccess: () => {
                setStatus("");
                resetForm();
              },
              onSettled: () => setSubmitting(false),
            }
          );
        }}
      >
        {({ errors, touched, isSubmitting, status }) => (
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <Field name="newUsername">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="New username"
                  variant="outlined"
                  error={touched.newUsername && Boolean(errors.newUsername)}
                  helperText={
                    touched.newUsername && errors.newUsername
                      ? errors.newUsername
                      : ""
                  }
                />
              )}
            </Field>

            {status && (
              <Typography color="error" variant="body2">
                {status}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || mutation.status === "pending"}
            >
              {mutation.status === "pending" ? "Saving..." : "Save"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProfileForm;
