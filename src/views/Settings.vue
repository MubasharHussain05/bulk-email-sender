<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Settings</h1>
      <p class="text-gray-500 mb-8 text-sm sm:text-base">Configure your email service settings</p>
      
      <!-- Email Configuration -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Email Configuration</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">SendGrid Status</h3>
            <div class="flex items-center space-x-3 mb-4">
              <div :class="configStatus.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                   class="px-3 py-1 rounded-full text-sm font-medium">
                {{ configStatus.valid ? 'Connected' : 'Not Connected' }}
              </div>
              <button @click="validateConfig" :disabled="loading" 
                      class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 disabled:opacity-50">
                {{ loading ? 'Checking...' : 'Test Connection' }}
              </button>
            </div>
            <p class="text-sm text-gray-600">{{ configStatus.message }}</p>
          </div>
          
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Test Email</h3>
            <div class="space-y-3">
              <input type="email" v-model="testEmail" placeholder="Enter test email address" 
                     class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
              <button @click="sendTestEmail" :disabled="!testEmail || testLoading" 
                      class="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50">
                {{ testLoading ? 'Sending...' : 'Send Test Email' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Email Templates Testing -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Template Testing</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Template</label>
            <select v-model="selectedTemplate" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option value="">Choose a template</option>
              <option v-for="template in templates" :key="template._id" :value="template._id">
                {{ template.name }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Test with Contact (Optional)</label>
            <select v-model="selectedContact" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option value="">No personalization</option>
              <option v-for="contact in contacts" :key="contact._id" :value="contact._id">
                {{ contact.firstName }} {{ contact.lastName }} ({{ contact.email }})
              </option>
            </select>
          </div>
        </div>
        
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Test Email Address</label>
          <div class="flex space-x-3">
            <input type="email" v-model="templateTestEmail" placeholder="Enter test email address" 
                   class="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
            <button @click="sendTemplateTest" :disabled="!selectedTemplate || !templateTestEmail || templateTestLoading" 
                    class="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50">
              {{ templateTestLoading ? 'Sending...' : 'Send Template Test' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emailService } from '../services/emailService';
import { templateService } from '../services/templateService';
import { contactService } from '../services/contactService';

export default {
  name: 'Settings',
  data() {
    return {
      loading: false,
      testLoading: false,
      templateTestLoading: false,
      testEmail: '',
      templateTestEmail: '',
      selectedTemplate: '',
      selectedContact: '',
      templates: [],
      contacts: [],
      configStatus: {
        valid: false,
        message: 'Click "Test Connection" to check SendGrid configuration'
      }
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const [templatesData, contactsData] = await Promise.all([
          templateService.getAll(),
          contactService.getAll()
        ]);
        this.templates = templatesData;
        this.contacts = contactsData;
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    async validateConfig() {
      try {
        this.loading = true;
        const result = await emailService.validateSendGridConfig();
        this.configStatus = {
          valid: result.valid,
          message: result.message
        };
      } catch (error) {
        this.configStatus = {
          valid: false,
          message: error.response?.data?.message || 'Failed to validate configuration'
        };
      } finally {
        this.loading = false;
      }
    },
    async sendTestEmail() {
      try {
        this.testLoading = true;
        // Create a simple test template
        const testTemplate = {
          name: 'Test Email',
          subject: 'Test Email from Bulk Email Service',
          htmlContent: '<html><body><h1>Test Email</h1><p>This is a test email to verify your SendGrid configuration is working correctly.</p></body></html>',
          textContent: 'Test Email - This is a test email to verify your SendGrid configuration is working correctly.'
        };
        
        // Create temporary template
        const template = await templateService.create(testTemplate);
        
        // Send test email
        await emailService.sendTestEmail(template._id, this.testEmail);
        
        // Clean up temporary template
        await templateService.delete(template._id);
        
        alert('Test email sent successfully!');
      } catch (error) {
        console.error('Error sending test email:', error);
        alert('Failed to send test email: ' + (error.response?.data?.message || error.message));
      } finally {
        this.testLoading = false;
      }
    },
    async sendTemplateTest() {
      try {
        this.templateTestLoading = true;
        
        if (this.selectedContact) {
          await emailService.sendPersonalizedTestEmail(
            this.selectedTemplate,
            this.selectedContact,
            this.templateTestEmail
          );
          alert('Personalized template test email sent successfully!');
        } else {
          await emailService.sendTestEmail(
            this.selectedTemplate,
            this.templateTestEmail
          );
          alert('Template test email sent successfully!');
        }
      } catch (error) {
        console.error('Error sending template test:', error);
        alert('Failed to send template test: ' + (error.response?.data?.message || error.message));
      } finally {
        this.templateTestLoading = false;
      }
    }
  }
}
</script>