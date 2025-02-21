// src/widgets/EditProfileForm.tsx
import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { Box, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { useChangeUsername } from "../../hooks/useChangeUsername";

const schema = Yup.object().shape({
  newUsername: Yup.string().min(3, "At least 3 chars").required("Required"),
});

interface EditProfileFormProps {
  currentUsername: string;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  currentUsername,
}) => {
  const mutation = useChangeUsername();

  return (
    <Box>
      <Formik
        initialValues={{ newUsername: currentUsername }}
        validationSchema={schema}
        onSubmit={(values) => {
          mutation.mutate({ newUsername: values.newUsername });
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form style={{ display: "flex", gap: "8px" }}>
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
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || mutation.status === "pending"}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProfileForm;
