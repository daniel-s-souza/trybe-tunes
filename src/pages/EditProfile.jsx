import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import './editProfile.css';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      description: '',
      email: '',
      image: '',
    };
  }

  componentDidMount() {
    this.handleUserInfo();
  }

  handleUserInfo = () => {
    this.setState({
      loading: true,
    }, async () => {
      const userInfo = await getUser();
      this.setState({
        loading: false,
        name: userInfo.name,
        description: userInfo.description,
        email: userInfo.email,
        image: userInfo.image,
      });
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState(() => ({
      loading: true,
    }), async () => {
      const { name, email, description, image } = this.state;
      await updateUser({ name, email, description, image });
      const { history } = this.props;
      history.push('/profile');
    });
  }

  render() {
    const { name, description, email, image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
          <section className="editProfileSection">
            <input
              className='Input'
              placeholder="nome:"
              type="text"
              name="name"
              onChange={ this.handleChange }
              data-testid="edit-input-name"
              value={ name }
            />
            <input
              className='Input'
              placeholder="email:"
              type="text"
              name="email"
              onChange={ this.handleChange }
              data-testid="edit-input-email"
              value={ email }
            />
            <textarea
              className='Input'
              placeholder="description:"
              type="tex"
              name="description"
              onChange={ this.handleChange }
              data-testid="edit-input-description"
              value={ description }
            />
            <input
              className="Input"
              type="text"
              name="image"
              placeholder="Foto"
              value={ image }
              onChange={ this.handleChange }
              data-testid="edit-input-image"
            />
            <button
              type="submit"
              disabled={
                name.length === 0
            || description.length === 0
            || email.length === 0
            || image.length === 0
              }
              data-testid="edit-button-save"
              onClick={ this.handleClick }
            >
              Salvar
            </button>
          </section>
      </div>
    );
  }
}

EditProfile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default EditProfile;
