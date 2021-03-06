import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import FileLayout from '../views/FileLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: {
      name: 'File',
    },
  },
  {
    path: '/file',
    name: 'File',
    component: FileLayout,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
