// src/widgets/Register.tsx
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Box, Typography, Button, Link, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router";
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

const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post("/api/register", data);
  return response.data;
};

const Register = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

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
        onSubmit={(values) => mutation.mutate(values)}
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
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <ErrorMessage name="email" component="div" className="error" />

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

            <Field
              as={TextField}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />

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

      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link component={RouterLink} to="/login" underline="hover">
          Login here
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
