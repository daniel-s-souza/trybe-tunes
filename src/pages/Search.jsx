import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsApi from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      artista: '',
      isDisabled: true,
      loading: false,
      albums: [],
      frase: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.validate();
    });
  }

  handleFrase = () => {
    const { albums, artista } = this.state;

    if (albums.length > 0) {
      this.setState({
        frase: `Resultado de álbuns de: ${artista}`,
      });
    }
    if (artista.length === 0) {
      this.setState({
        frase: '',
      });
    }
    if (albums.length === 0) {
      this.setState({
        frase: 'Nenhum álbum foi encontrado',
      });
    }
  }

  async handleSearch() {
    const { name } = this.state;
    this.setState({ loading: true });
    const albumsResponse = await searchAlbumsApi(name);
    this.setState({
      loading: false,
      albums: albumsResponse,
    }, () => this.setState({
      artista: name,
      name: '',
    }));
    this.handleFrase();
  }

  validate() {
    const { name } = this.state;
    const TWO = 2;

    if (name.length >= TWO) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled, name, loading, albums, frase } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (<Loading />) : (
          <form className="search-form">
            <input
              className='searchBar'
              name="name"
              data-testid="search-artist-input"
              value={ name }
              type="text"
              placeholder="Nome do Artista"
              onChange={ this.handleChange }
            />
            <button
              className="searchBtn"
              data-testid="search-artist-button"
              disabled={ isDisabled }
              type="button"
              onClick={ this.handleSearch }
            >
              Procurar
            </button>
          </form>
        )}
        <div className="fraseResult">
        {(frase)}
        </div>
        {albums.length > 0 && (
          albums.map((element) => (
            <div className="totalCard">
            <div className="card" key={ element.collectionId }>
              <img
               src={ element.artworkUrl100 } alt="albumImage" />
            <div className="cardText">
              <Link
                to={ `/album/${element.collectionId}` }
                data-testid={ `link-to-album-${element.collectionId}` }
                style={{ textDecoration: 'none', color: 'white' }}
              >
                { element.collectionName }
              </Link>
              <span
               style={{ color: 'white' }}
              >
                { element.artistName }
              </span>
               </div>
            </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Search;
