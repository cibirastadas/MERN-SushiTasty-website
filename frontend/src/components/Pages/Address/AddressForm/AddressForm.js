import React from "react";
import Select from "react-select";
import classes from "./AddressForm.module.css";
import { lithuanianCities } from "../../../../data/lithuanianCities";
const AddressForm = ({
  values,
  errors,
  handleChange,
  addressInputList,
  addressRadioList,
}) => {
  return (
    <div className={classes.addressContainer}>
      <div className={classes.cityBox}>
        <label>
          Miestas
          <Select
            className={classes.city}
            options={lithuanianCities.map((el) => ({
              value: el.city,
              label: el.city,
              name: "city",
            }))}
            placeholder="Miestas / didmiestis*"
            value={values.city ? { label: values.city } : ""}
            styles={{
              control: (base) => ({
                ...base,
                "&:hover": { borderColor: "none" },
                border: "1px solid lightgray",
                boxShadow: "none",
              }),
            }}
            onChange={handleChange}
          />
        </label>
        {errors.city && <p className="error">{errors.city}</p>}
      </div>
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
