import React from "react";
import classes from "./Table.module.css";
export const productsColumnsData = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "_id",
    isSort: true,
  },
  {
    Header: "Pavadinimas",
    Footer: "Pavadinimas",
    accessor: "name",
    isSort: true,
  },
  {
    Header: "Aprasymas",
    Footer: "Aprasymas",
    accessor: "description",
    isSort: true,
    Cell: (description) => {
      return <span className={classes.description}>{description.value}</span>;
    },
  },
  {
    Header: "Kaina",
    Footer: "Aprasymas",
    accessor: "price",
    isSort: true,
  },
  {
    Header: "Vienetai",
    Footer: "Vienetai",
    accessor: "units",
    isSort: true,
  },
  {
    Header: "Kiekis",
    Footer: "Kiekis",
    accessor: "amount",
    isSort: true,
  },
  {
    Header: "Populiarus",
    accessor: "popular",
    Footer: "Populiarus",
    isSort: true,
  },
  {
    Header: "Nuotrauka",
    Footer: "Nuotrauka",
    isSort: false,
    accessor: "image",
    Cell: (tableData) => {
      return <img src={tableData.value} alt="Food" className="productImage" />;
    },
  },
];
