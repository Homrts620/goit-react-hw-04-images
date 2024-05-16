import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";

class ImageGallery extends Component {
    componentDidUpgrade(prevProps) {
        if(this.props.page !== 1 && this.props.images.length !== prevProps.images.length) {
            window.scrollBy({ top: 500, behavior:"smooth" });
        }
    }

    render() {
        const { images, clickHandler } =this.props;
        return (
            <ul className={css.gallery}>
            { images.map((image) => {
                return (
                    <ImageGalleryItem
                        key={ image.id }
                        id = { image.id }
                        src = { image.small } 
                        alt = { image.alt }
                        data = { image.large }
                        clickHandler = { clickHandler } 
                    ></ImageGalleryItem>
                );
            })
            }
            </ul>
        );
    }
}

ImageGallery.propTypes = {
    page: PropTypes.number.isRequired,
    clickHandler: PropTypes.func.isRequired,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			small: PropTypes.string.isRequired,
			alt: PropTypes.string.isRequired,
            large: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
};

export default ImageGallery;
