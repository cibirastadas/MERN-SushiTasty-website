import React, { useEffect, useState } from "react";
import axios from "../../../../axios/axiosInstance";
import classes from "./AdminProducts.module.css";
import PageCovers from "../../../../components/PageCovers/PageCovers";
import AddProduct from "../../../../components/Pages/Admin/Products/ProductForm/ProductForm";
import Table from "../../../../components/Table/Table";
import Modal from "../../../../components/Modals/Modal/Modal";
import { productsColumnsData } from "../../../../components/Table/productsColumnsData";
import { validateProducts } from "../../../../components/ValidateInfo/ValidateInfo";
import ResponseModal from "../../../../components/Modals/ResponseModal";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
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

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (value === "true" || value === "false") {
      value = JSON.parse(value);
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
    if (values.category) {
      selectedCategoryName = productCategories.find(
        (prod) => prod.value === values.category
      ).name;
    }
    if (!values.category) {
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
        setProducts([...products, { ...values, _id: id }]);
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
    setLoading(true);
    axios
      .get("http://localhost:5000/categories/names")
      .then((res) => {
        setProductCategories(res.data);
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(handleValidation, [values.category]);
  const handleShowUpdateForm = (item) => {
    setValues({ ...item, category: item.categoryId || item.category });
    handleClose();
  };
  return (
    <>
      {loading && <LoadingScreen loading={loading} />}
      <PageCovers cName={{ coverImg: "coverProducts" }}>Produktai</PageCovers>
      <ResponseModal
        onClose={() => setIsResponseModal(false)}
        open={isResponseModal}
        btnAction={() => setIsResponseModal(false)}
        bodyText={response}
      />
      <div className={classes.productsContainer}>
        <Table
          columnsData={productsColumnsData}
          data={products}
          handleDelete={handleDeleteProduct}
          handleAdd={handleOpenWithValidation}
          handleUpdate={handleShowUpdateForm}
        ></Table>
        <Modal
          open={isOpen}
          onClose={handleClose}
          modalWidth={classes.modalWidth}
          title="Pridėti produktą"
          buttonText={values._id !== 0 ? "Atnaujinti" : "Pridėti prekę"}
          btnAction={values._id !== 0 ? handleUpdateProduct : handleAddProduct}
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
    </>
  );
};

export default AdminProducts;
