<!-- Dashboard.vue - Template Section -->
<template>
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="logo-container">
          <svg class="chef-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF8A65">
            <path d="M12 2C8.96 2 6.5 4.46 6.5 7.5V9.04C4.98 9.28 3.5 10.51 3.5 12.25C3.5 14.07 5.07 15.5 7 15.5H17C18.93 15.5 20.5 14.07 20.5 12.25C20.5 10.51 19.02 9.28 17.5 9.04V7.5C17.5 4.46 15.04 2 12 2ZM15.5 7.5V9H8.5V7.5C8.5 5.57 10.07 4 12 4C13.93 4 15.5 5.57 15.5 7.5ZM7 17.5V19.5H9V22H15V19.5H17V17.5H7Z" />
          </svg>
          <h2 class="logo-text">ChefPoint</h2>
        </div>
        
        <div class="user-info">
          <div class="user-avatar">GC</div>
          <div class="user-details">
            <p class="user-name">Gordon Chef</p>
            <p class="user-type">Premium Account</p>
          </div>
        </div>
        
        <nav class="sidebar-nav">
          <ul>
            <li class="active">
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                </svg>
                Notifications
                <span class="badge">3</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                Subscriptions
              </a>
            </li>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                Customers
              </a>
            </li>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 10h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z" />
                </svg>
                Menu Builder
              </a>
            </li>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H4V5h16zM4 19v-9h16v9H4zm8-1.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7h-8v-1h8v1z" />
                </svg>
                Payments
              </a>
            </li>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                Reports
              </a>
            </li>
            <li>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                </svg>
                Settings
              </a>
            </li>
          </ul>
        </nav>
        
        <div class="sidebar-footer">
          <a href="#" class="help-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
            </svg>
            Help & Resources
          </a>
          <a href="#" class="logout-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
            Logout
          </a>
        </div>
      </aside>
  
      <!-- Main Content -->
      <main class="main-content">
        <header class="dashboard-header">
          <div class="page-title">
            <h1>Dashboard Overview</h1>
            <p>Welcome back, Gordon! Here's what's happening with your culinary subscriptions.</p>
          </div>
          <div class="header-actions">
            <button class="btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              Export Data
            </button>
            <button class="btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Create Subscription
            </button>
          </div>
        </header>
  
        <!-- Analytics Cards -->
        <div class="analytics-grid">
          <div class="analytics-card">
            <div class="analytics-icon revenue-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
              </svg>
            </div>
            <div class="analytics-info">
              <h3>Monthly Revenue</h3>
              <p class="analytics-value">$8,562.30</p>
              <p class="analytics-change positive">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14l5-5 5 5z" />
                </svg>
                12.5% from last month
              </p>
            </div>
          </div>
          
          <div class="analytics-card">
            <div class="analytics-icon customers-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <div class="analytics-info">
              <h3>Active Subscribers</h3>
              <p class="analytics-value">154</p>
              <p class="analytics-change positive">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14l5-5 5 5z" />
                </svg>
                7.2% from last month
              </p>
            </div>
          </div>
          
          <div class="analytics-card">
            <div class="analytics-icon meals-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
              </svg>
            </div>
            <div class="analytics-info">
              <h3>Meals Delivered</h3>
              <p class="analytics-value">842</p>
              <p class="analytics-change positive">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14l5-5 5 5z" />
                </svg>
                15.3% from last month
              </p>
            </div>
          </div>
          
          <div class="analytics-card">
            <div class="analytics-icon retention-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
              </svg>
            </div>
            <div class="analytics-info">
              <h3>Retention Rate</h3>
              <p class="analytics-value">92.7%</p>
              <p class="analytics-change negative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
                1.3% from last month
              </p>
            </div>
          </div>
        </div>
  
        <!-- Revenue Chart -->
        <div class="chart-container">
          <div class="chart-header">
            <h2>Revenue Trends</h2>
            <div class="chart-actions">
              <select class="chart-period-select" v-model="chartPeriod">
                <option value="30">Last 30 Days</option>
                <option value="90">Last Quarter</option>
                <option value="365">Last Year</option>
              </select>
            </div>
          </div>
          <div class="revenue-chart">
            <!-- Chart placeholder -->
            <div class="chart-placeholder">
              <div class="chart-bars">
                <div class="chart-bar" style="height: 30%"></div>
                <div class="chart-bar" style="height: 45%"></div>
                <div class="chart-bar" style="height: 55%"></div>
                <div class="chart-bar" style="height: 40%"></div>
                <div class="chart-bar" style="height: 60%"></div>
                <div class="chart-bar" style="height: 75%"></div>
                <div class="chart-bar" style="height: 65%"></div>
                <div class="chart-bar active" style="height: 85%"></div>
                <div class="chart-bar" style="height: 70%"></div>
                <div class="chart-bar" style="height: 75%"></div>
                <div class="chart-bar" style="height: 80%"></div>
                <div class="chart-bar" style="height: 90%"></div>
              </div>
              <div class="chart-labels">
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="dashboard-row">
          <!-- Upcoming Orders -->
          <div class="dashboard-card upcoming-orders">
            <div class="card-header">
              <h2>Upcoming Orders</h2>
              <a href="#" class="card-action">View All</a>
            </div>
            <div class="card-content">
              <table class="orders-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Plan</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in upcomingOrders" :key="index">
                    <td>
                      <div class="customer-info">
                        <div class="customer-avatar">{{ order.initials }}</div>
                        <div class="customer-name">{{ order.customer }}</div>
                      </div>
                    </td>
                    <td>{{ order.plan }}</td>
                    <td>{{ order.date }}</td>
                    <td><span class="status-badge" :class="order.status.toLowerCase()">{{ order.status }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- Popular Plans -->
          <div class="dashboard-card popular-plans">
            <div class="card-header">
              <h2>Popular Plans</h2>
              <a href="#" class="card-action">Add New</a>
            </div>
            <div class="card-content">
              <div class="plan-item" v-for="(plan, index) in popularPlans" :key="index">
                <div class="plan-icon" :class="plan.icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path :d="plan.iconPath" />
                  </svg>
                </div>
                <div class="plan-details">
                  <h3>{{ plan.name }}</h3>
                  <p>{{ plan.subscribers }} active subscribers</p>
                  <div class="plan-popularity">
                    <div class="popularity-bar" :style="{ width: plan.popularity + '%' }"></div>
                  </div>
                </div>
                <div class="plan-price">{{ plan.price }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Recent Activity Section -->
        <div class="dashboard-row">
          <div class="dashboard-card recent-activity">
            <div class="card-header">
              <h2>Recent Activity</h2>
              <a href="#" class="card-action">See All</a>
            </div>
            <div class="card-content">
              <div class="activity-item" v-for="(activity, index) in recentActivity" :key="index">
                <div class="activity-icon" :class="activity.type">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path :d="activity.iconPath" />
                  </svg>
                </div>
                <div class="activity-details">
                  <p class="activity-text" v-html="activity.text"></p>
                  <p class="activity-time">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="dashboard-card quick-actions">
            <div class="card-header">
              <h2>Quick Actions</h2>
            </div>
            <div class="card-content">
              <div class="action-grid">
                <a href="#" class="action-item" v-for="(action, index) in quickActions" :key="index">
                  <div class="action-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path :d="action.iconPath" />
                    </svg>
                  </div>
                  <span>{{ action.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>




  <script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        chartPeriod: '30',
        upcomingOrders: [
          {
            customer: 'Jane Doe',
            initials: 'JD',
            plan: 'Weekly Meal Prep',
            date: 'Tomorrow, 10 AM',
            status: 'Preparing'
          },
          {
            customer: 'Mike Smith',
            initials: 'MS',
            plan: 'Family Dinners',
            date: 'Tomorrow, 2 PM',
            status: 'Scheduled'
          },
          {
            customer: 'Alice Johnson',
            initials: 'AJ',
            plan: 'Plant-Based',
            date: 'Mar 31, 11 AM',
            status: 'Scheduled'
          },
          {
            customer: 'Robert Brown',
            initials: 'RB',
            plan: 'Dinner Party',
            date: 'Apr 1, 4 PM',
            status: 'Scheduled'
          }
        ],
        popularPlans: [
          {
            name: 'Weekly Meal Prep',
            subscribers: 54,
            popularity: 75,
            price: '$200/mo',
            icon: 'weekly-meal',
            iconPath: 'M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z'
          },
          {
            name: 'Family Dinners',
            subscribers: 43,
            popularity: 60,
            price: '$250/mo',
            icon: 'family-dinner',
            iconPath: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'
          },
          {
            name: 'Plant-Based',
            subscribers: 38,
            popularity: 50,
            price: '$150/mo',
            icon: 'plant-based',
            iconPath: 'M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z'
          },
          {
            name: 'Dinner Party',
            subscribers: 19,
            popularity: 30,
            price: '$69/mo',
            icon: 'dinner-party',
            iconPath: 'M16 6v6c0 1.1.9 2 2 2h1v7c0 .55.45 1 1 1s1-.45 1-1v-7h1c1.1 0 2-.9 2-2V6c0-2.21-1.79-4-4-4s-4 1.79-4 4zm4-2c1.1 0 2 .9 2 2v2h-4V6c0-1.1.9-2 2-2zM7 16c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2v4c0 .55.45 1 1 1z'
          }
        ],
        recentActivity: [
          {
            type: 'new-subscriber',
            text: '<span class="bold">Emma Wilson</span> subscribed to <span class="bold">Weekly Meal Prep</span>',
            time: '2 hours ago',
            iconPath: 'M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
          },
          {
            type: 'payment',
            text: '<span class="bold">Payment received</span> from <span class="bold">Robert Brown</span>',
            time: '5 hours ago',
            iconPath: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z'
          },
          {
            type: 'delivery',
            text: '<span class="bold">10 meals delivered</span> to <span class="bold">Jane Doe</span>',
            time: 'Yesterday',
            iconPath: 'M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z M5 6h5v2H5zm14 7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z'
          },
          {
            type: 'feedback',
            text: '<span class="bold">New feedback</span> from <span class="bold">Alice Johnson</span>',
            time: '2 days ago',
            iconPath: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z'
          }
        ],
        quickActions: [
          {
            name: 'New Recipe',
            iconPath: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'
          },
          {
            name: 'Manage Access',
            iconPath: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'
          },
          {
            name: 'Add Customer',
            iconPath: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'
          },
          {
            name: 'Create Invoice',
            iconPath: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'
          },
          {
            name: 'Menu Library',
            iconPath: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z'
          },
          {
            name: 'View Analytics',
            iconPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z'
          }
        ],
        analytics: {
          revenue: {
            current: 8562.30,
            previous: 7611.82,
            change: 12.5
          },
          subscribers: {
            current: 154,
            previous: 143,
            change: 7.2
          },
          meals: {
            current: 842,
            previous: 730,
            change: 15.3
          },
          retention: {
            current: 92.7,
            previous: 94.0,
            change: -1.3
          }
        },
        revenueData: [
          { month: 'Mar', value: 5200 },
          { month: 'Apr', value: 5800 },
          { month: 'May', value: 6100 },
          { month: 'Jun', value: 5900 },
          { month: 'Jul', value: 6300 },
          { month: 'Aug', value: 7100 },
          { month: 'Sep', value: 6800 },
          { month: 'Oct', value: 7800 },
          { month: 'Nov', value: 7200 },
          { month: 'Dec', value: 7500 },
          { month: 'Jan', value: 8000 },
          { month: 'Feb', value: 8562 }
        ]
      };
    },
    computed: {
      // Calculate any derived data here
      revenueGrowth() {
        const { current, previous } = this.analytics.revenue;
        return ((current - previous) / previous * 100).toFixed(1);
      },
      chartDataForPeriod() {
        // You would implement logic to filter data based on chartPeriod
        return this.revenueData;
      }
    },
    methods: {
      formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value);
      },
      formatPercentage(value) {
        return value.toFixed(1) + '%';
      },
      loadDashboardData() {
        // This would be an API call in a real application
        console.log('Loading dashboard data for period:', this.chartPeriod);
        // this.fetchAnalytics();
        // this.fetchUpcomingOrders();
        // this.fetchPopularPlans();
        // this.fetchRecentActivity();
      },
      createSubscription() {
        console.log('Opening subscription creation modal');
        // Logic to open a modal or navigate to subscription creation page
      },
      exportData() {
        console.log('Exporting dashboard data');
        // Logic to export data as CSV/Excel/PDF
      },
      viewAllOrders() {
        console.log('Navigating to all orders page');
        // Navigation logic
      },
      viewAllPlans() {
        console.log('Navigating to all plans page');
        // Navigation logic
      },
      viewAllActivity() {
        console.log('Navigating to activity log');
        // Navigation logic
      }
    },
    watch: {
      chartPeriod(newPeriod, oldPeriod) {
        console.log(`Chart period changed from ${oldPeriod} to ${newPeriod} days`);
        this.loadDashboardData();
      }
    },
    mounted() {
      this.loadDashboardData();
      console.log('Dashboard component mounted');
    }
  };
  </script>
<style lang="scss" scoped>
// Modern Variables
$primary-color: #FF6B35; // Vibrant orange
$primary-gradient: linear-gradient(135deg, #FF6B35, #F9A03F);
$secondary-color: #2E3047; // Dark blue-gray
$accent-color: #5B86E5; // Modern blue
$success-color: #3DD598; // Mint green
$warning-color: #FFD166; // Bright yellow
$info-color: #50B5FF; // Sky blue
$danger-color: #FF565E; // Coral red
$light-bg: #F8F9FD; // Off-white background
$light-grey: #F2F4F8; // Lighter gray for cards
$medium-grey: #E1E5ED; // Border color
$dark-grey: #8A94A6; // Text secondary
$text-color: #2D3748; // Dark text
$card-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
$hover-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
$border-radius: 12px;
$input-radius: 8px;
$transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
$sidebar-width: 260px;
$font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

// Base styles
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: $font-family;
  background-color: $light-bg;
  color: $text-color;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.dashboard-container {
  display: flex;
  min-height: 100vh;
  position: relative;
}

// Sleek Sidebar
.sidebar {
  width: $sidebar-width;
  background: linear-gradient(180deg, $secondary-color 0%, darken($secondary-color, 8%) 100%);
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 0 25px rgba(0, 0, 0, 0.1);
  transition: $transition;
  overflow: hidden;
  
  &:hover {
    box-shadow: 5px 0 35px rgba(0, 0, 0, 0.15);
  }
}

.logo-container {
  display: flex;
  align-items: center;
  padding: 28px 30px;
  background: linear-gradient(90deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0) 100%);
  margin-bottom: 10px;
  
  .chef-icon {
    width: 34px;
    height: 34px;
    margin-right: 14px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
  
  .logo-text {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: white;
    margin: 0;
  }
}

.user-info {
  display: flex;
  align-items: center;
  padding: 16px 30px;
  margin: 5px 0 20px;
  position: relative;
  backdrop-filter: blur(5px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 20px;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
  }
  
  .user-avatar {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: $primary-gradient;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 15px;
    margin-right: 14px;
    position: relative;
    box-shadow: 0 3px 12px rgba(255, 107, 53, 0.3);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -3px;
      right: -3px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: $success-color;
      border: 2px solid $secondary-color;
    }
  }
  
  .user-details {
    .user-name {
      font-weight: 600;
      font-size: 15px;
      color: white;
      margin-bottom: 2px;
    }
    
    .user-type {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      display: flex;
      align-items: center;
      
      &::before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: $primary-color;
        border-radius: 50%;
        margin-right: 6px;
      }
    }
  }
}

.sidebar-nav {
  flex: 1;
  padding: 10px 15px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  ul {
    list-style: none;
    
    li {
      margin-bottom: 3px;
      position: relative;
      
      a {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        text-decoration: none;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 500;
        border-radius: 10px;
        transition: $transition;
        position: relative;
        font-size: 14px;
        
        svg {
          width: 20px;
          height: 20px;
          margin-right: 14px;
          opacity: 0.8;
          transition: $transition;
        }
        
        .badge {
          position: absolute;
          right: 16px;
          background: $primary-gradient;
          color: white;
          font-size: 10px;
          font-weight: bold;
          min-width: 20px;
          height: 20px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 6px rgba(255, 107, 53, 0.3);
          padding: 0 6px;
        }
        
        &:hover {
          color: white;
          background-color: rgba(255, 255, 255, 0.08);
          
          svg {
            opacity: 1;
            transform: scale(1.05);
          }
        }
      }
      
      &.active {
        & a {
          background: rgba(255, 107, 53, 0.2);
          color: white;
          
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 8px;
            bottom: 8px;
            width: 3px;
            background: $primary-gradient;
            border-radius: 0 3px 3px 0;
          }
          
          svg {
            color: $primary-color;
            opacity: 1;
          }
        }
      }
    }
  }
}

.sidebar-footer {
  padding: 20px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  
  a {
    display: flex;
    align-items: center;
    padding: 10px 0;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 13px;
    transition: $transition;
    
    svg {
      width: 18px;
      height: 18px;
      margin-right: 10px;
      opacity: 0.7;
      transition: $transition;
    }
    
    &:hover {
      color: white;
      
      svg {
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }
  
  .logout-link {
    color: rgba(255, 98, 107, 0.8);
    margin-top: 5px;
    
    &:hover {
      color: $danger-color;
    }
  }
}

// Modern Main Content
.main-content {
  flex: 1;
  margin-left: $sidebar-width;
  padding: 30px;
  background-color: $light-bg;
  min-height: 100vh;
  position: relative;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  .page-title {
    h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
      background: linear-gradient(90deg, $secondary-color, darken($secondary-color, 15%));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    p {
      color: $dark-grey;
      font-size: 15px;
      line-height: 1.5;
    }
  }
  
  .header-actions {
    display: flex;
    gap: 12px;
    
    button {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 44px;
      border-radius: 12px;
      border: none;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: $transition;
      
      svg {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }
    }
    
    .btn-primary {
      background: $primary-gradient;
      color: white;
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(255, 107, 53, 0.4);
      }
      
      &:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
      }
    }
    
    .btn-secondary {
      background-color: white;
      color: $text-color;
      border: 1px solid $medium-grey;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      
      &:hover {
        background-color: $light-grey;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
}

// Elegant Analytics Grid
.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.analytics-card {
  background-color: white;
  border-radius: $border-radius;
  padding: 22px;
  display: flex;
  transition: $transition;
  box-shadow: $card-shadow;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    opacity: 0.1;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: $hover-shadow;
    
    .analytics-icon {
      transform: scale(1.05);
    }
  }
  
  .analytics-icon {
    width: 54px;
    height: 54px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 18px;
    transition: $transition;
    position: relative;
    
    svg {
      width: 28px;
      height: 28px;
      color: white;
      filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1));
    }
    
    &.revenue-icon {
      background: linear-gradient(135deg, $success-color, darken($success-color, 10%));
      box-shadow: 0 5px 15px rgba($success-color, 0.25);
    }
    
    &.customers-icon {
      background: linear-gradient(135deg, $primary-color, darken($primary-color, 10%));
      box-shadow: 0 5px 15px rgba($primary-color, 0.25);
    }
    
    &.meals-icon {
      background: linear-gradient(135deg, $warning-color, darken($warning-color, 10%));
      box-shadow: 0 5px 15px rgba($warning-color, 0.25);
    }
    
    &.retention-icon {
      background: linear-gradient(135deg, $info-color, darken($info-color, 10%));
      box-shadow: 0 5px 15px rgba($info-color, 0.25);
    }
  }
  
  .analytics-info {
    flex: 1;
    
    h3 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
      color: $dark-grey;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .analytics-value {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    
    .analytics-change {
      font-size: 13px;
      display: flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 20px;
      width: fit-content;
      font-weight: 500;
      
      svg {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
      
      &.positive {
        color: darken($success-color, 10%);
        background-color: rgba($success-color, 0.1);
      }
      
      &.negative {
        color: darken($danger-color, 5%);
        background-color: rgba($danger-color, 0.1);
      }
    }
  }
  
  &:nth-child(1)::after {
    background-color: $success-color;
  }
  
  &:nth-child(2)::after {
    background-color: $primary-color;
  }
  
  &:nth-child(3)::after {
    background-color: $warning-color;
  }
  
  &:nth-child(4)::after {
    background-color: $info-color;
  }
}

// Modern Chart Container
.chart-container {
  background-color: white;
  border-radius: $border-radius;
  box-shadow: $card-shadow;
  padding: 24px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  transition: $transition;
  
  &:hover {
    box-shadow: $hover-shadow;
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    h2 {
      font-size: 18px;
      font-weight: 700;
      display: flex;
      align-items: center;
      
      &::before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: $primary-gradient;
        margin-right: 10px;
      }
    }
    
    .chart-actions {
      .chart-period-select {
        padding: 8px 16px;
        border-radius: $input-radius;
        border: 1px solid $medium-grey;
        background-color: white;
        font-size: 14px;
        outline: none;
        cursor: pointer;
        transition: $transition;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%238A94A6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 10px center;
        background-size: 16px;
        padding-right: 36px;
        
        &:focus {
          border-color: $primary-color;
          box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
        }
      }
    }
  }
  
  .chart-placeholder {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 10px;
    
    .chart-bars {
      display: flex;
      align-items: flex-end;
      height: 250px;
      gap: 12px;
      
      .chart-bar {
        flex: 1;
        background: linear-gradient(180deg, rgba($primary-color, 0.8) 0%, rgba($primary-color, 0.2) 100%);
        border-radius: 6px 6px 0 0;
        transition: $transition;
        position: relative;
        cursor: pointer;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: $primary-color;
          border-radius: 0 0 3px 3px;
          opacity: 0;
          transition: $transition;
        }
        
        &:hover, &.active {
          background: linear-gradient(180deg, $primary-color 0%, rgba($primary-color, 0.4) 100%);
          
          &::after {
            opacity: 1;
          }
        }
        
        &.active::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: $primary-color;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      }
    }
    
    .chart-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      
      span {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: $dark-grey;
        font-weight: 500;
      }
    }
  }
}

// Dashboard Row
.dashboard-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 30px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
}

// Modern Dashboard Cards
.dashboard-card {
  background-color: white;
  border-radius: $border-radius;
  box-shadow: $card-shadow;
  overflow: hidden;
  transition: $transition;
  position: relative;
  
  &:hover {
    box-shadow: $hover-shadow;
    transform: translateY(-3px);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 24px;
    border-bottom: 1px solid $medium-grey;
    position: relative;
    
    h2 {
      font-size: 18px;
      font-weight: 600;
      display: flex;
      align-items: center;
      
      &::before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $primary-gradient;
        margin-right: 10px;
      }
    }
    
    .card-action {
      font-size: 14px;
      color: $primary-color;
      text-decoration: none;
      font-weight: 500;
      padding: 6px 12px;
      border-radius: 6px;
      transition: $transition;
      
      &:hover {
        background-color: rgba($primary-color, 0.1);
      }
    }
  }
  
  .card-content {
    padding: 20px 24px;
  }
}

// Sleek Orders Table
.orders-table {
  width: 100%;
  border-collapse: collapse;
  
  th {
    text-align: left;
    padding: 12px 8px;
    font-size: 13px;
    color: $dark-grey;
    font-weight: 600;
    border-bottom: 1px solid $medium-grey;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  td {
    padding: 16px 8px;
    border-bottom: 1px solid $light-grey;
    font-size: 14px;
  }
  
  tbody tr {
    transition: $transition;
    
    &:hover {
      background-color: rgba($light-grey, 0.5);
    }
    
    &:last-child td {
      border-bottom: none;
    }
  }
  
  .customer-info {
    display: flex;
    align-items: center;
    
    .customer-avatar {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, $accent-color, darken($accent-color, 15%));
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 13px;
      margin-right: 12px;
      box-shadow: 0 3px 8px rgba($accent-color, 0.2);
    }
    
    .customer-name {
      font-weight: 500;
    }
  }
  
  .status-badge {
    display: inline-block;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    &.preparing {
      background-color: rgba($warning-color, 0.15);
      color: darken($warning-color, 20%);
    }
    
    &.scheduled {
      background-color: rgba($info-color, 0.15);
      color: darken($info-color, 20%);
    }
    
    &.completed {
      background-color: rgba($success-color, 0.15);
      color: darken($success-color, 15%);
    }
  }
}

// Modern Popular Plans
.plan-item {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 14px;
  border-radius: 10px;
  transition: $transition;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background-color: $light-grey;
    
    .plan-icon {
      transform: scale(1.05);
    }
  }
  
  .plan-icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    transition: $transition;
    
    svg {
      width: 24px;
      height: 24px;
      color: white;
    }
    
    &.weekly-meal {
      background: linear-gradient(135deg, #673AB7, #9C27B0);
      box-shadow: 0 4px 10px rgba(#673AB7, 0.25);
    }
    
    &.family-dinner {
      background: linear-gradient(135deg, #FF5722, #F44336);
      box-shadow: 0 4px 10px rgba(#FF5722, 0.25);
    }
    
    &.plant-based {
      background: linear-gradient(135deg, #4CAF50, #8BC34A);
      box-shadow: 0 4px 10px rgba(#4CAF50, 0.25);
    }
    
    &.dinner-party {
      background: linear-gradient(135deg, #2196F3, #03A9F4);
      box-shadow: 0 4px 10px rgba(#2196F3, 0.25);
    }
  }
  
  .plan-details {
    flex: 1;
    
    h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    p {
      font-size: 13px;
      color: $dark-grey;
      margin-bottom: 8px;
    }
    
    .plan-popularity {
      height: 6px;
      background-color: $light-grey;
      border-radius: 3px;
      overflow: hidden;
      
      .popularity-bar {
        height: 100%;
        border-radius: 3px;
        background: $primary-gradient;
      }
    }
  }
  
  .plan-price {
    font-weight: 700;
    font-size: 16px;
    color: $secondary-color;
    margin-left: 16px;
    
    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgba($primary-color, 0.2);
      margin-right: 6px;
    }
  }
}

// Sleek Recent Activity
.activity-item {
  display: flex;
  padding: 16px;
  margin-bottom: 14px;
  border-radius: 10px;
  transition: $transition;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background-color: $light-grey;
    
    .activity-icon {
      transform: scale(1.05);
    }
  }
  
  .activity-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    transition: $transition;
    
    svg {
      width: 22px;
      height: 22px;
      color: white;
    }
    
    &.new-subscriber {
      background: linear-gradient(135deg, #9C27B0, #673AB7);
      box-shadow: 0 4px 10px rgba(#9C27B0, 0.2);
    }
    
    &.payment {
      background: linear-gradient(135deg, #2196F3, #03A9F4);
      box-shadow: 0 4px 10px rgba(#2196F3, 0.2);
    }
    
    &.delivery {
      background: linear-gradient(135deg, #FF9800, #FF5722);
      box-shadow: 0 4px 10px rgba(#FF9800, 0.2);
    }
    
    &.feedback {
      background: linear-gradient(135deg, #F44336, #E91E63);
      box-shadow: 0 4px 10px rgba(#F44336, 0.2);
    }
  }
  
  .activity-details {
    flex: 1;
    
    .activity-text {
      font-size: 14px;
      margin-bottom: 4px;
      line-height: 1.5;
      
      .bold {
        font-weight: 600;
        color: $secondary-color;
      }
    }
    
    .activity-time {
      font-size: 12px;
    }
}
}

</style>