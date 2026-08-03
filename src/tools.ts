import type { Component } from 'vue'
import ReverseString from './tools/ReverseString.vue'

export interface StringTool {
  id: string
  path: string
  name: string
  component: Component
}

export const tools: StringTool[] = [
  {
    id: 'reverse-string',
    path: '/reverse-string',
    name: 'Reverse String',
    component: ReverseString,
  },
]
