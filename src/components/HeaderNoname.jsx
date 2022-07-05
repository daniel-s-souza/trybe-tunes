import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './HeaderNoName.css'

export default class HeaderNoname extends Component {
  render() {
    return (
      <div className="headerBar">

      <header data-testid="header-component">
        <Link className="searchLink" style={{ textDecoration: 'none', color: 'white' }} data-testid="link-to-search" to="/search">Search</Link>
        <Link className="profileLink" style={{ textDecoration: 'none', color: 'white' }} data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
      </div>
    )
  }
}
