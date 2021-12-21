import React, { useState } from "react";
import OrderAddressForm from "./OrderAddressForm/OrderAddressForm";
import OrderDeliveryForm from "./OrderDeliveryForm/OrderDeliveryForm";
import OrderTimeToMake from "./OrderTimeToMakeForm/OrderTimeToMake";
import PaymentMethodForm from "./PaymentMethodForm/PaymentMethodForm";
import { FaCarSide, FaHome } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { MdKeyboardArrowUp, MdPayment } from "react-icons/md";
import classes from "./OrderPayment.module.css";
const OrderPaymentForm = ({
  errors,
  component,
  allOrderEnums,
  orderInputs,
  addressInputList,
  values,
  addressRadioList,
  userAddresses,
  handleChangeTime,
  handleChange,
  handleChangeAddress,
  handleAddAddress,
  resetAddressValues,
}) => {
  const orderComponent = {
    OrderAddressForm: {
      buttonText: "Pristatymo adresas",
      component: OrderAddressForm,
      icon: FaHome,
    },
    OrderTimeToMake: {
      buttonText: "Pagaminimo laikas",
      component: OrderTimeToMake,
      icon: BiTime,
    },
    OrderDeliveryForm: {
      buttonText: "Pristatymo būdas",
      component: OrderDeliveryForm,
      icon: FaCarSide,
    },
    PaymentMethodForm: {
      buttonText: "Mokėjimo būdas",
      component: PaymentMethodForm,
      icon: MdPayment,
    },
  };
  const DynamicComponent = orderComponent[component].component;
  const IconComponent = orderComponent[component].icon;
  const [isOpenCollapsible, setIsOpenCollapsible] = useState(false);
  const handleChangeCollapsible = () => {
    setIsOpenCollapsible((prev) => !prev);
  };
  return (
    <div className={classes.orderPayment}>
      <button
        className={`${classes.collapsible} ${
          isOpenCollapsible ? classes.active : ""
        }`}
        onClick={handleChangeCollapsible}
      >
        <IconComponent className={classes.icon} />
        <span>{orderComponent[component].buttonText}</span>
        <MdKeyboardArrowUp
          className={`${classes.arrow} ${
            isOpenCollapsible ? classes.collapsibleArrow : " "
          }`}
        />
      </button>
      <DynamicComponent
        handleChangeAddress={handleChangeAddress}
        errors={errors}
        values={values}
        addressInputList={addressInputList}
        handleChange={handleChange}
        orderInputs={orderInputs}
        allOrderEnums={allOrderEnums}
        isOpenCollapsible={isOpenCollapsible}
        handleChangeTime={handleChangeTime}
        handleChangeCollapsible={handleChangeCollapsible}
        addressRadioList={addressRadioList}
        userAddresses={userAddresses}
        handleAddAddress={handleAddAddress}
        resetAddressValues={resetAddressValues}
      />
    </div>
  );
};
export default OrderPaymentForm;
