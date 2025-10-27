<template>
  <div class="min-h-screen bg-[#f9f9f9] py-8 px-4 relative overflow-hidden">
    <!-- Decorative Circles - Behind content -->
    <div class="absolute top-20 right-20 w-20 h-20 bg-blue-400 rounded-full opacity-10 z-0"></div>
    <div class="absolute -top-15 -left-8 w-80 h-80 bg-blue-400 rounded-full opacity-10 z-0"></div>
    <div class="absolute bottom-40 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-5 z-0"></div>
    <div class="absolute top-1/2 right-10 w-12 h-12 bg-blue-200 rounded-full opacity-10 z-0"></div>
    
    <main class="max-w-6xl mx-auto relative z-10">
      <!-- Header -->
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 capitalize w-1/2 md:w-full">
            Hello {{ userName }}!
          </h1>
          <p class="text-gray-600 mt-1">Welcome to your dashboard</p>
        </div>
        <div class="space-x-4">
          <button 
            @click="handleLogout"
            class="bg-red-950 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Logout ➡
          </button>
        </div>
      </header>

      <!-- Stats Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="(stat, index) in statCards" :key="index" class="bg-white p-6 rounded-xl shadow-lg">
          <div :class="`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mb-4`">
            <span class="text-white font-bold text-lg">{{ stat.value }}</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">{{ stat.label }}</h3>
        </div>
      </section>

      <!-- Manage tickets button -->
      <div class="mb-8 flex items-center justify-end">
          <router-link 
            to="/tickets"
            class="bg-blue-600 text-white px-4 py-2  rounded-lg hover:bg-blue-700 inline-block"
          >
            Manage Tickets
          </router-link>
      </div>
       

      <!-- Recent Activity -->
      <section class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span>New ticket #001 created</span>
            <span class="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span>Ticket #002 status updated to "In Progress"</span>
            <span class="text-sm text-gray-500">4 hours ago</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span>Ticket #003 resolved</span>
            <span class="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <router-link 
            to="/tickets"
            class="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 block"
          >
            Create New Ticket
          </router-link>
          <router-link 
            to="/tickets"
            class="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 block"
          >
            View Open Tickets
          </router-link>
          <router-link 
            to="/tickets"
            class="bg-amber-600 text-white p-4 rounded-lg text-center hover:bg-amber-700 block"
          >
            View In Progress
          </router-link>
        </div>
      </section>
    </main>
    
  </div>
  <Footer/>
</template>

<script>
import Footer from '../components/Footer.vue'

export default {
  name: 'Dashboard',
  components: {
    Footer
  },
  data() {
    return {
      userName: '',
      stats: {
        total: 0,
        open: 0,
        inProgress: 0,
        resolved: 0
      }
    }
  },
  computed: {
    statCards() {
      return [
        { label: 'Total Tickets', value: this.stats.total, color: 'bg-blue-500' },
        { label: 'Open Tickets', value: this.stats.open, color: 'bg-green-500' },
        { label: 'In Progress', value: this.stats.inProgress, color: 'bg-amber-500' },
        { label: 'Resolved', value: this.stats.resolved, color: 'bg-gray-500' },
      ]
    }
  },
  mounted() {
    this.checkAuthentication()
    this.loadUserData()
    this.loadTickets()
  },
  methods: {
    checkAuthentication() {
      const isAuthenticated = localStorage.getItem('ticketapp_session')
      if (!isAuthenticated) {
        this.$router.push('/login')
      }
    },
    loadUserData() {
      const userData = JSON.parse(localStorage.getItem('ticketapp_session') || '{}')
      this.userName = userData.name || 'User'
    },
    loadTickets() {
      const savedTickets = localStorage.getItem('ticketapp_tickets')
      if (savedTickets) {
        const tickets = JSON.parse(savedTickets)
        this.calculateStats(tickets)
      }
    },
    calculateStats(tickets) {
      this.stats.total = tickets.length
      this.stats.open = tickets.filter(ticket => ticket.status === 'open').length
      this.stats.inProgress = tickets.filter(ticket => ticket.status === 'in_progress').length
      this.stats.resolved = tickets.filter(ticket => ticket.status === 'closed').length
    },
    handleLogout() {
      localStorage.removeItem('ticketapp_session')
      this.$router.push('/')
    }
  }
}
</script>