<template>
    <div class="page">
        <div class="page__container">

            <div class="products">

                <div class="products__container" v-if="array_layout">

                    <div v-for="colIndex in num_of_columns" :key="colIndex - 1">
                        <div v-for="rowIndex in num_of_rows" :key="rowIndex - 1">
                            <div 
                                class="product" 
                                v-if="array_layout[colIndex - 1] && array_layout[colIndex - 1][rowIndex - 1]"
                                :product="array_layout[colIndex - 1][rowIndex - 1]"
                            >
                                <div class="image">
                                    <img :src="array_layout[colIndex - 1][rowIndex - 1].thumbnail" alt="Product Image">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div class="product" v-for="(product, index) in products">
                        <div class="image">
                            <img :src="product.thumbnail">
                        </div>
                        <div>
                            <button>Change</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        
    </div>


</template>

<script>
export default {
    data() {
        return {
            products: [],
            num_of_rows: 2,
            //num_of_columns:  20,
            array_layout: []
        }
    },
    created() {
        this.getProducts()
    },
    methods: {
        async preloadItems() {
            // make all items into menu
            let array = [];
            let current_array =[]
            
            for(let item of this.products) {
                if (current_array.length == 2) {
                    array.push(current_array);
                    current_array = [];
                }
                current_array.push(item)
            
            }

            this.array_layout = array;
           // alert(JSON.stringify(this.array_layout))
        },

        async getProducts() {
            const response = await this.$api.get('/menu/' + 'myfoodbyhilda');
            this.products = response.data.data.business.products;
            //alert(this.products)
            this.preloadItems()
            
        }
    },
    computed: {
        num_of_columns() {
            if (this.products.length > 0 ) {
                return (this.products.length) / 2
            }
            return 2
        },
        
    }
}
</script>

<style lang="scss" scoped>
.products {
    &__container {
        display: flex;

    }

}
.product {
    width: 150px;
    height: 200px;
    //border: 1px solid grey;
    
    .image {
        border: 1px solid pink;
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        //height: 100px;
    }
    
}
</style>