<template>
  <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
    <h3 class="text-xl font-semibold mb-4">Edit Ticket</h3>
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
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Update Ticket
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
    name: 'EditTicketForm',
    props: {
        ticket: {
        type: Object,
        required: true
        }
    },
    emits: ['save', 'cancel'],
    data() {
        return {
        formData: {},
        errors: {}
        }
    },
    watch: {
        ticket: {
        immediate: true,
        handler(newTicket) {
            this.formData = { ...newTicket }
        }
        }
    },
    methods: {
        handleSubmit() {
        this.errors = {}

        if (!this.formData.title.trim()) this.errors.title = 'Title is required'
        if (!this.formData.status) this.errors.status = 'Status is required'

        if (Object.keys(this.errors).length > 0) return

        this.$emit('save', this.formData)
        }
    }
    }
</script>