import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderNoname from '../components/HeaderNoname';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      img: '',
      email: '',
      description: '',
    };
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });
    const info = await getUser();
    console.log(getUser());

    this.setState({
      loading: false,
      name: info.name,
      img: info.image,
      email: info.email,
      description: info.description,
    });
  }

  render() {
    const {
      loading,
      name,
      img,
      email,
      description,
    } = this.state;
    const { history } = this.props;

    return (
      <div data-testid="page-profile">
        <HeaderNoname />
        {loading ? (<Loading />) : (
          <section className='profile-section'>
            <img src={ img } alt={ name } data-testid="profile-image" />
            <p>{name}</p>
            <p>{email}</p>
            <p>{description}</p>
            <button onClick={() => history.push('/profile/edit')}>
                Editar perfil
            </button>
          </section>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Profile;
