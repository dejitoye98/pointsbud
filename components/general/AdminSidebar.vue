<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <div class="sidebar__logo"></div>
      <div class="sidebar__content">
        <div class="sidebar__item" :class="[isSelected(item.name) ? 'selected' : '']" @click="goTo(item.route)"
          v-for="(item, index) in items" :key="index">
          <img v-if="item.name === 'Customers'" src="../../static/sidebar_customers.svg" />
          <img v-if="item.name === 'Offers'" src="../../static/sidebar_offers.svg" />
          <img v-if="item.name === 'Sales'" src="../../static/sidebar_sales.svg" />
          <img v-if="item.name === 'Products'" src="../../static/sidebar_products.svg" />

          <p>{{ item.name }}</p>
        </div>
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
        }
      ]
    };
  },
  methods: {
    isSelected(name) {
      if (this.$route.path.includes(name)) return true
      return false
    },
    goTo(link) {
      this.$router.push(link);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  background: white;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.041) 0px 4px 6px;

  &__container {
    //padding: 8px;
    // margin-top: 24px;
  }

  &__logo {
    // height: 200px;
    //background: #d044445e;

  }

  &__content {
    margin-top: 60px;
    padding: 16px;
  }

  &__item {
    display: flex;
    color: $faint;
    font-size: 16px;
    font-weight: 400;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      background: rgba(211, 211, 211, 0.219);
    }

    img {
      margin-right: 8px;
    }
  }
}

.selected {
  background: $primary;
  color: white;

  img {
    stroke: white !important;
  }
}
</style>