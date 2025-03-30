<!-- Template Section -->
<template>
    <div
      class="popular-combo-item"
      :class="[
        isInCart ? 'has-in-cart' : '',
        combo.availability === 'available' ? 'is-available' : 'is-out-of-stock',
        isFeatured ? 'is-featured' : ''
      ]"
      @click="onSelect"
    >
      <!-- Badges - Featured, top-rated, etc. -->
      <div class="item-badges">
        <div class="badge featured-badge" v-if="isFeatured">
          <span class="badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></path>
            </svg>
          </span>
          <span>Featured</span>
        </div>
        <div class="badge top-rated-badge" v-if="combo.is_top_rated">
          <span class="badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </span>
          <span>Top Rated</span>
        </div>
        <div class="badge orders-badge" v-if="combo.order_count > 50">
          <span class="badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </span>
          <span>{{ combo.order_count }}+ Orders</span>
        </div>
      </div>
  
      <!-- Combo Image -->
      <div class="combo-image-container">
        <div class="combo-image-wrapper">
          <img
            :src="combo.thumbnail || 'https://hunanchinesefoodwhitby.com/img/placeholders/comfort_food_placeholder.png'"
            class="combo-image"
          />
          
          <!-- Out of stock overlay -->
          <div class="out-of-stock-overlay" v-if="combo.availability !== 'available'">
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
        <div class="cart-controls" v-if="combo.availability === 'available'">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          
          <button v-else class="add-to-cart-btn" @click.stop="addToCart" :style="addButtonStyles">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Combo Content -->
      <div class="combo-content">
        <!-- Combo name -->
        <h3 class="combo-name">{{ combo.name }}</h3>
        
        <!-- Combo items list -->
        <div class="combo-items">
          <p class="combo-items-title">Includes:</p>
          <ul class="combo-items-list">
            <li v-for="(item, index) in combo.items" :key="index">
              {{ item.name }} {{ item.quantity > 1 ? `(${item.quantity})` : '' }}
            </li>
          </ul>
        </div>
        
        <!-- Combo price -->
        <div class="price-container">
          <div class="savings-badge" v-if="calculateSavings > 0">
            Save {{ 'NGN' | currencySymbol }}{{ calculateSavings | money }}
          </div>
          <div class="current-price" :class="{ 'featured-price': isFeatured }">
            {{ 'NGN' | currencySymbol }}{{ combo.unitprice | money }}
          </div>
          <div class="original-price" v-if="combo.items_total_price">
            {{ 'NGN' | currencySymbol }}{{ combo.items_total_price | money }}
          </div>
        </div>
        
        <!-- Popularity indicator -->
        <div class="popularity-container" v-if="combo.popularity_score">
          <div class="popularity-score">
            <div class="popularity-meter">
              <div class="popularity-fill" :style="{ width: `${Math.min(combo.popularity_score, 100)}%` }"></div>
            </div>
            <span class="popularity-text">{{ getPopularityText }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>


<script>
  // Script Section
import TruncatedText from "../text/TruncatedText.vue";
import { mapGetters } from "vuex";

export default {
  props: ["combo", "styling"],
  data() {
    return {
      quantity: 1,
      isHovered: false
    };
  },
  computed: {
    ...mapGetters("shop", ["cart"]),
    isFeatured() {
      return this.combo.is_featured;
    },
    iconColor() {
      return this.styling?.text_on_primary || "white";
    },
    isInCart() {
      return this.cart.find((item) => item.id === this.combo.id);
    },
    primaryColor() {
      return this.styling?.primary_color || "#8E44AD"; // Purple for combos instead of red
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
    calculateSavings() {
      if (this.combo.items_total_price && this.combo.unitprice) {
        return Math.max(0, this.combo.items_total_price - this.combo.unitprice);
      }
      return 0;
    },
    getPopularityText() {
      const score = this.combo.popularity_score || 0;
      if (score >= 90) return "Extremely Popular";
      if (score >= 70) return "Very Popular";
      if (score >= 50) return "Popular";
      if (score >= 30) return "Gaining Popularity";
      return "New Combo";
    }
  },
  watch: {
    quantity(value) {
      this.$store.dispatch("shop/setItemQuantity", {
        id: this.combo.id,
        quantity: value
      });
    }
  },
  methods: {
    onSelect() {
      if (this.combo.availability === "available")
        this.$emit("onSelect", this.combo);
    },
    handleQuantity($evt) {
      let value = parseInt($evt?.target?.value) || 1;
      this.$store.dispatch("shop/setItemQuantity", {
        id: this.combo.id,
        quantity: value
      });
    },
    addToCart() {
      if (this.combo.availability !== "available") {
        return;
      }
      if (!this.combo.meta) {
        this.$store.dispatch("shop/addToCart", { ...this.combo, quantity: 1 });
      } else {
        this.$emit("onSelect", this.combo);
      }
    },
    decrease() {
      this.$store.dispatch("shop/decreaseItemQuantity", this.combo.id);
    },
    increase() {
      this.$store.dispatch("shop/increaseItemQuantity", this.combo.id);
    }
  },
  components: { TruncatedText }
};
</script>

// Style Section
<style lang="scss" scoped>
// Colors
$primary: #E53945; // Red primary color from your scheme
$primary-dark: #A02730; // Deep primary from your scheme
$secondary: #f79939; // Orange secondary from your scheme
$secondarylight: #f798398b; // Light secondary from your scheme
$secondaryaccent: #5ac091; // Secondary accent from your scheme
$success: #5ac091; // Using your secondary accent for success
$warning: #f79939; // Using your secondary for warning
$danger: #E53945; // Using primary for danger
$info: #4bb39a; // Using light accent variant for info
$text-dark: #36454F; // Charcoal from your scheme
$text-medium: #686868; // Faint from your scheme
$text-light: #999999; // Keeping this as is
$border-color: #E0E0E0; // Border grey from your scheme
$background-white: #FFFFFF; // White
$background-light: #F1F8F9; // Background from your scheme
$background-lighter: #fbfeff; // Something from your scheme
$shadow-soft: rgba(0, 0, 0, 0.05);
$shadow-medium: rgba(0, 0, 0, 0.08);
$shadow-hard: rgba(0, 0, 0, 0.12);

// Typography
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

// Main Combo Container
.popular-combo-item {
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
    
    .combo-image {
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
  
  &.is-featured {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 60px 60px 0;
      border-color: transparent $primary transparent transparent;
      z-index: 1;
    }
    
    &::after {
      content: '★';
      position: absolute;
      top: 8px;
      right: 12px;
      color: white;
      font-size: 14px;
      z-index: 2;
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
    
    &.featured-badge {
      background-color: $primary;
      color: white;
    }
    
    &.top-rated-badge {
      background-color: $secondary;
      color: $text-dark;
    }
    
    &.orders-badge {
      background-color: $secondaryaccent;
      color: white;
    }
  }
}

// Combo Image Container
.combo-image-container {
  position: relative;
  width: 100%;
  padding-top: 65%; // 3:2 Aspect ratio for combos
  overflow: hidden;
  
  .combo-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .combo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

// Combo Content
.combo-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

// Combo Name
.combo-name {
  font-size: 18px;
  font-weight: 600;
  color: $text-dark;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// Combo Items
.combo-items {
  margin-bottom: 14px;
  flex-grow: 1;
  
  .combo-items-title {
    font-size: 13px;
    font-weight: 600;
    color: $text-medium;
    margin: 0 0 5px 0;
  }
  
  .combo-items-list {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      font-size: 13px;
      color: $text-medium;
      line-height: 1.4;
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      
      &:before {
        content: "•";
        color: $primary;
        font-weight: bold;
        display: inline-block;
        width: 10px;
        margin-right: 5px;
      }
    }
  }
}

// Price Container
.price-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  margin-bottom: 10px;
  flex-wrap: wrap;
  
  .savings-badge {
    font-weight: 600;
    font-size: 12px;
    color: white;
    background-color: $secondaryaccent;
    padding: 3px 8px;
    border-radius: 50px;
  }
  
  .current-price {
    font-weight: 700;
    font-size: 16px;
    color: $text-dark;
    
    &.featured-price {
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

// Popularity indicator
.popularity-container {
  margin-top: auto;
  
  .popularity-score {
    display: flex;
    flex-direction: column;
    gap: 5px;
    
    .popularity-meter {
      height: 5px;
      width: 100%;
      background-color: $background-lighter;
      border-radius: 50px;
      overflow: hidden;
      
      .popularity-fill {
        height: 100%;
        background: linear-gradient(90deg, $secondary, $primary);
        border-radius: 50px;
      }
    }
    
    .popularity-text {
      font-size: 12px;
      font-weight: 500;
      color: $text-medium;
      align-self: flex-end;
    }
  }
}

// Media Queries
@media (max-width: 768px) {
  .popular-combo-item {
    border-radius: 12px;
    
    &:hover {
      transform: translateY(-3px);
    }
  }
  
  .item-badges .badge {
    font-size: 10px;
    padding: 4px 8px;
  }
  
  .combo-name {
    font-size: 16px;
  }
  
  .combo-content {
    padding: 12px;
  }
  
  .combo-items .combo-items-list li {
    font-size: 12px;
  }
  
  .price-container .current-price {
    font-size: 15px;
  }
}
</style>