import React, { useState, useEffect } from 'react';
import PageCovers from '../../../components/PageCovers/PageCovers';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Cookies from "js-cookie";
import axios from "axios";
import FeedbacksUser from "../../../components/Pages/Feedbacks/FeedbacksUser/FeedbacksUser"
import FeedbacksAdmin from "../../../components/Pages/Feedbacks/FeedbacksAdmin/FeedbacksAdmin"
import classes from "./Feedbacks.module.css"

const Feedbacks = () => {

    const [values, setValues] = useState({
        name: "",
        rating: "",
        userText : "",
        adminText : "",
        response : false,
        date : ""
    })

    const [feedbacks, setFeedbacks] = useState([])

    const [userCookie, setUserCookie] = useState("")

    const [answer, setAnswer] = useState({
        answer : ""
    })


    const readCookie = () =>{
        setUserCookie(Cookies.get('user'))
    }

    const resetValues = () =>{
        setAnswer({answer : ""})
        setValues({rating: "", userText: "", name: ""})
    }

    const handleChange = (event)=>{
        const {name, value} = event.target
        setValues({...values, [name] : value})
    }

    useEffect(()=>{
        readCookie();
        if(userCookie!=="admin" && userCookie!==""){
            axios.get("https://sushifresh-backend.herokuapp.com/feedbacks/" + userCookie).then(response=>setFeedbacks(response.data)).catch(error=> console.log(error.response))
        }
        if(userCookie==="admin" && userCookie!==""){
            axios.get("https://sushifresh-backend.herokuapp.com/feedbacks").then(response=>setFeedbacks(response.data)).catch(error=> console.log(error.response))
        }   
    },[userCookie, answer])

    const submitHandler=(e)=> {
        e.preventDefault();
    }

    const handleDelete = (id)=>{
        axios.delete("https://sushifresh-backend.herokuapp.com/feedbacks/" + id).then(response=>setAnswer({answer : response.data}))
    }

    const handleUpdate = (id)=>{
        const user={...values, name : userCookie, date: Date.now()}
        axios.patch("https://sushifresh-backend.herokuapp.com/feedbacks/" + id, user).then(response=>setAnswer({answer : response.data}))
    }

    return (
        <div>
            <PageCovers cName={{coverImg: "coverContacts"}}>Sveiki atvyke</PageCovers>
            <SectionTitle>Atsiliepimai</SectionTitle>
            <div className={classes.content}>
                {userCookie !== "admin"? 
                <FeedbacksUser
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    submitHandler={submitHandler}
                    values={values}
                    feedbacks={feedbacks}
                    answer={answer}
                    resetValues={resetValues}
                    userCookie={userCookie}
                /> : 
                <FeedbacksAdmin
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    submitHandler={submitHandler}
                    values={values}
                    feedbacks={feedbacks}
                    answer={answer}
                    resetValues={resetValues}
                    userCookie={userCookie}
                />}
            </div>
        </div>
    );
};

export default Feedbacks;