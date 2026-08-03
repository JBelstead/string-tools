<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '../composables/useToast'

const input = ref('')
const output = ref('')
const indentWidth = ref(2)

const { show: showToast } = useToast()

function format() {
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, indentWidth.value)
  } catch (error) {
    showToast(error instanceof Error ? error.message : 'Invalid JSON')
  }
}

function clear() {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <div class="json-prettier">
    <div class="actions">
      <label for="json-indent" class="indent-label">Indent width</label>
      <select id="json-indent" v-model.number="indentWidth" class="indent-input">
        <option :value="2">2 spaces</option>
        <option :value="4">4 spaces</option>
        <option :value="8">8 spaces</option>
      </select>
      <button type="button" @click="format">Format</button>
      <button type="button" @click="clear">Clear</button>
    </div>

    <div class="panels">
      <div class="panel">
        <label for="json-input">Input</label>
        <textarea id="json-input" v-model="input"></textarea>
      </div>

      <div class="panel">
        <label for="json-output">Output</label>
        <textarea id="json-output" :value="output" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.json-prettier {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.indent-label {
  font-size: 0.9rem;
}

.indent-input {
  padding: 0.4rem;
}

button {
  padding: 0.5rem 1rem;
}

.panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  flex: 1;
  min-height: 70vh;
}

@media (max-width: 900px) {
  .panels {
    grid-template-columns: 1fr;
    min-height: unset;
  }
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 0;
}

textarea {
  font-family: var(--mono);
  font-size: 1rem;
  padding: 0.75rem;
  flex: 1;
  min-height: 300px;
  resize: vertical;
}
</style>
