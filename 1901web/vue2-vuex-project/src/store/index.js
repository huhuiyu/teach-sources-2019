import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 本地用户信息
const SERVER_USERINFO = 'huhuiyu.top.userinfo'
function saveUser(userinfo) {
  localStorage.setItem(SERVER_USERINFO, JSON.stringify(userinfo))
}
function loadUser() {
  let user = localStorage.getItem(SERVER_USERINFO)
  return user ? JSON.parse(user) : {}
}
function clearUser() {
  localStorage.removeItem(SERVER_USERINFO)
}

export default new Vuex.Store({
  state: {
    user: loadUser(),
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      saveUser(user)
    },
    removeUser(state) {
      state.user = {}
      clearUser()
    },
  },
  actions: {},
  modules: {},
})
