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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [account, setAccount] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateInfo(values, account));
    setIsSubmitting(true);
  };

  const handleClose = () => {
    handleLogin();
    setValues({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
  };

  const handleAccount = () => setAccount(!account);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
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
            setResponse(res.data.user);
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          setResponse(error.response.data);
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
        {/* <p className={classes.response}>{!isSubmitted && response}</p> */}
        {userCookie ? (
          <FormSuccess response={response} />
        ) : (
          <LogRegForm
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
