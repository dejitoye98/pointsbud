<template>
    <BaseModal @close="$emit('close')">
        <template #header>
            <div class="padding-16">
                <p>Your Cart</p>
            </div>
        </template>

        <template #body>
            <div class="padding-16">
                <div style="margin-bottom: 16px;" class="item" v-for="(item, index) in cart" :key="index">
                    <div class="item__container full-width flex gap-2">
                        <img class="thumbnail" :src="item.thumbnail | getFoodImage">
                        
                        <div class="space-between flex full-width">
                            <div class="flex-col">
                                <p>{{item.name}}</p>
    
                                <div class="quantity gap-1">
                                    <button class="quantity-choose" @click="decreaseQuantity(item)">-</button>
                                    <input style="width: 20px; padding: 2; text-align: center" :value="item.quantity" @click="setQuantity($evt, item)">
                                    <button class="quantity-choose" @click="increaseQuantity(item)">+</button>
                                </div>
                            </div>
    
                            <div>
                                {{ "NGN" | currencySymbol }} {{ item.unitprice * item.quantity }}
                            </div>

                        </div>
                    </div>
                </div>

                <div class="totals">
                    <div class="space-between flex">
                        <div>Sub total</div>
                        <div>{{"NGN" | currencySymbol}} {{cartSubtotal}}</div>
                    </div>
                    <div class="space-between flex bold">
                        <div>Total</div>
                        <div>{{"NGN" | currencySymbol}} {{cartSubtotal}}</div>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    data() {
        return {

        }
    },
    methods: {
        decreaseQuantity(item) {
            this.$store.dispatch('shop/decreaseItemQuantity', item.id)
        },
        increaseQuantity(item) {
            this.$store.dispatch('shop/increaseItemQuantity', item.id)
        },
        setQuantity($evt, item) {
            const value = $evt?.target?.value;
            this.$store.dispatch('shop/setItemQuantity',{id: item.id, quantity: value})
        }
    },
    computed:{
        ...mapGetters('shop', ['cart']),
        cartSubtotal() {
            let sum = 0;
            for (let item of this.cart) {
                const amount = (item.quantity * item.unitprice)
                sum += amount;
            }
            return sum;
        }
    }
}

</script>

<style lang="scss" scoped>

.totals {
    border-top: 1px solid $border-grey;
    padding: 16px 0;
}
.thumbnail {
    height: 80px;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    object-fit: cover;
    border-radius: 5px;
}

.bold {
    font-weight: 700;
}
</style>