<template>
    <BaseModal @close="$emit('close')">
      <template #header>
        <div class="auth-header">
          <h2 class="auth-title">{{ mode === 'login' ? 'Welcome back' : 'Bookmark ' + business?.name }}</h2>
          <p class="auth-subtitle">{{ mode === 'login' ? 'Sign in to continue' : 'Join us today' }}</p>
        </div>
      </template>
      <template #body>
        <div class="auth-body">
          <!-- Social Login Options -->
          <div class="social-login">
            <button class="social-btn google-btn" @click="handleGoogleAuth">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" class="google-icon">
              Continue with Google
            </button>
          </div>
          
          <div class="divider">
            <span>or continue with</span>
          </div>
          
          <!-- Login Form -->
          <template v-if="mode === 'login'">
            <div class="form-group">
              <label class="form-label">Your Phone</label>
              <vue-tel-input v-model="payload.phone" class="phone-input"></vue-tel-input>
            </div>
            
            <div class="form-group">
              <label class="form-label">6-digit PIN</label>
              <div class="password-field">
                <input 
                  :type="showPin ? 'text' : 'password'" 
                  @keydown="filterInput" 
                  v-model="payload.pin" 
                  inputmode="numeric"
                  maxlength="6"
                  placeholder="Enter your 6-digit PIN"
                  class="form-input pin-input"
                >
                <button class="toggle-visibility" @click="showPin = !showPin">
                  <svg v-if="showPin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>
            
            <button 
              class="primary-btn" 
              :disabled="loading || !payload.phone || !payload.pin" 
              @click="login"
            >
              <span v-if="!loading">Sign In</span>
              <span v-else class="loader"></span>
            </button>
            
            <div class="auth-footer">
              <p>Don't have an account? <button class="text-btn" @click="mode = 'register'">Register</button></p>
            </div>
          </template>
          
          <!-- Register Form -->
          <template v-else>
            <div class="form-group">
              <label class="form-label">Your Name</label>
              <input 
                v-model="payload.name" 
                class="form-input" 
                placeholder="Enter your full name"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Your WhatsApp Phone</label>
              <vue-tel-input v-model="payload.phone" class="phone-input"></vue-tel-input>
            </div>
            
            <div class="form-group">
              <label class="form-label">Email</label>
              <input 
                v-model="payload.email" 
                class="form-input" 
                placeholder="Enter your email address"
                type="email"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">PIN</label>
              <div class="password-field">
                <input 
                  :type="showPin ? 'text' : 'password'" 
                  @keydown="filterInput" 
                  v-model="payload.pin" 
                  inputmode="numeric"
                  maxlength="6"
                  placeholder="Create a 6-digit PIN"
                  class="form-input pin-input"
                >
                <button class="toggle-visibility" @click="showPin = !showPin">
                  <svg v-if="showPin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Gender</label>
              <div class="gender-options">
                <label class="gender-option" :class="{ 'active': payload.gender === 'Male' }">
                  <input type="radio" v-model="payload.gender" value="Male" class="gender-radio">
                  <span class="gender-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="10" r="3"></circle>
                      <path d="M12 2v3M12 19v3M19 10h3M2 10h3M12 13v6M17.6 15.5l-2.1-2.1M6.4 15.5l2.1-2.1"></path>
                    </svg>
                  </span>
                  <span>Male</span>
                </label>
                <label class="gender-option" :class="{ 'active': payload.gender === 'Female' }">
                  <input type="radio" v-model="payload.gender" value="Female" class="gender-radio">
                  <span class="gender-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="8" r="5"></circle>
                      <path d="M12 13v8M9 16h6"></path>
                    </svg>
                  </span>
                  <span>Female</span>
                </label>
              </div>
            </div>
            
            <button class="primary-btn" @click="register" :disabled="loading">
              <span v-if="!loading">Create Account</span>
              <span v-else class="loader"></span>
            </button>
            
            <div class="auth-footer">
              <p>Already have an account? <button class="text-btn" @click="mode = 'login'">Sign In</button></p>
            </div>
          </template>
        </div>
      </template>
    </BaseModal>
  </template>
  
  <script>
  export default {
    props: ['business'],
    data() {
      return {
        payload: {
          gender: 'Male'
        },
        mode: 'login',
        success: false,
        loading: false,
        showPin: false
      }
    },
    methods:{ 
      filterInput(event) {
        if (event.target.value.length >= 6) {
          if (event.keyCode === 8 || event.keyCode === 46) {
            return;
          } else {
            event.preventDefault();
          }
        }
        // Allow only numbers
        if (!/^[0-9]$/.test(event.key) && 
            event.keyCode !== 8 && 
            event.keyCode !== 46 && 
            event.keyCode !== 37 && 
            event.keyCode !== 39) {
          event.preventDefault();
        }
      },
      
      handleGoogleAuth() {
        this.loading = true;
        // Initialize Google Auth API
        // This is a placeholder - you'll need to implement Google OAuth
        this.$emit('onGoogleAuth');
        
        // Mock implementation for demo purposes
        setTimeout(() => {
          this.loading = false;
          // Successful login would trigger similar actions to the regular login
          // this.$cookies.set('usertoken', token)
          // this.$emit('onSuccess', userData)
          // window.location.reload()
        }, 1500);
      },
      
      login() {
        this.loading = true;
        this.$api.post('/customers/login', this.payload)
          .then(resp => {
            this.success = true;
            this.$cookies.set('usertoken', resp.data.data.token);
            this.$emit('onSuccess', resp.data.data);
            window.location.reload();
          })
          .catch(e => {
            this.$toast.error(e?.response?.data?.data || 'Login failed');
          })
          .finally(() => {
            this.loading = false;
          });
      },
      
      register() {
        this.loading = true;
        this.$api.post('/customers/register', this.payload)
          .then(resp => {
            this.success = true;
            this.$cookies.set('usertoken', resp.data.data.token);
            this.$emit('onSuccess', resp.data.data);
            window.location.reload();
          })
          .catch(e => {
            this.$toast.error(e?.response?.data?.data || 'Registration failed');
          })
          .finally(() => {
            this.loading = false;
          });
      },
    }
  }
  </script>
  
  <style lang="scss" scoped>
  // Variables
  $primary-color: #E53945;
  $primary-dark: darken($primary-color, 10%);
  $primary-light: lighten($primary-color, 35%);
  $input-bg: #F3F2F7;
  $text-color: #36454F;
  $border-color: #E0E0E0;
  $white: #FFFFFF;
  $shadow: rgba(0, 0, 0, 0.08);
  $error: #FB5A65;
  $success: #00BA88;
  
  // Mixins
  @mixin flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  // Global styling
  * {
    box-sizing: border-box;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  // Auth modal styling
  .auth-header {
    padding: 24px 24px 0;
    text-align: center;
    
    .auth-title {
      font-size: 24px;
      font-weight: 700;
      color: $text-color;
      margin: 0 0 8px;
    }
    
    .auth-subtitle {
      font-size: 16px;
      color: lighten($text-color, 20%);
      margin: 0;
    }
  }
  
  .auth-body {
    padding: 24px;
  }
  
  // Social login buttons
  .social-login {
    margin-bottom: 24px;
    
    .social-btn {
      @include flex-center;
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid $border-color;
      background-color: $white;
      font-size: 15px;
      font-weight: 500;
      color: $text-color;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: darken($white, 3%);
        border-color: darken($border-color, 5%);
      }
      
      .google-icon {
        width: 18px;
        height: 18px;
        margin-right: 12px;
      }
    }
  }
  
  // Divider
  .divider {
    position: relative;
    text-align: center;
    margin: 20px 0;
    
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: $border-color;
      z-index: 1;
    }
    
    span {
      position: relative;
      z-index: 2;
      background-color: $white;
      padding: 0 12px;
      font-size: 14px;
      color: lighten($text-color, 30%);
    }
  }
  
  // Form styling
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: $text-color;
  }
  
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: none;
    background-color: $input-bg;
    font-size: 15px;
    color: $text-color;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.2);
    }
    
    &::placeholder {
      color: lighten($text-color, 40%);
    }
  }
  
  // Phone input styling
  .phone-input {
    &:deep(.vue-tel-input) {
      border: none !important;
      background-color: $input-bg;
      border-radius: 8px;
      padding: 2px 0;
      
      &:focus-within {
        box-shadow: 0 0 0 2px rgba($primary-color, 0.2);
      }
      
      .vti__input {
        background: transparent;
        font-size: 15px;
        color: $text-color;
        
        &::placeholder {
          color: lighten($text-color, 40%);
        }
      }
    }
  }
  
  // Password field with toggle
  .password-field {
    position: relative;
    
    .toggle-visibility {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: lighten($text-color, 30%);
      cursor: pointer;
      padding: 0;
      
      &:hover {
        color: $text-color;
      }
    }
    
    .pin-input {
      padding-right: 40px;
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
  
  // Gender selection
  .gender-options {
    display: flex;
    gap: 12px;
    
    .gender-option {
      flex: 1;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid $border-color;
      background-color: $white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &.active {
        border-color: $primary-color;
        background-color: $primary-light;
        
        .gender-icon {
          color: $primary-color;
        }
      }
      
      .gender-radio {
        position: absolute;
        opacity: 0;
      }
      
      .gender-icon {
        display: flex;
        color: lighten($text-color, 20%);
      }
      
      span {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
  
  // Primary button
  .primary-btn {
    width: 100%;
    padding: 14px;
    border-radius: 8px;
    border: none;
    background-color: $primary-color;
    color: $white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    @include flex-center;
    
    &:hover:not(:disabled) {
      background-color: $primary-dark;
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .loader {
      width: 20px;
      height: 20px;
      border: 2px solid $white;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  }
  
  // Text button
  .text-btn {
    background: none;
    border: none;
    color: $primary-color;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    font-size: inherit;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  // Auth footer
  .auth-footer {
    margin-top: 24px;
    text-align: center;
    
    p {
      font-size: 14px;
      color: $text-color;
      margin: 0;
    }
  }
  
  // Media queries for responsiveness
  @media (max-width: 480px) {
    .auth-header {
      padding: 16px 16px 0;
      
      .auth-title {
        font-size: 20px;
      }
      
      .auth-subtitle {
        font-size: 14px;
      }
    }
    
    .auth-body {
      padding: 16px;
    }
    
    .form-input, .gender-option {
      padding: 10px 12px;
    }
    
    .primary-btn {
      padding: 12px;
    }
  }
  </style>