import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    favoriteLoading: false,
    listOfFavoritedSongs: [],
    checkedItems: {},
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  // checkedValidation = (nomeDaMusicaAtual) => {
  //   const { listOfFavoritedSongs } = this.state;
  //   return listOfFavoritedSongs
  // };

  handleFavCheckbox = async (element) => {
    const nomeDaMusicaAtual = element.trackName;
    this.setState({
      favoriteLoading: true,

    });

    const { checkedItems } = this.state;
    const isChecked = !checkedItems[element.trackId];
    const newCheckedItems = {
      ...checkedItems,
      [element.trackId]: isChecked,
    };
    this.setState({ checkedItems: newCheckedItems });

    if (isChecked) {
      this.setState((prevState) => ({
        listOfFavoritedSongs: [...prevState.listOfFavoritedSongs, nomeDaMusicaAtual],
      }));
      await addSong(element);
    } else {
      const { listOfFavoritedSongs } = this.state;
      const index = listOfFavoritedSongs.indexOf(nomeDaMusicaAtual);
      const newList = [
        ...listOfFavoritedSongs.slice(0, index),
        ...listOfFavoritedSongs.slice(index + 1),
      ];
      this.setState({ listOfFavoritedSongs: newList });
      await removeSong(element);
    }

    this.setState({
      favoriteLoading: false,
    });
  };

  //   this.setState((prevState) => ({
  //     listOfFavoritedSongs: [...prevState.listOfFavoritedSongs, nomeDaMusicaAtual],
  //   }), this.checkedValidation(nomeDaMusicaAtual));

  //   const addToFavListAPI = await addSong(element);

  //   this.setState({
  //     favoriteLoading: false,
  //   });

  //   return addToFavListAPI;
  // };

  render() {
    const { favoriteLoading, checkedItems } = this.state;
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
                      name={ `isFavorite-${element.trackId}` }
                      id={ `isFavorite-${element.trackId}` }
                      onChange={ this.onInputChange }
                      checked={ checkedItems[element.trackId] }
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
