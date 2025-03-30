<template>
  <BaseModal v-if="item" @close="$emit('close')" class="gourmet-modal">
    <template #header>
      <div class="modal-header">
        <div class="food-image-container">
          <img 
            :src="thumbnailSrc" 
            alt="Food item" 
            class="food-image"
            @error="handleImageError"
          >
          
          <!-- Image Gallery Dots -->
          <div class="image-gallery-dots" v-if="hasMultipleImages">
            <div class="dot active"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
          
          <!-- Back button -->
          <button @click="$emit('close')" class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <!-- Badge for bestseller/special -->
          <div class="item-badge" v-if="item.is_deal || item.is_popular">
            {{ item.is_deal ? 'Special Offer' : 'Bestseller' }}
          </div>
        </div>
      </div>
    </template>
    
    <template #body>
      <div class="modal-body">
        <!-- Item details header -->
        <div class="item-details">
          <div class="item-details-header">
            <h2 class="item-name">{{ item.name }}</h2>
            <p class="item-price">{{ item.currency || currencySymbol }} {{ item.unitprice | money }}</p>
          </div>
          
          <div class="item-rating" v-if="item.rating">
            <div class="stars">
              <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" :fill="i <= Math.floor(item.rating || 4.5) ? '#FFD700' : 'none'" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <span class="rating-value">{{ item.rating || '4.5' }}</span>
            <span class="rating-count">({{ item.rating_count || '24' }} ratings)</span>
          </div>
          
          <p class="item-description">{{ item.description }}</p>
          
          <!-- Item additions like toppings, sizes, etc -->
          <div class="additions-section" v-if="productAdditions">
            <div class="addition-group" v-for="(addition, index) in productAdditions" :key="index">
              <div class="addition-header">
                <h3>{{ addition.name }}</h3>
                <span v-if="addition.required" class="required-badge">Required</span>
              </div>
              
              <div class="addition-options">
                <div class="option-item" 
                    v-for="(option, o_index) in addition.options" 
                    :key="o_index"
                    :class="{ active: isOptionSelected(addition.name, option.name) }"
                    @click="changeAddition(addition.name, option)">
                  <div class="option-details">
                    <div class="option-selector">
                      <span v-if="addition.input_type === 'radio'" class="radio-selector" :class="{ active: isOptionSelected(addition.name, option.name) }"></span>
                      <span v-else class="checkbox-selector" :class="{ active: isOptionSelected(addition.name, option.name) }">
                        <svg v-if="isOptionSelected(addition.name, option.name)" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                    </div>
                    <div class="option-name">{{ option.name }}</div>
                  </div>
                  <div class="option-price">{{ option.currency | currencySymbol }} {{ option.unitprice | money }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Quantity selector -->
          <div class="quantity-section">
            <h3>Quantity</h3>
            <div class="quantity-selector">
              <button class="quantity-btn decrease" @click="decrease" :disabled="!isInCart && order.quantity <= 1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <input type="number" 
                  class="quantity-input" 
                  :value="isInCart ? isInCart.quantity : order.quantity" 
                  @input="handleInput"
                  min="1">
              <button class="quantity-btn increase" @click="increase">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Special instructions -->
          <div class="instructions-section">
            <h3>Special Instructions</h3>
            <textarea 
                v-model="order.customer_comment" 
                placeholder="Add notes (e.g. allergies, spice level, etc.)" 
                class="instructions-input">
            </textarea>
          </div>
        </div>
        
        <!-- Order actions footer -->
        <div class="order-actions">
          <div class="order-summary" v-if="isInCart">
            <div class="summary-detail">
              <span class="detail-label">Subtotal:</span>
              <span class="detail-value">{{ item.currency || currencySymbol }} {{ getSubtotal | money }}</span>
            </div>
          </div>
          
          <button class="action-button primary" @click="addToCart" v-if="!isInCart">
            <span>Add to Cart</span>
            <span class="price-tag">{{ item.currency || currencySymbol }} {{ item.unitprice | money }}</span>
          </button>
          
          <button class="action-button remove" @click="removeFromCart" v-else>
            <span>Remove from Cart</span>
          </button>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapGetters } from 'vuex'
import mixpanel from 'mixpanel-browser';
import crypto from 'crypto'

export default {
  props: ['item'],
  data() {
    return {
      order: {
        quantity: 1,
        additions: [],
        variations: [],
        customer_comment: "",
        delivery_pack: {},
      },
      hasMultipleImages: true, // Set to true if the item has multiple images
      imageFailed: false,
      placeholderImage: "https://pointsbud-images.s3.amazonaws.com/e3ac1c8359bd2aaa82c8135f89ab5d1e"
    }
  },
  computed: {
    ...mapGetters('shop', ['cart']),
    isInCart() {
      return this.cart.find(item => item.id === this.item.id)
    },
    productAdditions() {
      return this.item && this.item.meta && JSON.parse(this.item.meta).additions || null;
    },
    getSubtotal() {
      if (!this.isInCart) return 0;
      
      let basePrice = this.item.unitprice * this.isInCart.quantity;
      let additionsPrice = 0;
      
      // Calculate additions price
      if (this.isInCart.additions && this.isInCart.additions.length > 0) {
        for (const addition of this.isInCart.additions) {
          additionsPrice += addition.unitprice || 0;
        }
      }
      
      return basePrice + additionsPrice;
    },
    thumbnailSrc() {
      // If the image previously failed or thumbnail is missing, use placeholder
      if (this.imageFailed || !this.item.thumbnail) {
        return this.placeholderImage;
      }
      return this.item.thumbnail;
    }
  },
  mounted() {
    if (this.item) {
      this.mixpanel = mixpanel.init('1f580add8d0558ccae5fc19ca5997dab', { debug: false, track_pageview: false });
      mixpanel.track("Shop Order Model Opened", {
        product:this.item?.name 
      })
    }
  },
  methods: {
    generateUniqueCode(length = 6) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const codeLength = 4;
        const randomBytes = crypto.randomBytes(length);
        const code = [...randomBytes].map(byte => characters[byte % characters.length]).join('');
        return code;
    },
    removeFromCart() {
      this.$store.dispatch('shop/removeFromCart', this.item.id);
      this.$emit('close');
    },
    handleInput($evt) {
      const value = parseInt($evt.target.value) || 1;
      
      if (this.isInCart) {
        this.$store.dispatch('shop/setItemQuantity', {id: this.item.id, quantity: value})
      } else {
        this.order.quantity = value;
      }
    },
    increase() {
      if (!this.isInCart) {
        this.order.quantity++;
        return;
      }
      
      this.$store.dispatch('shop/increaseItemQuantity', this.item.id)
    },
    decrease() {
      if (!this.isInCart) {
        if (this.order.quantity > 1) {
          this.order.quantity--;
        }
        return;
      }
      
      this.$store.dispatch('shop/decreaseItemQuantity', this.item.id)
    },
    isOptionSelected(addition, option) {
      const found = this.order.additions.find(a => a.addition === addition && a.value === option);
      return !!found;
    },
    verifyAdditions() {
      if (this.productAdditions) {
        for (let addition of this.productAdditions) {
          if (addition.required) {
            if (!this.order.additions.find(a => a.addition === addition.name)?.value) {
              this.$toast.error(`Please select ${addition.name}`);
              return false;
            }
          }
        }
      }
      
      if (this.productQuestions) {
        for (let i = 0; i < this.productQuestions.length; i++) {
          const question = this.productQuestions[i];
          if (question.required && !this.order.question_answers[i].answer) {
            this.$toast.error("Please answer all the required questions");
            return false;
          }
        }
      }
      
      if (this.hasPackRequirements && this.deliveryPacks && this.deliveryPacks.length > 0) {
        if (Object.keys(this.order.delivery_pack).length === 0) {
          this.$toast.error("Please choose a delivery pack");
          return false;
        }
      }
      
      if (this.productVariations && this.order.variations.length === 0) {
        this.$toast.error(`Please select a variation of ${this.item.name}`);
        return false;
      }
      
      return true;
    },
    addToCart() {
      if (!this.verifyAdditions()) {
        return;
      }
      
      let variations_quantity = 0;
      
      for (let v of this.order.variations) {
        variations_quantity += v.quantity;
      }

      let item_key = this.generateUniqueCode(6);
      
      const item = {
        unitprice: this.item.unitprice,
        currency: this.item.currency,
        name: this.item.name,
        id: this.item.id,
        thumbnail: this.item.thumbnail,
        description: this.item.description,
        quantity: variations_quantity ? variations_quantity : this.order.quantity,
        customer_comment: this.order.customer_comment,
        additions: this.order.additions,
        variations: this.order.variations,
        question_answers: this.order.question_answers,
        availability: this.item.availability,
        item_key: item_key,
        item_uid: item_key,
      };
      
      if (this.order.delivery_pack && Object.keys(this.order.delivery_pack).length > 0) {
        item.delivery_pack = this.order.delivery_pack;
      }
      
      this.$store.dispatch('shop/addToCart', item);
      mixpanel.track("Added to cart", {
        product: this.item?.name
      })
      
      // Show success toast
      this.$toast.success(`${item.name} added to cart`);
      
      this.$emit('close');
    },
    changeAddition(addition_name, selected) {
      const addition_exists = this.order.additions.find(a => a.addition === addition_name);
      
      if (addition_exists) {
        // For checkbox, toggle selection
        if (this.getAdditionType(addition_name) === 'checkbox') {
          if (addition_exists.value === selected.name) {
            // Remove this option
            this.order.additions = this.order.additions.filter(
              a => !(a.addition === addition_name && a.value === selected.name)
            );
            return;
          }
        }
        
        // For radio buttons or updating checkbox
        const index = this.order.additions.indexOf(addition_exists);
        this.order.additions[index] = {
          addition: addition_name, 
          value: selected.name, 
          unitprice: selected.unitprice, 
          currency: selected.currency
        };
      }
      else {
        this.order.additions.push({ 
          addition: addition_name, 
          value: selected.name, 
          unitprice: selected.unitprice, 
          currency: selected.currency 
        });
      }
    },
    getAdditionType(name) {
      if (!this.productAdditions) return 'radio';
      
      const addition = this.productAdditions.find(a => a.name === name);
      return addition ? addition.input_type : 'radio';
    },
    handleImageError() {
      // Set flag to use placeholder image when image fails to load
      this.imageFailed = true;
    }
  }
}
</script>

<style lang="scss" scoped>
// Colors
$primary-color: #FF6B6B;
$primary-dark: #FF5252;
$secondary-color: #4ECDC4;
$text-dark: #333333;
$text-medium: #666666;
$text-light: #999999;
$white: #FFFFFF;
$off-white: #F9F9F9;
$light-gray: #F5F5F5;
$border-color: #EEEEEE;
$danger-color: #E53935;
$success-color: #4CAF50;
$warning-color: #FFC107;

// Shadows
$shadow-soft: 0 4px 6px rgba(0, 0, 0, 0.05);
$shadow-medium: 0 6px 12px rgba(0, 0, 0, 0.08);
$shadow-hard: 0 10px 20px rgba(0, 0, 0, 0.12);

// Border Radius
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 16px;
$radius-xl: 24px;
$radius-full: 9999px;

// Transitions
$transition-fast: 0.15s ease;
$transition-base: 0.25s ease;
$transition-slow: 0.35s ease;

// The Gourmet Modal
.gourmet-modal {
  :deep(.modal-container) {
    max-width: 90%;
    width: 500px;
    border-radius: $radius-lg;
    overflow: hidden;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
  }
  
  :deep(.modal-content) {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
  
  :deep(.modal-header) {
    padding: 0;
  }
  
  :deep(.modal-body) {
    padding: 0;
    flex: 1;
    overflow-y: auto;
  }
}

// Modal Header with Image
.modal-header {
  position: relative;
  .food-image-container {
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
    
    .food-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $transition-base;
      
      &:hover {
        transform: scale(1.05);
      }
    }
    
    // Image gallery dots
    .image-gallery-dots {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        transition: $transition-fast;
        
        &.active {
          background-color: $white;
          width: 10px;
          height: 10px;
        }
      }
    }
    
    // Back button
    .back-button {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      color: $white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: $transition-fast;
      z-index: 10;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
        transform: scale(1.1);
      }
    }
    
    // Badge for bestseller/special
    .item-badge {
      position: absolute;
      top: 15px;
      left: 15px;
      background-color: $primary-color;
      color: $white;
      padding: 6px 12px;
      border-radius: $radius-full;
      font-weight: 600;
      font-size: 12px;
      box-shadow: $shadow-soft;
    }
  }
}

// Modal Body
.modal-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

// Item Details
.item-details {
  padding: 20px;
  flex: 1;
  
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }
}

// Item Name
.item-name {
  font-size: 22px;
  font-weight: 700;
  color: $text-dark;
  margin: 0;
  padding-right: 15px;
  line-height: 1.3;
}

// Item Price
.item-price {
  font-size: 18px;
  font-weight: 700;
  color: $primary-color;
  margin: 0;
  white-space: nowrap;
}

// Item Rating
.item-rating {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  .stars {
    display: flex;
    gap: 2px;
    margin-right: 8px;
  }
  
  .rating-value {
    font-weight: 600;
    font-size: 14px;
    color: $text-dark;
    margin-right: 4px;
  }
  
  .rating-count {
    font-size: 14px;
    color: $text-light;
  }
}

// Item Description
.item-description {
  font-size: 15px;
  line-height: 1.6;
  color: $text-medium;
  margin-bottom: 24px;
}

// Additions Section
.additions-section {
  margin-bottom: 24px;
}

// Addition Group
.addition-group {
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

// Addition Header
.addition-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: $text-dark;
    margin: 0;
  }
  
  .required-badge {
    font-size: 12px;
    padding: 3px 8px;
    background-color: rgba($warning-color, 0.2);
    color: darken($warning-color, 15%);
    border-radius: $radius-full;
    font-weight: 500;
  }
}

// Addition Options
.addition-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

// Option Item
.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-radius: $radius-md;
  background-color: $light-gray;
  cursor: pointer;
  transition: $transition-fast;
  
  &:hover {
    background-color: darken($light-gray, 3%);
  }
  
  &.active {
    background-color: rgba($primary-color, 0.1);
    border: 1px solid rgba($primary-color, 0.2);
  }
  
  .option-details {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .option-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    
    .radio-selector {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid $border-color;
      position: relative;
      transition: $transition-fast;
      
      &.active {
        border-color: $primary-color;
        
        &:after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: $primary-color;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    
    .checkbox-selector {
      width: 20px;
      height: 20px;
      border-radius: $radius-sm;
      border: 2px solid $border-color;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: $transition-fast;
      
      &.active {
        border-color: $primary-color;
        background-color: $primary-color;
        color: $white;
      }
    }
  }
  
  .option-name {
    font-size: 14px;
    font-weight: 500;
    color: $text-dark;
  }
  
  .option-price {
    font-size: 14px;
    font-weight: 600;
    color: $text-dark;
  }
}

// Quantity Section
.quantity-section {
  margin-bottom: 24px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: $text-dark;
    margin: 0 0 12px 0;
  }
}

// Quantity Selector
.quantity-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  
  .quantity-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-color: $light-gray;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: $transition-fast;
    
    &:hover {
      background-color: darken($light-gray, 5%);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &.decrease {
      color: $text-dark;
    }
    
    &.increase {
      color: $white;
      background-color: $primary-color;
      
      &:hover {
        background-color: darken($primary-color, 5%);
      }
    }
  }
  
  .quantity-input {
    width: 60px;
    height: 40px;
    border: 1px solid $border-color;
    border-radius: $radius-md;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: $text-dark;
    
    &:focus {
      outline: none;
      border-color: $primary-color;
    }
    
    // Remove up/down arrows
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  }
}

// Instructions Section
.instructions-section {
  margin-bottom: 20px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: $text-dark;
    margin: 0 0 12px 0;
  }
  
  .instructions-input {
    width: 100%;
    height: 100px;
    padding: 15px;
    border: 1px solid $border-color;
    border-radius: $radius-md;
    font-size: 14px;
    resize: none;
    transition: $transition-fast;
    
    &:focus {
      outline: none;
      border-color: $primary-color;
    }
    
    &::placeholder {
      color: $text-light;
    }
  }
}

// Order Actions
.order-actions {
  padding: 20px;
  border-top: 1px solid $border-color;
  background-color: $off-white;
}

// Order Summary
.order-summary {
  margin-bottom: 15px;
  
  .summary-detail {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .detail-label {
      font-size: 14px;
      color: $text-medium;
    }
    
    .detail-value {
      font-size: 14px;
      font-weight: 600;
      color: $text-dark;
    }
  }
}

// Action Button
.action-button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: $radius-md;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: $transition-base;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &.primary {
    background-color: $primary-color;
    color: $white;
    box-shadow: 0 6px 12px rgba($primary-color, 0.4);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    
    &:hover {
      background-color: darken($primary-color, 8%);
      box-shadow: 0 8px 16px rgba($primary-color, 0.5);
    }
    
    &:active {
      transform: translateY(1px);
      box-shadow: 0 4px 8px rgba($primary-color, 0.3);
    }
    
    .price-tag {
      background-color: rgba($white, 0.25);
      padding: 8px 12px;
      border-radius: $radius-full;
      font-weight: 700;
      margin-left: 8px;
    }
  }
  
  &.remove {
    background-color: rgba($danger-color, 0.1);
    color: $danger-color;
    border: 2px solid $danger-color;
    font-weight: 600;
    
    &:hover {
      background-color: rgba($danger-color, 0.15);
      box-shadow: 0 4px 8px rgba($danger-color, 0.2);
    }
    
    &:active {
      transform: translateY(1px);
    }
  }
}

// Animations
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// Media queries for responsiveness
@media (max-width: 600px) {
  .gourmet-modal {
    :deep(.modal-container) {
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      border-radius: 0;
      margin: 0;
    }
  }
  
  .modal-header {
    .food-image-container {
      height: 200px;
    }
  }
  
  .item-name {
    font-size: 20px;
  }
  
  .action-button {
    padding: 14px;
  }
}
</style>