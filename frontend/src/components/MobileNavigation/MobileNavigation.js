import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { UserLinks } from "../UserLinksData/UserLinksData";
import classes from "./MobileNavigation.module.css";
const MobileNavigation = () => {
  const location = useLocation();
  const [userCookie] = useState(() => JSON.parse(Cookies.get("user")));
  return (
    <div className={classes.meniuNavigationContainer}>
      {UserLinks.map((item, index) => {
        if (userCookie && !item.roles.includes(userCookie.role)) {
          return false;
        }
        return (
          <Link
            key={index}
            className={`${classes.link} ${
              location.pathname === item.path ? classes.activeLink : ""
            }`}
            to={item.path}
          >
            <p>{item.title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileNavigation;
