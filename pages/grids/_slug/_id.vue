<template>

    <div class="page">
        <BaseModal v-if="show_cart_modal " @close="show_cart_modal = false">
            <template #header>
                <div class="modal__header">

                    <div class="padding-16">
                        <p>Confirm Items</p>
                    </div>
                    <div class="powered-tag">
                        Payment Powered by PointsBud x Flutterwave
                    </div>
                </div>
            </template>
            <template #body>
                <template v-if="cart_step === 1">
                    <div class="padding-16" style="padding-top: 60px;">
                        <div class="form-input">
                            <label for="">
                                Phone 
                            </label>
                            <input v-model="payload.phone">
                        </div>
                        
                        <div class="section">
                            <p class="padding-16" style="text-align: justify;">Your money will be stored in a wallet. You'll get a refund ifi your order isn't accepted in 10 minutes.</p>


                            <div class="form-input">
                                <label for="">
                                    Wallet Pin
                                </label>
                                <input type="password" v-model="payload.wallet_pin">
                            </div>

                            <div class="form-input">
                                <label for="">
                                    Confirm Wallet Pin
                                </label>
                                <input type="password" v-model="payload.confirm_wallet_pin">
                            </div>
                        </div>

                        <button class="big-btn full-width" @click="nextStep">
                            Continue
                        </button>
                    </div>
                </template>
                <template v-else-if="cart_step ===2">
                    <div class="padding-16" style="margin-top: 30px;">
                        <div class="cart-item flex space-between" v-for="(item, index) in cart" :key="index">
                            <div class="cart-item__container flex space-between" style="width: 100%;">
                                
                                     <p>{{item.name}} x {{item.quantity}}</p>
                                     <p>{{'NGN'| currencySymbol}}{{item.quantity * item.unitprice}}</p>
                            </div>
                        </div>
                        <div class="total-item flex space-between">
                            <p>Delivery Packs x {{deliveryPacks.quantity}}</p>
                            <p>{{"NGN" | currencySymbol}} {{deliveryPacks.total}}</p>
                        </div>
                        <div style="margin-top: 30px;" class="total-item space-between">
                            <p>Calculated Total</p>
                            <p>{{"NGN" | currencySymbol}} {{total}}</p>
                        </div>

                        <div class="flex flex-col flex-center-x flex-center-y">
                            <button disabled class="big-btn">Pay</button>
                            <span style="color: grey; font-size: 13px">(Payments coming soon)</span>
                        </div>
                    </div>
                </template>
            </template>
        </BaseModal>
        <div class="page__container">
        
            <template v-if="!fetching_products">

                <div class="header">Select & Pay</div>
    
                <div class="traysection" :class="['tray-' + row_index + 1]" v-for="(row, row_index) in gridData">
                    <div class="product" :class="[isInCart(product.id) ? 'in-cart' : '']"  v-if="rowHasProduct(row_index) && columnHasProduct(index)"  v-for="(product, index) in gridData[row_index]" :key="index">
                        <div class="product__image">
                            <img  :src="getProduct(product.id)?.thumbnail || 'https://hunanchinesefoodwhitby.com/img/placeholders/comfort_food_placeholder.png'">
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
                                    <div class="flex full-width" style="width: 100%; justify-content: flex-end">
    
                                    <button class="quantity-btn" @click="addToCart(product.id)"> 
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 20C10.5 20.3978 10.658 20.7794 10.9393 21.0607C11.2206 21.342 11.6022 21.5 12 21.5C12.3978 21.5 12.7794 21.342 13.0607 21.0607C13.342 20.7794 13.5 20.3978 13.5 20V13.5H20C20.3978 13.5 20.7794 13.342 21.0607 13.0607C21.342 12.7794 21.5 12.3978 21.5 12C21.5 11.6022 21.342 11.2206 21.0607 10.9393C20.7794 10.658 20.3978 10.5 20 10.5H13.5V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V10.5H4C3.60218 10.5 3.22064 10.658 2.93934 10.9393C2.65804 11.2206 2.5 11.6022 2.5 12C2.5 12.3978 2.65804 12.7794 2.93934 13.0607C3.22064 13.342 3.60218 13.5 4 13.5H10.5V20Z" fill="white"/>
                                        </svg>
                                            
                                    </button> 
                                </div>

                                </template>
    
                                <template v-else>


                                   

                                        <button class="quantity-btn" @click="decreaseQuantity(product.id)"> 
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 13C5.71667 13 5.47934 12.904 5.288 12.712C5.09667 12.52 5.00067 12.2827 5 12C4.99934 11.7173 5.09534 11.48 5.288 11.288C5.48067 11.096 5.718 11 6 11H18C18.2833 11 18.521 11.096 18.713 11.288C18.905 11.48 19.0007 11.7173 19 12C18.9993 12.2827 18.9033 12.5203 18.712 12.713C18.5207 12.9057 18.2833 13.0013 18 13H6Z" fill="white"/>
                                                </svg>
                                                
                                                
                                        </button> 
                                    
    
    
                                        <input style="width: 60px; text-align:center" :value="JSON.stringify(isInCart(product.id)?.quantity)" @input="setItemQuantity">
                                        <button class="quantity-btn" @click="increaseQuantity(product.id)"> 
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.5 20C10.5 20.3978 10.658 20.7794 10.9393 21.0607C11.2206 21.342 11.6022 21.5 12 21.5C12.3978 21.5 12.7794 21.342 13.0607 21.0607C13.342 20.7794 13.5 20.3978 13.5 20V13.5H20C20.3978 13.5 20.7794 13.342 21.0607 13.0607C21.342 12.7794 21.5 12.3978 21.5 12C21.5 11.6022 21.342 11.2206 21.0607 10.9393C20.7794 10.658 20.3978 10.5 20 10.5H13.5V4C13.5 3.60218 13.342 3.22064 13.0607 2.93934C12.7794 2.65804 12.3978 2.5 12 2.5C11.6022 2.5 11.2206 2.65804 10.9393 2.93934C10.658 3.22064 10.5 3.60218 10.5 4V10.5H4C3.60218 10.5 3.22064 10.658 2.93934 10.9393C2.65804 11.2206 2.5 11.6022 2.5 12C2.5 12.3978 2.65804 12.7794 2.93934 13.0607C3.22064 13.342 3.60218 13.5 4 13.5H10.5V20Z" fill="white"/>
                                            </svg>
                                                
                                        </button> 
                                    
                                </template>
                            </div>
                        </div>
                    </div>
                    
                    <button class="big-btn full-width" style="position: fixed; bottom: 70px" @click="showCartModal" v-if="cart.length">
                        <span class="text-center">Skip the Queue. Pay Now ({{ cart.length }})</span>
                    </button>
                </div>
            </template>

            <template v-else>
                <div class="flex flex-center-y flex-center-x flex-col" style="height: 100%; width: 100% ">

                    <LoadingState></LoadingState>
                    <p style="font-size: 16px;">Loading Your PointsBud</p>
                </div>
            </template>

            
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
import mixpanel from 'mixpanel-browser';


export default {
    data() {
        return {
            cart_step: 2,
            layout: null,
            products: [],
            gridData: [],
            cart: [],
            r_uid: null,
            payload:{

            },
            business: null,
            show_cart_modal: false,
            fetching_products: true,
        }
    },

    created() {
        
        
        this.mixpanel = mixpanel.init('1f580add8d0558ccae5fc19ca5997dab', { debug: false, track_pageview: false });
        mixpanel.track("Grid Page Viewed")
        
        this.getProducts()

        //set ruid 
        this.r_uid = this.generateUniqueCode(5)

           
    },
    
    methods: {
        showCartModal() {
            this.show_cart_modal = true;
            mixpanel.track("Grid - CLicked on View Cart")
        },
        setItemQuantity($evt){
            let value = $evt.target.value;
            alert(value)
        },

        nextStep() {
            if (!this.validateStep(this.cart_step)) return
            this.cart_step += 1
            //alert(1)
        },

        validateStep(step) {
            return true;
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
                    unitprice: product.unitprice,
                    item_key: this.generateUniqueCode(5),
                    r_uid: this.r_uid,
                    timestamp: serverTimestamp(),
                    customer_name: "",
                    status: 'pending',
                    quantity: 1,

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
            const item = this.cart.find(a => a.id === product_id);

            if (!item) {
                this.addToCart(product_id);
            } else {
                this.cart.find(a => a.id === product_id).quantity++;
            }

        },

        decreaseQuantity(product_id) {
            const item = this.cart.find(a => a.id === product_id);

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
            this.fetching_products = true;
            const response = await this.$api.get('/menu/' + this.$route.params.slug + '?space_uid='+this.$route.params.id) ;
            this.gridData = response.data.data.quickservicelayout
            this.products = response.data.data.business.products;
            this.business = response.data.data.business;
            this.fetching_products = false
            

            const {id} = this.$route.params.id;
            
            let el = document.getElementsByClassName('tray-'+id);
            if (el && el[0]) {
                el[0].scrollIntoView({behavior: 'smooth'})
            }
            //alert(this.products)
            //alert(this.products)
           //alert(JSON.stringify(this.products))
            
        }
    },
    computed: {
        subTotal() {
            let sum = 0;
            for (let item of this.cart) {
                sum += parseFloat(item.unitprice * item.quantity)
            }

            return sum;
        },
        total() {
            return this.deliveryPacks.total + this.subTotal
        },
        deliveryPacks() {
            let object= {};
            let current_packs = 1; // Start with one pack
            let current_quantity = 0; // Track the current quantity in the current pack
            // Parse delivery packs
            let packs = JSON.parse(this.business.delivery_packs || "[]"); // Fallback to an empty array
            if (packs.length === 0) {
                return object;
            }
    

            let pack = packs[0]
    
            if (pack.max_quantity) {
              //  alert(pack.max_quantity)
                // Calculate packs needed based on the business cart
                for (let item of this.cart || []) {
                    //alert(JSON.stringify(item))
                        //alert(item.unit_quantity_in_pack)

                    if (item.unit_quantity_in_pack) {
                        current_quantity += parseFloat(item.unit_quantity_in_pack) * item.quantity;
    
                        // If the current quantity exceeds the max allowed in a pack, increment packs
                        if (current_quantity > pack.max_quantity) {
                            current_packs++;
                            current_quantity = parseFloat(item.unit_quantity_in_pack) * item.quantity; // Reset for the next pack
                        }
                    }
                }

    
                // Return the calculated quantity and total cost
                return {
                    quantity: current_packs,
                    total: pack.unitprice * current_packs,
                };
            }
            // quantity andnam
           
        }
    }
    
}

</script>

<style lang="scss" scoped>

* {
    font-family: "Nunito", serif !important;
    &:deep(.modal__header) {
        border-bottom: 1px solid lightgrey;
    }
}


.cart-item {
    padding: 16px 0;
    display: flex;
    justify-content: space-between;
    &__container {
    }
}

.modal {
    &__header {
        position: relative;
    }
}

.quantity-box {
    display: flex;
//justify-content: space-between;
    gap: 2;
    justify-content: space-between;
}

.in-cart {
    background-color: whitesmoke !important;
    
}

.quantity-btn {
    padding: 8px;
    border-radius: 100%;
    background-color: black !important;
}

.page {
    &__container {
        padding-top: 80px;
        max-width: 100vw;
        overflow: scroll;
        max-height: 100vh;
        padding-bottom: 120px;
    }
}
.full-width {
    width: 90% !important;
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
    gap: 8px;
    margin-bottom: 8px;
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
    //border: 1px solid lightgrey;
    border-radius: 8px;
    background-color: white;
    margin: 0 2px;
    box-shadow: rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px;  //  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    &__container {

    }

    &__name {
        font-weight: 700;
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
            font-weight: 600;
            text-align: center;
        }

        &__unitprice{
            font-weight: 600;
            text-align: center;
            font-size: 18px;
        }

        button {
            background-color: $primary;
            border-radius: 999px;
            color: black;
            padding: 2px 10px;
            width: fit-content;
            background-color: white;
            padding: 8px;
        }
    }


}


.section {
    border-top: 0.5px solid grey;
    border-bottom: 0.5px solid grey;
    
    margin-top: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    color: grey;

    p {
        margin-bottom: 5px;
    }
}

.form-input {
    @include greyforminput
}

.powered-tag {
    background-color: gold;
    width: 100%;
    margin: auto;
    color: $charcoal;
    font-size: 14px;
    text-align: center;
    padding: 8px 8px;
    border-radius: 2px;
    
    position: absolute;
    bottom: 1;
    right: 0;
}
</style>