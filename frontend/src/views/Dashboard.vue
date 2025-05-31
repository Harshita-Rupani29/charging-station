<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>Charging Station</h2>

      <nav class="sidebar-links">
        <router-link
          to="/dashboard"
          class="sidebar-link"
          :class="{ active: isActive('/dashboard') }"
        >
          <span class="icon"><ListIcon /></span>
          List View
        </router-link>

        <router-link
          to="/map"
          class="sidebar-link"
          :class="{ active: isActive('/map') }"
        >
          <span class="icon"><MapIcon /></span>
          Map View
        </router-link>
      </nav>

      <button @click="logout" class="btn-logout">
        <span class="icon"><LogOutIcon /></span>
        Logout
      </button>
    </aside>

    <main class="main-content">
      <StationList />
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { authService } from '../services/auth'
import StationList from '../components/StationList.vue'

// Icons
import { List as ListIcon, Map as MapIcon, LogOut as LogOutIcon } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const logout = () => {
  authService.logout()
  router.push('/login')
}

const isActive = (path) => route.path === path
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
  width: 240px;
  background-color: white;
  padding: 24px;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  font-size: 22px;
  margin-bottom: 30px;
  font-weight: 600;
  color: #333;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.sidebar-link:hover {
  background-color: #e8f0fe;
  color: #1a73e8;
}

.sidebar-link.active {
  background-color: #e8f0fe;
  border-left: 4px solid #1a73e8;
  color: #1a73e8;
}

.icon {
  display: flex;
  align-items: center;
}

.btn-logout {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-logout:hover {
  background-color: #1669c1;
}

.main-content {
  flex-grow: 1;
  padding: 30px;
}

</style>
