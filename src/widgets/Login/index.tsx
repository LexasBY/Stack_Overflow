import { useMutation, UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axios from "axios";
import { Box, Typography, Button, TextField, Link } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import "./login.css";

type LoginInput = {
  username: string;
  password: string;
};

type LoginResponse = {
  id: string;
  username: string;
  role: string;
  token?: string;
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

async function loginUser(data: LoginInput): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>("/api/auth/login", data, {
    withCredentials: true,
  });
  return response.data;
}

const Login = () => {
  const navigate = useNavigate();

  const mutation: UseMutationResult<
    LoginResponse,
    AxiosError<unknown>,
    LoginInput,
    unknown
  > = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });

  return (
    <Box sx={{ width: 400, p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(
          values: LoginInput,
          { setSubmitting }: FormikHelpers<LoginInput>
        ) => {
          mutation.mutate(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="username"
              label="Username"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <ErrorMessage name="username" component="div" className="error" />

            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <ErrorMessage name="password" component="div" className="error" />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting || mutation.status === "pending"}
            >
              {mutation.status === "pending" ? "Loading..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link href="/register" underline="hover">
          Register here
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
