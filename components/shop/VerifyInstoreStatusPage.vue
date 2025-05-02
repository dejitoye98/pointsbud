<template>
    <div class="order-method-page">
      <!-- Main content -->
      <main class="main-content">
        <div class="container">
          <!-- In-store confirmation section -->
          <div class="instore-confirmation">
            <div class="confirmation-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7H21M3 7V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V7M3 7L5 3H19L21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 12C13.1046 12 14 11.1046 14 10M8 20V7M16 20V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            
            <h2 class="confirmation-title">Confirm you're at the restaurant</h2>
            <p class="confirmation-subtitle">This will allow you to place an order for immediate payment</p>
            
            <button class="confirm-button" @click="confirmInStore">
              Yes, I'm at the restaurant
            </button>
          </div>
          
          <!-- Alternative options section -->
          <div class="alternative-options">
            <p class="alternatives-label">Not at the restaurant?</p>
            
            <div class="options-container">
              <!-- Delivery option -->
              <div 
                class="option-card" 
                @click="switchToOption('delivery')"
              >
                <div class="option-icon delivery-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 9L18 3H6L4.5 9M19.5 9H4.5M19.5 9L21 15H3L4.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 18C7 19.1046 6.10457 20 5 20C3.89543 20 3 19.1046 3 18" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M21 18C21 19.1046 20.1046 20 19 20C17.8954 20 17 19.1046 17 18" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M7 15V18" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M17 15V18" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="option-content">
                  <h3 class="option-title">Switch to Delivery</h3>
                  <p class="option-description">We'll bring it to your doorstep</p>
                </div>
              </div>
  
              <!-- Pickup option -->
              <div 
                class="option-card" 
                @click="switchToOption('pickup')"
              >
                <div class="option-icon pickup-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 6.22876 7.58172 3 12 3C16.4183 3 20 6.22876 20 10Z" stroke="currentColor" stroke-width="1.5"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="option-content">
                  <h3 class="option-title">Switch to Pickup</h3>
                  <p class="option-description">Ready for pickup at your convenience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    props: ['business', 'locations'],
    data() {
      return {
        selectedOption: 'instore' // Default is instore since this is the confirmation screen
      }
    },
    methods: {
      confirmInStore() {
        // Confirm the user is at the restaurant and continue
        let page = document.getElementById('page');
        if (page) page.scrollIntoView({behavior: 'smooth'})
        //this.$emit('onChoose', 'dinein');
        this.$emit('close');
      },
      switchToOption(option) {
        // Switch to delivery or pickup
        this.$router.push({
          query: { 
            ...this.$route.query, 
            mode: option 
          }
        });

        this.removeQueryParam('t')
        this.$emit('onChoose', option);
        this.$emit('close');


        let page = document.getElementById('page');
        if (page) {
            page.scrollIntoView({behavior: 'smooth'})
        }
      },
      removeQueryParam(paramName) {
        const newQuery = { ...this.$route.query };
        delete newQuery[paramName];
        
        this.$router.push({
            query: newQuery
        });
        }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  // Variables
  $primary-color: #E53945;
  $primary-light: rgba(229, 57, 69, 0.08);
  $primary-dark: darken($primary-color, 10%);
  $text-dark: #333333;
  $text-medium: #686868;
  $text-light: #939393;
  $border-color: #E0E0E0;
  $background-light: #F8F8F8;
  $shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  $shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
  $transition: all 0.2s ease;
  
  // Layout
  .order-method-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
  
  .container {
    padding: 24px;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
  }
  
  .main-content {
    flex: 1;
  }
  
  // In-store confirmation
  .instore-confirmation {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px 16px;
    margin-bottom: 32px;
    border-radius: 12px;
    background-color: $primary-light;
    
    .confirmation-icon {
      color: $primary-color;
      margin-bottom: 16px;
    }
    
    .confirmation-title {
      font-size: 20px;
      font-weight: 600;
      color: $text-dark;
      margin: 0 0 8px;
    }
    
    .confirmation-subtitle {
      font-size: 14px;
      color: $text-medium;
      margin: 0 0 24px;
      max-width: 300px;
    }
  }
  
  .confirm-button {
    background-color: $primary-color;
    color: white;
    font-size: 16px;
    font-weight: 600;
    padding: 14px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: $transition;
    min-width: 220px;
    box-shadow: 0 4px 12px rgba(229, 57, 69, 0.2);
    
    &:hover {
      background-color: $primary-dark;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(229, 57, 69, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  // Alternative options
  .alternative-options {
    .alternatives-label {
      text-align: center;
      font-size: 14px;
      color: $text-medium;
      margin: 0 0 16px;
    }
  }
  
  .options-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .option-card {
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid $border-color;
    background-color: white;
    cursor: pointer;
    transition: $transition;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: $shadow-sm;
      border-color: $primary-color;
    }
  }
  
  .option-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    min-width: 36px;
    background-color: #F3F3F3;
    border-radius: 50%;
    margin-right: 12px;
    color: $text-dark;
  }
  
  .option-content {
    flex: 1;
    
    .option-title {
      font-size: 15px;
      font-weight: 600;
      margin: 0 0 2px;
      color: $text-dark;
    }
    
    .option-description {
      font-size: 13px;
      color: $text-medium;
      margin: 0;
    }
  }
  
  // Media queries
  @media (max-width: 480px) {
    .container {
      padding: 16px;
    }
    
    .confirmation-title {
      font-size: 18px;
    }
    
    .confirmation-subtitle {
      font-size: 13px;
    }
    
    .confirm-button {
      font-size: 15px;
      padding: 12px 20px;
      min-width: 200px;
    }
  }
  </style>