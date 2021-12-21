import React from "react";
import classes from "./PageCovers.module.css";
const PageCovers = ({ cName, children, bottomText }) => {
  var res = children.split(" ");
  return (
    <>
      <div className={`${classes.cover} ${classes[cName.coverImg]}`}>
        <div className={classes.title}>
          <h1
            className={
              res[1]
                ? `${classes.lineFirst} ${classes.removeBorder}`
                : classes.lineFirst
            }
          >
            {res[0]}
          </h1>
          {res[1] && <h1 className={classes.lineSecond}>{res[1]}</h1>}
          {bottomText && <p className={classes.bottomText}>{bottomText}</p>}
        </div>
      </div>
    </>
  );
};

export default PageCovers;
