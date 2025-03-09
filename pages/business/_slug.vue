<!-- pages/business/_id.vue -->
<template>
    <div class="business-detail-page">
      <header>
        <div class="container">
          <div class="header-content">
            <div class="logo">
              <NuxtLink to="/">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999Z" stroke="#E53945" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#E53945"/>
                </svg>
                <span class="logo-text">PointsBud</span>
              </NuxtLink>
            </div>
            <nav class="nav-links">
              <NuxtLink to="/">Home</NuxtLink>
              <NuxtLink to="/categories">Categories</NuxtLink>
              <NuxtLink to="/near-me">Near Me</NuxtLink>
              <NuxtLink to="/orders">My Orders</NuxtLink>
            </nav>
          </div>
        </div>
      </header>
  
      <!-- Business Hero Section -->
      <section class="business-hero" :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${business.coverImage})` }">
        <div class="container">
          <div class="business-hero__content">
            <span class="business-category">{{ business.category }}</span>
            <h1>{{ business.name }}</h1>
            <div class="business-meta">
              <div class="business-rating">
                <div class="stars">{{ getStarsDisplay(business.rating) }}</div>
                <span class="rating-count">{{ business.ratingCount }} ratings</span>
              </div>
              <div class="business-status" :class="business.isOpen ? 'open' : 'closed'">
                {{ business.isOpen ? 'Open Now' : 'Closed' }}
              </div>
            </div>
            <div class="business-location">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ business.location }}
            </div>
          </div>
        </div>
      </section>
  
      <!-- Quick Actions -->
      <section class="quick-actions">
        <div class="container">
          <div class="action-buttons">
            <button class="action-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.75 12L10.58 14.83L16.25 9.17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Check-in
            </button>
            <button class="action-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Save
            </button>
            <button class="action-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 21V8L12 2L20 8V21H4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 21V15H14V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Directions
            </button>
            <button class="action-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Share
            </button>
          </div>
        </div>
      </section>
  
      <!-- Main Content -->
      <div class="business-content">
        <div class="container">
          <div class="business-layout">
            <!-- Left Column - Menu & Info -->
            <div class="business-main">
              <!-- Menu Tabs -->
              <div class="menu-tabs">
                <button 
                  v-for="tab in tabs" 
                  :key="tab.id" 
                  :class="['tab-button', { active: activeTab === tab.id }]"
                  @click="activeTab = tab.id"
                >
                  {{ tab.name }}
                </button>
              </div>
  
              <!-- Menu Content -->
              <div v-if="activeTab === 'menu'" class="menu-content">
                <div v-for="(category, index) in menuCategories" :key="index" class="menu-category">
                  <h2 class="category-title">{{ category.name }}</h2>
                  
                  <div class="menu-items">
                    <div v-for="(item, itemIndex) in category.items" :key="itemIndex" class="menu-item">
                      <div class="menu-item__image" :style="{ backgroundImage: `url(${item.image})` }"></div>
                      <div class="menu-item__content">
                        <h3 class="menu-item__title">{{ item.name }}</h3>
                        <p class="menu-item__description">{{ item.description }}</p>
                        <div class="menu-item__price-row">
                          <span class="menu-item__price">₦{{ formatPrice(item.price) }}</span>
                          <button class="add-to-cart" @click="addToCart(item)">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Reviews Content -->
              <div v-else-if="activeTab === 'reviews'" class="reviews-content">
                <div class="reviews-summary">
                  <div class="overall-rating">
                    <div class="rating-number">{{ business.rating.toFixed(1) }}</div>
                    <div class="rating-stars">{{ getStarsDisplay(business.rating) }}</div>
                    <div class="rating-count">Based on {{ business.ratingCount }} reviews</div>
                  </div>
                  
                  <div class="rating-breakdown">
                    <div v-for="i in 5" :key="i" class="rating-bar">
                      <div class="star-level">{{ 6 - i }} stars</div>
                      <div class="bar-container">
                        <div class="bar-fill" :style="{ width: getRatingPercentage(6 - i) + '%' }"></div>
                      </div>
                      <div class="bar-percentage">{{ getRatingPercentage(6 - i) }}%</div>
                    </div>
                  </div>
                </div>
  
                <div class="reviews-list">
                  <div v-for="(review, index) in reviews" :key="index" class="review-item">
                    <div class="review-header">
                      <div class="reviewer-avatar" :style="{ backgroundColor: getAvatarColor(review.userName) }">
                        {{ getInitials(review.userName) }}
                      </div>
                      <div class="reviewer-info">
                        <div class="reviewer-name">{{ review.userName }}</div>
                        <div class="review-date">{{ review.date }}</div>
                      </div>
                      <div class="review-rating">
                        {{ getStarsDisplay(review.rating) }}
                      </div>
                    </div>
                    <div class="review-content">
                      <p>{{ review.comment }}</p>
                    </div>
                    <div v-if="review.images && review.images.length" class="review-images">
                      <div 
                        v-for="(image, imgIndex) in review.images" 
                        :key="imgIndex" 
                        class="review-image"
                        :style="{ backgroundImage: `url(${image})` }"
                      ></div>
                    </div>
                    <div class="review-actions">
                      <button class="action-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 001.94-1.51L23 8a2 2 0 00-2-2h-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Helpful ({{ review.helpfulCount }})
                      </button>
                      <button class="action-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
  
                <button class="btn-load-more">Load More Reviews</button>
              </div>
  
              <!-- Info Content -->
              <div v-else-if="activeTab === 'info'" class="info-content">
                <div class="info-section">
                  <h2 class="section-title">About {{ business.name }}</h2>
                  <p class="about-text">{{ business.description }}</p>
                </div>
  
                <div class="info-section">
                  <h2 class="section-title">Location & Hours</h2>
                  <div class="location-map">
                    <img src="https://via.placeholder.com/800x300?text=Map" alt="Map location" class="map-image">
                  </div>
                  <div class="address-details">
                    <p>{{ business.address }}</p>
                    <a href="#" class="get-directions">Get Directions</a>
                  </div>
  
                  <div class="hours-table">
                    <div v-for="(hours, day) in business.hours" :key="day" class="hours-row">
                      <div class="day">{{ day }}</div>
                      <div class="time">{{ hours }}</div>
                    </div>
                  </div>
                </div>
  
                <div class="info-section">
                  <h2 class="section-title">Contact</h2>
                  <div class="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.1 1 .33 2.14.65 3.17a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.99.32 2.06.55 3.1.65a2 2 0 011.74 2.16z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{{ business.phone }}</span>
                  </div>
                  <div class="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{{ business.email }}</span>
                  </div>
                  <div class="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 12h20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{{ business.website }}</span>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Right Column - Order Summary -->
            <div class="business-sidebar">
              <div class="order-summary" v-if="cart.items.length > 0">
                <h2 class="summary-title">Your Order</h2>
                
                <div class="cart-items">
                  <div v-for="(item, index) in cart.items" :key="index" class="cart-item">
                    <div class="item-quantity">{{ item.quantity }}</div>
                    <div class="item-details">
                      <div class="item-name">{{ item.name }}</div>
                      <div class="item-price">₦{{ formatPrice(item.price * item.quantity) }}</div>
                    </div>
                    <div class="item-actions">
                      <button class="quantity-btn" @click="decrementItem(index)">−</button>
                      <button class="quantity-btn" @click="incrementItem(index)">+</button>
                    </div>
                  </div>
                </div>
  
                <div class="order-totals">
                  <div class="total-row">
                    <span>Subtotal</span>
                    <span>₦{{ formatPrice(cartSubtotal) }}</span>
                  </div>
                  <div class="total-row">
                    <span>Delivery Fee</span>
                    <span>₦{{ formatPrice(deliveryFee) }}</span>
                  </div>
                  <div class="total-row grand-total">
                    <span>Total</span>
                    <span>₦{{ formatPrice(cartTotal) }}</span>
                  </div>
                </div>
  
                <button class="checkout-button">
                  Proceed to Checkout
                </button>
              </div>
  
              <div class="empty-cart" v-else>
                <div class="empty-cart-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h3>Your cart is empty</h3>
                <p>Add items from the menu to start your order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Similar Businesses Section -->
      <section class="similar-businesses">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Similar Businesses</h2>
            <NuxtLink to="/category/restaurant" class="see-all">See All</NuxtLink>
          </div>
  
          <div class="business-cards">
            <div 
              v-for="(similarBusiness, index) in similarBusinesses" 
              :key="index" 
              class="business-card"
              @click="goToBusiness(similarBusiness.id)"
            >
              <img :src="similarBusiness.image" :alt="similarBusiness.name" class="card-image">
              <div class="card-content">
                <span class="card-category">{{ similarBusiness.category }}</span>
                <h3 class="card-title">{{ similarBusiness.name }}</h3>
                <div class="card-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ similarBusiness.location }}
                </div>
                <div class="card-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ similarBusiness.hours }}
                </div>
                <div class="card-rating">
                  <div class="stars">{{ getStarsDisplay(similarBusiness.rating) }}</div>
                  <span class="rating-count">({{ similarBusiness.ratingCount }})</span>
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
    name: 'BusinessDetailPage',
    
    data() {
      return {
        activeTab: 'menu',
        tabs: [
          { id: 'menu', name: 'Menu' },
          { id: 'reviews', name: 'Reviews' },
          { id: 'info', name: 'Info' }
        ],
        business: {
          id: 'cozy-kitchen',
          name: 'The Cozy Kitchen',
          category: 'Restaurant',
          coverImage: 'https://via.placeholder.com/1200x400?text=Restaurant+Cover',
          image: 'https://via.placeholder.com/400x250?text=Restaurant',
          location: 'Yaba, Lagos',
          address: '123 Yaba Tech Road, Yaba, Lagos',
          description: 'The Cozy Kitchen offers a warm and inviting dining experience with a menu that features a fusion of local Nigerian flavors and international cuisine. Our chefs use only the freshest ingredients to create dishes that delight the senses.',
          isOpen: true,
          rating: 4.2,
          ratingCount: 126,
          phone: '+234 812 345 6789',
          email: 'contact@cozykitchen.com',
          website: 'www.cozykitchen.com',
          hours: {
            'Monday': '8:00 AM - 10:00 PM',
            'Tuesday': '8:00 AM - 10:00 PM',
            'Wednesday': '8:00 AM - 10:00 PM',
            'Thursday': '8:00 AM - 10:00 PM',
            'Friday': '8:00 AM - 11:00 PM',
            'Saturday': '9:00 AM - 11:00 PM',
            'Sunday': '9:00 AM - 9:00 PM'
          },
          ratingBreakdown: {
            5: 70,
            4: 25,
            3: 3,
            2: 1,
            1: 1
          }
        },
        menuCategories: [
          {
            name: 'Starters',
            items: [
              {
                id: 'spring-rolls',
                name: 'Spring Rolls',
                description: 'Crispy vegetable spring rolls served with sweet chili sauce',
                price: 2500,
                image: 'https://via.placeholder.com/120x120?text=SpringRolls'
              },
              {
                id: 'chicken-wings',
                name: 'Spicy Chicken Wings',
                description: 'Crispy fried chicken wings tossed in our signature spicy sauce',
                price: 3500,
                image: 'https://via.placeholder.com/120x120?text=ChickenWings'
              },
              {
                id: 'mozzarella-sticks',
                name: 'Mozzarella Sticks',
                description: 'Breaded mozzarella sticks served with marinara sauce',
                price: 2800,
                image: 'https://via.placeholder.com/120x120?text=MozzarellaSticks'
              }
            ]
          },
          {
            name: 'Main Courses',
            items: [
              {
                id: 'jollof-rice',
                name: 'Jollof Rice with Chicken',
                description: 'Flavorful Nigerian jollof rice served with grilled chicken and plantains',
                price: 4500,
                image: 'https://via.placeholder.com/120x120?text=JollofRice'
              },
              {
                id: 'pasta-alfredo',
                name: 'Pasta Alfredo',
                description: 'Creamy alfredo sauce with fettuccine pasta and grilled chicken',
                price: 5200,
                image: 'https://via.placeholder.com/120x120?text=PastaAlfredo'
              },
              {
                id: 'grilled-fish',
                name: 'Grilled Tilapia Fish',
                description: 'Whole tilapia fish grilled and served with vegetables and fried yam',
                price: 6500,
                image: 'https://via.placeholder.com/120x120?text=GrilledFish'
              },
              {
                id: 'beef-burger',
                name: 'Classic Beef Burger',
                description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce',
                price: 4800,
                image: 'https://via.placeholder.com/120x120?text=BeefBurger'
              }
            ]
          },
          {
            name: 'Desserts',
            items: [
              {
                id: 'chocolate-cake',
                name: 'Chocolate Cake',
                description: 'Rich chocolate cake with a scoop of vanilla ice cream',
                price: 2800,
                image: 'https://via.placeholder.com/120x120?text=ChocolateCake'
              },
              {
                id: 'fruit-parfait',
                name: 'Fruit Parfait',
                description: 'Layered yogurt with fresh fruits and granola',
                price: 2200,
                image: 'https://via.placeholder.com/120x120?text=FruitParfait'
              }
            ]
          },
          {
            name: 'Drinks',
            items: [
              {
                id: 'fresh-juice',
                name: 'Fresh Fruit Juice',
                description: 'Choose from orange, pineapple, watermelon, or mixed fruit',
                price: 1500,
                image: 'https://via.placeholder.com/120x120?text=FreshJuice'
              },
              {
                id: 'chapman',
                name: 'Chapman',
                description: 'Classic Nigerian cocktail with a mix of fruits and grenadine',
                price: 1800,
                image: 'https://via.placeholder.com/120x120?text=Chapman'
              },
              {
                id: 'soft-drinks',
                name: 'Soft Drinks',
                description: 'Coke, Fanta, Sprite, or Pepsi',
                price: 800,
                image: 'https://via.placeholder.com/120x120?text=SoftDrinks'
              }
            ]
          }
        ],
        reviews: [
          {
            userName: 'John Doe',
            date: 'October 15, 2024',
            rating: 5,
            comment: 'This is my favorite restaurant in Yaba! The jollof rice is perfectly spiced and the chicken was juicy and flavorful. Service was also excellent, our waiter was very attentive. Will definitely be coming back soon!',
            helpfulCount: 12
          },
          {
            userName: 'Amina Ibrahim',
            date: 'October 10, 2024',
            rating: 4,
            comment: 'Great food and nice ambiance. I ordered the grilled fish and it was delicious. The only reason I\'m giving 4 stars instead of 5 is because we had to wait a bit long for our food. But it was worth the wait!',
            helpfulCount: 8,
            images: [
              'https://via.placeholder.com/120x120?text=FoodPic1',
              'https://via.placeholder.com/120x120?text=FoodPic2'
            ]
          },
          {
            userName: 'David Okonkwo',
            date: 'October 3, 2024',
            rating: 5,
            comment: 'The pasta alfredo was amazing! Perfectly creamy and the chicken was well seasoned. The service was prompt and the staff was friendly. Definitely recommend trying this place out.',
            helpfulCount: 5
          },
          {
            userName: 'Sarah James',
            date: 'September 25, 2024',
            rating: 3,
            comment: 'The food was okay, but not exceptional. I had higher expectations based on reviews. The chicken wings were good but the main course was just average. Might give it another try in the future.',
            helpfulCount: 2
          }
        ],
        similarBusinesses: [
          {
            id: 'lagoon-view',
            name: 'Lagoon View Restaurant',
            category: 'Restaurant',
            image: 'https://via.placeholder.com/400x250?text=Restaurant',
            location: 'Victoria Island, Lagos',
            hours: '10:00 AM - 11:00 PM',
            rating: 5,
            ratingCount: 312
          },
          {
            id: 'quick-bites',
            name: 'Quick Bites',
            category: 'Fast Food',
            image: 'https://via.placeholder.com/400x250?text=FastFood',
            location: 'Yaba, Lagos',
            hours: '8:00 AM - 10:00 PM',
            rating: 4,
            ratingCount: 287
          },
          {
            id: 'spice-route',
            name: 'Spice Route',
            category: 'Indian Restaurant',
            image: 'https://via.placeholder.com/400x250?text=IndianFood',
            location: 'Ikeja, Lagos',
            hours: '11:00 AM - 10:00 PM',
            rating: 4.5,
            ratingCount: 178
          },
          {
            id: 'green-leaf',
            name: 'Green Leaf Bistro',
            category: 'Healthy Food',
            image: 'https://via.placeholder.com/400x250?text=HealthyFood',
            location: 'Lekki, Lagos',
            hours: '8:00 AM - 9:00 PM',
            rating: 4.2,
            ratingCount: 156
          }
        ],
        cart: {
          items: []
        },
        deliveryFee: 1000
      }
    },
    
    computed: {
      cartSubtotal() {
        return this.cart.items.reduce((total, item) => {
          return total + (item.price * item.quantity);
        }, 0);
      },
      
      cartTotal() {
        return this.cartSubtotal + this.deliveryFee;
      }
    },
    
    methods: {
      getStarsDisplay(rating) {
        // Convert numeric rating to star display
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let stars = '★'.repeat(fullStars);
        if (halfStar) stars += '½';
        stars += '☆'.repeat(emptyStars);
        
        return stars;
      },
      
      getRatingPercentage(stars) {
        const totalRatings = this.business.ratingCount;
        const starCount = this.business.ratingBreakdown[stars] || 0;
        return Math.round((starCount / totalRatings) * 100);
      },
      
      formatPrice(price) {
        return price.toLocaleString('en-NG');
      },
      
      addToCart(item) {
        const existingItem = this.cart.items.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.cart.items.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
          });
        }
      },
      
      incrementItem(index) {
        this.cart.items[index].quantity += 1;
      },
      
      decrementItem(index) {
        if (this.cart.items[index].quantity === 1) {
          this.cart.items.splice(index, 1);
        } else {
          this.cart.items[index].quantity -= 1;
        }
      },
      
      getInitials(name) {
        if (!name) return '';
        return name
          .split(' ')
          .map(part => part.charAt(0))
          .join('')
          .toUpperCase();
      },
      
      getAvatarColor(name) {
        // Simple hash function to get a consistent color for a name
        const colors = [
          '#E53945', // Your primary color
          '#f79939', // Your secondary color
          '#4bb39a',
          '#5ac091',
          '#DD6B6B'
        ];
        
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
          hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        return colors[Math.abs(hash) % colors.length];
      },
      
      goToBusiness(id) {
        this.$router.push(`/business/${id}`);
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  // Variables based on provided styling
  $primary: #E53945;
  $deep-primary: #A02730;
  $secondary: #f79939;
  $secondary-light: #f798398b;
  $light-accent: $primary;
  $dark-accent: #dd6b6b36;
  $border-grey: #E0E0E0;
  $faint: #686868;
  $charcoal: #36454F;
  $input-background: #F3F3F3;
  $dashboard-background: rgb(255, 255, 255);
  
  // Reset and base styles
  .business-detail-page {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: $charcoal;
    line-height: 1.6;
    background-color: #f8f9fa;
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
    
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
  }
  
  .logo-text {
    font-size: 20px;
    font-weight: 600;
    margin-left: 8px;
    color: $primary;
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
      
      &.nuxt-link-active {
        color: $primary;
        font-weight: 600;
      }
    }
  }
  
  // Business Hero Section
  .business-hero {
    background-size: cover;
    background-position: center;
    color: white;
    padding: 80px 0 40px;
    
    &__content {
      max-width: 800px;
    }
  }
  
  .business-category {
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  
  .business-hero h1 {
    font-size: 36px;
    font-weight: 700;
    margin: 0 0 16px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .business-meta {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 16px;
  }
  
  .business-rating {
    display: flex;
    align-items: center;
    
    .stars {
      color: $secondary;
      margin-right: 8px;
    }
    
    .rating-count {
      font-size: 14px;
      opacity: 0.9;
    }
  }
  
  .business-status {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    
    &.open {
      background-color: rgba(40, 167, 69, 0.2);
      color: #28a745;
    }
    
    &.closed {
      background-color: rgba(220, 53, 69, 0.2);
      color: #dc3545;
    }
  }
  
  .business-location {
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 8px;
    }
  }
  
  // Quick Actions
  .quick-actions {
    background-color: white;
    border-bottom: 1px solid $border-grey;
    padding: 16px 0;
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 32px;
  }
  
  .action-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    color: $charcoal;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background-color 0.2s;
    
    svg {
      margin-bottom: 4px;
    }
    
    &:hover {
      background-color: $input-background;
    }
  }
  
  // Main Content Layout
  .business-content {
    padding: 40px 0;
  }
  
  .business-layout {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 30px;
    
    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }
  
  // Menu Tabs
  .menu-tabs {
    display: flex;
    border-bottom: 1px solid $border-grey;
    margin-bottom: 24px;
  }
  
  .tab-button {
    padding: 12px 24px;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 500;
    color: $faint;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 3px;
      background-color: transparent;
      transition: background-color 0.2s;
    }
    
    &:hover {
      color: $charcoal;
    }
    
    &.active {
      color: $primary;
      
      &::after {
        background-color: $primary;
      }
    }
  }
  
  // Menu Content
  .menu-category {
    margin-bottom: 40px;
  }
  
  .category-title {
    font-size: 22px;
    font-weight: 600;
    color: $charcoal;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid $border-grey;
  }
  
  .menu-items {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .menu-item {
    display: flex;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s, box-shadow 0.3s;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
    
    &__image {
      width: 120px;
      height: 120px;
      flex-shrink: 0;
      background-size: cover;
      background-position: center;
    }
    
    &__content {
      padding: 16px;
      flex: 1;
    }
    
    &__title {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }
    
    &__description {
      font-size: 14px;
      color: $faint;
      margin: 0 0 16px 0;
    }
    
    &__price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    &__price {
      font-weight: 600;
      font-size: 16px;
    }
  }
  
  .add-to-cart {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: $deep-primary;
    }
  }
  
  // Reviews Content
  .reviews-summary {
    display: flex;
    background-color: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 24px;
    }
  }
  
  .overall-rating {
    text-align: center;
    padding-right: 24px;
    margin-right: 24px;
    border-right: 1px solid $border-grey;
    min-width: 150px;
    
    @media (max-width: 768px) {
      border-right: none;
      border-bottom: 1px solid $border-grey;
      padding-right: 0;
      padding-bottom: 24px;
      margin-right: 0;
    }
    
    .rating-number {
      font-size: 48px;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 8px;
    }
    
    .rating-stars {
      color: $secondary;
      font-size: 20px;
      margin-bottom: 8px;
    }
    
    .rating-count {
      font-size: 14px;
      color: $faint;
    }
  }
  
  .rating-breakdown {
    flex: 1;
  }
  
  .rating-bar {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    
    .star-level {
      width: 80px;
      font-size: 14px;
    }
    
    .bar-container {
      flex: 1;
      height: 8px;
      background-color: $input-background;
      border-radius: 4px;
      margin: 0 12px;
      overflow: hidden;
    }
    
    .bar-fill {
      height: 100%;
      background-color: $secondary;
      border-radius: 4px;
    }
    
    .bar-percentage {
      width: 40px;
      font-size: 14px;
      text-align: right;
    }
  }
  
  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;
  }
  
  .review-item {
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
  
  .review-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .reviewer-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: $primary;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    margin-right: 16px;
  }
  
  .reviewer-info {
    flex: 1;
  }
  
  .reviewer-name {
    font-weight: 600;
    margin-bottom: 2px;
  }
  
  .review-date {
    font-size: 13px;
    color: $faint;
  }
  
  .review-rating {
    color: $secondary;
  }
  
  .review-content {
    margin-bottom: 16px;
    
    p {
      margin: 0;
    }
  }
  
  .review-images {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    overflow-x: auto;
    padding-bottom: 8px;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: $input-background;
      border-radius: 2px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: $faint;
      border-radius: 2px;
    }
  }
  
  .review-image {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    
    &:hover {
      opacity: 0.9;
    }
  }
  
  .review-actions {
    display: flex;
    gap: 20px;
  }
  
  .action-link {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: $faint;
    font-size: 14px;
    cursor: pointer;
    padding: 4px 0;
    
    &:hover {
      color: $primary;
    }
  }
  
  .btn-load-more {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: white;
    border: 1px solid $border-grey;
    border-radius: 8px;
    font-weight: 500;
    color: $charcoal;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background-color: $input-background;
    }
  }
  
  // Info Content
  .info-content {
    .info-section {
      background-color: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }
    
    .section-title {
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 16px 0;
    }
    
    .about-text {
      margin: 0;
      line-height: 1.7;
    }
    
    .location-map {
      margin-bottom: 16px;
      
      .map-image {
        width: 100%;
        height: auto;
        border-radius: 8px;
      }
    }
    
    .address-details {
      margin-bottom: 24px;
      
      p {
        margin: 0 0 8px 0;
      }
      
      .get-directions {
        color: $primary;
        text-decoration: none;
        font-weight: 500;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
    
    .hours-table {
      .hours-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid $input-background;
        
        &:last-child {
          border-bottom: none;
        }
        
        .day {
          font-weight: 500;
        }
      }
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      svg {
        color: $primary;
      }
    }
  }
  
  // Order Summary (Sidebar)
  .business-sidebar {
    position: sticky;
    top: 100px;
  }
  
  .order-summary {
    background-color: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
  
  .summary-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 20px 0;
    padding-bottom: 12px;
    border-bottom: 1px solid $border-grey;
  }
  
  .cart-items {
    margin-bottom: 20px;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid $input-background;
    
    &:last-child {
      border-bottom: none;
    }
    
    .item-quantity {
      width: 24px;
      height: 24px;
      background-color: $input-background;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-right: 12px;
    }
    
    .item-details {
      flex: 1;
    }
    
    .item-name {
      font-weight: 500;
      margin-bottom: 2px;
    }
    
    .item-price {
      font-size: 13px;
      color: $faint;
    }
    
    .item-actions {
      display: flex;
      gap: 8px;
    }
    
    .quantity-btn {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      border: 1px solid $border-grey;
      background-color: white;
      font-size: 16px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      
      &:hover {
        background-color: $input-background;
      }
    }
  }
  
  .order-totals {
    margin-bottom: 24px;
    
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      
      &.grand-total {
        font-weight: 600;
        font-size: 18px;
        padding-top: 16px;
        margin-top: 8px;
        border-top: 1px solid $border-grey;
      }
    }
  }
  
  .checkout-button {
    width: 100%;
    padding: 14px;
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: $deep-primary;
    }
  }
  
  // Empty Cart
  .empty-cart {
    background-color: white;
    border-radius: 12px;
    padding: 40px 24px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    
    .empty-cart-icon {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
      color: $faint;
    }
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }
    
    p {
      color: $faint;
      margin: 0;
    }
  }
  
  // Similar Businesses Section
  .similar-businesses {
    padding: 40px 0;
    background-color: white;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: $charcoal;
  }
  
  .see-all {
    color: $primary;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
  }
  
  .business-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .business-card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
    }
  }
  
  .card-image {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: $charcoal;
  }
  
  .card-category {
    display: inline-block;
    background-color: $dark-accent;
    color: $primary;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 20px;
    margin-bottom: 12px;
  }
  
  .card-info {
    display: flex;
    align-items: center;
    color: $faint;
    font-size: 14px;
    margin-bottom: 4px;
    
    svg {
      margin-right: 8px;
      width: 16px;
      height: 16px;
    }
  }
  
  .card-rating {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
  
  .stars {
    color: $secondary;
    margin-right: 6px;
  }
  
  .rating-count {
    font-size: 13px;
    color: $faint;
  }
  
  // Responsive Adjustments
  @media (max-width: 992px) {
    .business-hero h1 {
      font-size: 30px;
    }
    
    .order-summary {
      margin-top: 24px;
    }
  }
  
  @media (max-width: 768px) {
    .business-hero {
      padding: 60px 0 30px;
    }
    
    .business-hero h1 {
      font-size: 26px;
    }
    
    .business-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    
    .action-buttons {
      overflow-x: auto;
      padding-bottom: 8px;
      justify-content: flex-start;
    }
    
    .menu-tabs {
      overflow-x: auto;
      white-space: nowrap;
      padding-bottom: 8px;
    }
    
    .tab-button {
      padding: 12px 16px;
    }
    
    .menu-item {
      flex-direction: column;
      
      &__image {
        width: 100%;
        height: 180px;
      }
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
    
    .business-hero h1 {
      font-size: 24px;
    }
  }
  </style>
   Yaba! The jollof rice