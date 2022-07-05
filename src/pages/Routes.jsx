import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Album from './Album';
import EditProfile from './EditProfile';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import Search from './Search';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/*" component={ NotFound } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ EditProfile } />
      </Switch>

    );
  }
}

export default Routes;
