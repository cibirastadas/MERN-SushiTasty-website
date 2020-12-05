import React from 'react';
import Button from "../../../Button/Button"
import LegendForm from '../../../LegendForm/LegendForm';
import SectionTitleSecond from '../../../SectionTitleSecond/SectionTitleSecond';
import classes from "./ContactsForm.module.css"
const ContactsComents = ({values, handleChange}) => {

return (
    <div className={classes.formContainer}>
        <SectionTitleSecond>Kaip galime Jums padėti?</SectionTitleSecond>
        <form>
            <LegendForm>
                <legend>Palikite laišką</legend>
                <div className={classes.formInputs}>
                    <input 
                        name="name" 
                        type="text" 
                        value={values.name} 
                        placeholder="Naudotojo vardas"
                        className={classes.formInput} 
                        onChange={handleChange} 
                    />
                </div>
                <br/>
                <div className={classes.formInputs}>
                    <input 
                        name="email" 
                        type="email" 
                        value={values.email} 
                        placeholder="Elektroninis paštas"
                        className={classes.formInput} 
                        onChange={handleChange} 
                    />
                </div>
                <div className={classes.formRadios}>
                    <p>Turite klausimą apie užsakymą?</p>
                    <div className={classes.formRadio}>
                        <input 
                            name="about"
                            value="Taip"
                            type="radio"
                            onChange={handleChange}
                            checked={values.about === "Taip"} />
                            <p>Taip</p>
                        <input 
                            name="about"
                            value="Ne"
                            type="radio"
                            onChange={handleChange}
                            checked={values.about === "Ne"} />
                        <p>Ne</p>
                    </div>
                </div> 
                <div className={classes.formText}>
                    <textarea 
                        name="userText"
                        value={values.userText}
                        placeholder="Čia peiteikite savo žinutę..."
                        onChange={handleChange}> 
                    </textarea>
                </div>
                <Button
                    btnType="submit"
                    style={classes.button} >
                    Siųsti
                </Button> 
            </LegendForm>
        </form>
    </div>
    );
};

export default ContactsComents;