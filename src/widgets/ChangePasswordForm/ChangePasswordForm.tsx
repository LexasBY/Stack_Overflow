// src/widgets/ChangePasswordForm.tsx
import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { Box, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { useChangePassword } from "../../hooks/useChangePassword";

const schema = Yup.object().shape({
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string().min(6, "At least 6 chars").required("Required"),
});

const ChangePasswordForm: React.FC = () => {
  const mutation = useChangePassword();

  return (
    <Box>
      <Formik
        initialValues={{ oldPassword: "", newPassword: "" }}
        validationSchema={schema}
        onSubmit={(values) => {
          mutation.mutate({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          });
        }}
      >
        {({ errors, touched, isSubmitting }) => (
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
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || mutation.isPending}
            >
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangePasswordForm;
