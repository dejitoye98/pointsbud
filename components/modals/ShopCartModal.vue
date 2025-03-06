<template>
    <BaseModal @close="$emit('close')">
        <template #header>
            <div class="padding-16">
                <p>Your Cart</p>
            </div>
        </template>

        <template #body>
            <div class="padding-16">
                <div style="margin-bottom: 16px;" class="item" v-for="(item, index) in cart" :key="index">
                    <div class="item__container full-width flex gap-2">
                        <img class="thumbnail" :src="item.thumbnail | getFoodImage">
                        
                        <div class="space-between flex full-width">
                            <div class="flex-col">
                                <p>{{item.name}}</p>
    
                                <div class="quantity gap-1">
                                    <button class="quantity-choose" @click="decreaseQuantity(item)">-</button>
                                    <input style="width: 20px; padding: 2; text-align: center" :value="item.quantity" @click="setQuantity($evt, item)">
                                    <button class="quantity-choose" @click="increaseQuantity(item)">+</button>
                                </div>
                            </div>
    
                            <div>
                                {{ "NGN" | currencySymbol }} {{ item.unitprice * item.quantity }}
                            </div>

                        </div>
                    </div>
                </div>

                <div class="totals">
                    <div class="space-between flex">
                        <div>Sub total</div>
                        <div>{{"NGN" | currencySymbol}} {{cartSubtotal}}</div>
                    </div>
                    <div class="space-between flex bold">
                        <div>Total</div>
                        <div>{{"NGN" | currencySymbol}} {{cartSubtotal}}</div>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    data() {
        return {

        }
    },
    methods: {
        decreaseQuantity(item) {
            this.$store.dispatch('shop/decreaseItemQuantity', item.id)
        },
        increaseQuantity(item) {
            this.$store.dispatch('shop/increaseItemQuantity', item.id)
        },
        setQuantity($evt, item) {
            const value = $evt?.target?.value;
            this.$store.dispatch('shop/setItemQuantity',{id: item.id, quantity: value})
        }
    },
    computed:{
        ...mapGetters('shop', ['cart']),
        cartSubtotal() {
            let sum = 0;
            for (let item of this.cart) {
                const amount = (item.quantity * item.unitprice)
                sum += amount;
            }
            return sum;
        }
    }
}

</script>

<style lang="scss" scoped>
// Typography
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

// Color Variables
$primary-dark: darken($primary, 10%);
$primary-light: rgba($primary, 0.1);
$primary-lighter: rgba($primary, 0.05);
$primary-border: rgba($primary, 0.3);

$text-dark: #222222;
$text-medium: #555555;
$text-light: #888888;
$text-lighter: #bbbbbb;

$background-white: #FFFFFF;
$background-light: #F9F9F9;
$background-lighter: #F5F5F5;
$border-color: #EEEEEE;
$border-light: rgba(238, 238, 238, 0.7);

$shadow-soft: 0 4px 10px rgba(0, 0, 0, 0.035);
$shadow-medium: 0 8px 20px rgba(0, 0, 0, 0.07);
$shadow-focus: 0 0 0 3px rgba($primary, 0.2);
$shadow-button: 0 4px 12px rgba($primary, 0.3);

$success: #4CAF50;
$warning: #FFC107;
$error: #FF5252;
$info: #2196F3;

// Base Styles
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}

// Utility Classes
.flex {
  display: flex;

  &-center-y {
    align-items: center;
  }

  &-center-x {
    justify-content: center;
  }

  &-col {
    flex-direction: column;
  }
}

.gap-2 {
  gap: 8px;
}

.gap-16 {
  gap: 16px;
}

.space-between {
  justify-content: space-between;
}

.padding-16 {
  padding: 16px;
}

.padding-16-x {
  padding-left: 16px;
  padding-right: 16px;
}

.padding-8-x {
  padding-left: 8px;
  padding-right: 8px;
}

.text-center {
  text-align: center;
}

.primary {
  color: $primary;
}

.primary-text {
  font-weight: 600;
}

.single-line-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

// Main Container
.page__container {
  max-width: 500px;
  margin: 0 auto;
  background-color: $background-light;
  min-height: 100vh;
  position: relative;
  box-shadow: $shadow-medium;
}

// Sidebar
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.3s ease;

  &__container {
    width: 80%;
    max-width: 360px;
    height: 100%;
    background-color: $background-white;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.15);
    overflow-y: auto;
    animation: slideIn 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &__header {
    padding: 24px 20px;
    background-color: $primary-lighter;
    border-bottom: 1px solid $border-light;

    p {
      &:first-child {
        font-size: 18px;
        font-weight: 600;
        color: $text-dark;
        margin-bottom: 6px;
      }

      &:last-child {
        font-size: 14px;
        color: $text-medium;
      }
    }
  }

  &__body {
    padding: 20px;

    .section-tite {
      margin-bottom: 15px;

      .subscription-text {
        font-size: 15px;
        font-weight: 600;
        color: $text-dark;
        position: relative;
        display: inline-block;
        
        &:after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: $primary;
          border-radius: 2px;
        }
      }
    }
  }

  &__business {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 12px;
    border-radius: 12px;
    transition: all 0.2s ease;
    cursor: pointer;
    margin-bottom: 8px;
    
    &:hover {
      background-color: $background-lighter;
      transform: translateX(4px);
    }
    
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid $border-light;
    }
    
    p {
      font-size: 14px;
      font-weight: 500;
      color: $text-medium;
    }
  }
}

// Main Content Area
.main {
  background-color: $background-white;
  position: relative;
  min-height: 100vh;
}

// Header
.header {
  background-color: $background-white;
  box-shadow: $shadow-soft;
  position: sticky;
  top: 0;
  z-index: 50;
  
  &__container {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__purchases {
    font-size: 14px;
    font-weight: 500;
    color: $text-medium;
  }
  
  &__wallet {
    p {
      font-weight: 500;
      color: $text-dark;
    }
    
    .pay-button {
      padding: 8px 16px;
      background-color: $primary;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background-color: $primary-dark;
        transform: translateY(-2px);
      }
    }
  }
}

// Logo
.logo {
  &__container {
    display: flex;
    align-items: center;
    gap: 12px;
    
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid $border-light;
    }
    
    h1 {
      font-size: 18px;
      font-weight: 600;
      color: $text-dark;
      margin: 0;
    }
  }
}

// Account Button
.account {
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: $shadow-soft;
  
  &:hover {
    transform: scale(1.05);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

// Bookmark Button
.bookmark-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: $primary;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: $shadow-button;
  
  &:hover {
    background-color: $primary-dark;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba($primary, 0.4);
  }
  
  .icon {
    flex-shrink: 0;
  }
}

// Tabs
.tabs {
  position: sticky;
  top: 68px;
  z-index: 40;
  background-color: $background-white;
  border-bottom: 1px solid $border-light;
  padding: 0;
  box-shadow: $shadow-soft;
  
  .tabscontainer {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0 10px;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  .tabsitem {
    padding: 16px 20px;
    position: relative;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.25s ease;
    
    p {
      font-size: 15px;
      font-weight: 500;
      color: $text-medium;
      margin: 0;
      transition: color 0.2s;
    }
    
    &:hover:not(.selected_tab) p {
      color: $text-dark;
    }
    
    &.selected_tab {
      p {
        font-weight: 600;
        color: $primary;
      }
    }
    
    .badge {
      position: absolute;
      top: 8px;
      right: 8px;
      min-width: 18px;
      height: 18px;
      background-color: $primary;
      color: white;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      box-shadow: 0 2px 5px rgba($primary, 0.3);
      animation: pulse 2s infinite;
    }
  }
}

// Notification
.notifier {
  background-color: rgba($warning, 0.1);
  border-left: 3px solid $warning;
  margin: 10px 16px;
  border-radius: 8px;
  
  svg {
    color: $warning;
  }
  
  p {
    font-size: 14px;
    color: $text-medium;
  }
}

// Search
.search {
  position: relative;
  padding: 16px;
  border-bottom: 1px solid $border-light;
  
  .icon {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    color: $text-light;
  }
  
  input {
    width: 100%;
    padding: 14px 16px 14px 40px;
    border: 1px solid $border-color;
    border-radius: 10px;
    font-size: 14px;
    transition: all 0.2s;
    
    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: $shadow-focus;
    }
    
    &::placeholder {
      color: $text-lighter;
    }
  }
}

// Lists and Grid
.list {
  padding: 16px;
}

.section {
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 80px;
  }
}

.category-pane {
  padding: 16px 0 12px;
  
  .category-name {
    font-size: 18px;
    font-weight: 600;
    color: $text-dark;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 30px;
      height: 2px;
      background-color: $primary;
      border-radius: 2px;
    }
  }
  
  .primary-text {
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      color: $primary-dark;
      transform: translateX(3px);
    }
  }
}

.see-more {
  margin-top: 10px;
  margin-bottom: 20px;
  
  p {
    font-size: 14px;
    color: $text-medium;
    padding: 12px;
    background-color: $background-lighter;
    border-radius: 8px;
    transition: all 0.2s;
    cursor: pointer;
    
    &:hover {
      background-color: $primary-lighter;
      color: $primary;
    }
  }
}

// Bottom Navigation
.bottom-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  height: 60px;
  border-radius: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-items: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
  
  .navigation-item {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &__container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        transform: translateY(-3px);
      }
      
      .tag.counter {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 18px;
        height: 18px;
        background-color: $primary;
        color: white;
        border-radius: 50%;
        font-size: 10px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

// Floating Cart Button
.floating-cart {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $shadow-button;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba($primary, 0.4);
  }
}

// Sticky Cart Button
.cart-sticky {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 460px;
  padding: 16px 24px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  box-shadow: $shadow-button;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 100;
  
  &:hover {
    transform: translateX(-50%) translateY(-3px);
    box-shadow: 0 8px 25px rgba($primary, 0.45);
  }
}

// Grid Layout
[style*="display: grid"] {
  margin-top: 10px;
  margin-bottom: 20px;
}

// Loading State
.flex-center-x.flex-center-y {
  padding: 30px 0;
  
  span {
    margin-top: 12px;
    color: $text-medium;
    font-size: 14px;
  }
}

// Quantity Button
.quantity-choose {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: $primary;
  color: white;
  border: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: $shadow-button;
  
  &:hover {
    background-color: $primary-dark;
    transform: scale(1.1);
  }
}

// Animations
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

// Media Queries
@media (max-width: 500px) {
  .page__container {
    max-width: 100%;
  }
  
  .cart-sticky {
    width: 92%;
  }
  
  .tabs .tabsitem {
    padding: 14px 16px;
  }
  
  .category-pane .category-name {
    font-size: 17px;
  }
}

// Tab Variant
.tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: $text-medium;
  cursor: pointer;
  transition: all 0.2s;
  
  svg {
    flex-shrink: 0;
  }
  
  &:hover {
    background-color: $background-lighter;
  }
  
  &.active-tab {
    background-color: $primary;
    color: white;
  }
}

// Big Button
.big-btn {
  padding: 16px 24px;
  background-color: $primary;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: $shadow-button;
  
  &:hover {
    background-color: $primary-dark;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba($primary, 0.4);
  }
  
  &.full-width {
    width: 100%;
  }
}

// WhatsApp Background
.whatsapp-light-background {
  margin: 16px;
  padding: 16px;
  background-color: #DCF8C6;
  border-radius: 12px;
  
  p {
    text-align: center;
    font-size: 14px;
  }
}

// Utility to smooth out any rough edges in styling
body {
  color: $text-dark;
  line-height: 1.5;
  overflow-x: hidden;
}
</style>