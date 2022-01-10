import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  validateInfo,
  validateUserProfileInformation,
} from "../../../../components/ValidateInfo/ValidateInfo";
import classes from "./Workers.module.css";
import axios from "../../../../axios/axiosInstance";
import { useHistory } from "react-router-dom";
import { workersColumnsData } from "../../../../components/Table/workersColumnsData";
import MobileNavigation from "../../../../components/MobileNavigation/MobileNavigation";
import PageCovers from "../../../../components/PageCovers/PageCovers";
import Table from "../../../../components/Table/Table";
import { userProfileInputList } from "../../../../../src/data/userProfile";
import UserProfileForm from "../../../../components/UserProfileForm/UserProfileForm";
import ResponseModal from "../../../../components/Modals/ResponseModal";
import Modal from "../../../../components/Modals/Modal/Modal";

const Workers = () => {
  const [errorResponse, setErrorResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [workers, setWorkers] = useState([]);
  const fetchIdRef = useRef(0);
  const [response, setResponse] = useState("");
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [paginationNavigation, setPaginationNavigation] = useState({});
  const [loading, setLoading] = useState(false);
  const [workersRoles, setWorkersRoles] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "KitchenWorker",
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/workers/roles")
      .then((res) => {
        setWorkersRoles(res.data.filter((worker) => worker !== "Normal"));
      })
      .catch((error) => console.log(error));
  }, []);
  const fetchData = useCallback(
    (pageIndex, search = "") => {
      const fetchId = ++fetchIdRef.current;
      if (fetchId === fetchIdRef.current) {
        fetchAPIData(pageIndex + 1, search);
        history.replace({
          pathname: history.location.pathname,
          search: `?page=${pageIndex + 1}`,
        });
      }
    },
    [history]
  );
  const resetValues = () => {
    setValues({
      name: "",
      email: "",
      password: "",
      password2: "",
      role: "KitchenWorker",
    });
  };
  const handleClose = () => {
    isOpen && resetValues();
    setIsOpen((prev) => !prev);
    setErrors({});
    setErrorResponse("");
  };
  const fetchAPIData = async (page, search) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/workers?page=${page}&limit=15&search=${search}`
      );
      setPaginationNavigation(res.data.paginationNavigation);
      setPageCount(res.data.paginationNavigation.total.page);
      setWorkers(res.data.results);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteWorker = (id, workerData) => {
    axios
      .delete("http://localhost:5000/workers/" + id)
      .then((res) => {
        const workersFiltered = workerData.filter((x) => x._id !== id);
        setWorkers(workersFiltered);
        setResponse(res.data);
        setIsResponseModal(true);
      })
      .catch((error) => console.log(error));
  };
  const handleOpenAddForm = () => {
    setIsEdit(false);
    handleClose();
  };
  const handleOpenUpdateForm = (workerInformation) => {
    setIsEdit(true);
    setValues(workerInformation);
    handleClose();
  };
  const handleAddWorker = () => {
    axios
      .post("http://localhost:5000/workers/", values)
      .then((res) => {
        const updatedWorkers = [{ ...values, _id: res.data._id }, ...workers];
        setWorkers(updatedWorkers);
        handleClose();
        setResponse(res.data.msg);
        setIsResponseModal(true);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorResponse(error.response.data);
        }
        console.log(error);
      });
  };
  const handleUpdateWorker = () => {
    const updatedWorkers = workers.map((worker) => {
      if (worker._id === values._id) {
        return { ...values };
      }
      return worker;
    });
    axios
      .patch("http://localhost:5000/workers/" + values._id, values)
      .then((res) => {
        setWorkers(updatedWorkers);
        handleClose();
        setResponse(res.data);
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
      : validateInfo(values);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    isEdit ? handleUpdateWorker() : handleAddWorker();
  };
  return (
    <div>
      <PageCovers cName={{ coverImg: "coverOrder" }}>Darbuotojai</PageCovers>
      <ResponseModal
        onClose={() => setIsResponseModal(false)}
        open={isResponseModal}
        btnAction={() => setIsResponseModal(false)}
        bodyText={response}
      />
      <MobileNavigation />
      <Modal
        open={isOpen}
        onClose={handleClose}
        modalWidth={classes.modalWidth}
        buttonText={isEdit ? "Atnaujinti" : "Pridėti darbuotoją"}
        btnAction={handleValidation}
        title={isEdit ? "Atnaujinti Darbuotoją" : "Pridėi Darbuotoją"}
      >
        <UserProfileForm
          handleChange={handleChange}
          values={values}
          createList={userProfileInputList}
          errors={errors}
          workersRoles={workersRoles}
          isEdit={isEdit}
          errorResponse={errorResponse}
        />
      </Modal>
      <div className={classes.workersContainer}>
        <Table
          handleDelete={handleDeleteWorker}
          handleAdd={handleOpenAddForm}
          handleUpdate={handleOpenUpdateForm}
          fetchData={fetchData}
          columnsData={workersColumnsData}
          data={workers}
          pageCount={pageCount}
          loading={loading}
          paginationNavigation={paginationNavigation}
        />
      </div>
    </div>
  );
};

export default Workers;
