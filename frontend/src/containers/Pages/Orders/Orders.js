import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../../../axios/axiosInstance";
import PageCovers from "../../../components/PageCovers/PageCovers";
import classes from "./Orders.module.css";
import { trackOrder } from "../../../data/trackOrder";
import { dateToLocaleString } from "../../../helpers/dateToLocalString";
import ViewOrderProducts from "../../../components/Pages/Orders/ViewOrderProducts/ViewOrderProducts";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
const Orders = () => {
  const [userCookie] = useState(() => JSON.parse(Cookies.get("user")));
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/orderProducts/" + userCookie.id)
      .then((resp) => {
        setUserOrders(resp.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [userCookie.id]);

  return (
    <>
      {loading && <LoadingScreen loading={loading} />}
      <PageCovers cName={{ coverImg: "coverOrder" }}>Užsakymai</PageCovers>
      <div className={classes.orderContainer}>
        {userOrders.length !== 0 &&
          userOrders.map((item) => {
            return (
              <div key={item.order._id} className={classes.orderBlock}>
                <div className={classes.orderDetails}>
                  <div className={classes.orderDetailsParent}>
                    <p className={classes.orderNr}>
                      <span>Nr. </span>
                      {item.order._id}
                    </p>
                    <div className={classes.detailsBlock}>
                      <div className={`${classes.detailsWrapper} `}>
                        <p>
                          <span>Užsakymo data: </span>
                          {dateToLocaleString(item.order.createdAt)}
                        </p>

                        {item.order.deliveryAddress && (
                          <p>
                            <span>Pristatymui:</span>{" "}
                            {item.order.deliveryAddress.city},{" "}
                            {item.order.deliveryAddress.street}{" "}
                          </p>
                        )}
                      </div>
                      <div
                        className={`${classes.detailsWrapper} ${classes.orderStateWrapper}`}
                      >
                        {item.order.trackOrder && (
                          <p>
                            <span>Užsakymo būsena:</span>{" "}
                            {trackOrder[item.order.trackOrder]}
                          </p>
                        )}
                        {item.order.timeToMake && (
                          <p>
                            <span>Pagaminimo laikas:</span>{" "}
                            {dateToLocaleString(item.order.timeToMake)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={classes.productBlock}>
                    {item.orderProducts.map((ordProd, index) => {
                      if (index > 2) {
                        return false;
                      }
                      return (
                        <div
                          className={`${classes.productImages} ${
                            index % 2 === 1 ? classes.spaceBetween : ""
                          }`}
                          key={ordProd._id}
                        >
                          <img src={ordProd.product.image} alt="produktas" />
                          {item.orderProducts.length > 3 && index === 2 && (
                            <div className={classes.imgOverlay}>
                              <span className={classes.quantity}>
                                +{item.orderProducts.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr />
                <div className={classes.viewDetails}>
                  <p className={classes.total}>
                    <span>Iš viso:</span> {item.order.total}€
                  </p>
                  <ViewOrderProducts
                    btnText="Perziurėti detales"
                    user={true}
                    order={item.order}
                    orderProduct={item.orderProducts}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Orders;
