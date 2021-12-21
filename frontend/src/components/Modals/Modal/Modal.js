import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { MdClose } from "react-icons/md";
import Button from "../../Buttons/ToggleButton/ToggleButton";
import { CSSTransition } from "react-transition-group";
const Modal = ({
  children,
  open,
  onClose,
  title,
  modalWidth,
  buttonText,
  btnAction,
}) => {
  useEffect(() => {
    const closeOnEscapeDown = (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    };
    document.body.addEventListener("keydown", closeOnEscapeDown);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeDown);
    };
  }, [onClose]);
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
          <div
            className={`${classes.modal} ${
              buttonText ? classes.contentPadding : ""
            }`}
          >
            <div
              className={`${classes.innerModal} ${
                modalWidth ? modalWidth : ""
              } `}
            >
              <div className={classes.mdClose}>
                <MdClose onClick={onClose} />
              </div>
              <div className={`${classes.modalContent} `}>
                {title && (
                  <div className={classes.modalHeader}>
                    <h2 className={classes.modalTitle}>{title}</h2>
                  </div>
                )}
                <div className={`${classes.modalBody}`}>{children}</div>
              </div>
            </div>
            {buttonText && (
              <div className={classes.modalFooter}>
                <div className={` ${classes.stickyFooter}`}>
                  <Button style={classes.modalButton} action={btnAction}>
                    {buttonText}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("modal")
  );
};

export default Modal;
