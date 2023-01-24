<template>
  <div class="container">
    <PurchaseModal
      :color="primaryColor"
      @close="triggerPurchase"
      v-if="make_purchase && product"
      :marketer="marketer"
      :form="product.order_forms"
      :totalPrice="totalPrice"
      :product="product"
      :quantity="order.quantity"
    ></PurchaseModal>
    <div class="top">
      <div class="top__container">
        <div class="top__logo">
          <img :src="assets && assets.logo" alt />
        </div>
        <div class="top__links">
          <a :style="{'color': primaryColor}">Website</a>
          <a :style="{'color': primaryColor}">Shop</a>
          <a :style="{'color': primaryColor}">Reviews</a>
        </div>
        <div class="top__actions">
          <button :style="{'backgroundColor': primaryColor}">Is this safe?</button>
        </div>
      </div>
    </div>

    <div class="main" v-if="product">
      <div class="main__pictures">
        <div class="main__pictures__image zoomed">
          <img :src="imageInView" />
        </div>

        <div class="main__pictures__more" v-if="product.images">
          <div
            class="main__pictures__more__item"
            @click="showImage(image)"
            v-for="(image, index) in JSON.parse(product.images)"
            :key="index"
          >
            <img :src="image" />
          </div>
        </div>
      </div>
      <div class="main__details">
        <div class="main__details__title">
          <h2>{{product.name}}</h2>
          <p :style="{color:  primaryColor}">by {{product.business.name}}</p>
        </div>
        <div class="main__details__review">
          <div class="stars">
            <no-ssr>
              <star-rating
                star-size="20"
                :show-rating="false"
                v-model="product.rating || 0"
                :read-only="true"
              />
            </no-ssr>
          </div>
          <a
            href
            :style="{'color':  accentColor, 'text-decoration-color': accentColor}"
          >{{product.reviews || 0}} reviews</a>
        </div>

        <div class="main__details__description">
          <TruncatedText :text="product.description" limit="230"></TruncatedText>
        </div>

        <!--- start of variations -->
        <template v-if="Object.keys(variations).length >0">
          <div
            class="main__details__variations section"
            v-for="(variation, v_index) in Object.keys(variations)"
            :key="v_index"
          >
            <h3>{{variation | uppercase}}</h3>

            <div class="variations">
              <label
                class="checkbox"
                :style="variationSelectedStyle(variation, item.name)"
                v-for="(item, i_index) in variations[variation].items"
                :key="i_index"
              >
                <input
                  type="radio"
                  :value="item.name"
                  @change="selectVariation(variation, item.name)"
                />
                {{item.name}}
              </label>
            </div>
          </div>
        </template>

        <!--- end of variations -->

        <div class="main__details__quantity section">
          <h3>Quantity</h3>
          <button
            :style="{'backgroundColor': assets && assets.primary_color}"
            @click="decreaseQuantity"
          >-</button>
          <input
            type="text"
            inputmode="numeric"
            v-model="order.quantity"
            @keypress="isNumber($event)"
          />
          <button
            :style="{'backgroundColor': assets && assets.primary_color}"
            @click="increaseQuantity"
          >+</button>
        </div>

        <div class="main__details__pricing">
          <div class="main__details__pricing__price">
            <p>
              <span>NGN</span>
              {{totalPrice | money}}
            </p>
          </div>
          <div
            class="main__details__pricing__cta"
            :style="{'backgroundColor': assets && assets.primary_color}"
            @click="make_purchase = true"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 8H21"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p>Purchase</p>
          </div>
        </div>
        <div class="main__details__offers">
          <p>Free Shipping</p>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating
  },
  fetchOnServer: true,
  computed: {
    primaryColor() {
      return this.assets.primary_color;
    },
    accentColor() {
      return this.assets.accent_color || this.assets.primary_color;
    },
    assets() {
      return this.brand_assets || {};
    },
    totalPrice() {
      return this.order.quantity * this.product.unitprice;
    },
    imageInView() {
      if (!this.image_in_view) {
        return this.product.thumbnail;
      } else {
        return this.image_in_view;
      }
    }
  },
  watch: {},
  data() {
    return {
      make_purchase: false,
      variations: {
        color: {
          items: [
            { name: "Green", images: [] },
            { name: "Pink", images: [] }
          ],
          selected: ""
        },
        size: {
          items: [],
          selected: ""
        }
      },
      rating: 5,
      order: {
        quantity: 1
      },
      image_in_view: null
    };
  },
  async asyncData({ route, router, $api }) {
    const slug = route.params.slug;
    const product = await $api
      .get("/products/pub/" + slug)
      .then(async product => {
        return product.data.data;
      })
      .catch(err => {
        alert(err);
      });
    let marketer = null;
    if (route.query.m_uid) {
      marketer = await $api
        .get(
          `/marketers/uid/${route.query.m_uid}?product_id=${product.id}&campaign_id=${product.campaign_id}`
        )
        .then(resp => {
          return resp.data.data;
        });
    }
    if (marketer) {
      route.query.ref = marketer.redir_links[0].redir_link;
    }

    // try to get brandAssets
    let brand_assets;

    brand_assets = await $api
      .get("/brand-assets?business_id=" + product.business_id)
      .then(resp => {
        return resp.data.data;
      });

    return {
      product,
      marketer,
      brand_assets
    };
  },
  mounted() {},
  filters: {
    uppercase: function(v) {
      return v.toUpperCase();
    }
  },
  methods: {
    selectVariation(variation_name, variation_item_name) {
      this.variations[variation_name].selected = variation_item_name;
    },
    variationSelectedStyle(variation_name, variation_item_name) {
      const variation = this.variations[variation_name];
      const selected = variation.selected;
      const style = {};
      if (variation && selected === variation_item_name) {
        style["backgroundColor"] = this.primaryColor;
        style["color"] = "white";
      }
      return style;
    },
    chooseVariation() {},
    showImage(image) {
      this.image_in_view = image;
    },
    increaseQuantity() {
      if (this.order.quantity < this.product.qty) {
        this.order.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.order.quantity > 0) {
        this.order.quantity--;
      }
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    triggerPurchase() {
      this.make_purchase = !this.make_purchase;
    },
    alertMe() {
      alert("yeee");
    },
    getClass(color) {
      if (this.variations.color.selected === color) {
        return "chosen-fill";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
body {
  background: url("https://www.toptal.com/designers/subtlepatterns/uploads/groovepaper.png");
}
.image-details {
  height: 100px;
  height: 200ps;
  border: 1px solid grey;
}
.chosen-fill {
  background: $primary;
  border: 1.8px solid $primary;
  color: white;
}
h3 {
  font-size: 15px !important;
  color: $charcoal;
  margin: 8px 0;
}

.section {
  margin: 24px 0;
}

.variations {
  display: grid;
  grid-template-columns: 20% 20% 20% 20%;
  justify-content: space-between;
}

.checkbox {
  position: relative;
  width: 75px;
  height: 40px;
  border: 1.8px solid $charcoal;
  border-radius: 5px;
  padding: 8px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    //background: $primary;
    //border: 2px solid $primary;
    color: $charcoal;
  }

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    visibility: hidden;
  }
}
.container {
  width: 90%;
  margin: auto;
}

.top {
  width: 100%;

  //padding: 16px 24px;

  &__container {
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-columns: 18% 60% 18%;
    justify-content: space-between;
    padding: 16px;
    align-items: center;
    @include media("<=t") {
      grid-template-columns: 100%;
    }
  }

  &__logo {
    font-size: 24px;

    font-weight: 600;
    @include media("<=t") {
      display: flex;
      justify-content: center;
    }
  }

  &__links {
    text-align: center;

    a {
      cursor: pointer;
      margin-right: 16px;
      font-size: 18px;
    }
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    button {
      @include smallbutton;
    }
    @include media("<=t") {
      display: none;
    }
  }
}

.main {
  display: grid;
  width: 90%;
  margin: auto;
  grid-template-columns: 49% 49%;
  justify-content: space-between;
  margin-top: 60px;
  @include media("<=t") {
    grid-template-columns: 100%;
    margin-top: 20px;
  }
  &__pictures {
    &__image {
      width: 100%;
      height: 80%;
      img {
        height: auto;
        width: auto;
        object-fit: cover;
        border-radius: 4px;

        @include media("<=t") {
          height: 100%;
        }
      }
    }

    &__more {
      height: 100px;
      display: grid;
      grid-template-columns: 22% 22% 22% 22%;
      justify-content: space-between;
      margin: 8px 0;

      @include media("<=t") {
        margin: 8px 0;
        margin-bottom: 16px;
      }
      &__item {
        height: 100px;
        width: 100%;
        cursor: pointer;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 5px;
        }
      }
    }
  }

  &__details {
    max-width: 500px;
    &__title {
      h2 {
        font-size: 30px;
        font-weight: 700;
      }
      p {
        font-size: 18px;
        color: $primary;
      }
    }
    &__review {
      display: flex;
      margin: 0px 0 8px 0px;
      align-items: center;
      a {
        color: $primary;
        text-decoration: underline;
        text-decoration-color: $primary;
        display: block;
        line-height: 14px;
      }

      .stars {
        margin-right: 16px;
      }
    }

    &__description {
      color: $charcoal;
      margin: 8px 0;
      line-height: 1.8;
    }
    &__quantity {
      label {
        margin-top: 8px;
        display: block;
        font-size: 18px;
        color: $charcoal;
        margin-bottom: 8px;
      }
      button {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        background: $primary;
        color: white;
      }
      input {
        height: 40px;
        border: 1px solid $charcoal;
        border-radius: 5px;
        text-align: center;
        color: black;
        max-width: 60px;
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: textfield;

        &:focus {
          outline: 0;
        }
      }
    }

    &__offers {
      color: darkgrey;
    }

    &__variations {
      h3 {
        font-size: 18px;
      }
    }

    &__pricing {
      border-top: 1px solid lightgrey;
      border-bottom: 1px solid lightgrey;
      padding: 16px 0px;
      margin: 24px 0;
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      align-items: center;

      &__price {
        margin-right: 24px;
        display: flex;
        font-size: 20px;
        font-weight: 600;
        align-items: flex-start;
        span {
          font-size: 14px;
        }
      }
      &__cta {
        position: relative;
        left: 0;
        top: 0;
        background: $primary;
        font-size: 15px;
        color: white;
        @include smallbutton;
        padding: 8px 36px;
        display: flex;
        align-items: center;
        svg {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
