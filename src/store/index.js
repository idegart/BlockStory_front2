import Vue from 'vue';
import Vuex from 'vuex';

import user from './user'
import system from './system'
import editor from './editor'
import play from './play'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,system,editor,play
  }
});
