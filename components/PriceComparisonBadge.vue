<template>
    <!-- Add this component in the template section, right after the total section in step 4 -->
<div class="comparison-badge">
    <div class="comparison-badge__header">
        <div class="badge-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8L8 12M8 12L12 16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Save Money with PointsBud</h3>
      </div>
      
      <div class="comparison-content">
        <div class="platform-comparison">
          <div class="platform-col pointsbud">
            <div class="platform-header">
              <img src="https://cdn-icons-png.flaticon.com/512/5977/5977590.png" alt="PointsBud" />
              <h4>PointsBud</h4>
            </div>
            <div class="price-breakdown">
              <div class="price-row">
                <span>Subtotal:</span>
                <span class="value">{{ "NGN" | currencySymbol }}{{ cartTotal | money }}</span>
              </div>
              <div class="price-row highlight">
                <span>Commission:</span>
                <span class="value">5%</span>
              </div>
              <div class="price-row highlight">
                <span>Delivery Fee:</span>
                <span class="value">{{ deliveryFee.currency | currencySymbol }}{{ deliveryFee.price | money }}</span>
              </div>
              <div class="price-row total">
                <span>Total:</span>
                <span class="value">{{ "NGN" | currencySymbol }}{{ grandTotal | money }}</span>
              </div>
            </div>
          </div>
          
          <div class="platform-divider">vs</div>
          
          <div class="platform-col competitors">
            <div class="platform-header">
              <img src="https://cdn-icons-png.flaticon.com/512/731/731985.png" alt="Other Platforms" />
              <h4>Other Platforms</h4>
            </div>
            <div class="price-breakdown">
              <div class="price-row">
                <span>Subtotal:</span>
                <span class="value">{{ "NGN" | currencySymbol }}{{ cartTotal | money }}</span>
              </div>
              <div class="price-row highlight">
                <span>Commission:</span>
                <span class="value">15-30%</span>
              </div>
              <div class="price-row highlight">
                <span>Delivery Fee:</span>
                <span class="value">~{{ "NGN" | currencySymbol }}{{ (deliveryFee.price * 1.5).toFixed(2) }}</span>
              </div>
              <div class="price-row total">
                <span>Est. Total:</span>
                <span class="value">{{ "NGN" | currencySymbol }}{{ competitorEstTotal | money }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="savings-summary">
          <div class="savings-amount">
            <span>You Save:</span>
            <span class="value">{{ "NGN" | currencySymbol }}{{ savingsAmount | money }}</span>
          </div>
          <div class="savings-percent">Up to {{ savingsPercent }}% cheaper than other delivery platforms</div>
        </div>
      </div>
  </div>
</template>
  <!-- Add this to your existing <script> section -->

  
  <script>

  export default {

      data() {
        return {
          // ... existing data
          showFullComparison: false
          // ... rest of existing data
        }
      },
      computed: {
  // ... existing computed properties
        
        competitorEstTotal() {
            // Calculate a conservative 20% higher total for competitor platforms
            // Using 20% as a middle value between 15-30% commission range plus higher delivery fees
            return (this.cartTotal * 1.2) + (this.deliveryFee.price * 1.5) + this.totalTaxes;
        },
        
        savingsAmount() {
            return this.competitorEstTotal - this.grandTotal;
        },
        
        savingsPercent() {
            if (this.grandTotal === 0) return 0;
            return Math.round((this.savingsAmount / this.competitorEstTotal) * 100);
        }
        // ... rest of existing computed properties
    }
  }
  // Add to data() section:
  </script>
  
  <!-- Add this to your existing <style> section -->
  <style lang="scss">
  // Comparison Badge
  .comparison-badge {
    margin: 24px 0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #F0F0F0;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
    }
    
    &__header {
      background: linear-gradient(135deg, $primary, $deepprimary);
      padding: 16px;
      color: white;
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
      
      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
      }
      
      .badge-icon {
        width: 32px;
        height: 32px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .savings-chip {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(255, 255, 255, 0.2);
        padding: 6px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.3px;
      }
    }
    
    .comparison-content {
      background-color: white;
      padding: 8px 16px;
    }
    
    .comparison-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px dashed #EEE;
      
      &:last-child {
        border-bottom: none;
      }
      
      .platform {
        display: flex;
        align-items: center;
        gap: 10px;
        
        img {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
        
        span {
          font-weight: 500;
          color: $charcoal;
        }
      }
      
      .price {
        font-weight: 600;
        color: $faint;
        
        &.current-price {
          color: $primary;
          font-weight: 700;
          font-size: 16px;
        }
      }
    }
    
    .comparison-footer {
      background-color: #F9F9F9;
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #EEE;
      
      p {
        margin: 0;
        font-size: 13px;
        color: $charcoal;
        font-weight: 500;
      }
      
      .compare-btn {
        background-color: transparent;
        border: none;
        color: $primary;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        padding: 0;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
    
    .full-comparison {
      background-color: #F9F9F9;
      padding: 0 16px 16px;
      border-top: 1px dashed #EEE;
      
      h4 {
        font-size: 14px;
        margin: 12px 0 8px;
        color: $charcoal;
      }
      
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        
        li {
          font-size: 13px;
          color: $charcoal;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          
          span {
            color: $primary;
            font-weight: 700;
          }
        }
      }
    }
  }
  
  // Responsive adjustments
  @media (max-width: 640px) {
    .comparison-badge {
      &__header {
        padding: 12px;
        
        h3 {
          font-size: 14px;
        }
        
        .savings-chip {
          font-size: 10px;
          padding: 4px 8px;
        }
      }
      
      .comparison-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
  }
  </style>
