import React from "react";
import Button from "../../../Buttons/ToggleButton/ToggleButton";
import classes from "./HomeAbout.module.css";
const HomeAbout = () => {
  return (
    <div className={classes.HomeAboutCover}>
      <div className={classes.description}>
        <h2 className={classes.title}>Šviežias maistas Jums!</h2>
        <p className={classes.aboutUs}>
          SushiTasty - japoniško maisto restoranas. Vieta kur galima paragauti
          aukščiausio lygio patiekalų
        </p>
        <div>
          <p className={classes.aboutMore}>Plačiau apie mus skaitykite</p>
          <Button linkTo="/about" cName={{ btnColor: "btnBlack" }}>
            Apie mus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
