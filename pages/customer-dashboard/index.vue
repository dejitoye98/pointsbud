<template>
  <div class="main">
    <div class="items">
      <div class="item">
        <p class="item__title">Track an order</p>
        <p class="item__caption">See the status of your orders</p>
      </div>
      <div class="item">
        <p class="item__title">Request a refund</p>
        <p class="item__caption">Request a refund for failed deliveries</p>
      </div>
      <div class="item">
        <p class="item__title">Make a complaint</p>
        <p class="item__caption">Send a complaint to Afflee's customer support</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer: null,
      order: null
    };
  },
  created() {
    //for the cookies
    // see if there's an order_id
  },

  methods: {
    getOrder() {}
  }
};
</script>

<style lang="scss" scoped>
.items {
  display: grid;
  grid-template-columns: 32% 32% 32%;
  width: 50%;
  justify-content: space-between;
  margin: auto;
  margin-top: 10vh;
  @include media("<=t") {
    grid-template-columns: 100%;
  }
}
.item {
  cursor: pointer;
  text-align: center;
  @include card;
  border-radius: 10px;
  height: 150px;
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  @include media("<=t") {
    height: 100px;
    cursor: pointer;
  }
  &__title {
    font-weight: 600;
    font-size: 16px;
  }
  &__caption {
    font-weight: 300;
    font-size: 14px;
  }
}
</style>

<script>
export default {
  layout: "customer-dashboard"
};
</script>