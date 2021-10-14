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
    // 修改vuex变量,这里面的事件是通过commit触发
    changeCounter(state) {
      state.counter++;
      saveCounter(state.counter);
      // PostCSS
    },
  },
  actions: {
    // 这里面其实也是修改vuex的变量，但是支持异步处理
    changeCounter(context) {
      return new Promise(function (resolve, reject) {
        try {
          setTimeout(function () {
            context.commit('changeCounter');
            resolve();
          }, 2000);
        } catch (ex) {
          reject(ex);
        }
      });
    },
  },
  modules: {},
});
