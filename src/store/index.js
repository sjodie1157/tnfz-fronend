import { createStore } from 'vuex';

const serverUrl = 'http://localhost:4500/Users';

export default createStore({
  state: {
    users: [],
    signedUser: null,
    isLoggedIn: false
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setSignedUser(state, user) {
      state.signedUser = user;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        let res = await fetch(serverUrl);
        let users = await res.json();
        commit('setUsers', users);
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
    async deleteUser({ dispatch }, userID) {
      try {
        await fetch(`${serverUrl}/removeUser/${userID}`, {
          method: 'DELETE'
        });
        dispatch('fetchUsers');
        alert('User has been removed');
      } catch (error) {
        console.error('Error deleting user', error);
      }
    },
    async signIn({ commit }, { emailAdd, userPwd }) {
      try {
        let res = await fetch(`${serverUrl}/signIn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ emailAdd, userPwd })
        });
        let { token, user } = await res.json();
        localStorage.setItem('token', token);
        commit('setSignedUser', user);
        commit('setIsLoggedIn', true);
      } catch (error) {
        console.error('Error signing in:', error);
        throw error;
      }
    },
    async signOut({ commit }) {
      try {
        localStorage.removeItem('token');
        commit('setSignedUser', null);
        commit('setIsLoggedIn', false);
      } catch (error) {
        console.error('Error signing out:', error);
        throw error;
      }
    }
  },
  getters: {
    currentUser(state) {
      return state.signedUser;
    }
  }
});
