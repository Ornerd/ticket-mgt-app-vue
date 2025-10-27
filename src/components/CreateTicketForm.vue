<template>
  <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
    <h3 class="text-xl font-semibold mb-4">Create New Ticket</h3>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Title *</label>
        <input
          type="text"
          v-model="formData.title"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          v-model="formData.description"
          rows="3"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
                <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Status *</label>
          <select
            v-model="formData.status"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Priority</label>
          <select
            v-model="formData.priority"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div class="flex space-x-4">
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Create Ticket
        </button>
        <button
          type="button"
          @click="$emit('cancel')"
          class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateTicketForm',
  emits: ['save', 'cancel'],
  data() {
    return {
      formData: {
        title: '',
        description: '',
        status: 'open',
        priority: 'medium'
      },
      errors: {}
    }
  },
  methods: {
    handleSubmit() {
      this.errors = {}

      if (!this.formData.title.trim()) this.errors.title = 'Your Ticket needs a title'
      if (this.formData.description.length < 7) this.errors.description = 'Your Description should be atleast 7 chrarcters long'
      if (!this.formData.status) this.errors.status = 'Your Ticket needs a status'

      if (Object.keys(this.errors).length > 0) return

      this.$emit('save', this.formData)
      this.formData = { title: '', description: '', status: 'open', priority: 'medium' }
      this.errors = {}
    }
  }
}
</script>