<!-- components/FloatingRecommendationButton.vue -->
<template>
    <transition name="fade-scale">
      <div v-if="isVisible" class="floating-recommendation">
        <div class="recommendation-count">{{ count }}</div>
        <button class="fab-button" @click="view">
          <div class="fab-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </div>
        </button>
        <button class="dismiss-button" @click="dismiss" aria-label="Dismiss recommendations">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
        
        <!-- Tooltip that appears on hover -->
        <div class="tooltip">
          {{ message }}
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'FloatingRecommendationButton',
    props: {
        containerMode: {
            type: Boolean,
            default: false
        },
      message: {
        type: String,
        default: 'personalized picks for you'
      },
      count: {
        type: [Number, String],
        default: 3
      }
    },
    data() {
      return {
        isVisible: true
      };
    },
    methods: {
      view() {
        this.$emit('view');
      },
      dismiss() {
        // Animate out
        this.isVisible = false;
        
        // Emit a dismiss event after animation
        setTimeout(() => {
          this.$emit('dismiss');
        }, 300); // Match with CSS transition duration
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  // Variables based on existing styling
  $primary: #E53945;
  $deep-primary: #A02730;
  $secondary: #f79939;
  $charcoal: #36454F;
  $border-grey: #E0E0E0;
  $faint: #686868;
  
  .floating-recommendation {
   
    z-index: 1000;
    display: flex;
    align-items: center;
    filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.25));
    
    &:hover .tooltip {
      opacity: 1;
      transform: translateX(-10px);
      visibility: visible;
    }
  }
  
  .recommendation-count {
    position: absolute;
    top: -8px;
    left: -8px;
    background-color: $secondary;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    border: 2px solid white;
    z-index: 2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }
  
  .fab-button {
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    color: #2c3e50;
    border: none;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    
    &:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
      background: linear-gradient(135deg, #e6e9f0, #eef1f5);
    }
    
    &:active {
      transform: translateY(0) scale(0.98);
    }
  }
  
  .fab-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .dismiss-button {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: white;
    border: 1px solid $border-grey;
    color: $faint;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.2s;
    z-index: 3;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background-color: $border-grey;
      color: $charcoal;
    }
  }
  
  .tooltip {
    position: absolute;
    right: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    margin-right: 15px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    transform: translateX(10px);
    max-width: 250px;
    
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: -6px;
      transform: translateY(-50%);
      border-width: 6px 0 6px 6px;
      border-style: solid;
      border-color: transparent transparent transparent rgba(0, 0, 0, 0.8);
    }
  }
  
  // Animation
  .fade-scale-enter-active,
  .fade-scale-leave-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .fade-scale-enter-from,
  .fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }
  
  // Responsive adjustments
  @media (max-width: 576px) {
    .floating-recommendation {
      bottom: 20px;
      right: 20px;
    }
    
    .fab-button {
      width: 65px;
      height: 65px;
    }
    
    .tooltip {
      display: none;
    }
  }

  .container-mode {
    &.floating-cart,
    &.floating-recommendation {
      position: relative;
      bottom: auto;
      right: auto;
      filter: none;
      
      /* Slightly smaller size when in container */
      .cart-button,
      .fab-button {
        width: 60px;
        height: 60px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
      
      /* Hide tooltips when in container */
      .tooltip {
        display: none;
      }
      
      /* Adjust badge position */
      .cart-count,
      .recommendation-count {
        top: -5px;
        left: -5px;
        width: 24px;
        height: 24px;
        font-size: 14px;
      }
    }
  }
  </style>