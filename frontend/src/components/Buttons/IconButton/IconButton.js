import React from "react";
import classes from "./IconButton.module.css";
const IconButton = ({
  action,
  children,
  Icon,
  shadow,
  widthFull,
  btnStyle,
}) => {
  return (
    <button
      className={`${classes.btnIcon} ${shadow ? classes.shadow : " "} ${
        widthFull ? classes.btnWidth : ""
      } ${btnStyle}`}
      onClick={action}
    >
      <span className={classes.icon}>{Icon}</span>
      {children}
    </button>
  );
};

export default IconButton;
