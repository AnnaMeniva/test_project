import React, { useEffect, useState } from "react";
import s from "./LoginForm.module.css";
import { withFormik, FormikProps, Form, Field } from "formik";
import SchemaLoginForm from "../common/Schema/SchemaLoginForm";
import { Link, useNavigate } from "react-router-dom";
import email from "../common/Image/icons8-email-32.png";
import password from "../common/Image/icons8-password.svg";
import { users } from "../../redux/Redux-store";


interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC<FormikProps<FormValues>> = ({
  touched,
  errors,
  isSubmitting,
  values,
}) => {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (login) navigate("/view_site_page", {});
  }, [login, navigate]);

  const isLogin = () => {
    const findUser = users.filter(
      (user) => user.email === values.email && user.password === values.password
    );
    if (findUser.length) {
      setLogin(true);
    } else {
      setLogin(false);
      setError(true);
    }
  };

  return (
    <Form className={s.formContainer}>
      <label htmlFor="email">
        <img className={s.imgLoginForm} src={email} alt="email" /> Email address
      </label>
      <Field className={s.formControl} type="email" name="email" />
      {touched.email && errors.email && (
        <div className={s.formErrors}>{errors.email}</div>
      )}

      <label htmlFor="password">
        <img className={s.imgLoginForm} src={password} alt="password" />{" "}
        Password
      </label>
      <Field className={s.formControl} type="password" name="password" />
      {touched.password && errors.password && (
        <div className={s.formErrors}>{errors.password}</div>
      )}

      <div className={s.formSubmitsWrapper}>
        <Link to="/forgot_password">Forgot password?</Link>

        <button className={s.singInButton} onClick={() => isLogin()}>
          Sing in
        </button>

        <button className={s.loginButton} type="submit" disabled={isSubmitting}>
          <Link to="/register">Don`t have & account?</Link>
        </button>
        {error ? <div>Incorrect password or username</div> : null}
      </div>
    </Form>
  );
};

interface MyFormProps {
  initialEmail?: string;
}

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || "",
      password: "",
    };
  },

  validationSchema: SchemaLoginForm,
  handleSubmit: (values) => {},
})(LoginForm);

const LoginPage: React.FC = () => {
  return (
    <div className={s.loginPageWrapper}>
      <h1>RivalCMS</h1>
      <MyForm />
    </div>
  );
};
export default LoginPage;
