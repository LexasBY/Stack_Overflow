import { Box, Typography, Button, TextField, Link } from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router";
import { useRegister, RegisterInput } from "../../hooks/useRegister";
import "./register.css";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "username must be longer than or equal to 5 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol!"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const Register = () => {
  const registerMutation = useRegister();

  return (
    <Box className="register-modal">
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
        onSubmit={(values: RegisterInput) => registerMutation.mutate(values)}
      >
        {({ isSubmitting }) => (
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
