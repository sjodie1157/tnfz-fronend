<template>
    <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#SignIn" id="modalBtn">
            login
        </button>
        <div class="modal fade" id="SignIn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Sign In</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="signIn">
                            <div class="mb-3">
                                <label for="email" class="col-form-label">Email:</label>
                                <input v-model="emailAdd" type="email" class="form-control" id="email" required />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="col-form-label">Password:</label>
                                <input v-model="userPwd" type="password" class="form-control" id="password" required />
                            </div>
                            <button type="submit" class="btn btn-primary">Sign In</button>
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
            emailAdd: "",
            userPwd: "",
        };
    },
    methods: {
        async signIn() {
            try {
                if (this.emailAdd.trim() === "" || this.userPwd.trim() === "") {
                    alert("Email and password cannot be blank");
                    return;
                }

                await this.$store.dispatch("signIn", {
                    emailAdd: this.emailAdd,
                    userPwd: this.userPwd,
                });
            } catch (error) {
                console.error("Error signing in:", error);
                if (error.response && error.response.status === 404) {
                    alert("User not found. Please check your credentials and try again.");
                } else {
                    alert("Error signing in. Please try again.");
                }
            }
        }
    },
};
</script>

<style scoped>
#modalBtn {
    background-color: transparent;
    border: none;
    color: black;
} 
</style>
