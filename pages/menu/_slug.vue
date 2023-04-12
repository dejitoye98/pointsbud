<template>
    <div class="menu">


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

                            </div>

                        </div>
                        <div class="cart-modal__container" v-if="cart_step === 2">
                            <div class="cart-modal__item" v-for="(item, index) in cart" :key="index">
                                <div class="cart-modal__item__thumbnail">
                                    <img :src="item.thumbnail" alt="">
                                </div>
                                <div class="cart-modal__item__name">
                                    <div>

                                        <p>{{ item.name }} x <b>{{ item.quantity }} </b>
                                        </p>
                                        <button>Change quantity</button>
                                        <button @click="removeCartItem(item)">Remove</button>
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
                                <div>Total</div>
                                <div>{{ cart[0].currency }} {{ cartTotal | money }}</div>
                            </div>
                        </div>

                        <div class="cart-modal__container" v-if="cart_step === 3">
                            <div class="cart-modal__orderloading">
                                <p>Please hold on while your order is being reviewed</p>
                            </div>

                            <div>
                                <LoadingState></LoadingState>
                            </div>
                        </div>

                        <div class="cart-modal__container" v-if="cart_step === 4">
                            <div class="cart-modal__orderaccepted">
                                <div
                                    style="display: flex; margin-top: 48px; justify-content: center; width: 100px; margin:auto;">

                                    <img src="../../static/confetti.png" style="width: 100%; text-align: center" alt="">
                                </div>

                                <div class="cart-modal__orderaccepted__text"
                                    style="display: flex; margin-top: 16px; margin-bottom: 16px; font-size:16px; justify-content:center">
                                    <p style="text-align: center;">Your order has been accepted and you've earned
                                        {{ points_earned }} points to
                                        be used for future purchases</p>
                                </div>

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

            <BaseModal v-if="show_order_modal" @close="show_order_modal = false">
                <template #header>
                    <div class="order-modal__header" @click.stop>

                        <p class="order-modal__header__name">{{ focused_product.name }}</p>

                    </div>

                </template>
                <template #footer>
                    <div class="order-modal__footer">
                        <div class="order-modal__footer__form">
                            <div class="order-modal__footer__form__quantity">
                                <button @click="decreaseQuantity">-</button>
                                <input style="text-align:center;appearance:none" type="text" v-model="order.quantity">
                                <button @click="increaseQuantity">+</button>
                            </div>

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
                        <p class="order-modal__name">{{ focused_product.description }}</p>
                        <p class="order-modal__description">This is the best omollette you could have</p>

                        <div class="order-modal__images">
                            <div>.</div>
                            <div class="order-modal__images__items">
                                <img :src="focused_product.thumbnail" alt="">

                            </div>
                        </div>

                        <div>.</div>
                    </div>
                </template>
            </BaseModal>

            <div class="menu__container">
                <div class="menu__header">
                    <div class="logo">
                        <img src="data:image/jpeg;base64,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"
                            alt="">
                    </div>
                    <div class="categories">
                        <h2>Categories</h2>
                        <ul>
                            <li :class="[chosenCategory === category.name ? 'selected' : '']"
                                v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">{{
                                    category.name }}</li>
                        </ul>
                    </div>




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
                    </div>


                </div>

                <div class="menu__login">
                    <div id="buttonDiv"></div>
                </div>

                <div class="menu__content" id="menu-content">
                    <div class="product" v-for="(product, index) in filteredProducts" :key="index"
                        @click="showOrderModal(product)">
                        <div class="product__image">
                            <img :src="product.thumbnail || 'data:image/jpeg;base64,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'"
                                alt="">
                        </div>
                        <div class="product__name">
                            {{ product.name }}
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
                </div>


            </div>
        </template>


        <template v-else>
            <div class="loading">
                <div class="logo">
                    <img src="data:image/jpeg;base64,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"
                        alt="">
                </div>
                <p>Loading menu. Please wait...</p>

                <LoadingState></LoadingState>
            </div>

        </template>

    </div>
</template>



<script>
export default {
    data() {
        return {

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
            }]

        }
    },
    async created() {

        this.$api.get(`/businesses?slug=${this.$route.params.slug}`).then(resp => {
            this.business = resp.data.data;
            this.getCategories();
            this.getProducts();
            this.computeCartFromLocalStorage();
            this.isSignedIn()
        })



    },
    mounted() {
        google.accounts.id.initialize({
            client_id: '309539494248-ir1uocjnkh6h8t3in55vn4r2m9jmt777.apps.googleusercontent.com',
            callback: this.googleSignIn, //method to run after user clicks the Google sign in button
            context: 'signin'
        })

        this.initializeGoogleSignin()

        // render button

    },
    computed: {
        filteredProducts() {
            if (this.products) {

                let productsNotInCart = this.products.filter(item => !this.cart.find(cart_item => item.id == cart_item.id)) || [];
                const category = this.categories.find(c => c.name === this.chosenCategory);

                if (category) {

                    productsNotInCart = productsNotInCart.filter(item => item.category_id === category.id) || []
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
            })
            return total
        },
        totalPointsEarned() {
            // this
        }
    },
    methods: {
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
            this.$api.post('/orders', { business_id: this.business.id, items: orders }).then(resp => {

                this.cart_step = 3;
                this.created_order = resp.data.data;

                this.get_order_interval = setInterval(() => {
                    this.getPendingSale();
                }, 10000)
            }).finally(() => {
                this.flag_creating_order = false;
            })

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
* {
    //font-family: 'Red Hat Display' !important;

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
    background: teal !important;
    color: white;
    border-radius: 20px;

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
        position: relative;
        @include smallbutton;
        display: flex;

        svg {
            stroke: white !important;
            margin-right: 8px;
        }
    }


}

.cart-modal {
    min-width: 500px;

    &__redeem {
        padding: 16px;

        &__header {
            font-size: 20px;
            text-align: center;
            color: black;
            font-weight: 600;
        }

        &__auth {
            display: flex;
            margin-top: 16px;
            justify-content: center;
        }
    }

    &__orderloading {
        margin-top: 24px;
        font-size: 20px;
        text-align: center;
        font-weight: 500;
        padding: 16px;
    }

    &__orderaccepted {
        &__offers {
            //background: whitesmoke;
            border: 5px dashed whitesmoke;
            padding: 16px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;

            p {
                font-size: 18px;
                font-weight: 400;
                color: $charcoal;
            }
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
        display: grid;
        grid-template-columns: 19% 49% 29%;
        justify-content: space-between;
        padding: 16px;

        &__thumbnail {
            width: 100%;
            height: 80px;


            img {
                object-fit: cover;
                height: 100%;
                width: 100%;
                border-radius: 5px;

            }
        }

        &__name {
            font-size: 15px;
            //font-weight: 600;

            button {
                border: 0.5px solid whitesmoke;
                border-radius: 5px;
                padding: 2px 8px;

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

    &__image {
        height: 60px;
        width: 60px;
        //border-radius: 50%;
        margin: auto;
        margin-top: -50px;



        img {
            width: 100%;
            height: 100%;
            border-radius: 15px;
            object-fit: cover
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
        color: $charcoal;
        margin-top: 8px;
        //margin-top: 8px;
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
    &__container {
        padding: 24px 0px;
    }

    &__header {
        //background-color: lightgrey;
    }

    &__content {
        display: grid;
        grid-template-columns: 23% 23% 23% 23%;
        justify-content: space-between;
        margin: auto;
        margin-top: 64px;
        width: 90%;

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
    width: 100%;
    margin: auto;
    background: white;
    border-radius: 10px;
    @include card;
    padding: 16px;
    margin: 32px auto;
    border: 1px solid rgb(236, 236, 236);



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
        cursor: pointer;



    }

    li {
        // margin-right: 16px;
        cursor: pointer;
        padding: 2px 16px;
        background: whitesmoke;
        margin-right: 16px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 400;
        cursor: pointer;
        border-radius: 20px;

        &:hover {
            //text-decoration: underline;
            background: whitesmoke;
            color: $charcoal;
        }
    }
}

.order-modal {
    width: 700px;

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

    &__images {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        height: 200px;
        border: 1px solid whitesmoke;
        border-left: 0;
        border-right: 0;
        width: 100%;

        &__items {
            display: flex;
            overflow: scroll;
            width: 100%;
        }

        img {
            border-radius: 5px;
            margin-bottom: 16px;
            margin-right: 8px;

        }
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
        }
    }
}
</style>
