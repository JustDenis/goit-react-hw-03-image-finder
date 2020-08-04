import axios from 'axios';

const fetchImagesWithQuery = (searchQuery, page = 1) => {
  return axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${1}&key=11268845-1c4357a74a39c17587b597947&image_type=photo&orientation=horizontal&per_page=`,
  ).then(response => response.data.hits);
};

export default {fetchImagesWithQuery};
