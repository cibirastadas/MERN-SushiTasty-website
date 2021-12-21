import React from "react";
import classes from "./LoadingScreen.module.css";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({ loading }) => {
  return (
    <>
      <div className={classes.loadingScreen}>
        <ClipLoader color="#76948F" loading={loading} size={100} />
      </div>
    </>
  );
};

export default Loading;
