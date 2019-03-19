import Vue from 'vue';
import * as types from './mutation-types';

const state = {
  coinItems: [],
  coinItem: null,
  loading: true,
};

const mutations = {
  [types.GET_COIN_ITEMS](state, payload) {
    state.coinItems = payload;
  },
};

const actions = {
  getAllCoinItems({ commit }) {
    Vue.axios.get('list')
      .then((response) => {
        state.loading = false;
        commit(types.GET_COIN_ITEMS, response.data);
      });
  },
};

const getters = {
  coinItems: state => state.coinItems,
  loading: state => state.loading,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
