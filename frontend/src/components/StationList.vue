<template>
  <div class="station-list">
  
    <div class="filters">
      <select v-model="filters.status" class="filter-select">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <select v-model="filters.connectorType" class="filter-select">
        <option value="">All Connector Types</option>
        <option value="Type1">Type1</option>
        <option value="Type2">Type2</option>
        <option value="CCS1">CCS1</option>
        <option value="CCS2">CCS2</option>
        <option value="CHAdeMO">CHAdeMO</option>
        <option value="Tesla">Tesla</option>
        <option value="NACS">NACS</option>
        <option value="GBT-AC">GBT-AC</option>
        <option value="GBT-DC">GBT-DC</option>
      </select>

      <input
        type="number"
        v-model="filters.minPower"
        placeholder="Min Power (kW)"
        class="filter-input"
      />
    </div>

    <!-- Stations -->
    <div class="stations">
      <div v-for="station in stations" :key="station._id" class="station-card">
        <div class="station-header">
          <h3>{{ station.name }}</h3>
          <span :class="['status-tag', station.status]">{{ station.status }}</span>
        </div>
        <div class="station-details">
          <div><strong>{{ station.powerOutput }} kW</strong> • {{ station.connectorType }}</div>
        </div>
        <div class="station-actions">
          <button @click="editStation(station)" class="btn small update">Update</button>
          <button @click="deleteStation(station._id)" class="btn small delete">Delete</button>
        </div>
      </div>
    </div>

    <!-- Add Button -->
    <button @click="showAddForm = true" class="btn add">Add New Station</button>

    <StationForm
      v-if="showAddForm || editingStation"
      :station="editingStation"
      @close="closeForm"
      @save="saveStation"
    />
  </div>
</template>


<script setup>
import { ref, watch, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { stationService } from '../services/station'
import StationForm from './Station.vue'

const toast = useToast()
const stations = ref([])
const showAddForm = ref(false)
const editingStation = ref(null)

const filters = ref({
  status: '',
  connectorType: '',
  minPower: ''
})

const loadStations = async () => {
  try {
    stations.value = await stationService.getAllStations(filters.value)
  } catch (error) {
    toast.error('Failed to load stations')
  }
}

watch(filters, loadStations, { deep: true })

const editStation = (station) => {
  editingStation.value = { ...station }
}

const deleteStation = async (id) => {
  if (confirm('Are you sure you want to delete this station?')) {
    try {
      await stationService.deleteStation(id)
      stations.value = stations.value.filter(s => s._id !== id)
      toast.success('Station deleted successfully')
    } catch (error) {
      toast.error('Failed to delete station')
    }
  }
}

const saveStation = async (stationData) => {
  try {
    if (stationData._id) {
      await stationService.updateStation(stationData._id, stationData)
      const index = stations.value.findIndex(s => s._id === stationData._id)
      stations.value[index] = stationData
    } else {
      const newStation = await stationService.createStation(stationData)
      stations.value.push(newStation)
    }
    closeForm()
    toast.success('Station saved successfully')
  } catch (error) {
    toast.error('Failed to save station')
  }
}

const closeForm = () => {
  showAddForm.value = false
  editingStation.value = null
}

onMounted(loadStations)
</script>

<style scoped>
.station-list {
  padding: 1rem;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.filter-select,
.filter-input {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.stations {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.station-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.station-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.station-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.status-tag {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 500;
}

.status-tag.active {
  background: #e0f8ec;
  color: #1e824c;
}

.status-tag.inactive {
  background: #ffe0e0;
  color: #c0392b;
}

.station-details {
  font-size: 14px;
  color: #444;
}

.station-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn {
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.btn.small {
  padding: 5px 10px;
}

.btn.update {
  background-color: #3498db;
  color: white;
}

.btn.delete {
  background-color: #e74c3c;
  color: white;
}

.btn.add {
  margin-top: 20px;
  background-color: #2ecc71;
  color: white;
  padding: 8px 14px;
}


</style>
