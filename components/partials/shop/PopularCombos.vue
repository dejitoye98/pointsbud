<template>
  <div class="popular-combos-section">
    <h2 class="section-title">Popular Combinations</h2>
    
    <ManualSlider>
      <div v-for="(combo, index) in popularCombos" 
           :key="combo.id" 
           class="combo-slide-item">
        <PopularComboItem 
          :combo="combo"
          :styling="{ primary_color: '#E53945', text_on_primary: '#FFFFFF' }"
          @onSelect="handleComboSelect"
        />
      </div>
    </ManualSlider>
  </div>
</template>

<script>
import ManualSlider from './ManualSlider.vue';
import PopularComboItem from '../../shop/PopularComboItem.vue';

export default {
  components: {
    ManualSlider,
    PopularComboItem
  },
  data() {
    return {
      popularCombos: [
        // Your combo data from the previous example
        {
          id: "combo-1",
          name: "Family Feast Combo",
          thumbnail: "https://example.com/images/family-feast.jpg",
          availability: "available",
          is_featured: true,
          is_top_rated: true,
          order_count: 352,
          unitprice: 5999,
          items_total_price: 7500,
          popularity_score: 95,
          items: [
            { name: "Large Jollof Rice", quantity: 1 },
            { name: "Grilled Chicken", quantity: 2 },
            { name: "Beef Suya", quantity: 1 },
            { name: "Fresh Salad", quantity: 1 },
            { name: "Soft Drinks", quantity: 3 }
          ],
          quantity_available: 10,
          description: "Perfect family meal for 4-5 people."
        },
        {
          id: "combo-2",
          name: "Date Night Special",
          thumbnail: "https://example.com/images/date-night.jpg",
          availability: "available",
          is_featured: false,
          is_top_rated: true,
          order_count: 189,
          unitprice: 4299,
          items_total_price: 5100,
          popularity_score: 88,
          items: [
            { name: "Fried Rice", quantity: 2 },
            { name: "Grilled Tilapia", quantity: 2 },
            { name: "Plantain Chips", quantity: 1 },
            { name: "Chapman Drink", quantity: 2 }
          ],
          quantity_available: 5,
          description: "The perfect romantic dinner for two."
        },
        // Add more items as needed
      ]
    };
  },
  methods: {
    handleComboSelect(combo) {
      // Handle combo selection
      console.log('Selected combo:', combo);
    }
  }
};
</script>

<style scoped>
.popular-combos-section {
  padding: 20px 0;
  background-color: white;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #36454F; /* Charcoal from your colors */
  text-align: center;
}

.combo-slide-item {
  display: inline-block;
  width: 300px;
  vertical-align: top;
  white-space: normal;
}

@media (max-width: 768px) {
  .combo-slide-item {
    width: 250px;
  }
  
  .section-title {
    font-size: 20px;
    margin-bottom: 15px;
  }
}
</style>