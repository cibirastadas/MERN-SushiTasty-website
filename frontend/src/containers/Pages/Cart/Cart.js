import React, { useState, useEffect } from "react";
import PageCovers from "../../../components/PageCovers/PageCovers";
import classes from "./Cart.module.css";
import Cookies from "js-cookie";
import axios from "../../../axios/axiosInstance";
import ProductDisplay from "../../../components/ProductDisplay/ProductDisplay";
import Button from "../../../components/Buttons/ToggleButton/ToggleButton";
import Modal from "../../../components/Modals/Modal/Modal";
import OrderPaymentForm from "../../../components/Pages/Cart/OrderPayment";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import { addressInputList, addressRadioList } from "../../../data/addressData";
import {
  validateOrderPayment,
  validateAddress,
} from "../../../components/ValidateInfo/ValidateInfo";
import ResponseModal from "../../../components/Modals/ResponseModal";
const Cart = () => {
  const [items, setItems] = useState(() => {
    const currentCart = JSON.parse(localStorage.getItem("items"));
    return currentCart ? currentCart : 0;
  });
  const currentDate = new Date();
  const [values, setValues] = useState({
    deliveryType: "DeliveryHome",
    timeToMake: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ),
    address: {
      phoneNumber: "",
      city: "",
      street: "",
      additionalInformation: "",
      addressType: "",
    },
    paymentMethod: "PayLocally",
    deliveryAddressId: "",
  });
  const [userAddresses, setUserAddresses] = useState([]);
  const [allOrderEnums, setAllOrderEnums] = useState([]);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [response, setResponse] = useState("");
  const [userCookie] = useState(() => JSON.parse(Cookies.get("user")));
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const orderComponents = [
    "OrderDeliveryForm",
    "OrderAddressForm",
    "OrderTimeToMake",
    "PaymentMethodForm",
  ];
  const orderInputs = {
    DeliveryHome: "Pristatymas",
    TakeAwayHome: "Atsiimti pačiam",
    EatInside: "Valgyti restorane",
  };
  useEffect(() => {
    if (didLoad || !items) {
      return;
    }
    setLoading(true);
    const selectedProdId = items.selectedProd.map((item) => item.id);
    (async () => {
      try {
        await axios
          .post(
            "http://localhost:5000/products/selected-products",
            selectedProdId
          )
          .then((resp) => {
            setSelectedProducts(resp.data);
          })
          .catch((error) => console.log(error));
        await axios
          .get("http://localhost:5000/order/all-order-enums")
          .then((resp) => {
            setAllOrderEnums(resp.data);
          })
          .catch((error) => console.log(error));
        await axios
          .get("http://localhost:5000/addresses/" + userCookie.id)
          .then((resp) => {
            if (!resp.data.length) {
              return;
            }
            setUserAddresses(resp.data);
            setLoading(false);
          })
          .catch((error) => console.log(error));
      } catch (err) {
        console.log(err);
      }
    })();
    setDidLoad(true);
  }, [items, didLoad, userCookie.id, values]);
  useEffect(() => {
    if (items.count === 0) {
      localStorage.removeItem("items");
      setItems(0);
      return;
    }
    localStorage.setItem("items", JSON.stringify(items));
    window.dispatchEvent(new Event("storage"));
  }, [items, userCookie.id]);
  const resetAddressValues = () => {
    setValues({
      ...values,
      address: {
        phoneNumber: "",
        city: "",
        street: "",
        additionalInformation: "",
        addressType: "",
      },
    });
    setErrors({});
  };
  const handleCloseModal = () => {
    setIsOpen((prev) => !prev);
  };
  const handleCloseResponseModal = () => {
    setIsResponseModal((prev) => !prev);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleChangeTime = (time) => {
    setValues({ ...values, timeToMake: time });
  };
  const handleChangeAddress = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, address: { ...values.address, [name]: value } });
  };
  const handleCreateOrder = () => {
    const orderProducts = items.selectedProd.map((item) => {
      const product = selectedProducts.find((prod) => prod._id === item.id);
      return {
        quantity: item.quantity,
        price: product.price,
        product: product,
      };
    });
    const findAddress = userAddresses.find(
      (address) => address._id === values.deliveryAddressId
    );
    const orderValues = {
      ...values,
      deliveryAddress:
        values.deliveryType !== "DeliveryHome" ? "" : findAddress,
      total: items.total,
      userId: userCookie.id,
      orderProducts,
    };
    axios
      .post("http://localhost:5000/order", orderValues)
      .then((response) => {
        if ((response.status = 200)) {
          setResponse(response.data);
          setIsOpen(false);
          setIsResponseModal(true);
          setItems(0);
        }
      })
      .catch((error) => console.log(error));
  };
  const handleConfirmOrder = () => {
    const foundErrors = validateOrderPayment(values);
    if (Object.keys(foundErrors).length !== 0) {
      setErrors(foundErrors);
      return;
    }
    handleCreateOrder();
  };
  const handleDeleteAll = (product) => {
    const selectedProduct = items.selectedProd.find(
      (item) => product._id === item.id
    );
    const newProducts = items.selectedProd.filter(
      (item) => product._id !== item.id
    );
    if (!newProducts.length) {
      setItems(0);
    }
    setItems({
      ...items,
      count: items.count - selectedProduct.quantity,
      total: items.total - product.price * selectedProduct.quantity,
      selectedProd: newProducts,
    });
  };
  const handleAddProduct = (product) => {
    const newProducts = items.selectedProd.map((item) => {
      if (item.id === product._id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setItems({
      ...items,
      count: items.count + 1,
      total: items.total + product.price,
      selectedProd: newProducts,
    });
  };
  const handleDeleteProduct = (product) => {
    const selectedProduct = items.selectedProd.find(
      (item) => product._id === item.id
    );
    if (items.count === 1) {
      setItems(0);
      return;
    }
    let newProducts = [];
    if (selectedProduct.quantity === 1) {
      newProducts = items.selectedProd.filter(
        (item) => item.id !== selectedProduct.id
      );
    } else {
      newProducts = items.selectedProd.map((item) => {
        if (item.id === selectedProduct.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    }
    setItems({
      ...items,
      count: items.count - 1,
      total: items.total - product.price,
      selectedProd: newProducts,
    });
  };
  const handleAddAddress = () => {
    const foundErrors = validateAddress(values.address);
    if (Object.keys(foundErrors).length !== 0) {
      setErrors(foundErrors);
      return;
    }
    axios
      .post("http://localhost:5000/addresses", {
        ...values.address,
        userId: userCookie.id,
      })
      .then((resp) => {
        setUserAddresses([...userAddresses, resp.data.address]);
        resetAddressValues();
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (!userAddresses.length) {
      return;
    }
    const lastAddressId = userAddresses[userAddresses.length - 1]._id;
    setValues((v) => {
      return {
        ...v,
        address: {
          phoneNumber: "",
          city: "",
          street: "",
          additionalInformation: "",
          addressType: "",
        },
        deliveryAddressId: lastAddressId,
      };
    });
  }, [userAddresses]);

  return (
    <>
      {loading && !selectedProducts.length ? (
        <LoadingScreen loading={loading} />
      ) : (
        <div>
          <PageCovers
            cName={{ coverImg: "coverProducts" }}
            bottomText={userCookie.name}
          >
            Krepšelis
          </PageCovers>
          <ResponseModal
            onClose={handleCloseResponseModal}
            open={isResponseModal}
            btnAction={handleCloseResponseModal}
            bodyText={response}
          />
          {!items ? (
            <>
              <p className={classes.cartEmpty}>Krepšelis tuščias</p>
            </>
          ) : (
            <div className={classes.cartContainer}>
              <Modal
                open={isOpen}
                btnAction={handleConfirmOrder}
                onClose={handleCloseModal}
                modalWidth={classes.modalWidth}
                buttonText="Apmokėti"
                btnType="submit"
                title={"Užsakymo Duomenys"}
              >
                <div className={classes.orderForms}>
                  {orderComponents.map((component, index) => {
                    if (
                      values.deliveryType !== "DeliveryHome" &&
                      component === "OrderAddressForm"
                    ) {
                      return false;
                    }
                    return (
                      <OrderPaymentForm
                        userAddresses={userAddresses}
                        addressRadioList={addressRadioList}
                        errors={errors}
                        handleChange={handleChange}
                        orderInputs={orderInputs}
                        component={component}
                        key={index}
                        allOrderEnums={allOrderEnums}
                        addressInputList={addressInputList}
                        values={values}
                        handleChangeTime={handleChangeTime}
                        handleChangeAddress={handleChangeAddress}
                        handleAddAddress={handleAddAddress}
                        resetAddressValues={resetAddressValues}
                      />
                    );
                  })}
                </div>
              </Modal>
              <div className={classes.productContainer}>
                {items &&
                  selectedProducts.map((item) => {
                    const selectedProd = items.selectedProd.find(
                      (prod) => prod.id === item._id
                    );
                    if (!selectedProd) {
                      return false;
                    }
                    return (
                      <ProductDisplay
                        key={item._id}
                        data={item}
                        cart={true}
                        quantity={selectedProd.quantity}
                        handleDeleteProduct={handleDeleteProduct}
                        handleAddProduct={handleAddProduct}
                        handleDeleteAll={handleDeleteAll}
                      />
                    );
                  })}
              </div>
              <div className={classes.orderBlock}>
                <p className={classes.total}>Iš viso : {items.total}€</p>
                <p className={classes.count}>Prekių kiekis: {items.count}</p>
                <Button action={handleCloseModal}>Užsisakyti</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
