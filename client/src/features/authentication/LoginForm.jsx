import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "styled-components";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Label from "../../ui/Label";
import MiniSpinner from "../../ui/MiniSpinner";
import useLogin from "./useLogin";
import StyledLink from "../../ui/StyledLink";
const LoginForm = () => {
  const { mutate, isLoading } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (value) => {
      mutate(value);
    },
  });

  return (
    <Container>
      <Title> Login </Title>
      <FormWrapper onSubmit={formik.handleSubmit} noValidate>
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
        <Button type="submit">{isLoading ? <MiniSpinner /> : "Login"}</Button>
      </FormWrapper>
      <StyledLink to="/signup" style={{ marginTop: "20px" }}>
        Don&apos;t have an account? Sign up
      </StyledLink>
    </Container>
  );
};

export default LoginForm;

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
`;
const Gap = styles.div`
  margin-bottom: 2rem;
`;
