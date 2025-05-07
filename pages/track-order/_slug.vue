<template>
  <div class="track-order-container">
    <!-- Order Summary Card -->
    <div class="order-summary-card">
      <div class="header-section">
        <div class="customer-info">
          <h1>Hi {{ customerName || 'there' }}!</h1>
          <p class="order-id">Order #{{ session?.checkout_url }}</p>
        </div>
        <div class="status-badge" :class="getStatusClass()">
          <template v-if="delivery_info?.delivery_status === 'delivering'">

            <span>🔵 On the Way</span>
          </template>

          <template v-else-if="delivery_info?.processing_status === 'processing' || delivery_info?.processing_status === 'preparing'">
              <span>⚪ Processing</span>
          </template>

          <template v-else>
              <span v-if="session?.pending_sale?.status === 'pending'">🟡 Pending</span>
              <span v-else-if="session?.pending_sale?.status === 'paid'">🟢 Paid</span>
          </template>
        </div>
      </div>
      
      <div class="delivery-info" v-if="delivery_info && false">
        <div class="delivery-icon"><i class="fas fa-box"></i></div>
        <div class="delivery-details">
          <p class="delivery-estimate" v-if="delivery_info.d">📦 Arriving in {{ delivery_info.n }}</p>
          <p class="countdown-timer">{{ countdownDisplay }}</p>
        </div>
      </div>
    </div>
    
    <!-- Progress Tracker -->
    <div class="progress-section">
      <h2>Order Progress</h2>
      <div class="progress-tracker">
        <div 
          v-for="(step, index) in order.timeline" 
          :key="index"
          class="progress-step"
        >
          <div class="step-indicator" :class="{
            'completed': step.completed,
            'active': step.active,
            'pending': !step.completed && !step.active
          }">
            <span v-if="step.completed">✓</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="step-label" :class="{
            'completed': step.completed,
            'active': step.active,
            'pending': !step.completed && !step.active
          }">
            <p>{{ step.status }}</p>
            <span class="step-time">{{ step.time }}</span>
          </div>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-track"></div>
        <div class="progress-bar-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
    </div>
    
    <!-- Live Map -->
    <div class="map-section" v-if="delivery_info && delivery_info.id">
      <h2>Delivery Tracking</h2>
      <div class="map-container">
        <!-- Map would be inserted here -->
        <div class="map-placeholder">
          <div class="map-icon"><i class="fas fa-map-marker-alt"></i></div>
          <p>Live tracking map</p>
        </div>
      </div>
      <button class="contact-button" @click="contactRider">
        <i class="fas fa-phone"></i> Contact Rider
      </button>
    </div>
    
    <!-- Items Ordered -->
    <div class="items-section">
      <h2>Order Details</h2>
      <div class="items-list">
        <div v-for="(item, index) in session?.pending_sale?.orders" :key="index" class="item-card">
          <div class="item-icon">🍽️</div>
          <div class="item-details">
            <p class="item-name">{{ item.quantity }} × {{ item.product?.name }}</p>
          </div>
          <div class="item-price">₦{{ formatPrice(item.product?.unitprice * item.quantity) }}</div>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="order-totals">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>₦{{ formatPrice(subtotal) }}</span>
        </div>
        <div class="summary-row" v-if="false">
          <span>Delivery Fee</span>
          <span>₦{{ formatPrice(session?.pending_sale.delivery_fee) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>₦{{ formatPrice(order.total) }}</span>
        </div>
        <div class="payment-info">
          <div class="payment-row">
            <span>Payment Method</span>
            <span v-if="session.pending_sale?.status === 'paid'">✅ Paid</span>
          </div>
          <div class="payment-row">
            <span>Order Type</span>
            <span>{{ session.pending_sale?.space }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Refresh/Notify Section -->
    <div class="actions-section">
      <button class="action-button refresh" @click="refreshStatus">
        <i class="fas fa-sync-alt"></i> Refresh Status
      </button>
      <button class="action-button whatsapp" @click="getWhatsAppUpdates">
        <i class="fab fa-whatsapp"></i> Get WhatsApp Updates
      </button>
    </div>
    
    <!-- Support Section -->
    <div class="support-section">
      <h2>Need Help?</h2>
      <div class="support-options">
        <button class="support-button" @click="chatWithBusiness">
          <i class="fas fa-comment"></i>
          <span>Chat with Business</span>
          <i class="fas fa-chevron-right"></i>
        </button>
        <button class="support-button" @click="requestRefund" v-if="false">
          <i class="fas fa-credit-card"></i>
          <span>Request Refund</span>
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
    
    <!-- AI Suggestions -->
    <div class="suggestions-section" v-if="false">
      <h2>You might also like</h2>
      <div class="suggestions-grid">
        <div v-for="(item, index) in suggestions" :key="index" class="suggestion-card" @click="addToCart(item)">
          <div class="suggestion-image">
            {{ item.emoji }}
          </div>
          <div class="suggestion-details">
            <p class="suggestion-name">{{ item.name }}</p>
            <p class="suggestion-price">₦{{ formatPrice(item.price) }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Receipt Button -->
    <div class="receipt-section">
      <button class="receipt-button" @click="downloadReceipt">
        <i class="fas fa-download"></i> Download Receipt
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      customerName: '',
      session: {},
      delivery_info: {},
      countdownDisplay: '14:59',
      order: {
        serialNo: '324SDF',
        status: 'on-the-way',
        estimatedDelivery: '15-20 mins',
        createdAt: new Date(),
        paymentMethod: 'Wallet',
        total: 2500,
        deliveryFee: 0,
        orderType: 'Delivery',
        customerPhone: '+2348012345678',
        items: [
          { id: 1, name: 'Afang Soup', price: 2000, quantity: 1 },
          { id: 2, name: 'Water', price: 250, quantity: 2 }
        ],
        timeline: [
          
        ],
        riderLocation: { lat: 6.4551, lng: 3.3751 } // Sample Lagos coordinates
      },
      suggestions: [
        { id: 1, name: 'Grilled Chicken', price: 3500, emoji: '🍗' },
        { id: 2, name: 'Jollof Rice', price: 1800, emoji: '🍚' }
      ],
      countdownTimer: null
    };
  },
  
  computed: {
    subtotal() {
      return this.session?.pending_sale?.orders.reduce((sum, item) => sum + (item.product?.unitprice * item.quantity), 0) || 0;
    },
    progressPercentage() {
      const total = this.order.timeline.length;
      const completed = this.order.timeline.filter(step => step.completed).length;
      const active = this.order.timeline.filter(step => step.active).length;
      
      return ((completed + (active * 0.5)) / total) * 100;
    }
  },
  
  created() {
    this.getSession()
  },
  mounted() {
    this.startCountdown();
    // In a real implementation, you would fetch the order data here
    // this.fetchOrderData();
  },
  
  beforeDestroy() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },
  
  methods: {
    getMinutesFromNow(time) {
      // calculates how many minutes away
      return moment().diff(time, 'minutes');
    },
    getSession() {
      this.$api.get('/checkout-session/track?url=' + this.$route.params.slug ).then(resp=> {
        this.session = resp.data.data.session;
        this.delivery_info = resp.data.data.delivery_info;
        this.can_process_refund = resp.data.data.can_process_refund;

        if (this.session.checkout_events?.length) {
            for (let event of this.session.checkout_events) {

              this.order.timeline.push({
                status: event.action,
                completed: true,
                time: moment(event.createdAt).format("hh:mm A").toString()
              })
            }
        }
      }).catch(error => {
        console.error('Error fetching order data:', error);
      });
    },
    startCountdown() {
      // Example countdown timer
      let minutes = 14;
      let seconds = 59;
      
      this.countdownTimer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.countdownTimer);
            return;
          }
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }
        
        this.countdownDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }, 1000);
    },
    
    formatPrice(price) {
      return price.toLocaleString();
    },
    
    formatDate(date) {
      return moment(date).format('MMMM D, YYYY, h:mm A');
    },
    
    getStatusClass() {
      const status = this.order.status;
      if (status === 'preparing') return 'status-preparing';
      if (status === 'on-the-way') return 'status-on-way';
      if (status === 'delivered') return 'status-delivered';
      return 'status-pending';
    },
    
    refreshStatus() {
      // In a real implementation, you would call your API here
      alert('Refreshing order status...');
    },
    
    getWhatsAppUpdates() {
      // In a real implementation, you would redirect to WhatsApp or send a message
      const phoneNumber = '2348012345678';
      const message = encodeURIComponent(`I'd like to receive updates for Order #${this.order.serialNo}`);
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    },
    
    contactRider() {
      // In a real implementation, you would handle rider contact
      alert(`Calling rider at ${this.order.riderPhone || '+2348012345678'}`);
    },
    
    chatWithBusiness() {
      // Redirect to WhatsApp chat with the business
      const businessPhone = '2348012345678';
      window.open(`https://wa.me/${businessPhone}`, '_blank');
    },
    
    requestRefund() {
      // In a real implementation, you would redirect to refund form or modal
      alert('Initiating refund request...');
    },
    
    downloadReceipt() {
      // In a real implementation, you would download or display a receipt
      alert('Downloading receipt...');
    },
    
    addToCart(item) {
      // In a real implementation, you would add the item to cart
      alert(`Added ${item.name} to cart`);
    },
    
    fetchOrderData() {
      // In a real implementation, you would call your API here
      // this.$api.get(`/orders/${this.$route.params.id}`)
      //   .then(response => {
      //     this.order = response.data;
      //   })
      //   .catch(error => {
      //     console.error('Error fetching order:', error);
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
// Variables
$primary-color: #E53945;
$success-color: $primary;
$warning-color: #fbbc05;
$info-color: #f79939;
$error-color: #ea4335;
$text-dark: #202124;
$text-medium: #5f6368;
$text-light: #9aa0a6;
$border-color: #dadce0;
$background-light: #f8f9fa;
$card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
$border-radius: 12px;
$spacing-unit: 8px;

// Mixins
@mixin card {
  background-color: white;
  border-radius: $border-radius;
  box-shadow: $card-shadow;
  padding: $spacing-unit * 3;
  margin-bottom: $spacing-unit * 3;
}

@mixin button {
  padding: $spacing-unit * 1.5 $spacing-unit * 3;
  border-radius: $border-radius / 2;
  font-weight: 600;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  i {
    margin-right: $spacing-unit;
  }
}

// Global Styles
.track-order-container {
  max-width: 600px;
  margin: 0 auto;
  padding: $spacing-unit * 2;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: $text-dark;
}

h1, h2, h3, h4 {
  margin: 0;
  font-weight: 600;
}

h1 {
  font-size: 1.75rem;
}

h2 {
  font-size: 1.3rem;
  margin-bottom: $spacing-unit * 2;
  color: $text-dark;
}

// Order Summary Card
.order-summary-card {
  @include card;
  
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: $spacing-unit * 2;
    
    h1 {
      margin-bottom: $spacing-unit / 2;
    }
    
    .order-id {
      color: $text-medium;
      margin: 0;
    }
  }
  
  .status-badge {
    padding: $spacing-unit $spacing-unit * 2;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
    
    &.status-preparing {
      background-color: rgba($warning-color, 0.15);
      color: darken($warning-color, 25%);
    }
    
    &.status-on-way {
      background-color: rgba($info-color, 0.15);
      color: darken($info-color, 25%);
    }
    
    &.status-delivered {
      background-color: rgba($success-color, 0.15);
      color: darken($success-color, 15%);
    }
    
    &.status-pending {
      background-color: rgba($text-light, 0.15);
      color: $text-medium;
    }
  }
  
  .delivery-info {
    display: flex;
    align-items: center;
    background-color: rgba($info-color, 0.1);
    padding: $spacing-unit * 2;
    border-radius: $border-radius;
    
    .delivery-icon {
      margin-right: $spacing-unit * 2;
      font-size: 1.5rem;
      color: $info-color;
    }
    
    .delivery-details {
      .delivery-estimate {
        font-weight: 600;
        margin: 0 0 $spacing-unit / 2 0;
        color: darken($info-color, 20%);
      }
      
      .countdown-timer {
        margin: 0;
        font-size: 0.9rem;
        color: $text-medium;
      }
    }
  }
}

// Progress Tracker
.progress-section {
  @include card;
  
  .progress-tracker {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacing-unit * 2;
    
    .progress-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      
      .step-indicator {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: $spacing-unit;
        font-weight: 600;
        font-size: 0.9rem;
        
        &.completed {
          background-color: $success-color;
          color: white;
        }
        
        &.active {
          background-color: rgba($info-color, 0.15);
          color: $info-color;
          border: 2px solid $info-color;
        }
        
        &.pending {
          background-color: rgba($text-light, 0.15);
          color: $text-light;
          border: 2px solid $border-color;
        }
      }
      
      .step-label {
        text-align: center;
        
        p {
          margin: 0;
          font-size: 0.75rem;
          font-weight: 600;
          
          &.completed {
            color: $success-color;
          }
          
          &.active {
            color: $info-color;
          }
          
          &.pending {
            color: $text-light;
          }
        }
        
        .step-time {
          font-size: 0.7rem;
          color: $text-light;
          display: block;
          margin-top: $spacing-unit / 2;
        }
      }
    }
  }
  
  .progress-bar {
    position: relative;
    height: 6px;
    background-color: $background-light;
    border-radius: 3px;
    overflow: hidden;
    
    .progress-bar-track {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: $border-color;
    }
    
    .progress-bar-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: $success-color;
      transition: width 0.5s ease;
    }
  }
}

// Map Section
.map-section {
  @include card;
  
  .map-container {
    height: 180px;
    background-color: $background-light;
    border-radius: $border-radius;
    margin-bottom: $spacing-unit * 2;
    overflow: hidden;
    position: relative;
    
    .map-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: $text-medium;
      
      .map-icon {
        font-size: 2rem;
        margin-bottom: $spacing-unit;
        color: $info-color;
      }
    }
  }
  
  .contact-button {
    @include button;
    background-color: $success-color;
    color: white;
    width: 100%;
    
    &:hover {
      background-color: darken($success-color, 5%);
    }
  }
}

// Items Section
.items-section {
  @include card;
  
  .items-list {
    margin-bottom: $spacing-unit * 3;
    
    .item-card {
      display: flex;
      align-items: center;
      padding: $spacing-unit * 1.5 0;
      border-bottom: 1px solid $border-color;
      
      &:last-child {
        border-bottom: none;
      }
      
      .item-icon {
        width: 36px;
        height: 36px;
        background-color: $background-light;
        border-radius: $border-radius / 2;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: $spacing-unit * 2;
        font-size: 1.2rem;
      }
      
      .item-details {
        flex: 1;
        
        .item-name {
          margin: 0;
          font-weight: 500;
        }
      }
      
      .item-price {
        font-weight: 600;
      }
    }
  }
  
  .order-totals {
    background-color: $background-light;
    padding: $spacing-unit * 2;
    border-radius: $border-radius;
    
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: $spacing-unit;
      color: $text-medium;
      font-size: 0.95rem;
      
      &.total {
        margin-top: $spacing-unit * 1.5;
        padding-top: $spacing-unit * 1.5;
        border-top: 1px solid $border-color;
        font-weight: 700;
        font-size: 1.1rem;
        color: $text-dark;
      }
    }
    
    .payment-info {
      margin-top: $spacing-unit * 2;
      padding-top: $spacing-unit * 2;
      border-top: 1px solid $border-color;
      
      .payment-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: $spacing-unit;
        font-size: 0.9rem;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        span:first-child {
          color: $text-medium;
        }
        
        span:last-child {
          font-weight: 500;
        }
      }
    }
  }
}

// Actions Section
.actions-section {
  @include card;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-unit * 2;
  
  .action-button {
    @include button;
    
    &.refresh {
      background-color: $background-light;
      color: $text-dark;
      
      &:hover {
        background-color: darken($background-light, 5%);
      }
    }
    
    &.whatsapp {
      background-color: rgba($success-color, 0.15);
      color: darken($success-color, 10%);
      
      &:hover {
        background-color: rgba($success-color, 0.25);
      }
    }
  }
}

// Support Section
.support-section {
  @include card;
  
  .support-options {
    display: flex;
    flex-direction: column;
    gap: $spacing-unit * 1.5;
    
    .support-button {
      @include button;
      background-color: white;
      color: $text-dark;
      border: 1px solid $border-color;
      justify-content: flex-start;
      padding: $spacing-unit * 2;
      
      &:hover {
        background-color: $background-light;
      }
      
      i:first-child {
        font-size: 1.1rem;
        margin-right: $spacing-unit * 1.5;
        
        &.fa-comment {
          color: $success-color;
        }
        
        &.fa-credit-card {
          color: $error-color;
        }
      }
      
      span {
        flex: 1;
        text-align: left;
      }
      
      i:last-child {
        margin-left: auto;
        margin-right: 0;
        color: $text-light;
      }
    }
  }
}

// Suggestions Section
.suggestions-section {
  @include card;
  
  .suggestions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-unit * 2;
    
    .suggestion-card {
      background-color: $background-light;
      border-radius: $border-radius;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s ease;
      
      &:hover {
        transform: translateY(-2px);
      }
      
      .suggestion-image {
        height: 80px;
        background-color: #e8f0fe;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
      }
      
      .suggestion-details {
        padding: $spacing-unit * 1.5;
        
        .suggestion-name {
          margin: 0 0 $spacing-unit / 2 0;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .suggestion-price {
          margin: 0;
          color: $text-medium;
          font-size: 0.85rem;
        }
      }
    }
  }
}

// Receipt Section
.receipt-section {
  @include card;
  
  .receipt-button {
    @include button;
    background-color: $primary-color;
    color: white;
    width: 100%;
    
    &:hover {
      background-color: darken($primary-color, 5%);
    }
  }
}

// Responsive Adjustments
@media (max-width: 480px) {
  .track-order-container {
    padding: $spacing-unit;
  }
  
  .progress-section {
    .progress-tracker {
      .progress-step {
        .step-label {
          p {
            font-size: 0.7rem;
          }
          
          .step-time {
            font-size: 0.65rem;
          }
        }
      }
    }
  }
  
  .actions-section {
    grid-template-columns: 1fr;
  }
}
</style>