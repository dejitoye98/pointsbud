<template>
  <div class="orders">
    <div class="orders__title">
      <h2>Your refunds</h2>
    </div>

    <div class>
      <p>You have no refunds yet</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: "customer-dashboard",
  data() {
    return {
      loading: true,
      orders: []
    };
  },
  created() {
    this.$store.commit("customer_dashboard/setActive", "Refunds");
  },

  methods: {
    computeStatusClass(status) {
      if (["incomplete", "delivery-overdue"].includes(status)) {
        return ["incomplete"];
      } else if (status === "delivered") {
        return ["delivered"];
      } else {
        return ["awaiting"];
      }
    },
    async getOrders() {
      this.loading = true;
      this.orders = await this.$api
        .get("/customers/orders")
        .then(resp => {
          return resp.data.data.list;
        })
        .catch(err => {})
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.orders {
  width: 80%;
  height: 50px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;

  &__title {
    h2 {
      font-size: 20px;
      color: $faint;
    }
    margin-bottom: 16px;
  }
  &__container {
    padding: 16px 0;
    display: grid;
    width: 100%;
    grid-template-columns: 30% 30% 30%;

    justify-content: space-between;
    @include media("<=t") {
      grid-template-columns: 100%;
    }
  }
}

.order {
  @include card;
  height: max-content;
  padding: 16px;
  max-width: 500px;
  margin-bottom: 8px;
  &__container {
    display: grid;
    grid-template-columns: 20% 79%;
    justify-content: space-between;
    color: $charcoal;
    font-size: 14px;
  }
  &__product-image {
    margin-right: 8px;
    width: 100%;
    img {
      object-fit: cover;
    }
  }
  &__product-title {
    display: flex;
    p {
      margin-right: 8px;
      font-size: 20px;
      font-weight: 500;
      color: black;
    }
    span {
      color: lightseagreen;
      font-size: 14px;
    }
  }
  &__ctas {
    button {
      margin-top: 8px;
      @include smallbutton;
    }
  }
  &__status {
    display: flex;
    align-items: center;
    &__indicator {
      height: 10px;
      width: 10px;
      background: lightseagreen;
      margin-right: 8px;
      border-radius: 50%;
    }
    p {
      color: lightseagreen;
    }
  }
}

.incomplete {
  div {
    background: red;
  }
  p {
    color: red !important;
  }
}
.awaiting {
  div {
    background: orange;
  }
  p {
    color: orange !important;
  }
}
</style>