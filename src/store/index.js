import { createStore } from 'vuex'
const serverUrl = 'http://localhost:4500/Users'

export default createStore({
  state: {
    Users: null,
  },
  getters: {
  },
  mutations: {
    setUsers(state, value) {
      state.Users = value
    }
  },
  actions: {
    async fetchUsers(context) {
      let res = await fetch(serverUrl)
      let users = await res.json()
      context.commit('setUsers', users)
    }
  },
  modules: {
  }
})
