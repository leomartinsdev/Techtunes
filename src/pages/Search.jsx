import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    const { userName, onInputChange, searchValidation, searchBtnDisabled } = this.props;
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
            onChange={ onInputChange }
            value={ userName }
          />
          <button
            type="button"
            onClick={ searchValidation }
            disabled={ searchBtnDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  userName: PropTypes.string,
}.isRequired;
