import axios from "axios";

const APIKEY = '42616833-896f8cea99ad334a7f66558d0';

export const fetchPhotos = async (query, page) => {

    const response = await axios.get(
`https://pixabay.com/api/?key=${APIKEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
); 
return {
    images: response.data.hits, 
    total: response.data.totalHits,
};
};
const Api = { fetchPhotos };

export default Api;