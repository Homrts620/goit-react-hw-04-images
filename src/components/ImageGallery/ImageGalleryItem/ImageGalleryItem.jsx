import React from "react";
import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ id, src, alt, data, clickHandler }) => {
    return(
        <li className={css["gallery-item"]}>
    <img 
    className={css["gallery-image"]}
    id = { id }
    src = { src } 
    alt = { alt }
    data-source = { data }
    onClick = { clickHandler } ></img>
</li>
    )
};


ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
}

export default ImageGalleryItem;