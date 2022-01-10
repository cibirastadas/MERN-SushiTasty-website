import React, { useState, useEffect } from "react";
import { validateInfo } from "../../../components/ValidateInfo/ValidateInfo";
import FormSuccess from "../../../components/FormSuccess/FormSuccess";
import LogRegForm from "../../../components/Pages/LogReg/LogRegForm/LogRegForm";
import axios from "../../../axios/axiosInstance";
import classes from "./LogReg.module.css";
import Cookies from "js-cookie";
import Modal from "../../../components/Modals/Modal/Modal";
const LogReg = ({ handleLogin, readCookie, userCookie, login }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [response, setResponse] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [account, setAccount] = useState(true);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "name") {
      value = capitalize(value);
    }
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateInfo(values, account));
    setIsSubmitting(true);
  };

  const handleClose = () => {
    handleLogin();
    setResponse("");
    setValues({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
    setIsSubmitting(false);
    setErrors({});
  };
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  const handleAccount = () => {
    setErrorResponse("");
    setAccount(!account);
    setResponse("");
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setErrorResponse("");
      const path = account ? "login" : "register";
      axios
        .post("http://localhost:5000/" + path, values)
        .then((res) => {
          setIsSubmitted(true);
          if (account) {
            Cookies.set("user", res.data.user, { expires: 2 });
            Cookies.set("accessToken", res.data.accessToken);
            axios.defaults.headers["Authorization"] =
              "Bearer " + res.data.accessToken;
            setResponse(res.data.message);
          } else {
            setResponse(res.data);
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          if (account) {
            setErrorResponse(error.response.data.message);
            return;
          }
          setErrorResponse(error.response.data);
        });
    }
  }, [errors, account, isSubmitting, values]);
  useEffect(() => {
    if (!userCookie && isSubmitted) {
      setIsSubmitted(false);
      setIsSubmitting(false);
      readCookie();
    }
  }, [isSubmitted, readCookie, userCookie]);
  return (
    <Modal open={login} onClose={handleClose} modalWidth={classes.modalWdith}>
      <div className={classes.cover}></div>
      <div className={classes.moduleRight}>
        {response ? (
          <FormSuccess
            response={response}
            account={account}
            handleAccount={handleAccount}
          />
        ) : (
          <LogRegForm
            errorResponse={errorResponse}
            isSubmitted={isSubmitted}
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            handleClose={handleClose}
            account={account}
            handleAccount={handleAccount}
          />
        )}
      </div>
    </Modal>
  );
};

export default LogReg;
