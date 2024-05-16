import { useEffect, useState } from 'react';
import Api from './Api';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import OnError from './OnError/OnError';


const App = () => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalPhotoURL, setModalPhotoURL] = useState(null);
	const [modalAlt, setModalAlt] = useState(null);

const updateQuery = ({ query }) => {
    setQuery(query);
};

const mapImages = fetchedImages => {
		const mappedImages = fetchedImages.map(image => ({
			id: image.id,
			small: image.webformatURL,
			large: image.largeImageURL,
			alt: image.tags,
		}));
		return mappedImages;
	};

const nextPage = () => {
		setPage(prevPage => prevPage + 1);
	};

const openModal = e => {
		setModalIsOpen(true);
		setModalPhotoURL(e.target.dataset['source']);
		setModalAlt(e.target.alt);
};

const closeModal = e => {
		if (e.target.nodeName !== "IMG") {
			setModalIsOpen(false);
		}
	};

const closeModalEsc = e => {
		if (e.key === "Escape") {
			setModalIsOpen(false);
		}
	};

useEffect(() => {
	if(!query) return;


	const fetchData = async () => {
		setLoading(true);
		try {
			const fetchedData = await Api.fetchPhotos(query, 1);
			const mappedImages = mapImages(fetchedData.images);
			const lastPage = Math.ceil(fetchedData.total / 12);
			setImages(mappedImages);
			setPage(1);
			setLastPage(lastPage);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
	}
};

	fetchData();
}, [query]);

	useEffect(() => {
		if (page!== 1) {
			const fetchData = async () => {
				setLoading(true);
				try {
					const fetchedData = await Api.fetchPhotos(query, page);
					const mappedImages = mapImages(fetchedData.images);
					setImages(prevImages => [...prevImages, ...mappedImages]);
				} catch (error) {
					console.log(error);
				} finally {
					setLoading(false);
			}
		};
		fetchData();
		}
	}, [page, query]);

		return (
			<>
				{modalIsOpen && (
					<Modal
						imgSrc={modalPhotoURL}
						imgAlt={modalAlt}
						closeHandler={closeModal}
						escHandler={closeModalEsc}
					></Modal>
				)}
				<SearchBar onSubmit={updateQuery} />
				<ImageGallery images={images} page={page} clickHandler={openModal} />
				{page !== lastPage && images.length > 0 && loading === false ? (
					<Button onClick={nextPage} />
				) : ('')}
				{loading && <Loader />}
				{images.length === 0 && query !== '' && loading === false && (
					<OnError>Nothing found! Try again</OnError>
				)}
			</>
		);
	};

export default App;