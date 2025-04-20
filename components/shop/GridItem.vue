<template>
  <div
    class="gourmet-item"
    :class="[
      isInCart ? 'has-in-cart' : '',
      product.availability === 'available' ? 'is-available' : 'is-out-of-stock',
      isDeal ? 'is-deal' : ''
    ]"
    @click="onSelect"
  >
    <!-- Badges - Special offers, bestseller, etc. -->
    <div class="item-badges" v-if="product.availability === 'available'">
      <div class="badge deal-badge" v-if="isDeal">
        <span class="badge-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="5" x2="5" y2="19"></line>
            <circle cx="6.5" cy="6.5" r="2.5"></circle>
            <circle cx="17.5" cy="17.5" r="2.5"></circle>
          </svg>
        </span>
        <span>Special</span>
      </div>
      <div class="badge popular-badge" v-if="product.is_popular">
        <span class="badge-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </span>
        <span>Popular</span>
      </div>
    </div>

    <div class="ai-badge" v-if="product.thumbnail_ai_generated">
      <span class="ai-badge-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      </span>
      <span>AI</span>
    </div>

    <!-- Item Image -->
    <div class="item-image-container">
      <div class="item-image-wrapper">
        <img
          :src="thumbnailSrc"
          loading="lazy"
          class="item-image"
          :style="{'object-fit' : product.thumbnail && !imageFailed ? 'cover' : 'contain'}"
          @error="handleImageError"
        />
        
        <!-- Out of stock overlay -->
        <div class="out-of-stock-overlay" v-if="product.availability !== 'available'">
          <div class="out-of-stock-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <span>Out of Stock</span>
          </div>
        </div>
      </div>
      
      <!-- Add to cart controls -->
      <div class="cart-controls" v-if="product.availability === 'available'">
        <div class="quantity-control" :style="quantityControlStyles" v-if="isInCart">
          <button class="control-btn decrease" @click.stop="decrease">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <div class="quantity-display">
            <input 
              type="number" 
              :value="isInCart.quantity" 
              @input="handleQuantity($event)" 
              @click.stop 
              min="1"
            >
          </div>
          <button class="control-btn increase" @click.stop="increase">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="plus-icon">
              <line x1="12" y1="5" x2="12" y2="19" class="vertical-line"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        
        <button v-else class="add-to-cart-btn" @click.stop="addToCart" :style="addButtonStyles">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="plus-icon">
            <line x1="12" y1="5" x2="12" y2="19" class="vertical-line"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Item Content -->
    <div class="item-content">
      <!-- Availability indicator -->
      <div class="availability-indicator" v-if="product.availability === 'available' && product.quantity_available !== undefined">
        <div class="indicator-dot" :class="product.quantity_available > 3 ? 'high' : 'low'"></div>
        <span class="indicator-text" :class="product.quantity_available > 3 ? 'high' : 'low'">
          {{ product.quantity_available > 3 ? 'In Stock' : 'Low Stock' }}
        </span>
      </div>
      
      <!-- Item name -->
      <h3 class="item-name">{{ product.name }}</h3>
      
      <!-- Item description -->
      <p class="item-description" @click.stop>
        <TruncatedText
          @click.stop
          color="#666"
          fontSize="12"
          limit="60"
          :text="product.description"
        ></TruncatedText>
      </p>
      
      <!-- Item price -->
      <div class="price-container">
        <div class="current-price" :class="{ 'deal-price': isDeal }">
          {{ 'NGN' | currencySymbol }}{{ product.unitprice | money }}
        </div>
        <div class="original-price" v-if="isDeal && product.original_price">
          {{ 'NGN' | currencySymbol }} {{ product.original_price | money }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TruncatedText from "../text/TruncatedText.vue";
import { mapGetters } from "vuex";

export default {
  props: ["product", "styling", "category"],
  data() {
    return {
      quantity: 1,
      isHovered: false,
      imageFailed: false,
      placeholderImage: "https://pointsbud-images.s3.amazonaws.com/efb3d8a06626aa61b27adf99273b8eb4"
    };
  },
  computed: {
    ...mapGetters("shop", ["cart"]),
    isDeal() {
      return this.product.is_deal;
    },
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
    thumbnailSrc() {
      // If the image previously failed or thumbnail is missing, use placeholder
      if (this.imageFailed || !this.product.thumbnail) {
        return this.resolveImagePlaceHolder(this.category) || this.placeholderImage;
      }
      return this.product.thumbnail ||  this.resolveImagePlaceHolder(this.category) ;
    }
  },
  watch: {
    quantity(value) {
      this.$store.dispatch("shop/setItemQuantity", {
        id: this.product.id,
        quantity: value
      });
    },
    // Reset image failure state when product changes
    product() {
      this.imageFailed = false;
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
    onSelect() {
      if (this.product.availability === "available")
        this.$emit("onSelect", this.product);
    },
    handleQuantity($evt) {
      let value = parseInt($evt?.target?.value) || 1;
      this.$store.dispatch("shop/setItemQuantity", {
        id: this.product.id,
        quantity: value
      });
    },
    addToCart() {
      if (this.product.availability !== "available") {
        return;
      }
      if (!this.product.meta) {
        this.$store.dispatch("shop/addToCart", { ...this.product, quantity: 1 });
      } else {
        this.$emit("onSelect", this.product);
      }
    },
    decrease() {
      this.$store.dispatch("shop/decreaseItemQuantity", this.product.id);
    },
    increase() {
      this.$store.dispatch("shop/increaseItemQuantity", this.product.id);
    },
    handleImageError() {
      // Set flag to use placeholder image
      this.imageFailed = true;
    }
  },
  components: { TruncatedText },
  
};
</script>

<style lang="scss" scoped>
// Colors
$primary: #FF6B6B;
$primary-dark: #FF5252;
$secondary: #4ECDC4;
$success: #2FCC71;
$warning: #FFC107;
$danger: #E74C3C;
$info: #3498DB;
$text-dark: #333333;
$text-medium: #666666;
$text-light: #999999;
$border-color: #EEEEEE;
$background-white: #FFFFFF;
$background-light: #F9F9F9;
$background-lighter: #F5F5F5;
$shadow-soft: rgba(0, 0, 0, 0.05);
$shadow-medium: rgba(0, 0, 0, 0.08);
$shadow-hard: rgba(0, 0, 0, 0.12);

// Typography
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

// Main Item Container
.gourmet-item {
  position: relative;
  width: 100%;
  background-color: $background-white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px $shadow-soft;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px $shadow-medium;
    
    .item-image {
      transform: scale(1.05);
    }
  }
  
  &.has-in-cart {
    border: 2px solid $primary;
    box-shadow: 0 10px 25px rgba($primary, 0.2);
  }
  
  &.is-out-of-stock {
    opacity: 0.8;
    transform: none;
    pointer-events: none;
    
    &:hover {
      box-shadow: 0 8px 20px $shadow-soft;
    }
  }
}

// Item Badges
.item-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  .badge {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 600;
    box-shadow: 0 2px 5px $shadow-medium;
    line-height: 1.2;
    
    .badge-icon {
      margin-right: 4px;
      display: flex;
      align-items: center;
    }
    
    &.deal-badge {
      background-color: $primary;
      color: white;
    }
    
    &.popular-badge {
      background-color: $warning;
      color: $text-dark;
    }
  }
}

// Item Image Container
.item-image-container {
  position: relative;
  width: 100%;
  padding-top: 75%; // 4:3 Aspect ratio
  overflow: hidden;
  
  .item-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .item-image {
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
  }
}

// Out of Stock Overlay
.out-of-stock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .out-of-stock-message {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
}

// Cart Controls
.cart-controls {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 2;
  
  .add-to-cart-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: $primary;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 3px 10px rgba($primary, 0.3);
    
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 5px 15px rgba($primary, 0.4);
    }
    
    // Add bouncy effect to plus icon in add button
    .plus-icon {
      transform-origin: center;
      transition: transform 0.2s ease;
      
      .vertical-line {
        animation: bounce 2s infinite;
        transform-origin: center;
      }
    }
    
    &:hover .vertical-line {
      animation-duration: 1s;
    }
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    background-color: $primary;
    border-radius: 50px;
    padding: 3px;
    box-shadow: 0 3px 10px rgba($primary, 0.3);
    
    .control-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
      
      // Add bouncy effect to plus icon in increase button
      &.increase {
        .plus-icon {
          transform-origin: center;
          transition: transform 0.2s ease;
        }
        
        .vertical-line {
          animation: bounce 2s infinite;
          transform-origin: center;
        }
        
        &:hover .vertical-line {
          animation-duration: 1s;
        }
      }
    }
    
    .quantity-display {
      width: 40px;
      text-align: center;
      color: white;
      font-weight: 600;
      
      input {
        width: 100%;
        background: transparent;
        border: none;
        color: white;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        -moz-appearance: textfield;
        
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        &:focus {
          outline: none;
        }
      }
    }
  }
}

// Define the bounce animation
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: scaleY(1);
  }
  40% {
    transform: scaleY(0.7);
  }
  60% {
    transform: scaleY(1.2);
  }
}

// Item Content
.item-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

// Availability Indicator
.availability-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  
  .indicator-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    
    &.high {
      background-color: $success;
    }
    
    &.low {
      background-color: $warning;
    }
  }
  
  .indicator-text {
    font-size: 12px;
    font-weight: 500;
    
    &.high {
      color: $success;
    }
    
    &.low {
      color: $warning;
    }
  }
}

// Item Name
.item-name {
  font-size: 16px;
  font-weight: 600;
  color: $text-dark;
  margin: 0 0 6px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// Item Description
.item-description {
  flex-grow: 1;
  color: $text-medium;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
}

// Price Container
.price-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  
  .current-price {
    font-weight: 700;
    font-size: 16px;
    color: $text-dark;
    
    &.deal-price {
      color: $primary;
      background-color: rgba($primary, 0.1);
      padding: 4px 10px;
      border-radius: 8px;
    }
  }
  
  .original-price {
    font-size: 14px;
    color: $text-light;
    text-decoration: line-through;
  }
}

// Deal Item Styling
.is-deal {
  .item-image-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, $primary, $warning);
  }
}

// Media Queries
@media (max-width: 768px) {
  .gourmet-item {
    border-radius: 12px;
    
    &:hover {
      transform: translateY(-3px);
    }
  }
  
  .item-badges .badge {
    font-size: 10px;
    padding: 4px 8px;
  }
  
  .item-name {
    font-size: 15px;
  }
  
  .item-content {
    padding: 12px;
  }
  
  .price-container .current-price {
    font-size: 15px;
  }
}
.ai-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.8), rgba(75, 0, 130, 0.8));
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 
              inset 0 1px 1px rgba(255, 255, 255, 0.4), 
              inset 0 -1px 1px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  .ai-badge-icon {
    margin-right: 4px;
    display: flex;
    align-items: center;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
    opacity: 0.5;
    pointer-events: none;
  }
}

// Media query update for AI badge
@media (max-width: 768px) {
  .ai-badge {
    font-size: 10px;
    padding: 4px 8px;
  }
}
</style>