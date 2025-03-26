<template>
    <div class="popular-combos-section">
      <div class="section-header">
        <h2 class="section-title">Popular Combos</h2>
        <p class="section-subtitle">Favorite combinations chosen by our customers</p>
      </div>
      
      <div class="scroll-container">
        <button class="scroll-button prev" @click="scrollLeft">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <div class="combos-wrapper" ref="combosWrapper">
          <div 
            class="combo-item"
            :class="[isInCart(combo.id) ? 'has-in-cart' : '']"
            v-for="(combo, index) in combos" 
            :key="index"
            @click="onSelect(combo)"
          >
            <!-- Combo Badge -->
            <div class="combo-badge">
              <div class="badge-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <span>{{ combo.orders }} ordered</span>
            </div>
            
            <!-- Combo Image -->
            <div class="combo-image-container">
              <div class="combo-image-wrapper">
                <img :src="combo.thumbnail || 'https://hunanchinesefoodwhitby.com/img/placeholders/comfort_food_placeholder.png'" class="combo-image" />
              </div>
              
              <!-- Add to cart controls -->
              <div class="cart-controls">
                <div class="quantity-control" :style="getQuantityControlStyles()" v-if="isInCart(combo.id)">
                  <button class="control-btn decrease" @click.stop="decrease(combo.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                  <div class="quantity-display">
                    <input 
                      type="number" 
                      :value="getCartItemQuantity(combo.id)" 
                      @input="handleQuantity($event, combo.id)" 
                      @click.stop 
                      min="1"
                    >
                  </div>
                  <button class="control-btn increase" @click.stop="increase(combo.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
                
                <button v-else class="add-to-cart-btn" @click.stop="addToCart(combo)" :style="getAddButtonStyles()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Combo Content -->
            <div class="combo-content">
              <h3 class="combo-name">{{ combo.name }}</h3>
              
              <!-- Items included -->
              <div class="included-items">
                <span v-for="(item, idx) in combo.items" :key="idx" class="included-item">
                  {{ item.name }}{{ idx < combo.items.length - 1 ? ',' : '' }}
                </span>
              </div>
              
              <!-- Social proof -->
              <div class="social-proof">
                <div class="avatars">
                  <div class="avatar" v-for="(avatar, i) in combo.recentBuyers.slice(0, 3)" :key="i">
                    <img :src="avatar" alt="Customer avatar" />
                  </div>
                  <div class="more-buyers" v-if="combo.recentBuyers.length > 3">
                    +{{ combo.recentBuyers.length - 3 }}
                  </div>
                </div>
                <div class="time-indicator">
                  {{ combo.lastOrdered }}
                </div>
              </div>
              
              <!-- Combo price -->
              <div class="price-container">
                <div class="current-price">
                  {{ 'NGN' | currencySymbol }}{{ combo.price | money }}
                </div>
                <div class="savings" v-if="combo.savings > 0">
                  Save {{ combo.savingsPercent }}%
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button class="scroll-button next" @click="scrollRight">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'PopularCombos',
    props: {
      styling: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        scrollAmount: 280, // Amount to scroll on button click
        // Sample data - in a real implementation, this would come from props or API
        combos: [
          {
            id: 'combo1',
            name: 'Family Feast',
            price: 12000,
            savings: 2500,
            savingsPercent: 20,
            thumbnail: 'https://pointsbud-images.s3.amazonaws.com/c794267fc81e77a48e608d36e3f0f3f1',
            items: [
              { id: 'p1', name: 'Jollof Rice' },
              { id: 'p2', name: 'Grilled Chicken' },
              { id: 'p3', name: 'Plantain' }
            ],
            orders: 128,
            recentBuyers: [
              'https://i.pravatar.cc/50?img=1',
              'https://i.pravatar.cc/50?img=2',
              'https://i.pravatar.cc/50?img=3',
              'https://i.pravatar.cc/50?img=4',
              'https://i.pravatar.cc/50?img=5'
            ],
            lastOrdered: '5 minutes ago'
          },
          {
            id: 'combo2',
            name: 'Date Night Special',
            price: 8500,
            savings: 1000,
            savingsPercent: 15,
            thumbnail: 'https://pointsbud-images.s3.amazonaws.com/c794267fc81e77a48e608d36e3f0f3f1',
            items: [
              { id: 'p4', name: 'Fried Rice' },
              { id: 'p5', name: 'Beef Suya' },
              { id: 'p6', name: 'Chapman' }
            ],
            orders: 89,
            recentBuyers: [
              'https://i.pravatar.cc/50?img=6',
              'https://i.pravatar.cc/50?img=7',
              'https://i.pravatar.cc/50?img=8'
            ],
            lastOrdered: '2 minutes ago'
          },
          {
            id: 'combo3',
            name: 'Lunch Special',
            price: 5000,
            savings: 800,
            savingsPercent: 12,
            thumbnail: 'https://pointsbud-images.s3.amazonaws.com/c794267fc81e77a48e608d36e3f0f3f1',
            items: [
              { id: 'p7', name: 'Pounded Yam' },
              { id: 'p8', name: 'Egusi Soup' },
              { id: 'p9', name: 'Meat' }
            ],
            orders: 212,
            recentBuyers: [
              'https://i.pravatar.cc/50?img=9',
              'https://i.pravatar.cc/50?img=10',
              'https://i.pravatar.cc/50?img=11',
              'https://i.pravatar.cc/50?img=12'
            ],
            lastOrdered: 'Just now'
          },
          {
            id: 'combo4',
            name: 'Weekend Party Pack',
            price: 18000,
            savings: 3500,
            savingsPercent: 25,
            thumbnail: 'https://pointsbud-images.s3.amazonaws.com/c794267fc81e77a48e608d36e3f0f3f1',
            items: [
              { id: 'p10', name: 'Asun' },
              { id: 'p11', name: 'Jollof Rice' },
              { id: 'p12', name: 'Small Chops' }
            ],
            orders: 156,
            recentBuyers: [
              'https://i.pravatar.cc/50?img=13',
              'https://i.pravatar.cc/50?img=14',
              'https://i.pravatar.cc/50?img=15'
            ],
            lastOrdered: '15 minutes ago'
          },
          {
            id: 'combo5',
            name: 'Student Budget Meal',
            price: 3500,
            savings: 500,
            savingsPercent: 10,
            thumbnail: 'https://pointsbud-images.s3.amazonaws.com/c794267fc81e77a48e608d36e3f0f3f1',
            items: [
              { id: 'p13', name: 'Indomie Special' },
              { id: 'p14', name: 'Chicken' },
              { id: 'p15', name: 'Soft Drink' }
            ],
            orders: 324,
            recentBuyers: [
              'https://i.pravatar.cc/50?img=16',
              'https://i.pravatar.cc/50?img=17',
              'https://i.pravatar.cc/50?img=18',
              'https://i.pravatar.cc/50?img=19',
              'https://i.pravatar.cc/50?img=20'
            ],
            lastOrdered: '1 minute ago'
          }
        ]
      };
    },
    computed: {
      ...mapGetters('shop', ['cart']),
      primaryColor() {
        return this.styling?.primary_color || '#E53945';
      },
      textOnPrimary() {
        return this.styling?.text_on_primary || 'white';
      }
    },
    methods: {
      scrollLeft() {
        if (this.$refs.combosWrapper) {
          this.$refs.combosWrapper.scrollBy({
            left: -this.scrollAmount,
            behavior: 'smooth'
          });
        }
      },
      scrollRight() {
        if (this.$refs.combosWrapper) {
          this.$refs.combosWrapper.scrollBy({
            left: this.scrollAmount,
            behavior: 'smooth'
          });
        }
      },
      onSelect(combo) {
        this.$emit('onSelect', combo);
      },
      isInCart(comboId) {
        return this.cart.find(item => item.id === comboId);
      },
      getCartItemQuantity(comboId) {
        const item = this.cart.find(item => item.id === comboId);
        return item ? item.quantity : 0;
      },
      handleQuantity($event, comboId) {
        let value = parseInt($event?.target?.value) || 1;
        this.$store.dispatch('shop/setItemQuantity', {
          id: comboId,
          quantity: value
        });
      },
      getAddButtonStyles() {
        return {
          backgroundColor: this.primaryColor,
          color: this.textOnPrimary,
        };
      },
      getQuantityControlStyles() {
        return {
          backgroundColor: this.primaryColor,
          color: this.textOnPrimary,
        };
      },
      addToCart(combo) {
        this.$store.dispatch('shop/addToCart', { ...combo, quantity: 1 });
      },
      decrease(comboId) {
        this.$store.dispatch('shop/decreaseItemQuantity', comboId);
      },
      increase(comboId) {
        this.$store.dispatch('shop/increaseItemQuantity', comboId);
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  // Colors
  $primary: #E53945;
  $primary-dark: #A02730;
  $secondary: #f79939;
  $text-dark: #333333;
  $text-medium: #666666;
  $text-light: #999999;
  $border-color: #E0E0E0;
  $background-white: #FFFFFF;
  $background-light: #F9F9F9;
  $background-lighter: #F5F5F5;
  $shadow-soft: rgba(0, 0, 0, 0.05);
  $shadow-medium: rgba(0, 0, 0, 0.08);
  $shadow-hard: rgba(0, 0, 0, 0.12);
  $success: #5ac091;
  $darkaccent: #dd6b6b36;
  
  // Typography
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  // Popular Combos Section
  .popular-combos-section {
    padding: 20px 16px;
    background-color: $background-white;
    
    .section-header {
      margin-bottom: 20px;
      
      .section-title {
        font-size: 20px;
        font-weight: 700;
        color: $text-dark;
        margin: 0 0 5px 0;
      }
      
      .section-subtitle {
        font-size: 14px;
        color: $text-medium;
        margin: 0;
      }
    }
  }
  
  // Scroll Container
  .scroll-container {
    position: relative;
    padding: 10px 0;
    display: flex;
    align-items: center;
  }
  
  // Scroll Buttons
  .scroll-button {
    position: absolute;
    z-index: 2;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    color: $primary;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: $primary;
      color: white;
      transform: scale(1.1);
    }
    
    &.prev {
      left: 0;
      transform: translateX(-50%);
    }
    
    &.next {
      right: 0;
      transform: translateX(50%);
    }
    
    &:focus {
      outline: none;
    }
  }
  
  // Combos Wrapper
  .combos-wrapper {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    padding: 10px 20px;
    gap: 16px;
    margin: 0 10px;
    
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }
  
  // Combo Item
  .combo-item {
    position: relative;
    min-width: 260px;
    max-width: 280px;
    flex: 0 0 auto;
    background-color: $background-white;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px $shadow-soft;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    
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
  }
  
  // Combo Badge
  .combo-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 11px;
    font-weight: 600;
    box-shadow: 0 2px 5px $shadow-medium;
    
    .badge-icon {
      margin-right: 5px;
      display: flex;
      align-items: center;
    }
  }
  
  // Combo Image
  .combo-image-container {
    position: relative;
    width: 100%;
    padding-top: 70%; // Aspect ratio
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
    
    .combo-name {
      font-size: 16px;
      font-weight: 600;
      color: $text-dark;
      margin: 0 0 10px 0;
      line-height: 1.4;
    }
    
    .included-items {
      margin-bottom: 12px;
      
      .included-item {
        font-size: 13px;
        color: $text-medium;
        display: inline;
        line-height: 1.5;
        
        &:not(:last-child) {
          margin-right: 4px;
        }
      }
    }
  }
  
  // Social Proof
  .social-proof {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    
    .avatars {
      display: flex;
      align-items: center;
      
      .avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid white;
        margin-right: -10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .more-buyers {
        background-color: $secondary;
        color: white;
        font-size: 10px;
        font-weight: 600;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
      }
    }
    
    .time-indicator {
      font-size: 11px;
      color: $text-light;
      background-color: $background-lighter;
      padding: 3px 8px;
      border-radius: 20px;
    }
  }
  
  // Price Container
  .price-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    
    .current-price {
      font-weight: 700;
      font-size: 16px;
      color: $text-dark;
    }
    
    .savings {
      font-size: 12px;
      font-weight: 600;
      color: white;
      background-color: $success;
      padding: 4px 8px;
      border-radius: 20px;
    }
  }
  
  // Media Queries
  @media (max-width: 768px) {
    .combo-item {
      min-width: 240px;
      border-radius: 12px;
      
      &:hover {
        transform: translateY(-3px);
      }
    }
    
    .section-header .section-title {
      font-size: 18px;
    }
    
    .combo-badge {
      font-size: 10px;
      padding: 4px 8px;
    }
    
    .combo-content {
      padding: 12px;
      
      .combo-name {
        font-size: 15px;
      }
    }
    
    .social-proof .avatars .avatar {
      width: 20px;
      height: 20px;
    }
    
    .price-container .current-price {
      font-size: 15px;
    }
  }