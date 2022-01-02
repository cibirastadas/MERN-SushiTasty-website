import React, { useState } from "react";
import axios from "../../../axios/axiosInstance";
import PageCovers from "../../../components/PageCovers/PageCovers";
import ContactsMap from "../../../components/Pages/Contacts/ContactsMap/ContactsMap";
import classes from "./Contacts.module.css";
import Cookies from "js-cookie";
import ContactsInfo from "../../../components/Pages/Contacts/ContactsInfo/ContactsInfo";
import FeedbacksForm from "../../../components/Pages/Feedbacks/FeedbacksForm/FeedbacksForm";
import ResponseModal from "../../../components/Modals/ResponseModal";
import { validateFeedbacks } from "../../../components/ValidateInfo/ValidateInfo";
const Contacts = () => {
  const [userCookie] = useState(() => {
    if (Cookies.get("user")) {
      return JSON.parse(Cookies.get("user"));
    }
    return false;
  });
  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState({});
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 0,
    userText: "",
  });

  const handleFeedbackChange = (event) => {
    if (!userCookie) {
      setResponse("Prisijunkite, tuomet galėsite palikt atsiliepimą");
      setIsResponseModal(true);
      return;
    }
    const { name, value } = event.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const resetFeedbacks = () => {
    setFeedback({
      rating: 0,
      userText: "",
    });
  };
  const handleSubmit = () => {
    if (!userCookie) {
      setResponse("Prisijunkite, tuomet galėsite palikt atsiliepimą");
      setIsResponseModal(true);
      return;
    }
    const foundErrors = validateFeedbacks(feedback);
    if (Object.keys(foundErrors).length !== 0) {
      setErrors(foundErrors);
      return;
    }
    const newFeedback = {
      ...feedback,
      user: {
        name: userCookie.name,
        userId: userCookie.id,
      },
      userUpdatedAt: new Date(),
    };
    axios.post("http://localhost:5000/feedbacks", newFeedback).then((resp) => {
      resetFeedbacks();
      setResponse(resp.data);
      setIsResponseModal(true);
    });
  };

  return (
    <div>
      <PageCovers cName={{ coverImg: "coverContacts" }}>Kontaktai</PageCovers>
      <ResponseModal
        onClose={() => setIsResponseModal(false)}
        open={isResponseModal}
        btnAction={() => setIsResponseModal(false)}
        bodyText={response}
      />
      <div className={classes.content}>
        <ContactsMap />
        <div className={classes.formsInfo}>
          <div className={classes.forms}>
            <FeedbacksForm
              handleSubmit={handleSubmit}
              feedback={feedback}
              handleFeedbackChange={handleFeedbackChange}
              submitHandler={submitHandler}
              errors={errors}
            />
          </div>
          <ContactsInfo />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
/* */
