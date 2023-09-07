import React, { useState } from "react";
import s from "./RegisterForm.module.css";
import { Header } from "../../Header/Header";
import { AuthService } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const registrationHeandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({
        email,
        password,
        fullName,
      });

      if (data) {
        navigate("/view_site_page");
        console.log(111, "CREATE");
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      alert(error);
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <div className={s.registerPageWrapper}>
        <h1>RivalCMS</h1>
        <form
          className={s.formContainer}
          onSubmit={(e) => registrationHeandler(e)}
        >
          <label htmlFor="fullName">Full name</label>
          <input
            className={s.formControl}
            type="text"
            id="fullName"
            name="fullName"
            autoComplete="off"
            onChange={(e) => setFullName(e.target.value)}
          />
          <label htmlFor="email">Email address</label>
          <input
            className={s.formControl}
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className={s.formControl}
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={s.formSubmitsWrapper}>
            <button className={s.formButton} type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
