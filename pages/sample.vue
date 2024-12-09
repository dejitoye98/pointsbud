<template>
    <div class="page" v-if="business">
        <div class="header">
            <div class="header__container">
                <div class="logo">
                    <div class="logo__container">
                        
                        <img src="https://pointsbud-images.s3.amazonaws.com/5b4026dc9bcadb17af9eb81ad3e3d8f0">
                        <h1>PointsBud</h1>
                        
                    </div>
                </div>
                <div class="search"></div>
            </div>
        </div>

        <div class="tabs">
            <div class="tabs__container">
                <div class="tabs__item" :class="[current_tab === tab.toLowerCase()?  'selected_tab': '']" @click="selectTab(tab)" v-for="(tab, index) in tabs" :key="index">
                    <p>{{tab}}</p>
                </div>
            </div>
        </div>

        <div>
            <ShopCategoryNavigation v-if="current_tab === 'shop' " @changeCategory="changeCategory" :current_category="current_category" :categories="filteredCategories"></ShopCategoryNavigation>

        </div>
    </div>
</template>

<script>
import ShopCartModal from '../components/modals/ShopCartModal.vue';
import SimpleListShopItem from '../components/shop/SimpleListShopItem.vue';
import {mapGetters} from 'vuex';
import ShopCategoryNavigation from '../components/navigations/ShopCategoryNavigation.vue';
import mixpanel from 'mixpanel-browser';
import GridItem from '../components/shop/GridItem.vue';

export default {
    data() {
        return {
            search_term: '',
            current_tab: "shop",
            current_category: null,
            business: null,
            categories: [],
            loading_data: false,
            tabs: ["Shop", "Deals", "Announcements", "Purchase History"]
        }
    },
    computed: {
        ...mapGetters("shop", ['cart']),

    },
    watch: {
        loading_data(value) {
            if (!value) {
                // set the current_category to the first category
                this.current_category = Object.keys(this.categoryProductMapping)[0]
                this.mixpanel = mixpanel.init('1f580add8d0558ccae5fc19ca5997dab', { debug: false, track_pageview: false });
                mixpanel.track("Store Viewed", this.business.name)
            }
        },
        search_term(value) {
            if (!value) {
                this.search_mode = false;
                this.searched_products = []

            }
        }
    },
    async fetch() {
        const response = await this.$api.get('/businesses/store-products?slug=' + 'test');
        const { business, products } = response.data.data;
        const categories = business.categories;
        this.business = business;
        this.products = products;
        this.categories = categories;
        this.loading_data = false
    },
    methods: {
    
        changeCategory(category_name) {
            const category_element = document.getElementById(category_name);
            category_element?.scrollIntoView({behavior: 'smooth'})
        },
        selectTab(tab) {
            this.current_tab = tab.toLowerCase()
        }
    }
}
</script>


<style lang="scss" scoped>
*{
    font-family: "Inter", sans-serif;
}
.tabs {
    &__container {
        display: flex;
        gap: 16px;
        background-color: whitesmoke;
    }
    &__item {
        padding: 16px;

        p {

            font-weight: 500 !important;
        }
    }

  
}

.selected_tab {
    border-bottom: 5px solid black;
}

.header {
    background-color: whitesmoke;
    &__container {
        padding: 16px;
    }
}

.logo {
    display: flex;
    &__container {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    h1 {
        font-weight: 600;
    }
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
}
</style>