<template>
    <div class="delivery-pickup-page">
      <!-- Header -->
      <header class="header">
        <div class="container">
          <div class="logo"></div>
        </div>
      </header>
  
      <!-- Main content -->
      <main class="main-content">
        <div class="container">
          <!-- Headline and subheading -->
          <div class="page-heading">
            <h1 class="headline">Choose Your Order Method</h1>
            <p class="subheading">Tell us how you'd like to enjoy your meal today</p>
          </div>
  
          <!-- Options container -->
          <div class="options-container">
            <!-- Delivery option -->
            <div 
              class="option-card" 
              :class="{ 'selected': selectedOption === 'delivery' }"
              @click="selectOption('delivery')"
              @mouseenter="showDeliveryTooltip = true"
              @mouseleave="showDeliveryTooltip = false"
            >
              <div class="option-marker" v-if="selectedOption === 'delivery'"></div>
              <div class="option-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 9L18 3H6L4.5 9M19.5 9H4.5M19.5 9L21 15H3L4.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 18C7 19.1046 6.10457 20 5 20C3.89543 20 3 19.1046 3 18" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M21 18C21 19.1046 20.1046 20 19 20C17.8954 20 17 19.1046 17 18" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M7 15V18" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M17 15V18" stroke="currentColor" stroke-width="1.5"/>
                </svg>
              </div>
              <div class="option-content">
                <h3 class="option-title">Delivery</h3>
                <p class="option-description">Sit back and relax, it will be brought to you</p>
                
                
                <div class="option-details" v-if="selectedOption === 'delivery' && false">
                  <div class="detail-item">
                    <div class="detail-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <span>Estimated delivery: 25-35 min</span>
                  </div>
                  
                  <div class="detail-item">
                    <div class="detail-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M12 8H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M11 12H12V16H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <span>No delivery fee on your first order</span>
                  </div>
                  
                  <div class="address-input">
                    <div class="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 6.22876 7.58172 3 12 3C16.4183 3 20 6.22876 20 10Z" stroke="currentColor" stroke-width="1.5"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Enter your address"
                      v-model="address"
                      @focus="showAddressTooltip = true"
                      @blur="showAddressTooltip = false"
                    />
                    <div class="input-tooltip" v-if="showAddressTooltip">
                      We'll save this for faster checkout next time
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Pickup option -->
            <div 
                
              class="option-card" 
              :class="{ 'selected': selectedOption === 'pickup' }"
              @click="selectOption('pickup')"
              @mouseenter="showPickupTooltip = true"
              @mouseleave="showPickupTooltip = false"
            >
              <div class="option-marker" v-if="selectedOption === 'pickup'"></div>
              <div class="option-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 6.22876 7.58172 3 12 3C16.4183 3 20 6.22876 20 10Z" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
                </svg>
              </div>
              <div class="option-content">
                <h3 class="option-title">Pickup</h3>
                <p class="option-description">Skip the line, save on fees</p>
                
                <template v-if="false">


                    <div class="tooltip" v-if="showPickupTooltip && selectedOption !== 'pickup'">
                      Ready in 10-15 minutes!
                    </div>
                    <div class="option-details" v-if="selectedOption === 'pickup'">
                      <div class="detail-item">
                        <div class="detail-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </div>
                        <span>Ready in: 10-15 min</span>
                      </div>
                      
                      <div class="detail-item">
                        <div class="detail-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 4H17C19.2091 4 21 5.79086 21 8V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V8C3 5.79086 4.79086 4 7 4H9" stroke="currentColor" stroke-width="1.5"/>
                            <rect x="9" y="2" width="6" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M9 10L11 12L15 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </div>
                        <span>No service fees, earn 2x rewards points</span>
                      </div>
                      
                      <div class="store-selector">
                        <div class="store-label">Nearest location:</div>
                        <div class="store-info">
                          <strong>FoodFast Downtown</strong>
                          <span class="store-distance">1.2 miles away</span>
                        </div>
                        <button class="change-store-btn">Change</button>
                      </div>
                    </div>
                </template>
                
              </div>
            </div>
          </div>
  
          <!-- Action button -->
          <div class="action-container">
            <button 
              class="cta-button" 
              :disabled="!selectedOption"
              @click="continueToMenu"
            >
              <span v-if="selectedOption">Continue to Menu</span>
              <span v-else>Select an option</span>
            </button>
            <p class="cta-subtext" v-if="selectedOption">You can change this later</p>
          </div>
        </div>
      </main>
  
      <!-- App benefits footer -->
      <footer class="app-benefits">
        <div class="container">
          <div class="benefits-list">
            <div class="benefit-item">
              <div class="benefit-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 10L11 12L15 8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>Locally sourced</span>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L14 14M3.34998 17C2.8695 15.7735 2.6 14.4154 2.6 13C2.6 7.1634 7.1634 2.6 13 2.6C18.8366 2.6 23.4 7.1634 23.4 13C23.4 18.8366 18.8366 23.4 13 23.4C11.5846 23.4 10.2265 23.1305 9 22.65" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 15L3 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>Fast service</span>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 10H8M16 14H8M12 18H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>No hidden fees</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeliveryPickupPage',
    data() {
      return {
        selectedOption: null,
        address: '',
        showDeliveryTooltip: false,
        showPickupTooltip: false,
        showAddressTooltip: false
      }
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
      },
      continueToMenu() {
        if (this.selectedOption) {
          // Save the selected option to route query or store
          this.$router.push({
            query: { 
            ...this.$route.query,
              mode: this.selectedOption,
              
            }
          });

          this.$emit('onChoose', this.selectedOption.toLowerCase())
          this.$emit('close')

          let page = document.getElementById('page');
          if (page) page.scrollIntoView({behavior: 'smooth'})
        }
      }
    },
    mounted() {
      // Auto-detect user location if possible
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // In a real app, we would use a geocoding service to turn coordinates into an address
          console.log("Location detected:", position.coords.latitude, position.coords.longitude);
        });
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  // Variables
  $primary-color: #E53945;
  $primary-light: rgba(229, 57, 69, 0.1);
  $text-dark: #333333;
  $text-medium: #686868;
  $text-light: #939393;
  $border-color: #E0E0E0;
  $background-light: #F8F8F8;
  $shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  $shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
  $transition: all 0.25s ease;
  
  // Base styles
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  // Layout styles
  .delivery-pickup-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: $background-light;
  }
  
  .container {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  // Header styles
  .header {
    padding: 16px 0;
    background-color: white;
    box-shadow: $shadow-sm;
    position: sticky;
    top: 0;
    z-index: 10;
  
    .logo {
      font-size: 22px;
      font-weight: 600;
      color: $primary-color;
    }
  }
  
  // Main content styles
  .main-content {
    flex: 1;
    padding: 24px 0;
  }
  
  .page-heading {
    text-align: center;
    margin-bottom: 32px;
  
    .headline {
      font-size: 28px;
      font-weight: 700;
      color: $text-dark;
      margin-bottom: 8px;
      line-height: 1.2;
    }
  
    .subheading {
      font-size: 16px;
      color: $text-medium;
      max-width: 300px;
      margin: 0 auto;
    }
  }
  
  // Options container styles
  .options-container {
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .option-card {
    position: relative;
    background-color: white;
    border-radius: 12px;
    border: 2px solid $border-color;
    padding: 20px;
    cursor: pointer;
    transition: $transition;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: $shadow-md;
      border-color: $primary-color;
    }
    
    &.selected {
      border-color: $primary-color;
      background-color: white;
      box-shadow: $shadow-md;
      
      .option-icon {
        color: $primary-color;
        background-color: $primary-light;
      }
      
      .option-title {
        color: $primary-color;
      }
    }
  }
  
  .option-marker {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 30px 30px 0;
    border-color: transparent $primary-color transparent transparent;
  }
  
  .option-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    min-width: 48px;
    background-color: #F3F3F3;
    border-radius: 50%;
    margin-right: 16px;
    transition: $transition;
    color: $text-dark;
  }
  
  .option-content {
    flex: 1;
    position: relative;
  }
  
  .option-title {
    font-size: 18px;
    font-weight: 600;
    color: $text-dark;
    margin-bottom: 4px;
    transition: $transition;
  }
  
  .option-description {
    font-size: 14px;
    color: $text-medium;
    margin-bottom: 4px;
  }
  
  .tooltip {
    position: absolute;
    top: -8px;
    right: 0;
    background-color: $primary-color;
    color: white;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    animation: fadeIn 0.3s;
    z-index: 5;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      right: 8px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 4px 0 4px;
      border-color: $primary-color transparent transparent transparent;
    }
  }
  
  // Option details styles (shown when selected)
  .option-details {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid $border-color;
    animation: fadeIn 0.3s;
  }
  
  .detail-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    font-size: 14px;
    color: $text-medium;
    
    .detail-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      color: $primary-color;
    }
  }
  
  .address-input {
    position: relative;
    margin-top: 16px;
    
    input {
      width: 100%;
      padding: 12px 12px 12px 36px;
      border: 1px solid $border-color;
      border-radius: 8px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: $primary-color;
      }
    }
    
    .input-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: $text-light;
    }
    
    .input-tooltip {
      position: absolute;
      bottom: -40px;
      left: 0;
      width: 100%;
      background-color: $text-dark;
      color: white;
      font-size: 12px;
      padding: 8px;
      border-radius: 4px;
      animation: fadeIn 0.3s;
      z-index: 5;
      
      &::after {
        content: '';
        position: absolute;
        top: -4px;
        left: 20px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 4px 4px 4px;
        border-color: transparent transparent $text-dark transparent;
      }
    }
  }
  
  .store-selector {
    margin-top: 16px;
    background-color: $background-light;
    padding: 12px;
    border-radius: 8px;
    
    .store-label {
      font-size: 12px;
      color: $text-light;
      margin-bottom: 4px;
    }
    
    .store-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      
      strong {
        font-size: 14px;
        color: $text-dark;
      }
      
      .store-distance {
        font-size: 12px;
        color: $text-medium;
      }
    }
    
    .change-store-btn {
      width: 100%;
      background-color: white;
      border: 1px solid $border-color;
      border-radius: 4px;
      padding: 6px;
      font-size: 12px;
      cursor: pointer;
      
      &:hover {
        border-color: $primary-color;
        color: $primary-color;
      }
    }
  }
  
  // Action container styles
  .action-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 100%;
    max-width: 300px;
    background-color: $primary-color;
    color: white;
    font-size: 16px;
    font-weight: 600;
    padding: 16px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: $transition;
    box-shadow: 0 4px 12px rgba(229, 57, 69, 0.2);
    
    &:hover:not(:disabled) {
      background-color: darken($primary-color, 5%);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(229, 57, 69, 0.3);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
    
    &:disabled {
      background-color: $border-color;
      color: $text-medium;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
  
  .cta-subtext {
    margin-top: 12px;
    font-size: 13px;
    color: $text-light;
    animation: fadeIn 0.3s;
  }
  
  // App benefits footer
  .app-benefits {
    margin-top: auto;
    padding: 16px 0;
    background-color: white;
    border-top: 1px solid $border-color;
    
    .benefits-list {
      display: flex;
      justify-content: space-around;
    }
    
    .benefit-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: $text-medium;
      
      .benefit-icon {
        display: flex;
        align-items: center;
        margin-right: 4px;
        color: $primary-color;
      }
    }
  }
  
  // Animations
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  // Media queries
  @media (max-width: 480px) {
    .page-heading {
      .headline {
        font-size: 24px;
      }
    }
    
    .option-card {
      padding: 16px;
    }
    
    .option-icon {
      width: 40px;
      height: 40px;
      min-width: 40px;
    }
    
    .option-title {
      font-size: 16px;
    }
  }
  </style>