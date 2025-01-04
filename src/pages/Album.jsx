import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    songsList: [],
    artistName: '',
    albumName: '',
    loading: false,
    favSongs: [],
  };

  async componentDidMount() {
    this.fetchAlbumSongs(); // roda a função de recuperar as músicas do álbum.
    this.recoverFavSongs(); // roda a função que recupera as músicas favoritas.
  }

  fetchAlbumSongs = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const fetchMusics = await getMusics(id);
    this.setState({
      songsList: fetchMusics.slice(1),
      artistName: fetchMusics[0].artistName,
      albumName: fetchMusics[0].collectionName,
    });
    return fetchMusics;
  };

  recoverFavSongs = async () => {
    this.setState({
      loading: true,
    });
    const favSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favSongs,
    });
  };

  render() {
    const { songsList, artistName, albumName, loading, favSongs } = this.state;
    return (
      <div data-testid="page-album">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Header />
            <span data-testid="artist-name">{artistName}</span>
            <br />
            <span data-testid="album-name">{albumName}</span>
            {songsList &&
              songsList.map((song) => (
                <MusicCard
                  key={song.trackId}
                  trackName={song.trackName}
                  previewUrl={song.previewUrl}
                  trackId={song.trackId}
                  allSongInfo={song}
                  favSongs={favSongs}
                />
              ))}
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.any,
  params: PropTypes.any,
  id: PropTypes.any,
}.isRequired;
