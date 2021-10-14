import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const COUNT_KEY = 'count.save.key';

function saveCount(count) {
  localStorage.setItem(COUNT_KEY, count);
}

function loadCount() {
  let count = localStorage.getItem(COUNT_KEY);
  return count ? count : 1;
}

export default new Vuex.Store({
  state: {
    count: loadCount()
  },
  mutations: {
    addCount(state) {
      state.count++;
      saveCount(state.count);
    }
  },
  actions: {},
  modules: {}
});
