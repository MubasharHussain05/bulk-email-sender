<template>
  <div class="flex items-center justify-center min-h-full">
    <div class="text-center">
      <div class="text-6xl mb-4">😕</div>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">Page Not Found</p>
      <p class="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
      <router-link to="/" class="btn-primary">
        Go Back Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>