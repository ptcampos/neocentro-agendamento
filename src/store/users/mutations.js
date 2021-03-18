import { setUser, removeUser } from '../../services/User';

export function SIGN_IN_USER(state, userData) {
  setUser(userData);
  state.isLogged = true;
  state.loggedUser = JSON.parse(JSON.stringify(userData));
}

export function SET_LOGGED_USER(state, userData) {
  state.isLogged = true;
  state.loggedUser = JSON.parse(JSON.stringify(userData));
}

export function LOGOUT_USER(state) {
  removeUser();
  state.isLogged = false;
  state.loggedUser = null;
}
