import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const SERVER_USERINFO_KEY = 'huhuiyu.top.userinfo'

function saveUserInfo(userinfo) {
  localStorage.setItem(SERVER_USERINFO_KEY, JSON.stringify(userinfo))
}

function loadUserInfo() {
  let userinfo = localStorage.getItem(SERVER_USERINFO_KEY)
  return userinfo ? JSON.parse(userinfo) : {}
}

function removeUserInfo() {
  localStorage.removeItem(SERVER_USERINFO_KEY)
}

export default new Vuex.Store({
  state: {
    userinfo: loadUserInfo(),
  },
  mutations: {
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo
      saveUserInfo(userinfo)
    },
    clearUserInfo(state) {
      state.userinfo = {}
      removeUserInfo()
    },
  },
  actions: {},
  modules: {},
})
