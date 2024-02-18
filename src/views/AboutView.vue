<template>
  <div class="about">
    <div v-if="!Users.length">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <ul>
        <li v-for="user in Users" :key="user.userID">
          {{ user.firstName }} {{ user.lastName }}
          <button @click="deleteUser(user.userID)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    Users() {
      return this.$store.state.Users || [];
    }
  },
  methods: {
    async deleteUser(userID) {
      try {
        await fetch(`http://localhost:4500/Users/removeUser/${userID}`, {
          method: 'DELETE'
        });
        this.$store.dispatch('fetchUsers');
      } catch (error) {
        console.error('Error deleting user', error);
      }
    }
  },
  mounted() {
    try {
      setTimeout(() => {
        this.$store.dispatch('fetchUsers');
      }, 3000);
      this.loading = false;
    } catch (error) {
      console.error('Error fetching User data', error);
      this.loading = false;
    }
  }
};
</script>
