import React from "react";
import PropTypes from "prop-types";
import css from "./Button.module.css";

const Button = ({ onClick }) => {
    return(
        <div className={css.button}>
            <button onClick={onClick} className={css['load-more']}>
                Load more
            </button>
        </div>
    );
};
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default Button;