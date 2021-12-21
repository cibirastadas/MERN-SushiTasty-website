import React, { useState, useEffect } from "react";
import classes from "./Addresses.module.css";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import ResponseModal from "../../../components/Modals/ResponseModal";
import axios from "../../../../src/axios/axiosInstance";
import { validateAddress } from "../../../components/ValidateInfo/ValidateInfo";
import {
  addressType,
  addressInputList,
  addressRadioList,
} from "../../../data/addressData";
import Cookies from "js-cookie";
import PageCovers from "../../../components/PageCovers/PageCovers";
import Button from "../../../components/Buttons/ToggleButton/ToggleButton";
import ViewAddress from "../../../components/Pages/Address/ViewAddress/ViewAddress";
import Modal from "../../../components/Modals/Modal/Modal";
import AddressForm from "../../../components/Pages/Address/AddressForm/AddressForm";
const Addresses = () => {
  const [values, setValues] = useState({
    _id: "",
    additionalInformation: "",
    addressType: "",
    city: "",
    phoneNumber: "",
    street: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
    resetValues();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const [userCookie] = useState(() => JSON.parse(Cookies.get("user")));
  const [response, setResponse] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [isAddressProvided, setIsAddressProvided] = useState(false);
  const resetValues = () => {
    setValues({
      _id: "",
      additionalInformation: "",
      addressType: "",
      city: "",
      phoneNumber: "",
      street: "",
    });
    setErrors({});
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/addresses/" + userCookie.id)
      .then((resp) => {
        if (!resp.data.length) {
          setLoading(false);
          return;
        }
        setAddresses(resp.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [userCookie.id]);
  const handleAddAddress = () => {
    const foundErrors = validateAddress(values);
    if (Object.keys(foundErrors).length !== 0) {
      setErrors(foundErrors);
      return;
    }
    axios
      .post("http://localhost:5000/addresses", {
        ...values,
        userId: userCookie.id,
      })
      .then((resp) => {
        setAddresses([...addresses, resp.data.address]);
        setResponse(resp.data.msg);
        setIsResponseModal(true);
        setIsOpen(false);
        /* resetAddressValues(); */
      })
      .catch((error) => console.log(error));
  };
  const handleDeleteAddress = (addressId) => {
    const filteredAddresses = addresses.filter(
      (address) => address._id !== addressId
    );
    axios
      .delete("http://localhost:5000/addresses/" + addressId)
      .then((resp) => {
        setAddresses(filteredAddresses);
        setResponse(resp.data);
        setIsResponseModal(true);
      })
      .catch((error) => console.log(error));
  };
  const handleSetValues = (address) => {
    setValues(address);
  };
  const handleUpdateAddress = () => {
    const foundErrors = validateAddress(values);
    if (Object.keys(foundErrors).length !== 0) {
      setErrors(foundErrors);
      return;
    }
    const updatedAddresses = addresses.map((address) => {
      if (address._id === values._id) {
        return values;
      }
      return address;
    });
    axios
      .patch("http://localhost:5000/addresses/" + values._id, values)
      .then((res) => {
        setAddresses(updatedAddresses);
        setResponse(res.data);
        setIsAddressProvided(true);
        //Close here
        setIsResponseModal(true);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      {loading && <LoadingScreen loading={loading} />}
      <PageCovers cName={{ coverImg: "coverProducts" }}>Adresai</PageCovers>
      <ResponseModal
        onClose={() => {
          setIsResponseModal(false);
          setIsAddressProvided(false);
        }}
        open={isResponseModal}
        btnAction={() => {
          setIsResponseModal(false);
          setIsAddressProvided(false);
        }}
        bodyText={response}
      />
      <div className={classes.addressesContainer}>
        <hr />
        <Button
          style={`${classes.addBtn} ${classes.btnWidth}`}
          action={() => setIsOpen(true)}
        >
          Pridėti
        </Button>
        <Modal
          open={isOpen}
          onClose={handleCloseModal}
          modalWidth={classes.modalWidth}
          btnAction={handleAddAddress}
          buttonText="Išsaugoti adresą"
          title="Prideti adresą"
        >
          <AddressForm
            handleChange={handleChange}
            values={values}
            addressInputList={addressInputList}
            addressRadioList={addressRadioList}
            errors={errors}
          />
        </Modal>
        <hr />
        {!addresses.length && (
          <p className={classes.addressesEmpty}>Adresų nėra</p>
        )}
        {addresses.map((address) => {
          return (
            <div key={address._id} className={classes.addressBlock}>
              <p>
                Vietos tipas: <span>{addressType[address.addressType]}</span>
              </p>
              <hr />
              <p>
                Adresas: <span>{address.street}</span>
              </p>

              <p>
                Miestas: <span>{address.city}</span>
              </p>
              <p>
                Telefono nr: <span>{address.phoneNumber}</span>
              </p>
              {address.additionalInformation && (
                <p>
                  Papildoma informacija:{" "}
                  <span>{address.additionalInformation}</span>
                </p>
              )}

              <ViewAddress
                handleChange={handleChange}
                resetValues={resetValues}
                handleSetValues={handleSetValues}
                handleDeleteAddress={handleDeleteAddress}
                handleUpdateAddress={handleUpdateAddress}
                isAddressProvided={isAddressProvided}
                values={values}
                address={address}
                addressInputList={addressInputList}
                addressRadioList={addressRadioList}
                isResponseModal={isResponseModal}
                errors={errors}
              />
            </div>
          );
        })}
        <div></div>
      </div>
    </div>
  );
};

export default Addresses;
