<template>
    <div class="menu">

        <BaseModal @close="show_receipt_modal = false" v-if="show_receipt_modal">
            <template #header>Receipt for your last order</template>
            <template #body>
                <div class="receipt">
                    <div class="receipt__container">
                        <div class="receipt__header">
                            <div class="receipt__logo">
                                <img src="data:image/jpeg;base64,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"
                                    alt="">
                            </div>
                        </div>

                        <div class="receipt__container">
                            <BaseTable :show_search="false" :show_filter="false">
                                <template #header>



                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>


                                </template>
                                <template #data v-if="receipt_details">

                                    <tr v-for="(detail, index) in receipt_details.orders" :key="index">
                                        <td>{{ detail.product.name }}</td>
                                        <td>{{ detail.quantity }}</td>
                                        <td>{{ detail.currency }} {{ detail.unitprice }}</td>
                                    </tr>




                                </template>

                            </BaseTable>
                            <div class="receipt__total">
                                <p> {{ receipt_details.currency }} {{ receipt_details.total_amount }}</p>
                            </div>
                        </div>

                        <div class="receipt__footer">
                            <p>

                                © PointsBud.com
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </BaseModal>


        <template v-if="!loading_data">

            <BaseModal v-if="view_cart && cart.length > 0" @close="view_cart = false">
                <template #header>
                    <div class="cart-modal__header" v-if="cart_step === 2" @click.stop>
                        <div class="">
                            Cart
                        </div>
                        <div style="font-weight: 400; font-size: 16px" v-if="customer">
                            Available points:

                            <span> {{ customer.points - points_in_use }} </span>
                        </div>
                    </div>

                </template>

                <template #body>
                    <div class="cart-modal" @click.stop>

                        <div class="cart-modal__container" v-if="cart_step === 1">

                            <div class="cart-modal__redeem">
                                <p class="cart-modal__redeem__header">
                                    Sign in to redeem points and discounts for your purchases
                                </p>
                                <div class="cart-modal__redeem__auth">
                                    <div id="googleButton"></div>
                                </div>

                                <div class="or">
                                    <p>Or</p>
                                </div>

                                <div class="cart-modal__redeem__skipbtn">
                                    <button @click="cart_step = 2">Proceed to checkout</button>
                                </div>

                            </div>

                        </div>
                        <div class="cart-modal__container" v-else-if="cart_step === 2">
                            <div class="cart-modal__item" v-for="(item, index) in cart" :key="index">
                                <div class="cart-modal__item__thumbnail" v-if="item.thumbnail">
                                    <img :src="item.thumbnail || ''" alt="">
                                </div>
                                <div class="cart-modal__item__name">
                                    <div>

                                        <p>{{ item.name }} x <b>{{ item.quantity }} </b>
                                        </p>
                                        <!--<button>Change quantity</button>-->
                                        <button @click="removeCartItem(item)">Remove from cart</button>
                                    </div>
                                    <div class="points"
                                        v-if="canUsePoints(item) || products_using_points.includes(item.id)">
                                        <label for="">
                                            <input type="checkbox"
                                                :disabled="!canUsePoints(item) && !products_using_points.includes(item.id)"
                                                @change="usePoints($event, item, item.points_to_deduct * item.quantity)">Use
                                            {{
                                                item.points_to_deduct * item.quantity }} points
                                        </label>

                                    </div>
                                </div>

                                <div class="cart-modal__item__total" v-if="calculatePriceWithPoints(item).type === 'money'">
                                    <p>{{ item.currency }} {{ item.quantity * item.unitprice | money }}</p>
                                </div>
                                <div class="cart-modal__item__total" v-else>
                                    <div>
                                        <img style="margin-right: 8px;" src="../../static/coins.png" alt="">
                                    </div>
                                    <p>{{ calculatePriceWithPoints(item).value }}</p>
                                </div>


                            </div>

                            <div class="cart-modal__total">
                                <div>SubTotal</div>
                                <div>{{ cart[0].currency }} {{ cartTotal | money }}</div>
                            </div>
                            <div class="cart-modal__total">
                                <div>Consumption Tax ({{ getPreference('consumption_tax')?.value || 0 }}%) </div>
                                <div>{{ cart[0].currency }} {{ consumptionTax | money }}</div>
                            </div>
                            <div class="cart-modal__total">
                                <div>Vat ({{ getPreference('vat')?.value || 0 }}%) </div>
                                <div>{{ cart[0].currency }} {{ vat | money }}</div>
                            </div>

                            <div class="cart-modal__total">
                                <div><b>Total</b></div>
                                <div>{{ cart[0].currency }} {{ (parseFloat(vat) + parseFloat(consumptionTax) +
                                    parseFloat(cartTotal)) | money }}</div>
                            </div>
                        </div>

                        <div class="cart-modal__container" v-else-if="cart_step === 3">
                            <div class="cart-modal__orderloading">
                                <p>Please hold on while your order is being reviewed. Don't close this page</p>
                            </div>

                            <div>
                                <LoadingState></LoadingState>
                            </div>
                        </div>

                        <div class="cart-modal__container" v-else-if="cart_step === 4">
                            <div class="cart-modal__orderaccepted"
                                style="display: flex; flex-direction: column; align-items:center; justify-content:center">
                                <div
                                    style="display: flex; margin-top: 48px; justify-content: center; width: 100px; margin:auto;">

                                    <img src="../../static/confetti.png" style="width: 100%; text-align: center" alt="">
                                </div>

                                <div class="cart-modal__orderaccepted__text"
                                    style="display: flex; margin-top: 16px; margin-bottom: 16px; font-size:16px; justify-content:center">
                                    <p style="text-align: center; padding: 16px;">Your order has been accepted.</p>

                                </div>
                                <button @click="makePayment">Make payment</button>


                                <!--
    
                                <div class="cart-modal__orderaccepted__offers">
                                    <p>You've also qualified for the following offers...</p>
                                    <div class="offers"
                                        style="display: flex; width: 100%;  justify-content: center; margin-top: 16px">
    
                                        <div class="offer" v-for="(type, index) in eligible_offers" :key="index"
                                            :style="{ background: type.background || '' }">
                                            <img v-if="type.offer === 'freebie'" src="../../static/offers_gift.png">
                                            <img v-else-if="type.offer === 'cashback'" src="../../static/offers_cashback.png">
                                            <img v-else-if="type.offer === 'discount'" src="../../static/icons8-coupon-58.png">
                                            <p class="offer__name">{{ type.title }}</p>
                                            <p class="offer__desc">{{ type.description }}</p>
    
                                            <button>View details</button>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>


                    </div>
                </template>
                <template #footer>
                    <div class="cart-modal__footer">
                        <div @click.stop class="order-modal__footer__cta" v-if="cart_step === 2">
                            <button :disabled="flag_creating_order" @click="completeOrder">Create Order</button>
                        </div>
                    </div>
                </template>
            </BaseModal>

            <BaseModal :show_header="false" :show_footer="false" v-if="show_order_modal" @close="show_order_modal = false">
                <template #header>
                    <div class="order-modal__header" @click.stop>

                        <p class="order-modal__header__name">{{ focused_product.name }}</p>

                    </div>

                </template>
                <template #footer>
                    <div class="order-modal__footer">
                        <div class="order-modal__footer__form">

                            <div class="order-modal__footer__form__total">
                                {{ focused_product.currency }} {{ focused_product.unitprice * order.quantity | money }}
                            </div>
                        </div>
                        <div @click.stop class="order-modal__footer__cta">
                            <button @click="addToCart">Add to cart</button>
                        </div>
                    </div>
                </template>
                <template #body>
                    <div class="order-modal" @click.stop>
                        <div class="order-modal__top">
                            <div></div>
                            <div class="order-modal__top__points">{{ focused_product.points_to_earn }} points to earn</div>
                        </div>

                        <div class="order-modal__content">
                            <div class="order-modal__content__image">
                                <img :src="focused_product.thumbnail || business && business.logo">

                                >
                            </div>

                            <div class=" order-modal__content__name">
                                <p>{{ focused_product.name }}</p>
                            </div>

                            <div class="order-modal__content__description">
                                <p>{{ focused_product.description }}</p>
                            </div>

                            <div class="order-modal__content__quantity">
                                <p class="order-modal__content__quantity__header">Total: {{ focused_product.currency }} {{
                                    focused_product.unitprice * order.quantity | money }} </p>

                                <div class="order-modal__content__quantity__container">

                                    <button @click="decreaseQuantity"> -</button>
                                    <input type="text" v-model="order.quantity">
                                    <button @click="increaseQuantity"> +</button>
                                </div>
                            </div>

                            <div class="order-modal__content__ctas">
                                <button @click="addToCart">Add to cart</button>
                            </div>
                        </div>




                    </div>
                </template>
            </BaseModal>

            <div class="menu__container">

                <div class="menu__top">
                    <div class="menu__top__container">
                        <div class="menu__top__logo">
                            <img :src="business && business.logo">
                        </div>




                        <div class="menu__top__categories">
                            <div :class="[chosenCategory === category.name ? 'selected' : '']"
                                @click="selectCategory(category)" class="menu__top__categories__category"
                                v-for="(category, index) in categories" :key="index">{{ category.name }}</div>

                        </div>
                        <div style="background: gold; color: black; margin-top: 16px; padding: 8px; border-radius: 8px"
                            v-if="search_term !== '' && search_term !== ' '" class="search-results">
                            <p>{{ filteredProducts.length }} results found <span style="text-decoration:underline"
                                    @click="showSearchedProducts">Show</span></p>

                        </div>
                        <div class="form-input menu__top__search">
                            <input v-model="search_term" placeholder="search for an item on the menu" type="text"
                                class="menu__top__search__input">
                        </div>
                    </div>
                </div>


                <div class="menu__header">
                    <div class="logo">
                        <img :src="business && business.logo" alt="">
                    </div>
                    <!-- 
                    <div class="categories">
                        <h2>Categories</h2>
                        <ul>
                            <li :class="[chosenCategory === category.name ? 'selected' : '']"
                                v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">{{
                                    category.name }}</li>
                        </ul>
                    </div>-->







                    <!--
                    <div class="cart-button" v-if="cart && cart.length > 0" @click="viewCart"> 
                        <div class="cart-button__container">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M9 8H21" stroke="white" stroke-width="1.5" stroke-miterlimit="10"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p> Complete your order ({{ cart.length }} items)</p>

                        </div>
                    </div>-->


                </div>

                <div class="menu__login">
                    <div id="buttonDiv"></div>
                </div>

                <div class="menu__content" id="menu-content">
                    <div class="product" v-for="(product, index) in filteredProducts" :key="index"
                        @click="showOrderModal(product)">
                        <div class="product__image">
                            <img :src="product.thumbnail || business && business.logo" alt="">
                        </div>
                        <div class="product__name">
                            {{ product.name }}
                        </div>

                        <div class="product__description">
                            {{ product.description }}
                        </div>
                        <div class="product__price">
                            {{ product.currency }} {{ product.unitprice | money }}
                        </div>


                        <!-- 
    
                        <div style="display: flex">
    
                            <div class="product__points-earn">
                                <img src="../../static/coins.png" />
                                {{ product.points_to_earn }}
    
                            </div>
    
                            <div class="product__points-deduct">
                                <img src="../../static/coins.png" />
                                {{ product.points_to_deduct }}
    
                            </div>
                        </div>-->
                    </div>

                    <div class="cart-sticky" v-if="cart && cart.length > 0">
                        <div class="cart-sticky__container">
                            <div class="cart-sticky__header" style="display: flex; align-items:center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="margin-right: 8px;"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M9 8H21" stroke="black" stroke-width="1.5" stroke-miterlimit="10"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p>{{ cart.length }} items in cart</p>
                            </div>

                            <div class="cart-sticky__ctas" style="margin-top: 8px;">

                                <button disabled>Get recommendation</button>
                                <button @click="viewCart">Complete order</button>
                            </div>
                        </div>
                    </div>

                    <div class="cart-sticky" v-else>
                        <div class="cart-sticky__container">


                            <div class="cart-sticky__ctas" style="margin-top: 8px;">

                                <button disabled>Get recommendation</button>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </template>


        <template v-else>
            <div class="loading">
                <div class="logo">
                    <img :src="business && business.logo" alt="">
                </div>
                <p>Loading menu. Please wait...</p>

                <LoadingState></LoadingState>
            </div>

        </template>

    </div>
</template>



<script>
import socket from "socket.io-client"
export default {
    data() {
        return {
            search_term: '',

            loading_data: true,
            flag_creating_order: false,

            created_order: null,
            business: null,

            categories: [],
            products: null,
            customer: null,

            chosenCategory: null,
            show_order_modal: false,
            focused_product: {
                quantity: 1,
            },
            order: {
                quantity: 1,
            },
            quantity: 0,
            cart: [],
            view_cart: false,
            cart_step: 1,
            signed_in: false,

            points_in_use: 0,
            products_using_points: [],

            get_order_interval: null,
            points_earned: 0,

            eligible_offers: [{
                offer: 'discount',
                title: '50% discount on next purchase'
            }],

            paymentDetails: null,


            socketClient: null,

            show_receipt_modal: false,
            receipt_details: null,
            prefs: null

        }
    },
    async created() {



        this.$api.get(`/businesses?slug=${this.$route.params.slug}`).then(resp => {
            this.business = resp.data.data;
            this.getPreferences()
            this.getCategories();
            this.getProducts();
            this.computeCartFromLocalStorage();
            this.isSignedIn()
        })



    },
    mounted() {
        this.socketClient = socket('http://localhost:5000'); // Replace with your server URL

        if (this.$route.query.receipt_generated) {
            this.getReceipt()
            //this.show_receipt_modal = true;
        }
        // Add your event handlers here
        this.socketClient.on('connect', () => {
            console.log('Connected to server');
        });

        this.socketClient.on('disconnect', () => {
            console.log('Disconnected from server');
        });


        if (google) {

            // Emit an event to the server
            google.accounts.id.initialize({
                client_id: '309539494248-ir1uocjnkh6h8t3in55vn4r2m9jmt777.apps.googleusercontent.com',
                callback: this.googleSignIn, //method to run after user clicks the Google sign in button
                context: 'signin'
            })
        }

        this.initializeGoogleSignin()




        // render button

    },
    computed: {
        filteredProducts() {
            if (this.products) {
                let productsNotInCart = this.products.filter(item => !this.cart.find(cart_item => item.id == cart_item.id)) || [];
                const category = this.categories.find(c => c.name === this.chosenCategory);
                if (category && !this.search_term) {
                    productsNotInCart = productsNotInCart.filter(item => item.category_id === category.id) || []

                }
                else if (this.search_term !== '' && this.search_term !== ' ') {
                    productsNotInCart = productsNotInCart.filter(item => item.name && item.name.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1 || (item.description && item.description.toLowerCase().indexOf(this.search_item && this.search_term.toLowerCase()) > -1))

                }



                return productsNotInCart


            }

            return []

            /*
            if (this.products) {

                let productsNotInCart = this.products.filter(item => !this.cart.find(cart_item => item.id == cart_item.id)) || [];
                const category = this.categories.find(c => c.name === this.chosenCategory);

                if (category) {

                    productsNotInCart = productsNotInCart.filter(item => item.category_id === category.id) || []

                    if (this.search_term) {
                        productsNotInCart = productsNotInCart.filter(item => item.name.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1 || item.description?.toLowerCase().indexOf(this.search_item.toLowerCase()) > -1)
                    }
                    return productsNotInCart
                }
                return []

            }
            return []
            /*if (this.chosenCategory) {

                const category = this.categories.find(c => c.name === this.chosenCategory);
                const category_id = category.id;

                return this.products.filter(product => product.product_categories.find(item => item.category_id === category_id))
            }
            return []*/

        },
        computedCart() {
            const cart = window.localStorage.getItem('cart');
            if (cart !== "null" && cart) return cart;

            return []
        },
        cartTotal() {
            let total = 0;
            this.cart.forEach(item => {
                if (!this.products_using_points.includes(item.id)) {
                    const price = item.quantity * item.unitprice;
                    total += price;
                }
            });

            // consumption tax and vat;


            let vat = this.getPreference('vat')
            vat = vat && vat.value || 0


            if (vat) {
                vat = parseFloat((vat / 100) * total)
            }
            //  alert(consumption_tax)
            return total

        },

        consumptionTax() {
            // consumption tax and vat;
            let consumption_tax = this.getPreference('consumption_tax')
            consumption_tax = consumption_tax && consumption_tax.value || 0;
            if (consumption_tax) {
                consumption_tax = parseFloat((consumption_tax / 100) * this.cartTotal).toFixed(2)
            }
            return consumption_tax

        },
        vat() {
            let vat = this.getPreference('vat')
            vat = vat && vat.value || 0


            if (vat) {
                vat = parseFloat((vat / 100) * this.cartTotal).toFixed(2)
            }

            return vat
            //  
        },
        totalPointsEarned() {
            // this
        }
    },
    methods: {
        getPreference(pref) {
            return this.prefs.find(p => p.business_setting.setting_alias === pref)
        },
        getPreferences() {
            const setting_aliases = [
                "consumption_tax",
                "vat"
            ]

            this.$api.get(`/prefs?business_id=${this.business.id}&setting_aliases=${setting_aliases.join(',')}`).then(resp => {
                this.prefs = resp.data.data
            })
        },

        getReceipt() {
            this.$api.get('/receipts/' + this.$route.query.receipt_generated).then(resp => {
                this.show_receipt_modal = true
                this.receipt_details = resp.data.data
            })
        },
        isInCart(product) {
            return this.cart.find(item => item.id === product.id);
        },
        getPendingSale() {
            this.$api.get(`/orders/pending-sales/${this.created_order.id}`).then(resp => {
                if (resp.data.data.status === 'accepted') {
                    this.cart_step = 4;
                    clearInterval(this.get_order_interval);
                    //this.isSignedIn();
                    // this.cart = [];
                    window.localStorage.removeItem('cart');
                }
            })
        },
        completeOrder() {
            this.flag_creating_order = true;
            const orders = [];
            this.cart.forEach(item => {
                const obj = {
                    product_id: item.id,
                    points_earned: item.points_to_earn,
                    points_used: this.products_using_points.includes(item.id) ? (item.quantity * item.points_to_deduct) : 0,
                    currency: item.currency,
                    quantity: item.quantity,
                    total_amount: this.products_using_points.includes(item.id) ? 0 : (item.quantity * item.unitprice),
                }

                orders.push(obj)
                this.points_earned += obj.points_earned
            })
            const slug = this.$route.params.slug;

            const r_uid = Date.now();

            //alert(`orders:${this.$route.params.slug}:${r_uid}`)
            this.socketClient.emit('created_order', {
                r_uid,
                business_slug: slug, business_id: this.business.id, items: orders,
                vat: parseFloat(this.vat || 0),
                consumption_tax: parseFloat(this.consumptionTax || 0)
            })


            this.socketClient.on('received_order_' + r_uid, () => {
                this.cart_step = 3
                this.flag_creating_order = false;

                this.socketClient.emit('join_room', { room: `orders:${r_uid}` })

                this.socketClient.on('order-accepted', (data) => {
                    this.cart_step = 4;
                    //alert(data)
                    this.paymentDetails = data;


                })


            });
            this.socketClient.on('order-accepted' + r_uid, () => {
                //this.cart_step = 3
                // this.flag_creating_order = false;
                console.log("********* gotchya *********")
                this.cart_step = 4;
                //this.cart_step = 2
            })










            /*
            this.$api.post('/orders', { business_id: this.business.id, items: orders }).then(resp => {

                this.cart_step = 3;
                this.created_order = resp.data.data;

                this.get_order_interval = setInterval(() => {
                    this.getPendingSale();
                }, 10000)
            }).finally(() => {
                this.flag_creating_order = false;
            })*/

        },
        makePayment() {
            FlutterwaveCheckout({
                public_key: process.env.FLW_PUBLIC_KEY || "FLWPUBK_TEST-ad1d316f90548fca239af66bd32bd954-X",
                tx_ref: `pointsbudtx_${Date.now()}`,
                amount: this.paymentDetails.total_amount,
                currency: this.paymentDetails.currency,
                payment_options: "card, banktransfer, ussd",
                //redirect_url: "https://ae83-102-89-45-99.ngrok.io/api/v1/transactions/verify-flw",
                meta: {
                    //customer_id: this.userDetails.business ? this.userDetails.business.id : this.userDetails.id,
                    //is_business: this.userDetails.business ? 1 : 0
                },
                narration: "Wallet Funding",
                customer: {
                    email: this.customer && this.customer.email || 'anon@gmail.com',
                    // phone_number: this.userDetails.contact_phone_number,
                    name: this.customer && this.customer.name || 'Anon-Customer',
                },
                customizations: {
                    title: "PointsBud",
                    logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
                },
                callback: (data) => {
                    //this.$store.commit('dashboard/setActionFundWallet', false);
                    this.cart_step = 5;
                    let payload = { type: 'order-paid', pending_sale_id: this.paymentDetails.id, ...data, business_id: this.business.id }
                    this.$api.post('/transactions/verify-flw', payload).then(resp => {
                        this.socketClient.emit('order-paid', { ...payload, ...resp.data.data })
                        this.$router.push(`/menu/${this.$route.params.slug}?receipt_generated=${resp.data.data.receipt_id}`)
                    })
                }
            });
        },

        calculatePriceWithPoints(product) {
            if (this.products_using_points.includes(product.id)) {
                return {
                    value: (product.quantity * product.points_to_deduct),
                    type: 'points'
                }
            }
            else {
                return {
                    value: product.quantity * product.unitprice,
                    type: 'money'
                }
            }
        },
        canUsePoints(product) {
            // if points_in_use and item points and < available points er
            if (this.customer) {

                if (parseInt(this.points_in_use + (product.points_to_deduct * product.quantity)) <= this.customer.points) {
                    return true
                }
                return false;
            }
            return false;
        },
        usePoints($event, product, points) {
            if ($event.target.checked) {

                this.points_in_use += points;
                this.products_using_points.push(product.id)
            }
            else {
                this.points_in_use -= points;
                const index = this.products_using_points.indexOf(product.id);
                this.products_using_points.splice(index, 1)
            }
        },
        viewCart() {
            this.view_cart = true;
            setTimeout(() => {
                this.initializeGoogleSignin();
            }, 1000)
        },
        initializeGoogleSignin() {
            google.accounts.id.renderButton(
                document.getElementById('googleButton'),
                {
                    type: 'standard',
                    size: 'large',
                    text: 'signin_with',
                    shape: 'rectangular',
                    theme: 'dark',
                    logo_alignment: 'center',
                    width: 250
                }
            )
        },
        googleSignIn(response) {
            console.log(JSON.stringify(response))
            this.$api.post('/auth/google/signin', {
                credential: response.credential
            }).then(resp => {
                this.$cookies.set("loyal-token", resp.data.data.token);
                this.cart_step = 2;
                this.customer = resp.data.data.customer;
            }).catch(err => {

            })
        },
        isSignedIn() {
            this.$api.get('/auth/loggedin').then(resp => {
                this.signed_in = true;
                this.cart_step = 2;
                this.customer = resp.data.data;
            }).catch(err => {
                this.signed_in = false;
            })
        },


        computeCartFromLocalStorage() {
            const cart = window.localStorage.getItem('cart');
            if (cart !== "null" && cart) {

                this.cart = JSON.parse(cart)
                return
            }
            this.cart = []

        },
        increaseQuantity() {
            try {

                this.order.quantity++;
            } catch (e) {
                alert(e)
            }
            // this.focused_product.quantity++;
        },
        decreaseQuantity() {
            if (this.order.quantity > 1) {
                this.order.quantity--;
            }
        },
        showOrderModal(product) {
            this.show_order_modal = true;
            this.focused_product = product;
        },
        selectCategory(category) {
            this.chosenCategory = category.name;
            document.getElementById('menu-content').scrollIntoView({
                behavior: 'smooth'
            })
        },
        showSearchedProducts() {
            document.getElementById('menu-content').scrollIntoView({
                behavior: 'smooth'
            })
        },
        getCategories() {
            if (this.business) {

                this.$api.get(`/categories?business_id=${this.business.id}`).then(resp => {
                    this.categories = resp.data.data;
                    this.chosenCategory = this.categories[0]?.name;
                });
            }
        },
        getProducts() {
            this.loading_data = true;
            this.$api.get(`/products?business_id=${this.business.id}`).then(resp => {
                this.products = resp.data.data;
            }).finally(() => {
                this.loading_data = false;
            });
        },
        addToCart() {
            let cart = window.localStorage.getItem('cart');
            const item = {
                ...this.focused_product,
                quantity: this.order.quantity
            }
            if (cart !== 'null' && cart) {
                cart = JSON.parse(cart)
                cart.push(item);
                window.localStorage.setItem('cart', JSON.stringify(cart));
                this.cart.push(item)
            }
            else {
                cart = [item]
                this.cart = cart;
                window.localStorage.setItem("cart", JSON.stringify(cart))
            }
            this.order.quantity = 1;
            this.show_order_modal = false;

        },
        removeCartItem(item) {
            let cart = window.localStorage.getItem('cart');
            if (cart !== 'null' && cart) {
                cart = JSON.parse(cart);
                cart = cart.filter(c => c.id !== item.id);
                window.localStorage.setItem('cart', JSON.stringify(cart));
                this.cart = cart;

            }
        }
    }
}
</script>

<style lang="scss" scoped>
$gradient-background: linear-gradient(to bottom right, #2c2e3e, #2e2d3c, #2d2c37);

* {
    font-family: 'Red Hat Display' !important;

}

.receipt {
    min-width: 350px;

    &__logo {
        width: 50%;
        margin: auto;

        img {
            border-radius: 50%;
            margin-top: 14px;
            width: 50px;
            height: 50px;
            margin: auto;
            margin-top: 10px;

        }

    }

    &__container {
        padding: 16px;
    }

    &__footer {
        color: $faint;
        font-size: 12px;
        text-align: center;
        margin-top: 16px;
    }
}

.cart-sticky {
    min-height: 50px;
    width: 100%;
    background: white;
    border-top: 0.5px solid dashed;
    z-index: 50000000000000000000000;
    bottom: 0;
    left: 0;
    position: fixed;

    &__header {
        border: 2px solid whitesmoke;
        padding: 8px;
    }

    &__container {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;


        p {
            font-weight: 600;
        }

        button {
            @include smallbutton;
            background: gold;
            color: black;
        }
    }

    &__ctas {
        display: flex;
        width: 100%;
        flex-direction: column;
        @include card;

        button {
            border-radius: 1px;
            margin-bottom: 8px;

            &:first-of-type {
                background: linear-gradient(to bottom right, #2c2e3e, #2e2d3c, #2d2c37);
                color: white;
            }
        }
    }
}

.loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    color: $charcoal;
    margin-top: 10vh;
    font-size: 14px;
    font-weight: 400;
}

.selected {
    //olor: red;
    background: gold !important;
    color: black !important;
    font-weight: 600 !important; //border-radius: 20px;

}

.offer {
    @include card;
    background: teal;
    color: white;
    //padding: 16px 8px;
    padding: 32px;
    min-height: 100px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 220px;
    height: 220px;
    margin: auto;
    border: 5px solid $primary;


    &:hover {
        filter: brightness(0.9);
    }

    &__name {
        font-size: 16px !important;
        font-weight: 500 !important;
        color: white !important;

    }

    &__desc {
        text-align: center;
        font-size: 13px;
    }

    img {
        //border: 1px solid white;
        //width: 60px;
        //height: 60px;
        //width: 100%;
    }

    button {
        background: transparent;
        //border: 1px solid whitesmoke;
        padding: 2px 16px;
        border-radius: 8px;
        margin-top: 8px;
        background: $primary;
        color: white;

        &:hover {}
    }
}

.cart-button {
    width: 50%;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-top: 16px;

    &__container {
        @include smallbutton;
        position: relative;
        display: flex;


        svg {
            stroke: white !important;
            margin-right: 8px;
        }
    }


}

.cart-modal {
    min-width: fit-content;
    box-sizing: border-box;

    &__container {
        padding: 24px;
    }


    &__redeem {
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__header {
            font-size: 20px;
            text-align: center;
            color: black;
            font-weight: 600;
            max-width: 400px;
            margin: auto;
            box-sizing: border-box;

            @include media("<=t") {
                max-width: 300px;
                font-size: 13px;
            }
        }

        &__auth {
            display: flex;
            margin-top: 16px;
            justify-content: center;
        }

        .or {
            margin: 16px 0;
        }


        &__skipbtn {}

        button {
            webkit-border-radius: 4px;
            border-radius: 4px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-transition: background-color .218s, border-color .218s;
            transition: background-color .218s, border-color .218s;
            -webkit-user-select: none;
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border: 1px solid #dadce0;
            color: #3c4043;
            cursor: pointer;
            font-family: "Google Sans", arial, sans-serif;
            font-size: 14px;
            height: 40px;
            letter-spacing: 0.25px;
            outline: none;
            overflow: hidden;
            padding: 0 12px;
            position: relative;
            text-align: center;
            vertical-align: middle;
            white-space: nowrap;
            margin: auto;
            width: 248px;
            font-weight: 500;


        }
    }

    &__orderloading {
        margin-top: 24px;
        font-size: 18px;
        text-align: center;
        font-weight: 500;
        padding: 16px;
    }

    &__orderaccepted {
        p {
            font-size: 18px;
            font-weight: 400;
            color: $charcoal;
            max-width: 400px;
        }

        &__offers {
            //background: whitesmoke;
            border: 5px dashed whitesmoke;
            padding: 16px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;


        }

        button {
            @include smallbutton;
            background: gold;
            color: black;
        }
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            color: lightseagreen;
        }
    }


    &__item {
        border-bottom: 1px solid whitesmoke;
        display: flex;
        //grid-template-columns: 19% 49% 29%;
        justify-content: space-between;
        padding: 16px;
        align-items: center;


        &__thumbnail {
            //width: 100%;
            max-width: 100px;
            height: 80px;
            margin-right: 16px;




            img {
                object-fit: cover;
                height: 100%;
                width: 100%;
                border-radius: 5px;

            }
        }

        &__name {
            font-size: 15px;
            font-weight: 600;
            margin-right: 16px;


            button {
                border: 0.5px solid $charcoal;
                border-radius: 5px;
                padding: 2px 24px;

                &:hover {
                    background: grey;
                    color: white;
                }
            }

            .points {
                margin-top: 8px;

                input {
                    margin-right: 8px;

                }
            }
        }

        &__total {
            display: flex;
            justify-content: flex-end;
            font-weight: 500;
        }
    }

    &__total {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        padding: 8px 0;

        div {
            &:last-of-type {
                font-weight: 700;
            }
        }
    }
}

.product {
    padding: 24px;
    background: white;
    @include card;
    border-radius: 20px;
    height: max-content;
    cursor: pointer;

    transition: transform 0.2s ease-in-out, box-shadow 0.15s ease-in-out;


    margin-bottom: 50px;

    &:hover {
        transform: scale(1.05);
    }

    &__description {
        color: $charcoal;
        text-align: center;

    }

    &__image {
        height: 60px;
        width: 60px;
        //border-radius: 50%;
        margin: auto;
        margin-top: -50px;
        border-radius: 15px;




        img {
            width: 100%;
            height: 100%;
            border-radius: 15px;
            object-fit: cover;
            border: 3px solid gold;

        }

    }

    &__name {
        text-align: center;
        font-weight: 600;
        font-size: 15px;
        margin-top: 8px;
        text-transform: capitalize !important;
    }

    &__price {
        text-align: center;
        font-weight: 400;
        font-size: 15px;
        color: black;
        margin-top: 8px;
        //margin-top: 8px;
        font-weight: 600;
    }

    &__points-earn {
        cursor: pointer;
        margin: auto;
        display: flex;
        align-items: center;
        margin: 8px auto;
        justify-content: center;
        color: lightseagreen;
        font-weight: 600;

        img {
            margin-right: 8px;
            height: 20px;
            width: 20px;
        }
    }

    &__points-deduct {
        cursor: pointer;
        margin: auto;
        display: flex;
        align-items: center;
        margin: 8px auto;
        justify-content: center;
        color: red;
        font-weight: 600;

        img {
            margin-right: 8px;
            height: 20px;
            width: 20px;
        }
    }
}

.menu {

    &__top {
        position: static;
        top: 0;
        left: 0;
        background: linear-gradient(to bottom right, #2c2e3e, #2e2d3c, #2d2c37);
        //min-height: 75px;
        min-width: 100%;
        box-sizing: border-box;

        &__finish {
            line-height: 1;
        }

        &__container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 16px;
        }

        &__search {
            // width: 100%;
            @include form-input;

            min-height: 50px !important;
            //border: 1px solid lightgrey;
            margin-bottom: 0px !important;
            margin: 16px 0;
            width: 90%;

            input {
                height: 50px;
                color: white;
                padding: 8px;




                &:focus {
                    outline: 0;
                    border-radius: 5px;

                }

            }


        }

        &__categories {
            display: flex;
            color: white;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 8px;
            cursor: pointer;

            &__category {
                //border: 1px solid rgba(245, 245, 245, 0.179);
                padding: 8px;
                margin-top: 2px;
                font-size: 16px;
                font-weight: 300;
                cursor: pointer !important;
                margin-right: 1px;
                //border-bottom: 0;
                background: rgba(245, 245, 245, 0.111);
                border-radius: 5px;
                color: white;

                &:first-of-type {
                    //border-bottom: 0;
                }
            }

        }

        &__logo {
            display: flex;
            height: 50px;
            width: 50px;
            margin-bottom: 8px;


            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
            }
        }

        button {
            background: gold;
            color: $charcoal;
            padding: 10px;
            font-size: 13.5px;
            font-weight: 600;
            border-radius: 5px;
            padding: 4px 8px;
            height: 50px;
            ;
            width: 100%;
            box-sizing: border-box;

        }
    }

    &__container {
        //padding: 24px 0px !imp;
    }

    &__header {
        //background-color: lightgrey;
    }

    &__content {
        display: grid;
        grid-template-columns: 23% 23% 23% 23%;
        justify-content: space-between;
        margin: auto;
        margin-top: 100px;
        width: 90%;
        padding-bottom: 300px;

        @include media("<=t") {
            grid-template-columns: 48% 48%;
        }

    }

    .logo {
        width: 50%;
        margin: auto;
        display: flex;
        justify-content: center;
        margin-bottom: 16px;

        img {
            border: 5px solid white;

        }
    }


}

.categories {
    width: 90%;
    margin: auto;
    background: white;
    border-radius: 10px;
    @include card;
    padding: 16px;
    margin: 32px auto;
    border: 1px solid rgb(252, 250, 250);



    @include media("<=t") {
        width: 90%;
    }

    h2 {
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 16px;
    }

    ul {
        display: flex !important;
        flex-wrap: wrap;
        justify-content: center;
        cursor: pointer !important;



    }

    li {
        // margin-right: 16px;
        cursor: pointer !important;
        padding: 2px 16px;
        background: whitesmoke;
        margin-right: 16px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 400;
        border-radius: 20px;

        &:hover {
            //text-decoration: underline;
            cursor: pointer;
            background: whitesmoke;
            color: $charcoal;
        }
    }
}

.order-modal {
    //width: fit-content;
    display: flex;
    flex-direction: column;
    width: 100%;

    &__top {
        display: flex;
        justify-content: space-between;
        padding: 16px;

        &__points {
            background: gold;
            color: black;
            padding: 8px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 10px;
        }
    }

    &__content {
        padding: 16px;

        &__image {
            width: 100%;
            margin: auto;
            display: flex;
            justify-content: center;
            max-width: 300px;
            max-height: 300px;

            img {
                width: 100%;
                height: auto;
                border-radius: 15px;
            }
        }

        &__name {
            font-weight: 600;
            text-align: center;
            margin: 16px auto;
            max-width: 300px;

        }

        &__description {
            color: $faint;
            max-width: 400px;
            margin: auto;
            text-align: center;

        }

        &__quantity {
            margin-top: 32px;

            &__header {
                font-size: 16px;
                text-align: center;
                font-weight: 500;
                margin-bottom: 8px;
            }


            &__container {
                width: 50%;
                display: flex;
                justify-content: center;
                margin: auto;
            }


            input {
                @include plain-form-input;
                border: 1px solid lightgray;
                max-width: fit-content;
                padding: 8px;
                text-align: center;
                border-radius: 50px;
                margin: 0 8px;

                &:focus {
                    outline: none;
                }
            }

            button {
                border-radius: 50px;
                font-size: 14px;
                font-weight: 700;
                border: 1px solid lightgray;
                width: 100px;
                padding: 8px 16px;

            }
        }

        &__ctas {
            margin: 32px auto;
            display: flex;
            justify-content: center;

            button {
                @include smallbutton;
                //background: gold;
                //color: black;
                background: $gradient-background !important;
                color: white;
            }
        }
    }


    &__header {
        display: flex;
        align-items: center;

        &__name {
            font-size: 18px;
            margin-right: 16px;
        }

        &__price {
            font-size: 16px;
        }
    }

    &__description {
        padding: 16px;
        color: $charcoal;
    }



    &__footer {
        width: 100%;

        &__form {
            display: flex;
            justify-content: space-between;

            &__quantity {
                display: flex;

                button {
                    height: 40px;
                    width: 40px;
                    padding: 0;
                }

                input {
                    border-radius: 5px;
                    border: 1px solid whitesmoke;
                    width: 40px;
                    text-align: center;
                    margin: 0 8px;


                    &:hover {
                        outline: 1px solid whitesmoke;
                    }
                }
            }
        }

        &__cta {
            margin-top: 32px;
            display: flex;
            justify-content: flex-end;

            button {
                background-color: gold;
                color: black;
            }
        }
    }
}
</style>
