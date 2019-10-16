import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`,
    email: null,
    firstName: null,
    lastName: null,
    userId: null
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn();
      if (state.isLoggedIn) {
        state.email = auth.getEmail();
        state.firstName = auth.getFirstName();
        state.lastName = auth.getLastName();
        state.userId = auth.getUserId();
      } else {
        state.userId = null;
        state.email = null;
        state.firstName = null;
        state.lastName = null;
      }
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate');
    }
  }
})
