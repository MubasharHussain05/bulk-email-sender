import api from './api';

export const templateService = {
  async getAllTemplates() {
    const response = await api.get('/templates');
    return response.data;
  },

  async getTemplate(id) {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  },

  async createTemplate(templateData) {
    const response = await api.post('/templates', templateData);
    return response.data;
  },

  async updateTemplate(id, templateData) {
    const response = await api.put(`/templates/${id}`, templateData);
    return response.data;
  },

  async deleteTemplate(id) {
    const response = await api.delete(`/templates/${id}`);
    return response.data;
  },

  async previewTemplate(id, data = {}) {
    const response = await api.post(`/templates/${id}/preview`, data);
    return response.data;
  }
};