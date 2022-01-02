import React, { useState } from "react";
import classes from "./ViewOrderProducts.module.css";
import Modal from "../../../Modals/Modal/Modal";
import ProductDisplay from "../../../ProductDisplay/ProductDisplay";
import Button from "../../../Buttons/ToggleButton/ToggleButton";
import { deliveryType } from "../../../../data/deliveryType";
import { paymentMethod } from "../../../../data/paymentMethod";
const ViewOrderProducts = ({
  orderProduct,
  order,
  btnText,
  adminOrder,
  user,
}) => {
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const handleViewDetailsModal = () => {
    setOpenViewDetails((prev) => !prev);
  };
  return (
    <>
      <Button
        style={`${!adminOrder ? classes.viewDetailsBtn : ""}`}
        action={handleViewDetailsModal}
      >
        {btnText}
      </Button>
      <Modal
        open={openViewDetails}
        btnAction={handleViewDetailsModal}
        onClose={handleViewDetailsModal}
        modalWidth={classes.modalWidth}
        buttonText="Uždaryti"
        title={"Užsakymo detalės"}
      >
        <div className={classes.detailsBlock}>
          <div>
            <p>
              <span>Mokėjimo būdas:</span> {paymentMethod[order.paymentMethod]}
            </p>
            <p>
              <span>Pristatymo būdas: </span>
              {deliveryType[order.deliveryType]}
            </p>
            {!user && order.deliveryAddress.city && (
              <>
                <p>
                  <span>Pristatymo adresas: </span>
                  {order.deliveryAddress.city}, {order.deliveryAddress.street}
                </p>
                <p>
                  <span>Adreso papildoma informacija: </span>
                  {order.deliveryAddress.additionalInformation}
                </p>
                <p>
                  <span>Susisiekti </span>
                  {order.deliveryAddress.phoneNumber}
                </p>
              </>
            )}
          </div>
          <div className={classes.orderProductContainer}>
            {orderProduct.map((item) => {
              return (
                <ProductDisplay
                  data={item.product}
                  key={item._id}
                  view={true}
                  quantity={item.quantity}
                />
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewOrderProducts;
