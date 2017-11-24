import Vue from 'vue';

export default {
  state: {
    user: {
      hash: null,
      nickname: null,
      photo: null,
      type: 'guest'
    },
    session_token: null
  },
  mutations: {
    setSession(state, session){
      localStorage.setItem('session_token', session);
      state.session_token = session;
      Vue.http.headers.common['Authorization'] = 'Bearer ' + session;
    },
    setUser(state, payload){
      state.user = {
        hash: payload.hash,
        nickname: payload.nickname,
        photo: payload.photo,
        type: payload.type
      }
    },
    exitUser(state){
      localStorage.removeItem('session_token');
      state.session_token = null;
      state.user = {
        hash: null,
        nickname: null,
        photo: null,
        type: 'guest'
      };
    },
    updateUser(state, payload){
      state.user[payload.key] = payload.value;
    }
  },
  getters: {
    getSession(state){
      return state.session_token;
    },
    getUser(state){
      return state.user;
    }
  }
}
