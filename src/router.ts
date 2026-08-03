import { createRouter, createWebHistory } from 'vue-router'
import { tools } from './tools'

export const router = createRouter({
  history: createWebHistory(),
  routes: tools.map((tool) => ({
    path: tool.path,
    name: tool.id,
    component: tool.component,
  })),
})
