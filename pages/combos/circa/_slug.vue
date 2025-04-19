<template>
    <div>
        <!-- Business information section -->
        <div v-if="business" class="business-header">
            <h1>{{ business.name }}'s</h1>
            <Logo></Logo>
            <!-- Other business information -->
        </div>

        <!-- Product categories section -->
        <div v-if="categories && categories.length" class="categories-container">
            <!-- Category filters -->
        </div>

        <!-- Product combos section -->
        
        <product-combo-card 
            :products="products" 
            :loading_data="loading_data"
            @add-combo="handleAddCombo"
            @change-item="handleChangeItem"
            @remove-item="handleRemoveItem"
            @swap-item="handleSwapItem"
        />

        <!-- Regular products grid -->
        <div v-if="products && products.length" class="products-grid">
            <!-- Individual product cards -->
        </div>

        <!-- Authentication modal -->
        <div v-if="show_auth_modal" class="auth-modal">
            <!-- Auth modal content -->
        </div>
    </div>
</template>


<script>
import ProductComboCard from '../../../components/combos/ProductComboCard.vue';

export default {
    components: {
        ProductComboCard
    },
    async fetch() {
        const response = await this.$api.get('/businesses/store-products?slug=' + 'circa-lagos');
        const { business, products } = response.data.data;
        const categories = business.categories;
        this.business = business;
        this.products = products;
        this.categories = categories;
        this.loading_data = false;
        this.show_auth_modal = false;
    },
    data() {
        return {
            business: null,
            products: [],
            categories: [],
            loading_data: true,
            show_auth_modal: false
        }
    },
    methods: {
        handleAddCombo(combo) {
            // Handle adding combo to cart
            console.log('Adding combo to cart:', combo);
            // Implement your cart logic here
        },
        handleChangeItem({ combo, productIndex }) {
            // Show modal or options to change an item
            console.log('Change item in combo:', combo.combo_name, 'at index:', productIndex);
            // Implement logic to change item
        },
        handleRemoveItem({ combo, productIndex }) {
            // Remove an item from combo
            console.log('Remove item from combo:', combo.combo_name, 'at index:', productIndex);
            // Implement logic to remove item
        },
        handleSwapItem({ combo, productIndex }) {
            // Show options to swap with another product
            console.log('Swap item in combo:', combo.combo_name, 'at index:', productIndex);
            // Implement logic to swap item
        }
    }
}
</script>

<style scoped>
.business-header {
    margin-bottom: 30px;
    display: flex;
    gap: 8px;
    align-items: center;
    font-family: Poppins !important;
    justify-content: center;


    h1 {
        font-family: Poppins !important;
        font-weight: 800;
        font-size: 18px;
    }
}

.categories-container {
    margin-bottom: 20px;
}

.products-grid {
    margin-top: 30px;
}

/* Add your other styles here */
</style>