<template>
  <div class="product">
    <div class="product__details">
      <div class="product__image">
        <img :src="item.thumbnail" alt />
      </div>
      <div class="product__content">
        <p class="product__content__name">{{item.name}}</p>
        <p class="product__content__price">{{item.currency}} {{item.unitprice | money}}</p>
        <div class="product__content__analysis" style="display: flex">
          <p
            class="product__content__analysis__earn"
            style="color: lightseagreen; margin-right: 8px;"
          >+{{item.points_to_earn}} points</p>
          <p
            class="product__content__analysis__deduct"
            style="color: red; margin-right: 8px;"
          >-{{item.points_to_deduct}} points</p>
        </div>
        <div class="product__content__form">
          <button @click="decreaseQuantity">-</button>
          <input type="text" value="1" v-model="model.quantity" />
          <button @click="increaseQuantity">+</button>
        </div>

        <div
          class="product__content__points"
          v-if="points_left>=item.points_to_earn * model.quantity"
        >
          <label>
            <input type="checkbox" @change="usePoints" />
            Use {{item.points_to_earn * model.quantity}} points
          </label>
        </div>
      </div>
    </div>
    <div class="product__action">
      <button @click="addProduct">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "points_left"],
  data() {
    return {
      model: {
        quantity: 1,
        used_points: 0
      }
    };
  },

  methods: {
    usePoints() {
      this.model.used_points = this.item.points_to_earn * this.model.quantity;
    },
    addProduct() {
      if (this.points_left < this.item.points_to_earn * this.model.quantity) {
        this.models.used_points = null;
      }
      this.$emit("onProductAdded", {
        ...this.item,
        ...this.model,
        totalPrice: this.item.unitprice * this.model.quantity
      });
    },
    increaseQuantity() {
      this.model.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity !== 0) {
        this.model.quantity--;
      }
    }
  }
};
</script>
</script>

<style lang="scss" scoped>
.product {
  padding: 8px;
  border: 1px solid whitesmoke;
  display: flex;
  justify-content: space-between;
  font-size: 15px !important;
  color: $charcoal;
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
      // font-size: 16px;
      color: black;
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
        border: $faint;
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
</style>