import React, { Component } from "react";
import Api from "./Api";
import "./App.css";
import Searchbar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader";
import OnError from "./OnError/OnError";


class App extends Component {
	state = {
		images: [],
		isLoading: false,
		error: null,
		query: "",
		actualPage: 1,
		lastPage: 1,
		modalIsOpen: false,
	};

  updateQuery = ({ query }) => {
    this.setState({  query: query });
  };

  modalInfo = {
    modalPhotoURL: null,
    modalAlt: null,
  };

	mapNewImages = (fetchedImages) => {
		const mapedImages = fetchedImages.map((image) => ({
			id: image.id,
			small: image.webformatURL,
			large: image.largeImageURL,
			alt: image.tags,
		}));
		return mapedImages;
	};

	goToNextPage = () => {
		let { actualPage } = this.state;
		actualPage++;
		this.setState({ actualPage: actualPage });
	};

	openModal = (e) => {
		this.setState({
			modalIsOpen: true,
		});

		this.modalInfo = {
			modalPhotoURL: e.target.dataset["source"],
			modalAlt: e.target.alt,
		};
	};

	closeModal = (e) => {
		if (e.target.nodeName !== "IMG") {
			this.setState({
				modalIsOpen: false,
			});
		}
	};

	closeModalWithButton = (e) => {
		if (e.key === "Escape") {
			this.setState({
				modalIsOpen: false,
			});
		}
	};

  async componentDidUpdate(prevProps, prevState) {
    const { query, actualPage, images } = this.state;
  
    if (this.state.page !== prevState.page || this.state.query !== prevState.query) {
      this.setState({ isLoading: true });
      try {
        const fetchedData = await Api.fetchPhotos(query, 1);
        const mapedImages = this.mapNewImages(fetchedData.images);
        const lastPage = Math.ceil(fetchedData.total / 12);
        this.setState({ images: mapedImages, actualPage: 1, lastPage });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    } else if (prevState.actualPage !== actualPage && actualPage !== 1) {
      this.setState({ isLoading: true });
      try {
        const fetchedData = await Api.fetchPhotos(query, actualPage);
        const mapedImages = await this.mapNewImages(fetchedData.images);
        const concatImages = images.concat(mapedImages);
        this.setState({ images: concatImages });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

	render() {
		const { images, actualPage, lastPage, isLoading, modalIsOpen, query } = this.state;
		const { modalPhotoURL, modalAlt } = this.modalInfo;

		return (
			<>
				{modalIsOpen && (
					<Modal
						imgSrc={modalPhotoURL}
						imgAlt={modalAlt}
						closeHandler={this.closeModal}
						escHandler={this.closeModalWithButton}
					></Modal>
				)}
				<Searchbar onSubmit={this.updateQuery} />
				<ImageGallery
					images={images}
					page={actualPage}
					clickHandler={this.openModal}
				></ImageGallery>
				{actualPage !== lastPage && images.length > 0 && !isLoading ? (
					<Button onClick={this.goToNextPage} />
				) : null}
				{isLoading && <Loader />}
				{images.length === 0 && query && !isLoading && <OnError>Nothing found! Try again</OnError>}
			</>
		);
	}
}

export default App;