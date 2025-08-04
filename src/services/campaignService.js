import api from './api';

export const campaignService = {
  async getAllCampaigns() {
    const response = await api.get('/campaigns');
    return response.data;
  },

  async getCampaign(id) {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },

  async createCampaign(campaignData) {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  },

  async updateCampaign(id, campaignData) {
    const response = await api.put(`/campaigns/${id}`, campaignData);
    return response.data;
  },

  async deleteCampaign(id) {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  },

  async sendCampaign(id) {
    const response = await api.post(`/email/send-campaign/${id}`);
    return response.data;
  },

  async getCampaignStats(id) {
    const response = await api.get(`/campaigns/${id}/stats`);
    return response.data;
  }
};