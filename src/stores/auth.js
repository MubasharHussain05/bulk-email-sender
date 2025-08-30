import { defineStore } from 'pinia'
import { authService } from '../services'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false
  }),

  actions: {
    async login(credentials) {
      this.loading = true
      try {
        const { token, user } = await authService.login(credentials)
        this.token = token
        this.user = user
        this.isAuthenticated = true
        return { success: true }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Login failed' }
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true
      try {
        await authService.register(userData)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Registration failed' }
      } finally {
        this.loading = false
      }
    },

    logout() {
      authService.logout()
      this.user = null
      this.token = null
      this.isAuthenticated = false
    },

    initAuth() {
      const token = authService.getToken()
      const user = authService.getCurrentUser()
      if (token && user) {
        this.token = token
        this.user = user
        this.isAuthenticated = true
      }
    }
  }
})