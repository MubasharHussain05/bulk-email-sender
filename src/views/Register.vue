<template>
  <div class="flex flex-col justify-center min-h-screen py-12 bg-gradient-to-br from-slate-900 to-slate-700 sm:px-6 lg:px-8">
    <transition
      appear
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
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
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.5 21h-1.063a12.318 12.318 0 01-4.186-1.665z"
          />
        </svg>
        <h2 class="mt-6 text-3xl font-extrabold text-center text-white">
          Create your new account
        </h2>
        <p class="mt-2 text-sm text-center text-gray-400">
          Start your journey with us today.
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
          <form class="space-y-6" @submit.prevent="handleRegister">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <div class="relative mt-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input id="username" v-model="form.username" name="username" type="text" required class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="choose_a_username" />
              </div>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <div class="relative mt-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input id="email" v-model="form.email" name="email" type="email" required class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="relative mt-1">
                 <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input id="password" v-model="form.password" name="password" type="password" required class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="••••••••" />
              </div>
            </div>
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div class="relative mt-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input id="confirm-password" v-model="form.confirmPassword" name="confirm-password" type="password" required class="block w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="••••••••" />
              </div>
            </div>
            <div v-if="error" class="flex items-center p-3 space-x-2 rounded-md bg-red-50">
               <svg class="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>
               <p class="text-sm text-red-700">{{ error }}</p>
            </div>
             <div v-if="success" class="flex items-center p-3 space-x-2 rounded-md bg-green-50">
                <svg class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                <p class="text-sm text-green-700">{{ success }}</p>
            </div>
            <div>
              <button type="submit" :disabled="authStore.loading" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed">
                <svg v-if="authStore.loading" class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>{{ authStore.loading ? 'Creating account...' : 'Sign up' }}</span>
              </button>
            </div>
          </form>
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in here
              </router-link>
            </p>
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
  name: 'Register',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const form = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    const error = ref('');
    const success = ref('');

    const handleRegister = async () => {
      error.value = '';
      success.value = '';

      if (form.value.password !== form.value.confirmPassword) {
        error.value = 'Passwords do not match.';
        return;
      }

      const result = await authStore.register({
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
      });

      if (result.success) {
        success.value = 'Account created successfully! Redirecting to login...';
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        error.value = result.error;
      }
    };

    return {
      form,
      authStore,
      error,
      success,
      handleRegister
    };
  }
};
</script>