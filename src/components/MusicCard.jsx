import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    favoriteLoading: false,
    isFavorite: false,
  };

  componentDidMount() {
    const { favSongs, allSongInfo } = this.props;
    const favSongsIdsArr = favSongs.map(({ trackId }) => trackId); // aqui eu salvo os IDs das músicas favoritas
    if (favSongsIdsArr.includes(allSongInfo.trackId)) {
      // aqui eu verifico se o trackId da música atual está dentro do array de músicas favoritas
      this.setState({
        isFavorite: true, // se a condição acima for verdadeira, altera o checked para true.
      });
    }
  }

  handleFavCheckbox = async ({ target: { checked } }) => {
    const allSongInfo = this.props;

    this.setState({
      favoriteLoading: true,
      isFavorite: checked,
    });

    const addToFavListAPI = await addSong(allSongInfo);

    this.setState({
      favoriteLoading: false,
    });

    return addToFavListAPI;
  };

  render() {
    const { favoriteLoading, isFavorite } = this.state;
    const { previewUrl, trackName, trackId } = this.props;
    return (
      <div>
        {favoriteLoading ? (
          <Loading />
        ) : (
          <div>
            <span>{trackName}</span>
            <audio data-testid="audio-component" src={previewUrl} controls>
              <track kind="captions" />O seu navegador não suporta o elemento{' '}
              <code>audio</code>.
            </audio>
            <label htmlFor="isFavorite">
              Favorita
              <input
                type="checkbox"
                name={trackId}
                id={trackId}
                checked={isFavorite}
                data-testid={`checkbox-music-${trackId}`}
                onChange={this.handleFavCheckbox}
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songsList: PropTypes.any,
}.isRequired;
