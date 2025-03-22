<!-- pages/deals.vue -->
<template>
    <div class="deals-page" v-if="business">
        <NewPreorderCartModal :business="business" :item="focused_deal" v-if="show_order_modal" @close="show_order_modal = false">
        
        </NewPreorderCartModal>
      
     
  
      <section class="deals-section">
        <div class="container">
          <div class="deals-header">
            <h2>Today's Hot Deals</h2>
            <div class="deals-filter" v-if="false">
              <button class="filter-btn active">All Deals</button>
              <button class="filter-btn">Ending Soon</button>
              <button class="filter-btn">Most Popular</button>
            </div>
          </div>
  
          <div class="deals-grid">
            <div v-for="(deal, index) in deals" :class="[isInCart(deal) ? 'in-cart' : '']" :key="index" class="deal-card">
              <div class="deal-image-container">
                <img :src="deal && deal.products && deal.products[0] && deal.products[0].thumbnail || ''" class="deal-image">
                <div class="deal-time-remaining">
                  <div class="deal-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <span>{{ getTimeRemaining(deal) || '-' }}</span>
                </div>
                <div class="discount-badge">-{{ getDiscount(deal) || '-'}}%</div>
              </div>
              
              <div class="deal-content">
                <h3 class="deal-title">{{ deal.name }}</h3>
                <p class="deal-description">{{ deal.description }}</p>
                
                <div class="deal-pricing">
                  <div class="deal-price">
                    <span class="original-price">₦{{ deal.products && deal.products[0] && deal.products[0].cost_price || 0  | money }}</span>
                    <span class="current-price">₦{{ deal.products && deal.products[0] && deal.products[0].unitprice  || 0 | money }}</span>
                  </div>
                  <div class="deal-delivery">
                    <span class="delivery-label">Delivery:</span>
                    <span class="delivery-discount">{{ deal.delivery_fee_discount }}% off</span>
                  </div>
                </div>
                
                <div class="deal-progress-container">
                  <div class="deal-progress-info">
                    <span class="spots-left">{{ (deal.max_order_count  || 0) - (deal.order_count || 0)}} spots left</span>
                    <span class="progress-percentage">{{ Math.round((1 - (deal.max_order_count - deal.order_count ) / deal.max_order_count) * 100) }}% claimed</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: `${Math.round((1 - (deal.max_order_count - deal.order_count )/ deal.max_order_count) * 100)}%` }"></div>
                  </div>
                  <div class="progress-milestones" v-if="false"> 
                    <div class="milestone" v-for="milestone in deal.milestones" :key="milestone.count"
                         :class="{ active: deal.totalSpots - deal.spotsLeft >= milestone.count }"
                         :style="{ left: `${(milestone.count / deal.totalSpots) * 100}%` }">
                      <div class="milestone-tooltip">
                        <span>{{ milestone.count }} people: {{ milestone.benefit }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <template>
                    <button v-if="!isInCart(deal)" class="preorder-btn" @click="openOrderModal(deal)">Preorder Now</button>
                    <button v-else class="preorder-btn" @click="removeFromCart(deal)">Remove From Cart</button>
                    
                </template>
  
              </div>
            </div>
          </div>
  
          
        </div>
      </section>
  
    </div>
  </template>
  
  <script>
  import moment from "moment"
import PreOrderCartModal from "../../components/modals/PreOrderCartModal.vue";
import {mapGetters} from 'vuex';
  export default {
    name: 'DealsPage',
    data() {
        return {
            focused_deal: null,
            show_order_modal: false,
            deals: [
                
            ],
            filter: {
                status: ""
            },
            pagination_data: {},

            business: null,
        };
    },
    created() {
        this.getDeals();
    },
    async fetch() {
        this.$api.get('/businesses?slug=' + this.$route.params.slug).then(resp=>{
            this.business = resp.data.data 
        })
    },  
    computed: {
        ...mapGetters('preorder', ['cart']),
        timeRemaining() {
            // Assuming you have some time value stored elsewhere in your component
            // For example, a Unix timestamp in milliseconds for when something expires
        },
        spotsLeft() {
            if (this.deal) {
                return this.deal.max_order_count - this.deal.order_count;
            }
            return 0;
        },
    },
    methods: {
        removeFromCart(deal) {
            let product = deal.products && deal.products && deal.products[0];

            this.$store.dispatch('preorder/removeFromCart', product.id);
            
        },

        isInCart(deal) {
            let {id} = deal;
            
            let in_cart = this.cart.find(i => i.deal_id === id) ||null;
            return in_cart
        },

        openOrderModal(deal) {
            this.focused_deal = deal
            this.show_order_modal = true
        },

        generateUniqueCode(length = 6) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const codeLength = 4;
            const randomBytes = crypto.randomBytes(length);
            const code = [...randomBytes].map(byte => characters[byte % characters.length]).join('');
            return code;
        },
        
        

        addToCart(deal) {
            let product = deal && deal.products && deal.products[0] || {}
            let item_key = this.generateUniqueCode();
            let r_uid = this.generateUniqueCode();
            let payload = {
                name: product.name,
                unitprice: product.unitprice,
                quantity: 1,
                item_key,
                item_uid: item_key || '',
                category_id: product.id || ''

            }


            // this.$store.dispatch('preorder/addToCart', payload)
        },
        getDiscount(deal) {
            try {
                if (deal && deal.products && deal.products.length) {
                    let cost_price = deal.products && deal.products[0] && deal.products[0].cost_price || 0;
                    let unitprice = deal.products && deal.products[0] && deal.products && deal.products[0].unitprice || 0;
                    return parseFloat((unitprice / cost_price) * 100).toFixed(2);
                }
                return 0;
            }
            catch (e) {
                return 0;
            }
        },
        getTimeRemaining(deal) {
            const endTime = deal?.ordering_ends_at; // Replace with your actual property
            const now = moment();
            const end = moment(endTime);
            // Get the difference in seconds
            const diff = end.diff(now, 'seconds');
            if (diff <= 0) {
                return "Expired";
            }
            else if (diff < 60) {
                return `${diff} seconds`;
            }
            else if (diff < 3600) {
                const minutes = Math.floor(diff / 60);
                return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
            }
            else if (diff < 86400) {
                const hours = Math.floor(diff / 3600);
                return `${hours} hour${hours !== 1 ? 's' : ''}`;
            }
            else {
                const days = Math.floor(diff / 86400);
                return `${days} day${days !== 1 ? 's' : ''}`;
            }
        },
        getDeals() {
            let endpoint = '/deals?slug=' + this.$route.params?.slug;
            this.$api.get(endpoint).then(resp => {
                const { page_info, list } = resp.data.data;
                this.deals = list;
                this.pagination_data = page_info;
            });
        },
    },
    components: { PreOrderCartModal }
};
  </script>
  
  <style lang="scss" scoped>
  // Variables based on original styling with enhancements
  $primary: #E53945;
  $primary-light: #f9d7da;
  $deep-primary: #A02730;
  $secondary: #f79939;
  $secondary-light: #f798398b;
  $light-accent: $primary;
  $dark-accent: #dd6b6b36;
  $border-grey: #E0E0E0;
  $faint: #686868;
  $charcoal: #36454F;
  $input-background: #F3F3F3;
  $success-green: #2ecc71;
  $gold: #FFD700;
  
  // Reset and base styles
  .deals-page {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: $charcoal;
    line-height: 1.6;
    background-color: #f9f9f9;
  }
  
  // Layout


  .in-cart{
    background-color: rgba(218, 165, 32, 0.469) !important; 
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  // Header
  header {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
  }
  
  .logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    .business-logo {
        height: 30px;
        width: 30px;
        border-radius: 50%;
    }
  }
  
  .nav-links {
    display: flex;
    gap: 24px;
    
    a {
      color: $charcoal;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
      
      &:hover {
        color: $primary;
      }
      
      &.active {
        color: $primary;
        font-weight: 600;
      }
    }
  }
  
  // Hero Banner
  .hero-banner {
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url("https://via.placeholder.com/1920x600?text=BFF+Lagos+Food") center/cover no-repeat;
    color: white;
    padding: 80px 0;
    text-align: center;
  }
  
  .hero-content {
    max-width: 700px;
    margin: 0 auto;
    
    h1 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 16px;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }
    
    p {
      font-size: 18px;
      opacity: 0.9;
      margin-bottom: 20px;
    }
  }
  
  // Deals Section
  .deals-section {
    padding: 60px 0;
  }
  
  .deals-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    
    h2 {
      font-size: 28px;
      font-weight: 700;
      color: $charcoal;
    }
  }
  
  .deals-filter {
    display: flex;
    gap: 10px;
    
    .filter-btn {
      background: none;
      border: 1px solid $border-grey;
      border-radius: 20px;
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover, &.active {
        background-color: $primary;
        color: white;
        border-color: $primary;
      }
    }
  }
  
  .deals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
  }
  
  .deal-card {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s, box-shadow 0.3s;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }
  }
  
  .deal-image-container {
    position: relative;
    height: 200px;
    overflow: hidden;

    img {
        object-fit: contain;
    }
  }
  
  .deal-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
    
    .deal-card:hover & {
      transform: scale(1.05);
    }
  }
  
  .deal-time-remaining {
    position: absolute;
    top: 15px;
    left: 15px;
    background-color: rgba(255, 255, 255, 0.9);
    color: $charcoal;
    border-radius: 20px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    
    .deal-icon {
      color: $primary;
    }
  }
  
  .discount-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: $primary;
    color: white;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 16px;
    box-shadow: 0 2px 10px rgba(229, 57, 69, 0.3);
  }
  
  .deal-content {
    padding: 20px;
  }
  
  .deal-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    color: $charcoal;
  }
  
  .deal-description {
    font-size: 14px;
    color: $faint;
    margin-bottom: 20px;
    line-height: 1.5;
  }
  
  .deal-pricing {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .deal-price {
    display: flex;
    flex-direction: column;
  }
  
  .original-price {
    font-size: 14px;
    color: $faint;
    text-decoration: line-through;
  }
  
  .current-price {
    font-size: 22px;
    font-weight: 700;
    color: $primary;
  }
  
  .deal-delivery {
    background-color: #f5f5f5;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 13px;
  }
  
  .delivery-label {
    color: $faint;
    margin-right: 5px;
  }
  
  .delivery-discount {
    font-weight: 600;
    color: $success-green;
  }
  
  .deal-progress-container {
    margin-bottom: 20px;
  }
  
  .deal-progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
  }
  
  .spots-left {
    color: $primary;
    font-weight: 600;
  }
  
  .progress-percentage {
    color: $faint;
  }
  
  .progress-bar {
    height: 8px;
    background-color: #f1f1f1;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 12px;
    position: relative;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, $secondary, $primary);
    border-radius: 4px;
    transition: width 0.3s ease-in-out;
  }
  
  .progress-milestones {
    position: relative;
    height: 20px;
    margin-bottom: 10px;
  }
  
  .milestone {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #f1f1f1;
    border: 2px solid white;
    border-radius: 50%;
    top: 0;
    transform: translateX(-50%);
    transition: all 0.2s;
    
    &.active {
      background-color: $gold;
      box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.3);
    }
    
    &:hover .milestone-tooltip {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .milestone-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(5px);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.2s;
    pointer-events: none;
    margin-bottom: 5px;
    
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -4px;
      border-width: 4px;
      border-style: solid;
      border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
    }
  }
  
  .preorder-btn {
    width: 100%;
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: $deep-primary;
    }
  }
  
  .deals-cta {
    text-align: center;
    background-color: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    
    h3 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    p {
      color: $faint;
      margin-bottom: 20px;
    }
  }
  
  .view-menu-btn {
    display: inline-block;
    background-color: $secondary;
    color: white;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: darken($secondary, 10%);
    }
  }
  
  // How It Works
  .how-it-works {
    background-color: $primary-light;
    padding: 80px 0;
    
    h2 {
      text-align: center;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 50px;
    }
  }
  
  .steps-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }
  
  .step {
    text-align: center;
    
    .step-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background-color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $primary;
      box-shadow: 0 6px 20px rgba(229, 57, 69, 0.15);
    }
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    p {
      color: $faint;
      font-size: 14px;
    }
  }
  
  // Testimonials
  .testimonials {
    padding: 80px 0;
    
    h2 {
      text-align: center;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 50px;
    }
  }
  
  .testimonials-carousel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .testimonial {
    background-color: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  
  .testimonial-content {
    margin-bottom: 20px;
    
    p {
      font-style: italic;
      color: $charcoal;
      line-height: 1.6;
    }
  }
  
  .testimonial-author {
    display: flex;
    align-items: center;
  }
  
  .author-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .author-info {
    h4 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 5px;
    }
  }
  
  .star-rating {
    color: $gold;
    font-size: 14px;
  }
  
  // Responsive Adjustments
  @media (max-width: 768px) {
    .hero-banner {
      padding: 50px 0;
      
      h1 {
        font-size: 28px;
      }
      
      p {
        font-size: 16px;
      }
    }
    
    .deals-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
    
    .deals-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 576px) {
    .header-content {
      flex-direction: column;
      gap: 16px;
    }
    
    .nav-links {
      width: 100%;
      justify-content: space-between;
    }
    
    .deal-pricing {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    
    .testimonials-carousel {
      grid-template-columns: 1fr;
    }
  }
  </style>