import React, { useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";
import { ordersColumnsData } from "../../../../components/Table/ordersColumnData";
import axios from "../../../../axios/axiosInstance";
import classes from "./AdminOrders.module.css";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
import PageCovers from "../../../../components/PageCovers/PageCovers";
import ResponseModal from "../../../../components/Modals/ResponseModal";
const AdminOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [response, setResponse] = useState("");
  const [isResponseModal, setIsResponseModal] = useState(false);
  const handleUpdateOrder = (e, orderId) => {
    const { value } = e.target;
    const newOrdersTrack = orders.map((track) => {
      if (track.order._id === orderId) {
        return { ...track, order: { ...track.order, trackOrder: value } };
      }
      return track;
    });
    axios
      .patch("http://localhost:5000/order/" + orderId, { value })
      .then((res) => {
        setOrders(newOrdersTrack);
        setResponse(res.data);
        setIsResponseModal(true);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/orderProducts")
      .then((resp) => {
        setOrders(resp.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {loading && <LoadingScreen loading={loading} />}
      <PageCovers cName={{ coverImg: "coverOrder" }}>Užsakymai</PageCovers>
      <div className={classes.adminOrderContainer}>
        <ResponseModal
          onClose={() => setIsResponseModal(false)}
          open={isResponseModal}
          btnAction={() => setIsResponseModal(false)}
          bodyText={response}
        />
        <Table
          adminOrder={true}
          columnsData={ordersColumnsData}
          data={orders}
          handleUpdateOrder={handleUpdateOrder}
        />
      </div>
    </>
  );
};

export default AdminOrders;
