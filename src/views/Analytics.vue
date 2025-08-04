<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Analytics</h1>
        <p class="text-gray-500">Track your email campaign performance</p>
      </div>
      <div class="relative">
        <select class="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          <option>Last 30 days</option>
          <option>Last 60 days</option>
          <option>Last 90 days</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
       <div class="bg-white p-4 rounded-lg shadow-sm flex items-start justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Emails Sent</h3>
          <p class="text-2xl font-bold text-gray-800">12,485</p>
          <p class="text-sm text-green-500 mt-1">+12% from last month</p>
        </div>
        <div class="bg-blue-100 p-2 rounded-lg">
          <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm flex items-start justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Average Open Rate</h3>
          <p class="text-2xl font-bold text-gray-800">24.8%</p>
          <p class="text-sm text-red-500 mt-1">-2.1% from last month</p>
        </div>
        <div class="bg-green-100 p-2 rounded-lg">
           <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm flex items-start justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Average Click Rate</h3>
          <p class="text-2xl font-bold text-gray-800">4.2%</p>
          <p class="text-sm text-green-500 mt-1">+5.3% from last month</p>
        </div>
        <div class="bg-purple-100 p-2 rounded-lg">
          <svg class="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 8.812a9.025 9.025 0 011.588-1.588m-1.588 1.588L6 10.5m1.188-1.688a9.025 9.025 0 011.588 1.588m0 0l1.188 1.188m-1.188-1.188a9.025 9.025 0 01-1.588 1.588m-1.588-1.588L6 10.5"></path></svg>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm flex items-start justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Active Contacts</h3>
          <p class="text-2xl font-bold text-gray-800">8,924</p>
          <p class="text-sm text-green-500 mt-1">+8% from last month</p>
        </div>
        <div class="bg-yellow-100 p-2 rounded-lg">
          <svg class="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.224-1.26-.623-1.742M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
      <div class="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Performance Over Time</h3>
        <div class="chart-container" style="position: relative; height: 300px; width: 100%;">
          <Line 
            v-if="chartData && chartOptions" 
            :data="chartData" 
            :options="chartOptions"
            ref="lineChart"
          />
        </div>
        <div class="flex justify-center mt-4 space-x-6 text-sm text-gray-600">
          <div class="flex items-center">
            <span class="h-3 w-3 bg-blue-500 rounded-full mr-2"></span>
            <span>Open Rate (%)</span>
          </div>
          <div class="flex items-center">
            <span class="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
            <span>Click Rate (%)</span>
          </div>
        </div>
      </div>
      <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
         <h3 class="text-lg font-semibold text-gray-800 mb-4">Campaign Breakdown</h3>
         <div class="space-y-4">
           <div class="flex justify-between items-center">
             <span class="text-sm text-gray-600">Newsletter Campaign</span>
             <span class="text-sm font-medium text-gray-800">45%</span>
           </div>
           <div class="w-full bg-gray-200 rounded-full h-2">
             <div class="bg-blue-500 h-2 rounded-full" style="width: 45%;"></div>
           </div>
           
           <div class="flex justify-between items-center">
             <span class="text-sm text-gray-600">Promotional Campaign</span>
             <span class="text-sm font-medium text-gray-800">30%</span>
           </div>
           <div class="w-full bg-gray-200 rounded-full h-2">
             <div class="bg-green-500 h-2 rounded-full" style="width: 30%;"></div>
           </div>
           
           <div class="flex justify-between items-center">
             <span class="text-sm text-gray-600">Welcome Series</span>
             <span class="text-sm font-medium text-gray-800">25%</span>
           </div>
           <div class="w-full bg-gray-200 rounded-full h-2">
             <div class="bg-purple-500 h-2 rounded-full" style="width: 25%;"></div>
           </div>
         </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Engagement Metrics</h3>
        <div>
          <div class="mb-4">
            <div class="flex justify-between items-center text-sm text-gray-600 mb-1">
              <span>Open Rate</span>
              <span>24.8%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full" style="width: 24.8%;"></div>
            </div>
          </div>
          <div class="mb-4">
            <div class="flex justify-between items-center text-sm text-gray-600 mb-1">
              <span>Click Rate</span>
              <span>4.2%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 21%;"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between items-center text-sm text-gray-600 mb-1">
              <span>Bounce Rate</span>
              <span>2.1%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-red-500 h-2 rounded-full" style="width: 10.5%;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-sm">
         <h3 class="text-lg font-semibold text-gray-800 mb-4">Top Performing</h3>
         <div class="space-y-3">
           <div class="flex justify-between items-center border-b pb-2">
             <div>
               <p class="text-sm font-medium text-gray-800">Summer Sale Campaign</p>
               <p class="text-xs text-gray-500">Sent 3 days ago</p>
             </div>
             <span class="text-sm font-bold text-green-600">32.1%</span>
           </div>
           <div class="flex justify-between items-center border-b pb-2">
             <div>
               <p class="text-sm font-medium text-gray-800">Weekly Newsletter</p>
               <p class="text-xs text-gray-500">Sent 1 week ago</p>
             </div>
             <span class="text-sm font-bold text-green-600">28.7%</span>
           </div>
           <div class="flex justify-between items-center">
             <div>
               <p class="text-sm font-medium text-gray-800">Product Update</p>
               <p class="text-xs text-gray-500">Sent 2 weeks ago</p>
             </div>
             <span class="text-sm font-bold text-green-600">26.3%</span>
           </div>
         </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <div class="h-2 w-2 bg-green-500 rounded-full"></div>
            <div class="flex-1">
              <p class="text-sm text-gray-800">Campaign sent successfully</p>
              <p class="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
            <div class="flex-1">
              <p class="text-sm text-gray-800">New subscriber added</p>
              <p class="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="h-2 w-2 bg-yellow-500 rounded-full"></div>
            <div class="flex-1">
              <p class="text-sm text-gray-800">Template updated</p>
              <p class="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
)

export default {
  name: 'Analytics',
  components: { 
    Line 
  },
  data() {
    return {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Open Rate (%)',
            data: [23, 25, 23, 28, 26, 30, 24.8],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: false,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#3B82F6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointHoverRadius: 7,
          },
          {
            label: 'Click Rate (%)',
            data: [3, 4, 2, 5, 4, 6, 4.2],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: false,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointHoverRadius: 7,
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          title: {
            display: false
          },
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + '%';
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: '#6B7280',
              font: {
                size: 12
              }
            }
          },
          y: {
            display: true,
            beginAtZero: true,
            grid: {
              color: '#E5E7EB',
              drawBorder: false,
            },
            ticks: {
              color: '#6B7280',
              font: {
                size: 12
              },
              stepSize: 5,
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        elements: {
          point: {
            hoverBackgroundColor: '#ffffff',
          }
        }
      }
    }
  },
  mounted() {
    // Ensure chart renders properly after component is mounted
    this.$nextTick(() => {
      if (this.$refs.lineChart && this.$refs.lineChart.chart) {
        this.$refs.lineChart.chart.update();
      }
    });
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}

/* Custom select dropdown arrow styling */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Ensure proper chart canvas sizing */
canvas {
  max-height: 300px !important;
}
</style>