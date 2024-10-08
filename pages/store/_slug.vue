<template>
    <div>
        <ShopCartModal @close="show_cart_modal = false" v-if="show_cart_modal && this.cart.length">

        </ShopCartModal>
        <div class="page__container">
            <div class="sidebar">

                
            </div>

            <div class="main" v-if="business">
                <div class="navbar">
                    <div class="navbar__container space-between flex-center-y">

                        <div class="logo flex gap-2 flex-center-y">
                            <HalfLogo></HalfLogo>
                            <p>{{business.name}}</p>
                        </div>

                        <div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_518_2)">
                                <path d="M20 9.99C20 4.475 15.52 0 10 0C4.48 0 0 4.475 0 9.99C0 13.0275 1.38 15.765 3.54 17.6025C3.56 17.6225 3.58 17.6225 3.58 17.6425C3.76 17.7825 3.94 17.9225 4.14 18.0625C4.24 18.1225 4.32 18.2012 4.42 18.2812C6.07325 19.4003 8.02362 19.9989 10.02 20C12.0164 19.9989 13.9667 19.4003 15.62 18.2812C15.72 18.2212 15.8 18.1425 15.9 18.0813C16.08 17.9425 16.28 17.8025 16.46 17.6625C16.48 17.6425 16.5 17.6425 16.5 17.6225C18.62 15.7637 20 13.0275 20 9.99ZM10 18.7413C8.12 18.7413 6.4 18.1412 4.98 17.1425C5 16.9825 5.04 16.8238 5.08 16.6638C5.19957 16.2303 5.37433 15.8139 5.6 15.425C5.82 15.045 6.08 14.705 6.4 14.405C6.7 14.105 7.06 13.8263 7.42 13.6063C7.8 13.3863 8.2 13.2262 8.64 13.1062C9.08357 12.9874 9.5408 12.9273 10 12.9275C11.3634 12.9172 12.6769 13.4402 13.66 14.385C14.12 14.845 14.48 15.3846 14.74 16.0038C14.88 16.3638 14.98 16.7433 15.04 17.1425C13.564 18.1802 11.8043 18.7384 10 18.7413ZM6.94 9.49125C6.76414 9.08766 6.67554 8.65147 6.68 8.21125C6.68 7.7725 6.76 7.3325 6.94 6.9325C7.12 6.5325 7.36 6.17375 7.66 5.87375C7.96 5.57375 8.32 5.335 8.72 5.155C9.12 4.975 9.56 4.895 10 4.895C10.46 4.895 10.88 4.975 11.28 5.155C11.68 5.335 12.04 5.575 12.34 5.87375C12.64 6.17375 12.88 6.53375 13.06 6.9325C13.24 7.3325 13.32 7.7725 13.32 8.21125C13.32 8.67125 13.24 9.09125 13.06 9.49C12.8873 9.88463 12.6432 10.244 12.34 10.55C12.0339 10.8527 11.6745 11.0964 11.28 11.2688C10.4534 11.6077 9.5266 11.6077 8.7 11.2688C8.30547 11.0964 7.94612 10.8527 7.64 10.55C7.33656 10.2483 7.0983 9.88878 6.94 9.49125ZM16.22 16.1238C16.22 16.0838 16.2 16.0638 16.2 16.0238C16.0037 15.3979 15.7137 14.8053 15.34 14.2663C14.966 13.7232 14.5067 13.2441 13.98 12.8475C13.5776 12.5447 13.1413 12.2896 12.68 12.0875C12.8889 11.9478 13.0832 11.7874 13.26 11.6087C13.5582 11.3144 13.82 10.9854 14.04 10.6288C14.4845 9.90167 14.7133 9.06332 14.7 8.21125C14.7065 7.58061 14.584 6.9553 14.34 6.37375C14.0994 5.81331 13.7531 5.30447 13.32 4.875C12.8865 4.45131 12.3778 4.11218 11.82 3.875C11.2376 3.63107 10.6114 3.50898 9.98 3.51625C9.34852 3.50937 8.72232 3.63189 8.14 3.87625C7.57605 4.11054 7.0657 4.45716 6.64 4.895C6.2141 5.32621 5.87466 5.83494 5.64 6.39375C5.39597 6.9753 5.27346 7.60061 5.28 8.23125C5.28 8.67125 5.34 9.09083 5.46 9.49C5.58 9.91 5.74 10.29 5.96 10.6488C6.16 11.0088 6.44 11.3288 6.74 11.6288C6.92 11.8088 7.12 11.9683 7.34 12.1075C6.87662 12.3138 6.44008 12.5757 6.04 12.8875C5.52 13.2875 5.06 13.7662 4.68 14.2862C4.30284 14.8233 4.01262 15.4164 3.82 16.0438C3.8 16.0838 3.8 16.1237 3.8 16.1437C2.22 14.545 1.24 12.3875 1.24 9.99C1.24 5.175 5.18 1.23875 10 1.23875C14.82 1.23875 18.76 5.175 18.76 9.99C18.7574 12.2899 17.8441 14.4953 16.22 16.1238Z" fill="black"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_518_2">
                                <rect width="20" height="20" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                                
                        </div>
                    </div>
                </div>

                <div v-if="false" class="header flex space-between padding-16 flex-center-y">
                    <div class="header__purchases">Purchases: 0</div>

                    <div class="header__wallet flex gap-2 flex-center-y">
                        <p> {{ "NGN" | currencySymbol }}0</p>
                        <button class="pay-button">Pay</button>
                    </div>
                </div>

                <div class="tabs">
                    <div class="tab active-tab">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33333 4.99992V3.33325H16.6667V4.99992H3.33333ZM3.33333 16.6666V11.6666H2.5V9.99992L3.33333 5.83325H16.6667L17.5 9.99992V11.6666H16.6667V16.6666H15V11.6666H11.6667V16.6666H3.33333ZM5 14.9999H10V11.6666H5V14.9999ZM4.20833 9.99992H15.7917L15.2917 7.49992H4.70833L4.20833 9.99992Z" fill="black"/>
                            </svg>
                            
                        Store
                    </div>
                    <div class="tab">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 12.5H10.625C11.3125 12.5 11.875 11.9375 11.875 11.25C11.875 10.5625 11.3125 10 10.625 10H9.375C8.6875 10 8.125 9.4375 8.125 8.75C8.125 8.0625 8.6875 7.5 9.375 7.5H12.5M10 5.625V7.08375M10 11.875V14.375M16.875 6.25V16.875H3.75M3.125 13.75V3.125H15" stroke="black" stroke-width="1.25" stroke-linejoin="round"/>
                            </svg>
                            
                        Deals
                    </div>
                    <div class="tab" v-if="false">Reservations</div>
                    <div class="tab">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 17.5C8.08333 17.5 6.41333 16.8647 4.99 15.5942C3.56667 14.3236 2.75056 12.7367 2.54167 10.8333H4.25C4.44444 12.2778 5.08694 13.4722 6.1775 14.4167C7.26806 15.3611 8.54222 15.8333 10 15.8333C11.625 15.8333 13.0036 15.2675 14.1358 14.1358C15.2681 13.0042 15.8339 11.6256 15.8333 10C15.8328 8.37444 15.2669 6.99611 14.1358 5.865C13.0047 4.73389 11.6261 4.16778 10 4.16667C9.04167 4.16667 8.14583 4.38889 7.3125 4.83333C6.47917 5.27778 5.77778 5.88889 5.20833 6.66667H7.5V8.33333H2.5V3.33333H4.16667V5.29167C4.875 4.40278 5.73972 3.71528 6.76083 3.22917C7.78194 2.74306 8.86167 2.5 10 2.5C11.0417 2.5 12.0175 2.69806 12.9275 3.09417C13.8375 3.49028 14.6292 4.02472 15.3025 4.6975C15.9758 5.37028 16.5106 6.16194 16.9067 7.0725C17.3028 7.98306 17.5006 8.95889 17.5 10C17.4994 11.0411 17.3017 12.0169 16.9067 12.9275C16.5117 13.8381 15.9769 14.6297 15.3025 15.3025C14.6281 15.9753 13.8364 16.51 12.9275 16.9067C12.0186 17.3033 11.0428 17.5011 10 17.5ZM12.3333 13.5L9.16667 10.3333V5.83333H10.8333V9.66667L13.5 12.3333L12.3333 13.5Z" fill="black"/>
                            </svg>
                            
                        Purchase History
                    </div>
                </div>

                <div class="search">
                    <svg class="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.2375 16.7948L11.0192 11.5765C10.6025 11.9315 10.1233 12.2062 9.58167 12.4006C9.04001 12.5951 8.49556 12.6923 7.94834 12.6923C6.6139 12.6923 5.48445 12.2303 4.56001 11.3065C3.63556 10.3826 3.17334 9.2534 3.17334 7.91896C3.17334 6.58452 3.63501 5.45479 4.55834 4.52979C5.48167 3.60479 6.61056 3.14174 7.94501 3.14063C9.27945 3.13952 10.4095 3.60174 11.335 4.52729C12.2606 5.45285 12.7233 6.58257 12.7233 7.91646C12.7233 8.49535 12.6208 9.05563 12.4158 9.59729C12.2108 10.139 11.9414 10.6023 11.6075 10.9873L16.8258 16.2048L16.2375 16.7948ZM7.94917 11.8581C9.05473 11.8581 9.98806 11.4776 10.7492 10.7165C11.5103 9.95535 11.8908 9.02174 11.8908 7.91563C11.8908 6.80952 11.5103 5.87618 10.7492 5.11563C9.98806 4.35507 9.05473 3.97452 7.94917 3.97396C6.84362 3.9734 5.91001 4.35396 5.14834 5.11563C4.38667 5.87729 4.00612 6.81063 4.00667 7.91563C4.00723 9.02063 4.38778 9.95396 5.14834 10.7156C5.9089 11.4773 6.84223 11.8578 7.94834 11.8573" fill="black"/>
                    </svg>
                        
                    <input type="text" v-model="search_term" @input="debounceSearch" placeholder="search for anything">

                </div>
                
                <div class="list" v-if="!search_mode"> 
                
                    <div class="section" v-for="(category, index) in Object.keys(categoryProductMapping)">
                        <p class="category-name" >{{category}}</p>
                        <SimpleListShopItem :item="item" v-for="(item, index) in categoryProductMapping[category]" :key="index">
                            <div class="gap-2 flex flex-center-y">
                                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3333 10L8.33325 5L7.15825 6.175L10.9749 10L7.15825 13.825L8.33325 15L13.3333 10Z" fill="#636363"/>
                                    </svg>
                                    
                                <p>{{item.name}}</p>
                                <p class="single-line-ellipsis">{{item.description}}</p>
                            </div>

                            <div class="flex gap-2 flex-center-y">

                                <div>
                                    {{ "NGN" | currencySymbol }} 200.00
                                </div>
                                <div>
                                    <button class="quantity-choose">+</button>
                                </div>
                            </div>
                        </SimpleListShopItem>

                        <div v-if="categoryProductMapping[category][0].remaining_products" class="padding-16 see-more">
                            <p class="text-center">
                                See {{ categoryProductMapping[category][0].remaining_products }} more products
                            </p>
                        </div>

                        
                    </div>



                </div>

                <div class="list" v-else>
                    <div class="section">
                        <SimpleListShopItem :item="product" v-for="(product, index) in searchedProducts" :key="index"></SimpleListShopItem>

                        <template v-if="searching_db">
                            <div class="flex-col flex-center-x flex-center-y">
                                <LoadingState></LoadingState>
                                <span>Searching items...</span>
                            </div>
                        </template>
                    </div>
                    
                </div>

                <div class="bottom-sticky">
                    <div class="floating-cart" v-if="cart?.length" @click="show_cart_modal = !show_cart_modal">

                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1667 15C14.6087 15 15.0326 15.1756 15.3452 15.4881C15.6577 15.8007 15.8333 16.2246 15.8333 16.6666C15.8333 17.1087 15.6577 17.5326 15.3452 17.8451C15.0326 18.1577 14.6087 18.3333 14.1667 18.3333C13.7246 18.3333 13.3007 18.1577 12.9882 17.8451C12.6756 17.5326 12.5 17.1087 12.5 16.6666C12.5 15.7416 13.2417 15 14.1667 15ZM0.833344 1.66663H3.55834L4.34168 3.33329H16.6667C16.8877 3.33329 17.0997 3.42109 17.2559 3.57737C17.4122 3.73365 17.5 3.94561 17.5 4.16663C17.5 4.30829 17.4583 4.44996 17.4 4.58329L14.4167 9.97496C14.1333 10.4833 13.5833 10.8333 12.9583 10.8333H6.75001L6.00001 12.1916L5.97501 12.2916C5.97501 12.3469 5.99696 12.3999 6.03603 12.4389C6.0751 12.478 6.12809 12.5 6.18334 12.5H15.8333V14.1666H5.83334C5.39132 14.1666 4.96739 13.991 4.65483 13.6785C4.34227 13.3659 4.16668 12.942 4.16668 12.5C4.16668 12.2083 4.24168 11.9333 4.36668 11.7L5.50001 9.65829L2.50001 3.33329H0.833344V1.66663ZM5.83334 15C6.27537 15 6.69929 15.1756 7.01185 15.4881C7.32441 15.8007 7.50001 16.2246 7.50001 16.6666C7.50001 17.1087 7.32441 17.5326 7.01185 17.8451C6.69929 18.1577 6.27537 18.3333 5.83334 18.3333C5.39132 18.3333 4.96739 18.1577 4.65483 17.8451C4.34227 17.5326 4.16668 17.1087 4.16668 16.6666C4.16668 15.7416 4.90834 15 5.83334 15ZM13.3333 9.16663L15.65 4.99996H5.11668L7.08334 9.16663H13.3333Z" fill="white"/>
                            </svg>
                            


                    </div>
                </div>

                <div class="bottom-nav" v-if="false">
                    <div>Hi</div>
                </div>
            </div>

            <div>

            </div>
        </div>
    </div>
</template>


<script>
import ShopCartModal from '../../components/modals/ShopCartModal.vue';
import SimpleListShopItem from '../../components/shop/SimpleListShopItem.vue';
import {mapGetters} from 'vuex';

export default {
    data() {
        return {

            search_mode: false,
            search_timeout: null,
            search_term: "",
            searching_db: false,
            searched_products: [],


            products: [],
            business: null,
            categories: null,


            show_cart_modal: false,
        };
    },
    methods: {
        debounce(func, delay) {
            clearTimeout(this.search_timeout); // Clear the previous timer

            this.search_timeout = setTimeout(() => {
                func();
            }, delay);
        },

    // The search function to execute after debounce
        search() {
            console.log("Searching for:", this.search_term);
            if (this.search_term) this.search_mode = true;
            this.searchDb()
        // Add your search logic here (API call, etc.)
        },

        debounceSearch() {
            this.debounce(this.search, 1500)
        },
        searchDb() {
            this.searching_db = true;
            this.$api.get('/products?business_id=149&name='+this.search_term).then(resp=> {
                this.searched_products = resp.data.data;
            }).finally(()=> {
                this.searching_db = false;
            })
        }
    },
    async fetch() {
        const response = await this.$api.get('/businesses/store-products?slug=Alhaja');
        const { business, products } = response.data.data;
        const categories = business.categories;
        this.business = business;
        this.products = products;
        this.categories = categories;
    },
    computed: {
        ...mapGetters("shop", ['cart']),
        searchedProducts() {
            let final = []
            if (this.search_term) {

                const products = this.products.filter(p=> {
                    return p.name.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1 
                    || p.description?.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1 
                    //|| p.cateo.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1 
                })

                final = products;

                const categories = this.categories.filter(c=> c.name?.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1);
                let category_products  = this.products.filter(p=> categories.map(c=> c.id).includes(p.category_id))
                if (category_products.length) {
                    for (let p of category_products) {
                        if (!final.find(pr=> pr.name == p.name)) 
                        final.push(p)
                    }
                
                }
                if (this.searched_products.length) {
                    for (let p of this.searched_products) {
                        if (!final.find(pr=> pr.name == p.name)) 
                        final.push(p)
                    }
                }
                
            }
            return final
        },
        categoryProductMapping() {
            const mapping = {

            }
            if (this.categories) {

    
                for (let c of this.categories) {
                    const category_products = this.products
                        .filter(p => p.category_id === c.id)
                        .sort((a, b) => a.name.localeCompare(b.name));
                    if (category_products.length) {
                        mapping[c.name] = category_products;
                    }
                }
            }
            return mapping;
        }
    },
    watch: {
        search_term(value) {
            if (!value) {
                this.search_mode = false;
                this.searched_products = []

            }
        }
    },
    components: { SimpleListShopItem, ShopCartModal }
}
</script>

<style lang="scss" scoped>

* {
    font-family: "Inter", sans-serif;
    font-size: 14px;
}

.ad {
    width: 150px;
    border: 1px solid $border-grey;
    border-radius: 10px;
    margin: 2px 0px;

    img {
        border-radius: 10px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        object-fit: cover;

    }
}

.main {
    background-color: $dashboard-background-color !important;
    min-height: 100vh;
}

.input {
    width: 30px;
    height: 30px;
    text-align: center;
    border: 1px solid grey;
}

.header {
    border-bottom: 1px $border-grey solid;
}

.category-name {
    font-family: Poppins, 'san-serif' !important;
    font-size: 16px;
    border-bottom: 1px solid $border-grey;

    //font-style: italic;
    font-weight: 600;
    line-height: 32px;
}

.active-tab {
    background-color: #FFCDD2 !important;
}
.logo {

     p {
        font-size: 18px ;
        font-family: Poppins !important;
        font-weight: 600;

     }
}

.navbar {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &__container {
        padding: 16px;

    }
}

.section {
    padding: 16px;
    margin-bottom: 10px;
}

.search {
    padding: 16px;
    position: relative;

    .icon {
        position: absolute;
        top: 28px;
        left: 25px ;

    }

    input {
        border: 1px solid grey;
        padding: 8px;
        border-radius: 10px;
        padding-left: 32px;
        width: 100%;
        height: 40px;
    }
}

.item {
    //padding: 16px;
    display: flex;
    font-size: 14px;
    color: $charcoal !important;
    padding: 8px 0;
    font-weight: 400;
    //padding: 8px 0px 8px 16px;
    border-bottom: 1px solid $border-grey;

}

.tabs {
    display: flex;
    gap: 8px;
    padding: 16px;

    .tab {
        display: flex;
        gap: 2;
        justify-content: center;
        border-radius: 100px;
        background-color: $border-grey;
        padding: 8px 16px;
        white-space: nowrap;       /* Prevents text from wrapping to the next line */
        text-overflow: ellipsis;   /* Adds an ellipsis ("...") to represent the clipped text */
        width: 100%;     
        font-size: 13px; 
    }
}

.pay-button {
    background-color: $primary;
    color: white;
    padding: 6px 16px;
    border-radius: 10px;
}


.bottom-nav {
    min-height: 80px;
    //height: 50px;
    background-color: $border-grey;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
}

.bottom-sticky {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 16px;
    

}

.floating-cart {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    background-color: $primary;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: ease-in-out 0.5s all;
    
    &:hover {
        transform: scale(1.05);
    }

    
}

.see-more {
    background-color: whitesmoke;
    font-weight: 600;
    cursor: pointer;
}
</style>