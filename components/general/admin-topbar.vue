<template>
    <div class="top">
        <div class="top__container">
            <div @click="goTo(item.route)" class=" top__item" :class="[isSelected(item.name) ? 'selected' : '']"
                v-for="(item, index) in items" :key="index">
                {{ item.name }} <span v-if="item && item.update_key && updateItems[item.update_key]"> {{
                    updateItems[item.update_key]
                }}</span>


            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {

    watch: {

    },
    computed: {
        ...mapGetters("updates", ['updateItems']),

        ...mapGetters('dashboard', ['active'])


    },
    data() {
        return {
            items: [
                /*{
                    name: "Overview",
                    route: "/admin/dashboard/overview"
                },*/
                {
                    name: "Customers",
                    route: "/admin/dashboard/customers"

                },
                {
                    name: "Products",
                    route: "/admin/dashboard/products"
                },
                {
                    name: "Sales",
                    route: "/admin/dashboard/sales",
                    update_key: 'sales',
                },
                {
                    name: "New Orders",
                    route: "/admin/dashboard/new-orders",
                    update_key: 'pending_sales'

                },
                {
                    name: "Loyalty Programs",
                    route: "/admin/dashboard/loyalty-programs",
                    //update_key: 'loyalty-programs'

                },
                {
                    name: "Offers",
                    route: "/admin/dashboard/Offers"
                },
                {
                    name: "Wallet",
                    route: "/admin/dashboard/wallet"
                },
                {
                    name: "Notifications",
                    route: "/admin/dashboard/notifications"
                },
                {
                    name: "Settings",
                    route: "/admin/dashboard/settings"
                },
            ]
        };
    },
    methods: {

        goTo(link) {
            this.$router.push(link);
        },
        isSelected(name) {
            if (this.$route.path.toLowerCase().split('-').join(' ').indexOf(name.split('-').join(' ').toLowerCase()) > -1) return true
            return false
        },
        getUpdates(type) {
            return this.updateItems && this.updateItems[type]
        }
    },
    created() {
    }
};
</script>

<style lang="scss" scoped>
span {
    background: red;
    color: white;
    border-radius: 100px;
    padding: 8px;
}

.top {
    //@include card;
    background-color: #2c2e3e;
    color: white;

    &__container {
        display: flex;
        justify-content: center;
        padding-top: 4px;
    }

    &__item {
        padding: 16px 16px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
    }
}

.selected {
    background: white !important;
    color: $charcoal;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
</style>