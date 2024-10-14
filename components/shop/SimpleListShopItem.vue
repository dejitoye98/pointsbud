<template>
    <div>
        <div class="item" @click="expanded = !expanded">

            <div class="item__container">

                <div class="gap-1 flex flex-center-y">
                    <template v-if="item.thumbnail || item.description">
    
    
                        <svg v-if="!expanded" style="min-width: 12px;" width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3333 10L8.33325 5L7.15825 6.175L10.9749 10L7.15825 13.825L8.33325 15L13.3333 10Z" fill="#636363"/>
                        </svg>
        
                        <svg  style="min-width: 12px;" v-else width="12" height="12" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_526_3)">
                            <path d="M14.5167 2.04332L15.4 2.92749L10.5858 7.74332C10.5087 7.82095 10.417 7.88256 10.3159 7.9246C10.2149 7.96664 10.1065 7.98828 9.99709 7.98828C9.88765 7.98828 9.77929 7.96664 9.67825 7.9246C9.57721 7.88256 9.48548 7.82095 9.40834 7.74332L4.59167 2.92749L5.47501 2.04416L9.99584 6.56416L14.5167 2.04332Z" fill="black"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_526_3">
                            <rect width="10" height="20" fill="white" transform="matrix(0 1 -1 0 20 0)"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </template>
                        

                        
                    <p class="item__name">{{item.name}}</p>
                </div>
        
                <div style="justify-content: flex-end; width: 100%" class="flex gap-2 flex-center-y">
                    
                    <div v-if="item.unitprice">
                        {{ "NGN" | currencySymbol }}{{ item.unitprice }}
                    </div>
    
                    <div class="flex gap-2" v-else>
                        <!-- 
                        <div>{{ "NGN" | currencySymbol }}{{getPriceRanges(4000).lowerRange}}  </div>
                        <div> - </div>
                        <div> {{ "NGN" | currencySymbol }}{{getPriceRanges(4500).upperRange}} </div>
                        -->

                        
                    </div>
                    <div v-if="!isInCart" >
                        <button class="quantity-choose" @click.stop="addToCart">+</button>
                    </div>
                    <div v-else class="flex gap-2">
                        <button class="quantity-choose" @click.stop="decreaseQuantity">-</button>
                        <input type="text" class="quantity-input" :value="isInCart.quantity" @change="setQuantity">
                        <button class="quantity-choose" @click.stop="increaseQuantity">+</button>


                    </div>
                </div>
            </div>
        </div>

        <div class="expanded padding-16" v-if="expanded">
            <div v-if="item.thumbnail || item.description" class="flex gap-8">
                <img class="thumbnail" :src="item.thumbnail | getFoodImage">
                <div class="flex-col">
                    <p>{{item.description}}</p>
                    <a style="color: #1E88E5" :href="'https://www.google.com/search?q=' + item.name" rel="__blank">View on Google</a>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    
    props: ['item'],
    data() {
        return {
            expanded: false,
        }
    },
    methods: {
    getPriceRanges(itemPrice) {
            let lowerRange, upperRange, interval;

            // Determine the interval based on the magnitude of the item price
            if (itemPrice < 1000) { // For prices in the hundreds
                interval = 50;
            } else if (itemPrice < 10000) { // For prices in the thousands
                interval = 500;
            } else if (itemPrice < 100000) { // For prices in the tens of thousands
                interval = 5000;
            } else if (itemPrice < 1000000) { // For prices in the hundreds of thousands
                interval = 50000;
            } else { // For prices in the millions and above
                interval = 500000;
            }

            // Calculate the lower range as the nearest lower multiple of the interval minus one interval
            lowerRange = Math.floor(itemPrice / interval) * interval - interval;
            // Calculate the upper range as the nearest lower multiple of the interval plus one interval
            upperRange = lowerRange + interval * 2; 

            return {
                lowerRange: lowerRange,
                upperRange: upperRange,
            };
        },   
        generateRandomThreeDigitNumber() {
            return Math.floor(Math.random() * 9) * 100 + 100; // Generates a number like 100, 200, ..., 900
        },

        priceUpperBound(price) {
            return 1000  + (price * 0.15);
        },

        priceLowerBound(price) {
            return 1000  - (price * 0.15);
        },
        decreaseQuantity() {
            if (this.isInCart.quantity) {
                this.$store.dispatch('shop/decreaseItemQuantity', this.item.id)

                
            }
        },
        setQuantity($evt) {
            const value = $evt?.target?.value;
            if (value) {
                this.$store.dispatch('shop/setItemQuantity', {
                    id: this.item.id, 
                    quantity: value
                })
            }
        },
        increaseQuantity() {
            this.$store.dispatch('shop/increaseItemQuantity', this.item.id)


        },
        addToCart() {
            if (!this.isInCart) {
                this.$store.dispatch('shop/addToCart', {
                    ...this.item,
                    quantity: 1,
                    
                })

            }
        },
    },
    computed: {
        ...mapGetters('shop', ['cart']),
        isInCart(){
            return this.cart.find(i => i.id === this.item.id)
        }
    
    }
}
</script>

<style lang="scss" scoped>

* {
    font-family: "Inter", sans-serif !important;
}
.quantity-choose {
    border-radius: 100%;
    height: 25px;
    width: 25px;
    color: black;
    font-weight: 700;
    background-color: $border-grey;
    display: flex;
    align-products: center;
    justify-content: center;
}


.quantity-input {
    width: 20px;
    padding: 2px;
    border: 1px $border-grey solid;
}
.thumbnail {
    width: 150px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
}


.item {
    //padding: 16px;
    display: flex;
    font-size: 14px;
    color: $charcoal !important;
    font-weight: 400;
    background-color: white;
    //padding: 8px 0px 8px 16px;
    border-bottom: 1px solid $border-grey;

    &__container {
        display: grid;
        padding: 8px 10px;
        grid-template-columns: 65% 30%;
        justify-content: space-between;
        //border: 1px solid grey;
        width: 100%;
    }

    &__name {
        font-weight: 500 !important;
    }

}
</style>