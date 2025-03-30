
<!-- pages/index.vue -->
<!-- pages/index.vue (template part) -->
<template>
    <div class="landing-page">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="container flex gap-40">
          <div class="hero-content">
            <div class="logo-container">
              <svg class="chef-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF8A65">
                <path d="M12 2C8.96 2 6.5 4.46 6.5 7.5V9.04C4.98 9.28 3.5 10.51 3.5 12.25C3.5 14.07 5.07 15.5 7 15.5H17C18.93 15.5 20.5 14.07 20.5 12.25C20.5 10.51 19.02 9.28 17.5 9.04V7.5C17.5 4.46 15.04 2 12 2ZM15.5 7.5V9H8.5V7.5C8.5 5.57 10.07 4 12 4C13.93 4 15.5 5.57 15.5 7.5ZM7 17.5V19.5H9V22H15V19.5H17V17.5H7Z" />
              </svg>
              <div class="flex gap-2 flex-center-x flex-center-y">
                <h2 class="logo-text">
                  Chefpoint
                </h2>
                <span style="color: #E53945">by PointsBud</span>
              </div>
            </div>
            
            <div v-if="chefName" class="personal-invite">
              <span class="for-chef">For {{ chefName }}</span>
            </div>
            
            <h1 class="main-heading">
              <span v-if="chefName">{{ chefName }}, Build</span>
              <span v-else>Build</span> Steady Revenue with Meal Subscriptions.
            </h1>
            
            <p class="sub-heading">
              <span v-if="chefName">You're not just a talented chef, {{ chefName }} — you're a business owner.</span>
              <span v-else>You're not just a chef — you're a business owner.</span>
              Let us help you turn one-time clients into loyal, paying subscribers.
            </p>
            
            <div class="cta-button">
              <a href="#waitlist">Join the Waitlist</a>
            </div>
          </div>
          
          <div class="hero-image">
            <img height="400" width="400" src="https://pointsbud-images.s3.amazonaws.com/a4a63b43e35973e95dff969f0029557d">
          </div>
        </div>
      </div>
  
      <!-- Plans Section -->
      <div class="plans-section">
        <div class="container">
          <h2 class="section-heading">
            <span v-if="chefName">{{ chefName }}, Explore These Example Subscription Plans</span>
            <span v-else>Example Subscription Plans</span>
          </h2>
          
          <div class="plans-container">
            <!-- Plan 1 -->
            <div class="plan-card">
              <div class="plan-image plan-image-1">
                <img src="https://pointsbud-images.s3.amazonaws.com/b83c6f67ba8024e9226bab1ff44e9adb" alt="">
              </div>
              <div class="plan-details">
                <h3>Weekly Meal Prep</h3>
                <p>Five personalized meals delivered each week</p>
                <div class="plan-price"><span>$200</span> / month</div>
              </div>
            </div>
            
            <!-- Plan 2 -->
            <div class="plan-card">
              <div class="plan-image plan-image-2">
                <img src="https://pointsbud-images.s3.amazonaws.com/39dc17b59d5beb13f493b8c10e4584f3" alt="">
              </div>
              <div class="plan-details">
                <h3>Plant-Based</h3>
                <p>Nutritionally-balanced vegan dishes</p>
                <div class="plan-price"><span>$150</span> / month</div>
              </div>
            </div>
            
            <!-- Plan 3 -->
            <div class="plan-card">
              <div class="plan-image plan-image-3">
                <img src="https://pointsbud-images.s3.amazonaws.com/804adf94a24ce1c1c9fa0fbd5fe1175c" alt="">
              </div>
              <div class="plan-details">
                <h3>Family Dinners</h3>
                <p>Fresh, home-style dinners for families</p>
                <div class="plan-price"><span>$250</span> / month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="how-it-works-section">
        <div class="container">
          <div class="section-icon">🧩</div>
          <h2 class="section-heading">How It Works</h2>
          <p class="section-tagline">
            <span v-if="chefName">{{ chefName }}, turn your culinary creativity into predictable income — in just a few simple steps.</span>
            <span v-else>Turn your culinary creativity into predictable income — in just a few simple steps.</span>
          </p>
          
          <div class="steps-container">
            <!-- Step 1 -->
            <div class="step-card">
              <div class="step-header">
                <div class="step-icon">🥘</div>
                <h3 class="step-number">1. Design Your Subscription</h3>
              </div>
              <p class="step-description">
                Create custom meal plans, dinner experiences, or health-focused menus. Offer weekly, bi-weekly, or monthly options — with full control over pricing, delivery, and personalization.
              </p>
              <div class="examples-block">
                <h4>Examples:</h4>
                <ul>
                  <li>5-meal weekly prep for busy families</li>
                  <li>Monthly private dinner with wine pairings</li>
                  <li>Gut health subscription with seasonal adjustments</li>
                </ul>
              </div>
            </div>
            
            <!-- Step 2 -->
            <div class="step-card">
              <div class="step-header">
                <div class="step-icon">🎨</div>
                <h3 class="step-number">2. Customize Your Brand</h3>
              </div>
              <p class="step-description">
                Make it <em>yours</em>. Upload your logo, add brand colors, write your bio, and set your availability. Your clients get a polished, personalized portal that feels like an extension of you.
              </p>
            </div>
            
            <!-- Step 3 -->
            <div class="step-card">
              <div class="step-header">
                <div class="step-icon">💳</div>
                <h3 class="step-number">3. Launch & Start Earning</h3>
              </div>
              <p class="step-description">
                Clients can browse your offerings, subscribe, and pay — all in one place. We handle billing, reminders, and renewals — you just focus on the food.
              </p>
            </div>
            
            <!-- Step 4 -->
            <div class="step-card">
              <div class="step-header">
                <div class="step-icon">📲</div>
                <h3 class="step-number">4. Manage with Ease</h3>
              </div>
              <p class="step-description">
                Use your dashboard to:
              </p>
              <ul class="dashboard-features">
                <li>View upcoming orders</li>
                <li>Adjust menus and availability</li>
                <li>Track revenue, retention, and meal popularity</li>
                <li>Communicate with clients</li>
              </ul>
              <p class="step-description">
                Everything's automated. No more chasing invoices or juggling spreadsheets.
              </p>
            </div>
            
            <!-- Step 5 -->
            <div class="step-card">
              <div class="step-header">
                <div class="step-icon">🔁</div>
                <h3 class="step-number">5. Delight & Retain</h3>
              </div>
              <p class="step-description">
                Deliver incredible meals. Get feedback. Refine your offerings. Grow a loyal base of subscribers who never want to cook again.
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="waitlist-form" id="waitlist" v-if="!signed_up">
        <p v-if="chefName" class="personalized-invite">{{ chefName }}, ready to take your culinary business to the next level?</p>
        <div class="form-fields">
          <input 
            type="text" 
            v-model="payload.business" 
            placeholder="Business Name" 
            :disabled="signing_up"
          />
          <input 
            type="email" 
            v-model="payload.email" 
            placeholder="Email Address" 
            :disabled="signing_up"
          />
        </div>
        <div class="cta-button">
          <button @click="signup()" :disabled="signing_up">
            <span v-if="!signing_up">Join the Waitlist</span>
            <span v-else>Please wait...</span>
          </button>
        </div>
      </div>
      <div class="success-message" v-else>
        <div class="success-icon">✓</div>
        <h3><span v-if="chefName">Thanks {{ chefName }}!</span><span v-else>Thanks for joining!</span></h3>
        <p>We'll be in touch when Chefpoint is ready!</p>
      </div>
  
      <!-- Features Section -->
      <div class="features-section">
        <div class="container">
          <h2 class="section-heading">Manage Subscribers with Ease</h2>
          
          <div class="features-container">
            <!-- Feature 1 -->
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333">
                  <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM7 12H12V17H7V12Z" />
                </svg>
              </div>
              <h3>Simple Setup</h3>
              <p>Create and customize your subscription offerings in minutes.</p>
            </div>
            
            <!-- Feature 2 -->
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11.3 6.27C11.05 6.17 10.78 6.1 10.5 6.1C9.12 6.1 8 7.22 8 8.6C8 9.98 9.12 11.1 10.5 11.1C10.78 11.1 11.05 11.03 11.3 10.93C10.5 10.32 10 9.23 10 8.6C10 7.97 10.5 6.88 11.3 6.27ZM14.5 12.9C13.12 12.9 12 14.02 12 15.4C12 16.78 13.12 17.9 14.5 17.9C15.88 17.9 17 16.78 17 15.4C17 14.02 15.88 12.9 14.5 12.9ZM14.5 6.1C13.12 6.1 12 7.22 12 8.6C12 9.98 13.12 11.1 14.5 11.1C15.88 11.1 17 9.98 17 8.6C17 7.22 15.88 6.1 14.5 6.1ZM9.5 12.9C8.12 12.9 7 14.02 7 15.4C7 16.78 8.12 17.9 9.5 17.9C10.88 17.9 12 16.78 12 15.4C12 14.02 10.88 12.9 9.5 12.9Z" />
                </svg>
              </div>
              <h3>Recurring Payments</h3>
              <p>Automate billing and manage subscription renewals effortlessly.</p>
            </div>
            
            <!-- Feature 3 -->
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333333">
                  <path d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4.58 16.59L4 17.17V4H20V16ZM11 12H13V14H11V12ZM11 6H13V10H11V6Z" />
                </svg>
              </div>
              <h3>Client Communication</h3>
              <p>Engage with subscribers and manage requests from one platform.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
// pages/index.vue (script part)
export default {
  head() {
    return {
      title: `${this.chefName} Invitation`,
      meta: [
        { hid: 'description', name: 'description', content: 'A SaaS platform that enables restaurants and personal chefs to easily create custom meal subscriptions.' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap' }
      ]
    }
  },

  data() {
    return {
      payload: {
        business: '',
        email: ''
      },
      signing_up: false,
      signed_up: false,
      chefName: null
    }
  },
  
  mounted() {
    // Get the chef name from the URL query parameter
    if (process.client) {
      const urlParams = new URLSearchParams(window.location.search);
      const nameParam = urlParams.get('n');
      
      if (nameParam) {
        // Decode and format the name properly
        this.chefName = decodeURIComponent(nameParam)
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
          
        // Pre-populate business name field if chef name exists
        if (this.chefName) {
          this.payload.business = ``;
        }
      }
    }
  },
  
  methods: {
    signup() {
      if (!this.payload.business || !this.payload.email) {
        alert('Please fill in both business name and email');
        return;
      }
      
      this.signing_up = true;
      this.$api.post('/waitlist/demo', {
        ...this.payload,
        referralName: this.chefName || null // Track if they came from a personalized link
      })
      .then(resp => {
        this.signed_up = true;
      })
      .catch(err => {
        alert('There was an error. Please try again.');
        console.error(err);
      })
      .finally(() => {
        this.signing_up = false;
      });
    }
  }
}
  </script>
  
  /* pages/index.vue (style part) */
  <style scoped lang="scss">
  $primary-color: #FF8A65;
  $secondary-color: #333;
  $light-grey: #f5f5f5;
  $dark-grey: #666;
  $accent-color: #E53945;
  $box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  $border-radius: 12px;
  $font-family: 'Poppins', sans-serif;
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  
  h2, h1 {
    font-family: Poppins !important;
  
    span {
      font-family: Poppins !important;
    }
  }
  
  body {
    font-family: $font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Global styles
  .landing-page {
    font-family: $font-family;
    color: $secondary-color;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .section-heading {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 60px;
  }
  
  // Hero Section
  .hero-section {
    padding: 80px 0;
    background: linear-gradient(135deg, #f1efe2 0%, #e9d9e0 100%);
    position: relative;
    overflow: hidden;
  
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  
    .hero-content {
      flex: 1;
      max-width: 550px;
      z-index: 2;
    }
  
    .logo-container {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
  
      .chef-icon {
        width: 40px;
        height: 40px;
        margin-right: 12px;
      }
  
      .logo-text {
        font-size: 28px;
        font-weight: 700;
        margin: 0;
      }
    }
  
    .personal-invite {
      background-color: rgba($accent-color, 0.1);
      color: $accent-color;
      padding: 8px 16px;
      border-radius: 50px;
      font-weight: 600;
      display: inline-block;
      margin-bottom: 20px;
      border: 2px solid $accent-color;
      
      .for-chef {
        font-weight: 700;
      }
    }
  
    .main-heading {
      font-size: 42px;
      font-weight: 800;
      margin-bottom: 24px;
      line-height: 1.2;
    }
  
    .sub-heading {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 32px;
    }
  
    .hero-image {
      flex: 1;
      position: relative;
      min-height: 480px;
  
      img {
        border-radius: 20px;
        box-shadow: $box-shadow;
      }
    }
  }
  
  // Plans Section
  .plans-section {
    padding: 100px 0;
    background-color: white;
  
    .plans-container {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
    }
  
    .plan-card {
      width: 320px;
      border-radius: $border-radius;
      background-color: white;
      box-shadow: $box-shadow;
      overflow: hidden;
      transition: transform 0.3s ease;
  
      &:hover {
        transform: translateY(-5px);
      }
  
      .plan-image {
        height: 180px;
        background-size: cover;
        background-position: center;
  
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
  
        &.plan-image-1 {
          background-color: #f1f1f1;
        }
  
        &.plan-image-2 {
          background-color: #e8f4e8;
        }
  
        &.plan-image-3 {
          background-color: #f4e8e8;
        }
      }
  
      .plan-details {
        padding: 24px;
  
        h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
        }
  
        p {
          font-size: 16px;
          color: #666;
          margin-bottom: 16px;
          min-height: 44px;
        }
  
        .plan-price {
          font-size: 16px;
          color: #666;
  
          span {
            color: $primary-color;
            font-size: 24px;
            font-weight: 700;
          }
        }
      }
    }
  }
  
  // Features Section
  .features-section {
    padding: 100px 0;
    background-color: $light-grey;
  
    .features-container {
      display: flex;
      justify-content: center;
      gap: 40px;
      flex-wrap: wrap;
    }
  
    .feature-card {
      width: 300px;
      text-align: center;
  
      .feature-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 24px;
        display: flex;
        align-items: center;
        justify-content: center;
  
        svg {
          width: 60%;
          height: 60%;
        }
      }
  
      h3 {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 16px;
      }
  
      p {
        font-size: 16px;
        color: #666;
        line-height: 1.6;
      }
    }
  }
  
  // How It Works Section
  .how-it-works-section {
    padding: 100px 0;
    background-color: white;
  
    .section-icon {
      font-size: 40px;
      text-align: center;
      margin-bottom: 16px;
    }
  
    .section-tagline {
      text-align: center;
      font-size: 20px;
      max-width: 700px;
      margin: 0 auto 60px;
      color: $dark-grey;
      font-weight: 500;
    }
  
    .steps-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      width: 90%;
      margin: 0 auto;
    }
  
    .step-card {
      padding: 30px;
      background-color: #fff;
      border-radius: $border-radius;
      box-shadow: $box-shadow;
      transition: transform 0.3s ease;
  
      &:hover {
        transform: translateY(-5px);
      }
  
      .step-header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }
  
      .step-icon {
        font-size: 32px;
        margin-right: 16px;
      }
  
      .step-number {
        font-size: 22px;
        font-weight: 700;
        margin: 0;
      }
  
      .step-description {
        font-size: 16px;
        color: $dark-grey;
        line-height: 1.6;
        margin-bottom: 16px;
      }
  
      .examples-block {
        background-color: rgba($primary-color, 0.1);
        padding: 16px;
        border-radius: 8px;
        margin-top: 16px;
  
        h4 {
          font-weight: 600;
          margin-bottom: 8px;
        }
  
        ul {
          padding-left: 20px;
          
          li {
            margin-bottom: 8px;
          }
        }
      }
    }
  }
  
  .waitlist-form {
    width: 50%;
    margin: 0 auto;
    padding: 60px 30px;
    background-color: white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    text-align: center;
    
    .personalized-invite {
      font-size: 20px;
      font-weight: 600;
      color: $accent-color;
      margin-bottom: 20px;
    }
  
    .form-fields {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;
      
      input {
        padding: 14px 20px;
        border: 2px solid rgba(0,0,0,0.1);
        border-radius: 8px;
        font-size: 16px;
        font-family: $font-family;
        transition: all 0.2s ease;
        width: 100%;
        
        &:focus {
          outline: none;
          border-color: $primary-color;
        }
        
        &:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }
      }
    }
  }
  
  .success-message {
    background-color: #e8f5e9;
    width: 50%;
    margin: 0 auto;
    padding: 30px;
    border-radius: $border-radius;
    text-align: center;
    
    .success-icon {
      width: 50px;
      height: 50px;
      background-color: #4caf50;
      color: white;
      font-size: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }
    
    h3 {
      font-size: 24px;
      margin-bottom: 8px;
    }
    
    p {
      color: #4caf50;
      font-size: 18px;
    }
  }
  
  .cta-button {
    button, a {
      background-color: $primary-color;
      color: white;
      font-size: 18px;
      font-weight: 600;
      padding: 16px 32px;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-block;
      text-decoration: none;
  
      &:hover:not(:disabled) {
        background-color: darken($primary-color, 10%);
        transform: translateY(-2px);
      }
      
      &:disabled {
        background-color: #ddd;
        cursor: not-allowed;
      }
    }
  }
  
  // Responsive styles
  @media (max-width: 992px) {
    .hero-section {
      .container {
        flex-direction: column;
      }
  
      .hero-content {
        max-width: 100%;
        text-align: center;
        margin-bottom: 60px;
      }
  
      .logo-container {
        justify-content: center;
      }
  
      .hero-image {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
    
    .waitlist-form, .success-message {
      width: 80%;
    }
  }
  
  @media (max-width: 768px) {
    .hero-section {
      padding: 60px 0;
  
      .main-heading {
        font-size: 32px;
      }
    }
  
    .plans-section,
    .features-section,
    .how-it-works-section {
      padding: 60px 0;
    }
  
    .section-heading {
      font-size: 28px;
      margin-bottom: 40px;
    }
    
    .steps-container {
      grid-template-columns: 1fr !important;
    }
    
    .waitlist-form, .success-message {
      width: 95%;
      padding: 30px 20px;
    }
  }
  </style>