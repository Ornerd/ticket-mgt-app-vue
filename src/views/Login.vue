<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f9f9f9] py-12 px-4 relative overflow-hidden">
    <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-lg relative z-10">
      <div class="flex justify-end mb-6">
        <router-link 
          to="/"
          class="text-[#1a1a1b] rounded-lg hover:text-blue-700 inline-block"
        >
          <span class="underline ml-2 text-m">Back to Homepage</span>
        </router-link>
      </div>

      <h2 class="text-3xl font-bold text-center mb-8">Login to Ortel</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="formData.email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            v-model="formData.password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
        </div>

        <p v-if="errors.general" class="text-red-600 text-sm text-center">{{ errors.general }}</p>

        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#163052] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account? 
        <router-link to="/signup" class="text-blue-600 hover:text-blue-500">Sign up</router-link>
      </p>
    </div>

    <!-- Decorative Circle -->
    <div class="absolute top-1/4 right-1/4 w-20 h-20 bg-blue-400 rounded-full opacity-10 z-0"></div>
    <div class="absolute -top-15 -left-8 w-80 h-80 bg-blue-400 rounded-full opacity-10 z-0"></div>

    
  </div>
  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'

export default {
  name: 'Login',
  components: {
    Footer
  },
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    handleSubmit() {
      this.errors = {}
      
      if (!this.formData.email) this.errors.email = 'Email is required'
      if (!this.formData.password) this.errors.password = 'Password is required'
      
      if (Object.keys(this.errors).length > 0) return

      // Simulate authentication
      if (this.formData.email === 'test@test.com' && this.formData.password === '1234567') {
        const userData = {
          user: this.formData.email,
          name: 'HNG Instructor'
        }
        localStorage.setItem('ticketapp_session', JSON.stringify(userData))
        this.$router.push('/dashboard')
      } else {
        this.errors.general = 'Invalid username or password'
      }
    }
  }
}
</script>