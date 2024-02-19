<template>
  <div id="app">
    <header>
      <h1>Sign in / up</h1>
      <div v-if="isLoggedIn">
        <p>Signed in as: {{ currentUser.firstName }}</p>
        <button @click="signOut">Sign Out</button>
        <nav>
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/products">Products</router-link> |
          <router-link to="/contact">Contact</router-link> |
          <router-link to="/checkout">Checkout</router-link>
          <span v-if="currentUser.userRoll === 'Admin'"> | <router-link to="/admin">Admin</router-link></span>
        </nav>
        <router-view />
      </div>
      <div v-else>
        <input v-model="emailAdd" type="text" placeholder="Email">
        <input v-model="userPwd" type="password" placeholder="Password">
        <button @click="signIn">Sign In</button>
        <div class="SignUp">
          <h2>Sign Up</h2>
          <form @submit.prevent="addUser">
            <div>
              <label for="firstName">First Name:</label>
              <input type="text" id="firstName" v-model="user.firstName">
            </div>
            <div>
              <label for="lastName">Last Name:</label>
              <input type="text" id="lastName" v-model="user.lastName">
            </div>
            <div>
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="user.emailAdd">
            </div>
            <div>
              <label for="password">Password:</label>
              <input type="password" id="password" v-model="user.userPwd">
            </div>
            <div>
              <label for="age">Age:</label>
              <input type="number" id="age" v-model="user.userAge">
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      emailAdd: '',
      userPwd: '',
      user: {
        firstName: '',
        lastName: '',
        emailAdd: '',
        userPwd: '',
        userAge: '',
        userRoll: ''
      }
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    async signIn() {
      try {
        await this.$store.dispatch('signIn', { emailAdd: this.emailAdd, userPwd: this.userPwd });
      } catch (error) {
        console.error('Error signing in:', error);
      }
    },
    async signOut() {
      try {
        await this.$store.dispatch('signOut');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    },
    async addUser() {
      try {
        await fetch(`http://localhost:4500/Users/addUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.user)
        });
        this.user = {
          firstName: this.firstName,
          lastName: this.lastName,
          emailAdd: this.emailAdd,
          userPwd: this.userPwd,
          userAge: this.userAge,
          userRoll: 'user'
        };
        alert('User has been added')
      } catch (error) {
        console.error('Error adding user', error);
      }
    }
  }
};
</script>

<style></style>
