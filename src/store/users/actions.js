export function signInUser({ commit }, userPayload) {
  commit('SIGN_IN_USER', userPayload);
}

export function setLoggedUser({ commit }, userPayload) {
  commit('SET_LOGGED_USER', userPayload);
}

export function logoutUser({ commit }) {
  commit('LOGOUT_USER');
}
