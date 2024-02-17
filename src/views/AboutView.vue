<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-if="!Users.length">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <ul>
        <li v-for=" user  in  Users " :key="user.userID">{{ user.firstName }} {{ user.lastName }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    Users() {
      return this.$store.state.Users || [];
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
