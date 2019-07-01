import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jwt: "",
    logged: false
  },
  mutations: {
    signIn: function(state, jwt) {
      state.jwt = jwt;
      state.logged = true;
    },
    signout: function(state) {
      state.jwt = "";
      state.logged = false;
    }
  },
  actions: {}
});
