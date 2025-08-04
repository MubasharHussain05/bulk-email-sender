<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <!-- Main Header -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Campaigns</h1>
        <p class="text-gray-500">Create and manage your email campaigns</p>
      </div>
      <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center hover:bg-blue-600">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        New Campaign
      </button>
    </div>

    <!-- Main Content Area -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[30rem] flex flex-col justify-center items-center p-6">
        
      <!-- No Campaigns View -->
      <div v-if="!hasCampaigns" class="text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">No campaigns yet</h2>
        <p class="text-gray-500 mb-6">Get started by creating your first email campaign</p>
        <button @click="openModal" class="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 flex items-center mx-auto">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
          Create Campaign
        </button>
      </div>
      
      <!-- Campaigns List View -->
      <div v-else class="w-full h-full">
          <div class="grid grid-cols-12 gap-4 text-left text-xs text-gray-500 uppercase font-semibold border-b pb-2 mb-2">
              <div class="col-span-4">Campaign Name</div>
              <div class="col-span-4">Subject</div>
              <div class="col-span-2">Status</div>
              <div class="col-span-2">Actions</div>
          </div>
          <div v-for="(campaign, index) in campaigns" :key="index" class="grid grid-cols-12 gap-4 items-center text-sm text-gray-700 py-3 border-b border-gray-100">
              <div class="col-span-4 font-medium">{{ campaign.name }}</div>
              <div class="col-span-4">{{ campaign.subject }}</div>
              <div class="col-span-2">
                  <span :class="getStatusClass(campaign.status)" class="px-2 py-1 text-xs font-semibold rounded-full capitalize">
                      {{ campaign.status }}
                  </span>
              </div>
              <div class="col-span-2">
                  <button class="text-gray-400 hover:text-blue-500">...</button>
              </div>
          </div>
      </div>
    </div>

    <!-- Create Campaign Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-16 z-50">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Create New Campaign</h2>
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
                <option :value="null" disabled>Select a template</option>
                <option v-for="template in templates" :key="template.id" :value="template.id">{{ template.name }}</option>
              </select>
            </div>
            <div>
              <label for="segment" class="block text-sm font-medium text-gray-700 mb-1">Segment</label>
              <select id="segment" v-model="newCampaign.segment" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option value="all">All Contacts</option>
                <option value="leads">Leads</option>
                <option value="customers">Customers</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select id="status" v-model="newCampaign.status" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                </select>
            </div>
            <div v-if="newCampaign.status === 'scheduled'">
                <label for="scheduledAt" class="block text-sm font-medium text-gray-700 mb-1">Schedule At</label>
                <input type="datetime-local" id="scheduledAt" v-model="newCampaign.scheduledAt" class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
            </div>
          </div>

          <div class="flex justify-end space-x-4 pt-4">
            <button @click="closeModal" type="button" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600">Save Campaign</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Campaigns',
  data() {
    return {
      isModalOpen: false,
      campaigns: [],
      // Dummy data for templates dropdown
      templates: [
          { id: 't1', name: 'Welcome Series Template' },
          { id: 't2', name: 'Monthly Newsletter Template' },
          { id: 't3', name: 'Promotional Offer Template' }
      ],
      newCampaign: {
        name: '',
        subject: '',
        templateId: null,
        segment: 'all',
        status: 'draft',
        scheduledAt: '',
      }
    };
  },
  computed: {
    hasCampaigns() {
      return this.campaigns.length > 0;
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
      this.newCampaign = {
        name: '',
        subject: '',
        templateId: null,
        segment: 'all',
        status: 'draft',
        scheduledAt: '',
      };
    },
    saveCampaign() {
      if (!this.newCampaign.name || !this.newCampaign.subject) {
          alert('Campaign Name and Subject are required.');
          return;
      }
      this.campaigns.push({ ...this.newCampaign });
      console.log('Campaign saved:', this.newCampaign);
      this.closeModal();
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