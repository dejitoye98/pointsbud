<template>
    <div class="top">
        <div class="top__container">
            <div @click="goTo(item.route)" class=" top__item" :class="[isSelected(item.name) ? 'selected' : '']"
                v-for="(item, index) in items" :key="index">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
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
                    route: "/admin/dashboard/sales"
                },
                {
                    name: "Offers",
                    route: "/admin/dashboard/Offers"
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
            if (this.$route.path.toLowerCase().indexOf(name.toLowerCase()) > -1) return true
            return false
        },
    },
    created() {
    }
};
</script>

<style lang="scss" scoped>
.top {
    //@include card;
    background-color: teal;
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