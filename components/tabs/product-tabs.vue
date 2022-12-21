<template>
  <div>
    <base-tabs
      v-if="params && Object.keys(params).length > 0"
      :params="params"
      :business_tabs="business_tabs"
    ></base-tabs>
  </div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    return {
      marketer_tabs: [],
      business_tabs: [
        {
          name: "Info",
          route: "/dashboard/products/:id",
          show: true
        },
        {
          name: "Orders",
          route: "/dashboard/products/:id/orders",
          show: true
        },
        {
          name: "Sales",
          route: "/dashboard/products/:id/sales",
          show: true
        }
      ]
    };
  },
  computed: {
    userContext() {
      return window.localStorage.getItem("afContext");
    },
    userDetails() {
      return JSON.parse(window.localStorage.getItem("afUserDetails"));
    },
    canChangePassword() {
      return (
        this.password.old_password &&
        this.password.new_password &&
        this.password.confirm_password &&
        this.password.new_password === this.password.confirm_password
      );
    }
  }
};
</script>