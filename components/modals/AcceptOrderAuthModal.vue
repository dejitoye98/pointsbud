<template>
    <BaseModal v-if="show">
      <template #header>
        <div class="login-modal__header">
          <h2>Admin Login Required</h2>
        </div>
      </template>
  
      <template #body>
        <div class="login-modal__body">
          <p>Please login to accept this order</p>
          
          <div class="form">
            <div class="form-input">
              <label for="email">Email</label>
              <input v-model="payload.email" type="text" id="email" />
            </div>
            <div class="form-input">
              <label for="password">Password</label>
              <input v-model="payload.password" type="password" id="password" />
            </div>
            
            <div class="login-modal__footer">
              <button class="cancel-btn" @click="$emit('close')">Cancel</button>
              <button 
                class="confirm-btn" 
                @click="login"
                :disabled="loading"
              >
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      pending_sale_id: {
        type: [String, Number],
        default: null
      },
      processing_time: {
        type: [String, Number],
        default: null
      }
    },
    data() {
      return {
        token: "",
        loading: false,
        payload: {
          email: "",
          password: ""
        }
      };
    },
    methods: {
      login() {
        this.loading = true;
        this.$api
          .post("/auth/admin/login", this.payload)
          .then(resp => {
            // Save token and permissions
            this.token = resp.data.data.token;
            this.$cookies.set("admin-token", resp.data.data.token);
            window.localStorage.setItem('permissions', resp.data.data.permissions);
            window.localStorage.setItem('adminRole', resp.data.data.role);
            window.localStorage.setItem('userDetails', JSON.stringify(resp.data.data.user));
            window.localStorage.setItem('businessDetails', JSON.stringify(resp.data.data.user?.business));
            
            // Emit success event
            this.$emit('login-success');
            
            // Try to accept the order again
            if (this.pending_sale_id && this.processing_time) {
              this.acceptOrder();
            }
          })
          .catch(error => {
            console.error('Login error:', error);
            this.$toast.error('Login failed. Please check your credentials.');
          })
          .finally(() => {
            this.loading = false;
          });
      },
      
      acceptOrder() {
        const payload = {
            pending_sale_id: this.pending_sale_id,
            processing_time: this.processing_time
        };

        const config = {
            headers: {
            Authorization: `Bearer ${this.token}`
            }
        };

        this.$adminapi.post('/sales/final-orders/accept', payload, config)
            .then(() => {
            this.$toast.success('Order accepted and processing time set successfully');
            this.$emit('order-accepted');
            this.$emit('close');
            })
            .catch(error => {
            console.error('Error accepting order:', error);
            const message = error?.response?.data?.message || 'Failed to accept order';
            this.$toast.error(message);
            });
        }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  // Variables (matching your existing style)
  $primary: #E53945;
  $secondary: #f79939;
  $border-grey: #E0E0E0;
  $charcoal: #36454F;
  $light-grey: #f5f5f5;
  $success-green: #2ecc71;
  $faint: #686868;
  $dashboard-background-color: #f9f9f9;
  
  // Login modal styling
  .login-modal {
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
        text-align: left;
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
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  }
  
  // Form styling
  .form {
    width: 100%;
    
    .form-input {
      margin-bottom: 16px;
      
      label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: $charcoal;
      }
      
      input {
        width: 100%;
        padding: 12px;
        border: 1px solid $border-grey;
        border-radius: 8px;
        font-size: 16px;
        background-color: $light-grey;
        
        &:focus {
          outline: none;
          border-color: $primary;
        }
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
  
  // Media query for mobile
  @media (max-width: 576px) {
    .login-modal__footer {
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