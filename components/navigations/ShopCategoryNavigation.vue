<template>
    <div
      class="component"
      :style="{
        background: `linear-gradient(135deg, ${styling?.primary_color || 'whitesmoke'}, #fff)`
      }"
    >
      <BaseModal v-if="show_modal" @close="show_modal = false">
        <template #header>
          <div class="padding-16 modal-header">
            <p>Browse Categories</p>
          </div>
        </template>
  
        <template #body>
          <div class="padding-16">
            <div
              class="category"
              v-for="(category, index) in categories"
              :key="index"
              @click="changeCategory(category.name)"
            >
              <div class="category__container">
                <p>{{ category.name }}</p>
              </div>
            </div>
          </div>
        </template>
      </BaseModal>
      <div
        class="trigger flex flex-center-y flex-center-x padding-16-x padding-16-y"
        @click="show_modal = true"
      >
        <div>
          <p>{{ local_category || 'Category' }} (click to switch)</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['categories', 'current_category', 'local_category'],
    data() {
      return {
        show_modal: false,
        local_category: '',
      }
    },
    created() {
      if (this.current_category) {
        this.local_category = this.current_category
      }
    },
    methods: {
      changeCategory(category_name) {
        this.$emit('changeCategory', category_name)
        this.show_modal = false
        this.local_category = category_name
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  /* Base styling for the modal header */
  .modal-header {
    font-family: 'Poppins', sans-serif !important;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 8px;
  }
  
  /* Main component container */
  .component {
    font-size: 13px;
    background-color: #ffffff;
    font-weight: 600;
    padding: 12px 0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;
  
    &:hover {
      transform: scale(1.01);
    }
  }
  
  /* Category list styling */
  .category {
    margin-bottom: 8px;
  
    &__container {
      padding: 12px 16px;
      background-color: #f9f9f9;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      transition: background-color 0.3s ease;
      cursor: pointer;
  
      p {
        margin: 0;
        font-size: 14px;
        color: #444;
      }
    }
  
    &:hover .category__container {
      background-color: #f0f0f0;
    }
  }
  
  /* Trigger area styling */
  .trigger {
    background-color: rgba(255, 255, 255, 0.85);
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 12px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  
    p {
      margin: 0;
      font-size: 14px;
      color: #333;
    }
  
    &:hover {
      background-color: #fff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  }
  
  /* Utility classes (if not provided globally) */
  .flex {
    display: flex;
  }
  .flex-center-y {
    align-items: center;
  }
  .flex-center-x {
    justify-content: center;
  }
  .padding-16-x {
    padding-left: 16px;
    padding-right: 16px;
  }
  .padding-16-y {
    padding-top: 16px;
    padding-bottom: 16px;
  }
  </style>
  