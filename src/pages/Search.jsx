import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    albumsList: [],
  };

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
      albumsList: recoverAlbumInfo,
    });
    return recoverAlbumInfo;
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
      artistHeaderName, albumsList } = this.state;
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
          && (
            <>
              <p>
                Resultado de álbuns de:
                {' '}
                {artistHeaderName}
              </p>
              <div>
                {albumsList.map((element) => (
                  <Link
                    key={ element.trackId }
                    to={ `/album/${element.collectionId}` }
                    data-testid={ `link-to-album-${element.collectionId}` }
                  >
                    <img
                      key={ element.trackId }
                      src={ element.artworkUrl100 }
                      alt={ element.artistName }
                    />
                    <p key={ element.trackId }>
                      { element.collectionName }
                    </p>
                    <p key={ element.trackId }>
                      { element.artistName }
                    </p>
                  </Link>))}
              </div>
            </>
          ) }

        { artistResultView && albumsList.length === 0 && 'Nenhum álbum foi encontrado' }

        { isLoading && <Loading /> }
      </div>
    );
  }
}

Search.propTypes = {
  userName: PropTypes.string,
}.isRequired;
