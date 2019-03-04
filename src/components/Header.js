import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Aquaponic Cycler</h1>
          <p className="header_tagline">Tracking your bacterial food producers</p>
        </Link>

        <div className='header__link--container'>
          <Link className="header__link" to="/aquaponic">cycler</Link>
          <a className="header__link" href='#'>CV</a>
          <a className="header__link" href='www.timmday.com'>timmday.com</a>
          <a className="header__link" href='#'>github</a>
        </div>

        <button className="header__link" onClick={startLogout}>Logout</button> //TODO: RESPONSIVE
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);