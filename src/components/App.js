import React, { Component } from 'react';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import styled from 'styled-components';
import imagesApi from '../services/imagesApi';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export default class App extends Component {
  state = {
    images: [],
    loading: false,
    page: 1,
    searchQuery: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQjery = this.state.searchQuery;

    if (prevQuery !== nextQjery) {
      this.setState({ images: [], page: 1 });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({loading: true});

    imagesApi.fetchImagesWithQuery(searchQuery, page).then(images =>
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        page: prevState.page + 1,
      })),
    ).finally(() => this.setState({loading: false}));
  };

  handleSearchQuery = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { images, loading } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchQuery} />
        {images.length > 0 && <ImageGallery images={images} />}
        {loading && <Loader/>}
      </Container>
    );
  }
}
