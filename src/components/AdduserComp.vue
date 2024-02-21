<template>
    <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal" id="modalBtn">
            Sign Up
        </button>
        <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="signupModalLabel">Sign Up</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="addUser">
                            <div class="mb-3">
                                <label for="firstName" class="form-label">First Name:</label>
                                <input type="text" class="form-control" id="firstName" v-model="user.firstName" required>
                            </div>
                            <div class="mb-3">
                                <label for="lastName" class="form-label">Last Name:</label>
                                <input type="text" class="form-control" id="lastName" v-model="user.lastName" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email:</label>
                                <input type="email" class="form-control" id="email" v-model="user.emailAdd" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password:</label>
                                <input type="password" class="form-control" id="password" v-model="user.userPwd" required>
                            </div>
                            <div class="mb-3">
                                <label for="age" class="form-label">Age:</label>
                                <input type="number" class="form-control" id="age" v-model="user.userAge" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
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
                userAge: ''
            }
        };
    },
    methods: {
        async addUser() {
            try {
                if (this.user.emailAdd.trim() === '' || this.user.userPwd.trim() === '') {
                    alert('Email and password cannot be blank');
                    return;
                }

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
                alert('Error adding user', error);
            }
        },
    }
};
</script>

<style scoped>
#modalBtn {
    background-color: transparent;
    border: none;
    color: black;
} 
</style>
