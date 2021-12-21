import React from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";
import classes from "./ResponseModal.module.css";
import { CSSTransition } from "react-transition-group";
import Button from "../Buttons/ToggleButton/ToggleButton";
const ResponseModal = ({
  btnAction,
  btnText = "Gerai",
  title = "Informacija",
  open,
  onClose,
  bodyText,
}) => {
  return ReactDOM.createPortal(
    <CSSTransition in={open} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div
        className={`${classes.overlay} ${open ? classes.show : " "} `}
        onClick={onClose}
      >
        <div
          className={classes.modalWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className={classes.modalHeader}>
              <h2 className={classes.modalTitle}>{title}</h2>
              <div className={classes.mdClose}>
                <MdClose onClick={onClose} />
              </div>
            </div>
          )}
          <div className={`${classes.modalContent} `}>
            <div className={`${classes.modalBody}`}>{bodyText}</div>
          </div>
          <div className={classes.modalFooter}>
            <div className={classes.stickyFooter}>
              <Button style={classes.modalButton} action={btnAction}>
                {btnText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("responseModal")
  );
};

export default ResponseModal;
