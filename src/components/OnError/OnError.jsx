import React from "react";
import PropTypes from "prop-types";
import css from "./OnError.module.css";

const OnError = ({ children }) => {
    return <div className={css.wrapper}>
    {children}
    </div>
};

OnError.propTypes = {
    children: PropTypes.node.isRequired,
}

export default OnError;