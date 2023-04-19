import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { songsList } = this.props;
    console.log(songsList);
    return (
      <div>
        {songsList.map((element, index) => index > 0 && (
          <div key={ element.index }>
            <span>{element.trackName}</span>
            <audio data-testid="audio-component" src={ element.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songsList: PropTypes.any,
}.isRequired;
