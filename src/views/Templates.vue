<template>
  <div class="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
    <!-- Main Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Email Templates</h1>
        <p class="text-gray-500 text-sm sm:text-base">Create and manage your email templates</p>
      </div>
      <button @click="openModal" class="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 w-full sm:w-auto">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        <span class="hidden sm:inline">New Template</span>
        <span class="sm:hidden">New</span>
      </button>
    </div>
    <!-- Email Templates Card -->
    <div class="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="hidden sm:flex items-center justify-between mb-6">
        <div>
            <h2 class="text-xl font-semibold text-gray-800">Email Templates</h2>
            <p class="text-gray-500">Create and manage your email templates</p>
        </div>
        <button @click="openModal" class="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
          New Template
        </button>
      </div>

      <!-- Templates View -->
      <div class="min-h-[20rem] flex flex-col justify-center items-center">
        <!-- Loading State -->
        <div v-if="loading" class="text-center text-gray-500">
          Loading templates...
        </div>
        
        <!-- No Templates Found View -->
        <div v-else-if="!hasTemplates" class="text-center">
          <p class="mb-4 text-gray-500 text-sm sm:text-base">No templates found</p>
          <button @click="openModal" class="px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Create your first template
          </button>
        </div>
        
        <!-- Templates List View -->
        <div v-else class="w-full">
            <!-- Desktop Table Header -->
            <div class="hidden md:grid grid-cols-12 gap-4 pb-2 mb-2 text-xs font-semibold text-left text-gray-500 uppercase border-b">
                <div class="col-span-5">Template Name</div>
                <div class="col-span-5">Subject Line</div>
                <div class="col-span-2">Actions</div>
            </div>
            
            <!-- Desktop Table Rows -->
            <div class="hidden md:block">
              <div v-for="(template, index) in templates" :key="index" class="grid items-center grid-cols-12 gap-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                  <div class="col-span-5 font-medium">{{ template.name }}</div>
                  <div class="col-span-5">{{ template.subject }}</div>
                  <div class="col-span-2 flex space-x-2">
                      <button @click="openTestModal(template)" class="text-green-500 hover:text-green-700" title="Test Email">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                      </button>
                      <button @click="editTemplate(template)" class="text-blue-500 hover:text-blue-700" title="Edit Template">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button @click="deleteTemplate(template._id)" class="text-red-500 hover:text-red-700" title="Delete Template">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                  </div>
              </div>
            </div>
            
            <!-- Mobile Card Layout -->
            <div class="md:hidden space-y-4">
              <div v-for="(template, index) in templates" :key="index" class="bg-gray-50 rounded-lg p-4 border">
                  <div class="flex justify-between items-start mb-2">
                      <h3 class="font-medium text-gray-900 text-sm">{{ template.name }}</h3>
                      <div class="flex ml-2 space-x-2">
                          <button @click="openTestModal(template)" class="text-green-500 hover:text-green-700">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                          </button>
                          <button @click="editTemplate(template)" class="text-blue-500 hover:text-blue-700">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button @click="deleteTemplate(template._id)" class="text-red-500 hover:text-red-700">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                      </div>
                  </div>
                  <p class="text-gray-600 text-sm">{{ template.subject }}</p>
              </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Template Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-16 bg-black bg-opacity-50 p-4">
      <div class="w-full max-w-3xl p-4 sm:p-8 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <h2 class="text-lg sm:text-xl font-bold text-gray-800">{{ isEditMode ? 'Edit Template' : 'New Template' }}</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="saveTemplate">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
              <div>
                <label for="templateName" class="block mb-1 text-sm font-medium text-gray-700">Template Name <span class="text-red-500">*</span></label>
                <input type="text" id="templateName" v-model="newTemplate.name" class="w-full p-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Enter template name" required>
              </div>
              <div>
                <label for="subjectLine" class="block mb-1 text-sm font-medium text-gray-700">Subject Line <span class="text-red-500">*</span></label>
                <input type="text" id="subjectLine" v-model="newTemplate.subject" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Enter email subject" required>
              </div>
          </div>
          
          <div class="mb-4">
              <label for="description" class="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <input type="text" id="description" v-model="newTemplate.description" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Brief description of this template">
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
            <label for="htmlContent" class="block mb-1 text-sm font-medium text-gray-700">HTML Content <span class="text-gray-400">(Optional)</span></label>
            <div class="mb-2 text-xs text-gray-500">
              Available placeholders: {{firstName}}, {{lastName}}, {{email}}, {{segment}}
            </div>
            <textarea id="htmlContent" v-model="newTemplate.htmlContent" rows="10" class="w-full p-2 font-mono text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="<html><body><h1>Hello {{firstName}}!</h1><p>Welcome {{firstName}} {{lastName}} to our service.</p></body></html>"></textarea>
          </div>

          <!-- Text Content -->
          <div v-if="activeTab === 'text'" class="mb-6">
            <label for="textContent" class="block mb-1 text-sm font-medium text-gray-700">Text Content <span class="text-gray-400">(Optional)</span></label>
            <div class="mb-2 text-xs text-gray-500">
              Available placeholders: {{firstName}}, {{lastName}}, {{email}}, {{segment}}
            </div>
            <textarea id="textContent" v-model="newTemplate.textContent" rows="10" class="w-full p-2 font-mono text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Hello {{firstName}}! Welcome {{firstName}} {{lastName}} to our service."></textarea>
          </div>

          <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <button @click="closeModal" type="button" class="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1">Cancel</button>
            <button type="submit" :disabled="loading" class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 order-1 sm:order-2">
              {{ loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Template' : 'Save Template') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Test Email Modal -->
    <div v-if="isTestModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-gray-800">Test Email</h2>
          <button @click="closeTestModal" class="text-gray-500 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="sendTestEmail">
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Template</label>
            <p class="text-sm text-gray-600 bg-gray-50 p-2 rounded">{{ testTemplate?.name }}</p>
          </div>
          
          <div class="mb-4">
            <label for="testEmail" class="block mb-2 text-sm font-medium text-gray-700">Test Email Address</label>
            <input type="email" id="testEmail" v-model="testEmailData.email" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Enter test email" required>
          </div>
          
          <div class="mb-4">
            <label for="testContact" class="block mb-2 text-sm font-medium text-gray-700">Personalize with Contact (Optional)</label>
            <select id="testContact" v-model="testEmailData.contactId" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option value="">No personalization</option>
              <option v-for="contact in contacts" :key="contact._id" :value="contact._id">
                {{ contact.firstName }} {{ contact.lastName }} ({{ contact.email }})
              </option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button @click="closeTestModal" type="button" class="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" :disabled="testLoading" class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50">
              {{ testLoading ? 'Sending...' : 'Send Test' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { templateService } from '../services/templateService';
import { emailService } from '../services/emailService';
import { contactService } from '../services/contactService';

export default {
  name: 'Templates',
  data() {
    return {
      isModalOpen: false,
      isEditMode: false,
      editingTemplateId: null,
      activeTab: 'html',
      templates: [],
      loading: false,
      newTemplate: {
        name: '',
        subject: '',
        description: '',
        htmlContent: '',
        textContent: ''
      },
      isTestModalOpen: false,
      testTemplate: null,
      testLoading: false,
      contacts: [],
      testEmailData: {
        email: '',
        contactId: ''
      }
    };
  },
  computed: {
    hasTemplates() {
      return this.templates.length > 0;
    }
  },
  async mounted() {
    await this.fetchTemplates();
    await this.fetchContacts();
  },
  methods: {
    async fetchTemplates() {
      try {
        this.loading = true;
        this.templates = await templateService.getAll();
      } catch (error) {
        console.error('Error fetching templates:', error);
        alert('Failed to load templates');
      } finally {
        this.loading = false;
      }
    },
    async fetchContacts() {
      try {
        this.contacts = await contactService.getAll();
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    },
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
      this.isEditMode = false;
      this.editingTemplateId = null;
      this.activeTab = 'html';
    },
    async saveTemplate() {
      if (!this.newTemplate.name || !this.newTemplate.subject) {
        alert('Name and Subject are required.');
        return;
      }
      try {
        this.loading = true;
        if (this.isEditMode) {
          await templateService.update(this.editingTemplateId, this.newTemplate);
        } else {
          await templateService.create(this.newTemplate);
        }
        await this.fetchTemplates();
        this.closeModal();
      } catch (error) {
        console.error('Error saving template:', error);
        alert('Failed to save template');
      } finally {
        this.loading = false;
      }
    },
    editTemplate(template) {
      this.isEditMode = true;
      this.editingTemplateId = template._id;
      this.newTemplate = {
        name: template.name,
        subject: template.subject,
        description: template.description || '',
        htmlContent: template.htmlContent,
        textContent: template.textContent || ''
      };
      this.isModalOpen = true;
    },
    async deleteTemplate(templateId) {
      if (confirm('Are you sure you want to delete this template?')) {
        try {
          this.loading = true;
          await templateService.delete(templateId);
          await this.fetchTemplates();
        } catch (error) {
          console.error('Error deleting template:', error);
          alert('Failed to delete template');
        } finally {
          this.loading = false;
        }
      }
    },
    openTestModal(template) {
      this.testTemplate = template;
      this.testEmailData = {
        email: '',
        contactId: ''
      };
      this.isTestModalOpen = true;
    },
    closeTestModal() {
      this.isTestModalOpen = false;
      this.testTemplate = null;
    },
    async sendTestEmail() {
      try {
        this.testLoading = true;
        
        if (this.testEmailData.contactId) {
          await emailService.sendPersonalizedTestEmail(
            this.testTemplate._id,
            this.testEmailData.contactId,
            this.testEmailData.email
          );
          alert('Personalized test email sent successfully!');
        } else {
          await emailService.sendTestEmail(
            this.testTemplate._id,
            this.testEmailData.email
          );
          alert('Test email sent successfully!');
        }
        
        this.closeTestModal();
      } catch (error) {
        console.error('Error sending test email:', error);
        alert('Failed to send test email');
      } finally {
        this.testLoading = false;
      }
    }
  }
}
</script>```