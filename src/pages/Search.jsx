import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  state = {
    searchBtnDisabled: true,
    artistSearch: '',
    isLoading: false,
    artistResultView: false,
    artistHeaderName: '',
  };

  // async componentDidMount(artistSearch) {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const albumInfo = await this.handleSearchBtn(artistSearch);
  //   // this.setState({
  //   //   isLoading: false,
  //   // });
  //   console.log(albumInfo);
  // }

  // This function handles what happens when you click the Search button.
  handleSearchBtn = async (artistSearch) => {
    this.setState({
      isLoading: true,
      artistHeaderName: artistSearch, // Here artistHeaderName receives artistSearch value just before I set it back to blank.
      artistSearch: '',
    });
    const recoverAlbumInfo = await searchAlbumsAPI(artistSearch);
    this.setState({
      isLoading: false,
      artistResultView: true,
    });
    return console.log(recoverAlbumInfo);
  };

  // This validates that the Search button will be disabled unless you type 2 or more chars in the search bar.
  searchValidation = () => {
    const { artistSearch } = this.state;
    const artistVal = artistSearch.length >= 2;

    this.setState({
      searchBtnDisabled: !(artistVal),
    });
  };

  // Generic EventHandler function.
  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.searchValidation);
  };

  render() {
    const { searchBtnDisabled, artistSearch, isLoading, artistResultView,
      artistHeaderName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="artistSearch"
            id="artistSearch"
            type="text"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.onInputChange }
            value={ artistSearch }
          />
          <button
            type="button"
            onClick={ () => this.handleSearchBtn(artistSearch) }
            disabled={ searchBtnDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
        { artistResultView
          ? (
            <p>
              Resultado de álbuns de:
              {' '}
              {artistHeaderName}
            </p>
          )
          : '' }
        { isLoading
          ? (
            <div>
              <Loading />
            </div>)
          : '' }
      </div>
    );
  }
}

Search.propTypes = {
  userName: PropTypes.string,
}.isRequired;
