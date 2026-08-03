import type { Component } from 'vue'
import ReverseString from './tools/ReverseString.vue'
import JsonPrettier from './tools/JsonPrettier.vue'

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
  {
    id: 'json-prettier',
    path: '/json-prettier',
    name: 'JSON Prettier',
    component: JsonPrettier,
  },
]
