<template>
  <div class="orders">
    <div class="orders__title">
      <h2>Your orders</h2>
    </div>

    <template v-if="!loading && orders.length">
        <div class="orders__container" >
            <div class="order" v-for="(order, index) in orders" :key="index">
                <div class="order__container">
                <div class="order__product-image">
                    <img :src="order.product.thumbnail" alt />
                </div>

                <div class="order__details">
                    <div class="order__product-title">
                        <p>{{order.product.name}}</p>
                        <span class="order__product">x {{order.qty}}</span>
                    </div>
                    <div class="order__price">
                        <p>Seller: {{order.product.business.name}}</p>
                    </div>
                    <div class="order__price">
                        <p>{{order.product.currency || 'NGN'}} {{order.amount_paid}}</p>
                    </div>
                    <div class="order__delivery">
                        <p>Expected delivery date: Jan 24, 2023</p>
                    </div>

                    <div class="order__status" :class="computeStatusClass(order.status)">
                    <div class="order__status__indicator"></div>
                        <p>{{order.status}}</p>
                    </div>

                    <div class="order__ctas" v-if="order.status === 'delivery-overdue'">
                        <button disabled>Seek refund</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </template>
        <template v-else-if="loading">
            <LoadingState/>
        </template>
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
      }
  },
  created() {
    this.getOrders();
    this.$store.commit('customer_dashboard/setActive', "Orders");
  },
  
  methods: {
      computeStatusClass(status) {
          if (['incomplete', 'delivery-overdue'].includes(status)) {
              return ['incomplete']
          }
          else if (status === 'delivered') {
              return ['delivered']
          }
          else {
              return ['awaiting']
          }
      },
    async getOrders() {
        this.loading = true;
      this.orders = await this.$api
        .get("/customers/orders")
        .then(resp => {
          return resp.data.data.list;
        })
        .catch(err => {}).finally(()=>{
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