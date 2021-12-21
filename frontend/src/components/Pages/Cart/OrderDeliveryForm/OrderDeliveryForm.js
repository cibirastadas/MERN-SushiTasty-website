import React from "react";
import classes from "./OrderDeliveryForm.module.css";
import { BiCheckCircle, BiCircle } from "react-icons/bi";
const OrderDeliveryForm = ({
  handleChange,
  isOpenCollapsible,
  allOrderEnums,
  orderInputs,
  errors,
  values,
}) => {
  return (
    <div className={classes.deliveryForm}>
      <div
        className={`${classes.content} ${
          isOpenCollapsible ? classes.open : ""
        }`}
      >
        {allOrderEnums.deliveryTypes?.length &&
          allOrderEnums.deliveryTypes &&
          allOrderEnums.deliveryTypes.map((type, index) => {
            return (
              <React.Fragment key={index}>
                <label>
                  <div
                    className={`${classes.inputGroup} ${
                      type === values.deliveryType ? classes.active : ""
                    }`}
                  >
                    {type === values.deliveryType ? (
                      <BiCheckCircle size={20} className={classes.circle} />
                    ) : (
                      <BiCircle size={20} className={classes.circle} />
                    )}
                    <input
                      className={classes.inputControl}
                      name="deliveryType"
                      type="radio"
                      value={type}
                      onChange={handleChange}
                    />
                    <p>{orderInputs[type]}</p>
                  </div>
                </label>
              </React.Fragment>
            );
          })}
        {errors["deliveryType"] && (
          <p className={`error ${classes.error}`}>{errors["deliveryType"]}</p>
        )}
      </div>
    </div>
  );
};

export default OrderDeliveryForm;
