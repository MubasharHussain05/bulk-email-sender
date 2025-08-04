<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <!-- Hidden File Input for CSV Import -->
    <input type="file" ref="fileInput" @change="handleFileImport" class="hidden" accept=".csv">

    <!-- Main Header -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Contacts</h1>
        <p class="text-gray-500">Manage your contact lists and segments</p>
      </div>
      <div class="flex space-x-2">
        <button @click="triggerImport" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm flex items-center hover:bg-gray-50">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          Import CSV
        </button>
        <button @click="isModalOpen = true" class="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center hover:bg-blue-600">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
          Add Contact
        </button>
      </div>
    </div>

    <!-- Contact Management Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Contact Management</h2>
      <p class="text-gray-500 mb-6">Manage your contact lists and segments</p>

      <!-- Search and Filter Bar -->
      <div class="flex justify-between items-center mb-4 border border-gray-200 rounded-lg p-3">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input type="text" placeholder="Search contacts..." class="border-2 border-blue-400 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
          <select class="border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option>All Segments</option>
          </select>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">{{ contacts.length }} contacts</span>
          <button 
            @click="exportContacts"
            :disabled="!hasContacts" 
            class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm flex items-center hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400">
             <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export
          </button>
        </div>
      </div>

      <!-- Contacts Table -->
      <div>
        <div class="grid grid-cols-12 gap-4 text-left text-xs text-gray-500 uppercase font-semibold border-b pb-2 mb-2">
          <div class="col-span-4">Contact</div>
          <div class="col-span-2">Segment</div>
          <div class="col-span-2">Status</div>
          <div class="col-span-2">Added</div>
          <div class="col-span-2">Actions</div>
        </div>
        
        <!-- No Contacts Message -->
        <div v-if="!hasContacts" class="text-center text-gray-500 py-16">
          No contacts found
        </div>

        <!-- Contact Rows -->
        <div v-else>
            <div v-for="contact in contacts" :key="contact.email" class="grid grid-cols-12 gap-4 items-center text-sm text-gray-700 py-2 border-b border-gray-100">
                <div class="col-span-4">
                    <div class="font-medium">{{ contact.firstName }} {{ contact.lastName }}</div>
                    <div class="text-xs text-gray-500">{{ contact.email }}</div>
                </div>
                <div class="col-span-2">{{ contact.segment }}</div>
                <div class="col-span-2">
                    <span :class="getStatusClass(contact.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                        {{ contact.status }}
                    </span>
                </div>
                <div class="col-span-2">{{ contact.addedDate }}</div>
                <div class="col-span-2">
                    <button class="text-gray-400 hover:text-blue-500">...</button>
                </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Add New Contact Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Add New Contact</h2>
          <button @click="isModalOpen = false" class="text-gray-500 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="addContact">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address <span class="text-red-500">*</span></label>
            <input type="email" id="email" v-model="newContact.email" class="w-full border-2 border-blue-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="contact@example.com" required>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" id="firstName" v-model="newContact.firstName" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="John">
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" id="lastName" v-model="newContact.lastName" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Doe">
            </div>
          </div>
          
          <div class="mb-4">
            <label for="segment" class="block text-sm font-medium text-gray-700 mb-1">Segment</label>
            <select id="segment" v-model="newContact.segment" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option>General</option>
              <option>Leads</option>
              <option>Customers</option>
            </select>
          </div>
          
          <div class="mb-6">
            <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select id="status" v-model="newContact.status" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option>Subscribed</option>
              <option>Unsubscribed</option>
              <option>Pending</option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button @click="isModalOpen = false" type="button" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600">Add Contact</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contacts',
  data() {
    return {
      isModalOpen: false,
      contacts: [], // To store the list of contacts
      newContact: {
        email: '',
        firstName: '',
        lastName: '',
        segment: 'General',
        status: 'Subscribed'
      }
    };
  },
  computed: {
    hasContacts() {
      return this.contacts.length > 0;
    }
  },
  methods: {
    addContact() {
      if (!this.newContact.email) {
        alert('Email is required.');
        return;
      }
      // Add current date
      const contactToAdd = {
        ...this.newContact,
        addedDate: new Date().toLocaleDateString()
      };
      this.contacts.push(contactToAdd);

      // Reset form and close modal
      this.newContact = {
        email: '',
        firstName: '',
        lastName: '',
        segment: 'General',
        status: 'Subscribed'
      };
      this.isModalOpen = false;
    },
    triggerImport() {
      // Programmatically click the hidden file input
      this.$refs.fileInput.click();
    },
    handleFileImport(event) {
      const file = event.target.files[0];
      if (file) {
        console.log('File selected for import:', file.name);
        alert(`You have selected "${file.name}" for import. \n(Note: Actual file parsing is not implemented in this demo.)`);
        // Here you would typically use a library like PapaParse to handle the CSV data
      }
    },
    exportContacts() {
      if (this.hasContacts) {
        console.log('Exporting contacts:', this.contacts);
        alert(`Exporting ${this.contacts.length} contacts. \n(Note: Check the console for the data. Actual file download is not implemented in this demo.)`);
        // Here you would typically use a library to convert JSON to CSV and trigger a download.
      }
    },
    getStatusClass(status) {
        switch(status) {
            case 'Subscribed': return 'bg-green-100 text-green-700';
            case 'Unsubscribed': return 'bg-red-100 text-red-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }
  }
}
</script>