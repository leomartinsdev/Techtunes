import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    songsList: [],
    artistName: '',
    albumName: '',
  };

  async componentDidMount(id) {
    const listOfMusics = await this.fetchAlbumSongs(id);
    this.setState({
      songsList: listOfMusics,
      artistName: listOfMusics[0].artistName,
      albumName: listOfMusics[0].collectionName,
    });
  }

  fetchAlbumSongs = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const fetchMusics = await getMusics(id);
    return fetchMusics;
  };

  render() {
    const { songsList, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <span data-testid="artist-name">{artistName}</span>
        <br />
        <span data-testid="album-name">{ albumName }</span>
        <MusicCard songsList={ songsList } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.any,
  params: PropTypes.any,
  id: PropTypes.any,
}.isRequired;
