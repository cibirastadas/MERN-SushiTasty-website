import React from "react";
import ReactDOM from "react-dom";
import classes from "./LoadingScreen.module.css";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({ loading }) => {
  return ReactDOM.createPortal(
    <div className={classes.loadingScreen}>
      <ClipLoader color="#76948F" loading={loading} size={100} />
    </div>,
    document.getElementById("loading")
  );
};

export default Loading;
