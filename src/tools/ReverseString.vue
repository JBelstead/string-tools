<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
const output = ref('')

function reverse() {
  output.value = input.value.split('').reverse().join('')
}

function clear() {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <div class="reverse-string">
    <label for="reverse-input">Input</label>
    <textarea id="reverse-input" v-model="input" rows="4"></textarea>

    <div class="actions">
      <button type="button" @click="reverse">Reverse</button>
      <button type="button" @click="clear">Clear</button>
    </div>

    <label for="reverse-output">Output</label>
    <textarea id="reverse-output" :value="output" rows="4" readonly></textarea>
  </div>
</template>

<style scoped>
.reverse-string {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 480px;
}

textarea {
  font-family: inherit;
  font-size: 1rem;
  padding: 0.5rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
}
</style>
