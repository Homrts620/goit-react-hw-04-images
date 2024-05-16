import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = props => {
    const { imgSrc, imgAlt, closeHandler, escHandler } = props;
    
    useEffect(() => {
            document.addEventListener("keydown", escHandler);
        return () => {
            document.removeEventListener("keydown", escHandler);
        }
    }, [escHandler]);

return( 
        <div onClick={ closeHandler } className={css.overlay}>
        <div className={css.modal}>
        <img src={imgSrc} alt={imgAlt} />
    </div>
    </div>
    );
};



Modal.propTypes = {
    imgSrc: PropTypes.string.isRequired,
	imgAlt: PropTypes.string.isRequired,
	closeHandler: PropTypes.func.isRequired,
	escHandler: PropTypes.func.isRequired,
}

export default Modal;