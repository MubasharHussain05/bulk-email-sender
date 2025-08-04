<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
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
            <p class="text-2xl font-bold text-gray-900">24</p>
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
            <p class="text-2xl font-bold text-gray-900">1,234</p>
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
            <p class="text-2xl font-bold text-gray-900">68%</p>
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
            <p class="text-2xl font-bold text-gray-900">12%</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="stats-card">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2">
          <div class="flex items-center">
            <span class="text-green-500 mr-3">✓</span>
            <span class="text-gray-900">Campaign "Holiday Sale" sent successfully</span>
          </div>
          <span class="text-sm text-gray-500">2 hours ago</span>
        </div>
        <div class="flex items-center justify-between py-2">
          <div class="flex items-center">
            <span class="text-blue-500 mr-3">📝</span>
            <span class="text-gray-900">New template "Welcome Email" created</span>
          </div>
          <span class="text-sm text-gray-500">4 hours ago</span>
        </div>
        <div class="flex items-center justify-between py-2">
          <div class="flex items-center">
            <span class="text-purple-500 mr-3">👥</span>
            <span class="text-gray-900">50 new contacts imported</span>
          </div>
          <span class="text-sm text-gray-500">1 day ago</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>