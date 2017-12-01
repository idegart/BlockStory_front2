export default {
  state: {
    game: {}
  },
  mutations: {
    setGame(state, payload){
      state.game = payload;
    }
  },
  getters: {
    getGame(state){
      return state.game;
    }
  }
}
