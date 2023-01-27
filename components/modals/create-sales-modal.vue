<template>
  <BaseModal @close="$emit('close', true)">
    <template #header>New sale</template>
    <template #body>
      <template v-if="step == 1">
        <div class="customer">
          <label>Search Customer</label>
          <div class="customer__form">
            <select>
              <option value="code">Code</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
            </select>
            <input />
          </div>
        </div>
      </template>
      <template v-else-if="step==2">
        <div class="sales">
          <div class="sales__header">
            <div>
              <p>Deji Atoyebi</p>
              <p class="small-text">itisdeji@gmail.com</p>
            </div>
            <div>
              <p>Available Points</p>
              <div style="display: flex">
                <img src="../../static/coins.png" />
                <p class="small-text">50</p>
              </div>
            </div>
          </div>

          <div class="main">
            <div class="products">
              <div class="products__search">
                <img src="../../static/search.svg" />
                <input type="text" placeholder="search for item" />
              </div>
              <div v-for="(product, index) in products" :key="index">
                <OrderProductItem @onProductAdded="addProduct" :item="product" />
              </div>
            </div>
            <div class="orders">
              <h3 class="orders__title">Order</h3>
              <div class="order" v-for="(order, index) in orders" :key="index">
                <div class="order__header">
                  <p>
                    {{order.name}}
                    <span class="bold">x {{order.quantity}}</span>
                  </p>
                  <div v-if="order.used_points">
                    <img src="../../static/coins.png" />

                    <p>{{order.used_points}}</p>
                  </div>

                  <div v-else>
                    <p>NGN</p>
                    <p>400000</p>
                  </div>
                </div>
                <button @click="removeOrder(index)">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template #footer>
      <div class="footer">
        <div class="footer-detail" v-if="step === 2">
          <div>
            <div class="footer-detail__item">
              <p>Total price</p>
              <p>NGN 40,000</p>
            </div>
            <div class="footer-detail__item">
              <p>Used Points</p>
              <p>40</p>
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end">
            <button @click="nextStep">Continue</button>
          </div>
        </div>
        <button v-else>Create</button>
      </div>
    </template>
  </BaseModal>
</template>

<script>
export default {
  data() {
    return {
      step: 2,

      customer: {
        field: "",
        value: ""
      },

      products: [
        { name: "Ewa Agoyin" },
        { name: "Eba and Egusi" },
        { name: "Fish " }
      ],

      orders: []
    };
  },
  methods: {
    nextStep() {
      this.step++;
    },
    addProduct(item = {}) {
      this.orders.push(item);
    },
    removeOrder(index) {
      this.orders.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.bold {
  font-weight: 600;
}
.form {
  padding: 16px;
}
.form-input {
  @include plain-form-input;
  &--noborder {
    border: 0 !important;
    input {
      border: 0 !important;
    }
  }
}
.sales {
  min-width: 900px;

  height: 80vh;
  overflow: scroll;
  &__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid whitesmoke;
    padding: 16px;

    p {
      font-size: 14px;
      color: $charcoal;
      &:first-of-type {
        //font-size: 18px;
        //color: $lightaccent;
      }
    }
  }
}
.customer {
  padding: 16px;
  width: 600px;
  label {
    font-size: 16px;
    color: $charcoal;
    margin-bottom: 16px;
  }
  &__form {
    @include plain-form-input;
    width: 100%;
    display: flex;
    flex-direction: row;
    select {
      width: 30%;
      font-size: 16px;
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    input {
      width: 90%;
      font-size: 16px;

      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      width: 100%;
    }
  }
}
.main {
  display: grid;
  grid-template-columns: 60% 40%;

  .orders {
    // max-height: 500px;
    overflow: scroll;
    &__title {
      min-height: 50px;
      display: flex;
      align-items: center;
      color: $charcoal;

      padding: 0 16px;
      border-bottom: 1px solid whitesmoke;
    }
    //  border-right: 0.5px solid lightgrey;
    .order {
      background: #b69ce72a;
      padding: 16px;
      color: $charcoal;
      font-size: 14px;
      border-bottom: 2px solid whitesmoke;
      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      button {
        border: 0.5px solid $charcoal;
        border-radius: 5px;
        margin-top: 8px;
        padding: 2px 8px;
        &:hover {
          background: white;
        }
      }
    }
  }

  .products {
    margin-bottom: 16px;
    &__search {
      margin: 0px 0;
      padding: 0 8px;
      position: relative;
      //ßborder: 1px solid purple;
      height: 50px;
      border: 2px solid whitesmoke;
      border-top: 0;
      border-bottom: 0;

      svg {
        position: absolute;
        top: 0;
        left: 0;
      }

      input {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        width: 100%;
        border-radius: 8px;
        border-radius: 10px;
        padding: 16px;
        border: 0;
        &:focus {
          border: 0;
          outline: 0;
        }
      }
    }
    .product {
      padding: 8px;
      border: 1px solid whitesmoke;
      display: flex;
      justify-content: space-between;
      &__details {
        display: flex;
      }
      &__image {
        width: 120px;
        height: 100%;
        //: whitesmoke;
        margin-right: 8px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &__content {
        display: flex;
        flex-direction: column;

        &__name {
          font-size: 20px;
        }
        &__price {
        }
        &__form {
          display: flex;
          p {
            margin-right: 16px;
          }
          input {
            width: 40px;
            border: 1px solid lightgrey;
            margin: 0 8px;
            border-radius: 5px;
            text-align: center;
          }
          button {
            @include smallbutton;
            background: transparent;
            color: $primary;
            height: 30px;
            width: 30px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        &__points {
          margin: 8px 0;
          label {
            width: 100%;
            color: $charcoal;
            display: flex;
            align-items: center;
          }
          input {
            height: 20px;
            width: 20px;
            margin-right: 8px;
          }
        }
      }
      &__action {
        button {
          @include smallbutton;
          background: transparent;
          color: $lightaccent;
          &:hover {
            color: white;
          }
        }
      }
    }
  }
}
.footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid whitesmoke;
  padding-top: 16px;
}
.footer-detail {
  width: 40%;
  font-size: 16px;
  &__item {
    display: flex;
    margin-bottom: 8px;
    justify-content: space-between;
  }
}
</style>
