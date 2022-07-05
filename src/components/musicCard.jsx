import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './musicCard.css';

export default class Card extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
      favorits: [],
    };
  }

  componentDidMount() {
    this.getFavoritSongs();
  }

  // logica do checked entendida a partir de codeReview do repositorio "https://github.com/tryber/sd-020-a-project-trybetunes/pull/143/commits/1b02c897a23a6c8146723bbea6cb7045db573f0c"; entendi a lógica e fiz algumas alterações de posicionamento na hora de renderizar o componente (<Loading />);

  handleFavoriteSong = async () => {
    const { checked } = this.state;
    if (checked === false) {
      this.setState({
        loading: true,
        checked: true,
      });
      await addSong(this.props);
    } else {
      this.setState({
        loading: true,
        checked: false,
      });
      await removeSong(this.props);
    }
    this.setState({
      loading: false,
    });
  }

  getFavoritSongs = async () => {
    const request = await getFavoriteSongs();
    this.setState({ favorits: request });
    const { favorits } = this.state;
    const { trackId } = this.props;
    const favortiElements = favorits.some((element) => element.trackId === trackId);
    if (favortiElements) {
      this.setState({
        checked: true,
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
      <section className="card-section">
        <section className='card1'>
        <div className='card2'>
        <h3 className='cardTitle' style={{ textAlign: 'center', color: 'white' }}>
          {trackName}
        </h3>
        <audio className='audio' data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {loading ? (<Loading />)
          : (
            <label className='labelCard' style={{ textAlign: 'center', color: 'white' }} htmlFor="checkboxLabel">
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                onChange={ this.handleFavoriteSong }
                checked={ checked }
              />
            </label>
          )}
        </div>
      </section>

      </section>
          );
  }
}

Card.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;
