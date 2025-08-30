import api from './api';

export const emailService = {
  async sendCampaign(campaignId, onProgress = null) {
    const response = await api.post(`/email/send-campaign/${campaignId}`);
    
    // If progress callback provided, poll for status updates
    if (onProgress && typeof onProgress === 'function') {
      this.pollCampaignProgress(campaignId, onProgress);
    }
    
    return response.data;
  },

  async pollCampaignProgress(campaignId, onProgress, interval = 2000) {
    const pollStatus = async () => {
      try {
        const status = await this.getDeliveryStatus(campaignId);
        onProgress(status);
        
        // Continue polling if campaign is still sending
        if (status.campaign?.status === 'sending') {
          setTimeout(pollStatus, interval);
        }
      } catch (error) {
        console.error('Error polling campaign status:', error);
      }
    };
    
    // Start polling after a short delay
    setTimeout(pollStatus, 1000);
  },

  async sendTestEmail(templateId, testEmail) {
    const response = await api.post('/email/send-test', {
      templateId,
      testEmail
    });
    return response.data;
  },

  async sendPersonalizedTestEmail(templateId, contactId, testEmail) {
    const response = await api.post('/email/send-personalized-test', {
      templateId,
      contactId,
      testEmail
    });
    return response.data;
  },

  async getEmailEvents(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/email/events?${params}`);
    return response.data;
  },

  async getDeliveryStatus(campaignId) {
    const response = await api.get(`/email/delivery-status/${campaignId}`);
    return response.data;
  },

  async getCampaignStats(campaignId) {
    const response = await api.get(`/campaigns/${campaignId}/stats`);
    return response.data;
  },

  async validateSendGridConfig() {
    const response = await api.get('/email/validate-config');
    return response.data;
  },

  async getBouncedEmails(campaignId) {
    const response = await api.get(`/email/bounced/${campaignId}`);
    return response.data;
  },

  async retryFailedEmails(campaignId) {
    const response = await api.post(`/email/retry-failed/${campaignId}`);
    return response.data;
  }
};