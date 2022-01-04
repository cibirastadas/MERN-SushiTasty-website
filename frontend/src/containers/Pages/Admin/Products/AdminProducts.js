import React, { useCallback, useEffect, useState, useRef } from "react";
import axios from "../../../../axios/axiosInstance";
import classes from "./AdminProducts.module.css";
import PageCovers from "../../../../components/PageCovers/PageCovers";
import AddProduct from "../../../../components/Pages/Admin/Products/ProductForm/ProductForm";
import Table from "../../../../components/Table/Table";
import Modal from "../../../../components/Modals/Modal/Modal";
import { productsColumnsData } from "../../../../components/Table/productsColumnsData";
import { validateProducts } from "../../../../components/ValidateInfo/ValidateInfo";
import ResponseModal from "../../../../components/Modals/ResponseModal";
import { useHistory } from "react-router-dom";
import MobileNavigation from "../../../../components/MobileNavigation/MobileNavigation";
const AdminProducts = () => {
  const [values, setValues] = useState({
    _id: 0,
    name: "",
    description: "",
    price: 0,
    image: "",
    units: 0,
    amount: 0,
    popular: "",
    category: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [productCategories, setProductCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState("");
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paginationNavigation, setPaginationNavigation] = useState({});
  const fetchIdRef = useRef(0);
  const [pageCount, setPageCount] = useState(0);
  const history = useHistory();
  const handleChange = (e) => {
    let { name, value, type } = e.target;
    if (value === "true" || value === "false") {
      value = JSON.parse(value);
    }
    if (type === "number") {
      value = !!value && Math.abs(value) >= 0 ? Math.abs(value) : "";
    }
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleUpdateProduct = () => {
    if (!handleValidation()) {
      return;
    }
    const findProductIndex = products.findIndex(
      (item) => item._id === values._id
    );
    const temp = [...products];
    temp[findProductIndex] = values;
    setProducts(temp);
    axios
      .patch("http://localhost:5000/products/" + values._id, values)
      .then((res) => {
        handleClose();
        setResponse(res.data);
        setIsResponseModal(true);
      })
      .catch((error) => console.log(error));
  };
  const handleSelectedImg = (e) => {
    const selectedImage = e.target.files[0];
    createBase64Image(selectedImage);
  };
  const createBase64Image = (fileObject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const encodedImage = e.target.result.replace(/\s/g, "");
      setValues({ ...values, image: encodedImage });
    };
    reader.readAsDataURL(fileObject);
  };
  const sectionList = [
    {
      id: 1,
      name: "category",
      title: "Produkto kategorija:",
      option: productCategories,
    },
    {
      id: 2,
      name: "popular",
      title: "Produkto Populiarumas:",
      option: [
        {
          name: "Populiarus",
          value: true,
        },
        {
          name: "Nepopuliarus",
          value: false,
        },
      ],
    },
  ];
  const inputList = [
    {
      id: 1,
      name: "Prekės pavadinimas:",
      placeholder: "Pavadinimas",
      value: "name",
      type: "text",
    },
    {
      id: 2,
      name: "Kaina €:",
      placeholder: "Kaina",
      value: "price",
      type: "number",
    },
    {
      id: 3,
      name: "Vienetai:",
      placeholder: "Vienetai",
      value: "units",
      type: "number",
    },
    {
      id: 4,
      name: "Kiekis l:",
      placeholder: "0.5 l",
      value: "amount",
      type: "number",
    },
  ];

  const handleDeleteProduct = (id, productData) => {
    axios
      .delete("http://localhost:5000/products/" + id)
      .then((res) => {
        const deletedProduct = productData.filter((x) => x._id !== id);
        setProducts(deletedProduct);
        setResponse(res.data);
        setIsResponseModal(true);
      })
      .catch((error) => console.log(error));
  };
  const handleValidation = () => {
    let selectedCategoryName;
    if (!values.category) {
      resetValues();
    }
    if (values.category) {
      selectedCategoryName = productCategories.find(
        (prod) => prod.value === values.category
      ).name;
    }
    let isFormInvalid = false;
    const foundErrors = validateProducts(values, selectedCategoryName);
    setErrors(foundErrors);
    Object.keys(foundErrors).forEach((error) => {
      if (foundErrors[error] && !foundErrors[error].disabled) {
        isFormInvalid = true;
      }
      if (foundErrors[error]?.disabled) {
        setValues((prev) => ({ ...prev, [error]: "" }));
      }
    });
    if (isFormInvalid) {
      return false;
    }
    return true;
  };
  const handleAddProduct = () => {
    if (!handleValidation()) {
      return;
    }
    const product = { ...values, popular: values.popular | false };
    axios
      .post("http://localhost:5000/products", product)
      .then((res) => {
        const { id, message } = res.data;
        setProducts([{ ...values, _id: id }, ...products]);
        setResponse(message);
        handleClose();
        setIsResponseModal(true);
      })
      .catch((error) => console.log(error));
  };
  const resetValues = () => {
    setValues({
      _id: 0,
      name: "",
      description: "",
      price: "",
      image: "",
      units: "",
      amount: "",
      popular: "",
      category: "",
    });
  };
  const handleOpenWithValidation = () => {
    handleClose();
    handleValidation();
  };
  const handleClose = () => {
    isOpen && resetValues();
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/categories/names")
      .then((res) => {
        setProductCategories(res.data);
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
  const fetchAPIData = async (page, search) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/products?page=${page}&limit=15&search=${search}`
      );

      setPaginationNavigation(res.data.paginationNavigation);
      setPageCount(res.data.paginationNavigation.total.page);
      setProducts(res.data.results);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(handleValidation, [values.category]);
  const handleShowUpdateForm = (item) => {
    setValues({ ...item, category: item.categoryId || item.category });
    handleClose();
  };
  return (
    <>
      <div>
        <PageCovers cName={{ coverImg: "coverProducts" }}>Produktai</PageCovers>
        <ResponseModal
          onClose={() => setIsResponseModal(false)}
          open={isResponseModal}
          btnAction={() => setIsResponseModal(false)}
          bodyText={response}
        />
        <div className={classes.productsContainer}>
          <MobileNavigation />
          <Table
            handleDelete={handleDeleteProduct}
            handleAdd={handleOpenWithValidation}
            handleUpdate={handleShowUpdateForm}
            columnsData={productsColumnsData}
            data={products}
            fetchData={fetchData}
            pageCount={pageCount}
            loading={loading}
            paginationNavigation={paginationNavigation}
          ></Table>
          <Modal
            open={isOpen}
            onClose={handleClose}
            modalWidth={classes.modalWidth}
            title={
              values._id !== 0 ? "Atnaujinti produktą" : "Pridėti Produktą"
            }
            buttonText={values._id !== 0 ? "Atnaujinti" : "Pridėti prekę"}
            btnAction={
              values._id !== 0 ? handleUpdateProduct : handleAddProduct
            }
          >
            <AddProduct
              values={values}
              sectionList={sectionList}
              inputList={inputList}
              errors={errors}
              handleChange={handleChange}
              handleSelectedImg={handleSelectedImg}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
