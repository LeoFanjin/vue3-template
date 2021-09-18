// import Vue from 'vue';
// import Vuex from 'vuex';
import { baseState as state, baseMutations as mutations } from './modules';
import getters from './getters';
import actions from './actions';
import _ from 'underscore';
// const project = require('../../project');

// Vue.use(Vuex);
// Vue.config.debug = true;

/* let store = {
  state,
  mutations,
  getters,
  actions
}; */

// export default new Vuex.Store(store);
export const sysStates = state;
export const sysMutations = mutations;
export const sysGetters = getters;
export const sysActions = actions;
