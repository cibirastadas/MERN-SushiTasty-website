import React from 'react';
import Modal from "../../../Modal/Modal"
import FeedbacksFrom from "../FeedbacksForm/FeedbacksForm"
import {MdClose} from "react-icons/md"
import classes from "./FeedbackEdit.module.css"
const FeedbackEdit = ({values, showEdit, handleChange, submitHandler,handleShowEdit,handleUpdate,feedback,answer}) => {
    return (
        <Modal style={classes.modal}>
            <div className={classes.content}>
{/*             <p className={classes.answer}>{answer.answer}</p> */}
            <div className={classes.mdClose} onClick={handleShowEdit}>
                <MdClose/>
            </div>
                <FeedbacksFrom 
                    answer={answer}
                    feedback={values} 
                    handleFeedbackChange={handleChange} 
                    submitHandler={submitHandler}
                    handleUpdate={handleUpdate}
                    showEdit={showEdit}
                    feedbacks={feedback}/>
            </div>
        </Modal>
    );
};

export default FeedbackEdit;