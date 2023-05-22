import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

//styles
import styles from "./RegistrationPage.module.scss";

const RegistrationPage = () => {
  const history = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const response = await authService.registration(user);
      console.log(response);
      history.push("/login");
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        setError(error);
      }
    }
  };

  return (
    <div className={styles.contentWrap}>
      <div className={styles.blocksWrap}>
        <form onSubmit={handleRegistration}>
          <div className={styles.formControl}>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              className={styles.inputField}
              value={data.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.inputField}
              value={data.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.inputField}
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.bottomWrap}>
          <p>Already have an account?</p>
          <Link className={styles.link} to="/login">
            <button className={styles.loginButton}>Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
