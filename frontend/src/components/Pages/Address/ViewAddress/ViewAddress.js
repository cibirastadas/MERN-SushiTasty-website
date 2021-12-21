import React, { useState, useEffect } from "react";
import Button from "../../../Buttons/ToggleButton/ToggleButton";
import Modal from "../../../Modals/Modal/Modal";
import classes from "./ViewAddress.module.css";
import AddressForm from "../../../Pages/Address/AddressForm/AddressForm";
const ViewAddress = ({
  values,
  handleUpdateAddress,
  handleDeleteAddress,
  resetValues,
  address,
  handleSetValues,
  handleChange,
  addressInputList,
  addressRadioList,
  isAddressProvided,
  errors,
  isResponseModal,
}) => {
  useEffect(() => {
    if (isAddressProvided) {
      setIsOpen(false);
    }
  }, [isAddressProvided]);
  
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
    resetValues();
  };
  const handleOpenUpdateForm = () => {
    handleSetValues(address);
    setIsOpen(true);
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        modalWidth={classes.modalWidth}
        btnAction={handleUpdateAddress}
        buttonText="Išsaugoti adresą"
        title="Atnaujinti adresą"
      >
        <AddressForm
          handleChange={handleChange}
          values={values}
          addressInputList={addressInputList}
          addressRadioList={addressRadioList}
          errors={errors}
        />
      </Modal>
      <div className={classes.editBtnsBlock}>
        <Button
          style={`${classes.deleteBtn} ${classes.btnWidth}`}
          action={handleDeleteAddress}
          id={address._id}
        >
          Ištrinti
        </Button>
        <Button
          style={`${classes.editBtn} ${classes.btnWidth}`}
          action={handleOpenUpdateForm}
        >
          Redaguoti
        </Button>
      </div>
    </div>
  );
};

export default ViewAddress;
