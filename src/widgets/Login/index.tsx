import { Box, Typography, Button, TextField, Link } from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { useLogin, LoginInput } from "../../hooks/useLogin";
import "./login.css";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const loginMutation = useLogin();

  return (
    <Box sx={{ width: 400, p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values: LoginInput, { setSubmitting }) => {
          loginMutation.mutate(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Field name="username">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  error={touched.username && Boolean(errors.username)}
                  helperText={
                    touched.username && errors.username ? errors.username : ""
                  }
                />
              )}
            </Field>

            <Field name="password">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={
                    touched.password && errors.password ? errors.password : ""
                  }
                />
              )}
            </Field>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting || loginMutation.status === "pending"}
            >
              {loginMutation.status === "pending" ? "Loading..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>

      <Typography
        variant="body2"
        sx={{ mt: 2, color: "grey.600", textAlign: "center" }}
      >
        Don't have an account?
        <br />
        <Link href="/register" underline="hover">
          Register here
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
