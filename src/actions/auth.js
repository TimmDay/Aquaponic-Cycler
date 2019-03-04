import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    
    if (uid === 'demo') {
      dispatch(logout());
    } else {
      return firebase.auth().signOut();
    }
  };
};

export const startLoginDemo = () => {
  console.log('demo mode. no user logged in');
  return (dispatch) => {
    dispatch(login('demo')); 
  };
};