import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageCovers from "../../../components/PageCovers/PageCovers";
import Cookies from "js-cookie";
import axios from "../../../axios/axiosInstance";
import FeedbacksUser from "../../../components/Pages/Feedbacks/FeedbacksUser/FeedbacksUser";
import FeedbacksAdmin from "../../../components/Pages/Feedbacks/FeedbacksAdmin/FeedbacksAdmin";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import classes from "./Feedbacks.module.css";
import ResponseModal from "../../../components/Modals/ResponseModal";
import { validateFeedbacks } from "../../../components/ValidateInfo/ValidateInfo";
import Pagination from "../../../components/Pagination/Pagination";
import MobileNavigation from "../../../components/MobileNavigation/MobileNavigation";

const Feedbacks = () => {
  const { search } = useLocation();
  const [userCookie] = useState(() => JSON.parse(Cookies.get("user")));
  const [values, setValues] = useState({
    name: {
      name: userCookie.name,
      _id: userCookie.id,
    },
    userUpdatedAt: "",
    rating: "",
    userText: "",
    adminText: "",
    response: false,
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [errors, setErrors] = useState({});
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [paginationNavigation, setPaginationNavigation] = useState({});
  const resetValues = () => {
    setValues({
      userUpdatedAt: "",
      rating: "",
      userText: "",
      adminText: "",
      response: false,
    });
    setErrors({});
  };
  const setUpdateValues = (currentFeedback) => {
    setValues(currentFeedback);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  useEffect(() => {
    const userRoleParam =
      userCookie.role === "Admin" ? `` : `/${userCookie.id}`;
    const query = search ? search + `&limit=5` : "?page=1&limit=5";
    setLoading(true);
    axios
      .get("http://localhost:5000/feedbacks" + userRoleParam + query)
      .then((resp) => {
        setPaginationNavigation(resp.data.paginationNavigation);
        setFeedbacks(resp.data.results);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [userCookie, search]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleDelete = (id) => {
    const filteredFeedbacks = feedbacks.filter(
      (feedback) => feedback._id !== id
    );
    axios.delete("http://localhost:5000/feedbacks/" + id).then((resp) => {
      setFeedbacks(filteredFeedbacks);
      setResponse(resp.data);
      setIsResponseModal(true);
    });
  };

  const handleUpdate = (id) => {
    if (!handleCheckErrors()) {
      return;
    }
    /* const user = { ...values, name: userCookie.name, date: Date.now() }; */
    const newValues =
      userCookie.role === "Admin"
        ? {
            ...values,
            response: true,
            adminUpdatedAt: new Date(),
          }
        : { ...values, userUpdatedAt: new Date() };
    const updatedFeedbacks = feedbacks.map((feedback) => {
      if (feedback._id === id) {
        return newValues;
      }
      return feedback;
    });
    axios
      .patch("http://localhost:5000/feedbacks/" + id, newValues)
      .then((resp) => {
        setFeedbacks(updatedFeedbacks);
        setResponse(resp.data);
        setIsResponseModal(true);
        resetValues();
      });
  };

  const handleCheckErrors = () => {
    const isAdmin = userCookie.role === "Admin";
    const foundErrors = validateFeedbacks(values, isAdmin);
    if (Object.keys(foundErrors).length !== 0) {
      setErrors(foundErrors);
      return false;
    }
    return true;
  };
  return (
    <>
      {loading && <LoadingScreen loading={loading} />}
      {!loading && (
        <div>
          <PageCovers cName={{ coverImg: "coverContacts" }}>
            Atsiliepimai
          </PageCovers>
          <ResponseModal
            onClose={() => setIsResponseModal(false)}
            open={isResponseModal}
            btnAction={() => setIsResponseModal(false)}
            bodyText={response}
          />
          <div className={classes.content}>
            <MobileNavigation />
            {!feedbacks.length ? (
              <p className={classes.feedbacksEmpty}>Atsiliepimų nėra</p>
            ) : (
              <>
                <Pagination paginationNavigation={paginationNavigation} />
                {userCookie.role === "Normal" ? (
                  <FeedbacksUser
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    submitHandler={submitHandler}
                    resetValues={resetValues}
                    userCookie={userCookie}
                    feedbacks={feedbacks}
                    values={values}
                    errors={errors}
                    isResponseModal={isResponseModal}
                    setUpdateValues={setUpdateValues}
                  />
                ) : (
                  <FeedbacksAdmin
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    submitHandler={submitHandler}
                    resetValues={resetValues}
                    setUpdateValues={setUpdateValues}
                    userCookie={userCookie}
                    feedbacks={feedbacks}
                    values={values}
                    errors={errors}
                  />
                )}
                <Pagination paginationNavigation={paginationNavigation} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Feedbacks;
