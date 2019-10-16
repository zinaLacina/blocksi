<template>
    <div>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
            <h1>Login</h1>
            <div class="form-group">
                <label for="email">Email address</label>
                <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-secondary">Submit</button>
        </form>
    </div>
    
</template>

<script>
    import * as auth from '../../services/AuthService'

    export default {
        name: 'login',
        data: function() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            onSubmit: async function() {
                const user = {
                    email: this.email,
                    password: this.password
                }
                await auth.login(user);
                this.$router.push({ name: 'home' });
            }
        }
    }
</script>