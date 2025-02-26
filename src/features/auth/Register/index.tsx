import { Box, Typography, Button, TextField, Link } from "@mui/material";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router";
import { useRegister, RegisterInput } from "../../auth/Register/useRegister";
import { AxiosError } from "axios";
import "./register.css";

interface RegisterFormValues extends RegisterInput {
  confirmPassword: string;
}

interface ErrorResponse {
  statusCode: number;
  endpoint: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Must be longer than or equal to 5 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).+$/,
      "Must include lowercase, uppercase, number, symbol!"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const Register = () => {
  const registerMutation = useRegister();

  return (
    <Box className="register-modal" sx={{ width: 400, maxWidth: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sign up to Codelang
      </Typography>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: RegisterFormValues,
          {
            setSubmitting,
            setStatus,
            resetForm,
          }: FormikHelpers<RegisterFormValues>
        ) => {
          const { confirmPassword, ...payload } = values;
          void confirmPassword;
          registerMutation.mutate(payload, {
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
          });
        }}
      >
        {({ isSubmitting, status }) => (
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Field name="username">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Username"
                  fullWidth
                  variant="outlined"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            <Field name="email">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            <Field name="password">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            <Field name="confirmPassword">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            {status && (
              <Typography variant="body2" color="error">
                {status}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Confirm"}
            </Button>
          </Form>
        )}
      </Formik>

      <Typography
        variant="body2"
        sx={{ mt: 2, color: "grey.600", textAlign: "center" }}
      >
        Already have an account?
        <br />
        <Link component={RouterLink} to="/login" underline="hover">
          Login here
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
