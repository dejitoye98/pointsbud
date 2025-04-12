<!-- components/BottomMenuBar.vue -->
<template>
    <transition name="slide-up">
      <div v-if="isVisible" class="bottom-menu-bar">
        <div class="container">
          <div class="menu-content">
            <div class="avatar-section">
              <div class="avatar">
                <img src="/api/placeholder/48/48" alt="AI Assistant" class="avatar-image">
              </div>
              <span class="menu-message">{{ message }}</span>
            </div>
            <div class="action-buttons">
              <button class="dismiss-btn" @click="dismiss">Dismiss</button>
              <button class="view-btn" @click="view">View</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'BottomMenuBar',
    props: {
      message: {
        type: String,
        default: '3 personalized picks for you'
      }
    },
    created() {
        alert('bottom')
    },
    data() {
      return {
        isVisible: true
      };
    },
    methods: {
      view() {
        // Emit an event that parent components can listen for
        this.$emit('view');
      },
      dismiss() {
        // Animate out
        this.isVisible = false;
        
        // Emit a dismiss event after animation
        setTimeout(() => {
          this.$emit('dismiss');
        }, 300); // Match with CSS transition duration
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  // Variables based on existing styling
  $primary: #E53945;
  $deep-primary: #A02730;
  $charcoal: #36454F;
  $border-grey: #E0E0E0;
  $faint: #686868;
  
  .bottom-menu-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 12px 0;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .menu-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .avatar-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid $primary;
  }
  
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .menu-message {
    font-size: 15px;
    font-weight: 500;
    color: $charcoal;
  }
  
  .action-buttons {
    display: flex;
    gap: 12px;
  }
  
  .view-btn {
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: $deep-primary;
    }
  }
  
  .dismiss-btn {
    background: none;
    border: 1px solid $border-grey;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 500;
    color: $faint;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      border-color: $charcoal;
      color: $charcoal;
    }
  }
  
  // Animation
  .slide-up-enter-active, 
  .slide-up-leave-active {
    transition: all 0.3s ease;
  }
  
  .slide-up-enter-from, 
  .slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
  
  // Responsive adjustments
  @media (max-width: 576px) {
    .menu-content {
      flex-direction: column;
      gap: 12px;
    }
    
    .avatar-section,
    .action-buttons {
      width: 100%;
    }
    
    .action-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  </style>