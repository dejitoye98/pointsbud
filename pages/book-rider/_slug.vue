<template>
  <div class="rider-booking-container">
    <div class="booking-card" v-if="session && session.id">
      <div class="booking-header">
        <h1>Book a Rider</h1>
        <p class="booking-subtitle">Complete the form below to request delivery</p>
      </div>
      
      <form @submit.prevent="submitBooking" class="booking-form">
        <div class="form-group">
          <label for="order-id">Order ID</label>
          <input 
            disabled
            type="text" 
            id="order-id" 
            v-model="session.checkout_url" 
            placeholder="Order ID will be displayed here" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="pickup">Pickup Location</label>
          <input 
            type="text" 
            id="pickup" 
            v-model="session.business.address" 
            placeholder="Enter business address" 
            required
          >
          <button type="button" class="location-btn" @click="useCurrentLocation('pickup')">
            <i class="fas fa-map-marker-alt"></i> Use current location
          </button>
        </div>
        
        <div class="form-group">
          <label for="destination">Destination</label>
          <input 
            type="text" 
            id="destination" 
            v-model="booking.destination" 
            placeholder="Enter delivery address" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="delivery-fee">Delivery Fee (₦)</label>
          <input 
            type="number" 
            id="delivery-fee" 
            v-model="deliveryFee" 
            placeholder="e.g. 1500" 
            min="0" 
            disabled
            
          >
        </div>
        
        <div class="form-group">
          <label>Vehicle Type</label>
          <div class="vehicle-options">
            <div 
              class="vehicle-option"
              :class="{ 'selected': booking.vehicleType === 'any' }"
              @click="selectVehicle('any')"
            >
              <div class="vehicle-icon">🚗</div>
              <span class="vehicle-label">Any</span>
            </div>
            
            <div 
              class="vehicle-option disabled"
            >
              <div class="vehicle-icon">🚲</div>
              <span class="vehicle-label">Bicycle</span>
              <span class="coming-soon">Coming soon</span>
            </div>
            
            <div 
              class="vehicle-option disabled"
            >
              <div class="vehicle-icon">🏍️</div>
              <span class="vehicle-label">Motorcycle</span>
              <span class="coming-soon">Coming soon</span>
            </div>
          </div>
        </div>
        
        <div class="estimated-time">
          <div class="time-icon">⏱️</div>
          <div class="time-details">
            <span class="time-label">Estimated Delivery Time</span>
            <span class="time-value">25-30 minutes</span>
          </div>
        </div>
        
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Processing...' : 'Book Rider' }}
        </button>
      </form>
      
      <div class="booking-info">
        <p>
          <i class="fas fa-info-circle"></i>
          Your rider will be assigned once booking is confirmed
        </p>
      </div>
    </div>
    
    <!-- Loading state -->
    <div class="loading-container" v-else>
      <div class="loading-spinner"></div>
      <p>Loading order information...</p>
    </div>
    
    <!-- Success modal -->
    <div class="modal-overlay" v-if="showSuccessModal">
      <div class="modal-content">
        <div class="success-icon">✅</div>
        <h2>Rider Booked Successfully!</h2>
        <p>Your delivery request has been confirmed.</p>
        <button @click="closeSuccessModal" class="modal-button">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      showModal: false,
      showSuccessModal: false,
      isSubmitting: false,
      session: {
        business: {

        }
      },
      delivery_info: {},
      booking: {
        pickup: '',
        destination: '',
        deliveryFee: '',
        vehicleType: 'any' // Default to 'any' as it's the only available option
      }
    };
  },
  computed: {
    deliveryFee(){
      let session = this.session;
      let fee = 0;
      let converted_fee = 0;
      if (session) {
        let meta = session.pending_sale?.delivery_meta;
        if (meta) {
          fee = JSON.parse(meta)?.delivery_fee
        }
      }

      if (fee) {
        let  _fee = parseFloat((10/100) * fee).toFixed(2);
        converted_fee = fee - _fee
      }
      return converted_fee
    }
  },
  created() {
    this.getSession();
  },
  watch: {
    // Initialize form with data when session is loaded
    session: {
      handler(newSession) {
        if (newSession?.pending_sale) {
          this.initializeForm();
        }
      },
      immediate: true
    }
  },
  methods: {
    getSession() {
      this.$api.get('/checkout-session/track?url=' + this.$route.params.slug ).then(resp=> {
        this.session = resp.data.data.session;
        this.delivery_info = resp.data.data.delivery_info;
        this.can_process_refund = resp.data.data.can_process_refund;

       
      }).catch(error => {
        console.error('Error fetching order data:', error);
      });
    },
    
    initializeForm() {
      if (!this.session) return;
      
      // Set default values from server data
      this.booking.pickup = this.session.pending_sale?.business?.name || '';
      this.booking.destination = this.delivery_info.destination_address || '';
      this.booking.deliveryFee = this.delivery_info.delivery_fee || '';
    },
    
    selectVehicle(type) {
      // Only allow 'any' for now as specified
      if (type === 'any') {
        this.booking.vehicleType = type;
      }
    },
    
    useCurrentLocation(field) {
      // Show loading state
      const originalValue = this.booking[field];
      this.booking[field] = 'Detecting location...';
      
      // In a real implementation, you would use the Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Success - in a real app you would reverse geocode these coordinates
            this.booking[field] = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
          },
          (error) => {
            // Error handling
            console.error('Geolocation error:', error);
            this.booking[field] = originalValue;
            this.$toast?.error('Failed to detect location');
          }
        );
      } else {
        // Fallback for browsers that don't support geolocation
        this.booking[field] = originalValue;
        this.$toast?.error('Geolocation is not supported by your browser');
      }
    },
    
    async submitBooking() {
      // Validate form
      //if (!this.validateForm()) return;
      
      this.isSubmitting = true;
      
      try {
        // Prepare payload
        const payload = {
          order_space: this.session.pending_sale?.space,
          order_key: this.session.checkout_url,
          pickup_address: this.session.business?.address || "",
          dropoff_address: this.delivery_info.destination_address || "",
          fee: this.deliveryFee
        };
        
        // Make API call
        await this.$adminapi.post('https://pointsbudeliveryservice-d6cd1c3eeaf9.herokuapp.com/api/v1/deliveries/rider-request', payload);
        
        // Show success modal
        this.showSuccessModal = true;
      } catch (error) {
        console.error('Error booking rider:', error);
        this.$toast?.error('Failed to book rider. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },
    
    validateForm() {
      // Basic validation
      if (!this.booking.pickup) {
        this.$toast?.error('Please enter a pickup location');
        return false;
      }
      
      if (!this.booking.destination) {
        this.$toast?.error('Please enter a destination address');
        return false;
      }
      
      if (!this.booking.deliveryFee || this.booking.deliveryFee <= 0) {
        this.$toast?.error('Please enter a valid delivery fee');
        return false;
      }
      
      return true;
    },
    
    closeSuccessModal() {
      this.showSuccessModal = false;
      
      // Redirect to tracking page or home
      this.$router.push({
        name: 'track-order',
        params: { slug: this.$route.params.slug }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// Variables
$primary-color: #E53945;
$secondary-color: #f79939;
$text-dark: #36454F;
$text-medium: #5f6368;
$text-light: #9aa0a6;
$border-color: #dadce0;
$background-light: #f8f9fa;
$border-radius: 12px;
$shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

.rider-booking-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.booking-card {
  background-color: white;
  border-radius: $border-radius;
  box-shadow: $shadow;
  overflow: hidden;
}

.booking-header {
  padding: 24px;
  text-align: center;
  border-bottom: 1px solid $border-color;
  
  h1 {
    margin: 0 0 8px 0;
    color: $text-dark;
    font-size: 24px;
    font-weight: 700;
  }
  
  .booking-subtitle {
    color: $text-medium;
    margin: 0;
    font-size: 16px;
  }
}

.booking-form {
  padding: 24px;
  
  .form-group {
    margin-bottom: 20px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: $text-dark;
      font-size: 15px;
    }
    
    input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid $border-color;
      border-radius: 8px;
      font-size: 16px;
      color: $text-dark;
      transition: border 0.2s;
      
      &:focus {
        outline: none;
        border-color: $primary-color;
      }
      
      &::placeholder {
        color: $text-light;
      }
      
      &:disabled {
        background-color: $background-light;
        cursor: not-allowed;
      }
    }
  }
  
  .location-btn {
    background: none;
    border: none;
    color: $primary-color;
    font-size: 14px;
    cursor: pointer;
    padding: 0;
    margin-top: 8px;
    display: inline-flex;
    align-items: center;
    
    i {
      margin-right: 4px;
    }
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .vehicle-options {
    display: flex;
    gap: 10px;
    
    .vehicle-option {
      flex: 1;
      border: 2px solid $border-color;
      border-radius: 8px;
      padding: 16px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      position: relative;
      transition: all 0.2s;
      
      &:hover:not(.disabled) {
        border-color: rgba($primary-color, 0.5);
      }
      
      &.selected {
        border-color: $primary-color;
        background-color: rgba($primary-color, 0.05);
      }
      
      &.disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .vehicle-icon {
        font-size: 28px;
        margin-bottom: 8px;
      }
      
      .vehicle-label {
        font-weight: 500;
        color: $text-dark;
      }
      
      .coming-soon {
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: $secondary-color;
        color: white;
        font-size: 10px;
        padding: 4px 8px;
        border-radius: 12px;
        font-weight: 600;
      }
    }
  }
  
  .estimated-time {
    display: flex;
    align-items: center;
    background-color: $background-light;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    margin-top: 24px;
    
    .time-icon {
      font-size: 24px;
      margin-right: 16px;
    }
    
    .time-details {
      display: flex;
      flex-direction: column;
      
      .time-label {
        font-size: 14px;
        color: $text-medium;
      }
      
      .time-value {
        font-size: 18px;
        font-weight: 600;
        color: $text-dark;
      }
    }
  }
  
  .submit-btn {
    width: 100%;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover:not(:disabled) {
      background-color: darken($primary-color, 5%);
    }
    
    &:disabled {
      background-color: lighten($primary-color, 20%);
      cursor: not-allowed;
    }
  }
}

.booking-info {
  padding: 16px 24px;
  background-color: $background-light;
  border-top: 1px solid $border-color;
  
  p {
    margin: 0;
    color: $text-medium;
    font-size: 14px;
    display: flex;
    align-items: center;
    
    i {
      margin-right: 8px;
      color: $secondary-color;
    }
  }
}

// Loading state
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  background-color: white;
  border-radius: $border-radius;
  box-shadow: $shadow;
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba($primary-color, 0.2);
    border-top: 4px solid $primary-color;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }
  
  p {
    color: $text-medium;
    font-size: 16px;
    margin: 0;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// Success modal
.modal-overlay {
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
}

.modal-content {
  background-color: white;
  border-radius: $border-radius;
  padding: 32px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  .success-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  h2 {
    color: $text-dark;
    margin: 0 0 16px 0;
    font-size: 22px;
  }
  
  p {
    color: $text-medium;
    margin: 0 0 24px 0;
  }
  
  .modal-button {
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 32px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      background-color: darken($primary-color, 5%);
    }
  }
}

// Responsive adjustments
@media (max-width: 480px) {
  .rider-booking-container {
    padding: 10px;
  }
  
  .booking-form {
    padding: 16px;
    
    .vehicle-options {
      flex-direction: column;
      
      .vehicle-option {
        padding: 12px 10px;
      }
    }
  }
  
  .modal-content {
    padding: 24px 16px;
  }
}
</style>