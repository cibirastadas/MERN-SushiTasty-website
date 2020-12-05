import React, {useState} from 'react';
import Button from '../../../Button/Button';
import CommentsDisplay from '../CommentsDisplay/CommentsDisplay';
import classes from "./UserComments.module.css"
const UserComments = ({userCookie, comments, handleDelete, handleUpdate, handleChange, values}) => {
   
    const [ click, setClick ] = useState(false)

    const handleClick = ()=>{
        setClick(!click)
    }

    const allComments = comments.map((comment,index)=>{
        return <CommentsDisplay 
            key={index} 
            comment={comment}
            userCookie={userCookie}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleChange={handleChange}
            values={values}
            /> 
        })
    return (
        <div className={classes.userContainer}>
            <Button className={classes.button} action={handleClick}>Žinutės {allComments.length}</Button>
            {click && allComments}
        </div>
    );
};

export default UserComments;