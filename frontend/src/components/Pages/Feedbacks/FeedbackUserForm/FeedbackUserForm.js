import React, { useState, useEffect } from "react";
import Button from "../../../Buttons/ToggleButton/ToggleButton";
import FeedbackDisplay from "../FeedbackDisplay/FeedbackDisplay";
import FeedbackEdit from "../FeedbackEdit/FeedbackEdit";
import FeedbackAnswerAdmin from "../FeedbackAnswerAdmin/FeedbackAnswerAdmin";
import Modal from "../../../Modals/Modal/Modal";
import classes from "./FeedbackUserForm.module.css";
const FeedbackUser = ({
  feedback,
  values,
  handleDelete,
  handleChange,
  handleUpdate,
  resetValues,
  submitHandler,
  userCookie,
  setUpdateValues,
  errors,
  isResponseModal,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  useEffect(() => {
    if (isResponseModal) {
      setShowEdit(false);
    }
  }, [isResponseModal]);
  const handleShowEdit = () => {
    setUpdateValues(feedback);
    setShowEdit(!showEdit);
  };

  const handleShowResponse = () => {
    setUpdateValues(feedback);
    setShowResponse(!showResponse);
  };

  const buttonDisplay = () => {
    if (userCookie.role === "Admin") {
      return (
        <>
          <Button action={handleDelete} id={feedback._id}>
            Ištrinti
          </Button>
          <Button action={handleShowResponse}>Atsakyti</Button>
        </>
      );
    } else {
      return (
        <>
          <Button action={handleDelete} id={feedback._id}>
            Istrinti
          </Button>
          <Button action={handleShowEdit}>Atnaujinti</Button>
        </>
      );
    }
  };
  return (
    <div className={classes.feedbackBlock}>
      <FeedbackDisplay feedback={feedback} />
      {showResponse && (
        <FeedbackAnswerAdmin
          values={values}
          handleChange={handleChange}
          handleShowResponse={handleShowResponse}
          handleUpdate={handleUpdate}
          feedback={feedback}
          submitHandler={submitHandler}
          errors={errors}
        />
      )}
      <div className={classes.buttons}>{buttonDisplay()}</div>
      <Modal
        open={showEdit}
        onClose={handleShowEdit}
        modalWidth={classes.modalWidth}
      >
        <FeedbackEdit
          values={values}
          handleChange={handleChange}
          submitHandler={submitHandler}
          handleUpdate={handleUpdate}
          handleShowEdit={handleShowEdit}
          showEdit={showEdit}
          feedback={feedback}
          errors={errors}
        />
      </Modal>
    </div>
  );
};

export default FeedbackUser;
