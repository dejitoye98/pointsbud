<template>
    <div>
      <!-- Combo Products Section -->
      <div v-if="!loading_data" class="combo-products-container">
        <h2 class="section-title">Special Combos</h2>
        <div class="combo-grid">
          <div v-for="(combo, index) in processedCombos" :key="index" class="combo-card" :class="[isComboInCart(combo) ? 'in-cart': '']">
            <div class="combo-image-container">
              <!-- Collage thumbnail -->
              <div class="collage-thumbnail">
                <div v-for="(product, productIndex) in combo.products" :key="productIndex" class="collage-image" 
                  :style="{ backgroundImage: `url(${product.thumbnail || product.large_thumbnail})`, zIndex: combo.products.length - productIndex }">
                </div>
              </div>
            </div>
            <div class="combo-details">
              <h3 class="combo-name">{{ combo.combo_name }}</h3>
              <p class="combo-description">Includes:</p>
              <ul class="combo-items">
                <li v-for="(product, productIndex) in combo.products" :key="productIndex" class="combo-item">
                  <div class="product-info">
                    <div class="product-name">{{ product.name }}</div>
                    <div class="product-meta">
                      <span v-if="product.category" class="category-name">{{ product.category.name }}</span>
                      <span class="dot-separator" v-if="product.category && product.description">•</span>
                      <span class="product-description">{{ truncateDescription(product.description, 40) }}</span>
                    </div>
                  </div>
                  <div class="item-actions">
                    <button class="action-btn swap" title="Swap" @click="swapItem(combo, productIndex)">
                      <i class="fa fa-exchange"></i>
                    </button>
                    <button class="action-btn change" title="Change" @click="changeItem(combo, productIndex)">
                      <i class="fa fa-pencil"></i>
                    </button>
                  </div>
                </li>
              </ul>
              <div class="combo-price">
                <span class="combo-price-value">{{"NGN" | currencySymbol }}{{ calculateComboPrice(combo) | money }}</span>
              </div>
              <button class="add-to-cart-btn" @click="addComboToCart(combo)">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading">
        Loading combos...
      </div>
    </div>
  </template>
  
  <script>
  import { map } from '@firebase/util';
import crypto from 'crypto'

  import {mapGetters} from 'vuex'
  
  export default {
    props: {
      products: {
        type: Array,
        required: true
      },
      loading_data: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        combos: [
            { "combo_name": "Shawarma Lover's Pack", "items": [4938, 4937, 4975] },
            { "combo_name": "Premium Lunch Duo", "items": [4941, 4939] },
            { "combo_name": "The Loaded Classic", "items": [4937, 4965] },
            { "combo_name": "Double Deluxe", "items": [4938, 4939] },
            { "combo_name": "Solo Shawarma Hit", "items": [4937] }
        ],
        discountPercentage: 0 // 15% discount on combos
      };
    },
    
    computed: {
        ...mapGetters('shop', ['cart']),
      processedCombos() {
        return this.combos.map(combo => {
          const comboProducts = combo.items.map(itemId => 
            this.products.find(product => product.id === itemId)
          ).filter(product => product !== undefined); // Filter out any products not found
          
          return {
            ...combo,
            products: comboProducts
          };
        }).filter(combo => combo.products.length > 0); // Only show combos with available products
      }
    },
    methods: {
        isComboInCart(combo) {
            return this.cart.find(c => c.combo_name === combo.name) || null
        },
        getProduct(id) {
            return this.products.find(p => p.id === id)
        },
      generateUniqueCode(length = 6) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomBytes = crypto.randomBytes(length);
        const code = [...randomBytes].map(byte => characters[byte % characters.length]).join('');
        return code;
      },
      truncateDescription(description, maxLength) {
        if (!description) return '';
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + '...';
      },
      calculateOriginalPrice(combo) {
        return combo.products.reduce((total, product) => {
          // Use unitprice or original_price if available
          const price = product.original_price || product.unitprice || 0;
          return total + parseFloat(price);
        }, 0);
      },
      calculateComboPrice(combo) {
        let sum = 0;

        
        // Only process the products from the selected combo
        


        

            for (let item of combo.items) {

              
                let product = this.getProduct(item)
              //  alert(JSON.stringify(product))

                sum += (product.unitprice * 1)
            }
        

        return sum;

      },
      addComboToCart(combo) {
        // Create payload for the selected combo only
        let payload = [];

        
        // Only process the products from the selected combo


        

            for (let item of combo.items) {

                let item_key = this.generateUniqueCode(6);
                let product = this.getProduct(item)


               // alert(JSON.stringify(product))
                let obj = {
                  unitprice: product.unitprice,
                  currency: product.currency,
                  name: product.name,
                  id: product.id,
                  thumbnail: product.thumbnail,
                  description: product.description,
                  quantity: 1,
                  customer_comment: '',
                  item_key: item_key,
                  item_uid: item_key,
                  combo_name: combo.combo_name
                };
                
                this.$store.dispatch('shop/addToCart', obj);
            }
        


        
        // Dispatch the cart action
        
        // Emit the event to notify parent component
        this.$emit('add-combo', combo);
      },
      changeItem(combo, productIndex) {
        // Emit event to change an item with another product
        this.$emit('change-item', { combo, productIndex });
      },
      swapItem(combo, productIndex) {
        // Emit event to swap an item with another product
        this.$emit('swap-item', { combo, productIndex });
      }
    },
    filters: {
      currency(value) {
        return '$' + parseFloat(value).toFixed(2);
      }
    }
  }
  </script>
  
  <style scoped>
  .combo-products-container {
    margin: 40px 0;
  }
  
  .section-title {
    font-size: 26px;
    margin-bottom: 25px;
    font-weight: 700;
    color: #36454F; /* Using your charcoal color */
    position: relative;
    padding-bottom: 10px;
  }
  
  .section-title:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #E53945; /* Your primary color */
  }
  
  .combo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
  }
  
  .combo-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
    transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    background-color: #fff;
    border: 1px solid rgba(224, 224, 224, 0.3); /* Very light border */
    position: relative;
  }
  
  .combo-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 30px rgba(229, 57, 69, 0.15); /* Light shadow with primary color */
  }
  
  .combo-image-container {
    height: 200px;
    position: relative;
    overflow: hidden;
    background: #fbfeff; /* Your something color */
  }
  
  .collage-thumbnail {
    height: 100%;
    position: relative;
  }
  
  .collage-image {
    position: absolute;
    width: 70%;
    height: 70%;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease-out;
    border: 3px solid white;
  }
  
  .combo-card:hover .collage-image {
    transform: scale(1.03) rotate(var(--rotation));
  }
  
  /* Position images in collage */
  .collage-image:nth-child(1) {
    top: 15%;
    left: 10%;
    transform: rotate(-8deg);
    --rotation: -8deg;
    z-index: 3;
  }
  
  .collage-image:nth-child(2) {
    top: 22%;
    left: 30%;
    transform: rotate(7deg);
    --rotation: 7deg;
    z-index: 2;
  }
  
  .collage-image:nth-child(3) {
    top: 18%;
    right: 12%;
    transform: rotate(-5deg);
    --rotation: -5deg;
    z-index: 1;
  }
  
  .combo-details {
    padding: 25px;
    position: relative;
  }
  
  .combo-name {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #36454F; /* Charcoal */
    line-height: 1.3;
  }
  
  .combo-description {
    color: #686868; /* Faint color */
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 500;
  }
  
  .combo-items {
    list-style-type: none;
    padding-left: 5px;
    margin-bottom: 18px;
    font-size: 14px;
    color: #333;
  }
  
  .combo-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px dashed rgba(224, 224, 224, 0.7);
    position: relative;
    padding-left: 18px;
  }
  
  .combo-item:before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px;
    height: 6px;
    background-color: #f79939; /* Secondary color */
    border-radius: 50%;
  }
  
  .product-info {
    flex-grow: 1;
    padding-right: 10px;
  }
  
  .product-name {
    font-weight: 500;
    margin-bottom: 3px;
  }
  
  .product-meta {
    font-size: 12px;
    color: #686868;
    line-height: 1.3;
    display: flex;
    flex-wrap: wrap;
  }
  
  .category-name {
    color: #5ac091;
    font-weight: 500;
  }
  
  .dot-separator {
    margin: 0 5px;
  }
  
  .product-description {
    opacity: 0.9;
  }
  
  .item-actions {
    display: flex;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.2s ease;
    margin-top: 2px;
  }
  
  .combo-item:hover .item-actions {
    opacity: 1;
  }
  
  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 13px;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
  }
  
  .action-btn.swap {
    color: #5ac091; /* Secondary accent color */
    background-color: rgba(90, 192, 145, 0.1);
  }
  
  .action-btn.change {
    color: #f79939; /* Using your secondary color */
    background-color: rgba(247, 153, 57, 0.1);
  }
  
  .action-btn:hover {
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.08);
  }
  
  .combo-price {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    gap: 12px;
  }
  
  .original-price {
    font-size: 15px;
    color: #686868; /* Faint color */
    text-decoration: line-through;
    font-weight: 400;
  }
  
  .combo-price-value {
    font-size: 22px;
    font-weight: 700;
    color: #E53945; /* Primary color */
  }
  
  .add-to-cart-btn {
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    background-color: #E53945; /* Primary color */
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 15px;
    letter-spacing: 0.3px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 10px rgba(229, 57, 69, 0.2);
  }
  
  .add-to-cart-btn:hover {
    background-color: #A02730; /* Deep primary color */
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(229, 57, 69, 0.3);
  }
  
  .add-to-cart-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(229, 57, 69, 0.2);
  }
  
  .add-to-cart-btn:before {
    content: '+';
    font-size: 18px;
    font-weight: 700;
  }
  
  .loading {
    text-align: center;
    padding: 40px;
    font-size: 16px;
    color: #686868; /* Faint color */
    background-color: #fbfeff; /* Something color */
    border-radius: 12px;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .combo-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    
    .combo-image-container {
      height: 170px;
    }
    
    .combo-item {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .item-actions {
      margin-top: 6px;
      align-self: flex-end;
      opacity: 1;
    }
    
    .combo-details {
      padding: 20px;
    }
}
.in-cart {
  background-color: $darkaccent;
}

  </style>