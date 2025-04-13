<!-- components/BottomActionContainer.vue -->
<template>
    <transition name="slide-up">
      <div v-if="isVisible" class="bottom-container flex flex-center-x flex-center-y gap-10">
        <div class="action-buttons">
          <FloatingCartButton 
            @onClicked="$emit('showCartModal')"
            :count="cart.length"
            message="Go to cart"
            total="1000"
            :show_total="true"
            :cart_mode="cart_mode"
            :styling="styling"
            :total="cartTotal"
            @view-cart="$emit('view-cart')"
          ></FloatingCartButton>
          
          <FloatingRecommendationButton 
            v-if="false"
            :styling="styling"
            :message="recommendationMessage" 
            :count="recommendationCount"
            @view="$emit('view-recommendations')"
            @dismiss="$emit('dismiss-recommendations')"
          ></FloatingRecommendationButton>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  import FloatingCartButton from './../modals/FloatingCartButton.vue';
  import FloatingRecommendationButton from './../modals/FloatingRecommendationButton.vue';
  import {mapGetters} from 'vuex';
  export default {
    name: 'BottomActionContainer',
    components: {
      FloatingCartButton,
      FloatingRecommendationButton
    },
    computed: {
        ...mapGetters('shop', ['cart'])
    },
    props: {
        styling: {
            type: [Object, undefined],
        },
        cart_mode: {
            type: [Object, undefined],
        },
        show: {
            type:Boolean,
            default: false,
        },
      cartCount: {
        type: [Number, String],
        default: 0
      },
      cartTotal: {
        type: [Number, String],
        default: 0
      },
      recommendationMessage: {
        type: String,
        default: 'recommendations for you'
      },
      recommendationCount: {
        type: [Number, String],
        default: 3
      }
    },
    data() {
      return {
        isVisible: false
      };
    },
    watch: {
        show(value) {
            this.isVisible = true;
        }
    },
    created() {
        if (this.show) {
            this.isVisible = this.show
        }
    },
    methods: {
      hide() {
        this.isVisible = false;
        this.$emit('hide')
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  // Variables based on existing styling
  $primary: #E53945;
  $secondary: #f79939;
  $charcoal: #36454F;
  $border-grey: #E0E0E0;
  
  .bottom-container {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    z-index: 100;
    //padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 120px;
      background: linear-gradient(to top, rgba(0,0,0,0.15), transparent);
      pointer-events: none;
      z-index: -1;
    }
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.9);
    //border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    
    // Remove fixed positioning from child components
    :deep(.floating-cart),
    :deep(.floating-recommendation) {
      position: relative;
      bottom: auto;
      right: auto;
      
      // Hide the tooltips when in the container
      .tooltip {
        display: none;
      }
    }
  }
  
  // Animation
  .slide-up-enter-active, 
  .slide-up-leave-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .slide-up-enter-from, 
  .slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
  
  // Responsive adjustments
  @media (max-width: 768px) {
    .bottom-container {
     // padding: 15px 10px;
    }
    
    .action-buttons {
      width: 100%;
      justify-content: space-around;
      padding: 10px;
    }
  }
  
  @media (max-width: 480px) {
    .action-buttons {
      gap: 10px;
    }
  }
  </style>