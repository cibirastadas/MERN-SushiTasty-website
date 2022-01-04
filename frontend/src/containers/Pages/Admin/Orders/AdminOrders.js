import React, { useCallback, useState, useRef } from "react";
import Table from "../../../../components/Table/Table";
import Cookies from "js-cookie";
import { ordersColumnsData } from "../../../../components/Table/ordersColumnData";
import axios from "../../../../axios/axiosInstance";
import classes from "./AdminOrders.module.css";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
import PageCovers from "../../../../components/PageCovers/PageCovers";
import { trackOrder } from "../../../../data/trackOrder";
import ResponseModal from "../../../../components/Modals/ResponseModal";
import { useHistory } from "react-router-dom";
import MobileNavigation from "../../../../components/MobileNavigation/MobileNavigation";

const AdminOrders = () => {
  const [userCookie] = useState(() => JSON.parse(Cookies.get("user")));
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [response, setResponse] = useState("");
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [paginationNavigation, setPaginationNavigation] = useState({});
  const fetchIdRef = useRef(0);
  const [pageCount, setPageCount] = useState(0);
  const history = useHistory();
  const handleUpdateOrder = (e, orderId) => {
    const { value } = e.target;
    let newOrdersArray = [];
    if (hideCompletedOrders(value)) {
      newOrdersArray = orders.filter((el) => el.order._id !== orderId);
    } else {
      newOrdersArray = orders.map((track) => {
        if (track.order._id === orderId) {
          return { ...track, order: { ...track.order, trackOrder: value } };
        }
        return track;
      });
    }
    axios
      .patch("http://localhost:5000/order/" + orderId, { value })
      .then((res) => {
        setOrders(newOrdersArray);
        setResponse(res.data);
        setIsResponseModal(true);
      })
      .catch((error) => console.log(error));
  };
  const hideCompletedOrders = (orderTrack) => {
    if (userCookie.role === "KitchenWorker") {
      return !["Ordered", "Preparing", "Prepared"].includes(orderTrack);
    }
    if (userCookie.role === "Courier") {
      return !["Prepared", "Delivery"].includes(orderTrack);
    }
    return false;
  };
  const fetchData = useCallback(
    (pageIndex, search = "") => {
      const fetchId = ++fetchIdRef.current;
      let ordersForRole = "";
      if (userCookie.role === "KitchenWorker") {
        ordersForRole = "/kitchenWorker";
      }
      if (userCookie.role === "Courier") {
        ordersForRole = "/courier";
      }
      if (fetchId === fetchIdRef.current) {
        fetchAPIData(pageIndex + 1, ordersForRole, search);
        history.replace({
          pathname: history.location.pathname,
          search: `?page=${pageIndex + 1}`,
        });
      }
    },
    [history, userCookie.role]
  );
  const fetchAPIData = async (page, ordersForRole, search) => {
    let findTrackorder = "";
    if (search) {
      findTrackorder = Object.keys(trackOrder).find((item) => {
        return trackOrder[item]
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      });
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/orderProducts${ordersForRole}/?page=${page}&limit=15&search=${findTrackorder}`
      );
      setPaginationNavigation(res.data.paginationNavigation);
      setPageCount(res.data.paginationNavigation.total.page);
      setOrders(res.data.results);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {loading && <LoadingScreen loading={loading} />}
      <div>
        <PageCovers cName={{ coverImg: "coverOrder" }}>Užsakymai</PageCovers>
        <div className={classes.adminOrderContainer}>
          <MobileNavigation />
          <ResponseModal
            onClose={() => setIsResponseModal(false)}
            open={isResponseModal}
            btnAction={() => setIsResponseModal(false)}
            bodyText={response}
          />
          <Table
            pageCount={pageCount}
            adminOrder={true}
            columnsData={ordersColumnsData}
            data={orders}
            userCookie={userCookie}
            fetchData={fetchData}
            handleUpdateOrder={handleUpdateOrder}
            paginationNavigation={paginationNavigation}
          />
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
