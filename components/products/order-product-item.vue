<template>
  <div class="product">
    <div class="product__details">
      <div class="product__image">
        <img src="https://media-cdn.tripadvisor.com/media/photo-p/15/db/e4/b0/photo1jpg.jpg" alt />
      </div>
      <div class="product__content">
        <p class="product__content__name">{{item.name}}</p>
        <p class="product__content__points">40 points/unit</p>
        <div class="product__content__form">
          <button @click="decreaseQuantity">-</button>
          <input type="text" value="1" v-model="model.quantity" />
          <button @click="increaseQuantity">+</button>
        </div>

        <div class="product__content__points">
          <label>
            <input type="checkbox" @change="usePoints" />
            Use 36 points
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
  props: ["item"],
  data() {
    return {
      model: {
        quantity: 1,
        used_points: 0
      }
    };
  },

  methods: {
    addProduct() {
      this.$emit("onProductAdded", { ...this.item, ...this.model });
    },
    increaseQuantity() {
      this.model.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity !== 0) {
        this.model.quantity--;
      }
    },
    usePoints() {
      if (this.model.used_points === 0) {
        this.model.used_points = 34;
      } else {
        this.model.used_points = 0;
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