import React, { useState, useEffect } from 'react'
import axios from "axios"
import PageCovers from '../../../components/PageCovers/PageCovers'
import ContactsMap from '../../../components/Pages/Contacts/ContactsMap/ContactsMap'
import ContactsForm from "../../../components/Pages/Contacts/ContactsForm/ContactsForm"
import classes from "./Contacts.module.css"
import Cookies from "js-cookie"
import ContactsInfo from '../../../components/Pages/Contacts/ContactsInfo/ContactsInfo'
import FeedbacksForm from '../../../components/Pages/Feedbacks/FeedbacksForm/FeedbacksForm'
const Contacts = ()=>{
    
    const [values, setValues] = useState({
        name : "",
        email : "",
        about : "",
        userText : "",
        adminText : "",
        response : false
        
    })

    const [feedback, setFeedback] = useState({
        name: "",
        rating: null,
        userText : ""
    })

    const [answer, setAnswer] = useState({
        answer : ""
    })
    const [userCookie, setUserCookie] = useState("")

    const handleChange = (event)=>{
        const {name, value} = event.target
        setValues({...values, [name] : value})
    }

    const handleFeedbackChange= (event)=>{
        const {name, value} = event.target
        setFeedback({...feedback, [name] : value})
    }
   
    const readCookie = () =>{
        setUserCookie(Cookies.get('user'))
    }
    
    useEffect(()=>{
        console.log("asdasd")
        readCookie()
    },[userCookie])

    const submitHandler=(e)=> {
        e.preventDefault();
    }

    const handleSubmit = ()=>{
        const user={...feedback, name : userCookie}
        axios.post("https://sushifresh-backend.herokuapp.com/feedbacks", user).then(response=>setAnswer({answer : response.data}))
        setFeedback({rating: null, userText: "", name: ""})
    }


return ( 
    <div>
        <PageCovers cName={{coverImg: "coverContacts"}}>Kontaktai</PageCovers>
        <div className={classes.content}>
            <ContactsMap/>
            <div className={classes.formsInfo}>
                <div className={classes.forms}>
                    <ContactsForm 
                        values={values}
                        handleChange={handleChange}
                    />
                {userCookie && 
                    <FeedbacksForm
                        handleSubmit={handleSubmit}
                        feedback={feedback}
                        handleFeedbackChange={handleFeedbackChange}
                        submitHandler={submitHandler}
                        answer={answer}
                    />
                 }
                </div>
                    <ContactsInfo/>
            </div>      
        </div>
    </div>
    )
}

export default Contacts