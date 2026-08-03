<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { tools } from './tools'
import Toast from './components/Toast.vue'

const route = useRoute()
const activeTool = computed(() => tools.find((tool) => tool.id === route.name))
</script>

<template>
  <div class="app">
    <header class="app-header">
      <div class="app-header-spacer"></div>
      <div class="app-header-title">String Tools</div>
    </header>
    <div class="shell">
      <nav class="menu">
        <RouterLink
          v-for="tool in tools"
          :key="tool.id"
          :to="tool.path"
          class="menu-item"
          active-class="menu-item-active"
        >
          {{ tool.name }}
        </RouterLink>
      </nav>
      <main class="content">
        <h1 v-if="activeTool">{{ activeTool.name }}</h1>
        <RouterView />
      </main>
    </div>
    <Toast />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  display: flex;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border);
  font-weight: bold;
  font-size: 1.1rem;
}

.app-header-spacer {
  width: 200px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
}

.app-header-title {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
}

.shell {
  display: flex;
  flex: 1;
}

.menu {
  display: flex;
  flex-direction: column;
  width: 200px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  padding: 1rem 0;
}

.menu-item {
  padding: 0.5rem 1rem;
  color: inherit;
  text-decoration: none;
}

.menu-item:hover {
  background: rgba(128, 128, 128, 0.15);
}

.menu-item-active {
  font-weight: bold;
  background: rgba(128, 128, 128, 0.25);
}

.content {
  flex: 1;
  padding: 1.5rem;
}
</style>
