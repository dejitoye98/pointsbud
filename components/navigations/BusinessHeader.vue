<template>
    <div class="business-header-wrapper">
      <div class="business-header">
        <div class="business-brand">
          <div class="business-logo" v-if="business && business.logo">
            <img :src="business.logo" :alt="business.name + ' logo'" />
          </div>
          <div class="business-name">
            <h1>{{ business.name }}</h1>
            <div class="business-tagline" v-if="business.tagline">
              {{ business.tagline }}
            </div>
          </div>
        </div>
        
        <div class="business-actions">
          <button 
            v-if="showBookmarkButton" 
            @click="$emit('bookmark')" 
            class="action-button bookmark-button"
            :style="{'background-color': styling?.primary_color || '#E53945', 'color': styling?.text_on_primary || 'white'}"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.25 3H6.75A2.25 2.25 0 004.5 5.25v15.12a.75.75 0 001.123.654l6.377-3.586 6.377 3.586a.75.75 0 001.123-.654V5.25A2.25 2.25 0 0017.25 3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Save</span>
          </button>
          
          <div v-if="showInfo" class="info-button" @click="$emit('show-info')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M12 8v8M12 7v.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <div v-if="showShare" class="share-button" @click="$emit('share')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
              <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2"/>
              <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
              <path d="M15.5 6.5l-7 4M15.5 17.5l-7-4" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="business-stats" v-if="showStats">
        <div class="stat-item">
          <span class="stat-value">{{ formatRating(business.rating || 0) }}</span>
          <div class="rating-stars">
            <div class="stars-container">
              <div class="stars-filled" :style="{width: `${(business.rating || 0) * 20}%`}"></div>
            </div>
          </div>
          <span class="stat-label">{{ business.reviews_count || 0 }} reviews</span>
        </div>
        
        <div class="stat-divider"></div>
        
        <div class="stat-item">
          <span class="stat-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="stat-label">{{ formatOrderCount(business.order_count || 0) }}</span>
        </div>
        
        <div class="stat-divider"></div>
        
        <div class="stat-item">
          <span class="stat-icon delivery-time">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="stat-label">{{ business.delivery_time || '30-45 min' }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      business: {
        type: Object,
        required: true
      },
      styling: {
        type: Object,
        default: () => ({})
      },
      showBookmarkButton: {
        type: Boolean,
        default: true
      },
      showStats: {
        type: Boolean,
        default: true
      },
      showInfo: {
        type: Boolean,
        default: true
      },
      showShare: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      formatRating(rating) {
        return Number(rating).toFixed(1);
      },
      formatOrderCount(count) {
        if (count > 1000) {
          return `${(count / 1000).toFixed(1)}k orders`;
        }
        return `${count} orders`;
      }
    }
  }
  </script>
  
  <style scoped>
  .business-header-wrapper {
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-radius: 0 0 16px 16px;
    overflow: hidden;
    margin-bottom: 16px;
  }
  
  .business-header {
    padding: 20px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .business-brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  
  .business-logo {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    background-color: #f8f8f8;
    flex-shrink: 0;
  }
  
  .business-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .business-name h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #222;
    font-family: 'Poppins', sans-serif;
    line-height: 1.2;
  }
  
  .business-tagline {
    font-size: 13px;
    color: #666;
    margin-top: 2px;
    font-weight: 400;
  }
  
  .business-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .action-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .action-button svg {
    flex-shrink: 0;
  }
  
  .info-button, .share-button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #555;
    transition: all 0.2s ease;
  }
  
  .info-button:hover, .share-button:hover {
    background-color: #eee;
    transform: scale(1.05);
  }
  
  .business-stats {
    padding: 12px 16px;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #f0f0f0;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .stat-value {
    font-weight: 600;
    font-size: 15px;
    color: #222;
  }
  
  .stat-label {
    font-size: 13px;
    color: #666;
  }
  
  .stat-icon {
    color: #555;
    display: flex;
    align-items: center;
  }
  
  .stat-divider {
    height: 20px;
    width: 1px;
    background-color: #e0e0e0;
    margin: 0 16px;
  }
  
  .rating-stars {
    margin-right: 4px;
  }
  
  .stars-container {
    position: relative;
    width: 70px;
    height: 14px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='%23E0E0E0' stroke='none'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E");
    background-size: 14px 14px;
    background-repeat: repeat-x;
  }
  
  .stars-filled {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='%23FFB800' stroke='none'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E");
    background-size: 14px 14px;
    background-repeat: repeat-x;
  }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    .business-header {
      padding: 16px 12px;
    }
    
    .business-name h1 {
      font-size: 18px;
    }
    
    .business-logo {
      width: 45px;
      height: 45px;
    }
    
    .business-stats {
      padding: 10px 12px;
    }
    
    .stat-divider {
      margin: 0 10px;
    }
    
    .action-button span {
      display: none;
    }
    
    .action-button {
      padding: 8px;
    }
  }
  
  @media (min-width: 768px) {
    .business-header {
      padding: 24px;
    }
    
    .business-stats {
      padding: 14px 24px;
    }
    
    .business-logo {
      width: 60px;
      height: 60px;
    }
    
    .business-name h1 {
      font-size: 22px;
    }
  }
  </style>