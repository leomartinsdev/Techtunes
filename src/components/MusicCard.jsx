import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    favoriteLoading: false,
  };

  // async componentDidUpdate() {
  //   console.log('Esperando update da API');
  //   const runHandleFavCheckbox = await this.handleFavCheckbox();
  //   console.log(runHandleFavCheckbox);
  //   console.log('Rodou a API');
  //   this.setState({
  //     favoriteLoading: false,
  //   });
  // }

  handleFavCheckbox = async (element) => {
    this.setState({
      favoriteLoading: true,
    });
    console.log(element);
    console.log('Mudou estado para loading');
    const addToFavListAPI = await addSong(element);
    console.log('rodou api');
    this.setState({
      favoriteLoading: false,
    });
    console.log('mudou estado para false loading');
    return addToFavListAPI;
  };

  render() {
    const { favoriteLoading } = this.state;
    const { songsList } = this.props;
    return (
      <div>
        { favoriteLoading
          ? <Loading />
          : (
            <div>
              {songsList.map((element, index) => index > 0 && (
                <div key={ element.index }>
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
                  <label key={ element.index } htmlFor="isFavorite">
                    Favorita
                    <input
                      key={ element.index }
                      type="checkbox"
                      name="isFavorite"
                      id="isFavorite"
                      data-testid={ `checkbox-music-${element.trackId}` }
                      onClick={ () => this.handleFavCheckbox(element) }
                    />
                  </label>
                </div>
              ))}
            </div>)}
      </div>
      // <div>
      //   {songsList.map((element, index) => index > 0 && (
      //     <div key={ element.index }>
      //       <span key={ element.index }>{element.trackName}</span>
      //       <audio data-testid="audio-component" src={ element.previewUrl } controls>
      //         <track kind="captions" />
      //         O seu navegador não suporta o elemento
      //         {' '}
      //         {' '}
      //         <code>audio</code>
      //         .
      //       </audio>
      //       <label key={ element.index } htmlFor="isFavorite">
      //         Favorita
      //         <input
      //           key={ element.index }
      //           type="checkbox"
      //           name="isFavorite"
      //           id="isFavorite"
      //           data-testid={ `checkbox-music-${element.trackId}` }
      //           onClick={ () => this.handleFavCheckbox(element) }
      //         />
      //       </label>
      //     </div>
      //   ))}
      // </div>
    );
  }
}

MusicCard.propTypes = {
  songsList: PropTypes.any,
}.isRequired;
