
<template>
  <div class="delivery-selector" @click="openModeModal">
    <div class="delivery-selector__content">
      <div class="delivery-selector__icon">
        <svg v-if="currentMode === 'delivery'" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5 9L18 3H6L4.5 9M19.5 9H4.5M19.5 9L21 15H3L4.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 18C7 19.1046 6.10457 20 5 20C3.89543 20 3 19.1046 3 18" stroke="currentColor" stroke-width="1.5"/>
          <path d="M21 18C21 19.1046 20.1046 20 19 20C17.8954 20 17 19.1046 17 18" stroke="currentColor" stroke-width="1.5"/>
          <path d="M7 15V18" stroke="currentColor" stroke-width="1.5"/>
          <path d="M17 15V18" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <svg v-else-if="currentMode === 'pickup'" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 6.22876 7.58172 3 12 3C16.4183 3 20 6.22876 20 10Z" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <svg v-else-if="currentMode === 'instore'" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7H21M3 7V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V7M3 7L5 3H19L21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 12C13.1046 12 14 11.1046 14 10M8 20V7M16 20V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="delivery-selector__info">
        <div class="delivery-selector__label">{{ modeLabel }}</div>
        <div class="delivery-selector__address">{{ modeAddress }}</div>
      </div>
      <div class="delivery-selector__chevron">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    business: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currentMode: this.$route.query.mode || 'delivery'
    }
  },
  computed: {
    modeLabel() {
      const labels = {
        'delivery': 'Delivery',
        'pickup': 'Pickup',
        'instore': 'In-store'
      };
      return labels[this.currentMode] || 'Delivery';
    },
    modeAddress() {
      if (this.currentMode === 'delivery') {
        return 'To your location';
      } else if (this.currentMode === 'pickup' || this.currentMode === 'instore') {
        return this.business?.address || 'Store location';
      }
      return 'Select location';
    }
  },
  methods: {
    openModeModal() {
      this.$emit('openModal');
    }
  },
  watch: {
    '$route.query.mode': {
      handler(newMode) {
        if (newMode) {
          this.currentMode = newMode;
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.delivery-selector {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  max-width: 220px;
  
  &:hover {
    border-color: $primary;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
  
  &__content {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }
  
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: rgba($primary, 0.1);
    border-radius: 50%;
    color: $primary;
    flex-shrink: 0;
  }
  
  &__info {
    flex: 1;
    min-width: 0;
  }
  
  &__label {
    font-weight: 600;
    font-size: 13px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &__address {
    font-size: 11px;
    color: #686868;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: -1px;
  }
  
  &__chevron {
    color: #686868;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  
  &:hover &__chevron {
    transform: translateY(2px);
    color: $primary;
  }
  
  // Badge indicator
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    right: -3px;
    width: 8px;
    height: 8px;
    background-color: $primary;
    border-radius: 50%;
    border: 2px solid #FFFFFF;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}

// Responsiveness adjustments
@media (max-width: 768px) {
  .delivery-selector {
    max-width: 160px;
    
    &__address {
      display: none;
    }
  }
}
</style>