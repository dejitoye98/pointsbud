<template>
    <div class="cart-item" :class="{ 'cart-item--active': isActive }" v-if="item">
      <div class="cart-item__content">
        <div class="cart-item__media">
          <div class="cart-item__thumbnail">
            <img 
                :src="thumbnailSrc"
                @error="handleImageError"
                class="cart-item__image"
            >
            <span class="cart-item__quantity-badge">{{item?.quantity}}</span>
          </div>
        </div>
  
        <div class="cart-item__details">
          <div class="cart-item__info">
            <h3 class="cart-item__name">{{ item?.name }}</h3>
            <div class="cart-item__meta" v-if="item?.variation || item?.options?.length">
              <span v-if="item?.variation">{{ item.variation }}</span>
              <span v-if="item?.options?.length">{{ formatOptions(item.options) }}</span>
            </div>
          </div>
  
          <div class="cart-item__controls">
            <div class="quantity-control">
              <button 
                class="quantity-control__btn quantity-control__btn--decrease" 
                @click="decreaseQuantity"
                :disabled="item?.quantity <= 1"
                :class="{ 'quantity-control__btn--disabled': item?.quantity <= 1 }"
              >
                <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              
              <div class="quantity-control__input-wrapper">
                <input 
                  type="text" 
                  :value="item?.quantity" 
                  @input="setQuantity"
                  @blur="validateQuantity"
                  class="quantity-control__input"
                  maxlength="3"
                >
              </div>
              
              <button 
                class="quantity-control__btn quantity-control__btn--increase" 
                @click="increaseQuantity"
                :disabled="item?.quantity >= 99"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 1V11M1 6H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        <div class="cart-item__price">
          <p class="cart-item__price-value">{{item.currency || "NGN" | currencySymbol}}{{itemSubtotal | money}}</p>
          <button class="cart-item__remove" @click="removeItem" aria-label="Remove item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
  
      <div class="cart-item__actions" v-if="showActions">
        <button class="cart-item__action cart-item__action--note" @click="toggleNote">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12.5V8M8 5.5V3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          Add note
        </button>
        <button class="cart-item__action cart-item__action--save" @click="saveForLater">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 5.5C3.5 3.29086 5.29086 1.5 7.5 1.5C9.70914 1.5 11.5 3.29086 11.5 5.5V14.5L7.5 12.5L3.5 14.5V5.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Save
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    props: {
      item: {
        type: Object,
        required: true
      },
      styling: {
        type: Object
      },
      showActions: {
        type: Boolean,
        default: false
      }
    },
    watch: {
    
    // Reset image failure state when product changes
    product() {
      this.imageFailed = false;
    }
  },
  
    data() {
      return {
        isActive: false,
        inputTimeout: null,
        imageFailed: false,
        placeholderImage: "https://pointsbud-images.s3.amazonaws.com/efb3d8a06626aa61b27adf99273b8eb4"

      }
    },
    
    computed: {
      ...mapGetters('shop', ['cart']),
      iconColor() {
        return this.styling?.text_on_primary || "white";
    },
    isInCart() {
        return this.cart.find((item) => item.id === this.product.id);
    },
    primaryColor() {
        return this.styling?.primary_color || "#FF6B6B";
    },
    textOnPrimary() {
        return this.styling?.text_on_primary || "white";
       },
      isInCart() {
        return this.cart.find(i => i.id === this.item.id)
      },
      
      addButtonStyles() {
        return {
            backgroundColor: this.primaryColor,
            color: this.textOnPrimary,
        };
    },
    quantityControlStyles() {
        return {
            backgroundColor: this.primaryColor,
            color: this.textOnPrimary,
        };
    },
      itemSubtotal() {
        return this.item.unitprice * this.isInCart.quantity
      },
      thumbnailSrc() {
      // If the image previously failed or thumbnail is missing, use placeholder
      if (this.imageFailed || !this.item.thumbnail) {
        return this.resolveImagePlaceHolder(this.category) || this.placeholderImage;
      }
      return this.item.thumbnail ||  this.resolveImagePlaceHolder(this.category) ;
    }
    },
    
    methods: {
      increaseQuantity() {
        if (this.isInCart.quantity < 99) {
          this.animateButton('increase');
          this.$store.dispatch('shop/increaseItemQuantity', this.item.id);
        }
      },
      
      decreaseQuantity() {
        if (this.isInCart.quantity > 1) {
          this.animateButton('decrease');
          this.$store.dispatch('shop/decreaseItemQuantity', this.item.id);
        }
      },
      
      setQuantity(event) {
        clearTimeout(this.inputTimeout);
        
        const value = event.target.value;
        // Only allow numeric input
        const numericValue = value.replace(/[^0-9]/g, '');
        
        if (numericValue !== value) {
          event.target.value = numericValue;
        }
        
        // Debounce the quantity update
        this.inputTimeout = setTimeout(() => {
          let quantity = parseInt(numericValue, 10);
          
          // Validate quantity limits
          if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
          } else if (quantity > 99) {
            quantity = 99;
          }
          
          this.$store.dispatch('shop/setItemQuantity', {
            id: this.item.id, 
            quantity
          });
        }, 500);
      },
      
      validateQuantity(event) {
        const value = event.target.value;
        let quantity = parseInt(value, 10);
        
        // Set to 1 if empty or invalid
        if (isNaN(quantity) || quantity < 1) {
          event.target.value = "1";
          this.$store.dispatch('shop/setItemQuantity', {
            id: this.item.id, 
            quantity: 1
          });
        }
      },
      
      removeItem() {
        // Animate before removal
        this.isActive = true;
        setTimeout(() => {
          this.$store.dispatch('shop/removeFromCart', this.item.id);
        }, 300);
      },
      
      toggleNote() {
        this.$emit('toggle-note', this.item.id);
      },
      
      saveForLater() {
        this.$emit('save-for-later', this.item.id);
      },
      
      formatOptions(options) {
        if (!options || !options.length) return '';
        return options.map(opt => opt.name).join(', ');
      },
      
      animateButton(type) {
        const selector = type === 'increase' 
          ? '.quantity-control__btn--increase' 
          : '.quantity-control__btn--decrease';
          
        const button = this.$el.querySelector(selector);
        if (button) {
          button.classList.add('quantity-control__btn--active');
          setTimeout(() => {
            button.classList.remove('quantity-control__btn--active');
          }, 200);
        }
      },
      
      handleImageError(e) {
        this.imageError = true;
        e.target.src = '/assets/placeholder.png'; // Fallback image
      },
      
    }
  }
  </script>
  
  <style lang="scss" scoped>
  // Modern color palette
  $primary: #FF6B6B;
  $primary-light: rgba($primary, 0.1);
  $primary-hover: #FF5252;
  $text-dark: #2D3748;
  $text-medium: #4A5568;
  $text-light: #718096;
  $border-color: #E2E8F0;
  $background-white: #FFFFFF;
  $background-light: #F7FAFC;
  $background-lighter: #EDF2F7;
  $shadow-soft: rgba(0, 0, 0, 0.05);
  $shadow-hover: rgba(0, 0, 0, 0.08);
  $transition-fast: 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  $transition-medium: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  
  // Base styles
  .cart-item {
    position: relative;
    padding: 16px;
    margin-bottom: 12px;
    border-radius: 12px;
    background-color: $background-white;
    box-shadow: 0 2px 8px $shadow-soft;
    transition: transform $transition-medium, box-shadow $transition-medium;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px $shadow-hover;
    }
    
    &--active {
      transform: translateX(100%);
      opacity: 0;
    }
    
    &__content {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    // Media section (thumbnail)
    &__media {
      position: relative;
    }
    
    &__thumbnail {
      position: relative;
      height: 80px;
      width: 80px;
      min-width: 80px;
      border-radius: 10px;
      overflow: hidden;
      background-color: $background-lighter;
      box-shadow: 0 2px 5px $shadow-soft;
    }
    
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $transition-medium;
      
      &:hover {
        transform: scale(1.05);
      }
    }
    
    &__quantity-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      min-width: 22px;
      height: 22px;
      border-radius: 50%;
      background-color: $primary;
      color: white;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba($primary, 0.3);
      z-index: 1;
      padding: 0 4px;
    }
    
    // Details section
    &__details {
      flex: 1;
      min-width: 0; // Helps with text overflow
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    &__info {
      margin-bottom: 4px;
    }
    
    &__name {
      margin: 0;
      padding: 0;
      font-size: 16px;
      font-weight: 600;
      color: $text-dark;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    &__meta {
      font-size: 13px;
      color: $text-medium;
      margin-top: 2px;
    }
    
    // Price section
    &__price {
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
    }
    
    &__price-value {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      color: $text-dark;
      white-space: nowrap;
    }
    
    &__remove {
      border: none;
      background: none;
      padding: 6px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $text-light;
      cursor: pointer;
      transition: all $transition-fast;
      
      &:hover {
        background-color: $background-lighter;
        color: $primary;
      }
    }
    
    // Quantity controls
    .quantity-control {
      display: flex;
      align-items: center;
      height: 32px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid $border-color;
      box-shadow: 0 1px 2px $shadow-soft;
      
      &__btn {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: $background-white;
        color: $text-dark;
        cursor: pointer;
        transition: all $transition-fast;
        padding: 0;
        
        &:hover:not(:disabled) {
          background-color: $background-lighter;
          color: $primary;
        }
        
        &:active:not(:disabled) {
          transform: scale(0.95);
        }
        
        &--disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        &--active {
          background-color: $primary-light;
          color: $primary;
        }
      }
      
      &__input-wrapper {
        position: relative;
        width: 40px;
        height: 100%;
      }
      
      &__input {
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        color: $text-dark;
        padding: 0;
        
        &:focus {
          outline: none;
        }
        
        /* Hide spinner for webkit browsers */
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        /* Firefox */
        &[type=number] {
          -moz-appearance: textfield;
        }
      }
    }
    
    // Additional actions
    &__actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px dashed $border-color;
    }
    
    &__action {
      display: flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      font-size: 13px;
      font-weight: 500;
      color: $text-medium;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all $transition-fast;
      
      svg {
        color: $text-light;
        transition: color $transition-fast;
      }
      
      &:hover {
        background-color: $background-lighter;
        color: $text-dark;
        
        svg {
          color: $primary;
        }
      }
      
      &:active {
        transform: translateY(1px);
      }
    }
  }
  
  // Responsive adjustments
  @media (max-width: 640px) {
    .cart-item {
      padding: 12px;
      
      &__content {
        gap: 12px;
      }
      
      &__thumbnail {
        height: 70px;
        width: 70px;
        min-width: 70px;
      }
      
      &__name {
        font-size: 14px;
      }
      
      &__meta {
        font-size: 12px;
      }
      
      &__price-value {
        font-size: 14px;
      }
      
      .quantity-control {
        height: 28px;
        
        &__btn {
          width: 28px;
          height: 28px;
        }
        
        &__input {
          font-size: 13px;
        }
      }
    }
  }
  
  // Enhanced animations
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba($primary, 0.4);
    }
    70% {
      box-shadow: 0 0 0 8px rgba($primary, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba($primary, 0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>