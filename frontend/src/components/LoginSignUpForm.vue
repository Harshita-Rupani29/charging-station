<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>{{ isLogin ? 'Login to Your Account' : 'Create an Account' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" required />
        </div>

        <div v-if="!isLogin" class="name-fields">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" v-model="firstName" required />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" v-model="lastName" required />
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="password" required />
        </div>

        <button type="submit" class="auth-btn">
          {{ isLogin ? 'Login' : 'Register' }}
        </button>
      </form>

      <p class="toggle-text">
        {{ isLogin ? "Don't have an account?" : "Already registered?" }}
        <a href="#" @click.prevent="toggleForm">
          {{ isLogin ? 'Register here' : 'Login here' }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { authService } from '../services/auth'

const router = useRouter()
const toast = useToast()

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')

const toggleForm = () => {
  isLogin.value = !isLogin.value
}

const handleSubmit = async () => {
  try {
    if (isLogin.value) {
      const response = await authService.login(email.value, password.value)
      toast.success(response.message || 'Login successful')
      router.push('/dashboard')
    } else {
      const response = await authService.register(
        firstName.value,
        lastName.value,
        email.value,
        password.value
      )
      toast.success(response.message || 'Registration successful! Please login.')
      isLogin.value = true
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'An error occurred')
  }
}
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #f0f2f5; 
}

.auth-container {
  min-height: 100vh;
  width: 100%;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
}


.auth-card {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #555;
}

.form-group input {
  padding: 0.6rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border 0.2s ease;
}

.form-group input:focus {
  border-color: #4a90e2;
  outline: none;
}

.name-fields {
  display: flex;
  flex-wrap: wrap; 
  gap: 1rem;
}

.name-fields .form-group {
  flex: 1 1 0;     
  min-width: 0;      
}



.auth-btn {
  width: 100%;
  padding: 0.7rem;
  background-color: #4a90e2;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.auth-btn:hover {
  background-color: #407ec9;
}

.toggle-text {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.85rem;
  color: #555;
}

.toggle-text a {
  color: #4a90e2;
  font-weight: 500;
  text-decoration: none;
  margin-left: 4px;
}

.toggle-text a:hover {
  text-decoration: underline;
}

</style>
