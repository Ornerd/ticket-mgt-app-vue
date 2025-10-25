<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 relative overflow-hidden">
    <div class="max-w-6xl mx-auto relative z-10">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <router-link 
          to="/dashboard"
          class="text-[#1a1a1b] rounded-lg hover:text-blue-700 inline-block"
        >
          ⬅<span class="underline ml-2 text-xl">Back to Dashboard</span>
        </router-link>

        <button 
          @click="handleLogout"
          class="bg-red-950 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Logout ➡
        </button>
      </div>

      <!-- Create Ticket Form -->
      <CreateTicketForm 
        v-if="showCreateForm"
        @save="handleCreateTicket"
        @cancel="showCreateForm = false"
      />

      <!-- Edit Ticket Form -->
      <EditTicketForm 
        v-if="editingTicket"
        :ticket="editingTicket"
        @save="handleUpdateTicket"
        @cancel="editingTicket = null"
      />

      <!-- Tickets List -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 class="text-xl font-semibold">All Tickets ({{ tickets.length }})</h2>
          <button 
            @click="showCreateForm = true"
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Create New Ticket
          </button>
        </div>
        
        <div v-if="tickets.length === 0" class="text-gray-600 text-center py-8">
          No tickets yet. Create your first ticket!
        </div>
        
        <div v-else class="grid gap-4">
          <div 
            v-for="ticket in reversedTickets" 
            :key="ticket.id" 
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-semibold">{{ ticket.title }}</h3>
              <div class="flex space-x-2">
                <button 
                  @click="editingTicket = ticket"
                  class="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button 
                  @click="handleDeleteTicket(ticket.id)"
                  class="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <p class="text-gray-600 mb-3">{{ ticket.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`">
                {{ ticket.status.replace('_', ' ') }}
              </span>
              <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`">
                {{ ticket.priority }} priority
              </span>
              <span class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Created: {{ ticket.createdAt }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Circle -->
    <div class="absolute top-1/4 right-1/4 w-20 h-20 bg-blue-400 rounded-full opacity-10 z-0"></div>
    <div class="absolute -top-15 -left-8 w-80 h-80 bg-blue-400 rounded-full opacity-10 z-0"></div>

    <Footer/>
  </div>
</template>

<script>
    import Footer from '../components/Footer.vue'
    import CreateTicketForm from '../components/CreateTicketForm.vue'
    import EditTicketForm from '../components/EditTicketForm.vue'

const initialTickets = [
  {
    id: 1,
    title: 'Login issue on mobile',
    description: 'Users cannot login on mobile app',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Dashboard loading slow',
    description: 'Dashboard takes more than 5 seconds to load',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    title: 'Update user profile feature',
    description: 'Add ability to update profile picture',
    status: 'closed',
    priority: 'low',
    createdAt: '2024-01-10'
  },
  {
    id: 4,
    title: 'Password reset not working',
    description: 'Users not receiving password reset emails',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-13'
  },
  {
    id: 5,
    title: 'Add dark mode support',
    description: 'Implement dark mode across the application',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-01-12'
  },
  {
    id: 6,
    title: 'Fix typo in welcome message',
    description: 'Correct spelling error on landing page',
    status: 'closed',
    priority: 'low',
    createdAt: '2024-01-11'
  },
  {
    id: 7,
    title: 'Mobile menu not closing',
    description: 'Navigation menu stays open on mobile devices',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-01-09'
  },
  {
    id: 8,
    title: 'Issues with HNG',
    description: 'Dem wan kill me ehh',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2025-10-24'
  }
]

export default {
  name: 'Tickets',
  components: {
    Footer,
    CreateTicketForm,
    EditTicketForm
  },
  data() {
    return {
      tickets: [],
      showCreateForm: false,
      editingTicket: null
    }
  },
  computed: {
    reversedTickets() {
      return [...this.tickets].reverse()
    }
  },
  mounted() {
    this.checkAuthentication()
    this.loadTickets()
  },
  methods: {
    checkAuthentication() {
      const isAuthenticated = localStorage.getItem('ticketapp_session')
      if (!isAuthenticated) {
        this.$router.push('/login')
      }
    },
    loadTickets() {
      const savedTickets = localStorage.getItem('ticketapp_tickets')
      if (savedTickets) {
        this.tickets = JSON.parse(savedTickets)
      } else {
        this.tickets = initialTickets
        localStorage.setItem('ticketapp_tickets', JSON.stringify(initialTickets))
      }
    },
    handleCreateTicket(ticketData) {
      const newTicket = {
        id: Date.now(),
        ...ticketData,
        createdAt: new Date().toISOString().split('T')[0]
      }
      this.tickets.push(newTicket)
      localStorage.setItem('ticketapp_tickets', JSON.stringify(this.tickets))
      this.showCreateForm = false
    },
    handleUpdateTicket(updatedTicket) {
      const index = this.tickets.findIndex(ticket => ticket.id === updatedTicket.id)
      if (index !== -1) {
        this.tickets.splice(index, 1, updatedTicket)
        localStorage.setItem('ticketapp_tickets', JSON.stringify(this.tickets))
      }
      this.editingTicket = null
    },
    handleDeleteTicket(ticketId) {
      if (confirm('Are you sure you want to delete this ticket?')) {
        this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId)
        localStorage.setItem('ticketapp_tickets', JSON.stringify(this.tickets))
      }
    },
    handleLogout() {
      localStorage.removeItem('ticketapp_session')
      this.$router.push('/')
    },
    getStatusColor(status) {
      switch (status) {
        case 'open': return 'bg-green-100 text-green-800'
        case 'in_progress': return 'bg-amber-100 text-amber-800'
        case 'closed': return 'bg-gray-100 text-gray-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    },
    getPriorityColor(priority) {
      switch (priority) {
        case 'high': return 'bg-red-100 text-red-800'
        case 'medium': return 'bg-yellow-100 text-yellow-800'
        case 'low': return 'bg-blue-100 text-blue-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    }
  }
}
</script>