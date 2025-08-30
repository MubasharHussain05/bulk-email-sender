<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
    <!-- Main Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Campaigns</h1>
        <p class="text-gray-500 text-sm sm:text-base">Create and manage your email campaigns</p>
      </div>
      <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center hover:bg-blue-600 w-full sm:w-auto">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        <span class="hidden sm:inline">New Campaign</span>
        <span class="sm:hidden">New</span>
      </button>
    </div>

    <!-- Main Content Area -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[30rem] flex flex-col justify-center items-center p-4 sm:p-6">
        
      <!-- Loading State -->
      <div v-if="loading" class="text-center text-gray-500">
        Loading campaigns...
      </div>
      
      <!-- No Campaigns View -->
      <div v-else-if="!hasCampaigns" class="text-center">
        <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </div>
        <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No campaigns yet</h2>
        <p class="text-gray-500 mb-6 text-sm sm:text-base px-4">Get started by creating your first email campaign</p>
        <button @click="openModal" class="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 flex items-center mx-auto">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
          Create Campaign
        </button>
      </div>
      
      <!-- Campaigns List View -->
      <div v-else class="w-full h-full">
          <!-- Desktop Table Header -->
          <div class="hidden md:grid grid-cols-12 gap-4 text-left text-xs text-gray-500 uppercase font-semibold border-b pb-2 mb-2">
              <div class="col-span-4">Campaign Name</div>
              <div class="col-span-4">Subject</div>
              <div class="col-span-2">Status</div>
              <div class="col-span-2">Actions</div>
          </div>
          
          <!-- Desktop Table Rows -->
          <div class="hidden md:block">
            <div v-for="(campaign, index) in campaigns" :key="index" class="grid grid-cols-12 gap-4 items-center text-sm text-gray-700 py-3 border-b border-gray-100">
                <div class="col-span-4 font-medium">{{ campaign.name }}</div>
                <div class="col-span-4">{{ campaign.subject }}</div>
                <div class="col-span-2">
                    <span :class="getStatusClass(campaign.status)" class="px-2 py-1 text-xs font-semibold rounded-full capitalize">
                        {{ campaign.status }}
                    </span>
                </div>
                <div class="col-span-2 flex space-x-1">
                    <button v-if="campaign.status === 'draft' || campaign.status === 'scheduled'" @click="sendCampaign(campaign._id)" class="text-green-500 hover:text-green-700" title="Send Campaign">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    </button>
                    <button @click="editCampaign(campaign)" class="text-blue-500 hover:text-blue-700" title="Edit Campaign">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button @click="deleteCampaign(campaign._id)" class="text-red-500 hover:text-red-700" title="Delete Campaign">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
          </div>
          
          <!-- Mobile Card Layout -->
          <div class="md:hidden space-y-4">
            <div v-for="(campaign, index) in campaigns" :key="index" class="bg-gray-50 rounded-lg p-4 border">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-medium text-gray-900 text-sm">{{ campaign.name }}</h3>
                    <div class="flex ml-2 space-x-1">
                        <button v-if="campaign.status === 'draft' || campaign.status === 'scheduled'" @click="sendCampaign(campaign._id)" class="text-green-500 hover:text-green-700">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                        </button>
                        <button @click="editCampaign(campaign)" class="text-blue-500 hover:text-blue-700">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button @click="deleteCampaign(campaign._id)" class="text-red-500 hover:text-red-700">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </div>
                <p class="text-gray-600 text-sm mb-3">{{ campaign.subject }}</p>
                <div class="flex justify-between items-center">
                    <span :class="getStatusClass(campaign.status)" class="px-2 py-1 text-xs font-semibold rounded-full capitalize">
                        {{ campaign.status }}
                    </span>
                </div>
            </div>
          </div>
      </div>
    </div>

    <!-- Create Campaign Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-4 sm:pt-16 z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl p-4 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4 sm:mb-6">
          <h2 class="text-lg sm:text-xl font-bold text-gray-800">{{ isEditMode ? 'Edit Campaign' : 'Create New Campaign' }}</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="saveCampaign" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="campaignName" class="block text-sm font-medium text-gray-700 mb-1">Campaign Name <span class="text-red-500">*</span></label>
              <input type="text" id="campaignName" v-model="newCampaign.name" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" required>
            </div>
            <div>
              <label for="subjectLine" class="block text-sm font-medium text-gray-700 mb-1">Subject Line <span class="text-red-500">*</span></label>
              <input type="text" id="subjectLine" v-model="newCampaign.subject" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" required>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="templateId" class="block text-sm font-medium text-gray-700 mb-1">Email Template</label>
              <select id="templateId" v-model="newCampaign.templateId" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option value="">Select a template</option>
                <option v-for="template in templates" :key="template._id" :value="template._id">{{ template.name }}</option>
              </select>
            </div>
            <div>
              <label for="segment" class="block text-sm font-medium text-gray-700 mb-1">Segment</label>
              <select id="segment" v-model="newCampaign.segment" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option value="all">All Contacts</option>
                <option value="general">General</option>
                <option value="leads">Leads</option>
                <option value="customers">Customers</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>
          </div>
          
          <div v-if="!newCampaign.templateId">
            <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Email Content <span class="text-red-500">*</span></label>
            <textarea id="content" v-model="newCampaign.content" rows="6" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Enter your email content here..."></textarea>
            <p class="text-xs text-gray-500 mt-1">You can use HTML tags and variables like {{firstName}}, {{lastName}}, {{email}}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select id="status" v-model="newCampaign.status" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <option value="sent">Send Now</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                </select>
            </div>
            <div v-if="newCampaign.status === 'scheduled'">
                <label for="scheduledAt" class="block text-sm font-medium text-gray-700 mb-1">Schedule At</label>
                <input type="datetime-local" id="scheduledAt" v-model="newCampaign.scheduledAt" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
            <button @click="closeModal" type="button" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 order-2 sm:order-1">Cancel</button>
            <button type="submit" :disabled="loading" class="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 disabled:opacity-50 order-1 sm:order-2">
              {{ loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Campaign' : 'Save Campaign') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- SendGrid Progress Modal -->
    <SendGridProgress 
      :campaign-id="sendingCampaignId"
      :is-visible="showSendProgress"
      @close="closeSendProgress"
      @complete="onSendComplete"
      @error="onSendError"
    />
  </div>
</template>

<script>
import { campaignService } from '../services/campaignService';
import { templateService } from '../services/templateService';
import { emailService } from '../services/emailService';
import SendGridProgress from '../components/SendGridProgress.vue';

export default {
  name: 'Campaigns',
  components: {
    SendGridProgress
  },
  data() {
    return {
      isModalOpen: false,
      isEditMode: false,
      editingCampaignId: null,
      campaigns: [],
      templates: [],
      loading: false,
      newCampaign: {
        name: '',
        subject: '',
        content: '',
        templateId: '',
        segment: 'all',
        status: 'sent',
        scheduledAt: ''
      },
      sendingCampaignId: null,
      showSendProgress: false
    };
  },
  async mounted() {
    await this.fetchCampaigns();
    await this.fetchTemplates();
  },
  computed: {
    hasCampaigns() {
      return this.campaigns.length > 0;
    }
  },
  methods: {
    async fetchCampaigns() {
      try {
        this.loading = true;
        this.campaigns = await campaignService.getAll();
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        alert('Failed to load campaigns');
      } finally {
        this.loading = false;
      }
    },
    async fetchTemplates() {
      try {
        this.templates = await templateService.getAll();
      } catch (error) {
        console.error('Error fetching templates:', error);
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
      this.newCampaign = {
        name: '',
        subject: '',
        content: '',
        templateId: '',
        segment: 'all',
        status: 'sent',
        scheduledAt: ''
      };
      this.isEditMode = false;
      this.editingCampaignId = null;
    },
    async saveCampaign() {
      if (!this.newCampaign.name || !this.newCampaign.subject) {
        alert('Campaign Name and Subject are required.');
        return;
      }
      if (!this.newCampaign.templateId && !this.newCampaign.content) {
        alert('Either select a template or provide email content.');
        return;
      }
      try {
        this.loading = true;
        const campaignData = { ...this.newCampaign };
        if (campaignData.templateId === '') delete campaignData.templateId;
        if (campaignData.scheduledAt === '') delete campaignData.scheduledAt;
        
        let savedCampaign;
        if (this.isEditMode) {
          savedCampaign = await campaignService.update(this.editingCampaignId, campaignData);
        } else {
          savedCampaign = await campaignService.create(campaignData);
        }
        
        // If status is 'sent', send the campaign immediately
        if (campaignData.status === 'sent') {
          const campaignId = savedCampaign._id || savedCampaign.id || this.editingCampaignId;
          if (confirm('This will send the campaign immediately. Are you sure?')) {
            try {
              const result = await campaignService.send(campaignId);
              alert(`Campaign sent successfully! ${result.results?.successCount || 0} emails sent.`);
            } catch (sendError) {
              console.error('Error sending campaign:', sendError);
              alert('Campaign saved but failed to send: ' + (sendError.response?.data?.message || sendError.message));
            }
          } else {
            // If user cancels sending, update status to draft
            await campaignService.update(campaignId, { status: 'draft' });
          }
        }
        
        await this.fetchCampaigns();
        this.closeModal();
      } catch (error) {
        console.error('Error saving campaign:', error);
        alert('Failed to save campaign: ' + (error.response?.data?.message || error.message));
      } finally {
        this.loading = false;
      }
    },
    editCampaign(campaign) {
      this.isEditMode = true;
      this.editingCampaignId = campaign._id;
      this.newCampaign = {
        name: campaign.name,
        subject: campaign.subject,
        content: campaign.content || '',
        templateId: campaign.templateId || '',
        segment: campaign.segment || 'all',
        status: campaign.status || 'sent',
        scheduledAt: campaign.scheduledAt ? new Date(campaign.scheduledAt).toISOString().slice(0, 16) : ''
      };
      this.isModalOpen = true;
    },
    async deleteCampaign(campaignId) {
      if (confirm('Are you sure you want to delete this campaign?')) {
        try {
          this.loading = true;
          await campaignService.delete(campaignId);
          await this.fetchCampaigns();
        } catch (error) {
          console.error('Error deleting campaign:', error);
          alert('Failed to delete campaign');
        } finally {
          this.loading = false;
        }
      }
    },
    async sendCampaign(campaignId) {
      if (confirm('Are you sure you want to send this campaign? This action cannot be undone.')) {
        try {
          this.loading = true;
          this.sendingCampaignId = campaignId;
          this.showSendProgress = true;
          
          const result = await campaignService.send(campaignId);
          
          // Show success message
          const successCount = result.results?.successCount || result.successCount || 0;
          const failureCount = result.results?.failureCount || result.failureCount || 0;
          
          let message = `Campaign sent successfully!`;
          if (successCount > 0) message += ` ${successCount} emails sent.`;
          if (failureCount > 0) message += ` ${failureCount} failed.`;
          
          alert(message);
          await this.fetchCampaigns();
          
        } catch (error) {
          console.error('Error sending campaign:', error);
          const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
          alert('Failed to send campaign: ' + errorMessage);
        } finally {
          this.loading = false;
          this.showSendProgress = false;
          this.sendingCampaignId = null;
        }
      }
    },

    onSendComplete(stats) {
      console.log('Campaign sent successfully:', stats);
      this.fetchCampaigns();
    },

    onSendError(error) {
      console.error('Campaign send error:', error);
    },

    closeSendProgress() {
      this.showSendProgress = false;
      this.sendingCampaignId = null;
      this.fetchCampaigns();
    },
    getStatusClass(status) {
      switch(status) {
        case 'sent': return 'bg-green-100 text-green-700';
        case 'sending': return 'bg-blue-100 text-blue-700';
        case 'scheduled': return 'bg-purple-100 text-purple-700';
        case 'failed': return 'bg-red-100 text-red-700';
        case 'draft': 
        default:
          return 'bg-yellow-100 text-yellow-700';
      }
    }
  }
}
</script>