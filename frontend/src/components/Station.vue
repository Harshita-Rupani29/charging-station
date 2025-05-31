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
            <option value="CCS1">CCS1</option>
             <option value="CCS2">CCS2</option>
            <option value="CHAdeMO">CHAdeMO</option>
             <option value="Tesla">Tesla</option>
              <option value="NACS">NACS</option>
               <option value="GBT-AC">GBT-AC</option>
                <option value="GBT-Dc">GBT-DC</option>
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
    coordinates: [0, 0],
    address: ''
  }
})

onMounted(() => {
  if (props.station) {
    formData.value = {
      ...props.station,
      status: props.station.status.charAt(0).toUpperCase() + props.station.status.slice(1),
      location: {
        type: 'Point',
        coordinates: [
          props.station.location?.coordinates?.[0] ?? 0,
          props.station.location?.coordinates?.[1] ?? 0
        ],
        address: props.station.location?.address ?? props.station.name
      }
    }
  } else {
    // Set default address to name if new
    formData.value.location.address = formData.value.name
  }
})

const handleSubmit = () => {
  const payload = {
    ...formData.value,
    powerOutput: Number(formData.value.powerOutput),
    status: formData.value.status.toLowerCase(),
    location: {
      ...formData.value.location,
      coordinates: [
        Number(formData.value.location.coordinates[0]),
        Number(formData.value.location.coordinates[1])
      ],
      address: formData.value.location.address || formData.value.name
    }
  }

  emit('save', payload)
}
</script>


<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  border-radius: 10px;
  padding: 24px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.modal-content h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2c2c2c;
}

.form-group {
  margin-bottom: 16px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: #444;
  display: block;
  margin-bottom: 6px;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: border 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #1a73e8;
  background-color: #fff;
  box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.15);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
}

.btn-save,
.btn-cancel {
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-save {
  background-color: #1a73e8;
  color: white;
}

.btn-save:hover {
  background-color: #155ab6;
}

.btn-cancel {
  background-color: #e0e0e0;
  color: #333;
}

.btn-cancel:hover {
  background-color: #c6c6c6;
}

</style> 