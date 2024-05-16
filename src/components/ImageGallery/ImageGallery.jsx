import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, clickHandler }) => {
    useEffect(() => {
        if (images.length > 12) {
            window.scrollBy({ top:500, behavior: 'smooth'});
        }
    }, [images]);
    return (
        <ul className={css.gallery}>
        {images.map(image => (
        <ImageGalleryItem
            key={image.id}
            id = {image.id}
            src = {image.small} 
            alt = {image.alt}
            data-source = {image.large}
            onClick = {clickHandler}/>
    ))}
</ul>
);
};



ImageGalleryItem.propTypes = {
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
