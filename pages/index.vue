<!-- pages/index.vue -->
<template>
    <div class="shop-homepage">
      <header>
        <div class="container">
          <div class="header-content">
            <div class="logo">
              <Logo></Logo>
            </div>
            <nav class="nav-links">
              <NuxtLink to="/" class="active">Home</NuxtLink>
              <NuxtLink to="/categories">Categories</NuxtLink>
              <NuxtLink to="/near-me">Near Me</NuxtLink>
              <NuxtLink to="/orders">My Orders</NuxtLink>
            </nav>
          </div>
        </div>
      </header>
  
      <section class="hero">
        <div class="container">
          <h1>Find Your Favorite Businesses</h1>
          <p>Discover local restaurants, shops, and services. Order directly and save money.</p>
          
          <div class="search-container">
            <input 
              type="text" 
              class="search-input" 
              placeholder="Enter business name or serial number..."
              v-model="searchQuery"
              @keyup.enter="searchBusinesses"
            >
            <button class="search-button" @click="searchBusinesses">Search</button>
          </div>
        </div>
      </section>
  
      <!-- Recently Visited Section -->
      <section class="businesses-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Recently Visited</h2>
            <NuxtLink to="/recent" class="see-all">See All</NuxtLink>
          </div>
  
          <div v-if="recently_visited.length === 0" class="empty-state">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h3>No recent visits yet</h3>
            <p>Businesses you visit will appear here for easy access</p>
          </div>
  
          <div v-else class="business-cards">
            <div 
              v-for="(business, index) in recently_visited" 
              :key="'recent-' + index" 
              class="business-card"
              @click="goToBusiness(business.slug)"
            >
              <div style="position: relative;">
                <img :src="business.logo" :alt="business.name" class="card-image">
                <span class="recently-viewed-tag">{{  }}</span>
              </div>
              <div class="card-content">
                <span class="card-category">{{ business.business_type || "business" }}</span>
                <h3 class="card-title">{{ business.name }}</h3>
                <div class="card-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ business.address || '-' }}
                </div>
                <div class="card-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ business.hours || '-'}}
                </div>
                <div class="card-rating">
                  <div class="stars">{{ 5 ||'-' }}</div>
                  <span class="rating-count">({{ 26}})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Popular in Your Area Section -->
      <section class="businesses-section" v-if="false">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Popular in Your Area</h2>
            <NuxtLink to="/popular" class="see-all">See All</NuxtLink>
          </div>
  
          <div class="business-cards">
            <div 
              v-for="(business, index) in popularBusinesses" 
              :key="'popular-' + index" 
              class="business-card"
              @click="goToBusiness(business.slug)"
            >
              <img :src="business.image" :alt="business.name" class="card-image">
              <div class="card-content">
                <span class="card-category">{{ business.category }}</span>
                <h3 class="card-title">{{ business.name }}</h3>
                <div class="card-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ business.location }}
                </div>
                <div class="card-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ business.hours }}
                </div>
                <div class="card-rating">
                  <div class="stars">{{ getStarsDisplay(business.rating) }}</div>
                  <span class="rating-count">({{ business.ratingCount }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Food Categories Section -->
      <section class="businesses-section" v-if="false">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Food Categories</h2>
            <NuxtLink to="/categories" class="see-all">See All</NuxtLink>
          </div>
  
          <div class="business-cards category-cards">
            <div 
              v-for="(category, index) in foodCategories" 
              :key="'category-' + index" 
              class="business-card category-card"
              @click="goToCategory(category.slug)"
            >
              <img :src="category.image" :alt="category.name" class="category-image">
              <div class="card-content">
                <h3 class="card-title">{{ category.name }}</h3>
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
    name: 'ShopHomePage',
    mounted() {
        this.getUserLocation()
        this.getRecentlyVisitedBusinesses();
    },
    
    data() {
      return {
        payload: {
            latitude: null,
            longitude: null,
            accuracy: null,
            timestamp: null
        },
        
        locationStatus: {
            isLoading: false,
            error: null,
            message: ''
        },
        searchQuery: '',
        recently_visited: [],
        recentlyVisited: [
          {
            id: 'cozy-kitchen',
            name: 'The Cozy Kitchen',
            category: 'Restaurant',
            image: 'https://via.placeholder.com/400x250?text=Restaurant',
            location: 'Yaba, Lagos',
            hours: '8:00 AM - 10:00 PM',
            rating: 4,
            ratingCount: 126,
            lastVisited: '2 days ago'
          },
          {
            id: 'morning-brew',
            name: 'Morning Brew Coffee',
            category: 'Cafe',
            image: 'https://via.placeholder.com/400x250?text=Cafe',
            location: 'Ikeja, Lagos',
            hours: '7:00 AM - 8:00 PM',
            rating: 5,
            ratingCount: 94,
            lastVisited: 'Yesterday'
          },
          {
            id: 'street-bites',
            name: 'Street Bites',
            category: 'Food Truck',
            image: 'https://via.placeholder.com/400x250?text=FoodTruck',
            location: 'Lekki, Lagos',
            hours: '11:00 AM - 9:00 PM',
            rating: 4,
            ratingCount: 78,
            lastVisited: 'Today'
          },
          {
            id: 'sweet-treats',
            name: 'Sweet Treats Bakery',
            category: 'Bakery',
            image: 'https://via.placeholder.com/400x250?text=Bakery',
            location: 'Surulere, Lagos',
            hours: '7:30 AM - 7:00 PM',
            rating: 5,
            ratingCount: 152,
            lastVisited: '5 days ago'
          }
        ],
        popularBusinesses: [
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
            id: 'frosty-delights',
            name: 'Frosty Delights',
            category: 'Ice Cream',
            image: 'https://via.placeholder.com/400x250?text=IceCream',
            location: 'Lekki, Lagos',
            hours: '11:00 AM - 9:00 PM',
            rating: 5,
            ratingCount: 193
          },
          {
            id: 'smokeys-grill',
            name: 'Smokey\'s Grill House',
            category: 'BBQ',
            image: 'https://via.placeholder.com/400x250?text=BBQ',
            location: 'Ikeja, Lagos',
            hours: '12:00 PM - 10:00 PM',
            rating: 4,
            ratingCount: 176
          }
        ],
        foodCategories: [
          {
            name: 'Local Cuisine',
            slug: 'local-cuisine',
            image: 'https://via.placeholder.com/150x150?text=Local'
          },
          {
            name: 'Fast Food',
            slug: 'fast-food',
            image: 'https://via.placeholder.com/150x150?text=Fastfood'
          },
          {
            name: 'Chinese',
            slug: 'chinese',
            image: 'https://via.placeholder.com/150x150?text=Chinese'
          },
          {
            name: 'Pizza',
            slug: 'pizza',
            image: 'https://via.placeholder.com/150x150?text=Pizza'
          },
          {
            name: 'Seafood',
            slug: 'seafood',
            image: 'https://via.placeholder.com/150x150?text=Seafood'
          },
          {
            name: 'Desserts',
            slug: 'desserts',
            image: 'https://via.placeholder.com/150x150?text=Desserts'
          }
        ]
      }
    },

    computed: {
      recentlyVisitedBusinessIds() {
        try {
            let recently_visited = [];
            let temp = window.localStorage.getItem('recently_visited');

            if (temp) {
              recently_visited = JSON.parse(temp)
            }


          //alert(JSON.stringify(recently_visited))

           return recently_visited


          }catch(e) {
           // alert(e)
            console.log(e)
          }
        }
    },
    
    methods: {
      getRecentlyVisitedBusinesses() {
        if (this.recentlyVisitedBusinessIds?.length) {
          //alert(this.recentlyVisitedBusinessIds)
          this.$api.get('/search/businesses?slugs=' + this.recentlyVisitedBusinessIds.join(',') ).then(resp=> {
            this.recently_visited = resp.data.data.list
          })
        }
      },
      searchBusinesses() {
        if (this.searchQuery.trim()) {
          // In a real app, this would navigate to search results
          // with the query as a parameter
          this.$router.push(`/search?q=${encodeURIComponent(this.searchQuery.trim())}`)
        }
      },
      
      goToBusiness(id) {
        this.$router.push(`/store/${id}`)
      },
      
      goToCategory(slug) {
        this.$router.push(`/category/${slug}`)
      },
      
      getStarsDisplay(rating) {
        // Convert numeric rating to star display
        const fullStars = Math.floor(rating)
        const halfStar = rating % 1 >= 0.5
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
        
        let stars = '★'.repeat(fullStars)
        if (halfStar) stars += '½'
        stars += '☆'.repeat(emptyStars)
        
        return stars
      },

      getUserLocation() {
    // Reset location status
    this.locationStatus = {
      isLoading: true,
      error: null,
      message: 'Requesting your location...'
    };
    
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      this.locationStatus.isLoading = false;
      this.locationStatus.error = 'Geolocation is not supported by your browser';
      return;
    }
    
    // Get current position with high accuracy
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        this.payload.latitude = position.coords.latitude;
        this.payload.longitude = position.coords.longitude;
        this.payload.accuracy = position.coords.accuracy;
        this.payload.timestamp = position.timestamp;
        
        this.locationStatus.isLoading = false;
        this.locationStatus.message = 'Location successfully acquired';
        
        // You can call other methods here that depend on location data
        this.findNearbyBusinesses();
      },
      // Error callback
      (error) => {
        this.locationStatus.isLoading = false;
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            this.locationStatus.error = 'Location access was denied by the user';
            break;
          case error.POSITION_UNAVAILABLE:
            this.locationStatus.error = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            this.locationStatus.error = 'The request to get user location timed out';
            break;
          default:
            this.locationStatus.error = 'An unknown error occurred';
            break;
        }
      },
      // Options
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  },
  
  /**
   * Example method that uses location data
   * (Replace with your actual implementation)
   */
  findNearbyBusinesses() {
    console.log('Finding businesses near:', this.payload.latitude, this.payload.longitude);
    // Your implementation to find nearby businesses using the coordinates
    // For example, make an API call to your backend
    
    // this.$api.get('/nearby-businesses', {
    //   params: {
    //     lat: this.payload.latitude,
    //     lng: this.payload.longitude,
    //     radius: 5 // km
    //   }
    // })
    // .then(response => {
    //   // Process nearby businesses
    // });
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
  .shop-homepage {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: $charcoal;
    line-height: 1.6;
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
      
      &.active {
        color: $primary;
        font-weight: 600;
      }
    }
  }
  
  // Hero Section
  .hero {
    background-color: white;
    padding: 60px 0;
    text-align: center;
    
    h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 16px;
      color: $charcoal;
      font-family: Poppins, sans-serif !important;
    }
    
    p {
      font-size: 18px;
      color: $faint;
      max-width: 600px;
      margin: 0 auto 40px;
    }
  }
  
  // Search Section
  .search-container {
    max-width: 600px;
    margin: 0 auto;
    position: relative;
  }
  
  .search-input {
    width: 100%;
    padding: 16px 24px;
    font-size: 16px;
    border: 1px solid $border-grey;
    border-radius: 12px;
    background-color: $input-background;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
    
    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: 0 6px 16px rgba(229, 57, 69, 0.1);
    }
  }
  
  .search-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 18px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: $deep-primary;
    }
  }
  
  // Business Sections
  .businesses-section {
    padding: 40px 0;
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
    
    &.category-cards {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
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
  
  .category-card {
    text-align: center;
    
    .category-image {
      height: 150px;
      width: 150px; 
      border-radius: 50%;
      margin: 0 auto;
      object-fit: cover;
    }
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
  
  .recently-viewed-tag {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
  }
  
  // Empty state
  .empty-state {
    text-align: center;
    padding: 40px 0;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    
    svg {
      width: 80px;
      height: 80px;
      color: $secondary-light;
      margin-bottom: 16px;
    }
    
    h3 {
      font-size: 18px;
      color: $charcoal;
      margin-bottom: 8px;
    }
    
    p {
      font-size: 14px;
      color: $faint;
      max-width: 300px;
      margin: 0 auto;
    }
  }
  
  // Responsive Adjustments
  @media (max-width: 768px) {
    .hero {
      padding: 40px 0;
      
      h1 {
        font-size: 26px;
      }
      
      p {
        font-size: 16px;
      }
    }
    
    .business-cards {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
    
    .search-button {
      padding: 8px 12px;
      font-size: 14px;
    }
    
    .search-input {
      padding: 14px 16px;
    }
    
    .business-cards {
      grid-template-columns: 1fr;
    }
  }
  </style>