<template>
  <div class="gourmet-category-selector">
    <!-- Category Navigation Bar -->
    <div 
      class="category-nav"
      :style="{
        borderColor: styling?.primary_color ? `${styling?.primary_color}40` : '#EEEEEE'
      }"
    >
      <!-- All Categories Button -->
      <div 
        class="all-categories-btn"
        @click="show_modal = true"
        :style="{
          backgroundColor: styling?.primary_color ? `${styling?.primary_color}10` : '#F5F5F5'
        }"
      >
        <div class="btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               :style="{ color: styling?.primary_color || '#333333' }">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
        <span class="btn-text">Switch Category</span>
      </div>
      
      <!-- Horizontal Category Scroller -->
      <div class="category-scroll">
        <div 
          v-for="(category, index) in orderedCategories" 
          :key="index"
          class="category-pill"
          :class="{ active: local_category === category.name }"
          @click="changeCategory(category.name)"
          :style="categoryPillStyle(category.name)"
        >
          <span class="category-icon" v-if="getCategoryIcon(category.name)">
          </span>
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>
    </div>

    <!-- Enhanced Next Menu Button -->
    <div class="next-menu-container" v-if="next_segment && segments?.length > 0">
      <button 
        class="next-menu-button" 
        @click="navigateToNextSegment"
        :style="{
          backgroundColor: styling?.primary_color || '#333333',
          color: styling?.text_on_primary || '#FFFFFF'
        }"
      >
        <div class="button-content">
          <span class="menu-name">{{ next_segment }}</span>
          <span class="arrow-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </span>
        </div>
        <div class="wave-animation">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      </button>
    </div>

    <!-- Categories Modal -->
    <div class="category-modal" v-if="show_modal">
      <div class="modal-backdrop" @click="show_modal = false"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>Browse Menu Categories</h3>
          <button class="close-btn" @click="show_modal = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="search-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search categories" v-model="searchTerm">
          </div>
          
          <div class="categories-grid">
            <div 
              v-for="(category, index) in filteredCategories" 
              :key="index"
              class="category-card"
              :class="{ active: local_category === category.name }"
              @click="changeCategory(category.name)"
              :style="categoryCardStyle(category.name)"
            >
              <div class="category-icon" v-if="getCategoryIcon(category.name)">
              </div>
              <span class="category-name">{{ category.name }}</span>
              <span class="item-count">{{ getCategoryItemCount(category) }} items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['categories', 'current_category', 'styling', 'products', 'next_segment', 'segments'],
  data() {
    return {
      show_modal: false,
      local_category: '',
      searchTerm: '',
      isAnimating: false,
      categoryIcons: {
        // Icon definitions (same as before)
        'Appetizers': {
          render(h) {
            return h('svg', {
              attrs: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '20',
                height: '20',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round'
              }
            }, [
              h('path', { attrs: { d: 'M18 8h1a4 4 0 0 1 0 8h-1' } }),
              h('path', { attrs: { d: 'M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z' } }),
              h('line', { attrs: { x1: '6', y1: '1', x2: '6', y2: '4' } }),
              h('line', { attrs: { x1: '10', y1: '1', x2: '10', y2: '4' } }),
              h('line', { attrs: { x1: '14', y1: '1', x2: '14', y2: '4' } })
            ]);
          }
        },
        'Main Course': {
          render(h) {
            return h('svg', {
              attrs: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '20',
                height: '20',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round'
              }
            }, [
              h('path', { attrs: { d: 'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' } }),
              h('path', { attrs: { d: 'M7 2v20' } }),
              h('path', { attrs: { d: 'M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7' } })
            ]);
          }
        },
        'Desserts': {
          render(h) {
            return h('svg', {
              attrs: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '20',
                height: '20',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round'
              }
            }, [
              h('path', { attrs: { d: 'M8 3.5a5.5 5.5 0 0 1 8.7 4.5H21a9 9 0 0 1-18 0h4.3A5.5 5.5 0 0 1 8 3.5z' } }),
              h('path', { attrs: { d: 'M12 12c1.2 0 2.4-.3 3.5-.7' } })
            ]);
          }
        },
        'Drinks': {
          render(h) {
            return h('svg', {
              attrs: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '20',
                height: '20',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round'
              }
            }, [
              h('path', { attrs: { d: 'M8 2h8l4 7H4l4-7z' } }),
              h('path', { attrs: { d: 'M2 9h20v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8V9z' } }),
              h('path', { attrs: { d: 'M6 14a6 6 0 0 0 12 0' } })
            ]);
          }
        },
        'default': {
          render(h) {
            return h('svg', {
              attrs: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '20',
                height: '20',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round'
              }
            }, [
              h('circle', { attrs: { cx: '12', cy: '12', r: '10' } }),
              h('path', { attrs: { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' } }),
              h('line', { attrs: { x1: '12', y1: '17', x2: '12.01', y2: '17' } })
            ]);
          }
        }
      }
    }
  },
  computed: {
    orderedCategories() {
      if (!this.categories) return [];
      
      // Sort categories by priority
      return [...this.categories].sort((a, b) => {
        const priorityA = a.priority !== undefined ? a.priority : 999;
        const priorityB = b.priority !== undefined ? b.priority : 999;
        return priorityA - priorityB;
      });
    },
    filteredCategories() {
      if (!this.searchTerm) return this.categories;
      
      return this.categories.filter(category => 
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    primaryColor() {
      return this.styling?.primary_color || '#FF6B6B';
    }
  },
  created() {
    if (this.current_category) {
      this.local_category = this.current_category;
    }
  },
  methods: {
    changeCategory(category_name) {
      this.$emit('changeCategory', category_name);
      this.show_modal = false;
      this.local_category = category_name;
      this.searchTerm = '';
    },
    getCategoryIcon(categoryName) {
      // Return specific icon if available, otherwise return default
      return this.categoryIcons[categoryName] || this.categoryIcons.default;
    },
    getCategoryItemCount(category) {
      // If products are provided via props
      if (this.products) {
        return this.products.filter(p => p.category_id === category.id).length;
      }
      
      // Default value
      return Math.floor(Math.random() * 15) + 3; // Random number between 3-18 for demo
    },
    categoryPillStyle(categoryName) {
      const isActive = this.local_category === categoryName;
      
      return {
        backgroundColor: isActive ? this.primaryColor : 'transparent',
        color: isActive ? 'white' : this.primaryColor,
        borderColor: this.primaryColor
      };
    },
    categoryCardStyle(categoryName) {
      const isActive = this.local_category === categoryName;
      
      return {
        backgroundColor: isActive ? `${this.primaryColor}10` : 'white',
        borderColor: isActive ? this.primaryColor : '#EEEEEE'
      };
    },
    navigateToNextSegment() {
      if (this.isAnimating) return;
      
      this.isAnimating = true;
      
      // Add active class for animation
      const button = document.querySelector('.next-menu-button');
      button.classList.add('active');
      
      // Wait for animation to complete, then navigate
      setTimeout(() => {
        this.$emit('changeSegment', this.next_segment);
        
        // Reset animation state after a delay
        setTimeout(() => {
          button.classList.remove('active');
          this.isAnimating = false;
        }, 300);
      }, 800);
    }
  }
}
</script>

<style lang="scss" scoped>
// Color Variables
$primary: #FF6B6B;
$primary-light: rgba(255, 107, 107, 0.1);
$primary-medium: rgba(255, 107, 107, 0.4);
$text-dark: #333333;
$text-medium: #666666;
$text-light: #999999;
$white: #FFFFFF;
$off-white: #F9F9F9;
$light-gray: #F5F5F5;
$border-color: #EEEEEE;

// Font
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

// Main Container
.gourmet-category-selector {
  position: relative;
  font-family: 'Poppins', sans-serif;
}

// Category Navigation Bar
.category-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  position: relative;
  overflow-x: auto;
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE & Edge
  
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 40px;
    background: linear-gradient(to right, transparent, $white);
    pointer-events: none;
  }
}

// All Categories Button
.all-categories-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 50px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  .btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .btn-text {
    font-weight: 600;
    font-size: 14px;
  }
}

// Category Scroll
.category-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

// Category Pill
.category-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 50px;
  font-weight: 500;
  font-size: 14px;
  border: 1.5px solid;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }
  
  &.active {
    font-weight: 600;
    box-shadow: 0 3px 10px rgba($primary, 0.2);
  }
  
  .category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .category-name {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

// Enhanced Next Menu Button
.next-menu-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  padding: 12px 0;
  z-index: 90;
  pointer-events: none;
}

.next-menu-button {
  padding: 0;
  width: 70%;
  max-width: 320px;
  height: 40px;
  border: none;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: auto;
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    
    .arrow-icon {
      transform: translateX(3px);
    }
  }
  
  &:active {
    transform: translateY(2px) scale(0.98);
  }
  
  &.active {
    .wave-animation {
      opacity: 1;
    }
    
    .wave {
      animation-play-state: running;
    }
    
    .button-content {
      animation: textPulse 0.8s ease;
    }
  }
  
  .button-content {
    position: relative;
    z-index: 2;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  .menu-name {
    position: relative;
    
    &:after {
      content: 'menu';
      margin-left: 5px;
      opacity: 0.8;
    }
  }
  
  .arrow-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }
  
  .wave-animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    overflow: hidden;
  }
  
  .wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform-origin: center center;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 40%;
    animation: waveAnimation 2s linear infinite;
    animation-play-state: paused;
    
    &:nth-child(2) {
      animation-delay: 0.5s;
    }
    
    &:nth-child(3) {
      animation-delay: 1s;
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

// Categories Modal (same as before)
.category-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    animation: fadeIn 0.2s ease;
  }
  
  .modal-content {
    position: relative;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    background-color: $white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  .modal-header {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $border-color;
    
    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: $text-dark;
    }
    
    .close-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $light-gray;
      border: none;
      color: $text-medium;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background: $off-white;
        color: $text-dark;
        transform: rotate(90deg);
      }
    }
  }
  
  .modal-body {
    padding: 20px;
    overflow-y: auto;
    flex: 1;
  }
}

// Search Container
.search-container {
  position: relative;
  margin-bottom: 20px;
  
  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: $text-medium;
  }
  
  input {
    width: 100%;
    padding: 14px 14px 14px 42px;
    border: 1px solid $border-color;
    border-radius: 50px;
    font-size: 14px;
    color: $text-dark;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba($primary, 0.1);
    }
    
    &::placeholder {
      color: $text-light;
    }
  }
}

// Categories Grid
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

// Category Card
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 15px;
  border-radius: 12px;
  border: 1.5px solid $border-color;
  background-color: $white;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: $primary-medium;
  }
  
  &.active {
    border-color: $primary;
    background-color: $primary-light;
  }
  
  .category-icon {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    background-color: $light-gray;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    color: $primary;
  }
  
  .category-name {
    font-weight: 600;
    font-size: 14px;
    color: $text-dark;
    margin-bottom: 4px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .item-count {
    font-size: 12px;
    color: $text-light;
  }
}

// Animations
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes waveAnimation {
  0% {
    transform: rotate(0) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) scale(1.5);
    opacity: 0;
  }
}

@keyframes textPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

// Media Queries
@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
  }
  
  .category-card {
    padding: 15px 10px;
    
    .category-icon {
      height: 40px;
      width: 40px;
      margin-bottom: 8px;
    }
    
    .category-name {
      font-size: 13px;
    }
  }
  
  .modal-content {
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    border-radius: 0;
  }
  
  .next-menu-button {
    width: 85%;
  }
}
</style>