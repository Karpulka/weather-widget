import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import location from './modules/location';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    location
  },
  plugins: [createPersistedState()],
});
