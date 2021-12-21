import React from "react";
import { deliveryType } from "../../data/deliveryType";
import { dateToLocaleString } from "../../helpers/dateToLocalString";
import classes from "./Table.module.css";

export const ordersColumnsData = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "order._id",
    isSort: true,
  },
  {
    Header: "Užsakymo būsena",
    Footer: "Užsakymo būsena",
    accessor: "order.trackOrder",
    selection: true,
    isSort: true,
  },
  {
    Header: "Užsakymo data",
    Footer: "Užsakymo data",
    accessor: "order.createdAt",
    isSort: true,
    Cell: (tableData) => {
      return dateToLocaleString(tableData.value);
    },
  },
  {
    Header: "Pagaminimo laikas",
    Footer: "Pagaminimo laikas",
    accessor: "order.timeToMake",
    isSort: true,
    Cell: (tableData) => {
      return dateToLocaleString(tableData.value);
    },
  },
  {
    Header: "Pristatymo būdas",
    Footer: "Pristatymo būdas",
    accessor: "order.deliveryType",
    isSort: true,
    Cell: (tableData) => {
      return deliveryType[tableData.value];
    },
  },
  {
    Header: "Suma",
    accessor: "order.total",
    Footer: "Suma",
    isSort: true,
  },
  {
    Header: "Nuotrauka",
    Footer: "Nuotrauka",
    isSort: false,
    accessor: "orderProducts",
    Cell: (tableData) => {
      const productLength = tableData.value.length;
      return (
        <div className={classes.productImages}>
          <img src={tableData.value[0].product.image} alt="Maistas" />
          {productLength > 1 && (
            <div className={classes.imgOverlay}>
              <span className={classes.productCount}>+{productLength}</span>
            </div>
          )}
        </div>
      );
    },
  },
];
