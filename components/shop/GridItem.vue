<template>
    <div class="item" :class="[isInCart? 'in-cart': '']" @click="$emit('onSelect', product)">
        <div class="thumbnail">
            <img :src="product.thumbnail || 'https://hunanchinesefoodwhitby.com/img/placeholders/comfort_food_placeholder.png'">
        
            <div class="quantity" @click.stop>
                <button class="flex flex-center-x flex-center-y" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" @click="addToCart" v-if="!isInCart" :style="{'backgroundColor': styling?.primary_color ? styling.primary_color : 'black', 'color' :styling?.text_on_primary ? styling?.text_on_primary : 'white'}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 20C10.5 20.3978 10.658 20.7794 10.9393 21.0607C11.2206 21.342 11.6022 21.5 12 21.5C12.3978 21.5 12.7794 21.342 13.0607 21.0607C13.342 20.7794 13.5 20.3978 13.5 20V13.5H20C20.3978 13.5 20.7794 13.342 21.0607 13.0607C21.342 12.7794 21.5 12.3978 21.5 12C21.5 11.6022 21.342 11.2206 21.0607 10.9393C20.7794 10.658 20.3978 10.5 20 10.5H13.5V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V10.5H4C3.60218 10.5 3.22064 10.658 2.93934 10.9393C2.65804 11.2206 2.5 11.6022 2.5 12C2.5 12.3978 2.65804 12.7794 2.93934 13.0607C3.22064 13.342 3.60218 13.5 4 13.5H10.5V20Z" :fill="iconColor"/>
                        </svg>
                        
                </button>

                <template v-else>
                    <div style="display: flex; width: 100%; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" :style="{'backgroundColor': styling?.primary_color ? styling.primary_color : 'black', }">

                        <button class="flex flex-center-x flex-center-y" @click="decrease">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" :fill="iconColor"/>
                                </svg>
                                
                        </button>
                        <input :value="isInCart.quantity" @input="handleQuantity($event)">
                        <button class="flex flex-center-x flex-center-y" @click="increase">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5 20C10.5 20.3978 10.658 20.7794 10.9393 21.0607C11.2206 21.342 11.6022 21.5 12 21.5C12.3978 21.5 12.7794 21.342 13.0607 21.0607C13.342 20.7794 13.5 20.3978 13.5 20V13.5H20C20.3978 13.5 20.7794 13.342 21.0607 13.0607C21.342 12.7794 21.5 12.3978 21.5 12C21.5 11.6022 21.342 11.2206 21.0607 10.9393C20.7794 10.658 20.3978 10.5 20 10.5H13.5V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V10.5H4C3.60218 10.5 3.22064 10.658 2.93934 10.9393C2.65804 11.2206 2.5 11.6022 2.5 12C2.5 12.3978 2.65804 12.7794 2.93934 13.0607C3.22064 13.342 3.60218 13.5 4 13.5H10.5V20Z" :fill="iconColor"/>
                                </svg>
                                
                        </button>

                    </div>
                </template>
            </div>
        </div>

        <div class="padding-8-x flex space-between" style="margin: 5px 0;">
            <p class="name">{{product.name}}</p>

            <template class="" v-if="!isDeal">

                <p class="price">{{'NGN' | currencySymbol }}{{product.unitprice | money}}</p>

            </template>
            <template v-else>
                <div>

                    <p class="price golden-price">{{'NGN' | currencySymbol }}{{product.unitprice | money}}</p>
                    <p class="price strikethrough">{{"NGN" | currencySymbol}} {{product.original_price | money}}</p>
                </div>

            </template>
        </div>

        <div class="padding-8-x">
            <TruncatedText @click.stop color="grey" fontSize="12" limit="50" :text="product.description">
                
            </TruncatedText>
           
        </div>

        <div style="justify-content: flex-end; padding:6px 0px" v-if="false">
            <button @click="$emit('onSelect', product)" style="width: 100%;font-size: 16px; background-color: white; color: black; border: 1px solid black; font-weight:500; border-radius: 20px; padding: 8px 16px">Select</button>
        </div>
    </div>
</template>


<script>
import TruncatedText from '../text/TruncatedText.vue';
import {mapGetters} from 'vuex'
export default {
    props: ['product', 'styling'],
    data() {
        return {
            quantity: 1,
        };
    },
    computed: {
        ...mapGetters('shop', ['cart']),
        isDeal() {
            return this.product.is_deal
        },
        iconColor() {
            if (this.styling) {
                return this.styling.text_on_primary 
            }

            return "white"
        },
        isInCart() {
            return this.cart.find(item => item.id === this.product.id)

        }
    },
    watch: {
        quantity(value) {
            this.$store.dispatch('shop/setItemQuantity', {id: this.product.id, quantity: value})
        }
    },
    methods: {
        handleQuantity($evt) {
           let value = $evt?.target?.value;
           this.$store.dispatch('shop/setItemQuantity', value)
        },
        addToCart() {
            if (!this.product.meta) {
                this.$store.dispatch('shop/addToCart', {...this.product, quantity: 1})
            }
            else {
                this.$emit('onSelect', this.product)
            }
        },
        decrease() {
            this.$store.dispatch('shop/decreaseItemQuantity', this.product.id)
        },
        increase() {
            this.$store.dispatch('shop/increaseItemQuantity', this.product.id)
        }
    },
    components: { TruncatedText }
}
</script>

<style lang="scss" scoped>
* {
    font-family: "Inter", sans-serif;
}
.item {
    width: 100%;
    flex-direction: column;
    background-color: white;
    overflow: hidden;
    padding: 16px;
    z-index: 0;
}

.quantity {
    position: absolute;
    right: 0;
    bottom: 0;
    input {
        width: 50px;
        text-align: center;
    }
    button{
        height: 30px;
        width: 30px;
        text-align: center;

        
    }
}

.in-cart {
    background-color: whitesmoke !important;
}

.thumbnail {
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
        overflow: hidden;

    }
}

.name {
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
}


.price {
    font-weight: 500;
    white-space: nowrap;
    text-align: right;
}

.golden-price {
    background-color: gold;
    padding: 2px 8px;
    border-radius: 5px;
    font-weight: 700;
}

.strikethrough {
    text-decoration: line-through;
}
</style>