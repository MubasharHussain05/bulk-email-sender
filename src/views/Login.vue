<template>
  <!-- 1. Elegant Gradient Background -->
  <div class="flex flex-col justify-center min-h-screen py-12 bg-gradient-to-br from-slate-900 to-slate-700 sm:px-6 lg:px-8">
    <!-- Fade-in Transition for the form -->
    <transition
      appear
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
    >
      <!-- 2. Modern Form Card -->
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <!-- 3. Logo/Icon Placeholder -->
        <svg
          class="w-auto h-12 mx-auto text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>

        <!-- 4. Improved Typography -->
        <h2 class="mt-6 text-3xl font-extrabold text-center text-white">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-center text-gray-400">
          Welcome back! Please enter your details.
        </p>
      </div>
    </transition>

    <transition
      appear
      enter-active-class="transition-all duration-500 ease-out delay-200"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
    >
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="px-4 py-8 bg-white rounded-lg shadow-2xl sm:px-10">
          <form class="space-y-6" @submit.prevent="handleLogin">
            <!-- Username Input with Icon -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div class="relative mt-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <!-- Heroicon: user -->
                  <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  id="username"
                  v-model="form.username"
                  name="username"
                  type="text"
                  required
                  class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="your_username"
                />
              </div>
            </div>

            <!-- Password Input with Icon -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="relative mt-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <!-- Heroicon: lock-closed -->
                  <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  type="password"
                  required
                  class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <!-- "Forgot Password?" Link -->
              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="flex items-center p-3 space-x-2 rounded-md bg-red-50">
               <svg class="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                 <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
               </svg>
               <p class="text-sm text-red-700">{{ error }}</p>
            </div>

            <!-- Enhanced Submit Button with Loading Spinner -->
            <div>
              <button
                type="submit"
                :disabled="authStore.loading"
                class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                <!-- Loading Spinner -->
                <svg v-if="authStore.loading" class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ authStore.loading ? 'Signing in...' : 'Sign in' }}</span>
              </button>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 text-gray-500 bg-white">
                  Or
                </span>
              </div>
            </div>

            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600">
                New to our platform?
                <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up for free
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const form = ref({
      username: '',
      password: ''
    });
    const error = ref('');

    const handleLogin = async () => {
      error.value = '';
      const result = await authStore.login(form.value);
      
      if (result.success) {
        router.push('/');
      } else {
        error.value = result.error;
      }
    };

    return {
      form,
      authStore,
      error,
      handleLogin
    };
  }
};
</script>