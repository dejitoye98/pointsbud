<!-- components/FloatingCartButton.vue -->
<template>
    <transition name="fade-scale">
      <button 
        @click="$emit('onClicked')" 
        :style="{
          backgroundColor: styling?.primary_color || '#FF3E00', 
          color: styling?.text_on_primary || 'white',
          borderColor: styling?.secondary_color || '#FFD700'
        }" 
        v-if="isVisible && cart.length" 
        class="floating-cart conversion-optimized" 
        @click.stop="viewCart"
        :class="{'attention-pulse': shouldPulse}"
      >
        <!-- Urgency indicator -->
        <div class="urgency-badge" v-if="shouldShowUrgency">Limited time offer!</div>
        
        <div class="cart-count" :class="{'shake-animation': shouldShake}">{{ count }}</div>
        
        <div class="flex flex-center-y gap-2 cta-container">
            <template v-if="$route.query.t || cart_mode === 'instore' || cart_mode === 'in-store'">
                <img class="icon-animated" style="height: 32px; width: 32px;" :src="waiterIcon"></img>
                <div class="cta-text">
                  <span class="main-cta">Place Order</span>
                </div>
            </template>
            <template v-else-if="cart_mode === 'pickup'">
                <div class="cta-text">
                  <span class="main-cta">Schedule Pickup</span>
                  <span class="sub-cta">Ready when you are</span>
                </div>
            </template>
            <template v-else-if="cart_mode === 'delivery'">
                <div class="cta-text">
                  <span class="main-cta">Complete Order</span>
                  <span class="sub-cta">Delivered to your door</span>
                </div>
            </template>
            <span class="action-arrow">→</span>
        </div>
        
        <button class="cart-button" :style="{backgroundColor: styling?.primary_color || '#FF3E00', color: styling?.text_on_primary || 'white'}">
          <div class="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
          </div>
        </button>
        
        <!-- Social proof tooltip -->
        <div class="tooltip social-proof">
          <div class="tooltip-header">{{ message }}</div>
          <div v-if="showTotal" class="total">Total: {{ formatCurrency(total) }}</div>
          <div class="proof-message">
            <span class="proof-icon">✓</span> 
            {{ getProofMessage() }}
          </div>
        </div>
      </button>
    </transition>
</template>
  
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FloatingCartButton',

  props: {
    cart_mode: {
        type: [Object, undefined],
        default: "instore"
    },
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
      default: 'Ready to enjoy?'
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
      isVisible: true,
      waiterIcon: null,
      shouldPulse: false,
      shouldShake: false,
      pulseInterval: null,
      shakeInterval: null,
      proofMessages: [
        "95% of customers complete their order",
        "Order confirmed in less than 30 seconds",
        "Trusted by thousands of customers",
        "Join others enjoying their meal today"
      ]
    };
  },
  computed: {
    ...mapGetters("shop", ['cart']),
    cartTotal() {
      let sum = 0;
      for (let item of this.cart) {
        sum += this.getItemTotal(item)
      }
      return sum;
    },
    shouldShowUrgency() {
      // Show urgency badge if cart has more than 2 items
      return this.cart.length > 2;
    }
  },
  created() {
    try {
      this.waiterIcon = require('@/assets/placeholders/waiter-icon.png');
    } catch (error) {
      console.error('Failed to load waiter icon:', error);
      // Fallback to empty string if image can't be loaded
      this.waiterIcon = '';
    }
    
    // Setup attention-grabbing intervals
    this.setupAttentionIntervals();
  },
  beforeUnmount() {
    // Clear intervals to prevent memory leaks
    this.clearIntervals();
  },
  methods: {
    setupAttentionIntervals() {
      // Pulse the button every 8 seconds
      this.pulseInterval = setInterval(() => {
        this.shouldPulse = true;
        setTimeout(() => {
          this.shouldPulse = false;
        }, 2000);
      }, 8000);
      
      // Shake the cart count every 12 seconds
      this.shakeInterval = setInterval(() => {
        this.shouldShake = true;
        setTimeout(() => {
          this.shouldShake = false;
        }, 1500);
      }, 12000);
    },
    clearIntervals() {
      if (this.pulseInterval) clearInterval(this.pulseInterval);
      if (this.shakeInterval) clearInterval(this.shakeInterval);
    },
    getProofMessage() {
      // Return a random social proof message
      const randomIndex = Math.floor(Math.random() * this.proofMessages.length);
      return this.proofMessages[randomIndex];
    },
    getItemTotal(item) {
      let result = 0;
  
      if (item) {
        const retrievedItem = this.cart.find(i => i.id === item.id); 
        if (retrievedItem) {
          let itemTotal = (retrievedItem.quantity * retrievedItem.unitprice);
          result += itemTotal;
          
          if (retrievedItem.additions) {
            for (let addition of retrievedItem.additions) {
              result += (addition.unitprice * retrievedItem.quantity)
            }
          }

          if (retrievedItem.delivery_pack?.unitprice) {
            result += retrievedItem.delivery_pack.unitprice
          }
        }
      }
      return result;
    },
    viewCart(event) {
      // Prevent event propagation to avoid triggering parent click
      event.stopPropagation();
      this.$emit('view-cart');
    },
    formatCurrency(value) {
      return `${this.currency}${parseFloat(value).toLocaleString()}`;
    }
  }
};
</script>
  
<style lang="scss" scoped>
// Variables based on existing styling with conversion-optimized colors
$primary: #FF3E00; // Attention-grabbing orange-red
$deep-primary: #E53000;
$secondary: #FFD700; // Gold for urgency/importance
$accent: #00B894; // Green for positive action
$charcoal: #36454F;
$border-grey: #E0E0E0;
$faint: #686868;

// Helper classes
.flex {
  display: flex;
}

.flex-center-y {
  align-items: center;
}

.gap-2 {
  gap: 8px;
}

// Main button styles
.floating-cart {
  position: relative;
  height: 64px; // Taller for more visibility
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 8px 25px rgba(0, 0, 0, 0.3));
  background: $primary;
  border: 2px solid $secondary;
  padding: 8px 15px;
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: visible;
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    filter: drop-shadow(0 12px 25px rgba(0, 0, 0, 0.4));
    border-color: lighten($secondary, 10%);
    
    .tooltip {
      opacity: 1;
      transform: translateX(-10px);
      visibility: visible;
    }
    
    .action-arrow {
      transform: translateX(5px);
    }
    
    .cta-container {
      .main-cta {
        transform: translateY(-1px);
      }
    }
  }
  
  &:active {
    transform: translateY(2px) scale(0.98);
  }
  
  &.conversion-optimized {
    box-shadow: 0 5px 0 darken($primary, 10%),
                0 10px 25px rgba(0, 0, 0, 0.25);
  
    &:active {
      box-shadow: 0 2px 0 darken($primary, 10%),
                  0 5px 15px rgba(0, 0, 0, 0.2);
    }
  }
  
  // Attention-grabbing pulse animation
  &.attention-pulse {
    animation: attention-pulse 2s cubic-bezier(0.4, 0, 0.6, 1);
    
    .cta-container .main-cta {
      animation: text-pop 2s cubic-bezier(0.4, 0, 0.6, 1);
    }
  }
}

// Urgency badge
.urgency-badge {
  position: absolute;
  top: -15px;
  right: -10px;
  background: $secondary;
  color: darken($primary, 20%);
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transform: rotate(3deg);
  animation: pulse-subtle 2s infinite;
  z-index: 3;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 15px;
    width: 10px;
    height: 10px;
    background: $secondary;
    transform: rotate(45deg);
    z-index: -1;
  }
}

// Icon styles
.icon-animated {
  animation: slight-bounce 3s ease-in-out infinite;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
}

// CTA text container
.cta-container {
  position: relative;
  
  .cta-text {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }
  
  .main-cta {
    font-size: 19px;
    font-weight: 700;
    transition: transform 0.2s ease;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  .sub-cta {
    font-size: 12px;
    font-weight: 400;
    opacity: 0.9;
  }
  
  .action-arrow {
    font-size: 22px;
    margin-left: 8px;
    font-weight: 700;
    transition: transform 0.3s ease;
  }
}

// Cart count badge
.cart-count {
  position: absolute;
  top: -10px;
  left: -10px;
  background: $secondary;
  color: darken($primary, 20%);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  border: 2px solid white;
  z-index: 3;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
  
  &.shake-animation {
    animation: shake 0.8s cubic-bezier(.36,.07,.19,.97) both;
  }
}

// Cart button (hidden but styles preserved)
.cart-button {
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.cart-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 2s infinite;
}

// Enhanced tooltip with social proof
.tooltip {
  position: absolute;
  right: 100%;
  background-color: white;
  color: $charcoal;
  padding: 15px;
  border-radius: 10px;
  font-size: 14px;
  white-space: nowrap;
  margin-right: 15px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  transform: translateX(10px);
  max-width: 250px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid $border-grey;
  z-index: 1001;
    
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: -10px;
    transform: translateY(-50%);
    border-width: 10px 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent transparent white;
  }
  
  &.social-proof {
    .tooltip-header {
      font-weight: 600;
      margin-bottom: 5px;
      color: $primary;
    }
    
    .total {
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 10px;
      color: $charcoal;
    }
    
    .proof-message {
      font-size: 13px;
      color: $accent;
      display: flex;
      align-items: center;
      gap: 5px;
      
      .proof-icon {
        background: $accent;
        color: white;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      }
    }
  }
}

// Animations
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

@keyframes slight-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes pulse-subtle {
  0%, 100% {
    transform: rotate(3deg) scale(1);
  }
  50% {
    transform: rotate(3deg) scale(1.05);
  }
}

@keyframes attention-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 5px 0 darken($primary, 10%),
                0 10px 25px rgba(0, 0, 0, 0.25);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 5px 0 darken($primary, 10%),
                0 10px 30px rgba($primary, 0.4);
  }
}

@keyframes text-pop {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-3px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(3px, 0, 0);
  }
}

// Transition effects
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
    padding: 8px 12px;
  }
  
  .cta-container {
    .main-cta {
      font-size: 17px;
    }
    
    .sub-cta {
      font-size: 11px;
    }
  }
  
  .tooltip {
    display: none;
  }
  
  .urgency-badge {
    font-size: 10px;
    padding: 3px 8px;
  }
}

// Container mode styles (maintained from original)
.container-mode {
  &.floating-cart {
    position: relative;
    bottom: auto;
    right: auto;
    filter: none;
    
    /* Slightly smaller size when in container */
    .cart-button {
      width: 50px;
      height: 50px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    
    /* Hide tooltips when in container */
    .tooltip {
      display: none;
    }
    
    /* Adjust badge position */
    .cart-count {
      top: -5px;
      left: -5px;
      width: 24px;
      height: 24px;
      font-size: 14px;
    }
  }
}
</style>