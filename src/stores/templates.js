import { defineStore } from 'pinia'
import { templateService } from '../services'

export const useTemplatesStore = defineStore('templates', {
  state: () => ({
    templates: [],
    loading: false,
    selectedTemplate: null
  }),

  actions: {
    async fetchTemplates() {
      this.loading = true
      try {
        this.templates = await templateService.getAll()
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async createTemplate(templateData) {
      try {
        const newTemplate = await templateService.create(templateData)
        this.templates.push(newTemplate)
        return { success: true, template: newTemplate }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Failed to create template' }
      }
    },

    async updateTemplate(id, templateData) {
      try {
        const updatedTemplate = await templateService.update(id, templateData)
        const index = this.templates.findIndex(t => t._id === id)
        if (index !== -1) {
          this.templates[index] = updatedTemplate
        }
        return { success: true, template: updatedTemplate }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Failed to update template' }
      }
    },

    async deleteTemplate(id) {
      try {
        await templateService.delete(id)
        this.templates = this.templates.filter(t => t._id !== id)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Failed to delete template' }
      }
    }
  }
})