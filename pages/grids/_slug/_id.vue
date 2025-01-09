<template>

    <div class="page">
        <div class="page__container">

            <div class="header">Select & Pay</div>

            <div class="traysection" v-for="(row, row_index) in gridData">
                <div class="product" :class="[isInCart(product.id) ? 'in-cart' : '']"  v-if="rowHasProduct(row_index) && columnHasProduct(index)"  v-for="(product, index) in gridData[row_index]" :key="index">
                    <div class="product__image">
                        <img  :src="getProduct(product.id)?.thumbnail">
                    </div>

                    <div class="product__details">

                        <div class="product__name">
                            <p>{{getProduct(product.id)?.name}}</p>
                        </div>
                        <div class="">
                            <p class="product__price">
                                {{ "NGN" | currencySymbol }} {{ getProduct(product.id)?.unitprice | money }}
                            </p>
                        </div>
                        <div class="quantity-box">

                            <template v-if="!isInCart(product.id)">

                                <button class="quantity-btn" @click="addToCart(product.id)"> 
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5 20C10.5 20.3978 10.658 20.7794 10.9393 21.0607C11.2206 21.342 11.6022 21.5 12 21.5C12.3978 21.5 12.7794 21.342 13.0607 21.0607C13.342 20.7794 13.5 20.3978 13.5 20V13.5H20C20.3978 13.5 20.7794 13.342 21.0607 13.0607C21.342 12.7794 21.5 12.3978 21.5 12C21.5 11.6022 21.342 11.2206 21.0607 10.9393C20.7794 10.658 20.3978 10.5 20 10.5H13.5V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V10.5H4C3.60218 10.5 3.22064 10.658 2.93934 10.9393C2.65804 11.2206 2.5 11.6022 2.5 12C2.5 12.3978 2.65804 12.7794 2.93934 13.0607C3.22064 13.342 3.60218 13.5 4 13.5H10.5V20Z" fill="white"/>
                                    </svg>
                                        
                                </button> 
                            </template>

                            <template v-else>
                                <div class="grid grid-cols-3 gap-1 space-between">


                                    <button class="quantity-btn" @click="decreaseQuantity(product.id)"> 
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 20C10.5 20.3978 10.658 20.7794 10.9393 21.0607C11.2206 21.342 11.6022 21.5 12 21.5C12.3978 21.5 12.7794 21.342 13.0607 21.0607C13.342 20.7794 13.5 20.3978 13.5 20V13.5H20C20.3978 13.5 20.7794 13.342 21.0607 13.0607C21.342 12.7794 21.5 12.3978 21.5 12C21.5 11.6022 21.342 11.2206 21.0607 10.9393C20.7794 10.658 20.3978 10.5 20 10.5H13.5V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V10.5H4C3.60218 10.5 3.22064 10.658 2.93934 10.9393C2.65804 11.2206 2.5 11.6022 2.5 12C2.5 12.3978 2.65804 12.7794 2.93934 13.0607C3.22064 13.342 3.60218 13.5 4 13.5H10.5V20Z" fill="white"/>
                                        </svg>
                                            
                                    </button> 
                                    <input style="width: 60px; text-align:center" :value="isInCart(product.id)?.quantity" @input="setItemQuantity">
                                    <button class="quantity-btn" @click="increaseQuantity(product.id)"> 
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 20C10.5 20.3978 10.658 20.7794 10.9393 21.0607C11.2206 21.342 11.6022 21.5 12 21.5C12.3978 21.5 12.7794 21.342 13.0607 21.0607C13.342 20.7794 13.5 20.3978 13.5 20V13.5H20C20.3978 13.5 20.7794 13.342 21.0607 13.0607C21.342 12.7794 21.5 12.3978 21.5 12C21.5 11.6022 21.342 11.2206 21.0607 10.9393C20.7794 10.658 20.3978 10.5 20 10.5H13.5V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V10.5H4C3.60218 10.5 3.22064 10.658 2.93934 10.9393C2.65804 11.2206 2.5 11.6022 2.5 12C2.5 12.3978 2.65804 12.7794 2.93934 13.0607C3.22064 13.342 3.60218 13.5 4 13.5H10.5V20Z" fill="white"/>
                                        </svg>
                                            
                                    </button> 
                                </div>
                                
                            </template>
                        </div>
                    </div>
                </div>
                
                <button class="big-btn full-width" style="position: fixed; bottom: 70px">
                    <span class="text-center">Skip the Queue. Pay NOW ({{ cart.length }})</span>
                </button>
            </div>

            
        </div>

        <div class="bottom">
            <div class="bottom__container">
                <p>Powered by</p>
                <Logo></Logo>
            </div>
        </div>
    </div>

</template>

<script>
import { getDatabase, ref, set, get, update, push, serverTimestamp, increment, runTransaction, onValue } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import crypto from "crypto"

export default {
    data() {
        return {
            layout: null,
            products: [],
            gridData: [],
            cart: [],
            r_uid: null,
        }
    },

    created() {
        this.getProducts()

        //set ruid 
        this.r_uid = this.generateUniqueCode(5)
    },
    
    methods: {
        setItemQuantity($evt){
            let value = $evt.target.value;
            alert(value)
        },

        generateUniqueCode(length = 6) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const codeLength = 4;
            const randomBytes = crypto.randomBytes(length);
            const code = [...randomBytes].map(byte => characters[byte % characters.length]).join('');
            return code;
        },



        addToCart(product_id) {
           
                let product = this.getProduct(product_id)
                this.cart.push({
                    id: product.id,
                    name: product.name,
                    quantity: 1,
                    item_key: this.generateUniqueCode(5),
                    r_uid: this.r_uid,
                    timestamp: serverTimestamp(),
                    customer_name: "",
                    status: 'pending',
                });
              
                //alert(JSON.stringify(this.cart))
        },

        isInCart(product_id) {
            return this.cart.find(p=> p.id === product_id) || null
        }, 
        removeFromCart(product_id) {
            let item = this.isInCart(product_id)
            if (item) {
                let index = this.cart.indexOf(item);
                this.cart.splice(index, 1)
            }
        }, 
        increaseQuantity(product_id) {
            const item = this.cart.find(a => a.product_id === product_id);

            if (!item) {
                this.addToCart(product_id);
            } else {
                item.quantity += 1;
            }
        },

        decreaseQuantity(product_id) {
            const item = this.cart.find(a => a.product_id === product_id);

            if (item && item.quantity > 0) {
                item.quantity -= 1;
            } else {
                this.removeFromCart(product_id);
            }
        },

        getProduct(id) {
            return this.products.find(a=> a.id == id)
        },

        rowHasProduct(row_index) {
            for (let row of this.gridData[row_index]) {
                if (row.id)
                    return true;
            }
            return false;
        },
        
        columnHasProduct(column_index) {
            for (let i = 0; i < this.gridData.length; i++) {
                if (this.gridData[i][column_index]?.id) {
                    return true;
                }
            }
            return false;
        },
        
        async getProducts() {
            const response = await this.$api.get('/menu/' + this.$route.params.slug + '?space_uid='+this.$route.params.id) ;
            this.gridData = response.data.data.quickservicelayout
            this.products = response.data.data.business.products;
            //alert(this.products)
            //alert(this.products)
           //alert(JSON.stringify(this.products))
            
        }
    },
    computed: {
        
    }
    
}

</script>

<style lang="scss" scoped>


.quantity-box {
    display: flex;
    justify-content: space-between;
    gap: 2;
}

.in-cart {
    background-color: whitesmoke !important;
    
}

.quantity-btn {
    padding: 8px;
    border-radius: 2px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border: 1px solid lightgrey;
    background-color: black !important;
}

.page {
    &__container {
        padding-top: 80px;
    }
}

.header {
   padding: 16px;
   font-size: 18px;
   font-weight: 500;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   background-color: whitesmoke;
   position: fixed;
   top: 0;
   left: 0;
}

.bottom {
    background-color: whitesmoke;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    &__container {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        font-weight: 600;
        gap: 2px;
    }
}
.traysection {
    display: flex;
    flex-wrap: nowrap;
  //  overflow: auto;
    width: 100vw;
   // scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }


    padding: 2px 16px;
}

.product {
    min-width: 200px;
    border: 1px solid lightgrey;
    border-radius: 8px;
    background-color: white;
    margin: 0 2px;
    //box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  //  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    &__container {

    }

    &__image {
        //border: 1px solid grey;
        img {
            height: 100px;
            border-top-right-radius: 8px;
            border-top-left-radius: 8px;
            object-fit: cover;
            width: 100%;
            
        }
    }

    &__details {
        padding: 8px;
        &__name {
            font-weight: 400;
            text-align: center;
        }

        &__unitprice{
            font-weight: 600;
            text-align: center;
            font-size: 18px;
        }

        button {
            background-color: $primary;
            border-radius: 10px;
            color: black;
            padding: 2px 10px;
            width: fit-content;
            background-color: white;
            padding: 8px;
        }
    }


}

</style>