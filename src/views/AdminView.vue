<template>
    <div>
        <main>
            <div v-if="isAdmin">
                <div class="admin">
                    <h2>Remove Users</h2>
                    <div v-if="loading">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div v-else>
                        <ul>
                            <li v-for="user in users" :key="user.userID">
                                {{ user.firstName }} {{ user.lastName }}
                                <button @click="deleteUser(user.userID)">Delete</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
            loading: true
        };
    },
    computed: {
        users() {
            return this.$store.state.users || [];
        },
        isAdmin() {
            return this.userRoll() === 'Admin';
        },
    },
    methods: {
        async deleteUser(userID) {
            try {
                await fetch(`http://localhost:4500/Users/removeUser/${userID}`, {
                    method: 'DELETE',
                });
                this.$store.dispatch('fetchUsers');
                alert('User has been removed');
            } catch (error) {
                console.error('Error deleting user', error);
            }
        },
        userRoll() {
            if (localStorage.getItem('userRoll')) {
                return JSON.parse(localStorage.getItem('userRoll'))
            }
        },
    },
    mounted() {
        try {
            setTimeout(() => {
                this.$store.dispatch('fetchUsers');
                this.loading = false;
            }, 3000);
        } catch (error) {
            console.error('Error fetching User data', error);
            this.loading = false;
        }
    },
};
</script>
