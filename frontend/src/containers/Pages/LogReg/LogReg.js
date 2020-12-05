import React, {useState, useEffect} from 'react';
import validateInfo from "../../../components/ValidateInfo/ValidateInfo" 
import FormSuccess from '../../../components/FormSuccess/FormSuccess';
import LogRegForm from '../../../components/Pages/LogReg/LogRegForm/LogRegForm';
import axios from "axios"
import {MdClose} from "react-icons/md"
import classes from "./LogReg.module.css"
import Cookies from "js-cookie"
import Modal from '../../../components/Modal/Modal';
const LogReg = ({handleLogin, readCookie}) => {
    
    const [values, setValues] = useState({
        name : "",
        email : "",
        password : "",
        password2 : "" 
    })
    const [response, setResponse] = useState("")
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [close, setClose] = useState(false)
    const [account, setAccount] = useState(true)

    const handleChange = (event)=>{
        const {name, value} = event.target
        setValues({...values, [name] : value})
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        setErrors(validateInfo(values, account))   
        setIsSubmitting(true)
    }

    const handleClose = ()=>{
        setClose(!close)
        handleLogin()
    }

    const handleAccount = ()=>setAccount(!account)
    
    useEffect(()=>{
        if(Object.keys(errors).length === 0 && isSubmitting){     
            const path = (account ? "login" : "register")
            axios.post("https://sushifresh.herokuapp.com/" + path, values)
            .then(response=>{
                setIsSubmitted(true)
                if(account){
                    Cookies.set('user', values.name, { expires: 2 });
                    readCookie()
                }
                setResponse(response.data)})
            .catch(error=> {
                setIsSubmitting(false)
                setResponse(error.response.data.message)})
        }
    },[errors, account , isSubmitting, values, readCookie])

    return (
            <Modal close={close} style={classes.modal}>
                <div className={classes.cover}></div>
                <div className={classes.moduleRight}>
                    <div className={classes.mdClose} onClick={handleClose}>
                        <MdClose/>
                    </div>
                    <p className={classes.response}>{!isSubmitted && response}</p>
                    {isSubmitted ? <FormSuccess response={response}/> : <LogRegForm 
                    values={values} 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    handleClose={handleClose}
                    account={account}
                    handleAccount={handleAccount}/>}
                </div>
            </Modal>
    );
};

export default LogReg;
