import React, { useState } from "react";
import classes from "./ProductDisplay.module.css";
import Button from "../Buttons/ToggleButton/ToggleButton";
import Cookies from "js-cookie";
import { BiPlus, BiMinus } from "react-icons/bi";
const ProductDisplay = ({
  data,
  cart,
  quantity,
  handleDeleteProduct,
  handleAddProduct,
  handleDeleteAll,
  handleOpenResponseModal,
  view,
}) => {
  const [show, showSet] = useState(false);
  const checkValues = () => {
    if (data.units) {
      return <p>Vienetai: {data.units}</p>;
    } else if (data.amount) {
      return <p>Turis: {data.amount}l</p>;
    }
  };
  const [userCookie] = useState(() => {
    if (Cookies.get("user")) {
      return JSON.parse(Cookies.get("user"));
    }
    return false;
  });
  const onMouseEnter = () => showSet(true);

  const onMouseLeave = () => showSet(false);

  const handleAddToCart = (item) => {
    if (!userCookie) {
      handleOpenResponseModal();
      return;
    }
    const selectedItems = JSON.parse(localStorage.getItem("items"));
    if (selectedItems) {
      const existProd = selectedItems.selectedProd.find(
        (prod) => prod.id === item._id
      );
      if (existProd) {
        const updateProd = selectedItems.selectedProd.map((a) =>
          a.id === item._id ? { ...a, quantity: a.quantity + 1 } : a
        );
        localStorage.setItem(
          "items",
          JSON.stringify({
            count: selectedItems.count + 1,
            total: selectedItems.total + item.price,
            selectedProd: [...updateProd],
          })
        );
      } else {
        localStorage.setItem(
          "items",
          JSON.stringify({
            ...selectedItems,
            count: selectedItems.count + 1,
            total: selectedItems.total + item.price,
            selectedProd: [
              ...selectedItems.selectedProd,
              { id: item._id, quantity: 1 },
            ],
          })
        );
      }
    } else {
      localStorage.setItem(
        "items",
        JSON.stringify({
          count: 1,
          total: item.price,
          selectedProd: [
            {
              id: item._id,
              quantity: 1,
            },
          ],
        })
      );
    }
    window.dispatchEvent(new Event("storage"));
  };
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classes.productContainer}
    >
      {data.popular && <p className={classes.mostPopular}>Perkamiausia</p>}
      <div className={classes.imgContainer}>
        <img src={data.image} alt="Food" />
      </div>
      <p className={classes.title}>{data.name}</p>
      <div className={classes.productText}>
        {checkValues()}
        <p className={`${classes.price} ${view ? classes.noMargin : ""}`}>
          Kaina: {data.price}€
        </p>
        {view && <p className={classes.quantity}>Kiekis: {quantity}</p>}
        {!cart && !view ? (
          <>
            <Button action={handleAddToCart} item={data}>
              Į KREPŠELĮ
            </Button>
          </>
        ) : (
          <>
            {!view && (
              <div className={classes.cartButtons}>
                <div className={classes.plusMinusButtons}>
                  <Button action={handleDeleteProduct} item={data}>
                    <BiMinus size={17} />
                  </Button>
                  <span>{quantity}</span>
                  <Button action={handleAddProduct} item={data}>
                    <BiPlus size={17} />
                  </Button>
                </div>
                <Button
                  action={handleDeleteAll}
                  item={data}
                  style={classes.deleteFull}
                >
                  Pašalinti
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <div
        className={
          show
            ? `${classes.descriptionBlock} ${classes.descriptionHeight}`
            : classes.descriptionBlock
        }
      >
        <p className={classes.descriptionTitle}>Aprašymas</p>
        <p className={classes.descriptionText}>{data.description}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
