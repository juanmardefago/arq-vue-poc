export default {
  signIn: function(state, jwt) {
    state.jwt = jwt;
    state.logged = true;
  },
  signout: function(state) {
    state.jwt = "";
    state.logged = false;
  }
};
