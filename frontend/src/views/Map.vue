<template>
  <div class="map-view">
    <nav class="navbar">
      <h1>Charging Stations Map</h1>
      <div class="nav-links">
        <router-link to="/dashboard" class="nav-link">List View</router-link>
        <router-link to="/map" class="nav-link">Map View</router-link>
        <button @click="logout" class="btn-logout">Logout</button>
      </div>
    </nav>
    <StationMap />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { authService } from '../services/auth'
import StationMap from '../components/Map.vue'

const router = useRouter()

const logout = () => {
  authService.logout()
  router.push('/login')
}
</script>

<style scoped>
.map-view {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.navbar {
  background-color: white;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.btn-logout {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 