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

        <CartModal @close="show_cart_modal = false" v-if="show_cart_modal && cart.length" :business="business"></CartModal>

        <div class="padding-16">
            <div class="removal-indicator">
                <strong>Items in a combo can be removed after adding to cart</strong>
            </div>

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

            <div style="position: fixed; margin-bottom: 16px; bottom: 16px; left:0; display: flex; justify-content: center; z-index: 10; width: 100%" v-if="cart.length > 0">
                <button class="big-btn full-width" style="z-index: 10; width: 90%" @click="showCartModal">Go to Cart ({{"NGN" | currencySymbol}}{{cartTotal | money}})</button>
            </div>
        </div>
    </div>
</template>


<script>
import ProductComboCard from '../../../components/combos/ZzoneProductComboCard.vue';
import {mapGetters} from "vuex"
import CartModal from '../../../components/modals/CartModal.vue';
import mixpanel from 'mixpanel-browser';

export default {
    components: {
        ProductComboCard,
        CartModal
    },
    async fetch() {
        const response = await this.$api.get('/businesses/store-products?slug=' + 'zzone');
        const { business, products } = response.data.data;
        const categories = business.categories;
        this.business = business;
        this.products = products;
        this.categories = categories;
        this.loading_data = false;
        this.show_auth_modal = false;
    },
    computed: {
        ...mapGetters('shop', ['cart']),
        cartTotal() {
            let sum = 0;

            for (let item of this.cart) {
                sum += this.getItemTotal(item);
            }
            
            return sum;
        },
    },
    data() {
        return {
            show_cart_modal: false,
            business: null,
            products: [],
            categories: [],
            loading_data: true,
            show_auth_modal: false
        }
    },
    methods: {
        getItemTotal(item) {
            let result = 0;
        
            if (item) {
                const retrieved_item = this.cart.find(i => i.id === item.id); 
                if (retrieved_item) {
                    
                    let item_total = (retrieved_item.quantity * retrieved_item.unitprice);
                    result += item_total;
                    
                    if (retrieved_item.additions) {
                        for (let addition of retrieved_item.additions) {
                            result += (addition.unitprice * retrieved_item.quantity);
                        }
                    }

                    if (retrieved_item.delivery_pack?.unitprice) {
                        result += retrieved_item.delivery_pack.unitprice;
                    }
                }
            }

            return result;
        },
        showCartModal() {
            this.show_cart_modal = true;
        },
        handleAddCombo(combo) {
            // Handle adding combo to cart
            console.log('Adding combo to cart:', combo);
            mixpanel.track("Combo - clicked on add to cart");
            
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
    },
    watch: {
        loading_data(value) {
            if(!value) {
                this.mixpanel = mixpanel.init('1f580add8d0558ccae5fc19ca5997dab', { debug: false, track_pageview: false });
                mixpanel.track("Combos page viewed");
            }
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
}

.business-header h1 {
    font-family: Poppins !important;
    font-weight: 800;
    font-size: 18px;
}

.categories-container {
    margin-bottom: 20px;
}

.products-grid {
    margin-top: 30px;
}

.removal-indicator {
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 15px;
    text-align: center;
    border-left: 4px solid #007bff;
}

/* Add your other styles here */
</style>