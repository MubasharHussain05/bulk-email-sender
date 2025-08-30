import api from './api';

export const campaignService = {
  async getAll() {
    const response = await api.get('/campaigns');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },

  async create(campaignData) {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  },

  async update(id, campaignData) {
    const response = await api.put(`/campaigns/${id}`, campaignData);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  },

  async send(id) {
    console.log('🚀 Sending campaign:', id);
    console.log('📡 API endpoint:', `/email/send-campaign/${id}`);
    
    try {
      const response = await api.post(`/email/send-campaign/${id}`);
      console.log('✅ Campaign send response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Campaign send error:', error.response?.data || error.message);
      throw error;
    }
  },

  async schedule(id, scheduledAt) {
    const response = await api.put(`/campaigns/${id}`, {
      status: 'scheduled',
      scheduledAt
    });
    return response.data;
  },

  async pause(id) {
    const response = await api.put(`/campaigns/${id}`, {
      status: 'paused'
    });
    return response.data;
  },

  async resume(id) {
    const response = await api.put(`/campaigns/${id}`, {
      status: 'active'
    });
    return response.data;
  },

  async duplicate(id) {
    const response = await api.post(`/campaigns/${id}/duplicate`);
    return response.data;
  },

  async getStats(id) {
    const response = await api.get(`/campaigns/${id}/stats`);
    return response.data;
  }
};