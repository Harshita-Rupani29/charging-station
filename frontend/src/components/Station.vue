<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ station ? 'Edit Station' : 'Add New Station' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Name</label>
          <input 
            type="text" 
            v-model="formData.name" 
            required 
            class="form-control"
          >
        </div>

        <div class="form-group">
          <label>Status</label>
          <select v-model="formData.status" required class="form-control">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div class="form-group">
          <label>Power Output (kW)</label>
          <input 
            type="number" 
            v-model="formData.powerOutput" 
            required 
            class="form-control"
          >
        </div>

        <div class="form-group">
          <label>Connector Type</label>
          <select v-model="formData.connectorType" required class="form-control">
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
          </select>
        </div>

        <div class="form-group">
          <label>Latitude</label>
          <input 
            type="number" 
            v-model="formData.location.coordinates[1]" 
            required 
            step="any"
            class="form-control"
          >
        </div>

        <div class="form-group">
          <label>Longitude</label>
          <input 
            type="number" 
            v-model="formData.location.coordinates[0]" 
            required 
            step="any"
            class="form-control"
          >
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-save">Save</button>
          <button type="button" @click="$emit('close')" class="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  station: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const formData = ref({
  name: '',
  status: 'Active',
  powerOutput: '',
  connectorType: '',
  location: {
    type: 'Point',
    coordinates: [0, 0]
  }
})

onMounted(() => {
  if (props.station) {
    formData.value = { ...props.station }
  }
})

const handleSubmit = () => {
  emit('save', formData.value)
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-save,
.btn-cancel {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-save {
  background-color: #4CAF50;
  color: white;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}
</style> 