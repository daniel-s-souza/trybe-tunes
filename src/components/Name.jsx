import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Name extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ loading: true });
    const result = await getUser();
    this.setState({
      name: result.name,
      loading: false,
    });
  }
  render() {
    const { name, loading } = this.state;
    return (
      <div>
        <p className="userName" data-testid="header-user-name">{ name }</p>
        {loading && <Loading />}
      </div>
    );
  }
}

export default Name;


