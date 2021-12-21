import React from "react";
import classes from "./PaymentMethodForm.module.css";
import { BiCheckCircle } from "react-icons/bi";
const PaymentMethodForm = ({ isOpenCollapsible, values, handleChange }) => {
  return (
    <div>
      <div className={classes.paymentMethodForm}>
        <div
          className={`${classes.content} ${
            isOpenCollapsible ? classes.open : ""
          }`}
        >
          <label>
            <div className={`${classes.inputGroup} ${classes.active}`}>
              <BiCheckCircle size={20} className={classes.circle} />
              <input
                className={classes.inputControl}
                name="paymentMethod"
                type="radio"
                value={values.paymentMethod}
                onChange={handleChange}
              />
              <p>Mokėjimas vietoje</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodForm;
