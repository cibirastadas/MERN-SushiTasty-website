import React from "react";
import { BiTime } from "react-icons/bi";
import classes from "./ShopTime.module.css";
const ShopTime = ({ className }) => {
  return (
    <div className={`${classes.timeContainer} ${className}`}>
      <BiTime size={30} />
      <div>
        <p>Darbo laikas:</p>
        <p>I – V 10:00 – 21:00</p>
        <p>VI – VII 10:00 – 22:00</p>
      </div>
    </div>
  );
};

export default ShopTime;
