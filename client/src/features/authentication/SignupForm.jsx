import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "styled-components";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Label from "../../ui/Label";
import MiniSpinner from "../../ui/MiniSpinner";
import useSignup from "./useSignup";
import StyledLink from "../../ui/StyledLink";
const SignUpForm = () => {
  const { mutate, isLoading } = useSignup();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      username: Yup.string().required("Required").max(6, "Max 6 characters"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])/,
          "Password must contain at least one lowercase letter"
        )
        .matches(
          /^(?=.*[A-Z])/,
          "Password must contain at least one uppercase letter"
        )
        .matches(/^(?=.*\d)/, "Password must contain at least one number")
        .matches(
          /^(?=.*[@$!%*?&])/,
          "Password must contain at least one special character"
        )
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: (value) => {
      mutate(value);
    },
  });

  return (
    <Container>
      <Title> Sign up </Title>
      <FormWrapper onSubmit={formik.handleSubmit} noValidate>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "48%" }}>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              datatype="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              disabled={isLoading}
            />
            {formik.touched.name && formik.errors.name ? (
              <Error>{formik.errors.name}</Error>
            ) : null}
          </div>
          <div style={{ width: "48%" }}>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              datatype="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              maxLength="6"
              fontSize="1.2rem"
              disabled={isLoading}


            />
            {formik.touched.username && formik.errors.username ? (
              <Error>{formik.errors.username}</Error>
            ) : null}
          </div>
        </div>

        <Gap />

        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          datatype="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          disabled={isLoading}

        />
        {formik.touched.email && formik.errors.email ? (
          <Error>{formik.errors.email}</Error>
        ) : null}
        <Gap />
        <Label htmlFor="password">Password </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          datatype="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          disabled={isLoading}

        />
        {formik.touched.password && formik.errors.password ? (
          <Error>{formik.errors.password}</Error>
        ) : null}
        <Gap />
        <p>
          By clicking the Sign Up button, you agree to our Terms & Conditions
          and Privacy Policy.
        </p>
        <Button type="submit"        disabled={isLoading}>
          {isLoading ? <MiniSpinner /> : "Create Account"}
        </Button>
      </FormWrapper>
      <StyledLink to="/login" style={{ marginTop: "20px" }}>
        Already have an account? Login
      </StyledLink>
    </Container>
  );
};

export default SignUpForm;

const Title = styles.h1`
  font-size: 2em;
  margin-bottom: 2.5rem;
  align-self: flex-start;
`;

const Error = styles.div`
  position: absolute; 
  margin-top: 0.5rem;
  color: red;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;
const Container = styles.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    width: 90%;

  }
`;
const FormWrapper = styles.form`

  width: 100%;
  p{
    font-size: 0.8rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }
  @media (max-width: 768px) {
    p{
      font-size: 0.7rem;
    }
  }

`;
const Gap = styles.div`
  margin-bottom: 2rem;
`;
