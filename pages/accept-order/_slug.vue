<template>
    <div class="accept">
      <div class="accept_container" v-if="pending_sale">
        <!-- Processing time modal -->
        <BaseModal v-if="showModal && !pending_sale?.order_delivery_meta?.acceptance_status">
            <template #header> 
                <div class="processing-time-modal__header">
                  <h2>Estimate Processing Time</h2>
                </div>
            </template>

            <template #body>
                <div class="processing-time-modal__body">
                    <p>How long will it take to process this order?</p>
                    
                    <div class="time-options">
                      <button 
                        v-for="time in processingTimeOptions" 
                        :key="time"
                        :class="['time-option', selectedTime === time ? 'selected' : '']"
                        @click="selectTime(time)"
                      >
                        {{ time }} minutes
                      </button>
                    </div>
                    
                    <div class="custom-time" v-if="showCustomTimeInput">
                      <label for="custom-time">Custom time (minutes):</label>
                      <input 
                        type="number" 
                        id="custom-time" 
                        v-model="customTime" 
                        min="1" 
                        max="180"
                        placeholder="Enter minutes"
                      >
                    </div>
                  </div>
                  <div class="processing-time-modal__footer">
                    <button class="cancel-btn" @click="closeModal">Cancel</button>
                    <button 
                      class="confirm-btn" 
                      @click="confirmProcessingTime"
                      :disabled="!isTimeSelected"
                    >
                      Confirm
                    </button>
                  </div>
            </template>
        </BaseModal>
        
        <!-- Status modal for already accepted/rejected order -->
        <BaseModal v-else-if="showModal && pending_sale?.order_delivery_meta?.acceptance_status">
            <template #header> 
                <div class="processing-time-modal__header">
                  <h2>Order Status</h2>
                </div>
            </template>

            <template #body>
                <div class="processing-time-modal__body">
                    <div class="status-message" :class="pending_sale?.order_delivery_meta?.acceptance_status === 'accepted' ? 'status-accepted' : 'status-rejected'">
                        <div class="status-icon">
                            <svg v-if="pending_sale?.order_delivery_meta?.acceptance_status === 'accepted'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        </div>
                        <h3>{{ pending_sale.order_delivery_meta?.acceptance_status === 'accepted' ? 'Order Accepted' : 'Order Rejected' }}</h3>
                        <p>{{ pending_sale.order_delivery_meta?.acceptance_status === 'accepted' ? 'This order has already been accepted and is being processed.' : 'This order has been rejected and cannot be processed.' }}</p>
                    </div>
                </div>
                <div class="processing-time-modal__footer">
                    <button class="confirm-btn" @click="closeModal">Close</button>
                </div>
            </template>
        </BaseModal>
        
        <!-- Login Modal -->
        <LoginModal 
          :show="showLoginModal" 
          :pending_sale_id="pending_sale?.id" 
          :processing_time="processingTime"
          @close="showLoginModal = false"
          @login-success="handleLoginSuccess"
          @order-accepted="handleOrderAccepted"
        />
            
        <!-- Order details can go here -->
        <div v-if="pending_sale" class="order-details">
          <h1>Order Details</h1>
          <!-- Display order details here -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LoginModal from '../../components/modals/AcceptOrderAuthModal.vue';
  
  export default {
    components: {
      LoginModal
    },
    async fetch() {
      await this.getCheckoutSession();
    },
    data() {
      return {
        session: null,
        pending_sale: {},
        showModal: false,
        showLoginModal: false,
        processingTimeOptions: [15, 30, 45, 60, 90, 'Custom'],
        selectedTime: null,
        customTime: null,
        showCustomTimeInput: false,
        processingTime: null
      };
    },
    computed: {
      isTimeSelected() {
        return this.selectedTime === 'Custom' ? !!this.customTime : !!this.selectedTime;
      }
    },
    watch: {
      // Show modal as soon as session data is available
      session(newVal) {
        if (newVal) {
          this.showModal = true;
        }
      }
    },
    methods: {
      async getCheckoutSession() {
        try {
          const response = await this.$api.get('/checkout-session/' + this.$route.params.slug);
          this.session = response.data.data.session;
          this.pending_sale = response.data.data.pending_sale;
          
          // Show modal if session data exists
          if (this.pending_sale) {
            this.showModal = true;
          }
        } catch (error) {
          console.error('Error fetching checkout session:', error);
        }
      },
      selectTime(time) {
        this.selectedTime = time;
        this.showCustomTimeInput = time === 'Custom';
        if (time !== 'Custom') {
          this.processingTime = time;
        }
      },
      confirmProcessingTime() {
        // Set the final processing time value
        const finalTime = this.selectedTime === 'Custom' ? this.customTime : this.selectedTime;
        this.processingTime = finalTime;
        
        // Here you would typically send this to your API
        this.updateOrderProcessingTime(finalTime);
      },
      async updateOrderProcessingTime(time) {
        try {
          let response =  await this.$adminapi.post('/sales/final-orders/accept', {
            pending_sale_id: this.pending_sale.id,
            processing_time: time
          })

          // Show success notification and close modal
          //if (response.data.data)
          this.$toast.success('Order Accepted and Processing time set successfully');
          this.closeModal();
          
          // Refresh data to show updated status
          //this.getCheckoutSession();
          
        } catch (error) {
          console.error('Error updating processing time:', error);

          //alert(JSON.stringify(error))

          // Check if the error is due to authentication
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Show login modal
            this.showLoginModal = true;
            this.showModal = false;
          } else {
            this.$toast.error('Failed to set processing time', error?.data?.data);
          }
        }
      },
      closeModal() {
        this.showModal = false;
      },
      handleLoginSuccess() {
        // User has successfully logged in
        console.log('Login successful');
      },
      handleOrderAccepted() {
        // Order has been accepted after login
        console.log('Order accepted after login');
        this.$toast.success('Order Accepted and Processing time set successfully');
        // Refresh data to show updated status
        this.getCheckoutSession();
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  // Variables
  $primary: #E53945;
  $secondary: #f79939;
  $border-grey: #E0E0E0;
  $charcoal: #36454F;
  $light-grey: #f5f5f5;
  $success-green: #2ecc71;
  
  // Modal overlay
  .processing-time-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    
    &__content {
      background-color: white;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
      overflow: hidden;
    }
    
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid $border-grey;
      
      h2 {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
        color: $charcoal;
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        color: $charcoal;
        cursor: pointer;
        padding: 0;
        line-height: 1;
      }
    }
    
    &__body {
      padding: 20px;
      
      p {
        margin-top: 0;
        margin-bottom: 20px;
        font-size: 16px;
        color: $charcoal;
      }
    }
    
    &__footer {
      padding: 16px 20px;
      border-top: 1px solid $border-grey;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  }
  
  // Time selection options
  .time-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .time-option {
    padding: 12px;
    border: 2px solid $border-grey;
    border-radius: 8px;
    background-color: white;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: $primary;
    }
    
    &.selected {
      background-color: $primary;
      color: white;
      border-color: $primary;
    }
  }
  
  // Custom time input
  .custom-time {
    margin-top: 16px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      color: $charcoal;
    }
    
    input {
      width: 100%;
      padding: 12px;
      border: 1px solid $border-grey;
      border-radius: 8px;
      font-size: 16px;
      
      &:focus {
        outline: none;
        border-color: $primary;
      }
    }
  }
  
  // Buttons
  .cancel-btn, .confirm-btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .cancel-btn {
    background-color: $light-grey;
    border: 1px solid $border-grey;
    color: $charcoal;
    
    &:hover {
      background-color: darken($light-grey, 5%);
    }
  }
  
  .confirm-btn {
    background-color: $primary;
    border: none;
    color: white;
    
    &:hover {
      background-color: darken($primary, 10%);
    }
    
    &:disabled {
      background-color: lighten($primary, 20%);
      cursor: not-allowed;
    }
  }
  
  // Status message styling
  .status-message {
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    
    .status-icon {
      margin-bottom: 16px;
      
      svg {
        margin: 0 auto;
        display: block;
      }
    }
    
    h3 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    p {
      font-size: 16px;
      margin-bottom: 0;
    }
    
    &.status-accepted {
      background-color: rgba($success-green, 0.1);
      color: $success-green;
      
      .status-icon {
        color: $success-green;
      }
    }
    
    &.status-rejected {
      background-color: rgba($primary, 0.1);
      color: $primary;
      
      .status-icon {
        color: $primary;
      }
    }
  }
  
  // Responsive adjustments
  @media (max-width: 576px) {
    .time-options {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .processing-time-modal__footer {
      flex-direction: column;
      
      button {
        width: 100%;
      }
      
      .cancel-btn {
        order: 2;
      }
      
      .confirm-btn {
        order: 1;
        margin-bottom: 10px;
      }
    }
  }
  </style>