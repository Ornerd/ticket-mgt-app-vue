import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Dashboard from '../views/Dashboard.vue'
import Tickets from '../views/Tickets.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/dashboard', component: Dashboard },
  { path: '/tickets', component: Tickets }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Route guard for protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('ticketapp_session')
  
  if (to.path !== '/' && to.path !== '/login' && to.path !== '/signup' && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router