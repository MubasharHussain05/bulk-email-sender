import { defineStore } from 'pinia'
import { campaignService } from '../services'

export const useCampaignsStore = defineStore('campaigns', {
  state: () => ({
    campaigns: [],
    loading: false,
    selectedCampaign: null
  }),

  getters: {
    campaignsByStatus: (state) => (status) => {
      return state.campaigns.filter(campaign => campaign.status === status)
    }
  },

  actions: {
    async fetchCampaigns() {
      this.loading = true
      try {
        this.campaigns = await campaignService.getAll()
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async createCampaign(campaignData) {
      try {
        const newCampaign = await campaignService.create(campaignData)
        this.campaigns.push(newCampaign)
        return { success: true, campaign: newCampaign }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Failed to create campaign' }
      }
    },

    async updateCampaign(id, campaignData) {
      try {
        const updatedCampaign = await campaignService.update(id, campaignData)
        const index = this.campaigns.findIndex(c => c._id === id)
        if (index !== -1) {
          this.campaigns[index] = updatedCampaign
        }
        return { success: true, campaign: updatedCampaign }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Failed to update campaign' }
      }
    },

    async deleteCampaign(id) {
      try {
        await campaignService.delete(id)
        this.campaigns = this.campaigns.filter(c => c._id !== id)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Failed to delete campaign' }
      }
    },

    async sendCampaign(id) {
      try {
        const result = await campaignService.send(id)
        const index = this.campaigns.findIndex(c => c._id === id)
        if (index !== -1) {
          this.campaigns[index].status = 'sent'
        }
        return { success: true, message: result.message }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Failed to send campaign' }
      }
    }
  }
})