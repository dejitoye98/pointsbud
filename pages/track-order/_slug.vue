<template>
  <div class="track-order-container">
    <div class="order-header">
      <h1>Track Your Order</h1>
      <p class="order-id">Order #{{ session?.pending_sale?.serial_no || order.r_uid }}</p>
      <p class="order-date">Placed on {{ formatDate(session?.createdAt) }}</p>
    </div>

    <div class="order-status-cards">
      <!-- Delivery Status Card -->
      <div class="status-card">
        <div class="status-icon" :class="getDeliveryStatusClass()">
          <i class="fas fa-truck"></i>
        </div>
        <div class="status-info">
          <h3>Delivery Status</h3>
          <p class="status" :class="getDeliveryStatusClass()">{{ delivery_info?.delivery_status }}</p>
        </div>
      </div>

      <!-- Processing Status Card -->
      <div class="status-card">
        <div class="status-icon" :class="getProcessingStatusClass()">
          <i class="fas fa-cog"></i>
        </div>
        <div class="status-info">
          <h3>Processing Status</h3>
          <p class="status" :class="getProcessingStatusClass()">{{ delivery_info?.processing_status || 'pending' }}</p>
          <p class="status-message">{{ getProcessingStatusMessage() }}</p>
        </div>
      </div>
    </div>

    <!-- Purchased Items Section -->
    <div class="purchased-items-section" v-if="session && session.pending_sale">
      <h2>Purchased Items</h2>
      <div class="items-list">
        <div v-if="session?.pending_sale?.orders && session?.pending_sale?.orders?.length > 0" class="items-container">
          <div v-for="(item, index) in session?.pending_sale?.orders" :key="index" class="item-card">
            
            <div class="item-details">
              <h4 class="item-name">{{ item.product?.name }}</h4>
              <div class="item-price-qty">
                <p class="item-price"> {{item.product?.currency || "NGN" | currencySymbol}}{{ item.product.unitprice | money}}</p>
                <p class="item-qty">x{{ item.quantity }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-items">
          <p>No items found for this order.</p>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="order-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>{{}}</span>
        </div>
        <div class="summary-row" v-if="session.pending_sale.shipping_fee">
          <span>Shipping:</span>
          <span>{{ formatPrice(session.pending_sale.shipping_fee) }}</span>
        </div>
        <div class="summary-row" v-if="session.pending_sale.tax">
          <span>Tax:</span>
          <span>{{ session.pending_sale.taxes || 0 | money }}</span>
        </div>
        <div class="summary-row" v-if="session.pending_sale.discount">
          <span>Discount:</span>
          <span>-{{ session?.pending_sale?.discount || 0 | money}}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>{{"NGN" | currencySymbol}}{{ grandTotal }}</span>
        </div>
      </div>
    </div>

    <!-- Checkout Events Timeline -->
    <div class="timeline-section">
      <h2>Order Timeline</h2>
      <div class="timeline">
        <div v-for="(event, index) in session?.checkout_events" :key="index" class="timeline-item">
          <div class="timeline-marker" :class="{ 'completed': true }"></div>
          <div class="timeline-content">
            <h4>{{ event.action }}</h4>
            <p class="timeline-date">{{ formatDate(event.createdAt) }}</p>
            <p v-if="event.description" class="timeline-description">{{ event.description }}</p>
          </div>
          <div class="timeline-connector" v-if="index < session.checkout_events.length - 1"></div>
        </div>
      </div>
    </div>

    <!-- Refund Button Section -->
    <div class="refund-section" v-if="can_process_refund || delivery_info?.acceptance_status === 'rejected'">
      <button class="refund-button" @click="processRefund">Cancel & Process Refund</button>
      <p class="refund-note">It's been more than 15 minutes since you placed the other </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      can_process_refund: false,
      session: null,
      delivery_info: null,
      order: {
        id: "ORD-7829341",
        date: "March 8, 2025",
        deliveryStatus: "In Transit",
        processingStatus: "Processed",
        timeline: [
          { 
            status: "Order Placed", 
            date: "March 5, 2025, 10:23 AM", 
            description: "Your order has been received",
            completed: true 
          },
          { 
            status: "Payment Confirmed", 
            date: "March 5, 2025, 10:25 AM", 
            description: "Payment has been processed successfully",
            completed: true 
          },
          { 
            status: "Order Processed", 
            date: "March 6, 2025, 9:30 AM", 
            description: "Your order has been prepared for shipping",
            completed: true 
          },
          { 
            status: "Shipped", 
            date: "March 7, 2025, 2:15 PM", 
            description: "Your order has left our warehouse",
            completed: true 
          },
          { 
            status: "In Transit", 
            date: "March 8, 2025, 8:45 AM", 
            description: "Your order is on its way to you",
            completed: true, 
            current: true 
          },
          { 
            status: "Delivered", 
            date: "Expected March 10, 2025", 
            description: "Pending delivery to your address",
            completed: false 
          }
        ]
      }
    }
  },
  created() {
    this.getSession();
  },

  computed: {
    grandTotal() {
      if (this.session?.pending_sale?.orders) {
        let sum = 0;
        for (let order of this.session?.pending_sale?.orders) {
          if (order.total) {
            sum += order.total
          }
        }
        return sum
      }
      return 0
    },
    deliveryMeta() {
      if (this.session?.pending_sale) {
        try{
          
        }catch(e) {

        }
      }
    }
  },
  methods: {
    formatDate(string) {
      return moment(string).format("DD MMM, YYYY hh:mm A").toString()
    },
    formatPrice(amount) {
      if (amount === undefined || amount === null) return '$0.00';
      return '$' + parseFloat(amount).toFixed(2);
    },
    getSession() {
      this.$api.get('/checkout-session/track?url=' + this.$route.params.slug ).then(resp=> {
        this.session = resp.data.data.session;
        this.delivery_info = resp.data.data.delivery_info;
        this.can_process_refund = resp.data.data.can_process_refund;
      }).catch(error => {
        console.error('Error fetching order data:', error);
      });
    },
    getDeliveryStatusClass() {
      const status = this.delivery_info?.delivery_status?.toLowerCase()
      if (status === 'delivered') return 'status-success';
      if (status === 'in transit') return 'status-progress';
      if (status === 'delayed') return 'status-warning';
      if (status === 'pending') return 'status-warning';
      if (status === '') return 'status-warning';
      if (status === 'failed') return 'status-error';
      return '';
    },
    getProcessingStatusClass() {
      const status = this.order.processingStatus.toLowerCase();
      if (status === 'processed') return 'status-success';
      if (status === 'processing') return 'status-progress';
      if (status === 'pending') return 'status-warning';
      if (status === 'failed') return 'status-error';
      return '';
    },
    getDeliveryStatusMessage() {
      const status = this.order.deliveryStatus.toLowerCase();
      if (status === 'delivered') return 'Your order has been delivered successfully.';
      if (status === 'in transit') return 'Your order is on its way to your address.';
      if (status === 'delayed') return 'Your delivery is experiencing a slight delay.';
      if (status === 'failed') return 'There was an issue with your delivery. Please contact support.';
      return '';
    },
    getProcessingStatusMessage() {
      const status = this.delivery_info?.processing_status?.toLowerCase();
      if (status === 'processed') return 'Your order has been processed successfully.';
      if (status === 'done') return 'Your order has been processed successfully.';
      if (status === 'processing') return 'We are currently processing your order.';
      if (status === 'preparing') return 'We are currently processing your order.';
      if (status === 'pending') return 'Your order is pending processing.';
      if (status === 'failed') return 'There was an issue processing your order. Please contact support.';
      return '';
    },
    processRefund() {
      // In a real application, this would trigger a refund process
      alert('Refund request submitted. Our team will review your request within 24 hours.');
      // You could also navigate to a refund form or open a modal
    }
  }
}
</script>

<style scoped>
.track-order-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.order-header {
  text-align: center;
  margin-bottom: 2rem;
}

.order-header h1 {
  color: #36454F; /* $charcoal */
  margin-bottom: 0.5rem;
}

.order-id {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.order-date {
  color: #686868; /* $faint */
}

.order-status-cards {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3rem;
}

.status-card {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #E0E0E0; /* $border-grey */
  background-color: #fbfeff; /* $something */
}

.status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f1f5f86e;
  font-size: 1.5rem;
}

.status-icon.status-success {
  background-color: #5ac091; /* $secondaryaccent */
  color: white;
}

.status-icon.status-progress {
  background-color: #f79939; /* $secondary */
  color: white;
}

.status-icon.status-warning {
  background-color: #f798398b; /* $secondarylight */
  color: white;
}

.status-icon.status-error {
  background-color: #E53945; /* $primary */
  color: white;
}

.status-info {
  flex: 1;
}

.status-info h3 {
  margin-bottom: 0.5rem;
  color: #36454F; /* $charcoal */
}

.status {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}

.status.status-success {
  color: #5ac091; /* $secondaryaccent */
}

.status.status-progress {
  color: #f79939; /* $secondary */
}

.status.status-warning {
  color: #f798398b; /* $secondarylight */
}

.status.status-error {
  color: #E53945; /* $primary */
}

.status-message {
  color: #686868; /* $faint */
  font-size: 0.9rem;
}

/* Purchased Items Section */
.purchased-items-section {
  margin-bottom: 3rem;
  border: 1px solid #E0E0E0; /* $border-grey */
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #fbfeff; /* $something */
}

.purchased-items-section h2 {
  margin-bottom: 1.5rem;
  color: #36454F; /* $charcoal */
}

.items-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-card {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #E0E0E0; /* $border-grey */
}

.item-card:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
  background-color: #f3f3f3; /* $input_background */
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #36454F; /* $charcoal */
}

.item-variant {
  font-size: 0.9rem;
  color: #686868; /* $faint */
  margin-bottom: 0.5rem;
}

.item-price-qty {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-weight: 600;
  color: #36454F; /* $charcoal */
}

.item-qty {
  color: #686868; /* $faint */
  font-size: 0.9rem;
}

.no-items {
  text-align: center;
  padding: 2rem;
  color: #686868; /* $faint */
  font-style: italic;
}

/* Order Summary Styles */
.order-summary {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #E0E0E0; /* $border-grey */
}

.order-summary h3 {
  margin-bottom: 1rem;
  color: #36454F; /* $charcoal */
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #686868; /* $faint */
}

.summary-row.total {
  font-weight: 700;
  font-size: 1.1rem;
  color: #36454F; /* $charcoal */
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed #E0E0E0; /* $border-grey */
}

.timeline-section {
  margin-bottom: 3rem;
}

.timeline-section h2 {
  margin-bottom: 1.5rem;
  color: #36454F; /* $charcoal */
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #f3f3f3; /* $input_background */
  border: 2px solid #E0E0E0; /* $border-grey */
  z-index: 2;
}

.timeline-marker.completed {
  background-color: #5ac091; /* $secondaryaccent */
  border-color: #5ac091; /* $secondaryaccent */
}

.timeline-marker.current {
  background-color: #f79939; /* $secondary */
  border-color: #f79939; /* $secondary */
  box-shadow: 0 0 0 4px rgba(247, 153, 57, 0.2); /* $secondary with opacity */
}

.timeline-connector {
  position: absolute;
  left: -1.4rem;
  top: 20px;
  width: 2px;
  height: calc(100% - 20px);
  background-color: #E0E0E0; /* $border-grey */
  z-index: 1;
}

.timeline-content {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #f1f5f86e; /* $dashboard-background-color with slight opacity */
}

.timeline-content h4 {
  margin-bottom: 0.3rem;
  color: #36454F; /* $charcoal */
}

.timeline-date {
  color: #686868; /* $faint */
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.timeline-description {
  font-size: 0.9rem;
}

.refund-section {
  text-align: center;
}

.refund-button {
  padding: 0.8rem 2rem;
  background-color: #E53945; /* $primary */
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.refund-button:hover {
  background-color: #A02730; /* $deepprimary */
}

.refund-note {
  margin-top: 0.8rem;
  color: #686868; /* $faint */
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .order-status-cards {
    flex-direction: column;
  }
  
  .timeline-content {
    padding: 0.5rem;
  }
  
  .item-image {
    width: 60px;
    height: 60px;
  }
}
</style>