<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>EV Dashboard</h2>

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

    <!-- Main Content: Map -->
    <main class="main-content">
      <div ref="mapContainer" class="map"></div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { stationService } from '../services/station'
import { authService } from '../services/auth'
import { useToast } from 'vue-toastification'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Icons
import { List as ListIcon, Map as MapIcon, LogOut as LogOutIcon } from 'lucide-vue-next'

const toast = useToast()
const router = useRouter()
const route = useRoute()

const stations = ref([])
const mapContainer = ref(null)
let map = null
let markers = []

const logout = () => {
  authService.logout()
  router.push('/login')
}

const isActive = (path) => route.path === path

const initMap = () => {
  map = L.map(mapContainer.value).setView([51.505, -0.09], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
}

const addMarkers = () => {
  markers.forEach(m => map.removeLayer(m))
  markers = []

  stations.value.forEach(station => {
    const marker = L.marker([
      station.location.coordinates[1],
      station.location.coordinates[0]
    ]).addTo(map)

    marker.bindPopup(`
      <div class="station-popup">
        <h3>${station.name}</h3>
        <p>Status: ${station.status}</p>
        <p>Power Output: ${station.powerOutput} kW</p>
        <p>Connector Type: ${station.connectorType}</p>
      </div>
    `)

    markers.push(marker)
  })

  if (stations.value.length > 0) {
    const first = stations.value[0]
    map.setView([
      first.location.coordinates[1],
      first.location.coordinates[0]
    ])
  }
}

const loadStations = async () => {
  try {
    stations.value = await stationService.getAllStations()
    addMarkers()
  } catch (error) {
    toast.error('Failed to load stations')
  }
}

onMounted(() => {
  initMap()
  loadStations()
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
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

.map {
  width: 100%;
  height: calc(100vh - 60px);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
