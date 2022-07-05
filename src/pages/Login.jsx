import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
      loading: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  async handleClick() {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({
      redirect: true,
      loading: false,
    });
  }

  validate() {
    const { name } = this.state;
    const THREE = 3;

    if (name.length >= THREE) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { name, isDisabled, loading, redirect } = this.state;
    return (
      <main data-testid="page-login">
        {redirect && <Redirect to="/search" /> }
        {loading ? (
          <Loading />
        )
          : (
            <form>
              <div className='formLogin'>
              <label className="user-label" htmlFor="name">
                <h1 className="title">Trybe Tunes</h1>
                <input
                  className="loginInput"
                  value={ name }
                  placeholder="nome"
                  name="name"
                  type="text"
                  data-testid="login-name-input"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                className='loginBtn'
                type="button"
                data-testid="login-submit-button"
                disabled={ isDisabled }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
              </div>
            </form>
          )}

      </main>
    );
  }
}

export default Login;
