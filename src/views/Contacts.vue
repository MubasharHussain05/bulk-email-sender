<template>
  <div class="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
    <!-- Hidden File Input for CSV Import -->
    <input type="file" ref="fileInput" @change="handleFileImport" class="hidden" accept=".csv">
    
    <!-- Toast Notifications -->
    <div v-if="toast.show" :class="toastClass" class="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300">
      <div class="flex items-center">
        <svg v-if="toast.type === 'success'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <span>{{ toast.message }}</span>
        <button @click="hideToast" class="ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Main Header -->
    <div class="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 sm:text-3xl">Contacts</h1>
        <p class="text-sm text-gray-500 sm:text-base">Manage your contact lists and segments</p>
      </div>
      <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <button @click="triggerImport" :disabled="loading" class="flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          <span class="hidden sm:inline">Import CSV</span>
          <span class="sm:hidden">Import</span>
        </button>
        <button @click="selectedContacts.length > 0 ? bulkDelete() : null" :disabled="selectedContacts.length === 0" class="flex items-center justify-center px-4 py-2 text-sm font-semibold text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          <span class="hidden sm:inline">Delete ({{ selectedContacts.length }})</span>
          <span class="sm:hidden">Delete</span>
        </button>
        <button @click="openModal" class="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
          <span class="hidden sm:inline">Add Contact</span>
          <span class="sm:hidden">Add</span>
        </button>
      </div>
    </div>

    <!-- Contact Management Card -->
    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
      <div class="hidden sm:block">
        <h2 class="mb-2 text-xl font-semibold text-gray-800">Contact Management</h2>
        <p class="mb-6 text-gray-500">Manage your contact lists and segments</p>
      </div>

      <!-- Search and Filter Bar -->
      <div class="flex flex-col gap-4 p-3 mb-4 border border-gray-200 rounded-lg lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-col items-stretch space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div class="relative flex-1 sm:flex-none">
            <input 
              type="text" 
              v-model="searchQuery" 
              @input="debouncedSearch"
              placeholder="Search contacts..." 
              class="w-full py-2 pl-10 pr-4 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" 
            />
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button v-if="searchQuery" @click="clearSearch" class="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg class="w-4 h-4 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
          <select v-model="selectedSegment" @change="filterContacts" class="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="">All Segments</option>
            <option value="general">General</option>
            <option value="leads">Leads</option>
            <option value="customers">Customers</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>
          <select v-model="selectedStatus" @change="filterContacts" class="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="">All Status</option>
            <option value="subscribed">Subscribed</option>
            <option value="unsubscribed">Unsubscribed</option>
            <option value="bounced">Bounced</option>
          </select>
        </div>
        <div class="flex flex-col items-stretch space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div class="flex items-center space-x-2">
            <span class="text-center text-gray-600 sm:text-left">{{ filteredContacts.length }} of {{ allContacts.length }} contacts</span>
            <button v-if="selectedContacts.length > 0" @click="clearSelection" class="text-xs text-blue-500 hover:text-blue-700">
              Clear selection
            </button>
          </div>
          <button 
            @click="exportContacts"
            :disabled="!hasContacts" 
            class="flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400">
             <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export
          </button>
        </div>
      </div>

      <!-- Contacts Table -->
      <div>
        <!-- Desktop Table Header -->
        <div class="hidden grid-cols-12 gap-4 pb-2 mb-2 text-xs font-semibold text-left text-gray-500 uppercase border-b md:grid">
          <div class="col-span-1">
            <input 
              type="checkbox" 
              :checked="allSelected" 
              @change="toggleSelectAll" 
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            >
          </div>
          <div class="col-span-3">Contact</div>
          <div class="col-span-2">Segment</div>
          <div class="col-span-2">Status</div>
          <div class="col-span-2">Added</div>
          <div class="col-span-2">Actions</div>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="py-16 text-center text-gray-500">
          Loading contacts...
        </div>
        
        <!-- No Contacts Message -->
        <div v-else-if="!hasContacts" class="py-16 text-center text-gray-500">
          No contacts found
        </div>

        <!-- Desktop Contact Rows -->
        <div v-else class="hidden md:block">
            <div v-for="contact in paginatedContacts" :key="contact._id || contact.email" 
                 :class="['grid items-center grid-cols-12 gap-4 py-2 text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition-colors', 
                         { 'bg-blue-50': selectedContacts.includes(contact._id) }]">
                <div class="col-span-1">
                    <input 
                      type="checkbox" 
                      :value="contact._id" 
                      v-model="selectedContacts" 
                      class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    >
                </div>
                <div class="col-span-3">
                    <div class="font-medium">{{ getFullName(contact) }}</div>
                    <div class="text-xs text-gray-500">{{ contact.email }}</div>
                </div>
                <div class="col-span-2">
                    <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full capitalize">
                        {{ contact.segment }}
                    </span>
                </div>
                <div class="col-span-2">
                    <span :class="getStatusClass(contact.status)" class="px-2 py-1 text-xs font-semibold rounded-full capitalize">
                        {{ contact.status }}
                    </span>
                </div>
                <div class="col-span-2 text-xs text-gray-500">{{ formatDate(contact.createdAt || contact.addedDate) }}</div>
                <div class="col-span-2 flex space-x-2">
                    <button @click="editContact(contact)" class="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded transition-colors" title="Edit contact">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button @click="deleteContact(contact._id)" class="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors" title="Delete contact">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Mobile Contact Cards -->
        <div v-if="hasContacts" class="space-y-4 md:hidden">
            <div v-for="contact in paginatedContacts" :key="contact._id || contact.email" 
                 :class="['p-4 border rounded-lg transition-colors', 
                         selectedContacts.includes(contact._id) ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 hover:bg-gray-100']">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-start space-x-3">
                        <input 
                          type="checkbox" 
                          :value="contact._id" 
                          v-model="selectedContacts" 
                          class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        >
                        <div>
                            <div class="font-medium text-gray-900">{{ getFullName(contact) }}</div>
                            <div class="text-sm text-gray-500">{{ contact.email }}</div>
                        </div>
                    </div>
                    <div class="flex ml-2 space-x-2">
                        <button @click="editContact(contact)" class="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button @click="deleteContact(contact._id)" class="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 text-sm">
                    <div class="flex items-center">
                        <span class="mr-1 text-gray-500">Segment:</span>
                        <span class="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full capitalize">{{ contact.segment }}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-1 text-gray-500">Status:</span>
                        <span :class="getStatusClass(contact.status)" class="px-2 py-1 text-xs font-semibold rounded-full capitalize">
                            {{ contact.status }}
                        </span>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-1 text-gray-500">Added:</span>
                        <span class="font-medium text-xs">{{ formatDate(contact.createdAt || contact.addedDate) }}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between mt-6 px-4 py-3 bg-white border border-gray-200 rounded-lg">
        <div class="flex items-center text-sm text-gray-500">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredContacts.length) }} of {{ filteredContacts.length }} results
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)" 
            :disabled="currentPage === 1"
            class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="px-3 py-1 text-sm bg-blue-500 text-white rounded">{{ currentPage }}</span>
          <span class="text-sm text-gray-500">of {{ totalPages }}</span>
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Add New Contact Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="w-full max-w-lg p-4 sm:p-8 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <h2 class="text-lg font-bold text-gray-800 sm:text-xl">{{ isEditMode ? 'Edit Contact' : 'Add New Contact' }}</h2>
          <button @click="isModalOpen = false" class="text-gray-500 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="addContact">
          <div class="mb-4">
            <label for="email" class="block mb-1 text-sm font-medium text-gray-700">Email Address <span class="text-red-500">*</span></label>
            <input 
              type="email" 
              id="email" 
              v-model="newContact.email" 
              :class="['w-full p-2 border-2 rounded-md focus:outline-none focus:ring-2', 
                      validationErrors.email ? 'border-red-400 focus:ring-red-300' : 'border-blue-400 focus:ring-blue-300']" 
              placeholder="contact@example.com" 
              required
              @blur="validateEmail"
            >
            <p v-if="validationErrors.email" class="mt-1 text-xs text-red-600">{{ validationErrors.email }}</p>
          </div>
          
          <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label for="firstName" class="block mb-1 text-sm font-medium text-gray-700">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="newContact.firstName" 
                :class="['w-full p-2 border rounded-md focus:outline-none focus:ring-2', 
                        validationErrors.firstName ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300']" 
                placeholder="John"
                @blur="validateName('firstName')"
              >
              <p v-if="validationErrors.firstName" class="mt-1 text-xs text-red-600">{{ validationErrors.firstName }}</p>
            </div>
            <div>
              <label for="lastName" class="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="newContact.lastName" 
                :class="['w-full p-2 border rounded-md focus:outline-none focus:ring-2', 
                        validationErrors.lastName ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300']" 
                placeholder="Doe"
                @blur="validateName('lastName')"
              >
              <p v-if="validationErrors.lastName" class="mt-1 text-xs text-red-600">{{ validationErrors.lastName }}</p>
            </div>
          </div>
          
          <div class="mb-4">
            <label for="segment" class="block mb-1 text-sm font-medium text-gray-700">Segment</label>
            <select id="segment" v-model="newContact.segment" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option value="general">General</option>
              <option value="leads">Leads</option>
              <option value="customers">Customers</option>
              <option value="premium">Premium</option>
              <option value="vip">VIP</option>
            </select>
          </div>
          
          <div class="mb-6">
            <label for="status" class="block mb-1 text-sm font-medium text-gray-700">Status</label>
            <select id="status" v-model="newContact.status" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option value="subscribed">Subscribed</option>
              <option value="unsubscribed">Unsubscribed</option>
              <option value="bounced">Bounced</option>
            </select>
          </div>
          
          <div class="mb-6">
            <label class="block mb-1 text-sm font-medium text-gray-700">Tags (Optional)</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span v-for="tag in newContact.tags" :key="tag" class="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {{ tag }}
                <button @click="removeTag(tag)" type="button" class="ml-1 text-blue-600 hover:text-blue-800">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </span>
            </div>
            <div class="flex">
              <input 
                type="text" 
                v-model="newTag" 
                @keyup.enter="addTag" 
                placeholder="Add a tag and press Enter" 
                class="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
              <button @click="addTag" type="button" class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Add
              </button>
            </div>
          </div>
          
          <div class="flex flex-col justify-end space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button @click="isModalOpen = false" type="button" class="order-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 sm:order-1">Cancel</button>
            <button type="submit" :disabled="loading" class="order-1 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 sm:order-2">
              {{ loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Contact' : 'Add Contact') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { contactService } from '../services/contactService';

export default {
  name: 'Contacts',
  data() {
    return {
      isModalOpen: false,
      isEditMode: false,
      editingContactId: null,
      allContacts: [],
      filteredContacts: [],
      loading: false,
      searchQuery: '',
      selectedSegment: '',
      selectedStatus: '',
      selectedContacts: [],
      currentPage: 1,
      itemsPerPage: 10,
      newTag: '',
      searchTimeout: null,
      toast: {
        show: false,
        message: '',
        type: 'success'
      },
      validationErrors: {},
      newContact: {
        email: '',
        firstName: '',
        lastName: '',
        segment: 'general',
        status: 'subscribed',
        tags: []
      }
    };
  },
  computed: {
    contacts() {
      return this.filteredContacts;
    },
    hasContacts() {
      return this.filteredContacts.length > 0;
    },
    paginatedContacts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredContacts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredContacts.length / this.itemsPerPage);
    },
    allSelected() {
      return this.paginatedContacts.length > 0 && 
             this.paginatedContacts.every(contact => this.selectedContacts.includes(contact._id));
    },
    toastClass() {
      return this.toast.type === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white';
    }
  },
  async mounted() {
    await this.fetchContacts();
    this.filteredContacts = [...this.allContacts];
  },
  watch: {
    currentPage() {
      this.selectedContacts = [];
    }
  },
  methods: {
    async fetchContacts() {
      try {
        this.loading = true;
        this.allContacts = await contactService.getAll();
        this.filteredContacts = [...this.allContacts];
        this.currentPage = 1;
      } catch (error) {
        console.error('Error fetching contacts:', error);
        this.showToast('Failed to load contacts', 'error');
      } finally {
        this.loading = false;
      }
    },
    debouncedSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.filterContacts();
      }, 300);
    },
    filterContacts() {
      let filtered = [...this.allContacts];
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(contact => 
          contact.email.toLowerCase().includes(query) ||
          (contact.firstName && contact.firstName.toLowerCase().includes(query)) ||
          (contact.lastName && contact.lastName.toLowerCase().includes(query))
        );
      }
      
      if (this.selectedSegment) {
        filtered = filtered.filter(contact => contact.segment === this.selectedSegment);
      }
      
      if (this.selectedStatus) {
        filtered = filtered.filter(contact => contact.status === this.selectedStatus);
      }
      
      this.filteredContacts = filtered;
      this.currentPage = 1;
      this.selectedContacts = [];
    },
    clearSearch() {
      this.searchQuery = '';
      this.filterContacts();
    },
    getFullName(contact) {
      const firstName = contact.firstName || '';
      const lastName = contact.lastName || '';
      return `${firstName} ${lastName}`.trim() || 'No Name';
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString();
    },
    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedContacts = this.selectedContacts.filter(
          id => !this.paginatedContacts.some(contact => contact._id === id)
        );
      } else {
        const pageContactIds = this.paginatedContacts.map(contact => contact._id);
        this.selectedContacts = [...new Set([...this.selectedContacts, ...pageContactIds])];
      }
    },
    clearSelection() {
      this.selectedContacts = [];
    },
    openModal() {
      this.resetForm();
      this.isModalOpen = true;
    },
    showToast(message, type = 'success') {
      this.toast = { show: true, message, type };
      setTimeout(() => {
        this.hideToast();
      }, 5000);
    },
    hideToast() {
      this.toast.show = false;
    },
    async addContact() {
      if (!this.validateForm()) return;
      
      try {
        this.loading = true;
        if (this.isEditMode) {
          await contactService.update(this.editingContactId, this.newContact);
          this.showToast('Contact updated successfully!');
        } else {
          await contactService.create(this.newContact);
          this.showToast('Contact added successfully!');
        }
        await this.fetchContacts();
        this.resetForm();
        this.isModalOpen = false;
      } catch (error) {
        console.error('Error saving contact:', error);
        this.showToast('Failed to save contact', 'error');
      } finally {
        this.loading = false;
      }
    },
    validateForm() {
      this.validationErrors = {};
      let isValid = true;
      
      if (!this.newContact.email) {
        this.validationErrors.email = 'Email is required';
        isValid = false;
      } else if (!this.isValidEmail(this.newContact.email)) {
        this.validationErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
      
      return isValid;
    },
    validateEmail() {
      if (this.newContact.email && !this.isValidEmail(this.newContact.email)) {
        this.validationErrors.email = 'Please enter a valid email address';
      } else {
        delete this.validationErrors.email;
      }
    },
    validateName(field) {
      const value = this.newContact[field];
      if (value && value.length < 2) {
        this.validationErrors[field] = 'Must be at least 2 characters';
      } else {
        delete this.validationErrors[field];
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    resetForm() {
      this.newContact = {
        email: '',
        firstName: '',
        lastName: '',
        segment: 'general',
        status: 'subscribed',
        tags: []
      };
      this.newTag = '';
      this.validationErrors = {};
      this.isEditMode = false;
      this.editingContactId = null;
    },
    addTag() {
      if (this.newTag.trim() && !this.newContact.tags.includes(this.newTag.trim())) {
        this.newContact.tags.push(this.newTag.trim());
        this.newTag = '';
      }
    },
    removeTag(tag) {
      this.newContact.tags = this.newContact.tags.filter(t => t !== tag);
    },
    editContact(contact) {
      this.isEditMode = true;
      this.editingContactId = contact._id;
      this.newContact = {
        email: contact.email,
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        segment: contact.segment,
        status: contact.status,
        tags: contact.tags || []
      };
      this.validationErrors = {};
      this.isModalOpen = true;
    },
    async deleteContact(contactId) {
      if (confirm('Are you sure you want to delete this contact?')) {
        try {
          this.loading = true;
          await contactService.delete(contactId);
          await this.fetchContacts();
          this.showToast('Contact deleted successfully!');
        } catch (error) {
          console.error('Error deleting contact:', error);
          this.showToast('Failed to delete contact', 'error');
        } finally {
          this.loading = false;
        }
      }
    },
    async bulkDelete() {
      if (confirm(`Are you sure you want to delete ${this.selectedContacts.length} contacts?`)) {
        try {
          this.loading = true;
          await Promise.all(this.selectedContacts.map(id => contactService.delete(id)));
          await this.fetchContacts();
          this.selectedContacts = [];
          this.showToast('Contacts deleted successfully!');
        } catch (error) {
          console.error('Error deleting contacts:', error);
          this.showToast('Failed to delete contacts', 'error');
        } finally {
          this.loading = false;
        }
      }
    },
    triggerImport() {
      this.$refs.fileInput.click();
    },
    async handleFileImport(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      if (!file.name.toLowerCase().endsWith('.csv')) {
        this.showToast('Please select a CSV file', 'error');
        return;
      }
      
      try {
        this.loading = true;
        const result = await contactService.importContacts(file);
        
        // Refresh contacts list
        await this.fetchContacts();
        
        // Show success message with details
        const message = result.imported 
          ? `Successfully imported ${result.imported} contacts!`
          : 'File processed successfully!';
        this.showToast(message);
        
        // Reset file input
        event.target.value = '';
      } catch (error) {
        console.error('Error importing contacts:', error);
        this.showToast(error.response?.data?.error || 'Failed to import contacts', 'error');
      } finally {
        this.loading = false;
      }
    },
    
    downloadSampleCSV() {
      const csvContent = `email,firstName,lastName,segment,status
hamzasindu629@gmail.com,Hamza,Sindu,premium,subscribed
mubashardeveloper65@gmail.com,Mubashar,Developer,general,subscribed
mubashar.smartcomputing@gmail.com,Mubashar,Smart,vip,subscribed
mubasharhussain26a@gmail.com,Mubashar,Hussain,general,subscribed`;
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sample-contacts.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    
    exportContacts() {
      if (this.filteredContacts.length === 0) {
        this.showToast('No contacts to export', 'error');
        return;
      }
      
      const dataToExport = this.selectedContacts.length > 0 
        ? this.allContacts.filter(contact => this.selectedContacts.includes(contact._id))
        : this.filteredContacts;
      
      const headers = ['Email', 'First Name', 'Last Name', 'Segment', 'Status', 'Tags', 'Created Date'];
      const rows = dataToExport.map(contact => [
        contact.email,
        contact.firstName || '',
        contact.lastName || '',
        contact.segment,
        contact.status,
        (contact.tags || []).join(';'),
        this.formatDate(contact.createdAt || contact.addedDate)
      ]);
      
      const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.selectedContacts.length > 0 
        ? `selected-contacts-${new Date().toISOString().split('T')[0]}.csv`
        : `contacts-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      this.showToast(`Exported ${dataToExport.length} contacts successfully!`);
    },
    
    getStatusClass(status) {
      switch(status) {
        case 'subscribed': return 'bg-green-100 text-green-700';
        case 'unsubscribed': return 'bg-red-100 text-red-700';
        case 'bounced': return 'bg-yellow-100 text-yellow-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    }
  }
}
</script>