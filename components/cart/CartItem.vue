<template>
    <div class="item" v-if="item">
        <div class="flex space-between" style="display: flex; flex: 2; justify-content: space-between;">

            <div class="flex gap-2"> 
                <div class="thumbnail">
                    <img :src="item?.thumbnail">
                </div>

                <div>

                    <div>
                        <p style="font-size: 12px;"> {{ item?.name }} x {{item?.quantity}}</p>
                    </div>
                    <div class="quantity-choose">
                        <button @click="decreaseQuantity">
                            -
                        </button>
                        <input :value="item?.quantity" @input="setQuantity">
                        <button @click="increaseQuantity">
                            +
                        </button>
                    </div>

                </div>
                
            </div>
            <div style="flex: 1 !important;">
                <p style="text-align: right; font-size: 12px;" class="bold">{{item.currency || "NGN" | currencySymbol}}{{itemSubtotal | money}}</p>
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
            
        }
    },
    computed: {
        ...mapGetters('shop', ['cart']),
        isInCart(){
            return this.cart.find(i => i.id === this.item.id)
        },
        itemSubtotal() {
            return this.item.unitprice * this.isInCart.quantity
        },
    },
    methods: {
        increaseQuantity() {
            this.$store.dispatch('shop/increaseItemQuantity', this.item.id)

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
    }
}
</script>

<style lang="scss" scoped>

.item {
    padding: 8px;
    border-bottom: 1px solid whitesmoke;
    display: flex;
    justify-content: space-between;
    gap: 8px;
}

.bold {
    font-weight: 600;
    font-size: 16px;
}

.thumbnail {
    min-height: 70px;
        height: 70px;
        width: 70px;
        min-width: 70px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.quantity-choose {
    display: flex;
    gap: 2px;
    input {
        width: 40px;
        border: 1px solid whitesmoke;
        border-radius: 20px;
        text-align: center;
    }
    button {
        border-radius: 999px;
        background-color: lightgray;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        padding: 2px 10px;
    }
}
</style>

