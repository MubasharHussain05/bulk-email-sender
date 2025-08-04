import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Contacts from '../views/Contacts.vue'
import Campaigns from '../views/Campaigns.vue'
import Templates from '../views/Templates.vue'
import Analytics from '../views/Analytics.vue'
import Settings from '../views/Settings.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/campaigns',
      name: 'campaigns',
      component: Campaigns
    },
    {
      path: '/templates',
      name: 'templates',
      component: Templates
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router