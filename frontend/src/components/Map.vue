<template>
  <div class="map-container">
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { stationService } from '../services/station'
import { useToast } from 'vue-toastification'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const toast = useToast()
const stations = ref([])
const mapContainer = ref(null)
let map = null
let markers = []

const initMap = () => {
  // Initialize map
  map = L.map(mapContainer.value).setView([51.505, -0.09], 13)

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
}

const addMarkers = () => {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker))
  markers = []

  // Add new markers
  stations.value.forEach(station => {
    const marker = L.marker([
      station.location.coordinates[1],
      station.location.coordinates[0]
    ]).addTo(map)

    // Add popup
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

  // Center map on first station if available
  if (stations.value.length > 0) {
    const firstStation = stations.value[0]
    map.setView([
      firstStation.location.coordinates[1],
      firstStation.location.coordinates[0]
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
.map-container {
  height: 600px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.map {
  height: 100%;
  width: 100%;
}

:deep(.station-popup) {
  padding: 10px;
}

:deep(.station-popup h3) {
  margin: 0 0 10px 0;
}

:deep(.station-popup p) {
  margin: 5px 0;
}

/* Fix for Leaflet marker icons */
:deep(.leaflet-default-icon-path) {
  background-image: url(https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png);
}

:deep(.leaflet-default-shadow-path) {
  background-image: url(https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png);
}
</style> 