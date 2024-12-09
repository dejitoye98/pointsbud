<template>
    <div class="item" :class="[isInCart? 'in-cart': '']" @click="$emit('onSelect', product)">
        <div class="thumbnail">
            <img :src="product.thumbnail || 'https://hunanchinesefoodwhitby.com/img/placeholders/comfort_food_placeholder.png'">
        
            <div class="quantity" @click.stop>
                <button style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" @click="addToCart" v-if="!isInCart" :style="{'backgroundColor': styling?.primary_color ? styling.primary_color : 'black', 'color' :styling?.text_on_primary ? styling?.text_on_primary : 'white'}">
                    +
                </button>

                <template v-else>
                    <div style="display: flex; width: 100%; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" :style="{'backgroundColor': styling?.primary_color ? styling.primary_color : 'black', 'color' :styling?.text_on_primary ? styling?.text_on_primary : 'white'}">

                        <button @click="decrease">-</button>
                        <input :value="isInCart.quantity" @input="handleQuantity($event)">
                        <button @click="increase">+</button>

                    </div>
                </template>
            </div>
        </div>

        <div class="padding-8-y flex space-between" style="margin: 5px 0;">
            <p class="name">{{product.name}}</p>
            <p class="price">{{'NGN' | currencySymbol }}{{product.unitprice | money}}</p>
        </div>

        <div>
            <TruncatedText color="grey" fontSize="12" limit="50" :text="product.description">
                
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
        isInCart() {
            return this.cart.find(item => item.id === this.product.id)

        }
    },
    watch: {
        quantity(value) {
            this.$store.dispatch('shop/setItemQuantity', value)
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
}
</style>