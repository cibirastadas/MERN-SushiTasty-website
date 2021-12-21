import React, { useState } from "react";
import classes from "./OrderAdressForm.module.css";
import { BiPlusCircle, BiCheckCircle, BiCircle } from "react-icons/bi";
import IconButton from "../../../Buttons/IconButton/IconButton";
import ToggleButton from "../../../Buttons/ToggleButton/ToggleButton";
const OrderAddressForm = ({
  isOpenCollapsible,
  addressInputList,
  values,
  errors,
  addressRadioList,
  userAddresses,
  handleChange,
  handleChangeAddress,
  handleAddAddress,
  resetAddressValues,
}) => {
  const [isShow, setIsShow] = useState(false);
  const handleShowForm = () => {
    if (isShow) {
      resetAddressValues();
    }
    setIsShow((prev) => !prev);
  };
  const handleSaveAddress = () => {
    handleAddAddress();
    if (!errors) {
      setIsShow(false);
    }
  };
  return (
    <div
      className={`${classes.content} ${isOpenCollapsible ? classes.open : ""}`}
    >
      {!isShow &&
        userAddresses.map((address) => {
          return (
            <div key={address._id} className={classes.addressRadioGroup}>
              <label>
                <div
                  className={`${classes.addressTypeBlock} ${
                    address._id === values.deliveryAddressId
                      ? classes.active
                      : ""
                  }`}
                >
                  {address._id === values.deliveryAddressId ? (
                    <BiCheckCircle size={20} className={classes.circle} />
                  ) : (
                    <BiCircle size={20} className={classes.circle} />
                  )}
                  <input
                    className={classes.inputControl}
                    name="deliveryAddressId"
                    type="radio"
                    value={address._id}
                    onChange={handleChange}
                  />
                  <div className={classes.addressInfo}>
                    <p className={classes.street}>{address.street}</p>
                    <p className={classes.city}>{address.city}</p>
                  </div>
                </div>
              </label>
            </div>
          );
        })}

      {!isShow && (
        <>
          <IconButton
            action={handleShowForm}
            Icon={<BiPlusCircle size={20} />}
            widthFull
            btnStyle={classes.btnAdd}
          >
            Prideti naują pristatymo adresą
          </IconButton>
          {errors.deliveryAddressId && (
            <p className={`${"error"} ${classes.deliveryAddressError}`}>
              {errors.deliveryAddressId}
            </p>
          )}
        </>
      )}
      <div
        className={`${classes.addressForm} ${isShow ? classes.showForm : ""}`}
      >
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
                  value={values.address[input.name]}
                  onChange={handleChangeAddress}
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
                  className={`${
                    radio.id % 2 === 0 ? classes.radioMargin : ""
                  } ${
                    values.address.addressType === radio.value
                      ? classes.active
                      : ""
                  }`}
                >
                  <div className={classes.radioInput}>
                    <input
                      className={classes.inputControl}
                      name={radio.name}
                      type="radio"
                      value={radio.value}
                      onChange={handleChangeAddress}
                    />
                    <p>{radio.label}</p>
                  </div>
                </label>
              </React.Fragment>
            );
          })}
        </div>
        {errors.addressType && <p className="error">{errors.addressType}</p>}
        <div className={classes.addressButtons}>
          <ToggleButton style={classes.returnBtn} action={handleShowForm}>
            Grįžti
          </ToggleButton>
          <ToggleButton
            style={classes.saveAddrressBtn}
            action={handleSaveAddress}
          >
            Išsaugoti adresą
          </ToggleButton>
        </div>
      </div>
    </div>
  );
};

export default OrderAddressForm;
