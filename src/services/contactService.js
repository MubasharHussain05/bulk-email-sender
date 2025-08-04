import api from './api';

export const contactService = {
  async getAllContacts() {
    const response = await api.get('/contacts');
    return response.data;
  },

  async getContact(id) {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  async createContact(contactData) {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },

  async updateContact(id, contactData) {
    const response = await api.put(`/contacts/${id}`, contactData);
    return response.data;
  },

  async deleteContact(id) {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },

  async importContacts(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/contacts/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async getContactsBySegment(segment) {
    const response = await api.get(`/contacts?segment=${segment}`);
    return response.data;
  }
};