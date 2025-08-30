<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Sending Campaign</h3>
        <button v-if="!isSending" @click="close" class="text-gray-500 hover:text-gray-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="space-y-4">
        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-blue-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>

        <!-- Status Text -->
        <div class="text-center">
          <p class="text-sm text-gray-600 mb-2">{{ statusText }}</p>
          <p class="text-xs text-gray-500">{{ progressText }}</p>
        </div>

        <!-- Stats -->
        <div v-if="stats" class="grid grid-cols-3 gap-4 text-center">
          <div class="bg-green-50 p-3 rounded">
            <div class="text-lg font-semibold text-green-600">{{ stats.sent || 0 }}</div>
            <div class="text-xs text-green-500">Sent</div>
          </div>
          <div class="bg-red-50 p-3 rounded">
            <div class="text-lg font-semibold text-red-600">{{ stats.bounced || 0 }}</div>
            <div class="text-xs text-red-500">Bounced</div>
          </div>
          <div class="bg-blue-50 p-3 rounded">
            <div class="text-lg font-semibold text-blue-600">{{ stats.total || 0 }}</div>
            <div class="text-xs text-blue-500">Total</div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded p-3">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-2 pt-4">
          <button 
            v-if="!isSending && isComplete" 
            @click="close" 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Done
          </button>
          <button 
            v-if="error && !isSending" 
            @click="retry" 
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emailService } from '../services/emailService';

export default {
  name: 'SendGridProgress',
  props: {
    campaignId: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'complete', 'error'],
  data() {
    return {
      isSending: false,
      isComplete: false,
      stats: null,
      error: null,
      statusText: 'Preparing to send...',
      progressPercentage: 0
    };
  },
  computed: {
    progressText() {
      if (!this.stats) return '';
      const { sent = 0, total = 0 } = this.stats;
      return `${sent} of ${total} emails sent`;
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal && this.campaignId) {
        this.startSending();
      }
    }
  },
  methods: {
    async startSending() {
      this.isSending = true;
      this.isComplete = false;
      this.error = null;
      this.statusText = 'Starting campaign...';
      this.progressPercentage = 0;

      try {
        await emailService.sendCampaign(this.campaignId, this.onProgress);
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to send campaign';
        this.statusText = 'Send failed';
        this.isSending = false;
        this.$emit('error', this.error);
      }
    },

    onProgress(status) {
      if (status.campaign) {
        const campaign = status.campaign;
        this.stats = {
          sent: campaign.sentCount || 0,
          bounced: campaign.bounceCount || 0,
          total: campaign.totalRecipients || 0
        };

        if (this.stats.total > 0) {
          this.progressPercentage = Math.round((this.stats.sent / this.stats.total) * 100);
        }

        switch (campaign.status) {
          case 'sending':
            this.statusText = 'Sending emails...';
            this.isSending = true;
            break;
          case 'sent':
            this.statusText = 'Campaign completed successfully!';
            this.isSending = false;
            this.isComplete = true;
            this.progressPercentage = 100;
            this.$emit('complete', this.stats);
            break;
          case 'failed':
            this.statusText = 'Campaign failed';
            this.error = 'Campaign sending failed';
            this.isSending = false;
            this.$emit('error', this.error);
            break;
        }
      }
    },

    async retry() {
      if (this.campaignId) {
        try {
          await emailService.retryFailedEmails(this.campaignId);
          this.startSending();
        } catch (error) {
          this.error = 'Failed to retry campaign';
        }
      }
    },

    close() {
      this.$emit('close');
    }
  }
};
</script>