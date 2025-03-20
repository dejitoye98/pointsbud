<!-- pages/deals.vue -->
<template>
    <div class="deals-page">
      <header>
        <div class="container">
          <div class="header-content">
            <div class="logo">
              <Logo></Logo>
            </div>
            <nav class="nav-links">
              <NuxtLink to="/">Home</NuxtLink>
              <NuxtLink to="/categories">Categories</NuxtLink>
              <NuxtLink to="/deals" class="active">Deals</NuxtLink>
              <NuxtLink to="/orders">My Orders</NuxtLink>
            </nav>
          </div>
        </div>
      </header>
  
      <div class="hero-banner">
        <div class="container">
          <div class="hero-content">
            <h1>Exclusive Deals at BFF Lagos</h1>
            <p>Preorder our signature dishes at special prices. The more people join, the better the deal gets!</p>
          </div>
        </div>
      </div>
  
      <section class="deals-section">
        <div class="container">
          <div class="deals-header">
            <h2>Today's Hot Deals</h2>
            <div class="deals-filter">
              <button class="filter-btn active">All Deals</button>
              <button class="filter-btn">Ending Soon</button>
              <button class="filter-btn">Most Popular</button>
            </div>
          </div>
  
          <div class="deals-grid">
            <div v-for="(deal, index) in deals" :key="index" class="deal-card">
              <div class="deal-image-container">
                <img :src="deal.image" :alt="deal.name" class="deal-image">
                <div class="deal-time-remaining">
                  <div class="deal-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <span>{{ deal.timeRemaining }}</span>
                </div>
                <div class="discount-badge">-{{ deal.discount }}%</div>
              </div>
              
              <div class="deal-content">
                <h3 class="deal-title">{{ deal.name }}</h3>
                <p class="deal-description">{{ deal.description }}</p>
                
                <div class="deal-pricing">
                  <div class="deal-price">
                    <span class="original-price">₦{{ deal.originalPrice.toLocaleString() }}</span>
                    <span class="current-price">₦{{ deal.currentPrice.toLocaleString() }}</span>
                  </div>
                  <div class="deal-delivery">
                    <span class="delivery-label">Delivery:</span>
                    <span class="delivery-discount">{{ deal.deliveryDiscount }}% off</span>
                  </div>
                </div>
                
                <div class="deal-progress-container">
                  <div class="deal-progress-info">
                    <span class="spots-left">{{ deal.spotsLeft }} spots left</span>
                    <span class="progress-percentage">{{ Math.round((1 - deal.spotsLeft / deal.totalSpots) * 100) }}% claimed</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: `${Math.round((1 - deal.spotsLeft / deal.totalSpots) * 100)}%` }"></div>
                  </div>
                  <div class="progress-milestones">
                    <div class="milestone" v-for="milestone in deal.milestones" :key="milestone.count"
                         :class="{ active: deal.totalSpots - deal.spotsLeft >= milestone.count }"
                         :style="{ left: `${(milestone.count / deal.totalSpots) * 100}%` }">
                      <div class="milestone-tooltip">
                        <span>{{ milestone.count }} people: {{ milestone.benefit }}</span>
                      </div>
                    </div>
                  </div>
                </div>
  
                <button class="preorder-btn">Preorder Now</button>
              </div>
            </div>
          </div>
  
          <div class="deals-cta">
            <h3>Don't see what you're craving?</h3>
            <p>Check back later for new deals or visit our full menu</p>
            <NuxtLink to="/menu" class="view-menu-btn">View Full Menu</NuxtLink>
          </div>
        </div>
      </section>
  
      <section class="how-it-works">
        <div class="container">
          <h2>How BFF Deals Work</h2>
          <div class="steps-container">
            <div class="step">
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h10z"></path>
                  <path d="M7 8V6a2 2 0 012-2h4l4-4v4h2a2 2 0 012 2v2"></path>
                </svg>
              </div>
              <h3>Choose a Deal</h3>
              <p>Browse our exclusive preorder deals and select your favorite</p>
            </div>
            <div class="step">
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3>Preorder</h3>
              <p>Secure your spot and invite friends to join for better discounts</p>
            </div>
            <div class="step">
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3>Track Progress</h3>
              <p>Watch as more people join and unlock bigger discounts</p>
            </div>
            <div class="step">
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                  <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
                </svg>
              </div>
              <h3>Enjoy Your Meal</h3>
              <p>Pick up your order or enjoy discounted delivery when ready</p>
            </div>
          </div>
        </div>
      </section>
  
      <section class="testimonials">
        <div class="container">
          <h2>What Our Customers Say</h2>
          <div class="testimonials-carousel">
            <div class="testimonial">
              <div class="testimonial-content">
                <p>"BFF Lagos deals are incredible! I saved 40% on my favorite jollof rice platter and the food was just as amazing as always."</p>
              </div>
              <div class="testimonial-author">
                <img src="https://via.placeholder.com/60x60" alt="Customer" class="author-image">
                <div class="author-info">
                  <h4>Amara O.</h4>
                  <div class="star-rating">★★★★★</div>
                </div>
              </div>
            </div>
            <div class="testimonial">
              <div class="testimonial-content">
                <p>"The group discount system is brilliant. I shared the deal with my colleagues and we all got our lunch at a steal. Will definitely order again!"</p>
              </div>
              <div class="testimonial-author">
                <img src="https://via.placeholder.com/60x60" alt="Customer" class="author-image">
                <div class="author-info">
                  <h4>Daniel E.</h4>
                  <div class="star-rating">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <app-footer />
    </div>
  </template>
  
  <script>
  export default {
    name: 'DealsPage',
    data() {
      return {
        deals: [
          {
            name: "Signature Jollof Rice Platter",
            description: "Our famous jollof rice with grilled chicken, plantains, and coleslaw. A BFF Lagos favorite!",
            image: "https://d32daph4upy9zf.cloudfront.net/635909624bb41ec613cab7fa716ec4d2",
            originalPrice: 7500,
            currentPrice: 6000,
            discount: 34,
            deliveryDiscount: 50,
            timeRemaining: "3h 45m left",
            spotsLeft: 12,
            totalSpots: 50,
            milestones: [
              { count: 10, benefit: "25% off" },
              { count: 25, benefit: "30% off" },
              { count: 40, benefit: "40% off" }
            ]
          },
          {
            name: "Suya Special with Sides",
            description: "Premium beef suya with yam fries, pepper sauce, and grilled vegetables. Perfect for sharing!",
            image: "https://via.placeholder.com/500x300?text=Suya+Special",
            originalPrice: 8200,
            currentPrice: 5330,
            discount: 35,
            deliveryDiscount: 100,
            timeRemaining: "5h 20m left",
            spotsLeft: 8,
            totalSpots: 40,
            milestones: [
              { count: 10, benefit: "20% off" },
              { count: 20, benefit: "30% off" },
              { count: 35, benefit: "Free Delivery" }
            ]
          },
          {
            name: "Seafood Okra Soup Combo",
            description: "Fresh seafood okra soup with a choice of pounded yam, semolina, or garri. A taste of Nigerian luxury.",
            image: "https://via.placeholder.com/500x300?text=Seafood+Okra",
            originalPrice: 9800,
            currentPrice: 5880,
            discount: 40,
            deliveryDiscount: 75,
            timeRemaining: "2h 10m left",
            spotsLeft: 3,
            totalSpots: 30,
            milestones: [
              { count: 10, benefit: "30% off" },
              { count: 20, benefit: "40% off" },
              { count: 25, benefit: "45% off" }
            ]
          },
          {
            name: "Weekend BBQ Party Pack",
            description: "Assorted grilled meats, fish, plantains, pepper sauce, and sides. Perfect for gatherings and celebrations!",
            image: "https://via.placeholder.com/500x300?text=BBQ+Party+Pack",
            originalPrice: 15000,
            currentPrice: 10500,
            discount: 30,
            deliveryDiscount: 100,
            timeRemaining: "8h 15m left",
            spotsLeft: 25,
            totalSpots: 60,
            milestones: [
              { count: 15, benefit: "20% off" },
              { count: 30, benefit: "30% off" },
              { count: 45, benefit: "35% off + Free Delivery" }
            ]
          }
        ]
      };
    },

    created() {
        this.getDeals()
    },
    methods: {
      // Methods would go here
      getDeals() {
            let endpoint = '/deals?slug=' + this.$route.parms.slug;
            
            if (this.filter.status !== 'all') {
                endpoint += `&status=${this.filter.status}`;
            }
            
            this.$api.get(endpoint).then(resp => {
                const { page_info, list } = resp.data.data;
                this.deals = list;
                this.pagination_data = page_info;
            });
        },
    }
  };
  </script>
  
  <style lang="scss" scoped>
  // Variables based on original styling with enhancements
  $primary: #E53945;
  $primary-light: #f9d7da;
  $deep-primary: #A02730;
  $secondary: #f79939;
  $secondary-light: #f798398b;
  $light-accent: $primary;
  $dark-accent: #dd6b6b36;
  $border-grey: #E0E0E0;
  $faint: #686868;
  $charcoal: #36454F;
  $input-background: #F3F3F3;
  $success-green: #2ecc71;
  $gold: #FFD700;
  
  // Reset and base styles
  .deals-page {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: $charcoal;
    line-height: 1.6;
    background-color: #f9f9f9;
  }
  
  // Layout
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  // Header
  header {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
  }
  
  .logo {
    display: flex;
    align-items: center;
  }
  
  .nav-links {
    display: flex;
    gap: 24px;
    
    a {
      color: $charcoal;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
      
      &:hover {
        color: $primary;
      }
      
      &.active {
        color: $primary;
        font-weight: 600;
      }
    }
  }
  
  // Hero Banner
  .hero-banner {
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url("https://via.placeholder.com/1920x600?text=BFF+Lagos+Food") center/cover no-repeat;
    color: white;
    padding: 80px 0;
    text-align: center;
  }
  
  .hero-content {
    max-width: 700px;
    margin: 0 auto;
    
    h1 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 16px;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }
    
    p {
      font-size: 18px;
      opacity: 0.9;
      margin-bottom: 20px;
    }
  }
  
  // Deals Section
  .deals-section {
    padding: 60px 0;
  }
  
  .deals-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    
    h2 {
      font-size: 28px;
      font-weight: 700;
      color: $charcoal;
    }
  }
  
  .deals-filter {
    display: flex;
    gap: 10px;
    
    .filter-btn {
      background: none;
      border: 1px solid $border-grey;
      border-radius: 20px;
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover, &.active {
        background-color: $primary;
        color: white;
        border-color: $primary;
      }
    }
  }
  
  .deals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
  }
  
  .deal-card {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s, box-shadow 0.3s;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }
  }
  
  .deal-image-container {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  .deal-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
    
    .deal-card:hover & {
      transform: scale(1.05);
    }
  }
  
  .deal-time-remaining {
    position: absolute;
    top: 15px;
    left: 15px;
    background-color: rgba(255, 255, 255, 0.9);
    color: $charcoal;
    border-radius: 20px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    
    .deal-icon {
      color: $primary;
    }
  }
  
  .discount-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: $primary;
    color: white;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 16px;
    box-shadow: 0 2px 10px rgba(229, 57, 69, 0.3);
  }
  
  .deal-content {
    padding: 20px;
  }
  
  .deal-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    color: $charcoal;
  }
  
  .deal-description {
    font-size: 14px;
    color: $faint;
    margin-bottom: 20px;
    line-height: 1.5;
  }
  
  .deal-pricing {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .deal-price {
    display: flex;
    flex-direction: column;
  }
  
  .original-price {
    font-size: 14px;
    color: $faint;
    text-decoration: line-through;
  }
  
  .current-price {
    font-size: 22px;
    font-weight: 700;
    color: $primary;
  }
  
  .deal-delivery {
    background-color: #f5f5f5;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 13px;
  }
  
  .delivery-label {
    color: $faint;
    margin-right: 5px;
  }
  
  .delivery-discount {
    font-weight: 600;
    color: $success-green;
  }
  
  .deal-progress-container {
    margin-bottom: 20px;
  }
  
  .deal-progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
  }
  
  .spots-left {
    color: $primary;
    font-weight: 600;
  }
  
  .progress-percentage {
    color: $faint;
  }
  
  .progress-bar {
    height: 8px;
    background-color: #f1f1f1;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 12px;
    position: relative;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, $secondary, $primary);
    border-radius: 4px;
    transition: width 0.3s ease-in-out;
  }
  
  .progress-milestones {
    position: relative;
    height: 20px;
    margin-bottom: 10px;
  }
  
  .milestone {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #f1f1f1;
    border: 2px solid white;
    border-radius: 50%;
    top: 0;
    transform: translateX(-50%);
    transition: all 0.2s;
    
    &.active {
      background-color: $gold;
      box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.3);
    }
    
    &:hover .milestone-tooltip {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .milestone-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(5px);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.2s;
    pointer-events: none;
    margin-bottom: 5px;
    
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -4px;
      border-width: 4px;
      border-style: solid;
      border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
    }
  }
  
  .preorder-btn {
    width: 100%;
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: $deep-primary;
    }
  }
  
  .deals-cta {
    text-align: center;
    background-color: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    
    h3 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    p {
      color: $faint;
      margin-bottom: 20px;
    }
  }
  
  .view-menu-btn {
    display: inline-block;
    background-color: $secondary;
    color: white;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: darken($secondary, 10%);
    }
  }
  
  // How It Works
  .how-it-works {
    background-color: $primary-light;
    padding: 80px 0;
    
    h2 {
      text-align: center;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 50px;
    }
  }
  
  .steps-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }
  
  .step {
    text-align: center;
    
    .step-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background-color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $primary;
      box-shadow: 0 6px 20px rgba(229, 57, 69, 0.15);
    }
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    p {
      color: $faint;
      font-size: 14px;
    }
  }
  
  // Testimonials
  .testimonials {
    padding: 80px 0;
    
    h2 {
      text-align: center;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 50px;
    }
  }
  
  .testimonials-carousel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .testimonial {
    background-color: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  
  .testimonial-content {
    margin-bottom: 20px;
    
    p {
      font-style: italic;
      color: $charcoal;
      line-height: 1.6;
    }
  }
  
  .testimonial-author {
    display: flex;
    align-items: center;
  }
  
  .author-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .author-info {
    h4 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 5px;
    }
  }
  
  .star-rating {
    color: $gold;
    font-size: 14px;
  }
  
  // Responsive Adjustments
  @media (max-width: 768px) {
    .hero-banner {
      padding: 50px 0;
      
      h1 {
        font-size: 28px;
      }
      
      p {
        font-size: 16px;
      }
    }
    
    .deals-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
    
    .deals-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 576px) {
    .header-content {
      flex-direction: column;
      gap: 16px;
    }
    
    .nav-links {
      width: 100%;
      justify-content: space-between;
    }
    
    .deal-pricing {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    
    .testimonials-carousel {
      grid-template-columns: 1fr;
    }
  }
  </style>