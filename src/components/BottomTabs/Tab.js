import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./bottom-tabs.module.scss";
import { useTranslation } from "react-i18next";

const Tab = ({ icon, href, className, title, isActive }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button
      className={`${styles.tab} ${isActive ? styles.active : ""} ${className}`}
      onClick={(event) => {
        event.preventDefault();
        if (location.pathname === "/") {
          navigate(href);
          return;
        }
        navigate(href, { replace: true });
      }}
      disabled={isActive}
    >
      <img src={icon} alt="" />
      <span>{t(title)}</span>
    </button>
  );
};

Tab.propTypes = {
  icon: PropTypes.any,
  href: PropTypes.string.isRequired,
  className: PropTypes.any,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

Tab.defaultProps = {
  icon: null,
  href: "/",
  className: "",
  title: "",
  isActive: false,
};

export default Tab;
