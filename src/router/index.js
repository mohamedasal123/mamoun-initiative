import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdminLogin from '../views/AdminLogin.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/admin', component: AdminLogin },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      // route guard protection
      if (sessionStorage.getItem('mamoun_admin') === 'true') {
        next()
      } else {
        next('/admin')
      }
    }
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
