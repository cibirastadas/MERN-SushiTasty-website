import React from "react";
import classes from "./AddressForm.module.css";
const AddressForm = ({
  values,
  errors,
  handleChange,
  addressInputList,
  addressRadioList,
}) => {
  return (
    <div className={classes.addressContainer}>
      {addressInputList.map((input) => {
        var TagName = input.tag;
        return (
          <div className={classes.inputGroup} key={input.id}>
            <label>
              {input.label}
              <br />
              <TagName
                placeholder={input.placeholder}
                name={input.name}
                type={input.type}
                value={values[input.name]}
                onChange={handleChange}
              />
            </label>
            {errors[input.name] && (
              <p className="error">{errors[input.name]}</p>
            )}
          </div>
        );
      })}
      <div className={classes.radioList}>
        {addressRadioList.map((radio) => {
          return (
            <React.Fragment key={radio.id}>
              <label
                className={`${radio.id % 2 === 0 ? classes.radioMargin : ""} ${
                  values.addressType === radio.value ? classes.active : ""
                }`}
              >
                <div className={classes.radioInput}>
                  <input
                    className={classes.inputControl}
                    name={radio.name}
                    type="radio"
                    value={radio.value}
                    onChange={handleChange}
                  />
                  <p>{radio.label}</p>
                </div>
              </label>
            </React.Fragment>
          );
        })}
      </div>
      {errors.addressType && <p className="error">{errors.addressType}</p>}
    </div>
  );
};

export default AddressForm;
