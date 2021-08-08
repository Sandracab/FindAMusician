import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Artists from '../views/Artists.vue'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    hash: '#gig-form',
    name: 'HomeGig',
    component: Home
  },
  {
    path: '/artists',
    name: 'Artists',
    component: Artists
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
