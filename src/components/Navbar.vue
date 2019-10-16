<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <router-link class="navbar-brand" to="/" exact>
                Address Book
            </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/" exact>Home</router-link>
                </li>

                <li v-if="$store.state.isLoggedIn" class="nav-item">
                        <router-link to="/contacts" class="nav-link" exact>
                            contacts
                        </router-link>
                    </li>
                
            </ul>
            <ul class="navbar-nav mt-2 mt-md-0">
                <li v-if="!$store.state.isLoggedIn" class="nav-item">
                    <router-link to="/register" class="nav-link" exact>
                        Register
                    </router-link>
                </li>
                <li v-if="!$store.state.isLoggedIn" class="nav-item">
                    <router-link to="/login" class="nav-link" exact>
                        Login
                    </router-link>
                </li>
                <li v-if="$store.state.isLoggedIn" class="nav-item">
                        <a v-on:click.prevent="logout()" class="nav-link" href="#">Logout</a>
                </li>
                <li class="nav-item" v-if="$store.state.isLoggedIn">
                    <a href="#" class="nav-link">{{ this.$store.state.email ? this.$store.state.email : 'User' }}</a>
                </li>
            </ul>
        </div>
        </nav>
    </header>
</template>
<script>
    import * as auth from '../services/AuthService';

    export default {
        name: 'Navbar',
        methods: {
            logout: function() {
                auth.logout();
                this.$router.push({ name: 'home' });
            }
        }
    }
</script>
