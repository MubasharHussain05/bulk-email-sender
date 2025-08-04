<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="stats-card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">⚙️ General Settings</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Your Company">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">From Email</label>
            <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="noreply@company.com">
          </div>
        </div>
      </div>
      
      <div class="stats-card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">🔒 Security</h3>
        <div class="space-y-3">
          <button class="btn-secondary w-full">Change Password</button>
          <button class="btn-secondary w-full">Two-Factor Authentication</button>
        </div>
      </div>
      
      <div class="stats-card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">📧 Email Configuration</h3>
        <p class="text-gray-600">Configure SMTP settings and email delivery options</p>
      </div>
      
      <div class="stats-card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">📊 Preferences</h3>
        <p class="text-gray-600">Customize your dashboard and notification preferences</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings'
}
</script>