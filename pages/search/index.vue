<!-- pages/search.vue -->
<template>
    <div class="search-results-page">
      <header>
        <div class="container">
          <div class="header-content">
            <div class="logo">
              <Logo></Logo>
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
  
      <section class="search-section">
        <div class="container">
          <div class="search-container">
            <input 
              type="text" 
              class="search-input" 
              placeholder="Enter business name or serial number..."
              v-model="searchQuery"
              @keyup.enter="performSearch"
            >
            <button class="search-button" @click="performSearch">Search</button>
          </div>
          
          <div class="search-info">
            <h1>Search Results for "{{ displayedQuery }}"</h1>
            <p v-if="isLoading">Searching...</p>
            <p v-else-if="searchResults.length === 0">No results found for "{{ displayedQuery }}"</p>
            <p v-else>Found {{ searchResults.length }} results</p>
          </div>
        </div>
      </section>
  
     
      <!-- Loading indicator -->
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
      </div>
  
      <!-- Search Results -->
      <section v-else class="results-section">
        <div class="container">
          <div v-if="filteredResults.length === 0" class="empty-state">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 15.5L19 19M5 11a6 6 0 1012 0 6 6 0 00-12 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h3>No results found</h3>
            <p>Try adjusting your search or filters to find what you're looking for</p>
          </div>
  
          <div v-else class="business-cards">
            <div 
              v-for="(business, index) in filteredResults" 
              :key="'result-' + index" 
              class="business-card"
              @click="goToBusiness(business.slug)"
            >
              <img :src="business.logo" :alt="business.name" class="card-image">
              <div class="card-content">
                <span class="card-category">{{ business.business_type || 'business' }}</span>
                <h3 class="card-title">{{ business.name }}</h3>
                <div class="card-info serial-number" v-if="business.serial_no">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M8 10h8M8 14h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <span>Serial #: {{ business.serial_no }}</span>
                </div>
                <div class="card-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ business.address || '-'}}
                </div>
                <div class="card-info">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ business.hours || '-' }}
                </div>
                <div class="card-rating">
                  <div class="stars">{{ getStarsDisplay(5) }}</div>
                  <span class="rating-count">({{ 26 }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Pagination -->
      <section class="pagination-section" v-if="filteredResults.length > 0">
        <div class="container">
          <div class="pagination">
            <button 
              class="pagination-button" 
              :disabled="currentPage === 1" 
              @click="changePage(currentPage - 1)"
            >
              Previous
            </button>
            
            <div class="page-numbers">
              <button 
                v-for="page in totalPages" 
                :key="page" 
                class="page-number" 
                :class="{ active: page === currentPage }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              class="pagination-button" 
              :disabled="currentPage === totalPages" 
              @click="changePage(currentPage + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </section>
  
      <app-footer />
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchResultsPage',
    
    data() {
      return {
        searchQuery: '',
        displayedQuery: '',
        isLoading: true,
        searchResults: [],
        currentPage: 1,
        resultsPerPage: 8,
        filters: {
          category: '',
          location: '',
          rating: '0'
        },
        
        // This would typically come from an API in a real application
        mockSearchData: [
          {
            id: 'cozy-kitchen',
            name: 'The Cozy Kitchen',
            serialNo: 'BIZ10045',
            category: 'Restaurant',
            image: 'https://via.placeholder.com/400x250?text=Restaurant',
            location: 'Yaba, Lagos',
            hours: '8:00 AM - 10:00 PM',
            rating: 4,
            ratingCount: 126
          },
          {
            id: 'morning-brew',
            name: 'Morning Brew Coffee',
            serialNo: 'BIZ10067',
            category: 'Cafe',
            image: 'https://via.placeholder.com/400x250?text=Cafe',
            location: 'Ikeja, Lagos',
            hours: '7:00 AM - 8:00 PM',
            rating: 5,
            ratingCount: 94
          },
          {
            id: 'sweet-treats',
            name: 'Sweet Treats Bakery',
            serialNo: 'BIZ10023',
            category: 'Bakery',
            image: 'https://via.placeholder.com/400x250?text=Bakery',
            location: 'Surulere, Lagos',
            hours: '7:30 AM - 7:00 PM',
            rating: 5,
            ratingCount: 152
          },
          {
            id: 'lagoon-view',
            name: 'Lagoon View Restaurant',
            serialNo: 'BIZ10089',
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
            serialNo: 'BIZ10102',
            category: 'Fast Food',
            image: 'https://via.placeholder.com/400x250?text=FastFood',
            location: 'Yaba, Lagos',
            hours: '8:00 AM - 10:00 PM',
            rating: 4,
            ratingCount: 287
          },
          {
            id: 'mama-kitchen',
            name: 'Mama\'s Kitchen',
            serialNo: 'BIZ10056',
            category: 'Restaurant',
            image: 'https://via.placeholder.com/400x250?text=LocalFood',
            location: 'Yaba, Lagos',
            hours: '9:00 AM - 9:00 PM',
            rating: 4.5,
            ratingCount: 178
          },
          {
            id: 'pizza-masters',
            name: 'Pizza Masters',
            serialNo: 'BIZ10134',
            category: 'Restaurant',
            image: 'https://via.placeholder.com/400x250?text=Pizza',
            location: 'Lekki, Lagos',
            hours: '11:00 AM - 10:00 PM',
            rating: 4,
            ratingCount: 205
          },
          {
            id: 'frosty-delights',
            name: 'Frosty Delights',
            serialNo: 'BIZ10078',
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
            serialNo: 'BIZ10112',
            category: 'BBQ',
            image: 'https://via.placeholder.com/400x250?text=BBQ',
            location: 'Ikeja, Lagos',
            hours: '12:00 PM - 10:00 PM',
            rating: 4,
            ratingCount: 176
          },
          {
            id: 'street-bites',
            name: 'Street Bites',
            serialNo: 'BIZ10091',
            category: 'Food Truck',
            image: 'https://via.placeholder.com/400x250?text=FoodTruck',
            location: 'Lekki, Lagos',
            hours: '11:00 AM - 9:00 PM',
            rating: 4,
            ratingCount: 78
          }
        ]
      }
    },
    
    computed: {
      // Calculate total pages based on filtered results
      totalPages() {
        return Math.ceil(this.filteredResults.length / this.resultsPerPage)
      },
      
      // Get results for current page after filtering
      paginatedResults() {
        const start = (this.currentPage - 1) * this.resultsPerPage
        const end = start + this.resultsPerPage
        return this.filteredResults.slice(start, end)
      },
      
      // Apply filters to search results
      filteredResults() {
        return this.searchResults.filter(business => {
          // Category filter
          if (this.filters.category && business.category !== this.filters.category) {
            return false
          }
          
          // Location filter (check if location includes the selected location)
          if (this.filters.location && !business.location.includes(this.filters.location)) {
            return false
          }
          
          // Rating filter
          if (Number(this.filters.rating) > 0 && business.rating < Number(this.filters.rating)) {
            return false
          }
          
          return true
        })
      }
    },
    
    created() {
        if (this.$route.query) {
            this.searchQuery = this.$route.query.q;
        }
    },
    mounted() {

        //this.searchQuery = query
        this.displayedQuery = this.searchQuery
        this.performSearch()
     
    },
    
    methods: {

        apiPerformSearch() {
            this.isLoading = true
            this.$api.get('/search/businesses?search_term=' + this.searchQuery).then(resp=> {
                this.searchResults = resp.data.data.list;

            }).finally(()=> {
                this.isLoading = false
            })
        },
      // Perform search
      performSearch() {
        this.isLoading = true
        this.displayedQuery = this.searchQuery?.trim() || 'all businesses'
        this.currentPage = 1
        
        this.apiPerformSearch()
          
          // Update route query parameter
          this.$router.push({
            path: '/search',
            query: { q: this.searchQuery }
          })
          
        
      },
      
      // Apply filters
      applyFilters() {
        this.currentPage = 1
      },
      
      // Navigation to business details
      goToBusiness(slug) {
        this.$router.push(`/store/${slug}`)
      },
      
      // Change page
      changePage(page) {
        this.currentPage = page
        // Scroll to top of results
        this.$nextTick(() => {
          const resultsSection = document.querySelector('.results-section')
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' })
          }
        })
      },
      
      // Convert numeric rating to star display
      getStarsDisplay(rating) {
        const fullStars = Math.floor(rating)
        const halfStar = rating % 1 >= 0.5
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
        
        let stars = '★'.repeat(fullStars)
        if (halfStar) stars += '½'
        stars += '☆'.repeat(emptyStars)
        
        return stars
      }
    },
    objectToQueryString(obj) {
            const keyValuePairs = [];
            for (const key of Object.keys(obj)) {
                if (obj.hasOwnProperty(key)) {
                    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
                }
            }
            return keyValuePairs.join('&');
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
  .search-results-page {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: $charcoal;
    line-height: 1.6;
    background-color: #FAFAFA;
    min-height: 100vh;
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
  
  // Search Section
  .search-section {
    background-color: white;
    padding: 30px 0;
    border-bottom: 1px solid $border-grey;
  }
  
  .search-container {
    max-width: 600px;
    margin: 0 auto 20px;
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
  
  .search-info {
    text-align: center;
    
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    
    p {
      color: $faint;
      font-size: 16px;
    }
  }
  
  // Filter Section
  .filter-section {
    background-color: white;
    padding: 20px 0;
    border-bottom: 1px solid $border-grey;
    margin-bottom: 20px;
  }
  
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: flex-end;
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 150px;
    
    label {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: $faint;
    }
    
    select {
      padding: 10px;
      border: 1px solid $border-grey;
      border-radius: 8px;
      background-color: white;
      font-size: 14px;
      color: $charcoal;
      
      &:focus {
        outline: none;
        border-color: $primary;
      }
    }
  }
  
  .filter-button {
    height: 43px; // Match height of selects
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0 18px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: $deep-primary;
    }
  }
  
  // Loading container
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid $secondary-light;
    border-top: 4px solid $primary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  // Results Section
  .results-section {
    padding: 20px 0 40px;
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
    
    &.serial-number {
      background-color: $input-background;
      display: inline-flex;
      padding: 2px 8px;
      border-radius: 4px;
      margin-bottom: 8px;
      font-size: 12px;
      font-family: 'Courier New', monospace;
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
  
  // Empty state
  .empty-state {
    text-align: center;
    padding: 60px 0;
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
  
  // Pagination
  .pagination-section {
    padding: 0 0 40px;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  
  .pagination-button {
    background-color: white;
    border: 1px solid $border-grey;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 14px;
    color: $charcoal;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover:not(:disabled) {
      border-color: $primary;
      color: $primary;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .page-numbers {
    display: flex;
    gap: 5px;
  }
  
  .page-number {
    background-color: white;
    border: 1px solid $border-grey;
    border-radius: 8px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: $charcoal;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      border-color: $primary;
      color: $primary;
    }
    
    &.active {
      background-color: $primary;
      border-color: $primary;
      color: white;
    }
  }
  
  // Responsive Adjustments
  @media (max-width: 768px) {
    .filters {
      flex-direction: column;
      gap: 15px;
    }
    
    .filter-group {
      width: 100%;
    }
    
    .business-cards {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
    
    .search-info h1 {
      font-size: 20px;
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
    
    .page-number {
      width: 32px;
      height: 32px;
    }
  }
  </style>