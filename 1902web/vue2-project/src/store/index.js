import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const COUNTER_KEY = 'local_save_counter';
function saveCounter(counter) {
  localStorage.setItem(COUNTER_KEY, counter);
}

function loadCounter() {
  let counter = localStorage.getItem(COUNTER_KEY);
  return counter ? counter : 1;
}

export default new Vuex.Store({
  state: {
    counter: loadCounter(),
  },
  mutations: {
    changeCounter(state) {
      state.counter++;
      saveCounter(state.counter);
    },
  },
  actions: {},
  modules: {},
});
