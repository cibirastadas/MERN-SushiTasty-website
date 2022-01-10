import React from "react";
import classes from "./LogRegForm.module.css";
import Button from "../../../Buttons/ToggleButton/ToggleButton";
const LogRegForm = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  account,
  handleAccount,
  isSubmitted,
  errorResponse,
}) => {
  return (
    <div className={classes.parentContainer}>
      <form className={classes.form}>
        <h2 className={classes.title}>
          {account ? "Prisijungimas" : "Registracija"}
        </h2>
        <p className={classes.errorResponse}>{!isSubmitted && errorResponse}</p>
        <div className={account ? classes.hide : classes.formContainer}>
          <input
            name="name"
            type="text"
            value={values.name}
            placeholder="Naudotojo vardas"
            className={classes.formInput}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className={classes.formContainer}>
          <input
            name="email"
            type="email"
            value={values.email}
            placeholder="Elektroninis paštas"
            className={classes.formInput}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className={classes.formContainer}>
          <input
            name="password"
            type="password"
            value={values.password}
            placeholder="Slaptažodis"
            className={classes.formInput}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className={account ? classes.hide : classes.formContainer}>
          <input
            name="password2"
            type="password"
            value={values.password2}
            placeholder="Pakartotinis slaptazodis"
            className={classes.formInput}
            onChange={handleChange}
          />
          {errors.password2 && <p className="error">{errors.password2}</p>}
        </div>
        <div className={classes.formContainer}>
          <Button btnType="submit" action={handleSubmit} style={classes.button}>
            {account ? "Prisijungti" : "Registruotis"}
          </Button>
        </div>
        <div className={classes.bottomText}>
          {account
            ? "Jei dar neturite paskyros? Registruotis"
            : "Jei jau turi paskyrą? Prisijungti"}{" "}
          <span onClick={handleAccount}>čia</span>
        </div>
      </form>
    </div>
  );
};

export default LogRegForm;
