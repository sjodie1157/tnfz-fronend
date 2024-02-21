<template>
    <div>
        <header>
            <div v-if="$cookies.isKey('webtoken')">
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <span class="d-flex align-items-center">
                            <img src="https://i.postimg.cc/Vsr9KvW1/remove-bg.png" alt="logo" loading="eager">
                            <h3 class="mx-3">Technoflexzone</h3>
                        </span>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarText">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <router-link class="nav-link active" to="/">Home</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/about">About</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/products">Products</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/contact">Contact</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav class="second-nav">
                    <div class="container-fluid d-flex justify-content-end">
                        <div class="row">
                            <div class="col">
                                <p>{{ username }}</p>
                            </div>
                            <div class="col">
                                <span v-if="isAdmin" class="d-flex">
                                    <router-link to="/admin">Admin</router-link> |
                                    <router-link class="nav-link" to="/checkout">Cart</router-link>
                                </span>
                                <span v-else>
                                    <router-link to="/"></router-link>
                                    <router-link class="nav-link" to="/checkout">Cart</router-link>
                                </span>
                            </div>
                            <div class="col">
                                <button @click="signOut">Sign Out</button>
                            </div>
                        </div>
                    </div>
                </nav>
                <router-view />
            </div>
            <div v-else>
                <nav>
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <span class="d-flex align-items-center">
                                <img src="https://i.postimg.cc/Vsr9KvW1/remove-bg.png" alt="logo">
                                <h3 class="mx-3">Technoflexzone</h3>
                            </span>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarText">
                                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <router-link class="nav-link active" to="/">Home</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link" to="/about">About</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link" to="/products">Products</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link" to="/contact">Contact</router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </nav>
                <nav class="second-nav">
                    <div class="row">
                        <div class="col d-flex justify-content-end">
                            <SigninComp @signin="signIn" class="mx-3"/>
                            <AdduserComp @signup="addUser" class="mx-3"/>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    </div>
</template>

<script>
import SigninComp from '@/components/SigninComp.vue'
import AdduserComp from '@/components/AdduserComp.vue'

/* eslint-disable */
export default {
    name: 'App',
    components: {
        SigninComp,
        AdduserComp
    },
    computed: {
        isAdmin() {
            return this.userRoll === 'Admin';
        },
        username() {
            return localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')) : '';
        },
        userRoll() {
            return localStorage.getItem('userRoll') ? JSON.parse(localStorage.getItem('userRoll')) : '';
        }
    },
    methods: {
        async signIn({ emailAdd, userPwd }) {
            try {
                if (emailAdd.trim() === '' || userPwd.trim() === '') {
                    alert('Email and password cannot be blank');
                    return;
                }

                await this.$store.dispatch('signIn', { emailAdd, userPwd });
            } catch (error) {
                alert('Error signing in:', error);
            }
        },
        async signOut() {
            try {
                await this.$store.dispatch('signOut');
            } catch (error) {
                alert('Error signing out:', error);
            }
        }
    }
};
</script>

<style scoped>
img[alt="logo"] {
    width: 75px;
}

.second-nav{
    background-color: red;
}
</style>
