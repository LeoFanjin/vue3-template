import { createStore } from 'vuex';
import actions from './actions';
import getters from './getters';
import { baseState, baseMutations } from './mutations';

export default createStore({
  state: { ...baseState },
  mutations: { ...baseMutations },
  actions,
  getters,
  modules: {}
});
