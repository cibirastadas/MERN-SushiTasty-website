import React from "react";
import classes from "./HomeMeniu.module.css";
import { MenuItems } from "../../../NavBar/navLinksData";
import HomeProduct from "../HomeProduct/HomeProduct";
import SectionTitle from "../../../SectionTitle/SectionTitle";

const HomeMeniu = () => {
  const products = MenuItems.map((product, index) => (
    <HomeProduct key={index} product={product} />
  ));

  return (
    <div id="meniu">
      <SectionTitle>Pas mus rasite</SectionTitle>
      <div className={classes.products}>{products}</div>
    </div>
  );
};

export default HomeMeniu;
