import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startLoginDemo } from '../actions/auth';

export const LoginPage = ({ startLogin, startLoginDemo }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Aquaponic Cycling</h1>
      <p>Stabilising Food Producing Ecosystems</p>
      <div className='login__btn-bar'>
        <button className="login__btn" onClick={startLogin}>Login with Google</button>
        <button className="login__btn" onClick={startLoginDemo}>View DEMO</button>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startLoginDemo: () => dispatch(startLoginDemo('demo'))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);