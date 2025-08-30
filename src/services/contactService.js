import api from './api';

export const contactService = {
  async getAll() {
    const response = await api.get('/contacts');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  async create(contactData) {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },

  async update(id, contactData) {
    const response = await api.put(`/contacts/${id}`, contactData);
    return response.data;
  },

  async delete(id) {
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
  },

  async bulkUpdate(contactIds, updateData) {
    const response = await api.put('/contacts/bulk-update', {
      contactIds,
      updateData
    });
    return response.data;
  },

  async bulkDelete(contactIds) {
    const response = await api.delete('/contacts/bulk-delete', {
      data: { contactIds }
    });
    return response.data;
  },

  async getSegments() {
    const response = await api.get('/contacts/segments');
    return response.data;
  }
};