<template>
    <div>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
            <h1>Register</h1>
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input v-model="firstName" type="text" class="form-control" id="firstName" placeholder="First Name" />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input v-model="lastName" type="text" class="form-control" id="lastName" placeholder="Last Name" />
            </div>
            <div class="form-group">
                <label for="email">Phone</label>
                <input v-model="phone" type="text" class="form-control" id="phone" placeholder="phone" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="text" class="form-control" id="email" placeholder="Email" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" />
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-secondary">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
    import * as auth from '../../services/AuthService'

    export default {
        name: 'register',
        data: function() {
            return {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phone: ''
            }
        },
        methods: {
            onSubmit: async function() {
                const user = {
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phone: this.phone
                }
                const registerPromise = auth.registerUser(user);
                const loginPromise = auth.login(user);
                await Promise.all([registerPromise, loginPromise]);
                this.$router.push({ name: 'home' });
            }
        }
    }
</script>