import { defineStore } from 'pinia'
import { contactService } from '../services'

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    contacts: [],
    loading: false,
    selectedContact: null
  }),

  getters: {
    contactsBySegment: (state) => (segment) => {
      return state.contacts.filter(contact => contact.segment === segment)
    },
    subscribedContacts: (state) => {
      return state.contacts.filter(contact => contact.status === 'subscribed')
    }
  },

  actions: {
    async fetchContacts() {
      this.loading = true
      try {
        this.contacts = await contactService.getAll()
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async createContact(contactData) {
      try {
        const newContact = await contactService.create(contactData)
        this.contacts.push(newContact)
        return { success: true, contact: newContact }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Failed to create contact' }
      }
    },

    async updateContact(id, contactData) {
      try {
        const updatedContact = await contactService.update(id, contactData)
        const index = this.contacts.findIndex(c => c._id === id)
        if (index !== -1) {
          this.contacts[index] = updatedContact
        }
        return { success: true, contact: updatedContact }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Failed to update contact' }
      }
    },

    async deleteContact(id) {
      try {
        await contactService.delete(id)
        this.contacts = this.contacts.filter(c => c._id !== id)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Failed to delete contact' }
      }
    }
  }
})