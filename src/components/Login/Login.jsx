import React, { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { Login, Token } from "../Redux/action.js";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim("white space is not allowed")
    .email("Invalid email")
    .required("Required"),

  password: yup
    .string()
    .trim("white space is not allowed")
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
});

function Logindata() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, setAuth] = useState("");
  const data = useSelector((state) => state.loginreducer.logindata);
  const tokendata = useSelector((state) => state.partData.partData);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  let url = "https://alkemapi.indusnettechnologies.com/api/employee/login";
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const email_Props = formik.getFieldProps("email");
  const password_Props = formik.getFieldProps("password");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(url, formik.values)
      .then((res) => {
        dispatch(Token(res.data.token));
        setAuth(res.data.token);
        navigate("/landing");
      })
      .catch((err) => {
        setIsError(true);
        setErrorMsg(err.response.data.errors.password);
        // console.log(err.response.data.errors.password)
        // console.log(errorMsg)
      });
    dispatch(Login(formik.values));
    console.log(formik.values);
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required {...email_Props} />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red", "font-weight": "bold" }}>
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" {...password_Props} required />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red", "font-weight": "bold" }}>
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className="button-container">
          <input type="submit" />
        </div>
        {isError ? (<div style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>{errorMsg}</div>) : null}

      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Log In</div>
        {renderForm}
      </div>
    </div>
  );
}

export default Logindata;