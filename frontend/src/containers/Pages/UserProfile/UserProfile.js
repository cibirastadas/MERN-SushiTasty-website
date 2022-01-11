import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import PageCovers from "../../../components/PageCovers/PageCovers";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import axios from "../../../axios/axiosInstance";
import classes from "./UserProfile.module.css";
import Button from "../../../components/Buttons/ToggleButton/ToggleButton";
import ResponseModal from "../../../components/Modals/ResponseModal";
import {
  userProfileInputList,
  userProfilenewPasswordInputList,
} from "../../../data/userProfile";
import {
  validateUserProfilPassword,
  validateUserProfileInformation,
} from "../../../components/ValidateInfo/ValidateInfo";
import UserProfileForm from "../../../components/UserProfileForm/UserProfileForm";
import Modal from "../../../components/Modals/Modal/Modal";
import MobileNavigation from "../../../components/MobileNavigation/MobileNavigation";
const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [errorResponse, setErrorResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState("");
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [userCookie] = useState(() => JSON.parse(Cookies.get("user")));
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    oldPassword: "",
    password: "",
    password2: "",
  });
  let history = useHistory();
  const handleClose = () => {
    isOpen && resetValues();
    setIsOpen((prev) => !prev);
    setErrors({});
    setErrorResponse("");
  };
  const resetValues = () => {
    setValues({
      name: "",
      email: "",
      password: "",
      oldPassword: "",
      password2: "",
    });
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/account/" + userCookie.id)
      .then((resp) => {
        setUserProfile(resp.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [userCookie.id]);
  const redirecAfterDelete = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    localStorage.removeItem("items");
    setIsAccountDeleted(false);
    setIsResponseModal(false);
    history.push("/");
    window.location.reload();
  };
  const handleDeleteAccount = () => {
    axios
      .delete("http://localhost:5000/account/" + userCookie.id)
      .then((res) => {
        setResponse(res.data);
        setIsAccountDeleted(true);
        setIsResponseModal(true);
      })
      .catch((error) => console.log(error));
  };
  const handlUpdateAccountPassword = () => {
    axios
      .patch("http://localhost:5000/account/" + userCookie.id, values)
      .then((res) => {
        setResponse(res.data);
        handleClose();
        setIsResponseModal(true);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorResponse(error.response.data);
        }
        console.log(error);
      });
  };
  const handlUpdateAccountInformation = () => {
    axios
      .patch("http://localhost:5000/account/" + userCookie.id, values)
      .then((res) => {
        setUserProfile(values);
        setResponse(res.data.msg);
        Cookies.set("user", res.data.user, { expires: 2 });
        Cookies.set("accessToken", res.data.accessToken);
        axios.defaults.headers["Authorization"] =
          "Bearer " + res.data.accessToken;
        handleClose();
        setIsResponseModal(true);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorResponse(error.response.data);
        }
        console.log(error);
      });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleValidation = () => {
    const formErrors = isEdit
      ? validateUserProfileInformation(values)
      : validateUserProfilPassword(values);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    isEdit ? handlUpdateAccountInformation() : handlUpdateAccountPassword();
  };
  const handleOpenUpdateInfo = () => {
    setIsEdit(true);
    setValues(userProfile);
    handleClose();
  };
  const handleOpenUpdatePsw = () => {
    setIsEdit(false);
    handleClose();
  };

  return (
    <>
      {loading ? (
        <LoadingScreen loading={loading} />
      ) : (
        <>
          <PageCovers cName={{ coverImg: "coverContacts" }}>Paskyra</PageCovers>
          <ResponseModal
            onClose={
              isAccountDeleted
                ? redirecAfterDelete
                : () => setIsResponseModal(false)
            }
            open={isResponseModal}
            btnAction={
              isAccountDeleted
                ? redirecAfterDelete
                : () => setIsResponseModal(false)
            }
            bodyText={response}
          />
          <Modal
            open={isOpen}
            onClose={handleClose}
            buttonText={isEdit ? "Atnaujinti" : "Keisti slaptažodį"}
            modalWidth={classes.modalWidth}
            btnAction={handleValidation}
            title={isEdit ? "Atnaujinti informacija" : "Keisti slaptažodį"}
          >
            <UserProfileForm
              isEdit={isEdit}
              errors={errors}
              values={values}
              errorResponse={errorResponse}
              createList={
                isEdit ? userProfileInputList : userProfilenewPasswordInputList
              }
              handleChange={handleChange}
            />
          </Modal>
          <div className={classes.userProfileContainer}>
            <MobileNavigation />
            {userProfile.role === "Normal" && (
              <div className={classes.deleteAccount}>
                <hr className={classes.hideHr} />
                <Button action={handleDeleteAccount}>Ištrinti paskyrą</Button>
                <hr />
              </div>
            )}
            <div className={classes.userProfileBlock}>
              <p>
                Vardas: <span>{userProfile.name}</span>
              </p>
              <hr />
              <p>
                El. paštas: <span>{userProfile.email}</span>
              </p>
              <div className={classes.editBtnsBlock}>
                <Button
                  style={`${classes.editInfoBtn} `}
                  action={handleOpenUpdateInfo}
                >
                  Redaguoti informaciją
                </Button>
                <Button
                  style={`${classes.editPswBtn}`}
                  action={handleOpenUpdatePsw}
                >
                  Keisti slaptažodį
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
