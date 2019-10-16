import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/authentication/Login.vue';
import Register from './views/authentication/Register.vue';
import ContactsAll from './views/contacts/ContactsAll.vue';
import ContactsCreate from './views/contacts/ContactsCreate.vue';
import ContactsEdit from './views/contacts/ContactsEdit.vue';
import * as auth from './services/AuthService'

Vue.use(Router)

const routes = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contacts',
      name: 'contacts-all',
      component: ContactsAll,
      beforeEnter: (to, from, next) => {
        if (auth.isLoggedIn()) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/contacts/new',
      name: 'contacts-create',
      component: ContactsCreate,
      beforeEnter: (to, from, next) => {
        if (auth.isLoggedIn()) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/contacts/:id',
      name: 'contacts-edit',
      component: ContactsEdit,
      beforeEnter: (to, from, next) => {
        if (auth.isLoggedIn()) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if (!auth.isLoggedIn()) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (!auth.isLoggedIn()) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  linkActiveClass: 'active',
  mode: 'history'
})

// routes.beforeEach((to, from, next) => {
//   // Evaluate condition
//   next();
// })

export default routes;
