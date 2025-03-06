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
        <span class="btn-text">All Categories</span>
      </div>
      
      <!-- Horizontal Category Scroller -->
      <div class="category-scroll">
        <div 
          v-for="(category, index) in categories" 
          :key="index"
          class="category-pill"
          :class="{ active: local_category === category.name }"
          @click="changeCategory(category.name)"
          :style="categoryPillStyle(category.name)"
        >
          <span class="category-icon" v-if="getCategoryIcon(category.name)">
            <component :is="getCategoryIcon(category.name)" />
          </span>
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>
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
                <component :is="getCategoryIcon(category.name)" />
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
  props: ['categories', 'current_category', 'styling', 'products'],
  data() {
    return {
      show_modal: false,
      local_category: '',
      searchTerm: '',
      categoryIcons: {
        // Common food category icons as Vue components
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
        // Default icon for categories without a specific icon
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

// Categories Modal
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
}
</style>