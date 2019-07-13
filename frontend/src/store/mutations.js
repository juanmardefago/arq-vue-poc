export default {
  signIn: function(state, data) {
    state.jwt = data.accessToken;
    state.permissions = data.permissions;
    state.logged = true;
  },
  signout: function(state) {
    state.jwt = "";
    state.permissions = "";
    state.logged = false;
  }
};
