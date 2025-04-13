<template>
  <BaseModal v-if="item" @close="$emit('close')" class="gourmet-modal">
    <template #header>
      <div class="modal-header">
        <div class="food-image-container" :class="{ 'expanded': isImageExpanded }">
          <div class="image-overlay" v-if="isImageExpanded" @click="toggleImageExpand"></div>
          
          <div class="image-wrapper" :class="{ 'expanded': isImageExpanded }">
            <img 
              :src="thumbnailSrc" 
              alt="Food item" 
              class="food-image"
              @error="handleImageError"
              @click="toggleImageExpand"
            >
          </div>
          
          <!-- Zoom indicator -->
          <div class="zoom-indicator" v-if="!isImageExpanded">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h6v6"></path>
              <path d="M10 14L21 3"></path>
              <path d="M9 21H3v-6"></path>
              <path d="M3 3l6 6"></path>
            </svg>
            <span>Tap to expand</span>
          </div>
          
          <!-- Image Gallery Dots -->
          <div class="image-gallery-dots" v-if="hasMultipleImages">
            <div class="dot active"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
          
          <!-- Back button (always visible) -->
          <button @click="$emit('close')" class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <!-- Close expanded image button -->
          <button v-if="isImageExpanded" @click.stop="toggleImageExpand" class="close-expanded-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
      <div class="modal-body" :class="{ 'hidden': isImageExpanded }">
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
              <button class="quantity-btn increase" :style="addButtonStyles" @click="increase">
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
          
          <button class="action-button" :style="addButtonStyles" @click="addToCart" v-if="!isInCart">
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
  props: ['item', 'styling'],
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
      isImageExpanded: false,
      placeholderImage: "https://pointsbud-images.s3.amazonaws.com/efb3d8a06626aa61b27adf99273b8eb4"
    }
  },
  computed: {
    ...mapGetters('shop', ['cart']),
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
        return this.getPlaceholderImage();
      }
      return this.item.thumbnail;
    }
  },
  mounted() {
    if (this.item) {
      this.mixpanel = mixpanel.init('1f580add8d0558ccae5fc19ca5997dab', { debug: false, track_pageview: false });
      mixpanel.track("Shop Order Model Opened", {
        product:this.item?.name 
      });
      
      // Add escape key listener for closing expanded image view
      document.addEventListener('keydown', this.handleKeyDown);
      
      // Prevent body scrolling when image is expanded
      this.$watch('isImageExpanded', (newVal) => {
        document.body.style.overflow = newVal ? 'hidden' : '';
      });
    }

    if (!this.isInCart) {
      this.quantity = 1; // reset quantity 
    }
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = '';
  },
  methods: {
    generateUniqueCode(length = 6) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomBytes = crypto.randomBytes(length);
        const code = [...randomBytes].map(byte => characters[byte % characters.length]).join('');
        return code;
    },
    toggleImageExpand(event) {
      // Prevent event bubbling
      if (event) {
        event.stopPropagation();
      }
      this.isImageExpanded = !this.isImageExpanded;
      
      // Track expanded image view
      if (this.isImageExpanded) {
        mixpanel.track("Food Image Expanded", {
          product: this.item?.name
        });
      }
    },
    handleKeyDown(e) {
      // Close expanded image view on escape key
      if (e.key === 'Escape' && this.isImageExpanded) {
        this.isImageExpanded = false;
      }
    },
    getPlaceholderImage() {
      // First, try to get a placeholder based on product keywords if available
      if (this.item.tags && this.item.tags.length > 0) {
        const keywordPlaceholder = this.getPlaceholderByKeyword(this.item.tags);
        if (keywordPlaceholder) return keywordPlaceholder;
      }
      
      // Then try by product name keywords
      if (this.item.name) {
        const namePlaceholder = this.getPlaceholderByProductName(this.item.name);
        if (namePlaceholder) return namePlaceholder;
      }
      
      // Then try by category if available
      if (this.item.category) {
        const categoryPlaceholder = this.getPlaceholderByCategory(this.item.category);
        if (categoryPlaceholder) return categoryPlaceholder;
      }
      
      // Fallback to default placeholder
      return this.placeholderImage;
    },
    getPlaceholderByKeyword(tags) {
      const keywordsMap = {
        'burger': 'burger',
        'hamburger': 'burger',
        'cheeseburger': 'burger',
        'sandwich': 'sandwich',
        'salad': 'salad',
        'vegetable': 'salad',
        'vegan': 'salad',
        'pasta': 'spaghetti-bowl',
        'spaghetti': 'spaghetti-bowl',
        'noodle': 'spaghetti-bowl',
        'rice': 'rice-bowl',
        'soup': 'soup-bowl',
        'stew': 'soup-bowl',
        'dessert': 'cake',
        'cake': 'cake',
        'pastry': 'cake',
        'breakfast': 'breakfast',
        'beer': 'beer-mug',
        'wine': 'fancy-glass',
        'cocktail': 'fancy-glass',
        'champagne': 'champagne-flute',
        'juice': 'juice-glass',
        'soda': 'soda-glass',
        'milkshake': 'milkshake-glass',
        'steak': 'protein',
        'meat': 'protein',
        'chicken': 'protein',
        'fish': 'protein',
        'seafood': 'protein',
        'barbecue': 'barbecue-skewer',
        'bbq': 'barbecue-skewer',
        'grill': 'barbecue-skewer',
        'pizza': 'small-plate',
        'appetizer': 'small-plate',
        'starter': 'small-plate',
        'platter': 'small-platter',
        'hookah': 'hookah-pipe',
        'shisha': 'hookah-pipe',
        'condiment': 'condiment-bowl',
        'sauce': 'condiment-bowl',
        'dip': 'condiment-bowl',
        'spirit': 'spirit-shot',
        'shot': 'spirit-shot',
        'vodka': 'spirit-shot',
        'whiskey': 'spirit-shot',
        'gin': 'spirit-shot',
        'tequila': 'spirit-shot',
        'rum': 'spirit-shot',
        'swallow': 'swallow',
        'fufu': 'swallow',
        'amala': 'swallow',
        'eba': 'swallow',
        'dinner': 'dinner-plate'
      };
      
      for (const tag of tags) {
        const lowerTag = tag.toLowerCase();
        for (const [keyword, placeholderKey] of Object.entries(keywordsMap)) {
          if (lowerTag.includes(keyword)) {
            return this.getPlaceholderByKey(placeholderKey);
          }
        }
      }
      
      return null;
    },
    getPlaceholderByProductName(name) {
      const lowerName = name.toLowerCase();
      const keywordsMap = {
        'burger': 'burger',
        'sandwich': 'sandwich',
        'salad': 'salad',
        'pasta': 'spaghetti-bowl',
        'spaghetti': 'spaghetti-bowl',
        'noodle': 'spaghetti-bowl',
        'rice': 'rice-bowl',
        'jollof': 'rice-bowl',
        'fried rice': 'rice-bowl',
        'soup': 'soup-bowl',
        'stew': 'soup-bowl',
        'cake': 'cake',
        'dessert': 'cake',
        'pie': 'cake',
        'breakfast': 'breakfast',
        'beer': 'beer-mug',
        'wine': 'fancy-glass',
        'cocktail': 'fancy-glass',
        'champagne': 'champagne-flute',
        'juice': 'juice-glass',
        'soda': 'soda-glass',
        'coke': 'soda-glass',
        'pepsi': 'soda-glass',
        'sprite': 'soda-glass',
        'fanta': 'soda-glass',
        'milk': 'milkshake-glass',
        'shake': 'milkshake-glass',
        'smoothie': 'milkshake-glass',
        'steak': 'protein',
        'chicken': 'protein',
        'fish': 'protein',
        'meat': 'protein',
        'pork': 'protein',
        'beef': 'protein',
        'lamb': 'protein',
        'bbq': 'barbecue-skewer',
        'barbecue': 'barbecue-skewer',
        'kebab': 'barbecue-skewer',
        'skewer': 'barbecue-skewer',
        'suya': 'barbecue-skewer',
        'pizza': 'small-plate',
        'appetizer': 'small-plate',
        'starter': 'small-plate',
        'platter': 'small-platter',
        'hookah': 'hookah-pipe',
        'shisha': 'hookah-pipe',
        'sauce': 'condiment-bowl',
        'dip': 'condiment-bowl',
        'whiskey': 'spirit-shot',
        'vodka': 'spirit-shot',
        'gin': 'spirit-shot',
        'tequila': 'spirit-shot',
        'rum': 'spirit-shot',
        'shot': 'spirit-shot',
        'amala': 'swallow',
        'eba': 'swallow',
        'fufu': 'swallow',
        'semo': 'swallow',
        'semolina': 'swallow',
        'pounded yam': 'swallow',
        'dinner': 'dinner-plate'
      };
      
      for (const [keyword, placeholderKey] of Object.entries(keywordsMap)) {
        if (lowerName.includes(keyword)) {
          return this.getPlaceholderByKey(placeholderKey);
        }
      }
      
      return null;
    },
    getPlaceholderByCategory(category) {
      if (!category) return null;
      
      // First try by icon if available
      if (category.icon) {
        const iconPlaceholder = this.getPlaceholderByKey(category.icon);
        if (iconPlaceholder) return iconPlaceholder;
      }
      
      // Then try by category name
      if (category.name) {
        return this.getPlaceholderByProductName(category.name);
      }
      
      return null;
    },
    getPlaceholderByKey(key) {
      const placeholderMap = {
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
        "wine-glass": require('@/assets/placeholders/fancy-glass.png')
      };
      
      return placeholderMap[key] || null;
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
    
    &.hidden {
      display: none;
    }
  }
}

// Modal Header with Image
.modal-header {
  position: relative;
}

// Food Image Container
.food-image-container {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  transition: all $transition-slow;
  z-index: 101;
  
  &.expanded {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    
    .image-wrapper {
      width: auto;
      height: auto;
      max-width: 90vw;
      max-height: 90vh;
      border-radius: $radius-lg;
      overflow: hidden;
      box-shadow: $shadow-hard;
      
      .food-image {
        object-fit: contain;
        height: auto;
        max-height: 90vh;
      }
    }
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
    transition: all $transition-slow;
    
    &.expanded {
      width: auto;
      transform: scale(1);
    }
  }
  
  .food-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-base;
    cursor: pointer;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  // Zoom indicator
  .zoom-indicator {
    position: absolute;
    bottom: 15px;
    right: 15px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: $radius-full;
    font-size: 12px;
    z-index: 3;
    pointer-events: none;
    animation: pulse 2s infinite;
    
    svg {
      width: 16px;
      height: 16px;
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
    z-index: 3;
    
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
  
  // Close expanded image button
  .close-expanded-button {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    color: $white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: $transition-fast;
    z-index: 10000;
    
    &:hover {
      background-color: $primary-color;
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
    z-index: 3;
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
  color: black;
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
  background-color: $primary-color;
  color: $white;
  box-shadow: 0 6px 12px rgba($primary-color, 0.4);
  
  &:hover {
    transform: translateY(-2px);
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
  
  &.remove {
    background-color: rgba($danger-color, 0.1);
    color: $danger-color;
    border: 2px solid $danger-color;
    font-weight: 600;
    box-shadow: none;
    
    &:hover {
      background-color: rgba($danger-color, 0.15);
      box-shadow: 0 4px 8px rgba($danger-color, 0.2);
    }
    
    &:active {
      transform: translateY(1px);
      box-shadow: none;
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

@keyframes pulse {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
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
  
  .food-image-container {
    height: 200px;
    
    &.expanded {
      padding: 0;
      
      .image-wrapper {
        border-radius: 0;
        max-width: 100vw;
        max-height: 100vh;
      }
    }
    
    .close-expanded-button {
      top: 15px;
      right: 15px;
    }
  }
  
  .item-name {
    font-size: 20px;
  }
  
  .action-button {
    padding: 14px;
  }
}

// High-resolution display optimizations
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .food-image-container {
    &.expanded {
      .image-wrapper {
        .food-image {
          image-rendering: -webkit-optimize-contrast;
        }
      }
    }
  }
}
</style>