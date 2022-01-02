import React from "react";
import classes from "./FormSuccess.module.css";
const FormSuccess = ({ response, account, handleAccount }) => {
  return (
    <div className={classes.successCover}>
      <h1 className={classes.title}>
        {response}{" "}
        {!account && (
          <p className={classes.login}>
            Prisijungti galite spausti{" "}
            <span onClick={handleAccount} className={classes.pressHere}>
              čia
            </span>
          </p>
        )}
      </h1>
    </div>
  );
};

export default FormSuccess;
