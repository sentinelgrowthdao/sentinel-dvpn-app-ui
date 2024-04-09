import React from "react";
import types, { MODAL_VARIANTS } from "./modal-types";
import styles from "./modal.module.scss";
import { useDispatch } from "react-redux";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import { useLocation, useNavigate } from "react-router-dom";

const Modal = ({ show, type, variant = MODAL_VARIANTS.PRIMARY, ...rest }) => {
  const Component = types[type];
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!show && location.state?.showModal && location.state?.type) {
      navigate(-1, { replace: true });
    }
  }, [show, navigate, location]);

  if (show && location.state?.showModal && location.state?.type) {
    return (
      <div className={styles[variant]}>
        <div
          className={styles[`${variant}-modal-backdrop`]}
          onClick={() => {
            dispatch(CHANGE_MODAL_STATE({ show: false, type: null }));
          }}
        />

        <div className={styles[`${variant}-container`]}>
          <Component {...rest} />
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
