// Simple API connection test for frontend
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testConnection() {
  console.log('🔍 Testing API connection...');
  console.log('API URL:', API_BASE_URL);
  
  try {
    // Test basic connection
    const response = await axios.get(`${API_BASE_URL}/auth/test`, {
      timeout: 5000
    });
    console.log('✅ API connection successful');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ API connection failed');
    if (error.code === 'ECONNREFUSED') {
      console.log('🚨 Backend server is not running!');
      console.log('💡 Please start the backend server with: npm run dev');
    } else if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

// Test with authentication
async function testWithAuth() {
  console.log('\n🔐 Testing with authentication...');
  
  const testUser = {
    email: 'test@example.com',
    password: 'password123'
  };
  
  try {
    // Try to login
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, testUser);
    const token = loginResponse.data.token;
    
    if (token) {
      console.log('✅ Login successful, token received');
      
      // Test authenticated endpoint
      const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('✅ Authenticated request successful');
      console.log('User:', profileResponse.data.name);
    }
  } catch (error) {
    console.log('❌ Authentication test failed');
    if (error.response?.status === 401) {
      console.log('🔑 Invalid credentials or user not found');
    } else {
      console.log('Error:', error.response?.data?.message || error.message);
    }
  }
}

async function runTests() {
  await testConnection();
  await testWithAuth();
  
  console.log('\n📋 Troubleshooting checklist:');
  console.log('1. ✓ Backend server running on port 5000');
  console.log('2. ✓ Database connected');
  console.log('3. ✓ CORS enabled for frontend');
  console.log('4. ✓ User registered and can login');
  console.log('5. ✓ JWT tokens working');
}

runTests();