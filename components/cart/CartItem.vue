<template>
    <div class="cart-item" :class="{ 'cart-item--active': isActive, 'cart-item--disabled': !editable }" v-if="item">
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
            <div class="quantity-control"                 v-if="editable"
            >
              <button 
                class="quantity-control__btn quantity-control__btn--decrease" 
                @click="decreaseQuantity"
                v-if="editable"

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
                  v-if="editable"

                  class="quantity-control__input"
                  maxlength="3"
                >
              </div>
              
              <button 
                class="quantity-control__btn quantity-control__btn--increase" 
                v-if="editable"
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
  
        <div class="cart-item__price" v-if="editable">
          <p class="cart-item__price-value">{{item.currency || "NGN" | currencySymbol}}{{itemSubtotal | money}}</p>
          
          
          <button class="cart-item__remove" @click="removeItem" aria-label="Remove item" v-if="editable">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <!-- Show static price when not editable -->
        <div class="cart-item__price" v-if="!editable">
          <p class="cart-item__price-value">{{item.currency || "NGN" | currencySymbol}}{{itemSubtotal | money}}</p>
        </div>
      </div>
  
      <div class="cart-item__actions" v-if="showActions && editable">
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
        editable: {
            type: Boolean,
            required: false,
            default: true
        },
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
        return this.cart.find((item) => item.id === this.product.id) || this.existing_cart.find((item) => item.id === this.product.id);
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
        return this.item.unitprice * this.isInCart?.quantity
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
        resolveImagePlaceHolder(category) {
            const placeholder_mapping = {
                "barbecue-skewer": require('@/assets/placeholders/barbecue-skewer.png'),
                "beer-mug": require('@/assets/placeholders/beer-mug.png'),
                "burger-icon": require('@/assets/placeholders/burger.png'),
                "burger": require('@/assets/placeholders/burger.png'),
                "breakfast": require('@/assets/placeholders/breakfast.png'),
                "cake-slice": require('@/assets/placeholders/cake.png'),
                "cake": require('@/assets/placeholders/cake.png'),
                "champagne-flute": require('@/assets/placeholders/champagne-flute.png'),
                "condiment-bowl": require('@/assets/placeholders/condiment-bowl.png'),
                "dinner-plate": require('@/assets/placeholders/dinner-plate.png'),
                "fancy-glass": require('@/assets/placeholders/fancy-glass.png'),
                "grilled-meat": require('@/assets/placeholders/protein.png'),
                "protein": require('@/assets/placeholders/protein.png'),
                "hookah-pipe": require('@/assets/placeholders/hookah.png'),
                "juice-glass": require('@/assets/placeholders/juice-glass.png'),
                "salad": require('@/assets/placeholders/salad.png'),
                "salads": require('@/assets/placeholders/salad.png'),
                "vegan": require('@/assets/placeholders/salad.png'),
                "salad-bowl": require('@/assets/placeholders/salad.png'),
                "milkshake-glass": require('@/assets/placeholders/milkshake-glass.png'),
                "swallow": require('@/assets/placeholders/swallow.png'),
                "rice-bowl": require('@/assets/placeholders/rice-bowl.png'),
                "sandwich-halves": require('@/assets/placeholders/sandwich.png'),
                "sandwich": require('@/assets/placeholders/sandwich.png'),
                "small-plate": require('@/assets/placeholders/small-plate.png'),
                "small-platter": require('@/assets/placeholders/small-platter.png'),
                "soda-glass": require('@/assets/placeholders/soda-glass.png'),
                "spaghetti-bowl": require('@/assets/placeholders/spaghetti-bowl.png'),
                "spirit-shot": require('@/assets/placeholders/spirit-shot.png'),
                "soup-bowl": require('@/assets/placeholders/soup-bowl.png'),
                "serving-tray": require('@/assets/placeholders/serving-tray.png'),
                "wine-glass": require('@/assets/placeholders/fancy-glass.png'),
                "fancy-glass": require('@/assets/placeholders/fancy-glass.png')
            };

            if (placeholder_mapping[this.category?.icon]) {
                return placeholder_mapping[this.category?.icon] || this.placeholderImage
            }

            return this.placeholderImage
        },
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
  $disabled-background: #F1F1F4;
  $disabled-text: #A0AEC0;
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
    transition: transform $transition-medium, box-shadow $transition-medium, background-color $transition-medium;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px $shadow-hover;
    }
    
    &--active {
      transform: translateX(100%);
      opacity: 0;
    }
    
    // Disabled state
    &--disabled {
      background-color: $disabled-background;
      transform: none;
      box-shadow: 0 2px 4px $shadow-soft;
      
      &:hover {
        transform: none;
        box-shadow: 0 2px 4px $shadow-soft;
      }
      
      .cart-item__name,
      .cart-item__price-value {
        color: $text-medium;
      }
      
      .cart-item__meta,
      .cart-item__quantity-badge {
        color: $disabled-text;
      }
      
      .cart-item__image {
        opacity: 0.7;
        filter: grayscale(30%);
        
        &:hover {
          transform: none;
        }
      }
      
      .cart-item__quantity-badge {
        background-color: $text-light;
      }
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
      transition: transform $transition-medium, opacity $transition-medium, filter $transition-medium;
      
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
      transition: background-color $transition-medium, color $transition-medium;
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
      transition: color $transition-medium;
    }
    
    &__meta {
      font-size: 13px;
      color: $text-medium;
      margin-top: 2px;
      transition: color $transition-medium;
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
      transition: color $transition-medium;
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