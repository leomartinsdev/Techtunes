import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    favoriteLoading: false,
    listOfFavoritedSongs: [],
    isFavorite: false,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  checkedValidation = (nomeDaMusicaAtual) => {
    const { listOfFavoritedSongs } = this.state;
    const check = listOfFavoritedSongs.includes(nomeDaMusicaAtual);
    this.setState({
      isFavorite: check,
    });
  };

  handleFavCheckbox = async (element) => {
    const nomeDaMusicaAtual = element.trackName;
    this.setState({
      favoriteLoading: true,

    });
    this.setState((prevState) => ({
      listOfFavoritedSongs: [...prevState.listOfFavoritedSongs, nomeDaMusicaAtual],
    }), this.checkedValidation(nomeDaMusicaAtual));

    const addToFavListAPI = await addSong(element);

    this.setState({
      favoriteLoading: false,
    });

    return addToFavListAPI;
  };

  render() {
    const { favoriteLoading, isFavorite } = this.state;
    const { songsList } = this.props;
    return (
      <div>
        { favoriteLoading
          ? <Loading />
          : (
            <div>
              {songsList.map((element, index) => index > 0 && (
                <div key={ element.trackName }>
                  <span key={ element.index }>{element.trackName}</span>
                  <audio
                    data-testid="audio-component"
                    src={ element.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <label key={ element.trackName } htmlFor="isFavorite">
                    Favorita
                    <input
                      key={ element.trackName }
                      type="checkbox"
                      name="isFavorite"
                      id="isFavorite"
                      onChange={ this.onInputChange }
                      checked={ isFavorite }
                      data-testid={ `checkbox-music-${element.trackId}` }
                      onClick={ () => this.handleFavCheckbox(element) }
                    />
                  </label>
                </div>
              ))}
            </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songsList: PropTypes.any,
}.isRequired;
