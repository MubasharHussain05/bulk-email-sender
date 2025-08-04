import api from './api';

export const analyticsService = {
  async getDashboardStats() {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  async getCampaignAnalytics(campaignId) {
    const response = await api.get(`/analytics/campaigns/${campaignId}`);
    return response.data;
  },

  async getEmailEvents(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/analytics/events?${params}`);
    return response.data;
  },

  async getPerformanceMetrics(dateRange = '30d') {
    const response = await api.get(`/analytics/performance?range=${dateRange}`);
    return response.data;
  },

  async getEngagementStats() {
    const response = await api.get('/analytics/engagement');
    return response.data;
  }
};