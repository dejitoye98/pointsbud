<template>
    <div>
        <BaseModal v-if="zoom_image" @close="zoom_image = false">
            <template #header>
                <div class="padding-16 space-between flex-center-y flex">
                    <p>{{item.name}}</p>
                   
                    <svg @click="zoom_image=false" style="cursor: pointer;" width="16" height="16" viewBox="0 0 8 8" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
                        <path d="M7 1L1 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
                    </svg>
                </div>
            </template>
            <template #body>
                <div style="height: 100%; width: 100%;">
                    <img style="width: 100%; object-fit: fill" :src="item.thumbnail">

                </div>
            </template>
        </BaseModal>
        <div class="item" @click="expanded = !expanded" :style="{'borderBottom' : expanded? 'none !important' : '#E0E0E0'}">

            <div class="item__container">

                <div class="gap-3 flex flex-center-y full-width">
                    <template v-if="(item.thumbnail || item.description) && false" >

                        <svg v-if="!expanded" style="min-width: 20px;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.33203 14.1663V5.83301L12.4987 9.99967L8.33203 14.1663Z" fill="black"/>
                        </svg>
                        <svg v-else style="min-width: 20px;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.83464 8.33301L14.168 8.33301L10.0013 12.4997L5.83464 8.33301Z" fill="black"/>
                        </svg>
                    </template>
                    <img style="max-height: 50px; max-width: 60px; min-height: 50px; min-width: 60px; height: 50px; width: 60px; object-fit: cover; border-radius: 10px;" loading="lazy" :src="item.thumbnail">

                        

                    <div class="flex flex-col">

                        <p class="item__name single-line-ellipsis">{{item.name}}</p>
                    </div>

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
                <img  @click="zoom_image = true" class="thumbnail" :src="item.thumbnail | getFoodImage">
                <div class="flex-col">
                    <p>{{item.description}}</p>
                    <a style="color: #1E88E5" :href="'https://www.google.com/search?q=' + item.name + ' images'">View on Google</a>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    
    props: ['item', 'parent_expanded'],
    data() {
        return {
            zoom_image:false,
            expanded: false,
        }
    },
    watch: {
        parent_expanded(value) {
            this.expanded = value;
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

p {
    font-size: 16px;
}
.quantity-choose {
    border-radius: 100%;
    height: 25px;
    width: 25px;
    color: black;
    font-weight: 800;
    background-color: $border-grey;
    display: flex;
    align-items: center;
    justify-content: center;
    
}


.quantity-input {
    width: 40px;
    padding: 2px;
    border: 1px $border-grey solid;
    display: flex;
    align-items:center;
    text-align: center;
    border-radius: 5px;
}
.thumbnail {
    min-width:  100px;
    min-height: 100px;
    max-width: 100px;
    max-height: 100px;
    border-radius: 10px;
    object-fit: cover;
}


.expanded {
    border-bottom: 1px solid $border-grey;
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.item {
    //padding: 16px;
    display: flex;
    color: $charcoal !important;
    font-weight: 400;
    background-color: white;
    //padding: 8px 0px 8px 16px;
    border-bottom: 1px solid $border-grey;
   // border:1px solid $border-grey;
    
    &__container {
        display: grid;
        padding: 8px 10px;
        grid-template-columns: 65% 30%;
        justify-content: space-between;
        //border: 1px solid grey;
        width: 100%;
        padding: 10px ;
    }

    &__name {
        font-weight: 400 !important;
        font-size: 13px;
        font-family: "Open Sans", sans-serif;
        width: 50%;

    }
    &__description {
        font-weight: 300 !important;
        font-size: 12px;
        font-family: "Open Sans", sans-serif;
        color: $charcoal;

    }

}
.single-line-ellipsis{
    white-space: nowrap;       /* Prevents text from wrapping to the next line */
    overflow: hidden;          /* Hides overflowing text */
    text-overflow: ellipsis;   /* Adds an ellipsis ("...") to represent the clipped text */
    width: 100%;              /* Set a fixed width to see the effect */
    //border: 1px solid #ccc;
}
</style>