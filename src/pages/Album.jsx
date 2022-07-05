import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Card from '../components/musicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      album: '',
      musicList: [],
    };
  }

  componentDidMount() {
    this.handleApiRequest();
  }

  handleApiRequest = async () => {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    this.setState({
      musicList: request,
      artist: request[0].artistName,
      album: request[0].collectionName,
    });
  }

  render() {
    const { musicList, artist, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h1 style={{ textAlign: 'center', color: 'white' }} data-testid="artist-name">{artist}</h1>
          <h2 style={{ textAlign: 'center', color: 'white' }} data-testtestid="album-name">{album}</h2>
        </section>

        {musicList.map((music, index) => (
          <div
            key={ music.trackId }
          >
            {index > 0 && (<Card
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
            />)}
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

};

export default Album;
