import React from "react";
import s from "./RegisterForm.module.css";
import { withFormik, FormikProps, Form, Field } from "formik";
import { Header } from "../Header/Header";
import SchemRegisterForm from "../common/Schema/SchemaRegisterForm";

interface FormValues {
  email: string;
  password: string;
  fullName: string;
}

const RegisterForm: React.FC<FormikProps<FormValues>> = ({
  touched,
  errors,
  isSubmitting,
}) => {
  return (
    <Form className={s.formContainer}>
      <label htmlFor="fullName">Full name</label>
      <Field className={s.formControl} type="text" name="fullName" />
      {touched.fullName && errors.fullName && (
        <div className={s.formErrors}>{errors.fullName}</div>
      )}

      <label htmlFor="email">Email address</label>
      <Field className={s.formControl} type="email" name="email" />
      {touched.email && errors.email && (
        <div className={s.formErrors}>{errors.email}</div>
      )}

      <label htmlFor="password">Password</label>
      <Field className={s.formControl} type="password" name="password" />
      {touched.password && errors.password && (
        <div className={s.formErrors}>{errors.password}</div>
      )}

      <div className={s.formSubmitsWrapper}>
        <button className={s.formButton} type="submit" disabled={isSubmitting}>
          Register
        </button>
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
      fullName: "",
    };
  },

  validationSchema: SchemRegisterForm,
  handleSubmit: (values) => {
    console.log(values);
  },
})(RegisterForm);

const RegisterPage: React.FC = () => {
  return (
    <>
      <div>
        <Header />
      </div>

      <div className={s.registerPageWrapper}>
        <h1>RivalCMS</h1>
        <MyForm />
      </div>
    </>
  );
};

export default RegisterPage;
