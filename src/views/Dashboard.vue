<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <button 
        @click="refreshData" 
        :disabled="loading"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Loading...' : 'Refresh' }}
      </button>
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="stats-card">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <span class="text-2xl">📧</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Campaigns</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalCampaigns }}</p>
          </div>
        </div>
      </div>
      
      <div class="stats-card">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <span class="text-2xl">👥</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Contacts</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalContacts.toLocaleString() }}</p>
          </div>
        </div>
      </div>
      
      <div class="stats-card">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <span class="text-2xl">📊</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Open Rate</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.openRate }}%</p>
          </div>
        </div>
      </div>
      
      <div class="stats-card">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <span class="text-2xl">📈</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Click Rate</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.clickRate }}%</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="stats-card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">🚀 Quick Actions</h3>
        <div class="space-y-3">
          <button @click="$router.push('/contacts')" class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Add New Contact
          </button>
          <button @click="$router.push('/templates')" class="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
            Create Template
          </button>
          <button @click="$router.push('/campaigns')" class="w-full px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100">
            New Campaign
          </button>
        </div>
      </div>
      
      <div class="stats-card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">📊 Segments</h3>
        <div class="space-y-2">
          <div v-for="segment in contactSegments" :key="segment.name" class="flex justify-between items-center">
            <span class="text-sm text-gray-600 capitalize">{{ segment.name }}</span>
            <span class="text-sm font-medium text-gray-900">{{ segment.count }}</span>
          </div>
        </div>
      </div>
      
      <div class="stats-card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">⚡ Test Email</h3>
        <div class="space-y-3">
          <input type="email" v-model="quickTestEmail" placeholder="Enter email address" 
                 class="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
          <button @click="sendQuickTest" :disabled="!quickTestEmail || quickTestLoading" 
                  class="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50">
            {{ quickTestLoading ? 'Sending...' : 'Send Test' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="stats-card">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div v-if="recentActivity.length > 0" class="space-y-3">
        <div 
          v-for="activity in recentActivity" 
          :key="activity.id"
          class="flex items-center justify-between py-2"
        >
          <div class="flex items-center">
            <span :class="activity.iconClass" class="mr-3">{{ activity.icon }}</span>
            <span class="text-gray-900">{{ activity.message }}</span>
          </div>
          <span class="text-sm text-gray-500">{{ activity.timeAgo }}</span>
        </div>
      </div>
      <div v-else class="text-gray-500 text-center py-4">
        No recent activity
      </div>
    </div>
  </div>
</template>

<script>
import { campaignService } from '@/services/campaignService'
import { contactService } from '@/services/contactService'
import { templateService } from '@/services/templateService'

export default {
  name: 'Dashboard',
  data() {
    return {
      loading: false,
      stats: {
        totalCampaigns: 0,
        totalContacts: 0,
        openRate: 0,
        clickRate: 0
      },
      recentActivity: [],
      contactSegments: [],
      quickTestEmail: '',
      quickTestLoading: false
    }
  },
  async mounted() {
    await this.loadDashboardData()
  },
  methods: {
    async loadDashboardData() {
      this.loading = true
      try {
        await Promise.all([
          this.loadStats(),
          this.loadRecentActivity()
        ])
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        this.loading = false
      }
    },
    
    async loadStats() {
      try {
        const [campaigns, contacts] = await Promise.all([
          campaignService.getAll(),
          contactService.getAll()
        ])
        
        this.stats.totalCampaigns = campaigns.length
        this.stats.totalContacts = contacts.length
        
        // Calculate segment distribution
        const segments = {}
        contacts.forEach(contact => {
          const segment = contact.segment || 'general'
          segments[segment] = (segments[segment] || 0) + 1
        })
        
        this.contactSegments = Object.entries(segments).map(([name, count]) => ({ name, count }))
        
        // Calculate basic engagement rates
        const sentCampaigns = campaigns.filter(c => c.status === 'sent')
        if (sentCampaigns.length > 0) {
          const totalSent = sentCampaigns.reduce((sum, c) => sum + (c.sentCount || 0), 0)
          const totalOpens = sentCampaigns.reduce((sum, c) => sum + (c.openCount || 0), 0)
          const totalClicks = sentCampaigns.reduce((sum, c) => sum + (c.clickCount || 0), 0)
          
          this.stats.openRate = totalSent > 0 ? Math.round((totalOpens / totalSent) * 100) : 0
          this.stats.clickRate = totalSent > 0 ? Math.round((totalClicks / totalSent) * 100) : 0
        }
      } catch (error) {
        console.error('Error loading stats:', error)
      }
    },
    
    async loadRecentActivity() {
      try {
        const [campaigns, templates] = await Promise.all([
          campaignService.getAll(),
          templateService.getAll()
        ])
        
        const activities = []
        
        // Recent campaigns
        const recentCampaigns = campaigns
          .sort((a, b) => new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt))
          .slice(0, 3)
        
        recentCampaigns.forEach(campaign => {
          const date = new Date(campaign.createdAt || campaign.updatedAt)
          activities.push({
            id: `campaign-${campaign._id}`,
            icon: campaign.status === 'sent' ? '✓' : '📧',
            iconClass: campaign.status === 'sent' ? 'text-green-500' : 'text-blue-500',
            message: campaign.status === 'sent' 
              ? `Campaign "${campaign.name}" sent successfully`
              : `Campaign "${campaign.name}" ${campaign.status}`,
            timeAgo: this.getTimeAgo(date),
            timestamp: date
          })
        })
        
        // Recent templates
        const recentTemplates = templates
          .sort((a, b) => new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt))
          .slice(0, 2)
        
        recentTemplates.forEach(template => {
          const date = new Date(template.createdAt || template.updatedAt)
          activities.push({
            id: `template-${template._id}`,
            icon: '📝',
            iconClass: 'text-blue-500',
            message: `New template "${template.name}" created`,
            timeAgo: this.getTimeAgo(date),
            timestamp: date
          })
        })
        
        // Sort by timestamp and take top 5
        this.recentActivity = activities
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 5)
          
      } catch (error) {
        console.error('Error loading recent activity:', error)
      }
    },
    
    getTimeAgo(date) {
      const now = new Date()
      const diffInSeconds = Math.floor((now - date) / 1000)
      
      if (diffInSeconds < 60) return 'Just now'
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
      if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
      return date.toLocaleDateString()
    },
    
    async refreshData() {
      await this.loadDashboardData()
    },
    
    async sendQuickTest() {
      try {
        this.quickTestLoading = true
        
        // Import emailService and templateService
        const { emailService } = await import('@/services/emailService')
        const { templateService } = await import('@/services/templateService')
        
        // Create a simple test template
        const testTemplate = {
          name: 'Quick Test Email',
          subject: 'Quick Test from Dashboard',
          htmlContent: '<html><body><h1>Quick Test</h1><p>This is a quick test email sent from your dashboard.</p><p>Your bulk email service is working correctly!</p></body></html>',
          textContent: 'Quick Test - This is a quick test email sent from your dashboard. Your bulk email service is working correctly!'
        }
        
        // Create temporary template
        const template = await templateService.create(testTemplate)
        
        // Send test email
        await emailService.sendTestEmail(template._id, this.quickTestEmail)
        
        // Clean up temporary template
        await templateService.delete(template._id)
        
        alert('Quick test email sent successfully!')
        this.quickTestEmail = ''
      } catch (error) {
        console.error('Error sending quick test:', error)
        alert('Failed to send test email: ' + (error.response?.data?.message || error.message))
      } finally {
        this.quickTestLoading = false
      }
    }
  }
}
</script>