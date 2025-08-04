<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <!-- Main Header -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Email Templates</h1>
        <p class="text-gray-500">Create and manage your email templates</p>
      </div>
      <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center hover:bg-blue-600">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        New Template
      </button>
    </div>

    <!-- Email Templates Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex justify-between items-center mb-6">
        <div>
            <h2 class="text-xl font-semibold text-gray-800">Email Templates</h2>
            <p class="text-gray-500">Create and manage your email templates</p>
        </div>
        <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center hover:bg-blue-600">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
          New Template
        </button>
      </div>

      <!-- Templates View -->
      <div class="min-h-[20rem] flex flex-col justify-center items-center">
        <!-- No Templates Found View -->
        <div v-if="!hasTemplates" class="text-center">
          <p class="text-gray-500 mb-4">No templates found</p>
          <button @click="openModal" class="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">
            Create your first template
          </button>
        </div>
        
        <!-- Templates List View -->
        <div v-else class="w-full">
            <div class="grid grid-cols-12 gap-4 text-left text-xs text-gray-500 uppercase font-semibold border-b pb-2 mb-2">
                <div class="col-span-5">Template Name</div>
                <div class="col-span-5">Subject Line</div>
                <div class="col-span-2">Actions</div>
            </div>
            <div v-for="(template, index) in templates" :key="index" class="grid grid-cols-12 gap-4 items-center text-sm text-gray-700 py-3 border-b border-gray-100">
                <div class="col-span-5 font-medium">{{ template.name }}</div>
                <div class="col-span-5">{{ template.subject }}</div>
                <div class="col-span-2">
                    <button class="text-gray-400 hover:text-blue-500">...</button>
                </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Template Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-16 z-50">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Edit Template</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="saveTemplate">
          <div class="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label for="templateName" class="block text-sm font-medium text-gray-700 mb-1">Template Name <span class="text-red-500">*</span></label>
                <input type="text" id="templateName" v-model="newTemplate.name" class="w-full border-2 border-blue-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Enter template name" required>
              </div>
              <div>
                <label for="subjectLine" class="block text-sm font-medium text-gray-700 mb-1">Subject Line <span class="text-red-500">*</span></label>
                <input type="text" id="subjectLine" v-model="newTemplate.subject" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Enter email subject" required>
              </div>
          </div>
          
          <div class="mb-4">
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input type="text" id="description" v-model="newTemplate.description" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Brief description of this template">
          </div>
          
          <!-- Content Tabs -->
          <div class="mb-4">
            <div class="flex border-b">
                <button 
                    type="button" 
                    @click="activeTab = 'html'" 
                    :class="['px-4 py-2 text-sm font-medium', activeTab === 'html' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700']">
                    HTML Content
                </button>
                <button 
                    type="button" 
                    @click="activeTab = 'text'" 
                    :class="['px-4 py-2 text-sm font-medium', activeTab === 'text' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700']">
                    Text Content
                </button>
            </div>
          </div>
          
          <!-- HTML Content -->
          <div v-if="activeTab === 'html'" class="mb-6">
            <label for="htmlContent" class="block text-sm font-medium text-gray-700 mb-1">HTML Content <span class="text-red-500">*</span></label>
            <textarea id="htmlContent" v-model="newTemplate.htmlContent" rows="10" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono text-sm" placeholder="Enter HTML content" required></textarea>
          </div>

          <!-- Text Content -->
          <div v-if="activeTab === 'text'" class="mb-6">
            <label for="textContent" class="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
            <textarea id="textContent" v-model="newTemplate.textContent" rows="10" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono text-sm" placeholder="Enter plain text content"></textarea>
          </div>

          <div class="flex justify-end space-x-4">
            <button @click="closeModal" type="button" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600">Save Template</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Templates',
  data() {
    return {
      isModalOpen: false,
      activeTab: 'html', // 'html' or 'text'
      templates: [], // To store the list of created templates
      newTemplate: {
        name: '',
        subject: '',
        description: '',
        htmlContent: '',
        textContent: ''
      }
    };
  },
  computed: {
    hasTemplates() {
      return this.templates.length > 0;
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.resetForm();
    },
    resetForm() {
      this.newTemplate = {
        name: '',
        subject: '',
        description: '',
        htmlContent: '',
        textContent: ''
      };
      this.activeTab = 'html';
    },
    saveTemplate() {
      // Create a copy of the new template data and add it to the list
      this.templates.push({ ...this.newTemplate });
      console.log('Template saved:', this.newTemplate);
      this.closeModal();
    }
  }
}
</script>```