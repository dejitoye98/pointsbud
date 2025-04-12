<!-- components/FloatingCartButton.vue -->
<template>
    <transition name="fade-scale">
      <button @click="$emit('onClicked')" v-if="isVisible" class="floating-cart">
        <div class="cart-count">{{ count }}</div>
        <button class="cart-button" :style="{backgroundColor: styling?.primary_color || 'black', color: styling?.text_on_primary || 'white'}" @click="viewCart">
          <div class="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
          </div>
        </button>
        
        <!-- Tooltip that appears on hover -->
        <div class="tooltip">
          {{ message }}
          <div v-if="showTotal" class="total">Total: {{ formatCurrency(total) }}</div>
        </div>
      </button>
    </transition>
  </template>
  
  <script>
import { emit } from 'process';

  export default {
    name: 'FloatingCartButton',
    props: {
        styling: {
            type: [Object, undefined],
        
        },
        containerMode: {
            type: Boolean,
            default: false
        },
      count: {
        type: [Number, String],
        default: 0
      },
      message: {
        type: String,
        default: 'View your cart'
      },
      total: {
        type: [Number, String],
        default: 0
      },
      showTotal: {
        type: Boolean,
        default: true
      },
      currency: {
        type: String,
        default: '₦'
      }
    },
    data() {
      return {
        isVisible: true
      };
    },
    methods: {
      viewCart() {
        this.$emit('view-cart');
      },
      formatCurrency(value) {
        return `${this.currency}${parseFloat(value).toLocaleString()}`;
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  // Variables based on existing styling
  $primary: #E53945;
  $deep-primary: #A02730;
  $cart-primary: #4A90E2; // Blue color for cart
  $cart-deep: #2A5596; // Deeper blue for cart
  $secondary: #f79939;
  $charcoal: #36454F;
  $border-grey: #E0E0E0;
  $faint: #686868;
  
  .floating-cart {
   // position: fixed;

    width: 70px;
    height: 70px;
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
  
  .cart-count {
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
  
  .cart-button {
   // background: linear-gradient(135deg, #2c3e50, #1a1a2e);
    color: white;
    border: none;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    
    &:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
      background: linear-gradient(135deg, #34495e, #2c3e50);
    }
    
    &:active {
      transform: translateY(0) scale(0.98);
    }
  }
  
  .cart-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-3px);
    }
  }
  
  .tooltip {
    position: absolute;
    right: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 16px;
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
    
    .total {
      margin-top: 5px;
      font-weight: 700;
      color: $secondary;
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
    .floating-cart {
      bottom: 20px;
      right: 20px;
    }
    
    .cart-button {
      width: 100%;
      height: 100%;
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