import React,{useState} from 'react';
import Button from '../../../Button/Button';
import FeedbackDisplay from '../FeedbackDisplay/FeedbackDisplay';
import FeedbackEdit from "../FeedbackEdit/FeedbackEdit"
import FeedbackAnswerAdmin from "../FeedbackAnswerAdmin/FeedbackAnswerAdmin"
import classes from "./FeedbackUserForm.module.css"
const FeedbackUser = ({feedback, handleDelete,values, handleChange, submitHandler, handleUpdate, answer, resetValues, userCookie}) => {

    const [showEdit, setShowEdit] = useState(false)
    const [showResponse, setShowResponse] = useState(false)

    const handleShowEdit = ()=>{
        resetValues()
        setShowEdit(!showEdit)
    }
    
    const handleShowResponse = ()=>{
        resetValues()
        setShowResponse(!showResponse)
    }

    const buttonDisplay = () =>{
        if(userCookie === "admin"){
            return <>
                <Button action={handleDelete} id={feedback._id}>Ištrinti</Button>
                <Button action={handleShowResponse}>Atsakyti</Button>
            </>
        }else{
            return<>
                <Button action={handleDelete} id={feedback._id}>Istrinti</Button>
                <Button action={handleShowEdit}>Atnaujinti</Button>
            </>
        }
    }
    return (
        <div className={classes.feedbackBlock}>
            <FeedbackDisplay feedback={feedback}/>
            {showResponse &&
            <FeedbackAnswerAdmin
                values={values}
                handleChange={handleChange}
                handleShowResponse={handleShowResponse}
                handleUpdate={handleUpdate}
                feedback={feedback}
                answer={answer}
                submitHandler={submitHandler}
            />}
            <div className={classes.buttons}>
                {buttonDisplay()}
            </div>
            {showEdit && 
            <FeedbackEdit 
                values={values}
                handleChange={handleChange}
                submitHandler={submitHandler}
                handleShowEdit={handleShowEdit}
                handleUpdate={handleUpdate}
                showEdit={showEdit}
                feedback={feedback}
                answer={answer}
            />}
            
        </div>
    );
};

export default FeedbackUser;