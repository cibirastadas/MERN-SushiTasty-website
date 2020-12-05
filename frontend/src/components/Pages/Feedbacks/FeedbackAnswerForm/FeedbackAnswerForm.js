import React from 'react';
import Button from '../../../Button/Button';
import classes from "./FeedbackAnswerForm.module.css"
const FeedbackAnswerForm = ({feedback, handleChange, handleUpdate, submitHandler, values}) => {
 
    return (
     <form onSubmit={submitHandler} className={classes.answerContainer}>
        <textarea 
            name="adminText"
            value={values.adminText}
            placeholder="Čia peiteikite savo atsakymą..."
            onChange={handleChange}>     
        </textarea>
        <Button action={handleUpdate} id={feedback._id} style={classes.button}>Siųsti</Button>
     </form>
    );
};

export default FeedbackAnswerForm;