<template>
    <BaseModal @close="$emit('close')">
      <template #header>
        <div class="modal-header">
          <div class="modal-title-container">
            <h3 class="modal-title">How would you like to receive your order?</h3>
            <p class="modal-subtitle">Choose the option that works best for you</p>
          </div>
        </div>
      </template>
  
      <template #body>
        <div class="modal-body">
          <div class="options-container">
            <div 
              class="option-card" 
              :class="{ 'selected': selectedOption === 'delivery' }"
              @click="selectOption('delivery')"
            >
              <div class="option-icon delivery-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 9L18 3H6L4.5 9M19.5 9H4.5M19.5 9L21 15H3L4.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 18C7 19.1046 6.10457 20 5 20C3.89543 20 3 19.1046 3 18" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M21 18C21 19.1046 20.1046 20 19 20C17.8954 20 17 19.1046 17 18" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M7 15V18" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M17 15V18" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M9 6V3M9 12V9M9 9H15M9 9L12 12M15 9V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="option-content">
                <h4 class="option-title">Delivery</h4>
                <p class="option-description">We'll bring it to your doorstep</p>
              </div>
            </div>
  
            <div 
              class="option-card" 
              :class="{ 'selected': selectedOption === 'pickup' }"
              @click="selectOption('pickup')"
            >
              <div class="option-icon pickup-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 6.22876 7.58172 3 12 3C16.4183 3 20 6.22876 20 10Z" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
                </svg>
              </div>
              <h4 class="option-title">Pickup</h4>
              <p class="option-description">Ready for pickup at your convenience</p>
            </div>
  
            <div 
              class="option-card" 
              :class="{ 'selected': selectedOption === 'instore' }"
              @click="selectOption('instore')"
            >
              <div class="option-icon instore-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7H21M3 7V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V7M3 7L5 3H19L21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 12C13.1046 12 14 11.1046 14 10M8 20V7M16 20V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h4 class="option-title">In-store</h4>
              <p class="option-description">You're currently in the restaurant and want to make payment</p>
            </div>
          </div>
  
          <div class="action-buttons">
            <button class="continue-button" :disabled="!selectedOption" @click="continueOrder">
              Continue
            </button>
          </div>
        </div>
      </template>
    </BaseModal>
  </template>
  
  <script>
  export default {
    props: ['business', 'locations'],
    data() {
      return {
        selectedOption: null,
        locations: [], 
      }
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
      },
      continueOrder() {
        if (this.selectedOption) {
          //this.$emit('selected', this.selectedOption);
          //this.$emit('close');
          this.$router.push({
          query: { 
            ...this.$route.query, 
            mode: this.selectedOption 
          }

          
          // locations
        });
        this.$emit('onChoose', this.selectedOption.toLowerCase())
        this.$emit('close')
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  /* Ensure modal container content is on top */
  * {
    &:deep(.modal__body),
    &:deep(.modal__container) {
      z-index: 15;
    }
  }
  
  /* Modal Header */
  .modal-header {
    padding: 24px 24px 0;
    
    .modal-title-container {
      text-align: center;
    }
    
    .modal-title {
      font-family: 'Poppins', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px;
    }
    
    .modal-subtitle {
      font-size: 14px;
      color: #686868;
      margin: 0;
    }
  }
  
  /* Modal Body */
  .modal-body {
    padding: 24px;
  }
  
  .options-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }
  
  .option-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 16px;
    border-radius: 12px;
    border: 1px solid #E0E0E0;
    background-color: white;
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border-color: #E53945;
    }
    
    &.selected {
      border-color: #E53945;
      background-color: rgba(229, 57, 69, 0.04);
      box-shadow: 0 4px 12px rgba(229, 57, 69, 0.1);
      
      .option-icon {
        color: #E53945;
        background-color: rgba(229, 57, 69, 0.1);
      }
      
      .option-title {
        color: #E53945;
      }
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 24px 24px 0;
        border-color: transparent #E53945 transparent transparent;
      }
    }
  }
  
  .option-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    background-color: #F3F3F3;
    border-radius: 50%;
    margin-bottom: 16px;
    transition: all 0.2s ease;
    color: #36454F;
  }
  
  .option-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px;
    color: #333;
    transition: color 0.2s ease;
  }
  
  .option-description {
    font-size: 14px;
    color: #686868;
    text-align: center;
    margin: 0;
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
  }
  
  .continue-button {
    background-color: #E53945;
    color: white;
    font-size: 16px;
    font-weight: 600;
    padding: 14px 32px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 180px;
    box-shadow: 0 4px 12px rgba(229, 57, 69, 0.2);
    
    &:hover:not(:disabled) {
      background-color: #A02730;
      transform: translateY(-2px);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
    
    &:disabled {
      background-color: #E0E0E0;
      color: #999;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
  
  /* Media Queries for Responsiveness */
  @media (max-width: 768px) {
    .options-container {
      grid-template-columns: 1fr;
    }
    
    .option-card {
      padding: 16px;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    .options-container {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .option-description {
      display: none;
    }
  }


  /* Replace your current .options-container, .option-card, and related styles with these */
.options-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.option-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #E0E0E0;
  background-color: white;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    border-color: #E53945;
  }
  
  &.selected {
    border-color: #E53945;
    background-color: rgba(229, 57, 69, 0.04);
    box-shadow: 0 2px 6px rgba(229, 57, 69, 0.1);
    
    .option-icon {
      color: #E53945;
      background-color: rgba(229, 57, 69, 0.1);
    }
    
    .option-title {
      color: #E53945;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 16px 16px 0;
      border-color: transparent #E53945 transparent transparent;
    }
  }
}

.option-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  height: 40px;
  background-color: #F3F3F3;
  border-radius: 50%;
  margin-right: 12px;
  transition: all 0.2s ease;
  color: #36454F;
  
  svg {
    width: 20px;
    height: 20px;
  }
}

.option-content {
  flex: 1;
}

.option-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #333;
  transition: color 0.2s ease;
}

.option-description {
  font-size: 12px;
  color: #686868;
  margin: 0;
}

/* Update the modal header styles */
.modal-header {
  padding: 16px 16px 0;
  
  .modal-title {
    font-size: 18px;
    margin: 0 0 4px;
  }
  
  .modal-subtitle {
    font-size: 13px;
  }
}

/* Update the modal body styles */
.modal-body {
  padding: 16px;
}

/* Update the action button */
.continue-button {
  font-size: 14px;
  padding: 12px 24px;
  min-width: 150px;
  border-radius: 6px;
}
  </style>