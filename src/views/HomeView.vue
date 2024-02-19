<template>
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
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        emailAdd: '',
        userPwd: '',
        userAge: '',
        userroll: ''
      }
    };
  },
  methods: {
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
          userroll: 'user'
        };
        alert('User has been added')
      } catch (error) {
        console.error('Error adding user', error);
      }
    }
  }
};
</script>
