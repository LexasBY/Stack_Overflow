import React from "react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { useChangePassword } from "../../hooks/useChangePassword";
import { AxiosError } from "axios";

const schema = Yup.object().shape({
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string().min(6, "At least 6 chars").required("Required"),
});

interface ErrorResponse {
  statusCode: number;
  endpoint: string;
  message: string;
}

const ChangePasswordForm: React.FC = () => {
  const mutation = useChangePassword();

  return (
    <Box>
      <Formik
        initialValues={{ oldPassword: "", newPassword: "" }}
        validationSchema={schema}
        onSubmit={(
          values,
          {
            setSubmitting,
            setStatus,
            resetForm,
          }: FormikHelpers<{
            oldPassword: string;
            newPassword: string;
          }>
        ) => {
          mutation.mutate(
            {
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
            },
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
            <Field name="oldPassword">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Old password"
                  type="password"
                  variant="outlined"
                  error={touched.oldPassword && Boolean(errors.oldPassword)}
                  helperText={
                    touched.oldPassword && errors.oldPassword
                      ? errors.oldPassword
                      : ""
                  }
                />
              )}
            </Field>

            <Field name="newPassword">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="New password"
                  type="password"
                  variant="outlined"
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={
                    touched.newPassword && errors.newPassword
                      ? errors.newPassword
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
              {mutation.status === "pending"
                ? "Changing..."
                : "Change password"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangePasswordForm;
