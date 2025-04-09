<template>
    <div class="page">
      <div class="page__container">
        <div class="header">
          <img :src="business.logo" alt="Business Logo" class="logo">
          <h1 class="business-name">{{ business.name }}</h1>
        </div>
  
        <div class="menu-navigation">
          <h2 class="navigation-title">Browse Our Menu</h2>
          <div class="segment-buttons">
            <button 
              v-for="(segment, index) in segments" 
              :key="index"
              class="segment-button"
              @click="navigateToSegment(segment)"
            >
              <span class="segment-icon" v-if="getIconForSegment(segment)">{{ getIconForSegment(segment) }}</span>
              {{ segment }}
            </button>
          </div>
        </div>
  
        <div class="footer" v-if="business.tagline">
          <p>{{ business.tagline }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      business: {
        type: Object,
        required: true
      },
      segments: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        icons: {
          'Food': '🍽️',
          'Drinks': '🍹',
          'Bar': '🍸',
          'Shisha': '💨',
          'Desserts': '🍰',
          'Specials': '✨',
          'Breakfast': '☕',
          'Lunch': '🥪',
          'Dinner': '🍝'
          // Add more segment icons as needed
        }
      }
    },
    methods: {
      navigateToSegment(segment) {
        // Convert segment name to lowercase and replace spaces with hyphens for URL
        const segmentSlug = segment.toLowerCase().replace(/\s+/g, '-');
        // Emit event for parent component to handle or use router if available
        this.$emit('navigate', segmentSlug);
        
       
      },
      getIconForSegment(segment) {
        return this.icons[segment] || null;
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .page {
    min-height: 100vh;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  .page__container {
    max-width: 800px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #eaeaea;
    
    .logo {
      max-width: 180px;
      max-height: 180px;
      object-fit: contain;
      margin-bottom: 16px;
    }
    
    .business-name {
      font-size: 28px;
      font-weight: 700;
      color: #333;
      margin: 0;
      text-align: center;
    }
  }
  
  .menu-navigation {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .navigation-title {
      font-size: 24px;
      color: #555;
      margin-bottom: 24px;
      font-weight: 600;
    }
    
    .segment-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 14px;
      width: 100%;
    }
    
    .segment-button {
      padding: 16px 24px;
      background-color: #f5f5f5;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #444;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 140px;
      justify-content: center;
      
      &:hover {
        background-color: #e0e0e0;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .segment-icon {
        font-size: 20px;
      }
    }
  }
  
  .footer {
    margin-top: 20px;
    text-align: center;
    color: #777;
    font-style: italic;
    padding-top: 20px;
    border-top: 1px solid #eaeaea;
  }
  
  // Responsive adjustments
  @media (max-width: 600px) {
    .page__container {
      padding: 20px;
    }
    
    .header .logo {
      max-width: 120px;
      max-height: 120px;
    }
    
    .segment-buttons {
      flex-direction: column;
      align-items: stretch;
    }
    
    .segment-button {
      width: 100%;
    }
  }
  </style>