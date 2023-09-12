import React, { useState } from "react";
import s from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import emailImage from "../../common/Image/icons8-email-32.png";
import passwordImage from "../../common/Image/icons8-password.svg";
import { AuthService } from "../../../services/auth.service";
import { setTokenToLocalStorage } from "../../helpers/localstorage.helper";
import { login } from "../../../redux/userSlice";
import { useAppDispatch } from "../../../redux/hooks";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const loginHeandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login({ email, password });

      if (data) {
        setTokenToLocalStorage("token", data.token);

        dispatch(login(data));
        navigate("/pages");
        console.log(111, "login");
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      alert(error);
    }
  };

  return (
    <div className={s.loginPageWrapper}>
      <h1>RivalCMS</h1>
      <form
        className={s.formContainer}
        onSubmit={(e) => {
          loginHeandler(e);
        }}
      >
        <label htmlFor="email">
          <img className={s.imgLoginForm} src={emailImage} alt="email" /> Email
          address
        </label>
        <input
          className={s.formControl}
          type="email"
          name="email"
          id="email"
          autoComplete="on"
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="password">
          <img className={s.imgLoginForm} src={passwordImage} alt="password" />
          Password
        </label>
        <input
          className={s.formControl}
          type="password"
          name="password"
          id="password"
          autoComplete="off"
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />

        <div className={s.formSubmitsWrapper}>
          <Link to="/forgot_password">Forgot password?</Link>

          <button className={s.singInButton} type="submit">
            Sing in
          </button>

          <button className={s.loginButton} type="submit">
            <Link to="/auth/login">Don`t have & account?</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
