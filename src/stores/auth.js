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
        // Persist to localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
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

    async logout() {
      await authService.logout()
      this.user = null
      this.token = null
      this.isAuthenticated = false
    },

    initAuth() {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      if (token && userStr) {
        try {
          this.token = token
          this.user = JSON.parse(userStr)
          this.isAuthenticated = true
        } catch (error) {
          console.error('Error parsing user data:', error)
          this.clearAuth()
        }
      }
    },

    clearAuth() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.user = null
      this.token = null
      this.isAuthenticated = false
    }
  }
})