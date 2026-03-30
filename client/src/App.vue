<template>
  <div id="app">
    <header>
      <button class="menu-toggle" @click="menuOpen = !menuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <h1>Mary TQ</h1>
    </header>
    <nav :class="{ open: menuOpen }">
      <router-link to="/" @click="menuOpen = false">Dashboard</router-link>
      <router-link to="/clientes" @click="menuOpen = false">Clientes</router-link>
      <router-link to="/productos" @click="menuOpen = false">Productos</router-link>
      <router-link to="/entregas" @click="menuOpen = false">Entregas</router-link>
      <router-link to="/abonos/new" @click="menuOpen = false">Abonos</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

#app {
  min-height: 100vh;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.menu-toggle span {
  width: 24px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
}

header h1 {
  font-size: 1.25rem;
}

nav {
  background-color: #34495e;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 0.9rem;
}

nav a:hover,
nav a.router-link-active {
  background-color: #42b983;
}

main {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .menu-toggle {
    display: flex;
  }

  nav {
    display: none;
    flex-direction: column;
    gap: 0;
  }

  nav.open {
    display: flex;
  }

  nav a {
    padding: 1rem;
    border-radius: 0;
    border-bottom: 1px solid #2c3e50;
  }
}
</style>
