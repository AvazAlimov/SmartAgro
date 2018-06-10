import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userdata: {
      username: "",
      email: "",
      password: ""
    }
  },
  getters: {
    getToken(state, getters) {
      return state.token;
    }
  },
  actions: {
    fetchToken({commit}) {
      return new Promise((resolve, reject) => {
        commit('setToken', localStorage.getItem("token"));
        resolve();
      });
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserdata(state, userdata) {
      state.userdata.username = userdata.username;
      state.userdata.email = userdata.email;
      state.userdata.password = userdata.password;
    }
  }
});
