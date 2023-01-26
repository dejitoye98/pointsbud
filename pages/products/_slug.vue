<template>
  <div class="container">
    <AffleeCheckoutToast :v-show="false" />

    <!-- Purchase Modal -->
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

    <!--- Refunds Modal --->
    <RefundsAlertsModal v-if="somthin" />

    <div class="top">
      <div class="top__container">
        <div class="top__logo">
          <img :src="assets && assets.logo" alt />
        </div>
        <div class="top__links">
          <a
            :style="{'color': primaryColor}"
            :href="assets && assets.website"
            target="_blank"
            v-if="assets && assets.website"
          >Website</a>
          <!--<a
            v-if="product && product.campaign_id"
            :style="{'color': primaryColor}"
            :href="`/shop/${product.campaign_id}`"
          >Shop</a>-->
          <a
            :style="{'color': primaryColor}"
            v-if="reviews && reviews.length > 0"
            @click="scrollIntoView('reviews')"
          >Reviews</a>
        </div>
        <div class="top__actions" v-if="assets.contact_number">
          <div
            class="top__actions__action top__actions__action--call"
            :style="{'backgroundColor': primaryColor}"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.97 17.33C20.97 17.69 20.89 18.06 20.72 18.42C20.55 18.78 20.33 19.12 20.04 19.44C19.55 19.98 19.01 20.37 18.4 20.62C17.8 20.87 17.15 21 16.45 21C15.43 21 14.34 20.76 13.19 20.27C12.04 19.78 10.89 19.12 9.75 18.29C8.6 17.45 7.51 16.52 6.47 15.49C5.44 14.45 4.51 13.36 3.68 12.22C2.86 11.08 2.2 9.94 1.72 8.81C1.24 7.67 1 6.58 1 5.54C1 4.86 1.12 4.21 1.36 3.61C1.6 3 1.98 2.44 2.51 1.94C3.15 1.31 3.85 1 4.59 1C4.87 1 5.15 1.06 5.4 1.18C5.66 1.3 5.89 1.48 6.07 1.74L8.39 5.01C8.57 5.26 8.7 5.49 8.79 5.71C8.88 5.92 8.93 6.13 8.93 6.32C8.93 6.56 8.86 6.8 8.72 7.03C8.59 7.26 8.4 7.5 8.16 7.74L7.4 8.53C7.29 8.64 7.24 8.77 7.24 8.93C7.24 9.01 7.25 9.08 7.27 9.16C7.3 9.24 7.33 9.3 7.35 9.36C7.53 9.69 7.84 10.12 8.28 10.64C8.73 11.16 9.21 11.69 9.73 12.22C10.27 12.75 10.79 13.24 11.32 13.69C11.84 14.13 12.27 14.43 12.61 14.61C12.66 14.63 12.72 14.66 12.79 14.69C12.87 14.72 12.95 14.73 13.04 14.73C13.21 14.73 13.34 14.67 13.45 14.56L14.21 13.81C14.46 13.56 14.7 13.37 14.93 13.25C15.16 13.11 15.39 13.04 15.64 13.04C15.83 13.04 16.03 13.08 16.25 13.17C16.47 13.26 16.7 13.39 16.95 13.56L20.26 15.91C20.52 16.09 20.7 16.3 20.81 16.55C20.91 16.8 20.97 17.05 20.97 17.33Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
            </svg>
            <p>Call business</p>
          </div>
          <!--<button :style="{'backgroundColor': primaryColor}">Is this safe?</button>-->
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
    <div class="features" v-if="productFeatures && productFeatures.length > 0">
      <div class="section-title">
        <h2>Features</h2>
      </div>
      <div class="features__container">
        <ul>
          <li
            class="features__item"
            v-for="(feature, index) in productFeatures"
            :key="index"
          >{{feature}}</li>
        </ul>
      </div>
    </div>
    <div class="delivery" v-if="deliveryDetails && deliveryDetails.length > 0">
      <div class="section-title">
        <h2>Delivery Details</h2>
      </div>
      <div class="delivery__container">
        <div class="delivery__item" v-for="(detail, index) in deliveryDetails" :key="index">
          <p class="delivery__item__name">{{detail.name}}:</p>
          <p class="delivery__item__value">{{detail.value}}</p>
        </div>
      </div>
    </div>
    <div class="reviews" id="reviews" v-if="reviews && reviews.length > 0">
      <div class="section-title">
        <h2>Reviews</h2>
      </div>
      <div class="reviews__container">
        <div class="review" v-for="(review, index) in reviews" :key="index">
          <div class="review__container">
            <no-ssr>
              <star-rating
                star-size="15"
                :show-rating="false"
                v-model="product.rating || 0"
                :read-only="true"
              />
            </no-ssr>
            <p class="review__comment">
              <TruncatedText :text="review.comment" limit="300"></TruncatedText>
            </p>
            <div class="review__author">
              <img
                src="https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg"
                alt
              />
              <p class="review__author__name">{{review.customer.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import StarRating from "vue-star-rating";

export default {
  layout: "customer-dashboard",
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
    },
    productFeatures() {
      return JSON.parse(this.product.meta);
    },
    deliveryDetails() {
      return JSON.parse(this.product.delivery_details);
    }
  },
  watch: {},
  data() {
    return {
      make_purchase: false,
      reviews: null,
      variations: {
        /*color: {
          items: [
            { name: "Green", images: [] },
            { name: "Pink", images: [] }
          ],
          selected: ""
        },*/
        /*size: {
          items: [],
          selected: ""
        }*/
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
    let triggered_order,
      triggered_customer = null;

    if (route.query.intent === "order") {
      const order_id = route.query.order_id;
      // get the order
      await $api.get("/customers/orders/" + order_id).then(resp => {
        triggered_order = resp.data.data.order;
        triggered_customer = resp.data.data.customer;
      });
    }

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
      brand_assets,
      triggered_order,
      triggered_customer
    };
  },
  mounted() {
    if (this.triggered_order) {
      // if an order triggered page reload, start the checkout
      FlutterwaveCheckout({
        public_key:
          process.env.FLW_PUBLIC_KEY ||
          "FLWPUBK_TEST-ad1d316f90548fca239af66bd32bd954-X",
        tx_ref: `aftx_${Date.now()}`,
        amount: this.triggered_order.amount_paid,
        currency: "NGN",
        payment_options: "card, banktransfer, ussd",
        //redirect_url: "https://ae83-102-89-45-99.ngrok.io/api/v1/transactions/verify-flw",
        meta: {
          //customer_id: this.userDetails.business ? this.userDetails.business.id : this.userDetails.id,
          //is_business: this.userDetails.business? 1 : 0
          order_id: this.triggered_order.id
        },
        narration: `Purchase ${this.triggered_order.name ||
          "Product " + this.triggered_order.id}`,
        customer: {
          email: this.triggered_customer.email,
          phone_number: this.triggered_customer.phone,
          name: this.triggered_customer.name
        },
        customizations: {
          title: "Afflee",
          logo:
            "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg"
        },
        callback: data => {
          //this.$store.commit('dashboard/setActionFundWallet', false);
          let payload = {
            type: "purchase",
            referrer: this.$route.query.referrer || this.$route.query.ref,
            order_id: this.triggered_order.id,
            product_id: this.triggered_order.product_id,
            ...data
          };
          this.$api.post("/transactions/verify-flw", payload);
        }
      });
    }
  },
  filters: {
    uppercase: function(v) {
      return v.toUpperCase();
    }
  },
  created() {
    this.getReviews();
  },
  methods: {
    callBusinessPhone() {
      const phone = this.assets.contact_number;
      if (phone) {
        window.open(this.assets.contact_number);
      }
    },
    scrollIntoView(element) {
      document.querySelector("#" + element).scrollIntoView({
        behavior: "smooth"
      });
    },
    getReviews() {
      this.$api.get(`products/${this.product.id}/reviews`).then(resp => {
        this.reviews = resp.data.data.list;
      });
    },
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
  padding-bottom: 150px;
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
      //display: none;
      justify-content: center;
      margin-top: 16px;
    }
    &__action {
      @include smallbutton;
      display: flex;
      align-items: center;
      color: white;
      font-weight: 500;
      svg {
        margin-right: 2px;
        path {
          stroke: white;
        }
      }
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
      height: max-content;

      @include media("<=t") {
        height: 500px;
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 4px;

        @include media("<=t") {
          height: 100%;
          object-fit: contain;
        }
      }
      @include media("<=t") {
        /// height: 300px;
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
      display: flex;
      justify-content: center;
      font-size: 14px;
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

.reviews {
  width: 90%;
  margin: auto;
  &__container {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: space-between;
    @include media("<=t") {
      grid-template-columns: 100%;
      justify-content: space-between;
    }
  }

  .review {
    @include card;
    @include media("<=t") {
      margin-bottom: 8px;
    }
    &__container {
      padding: 16px;
    }
    &__comment {
      font-size: 14px;
      color: black;
      margin: 8px 0;
      font-weight: 400;
    }
    &__author {
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 8px;
      }
      &__name {
        font-size: 14px;
        font-weight: 400;
        color: $charcoal;
      }
    }
  }
}

.grid {
  display: grid;
  width: 90%;
  margin: auto;
  padding: 16px 0;
  &-half {
    grid-template-columns: 49% 49%;
    justify-content: space-between;
  }
}

.section-title {
  font-size: 18px;
  color: $faint;
  margin-bottom: 4px;
}

.features {
  width: 90%;
  margin: auto;
  margin-bottom: 32px;
  margin-top: 32px;
  &__container {
    padding: 16px;
    @include card;
    box-shadow: 0;
  }
  ul {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: space-between;

    @include media("<=t") {
      grid-template-columns: 49% 49%;
    }
  }
  &__item {
    color: $charcoal;
    font-size: 15px;
    list-style-type: disc;
    margin-bottom: 8px;
    //font-weight: 500;
    line-height: 1.4;
    margin-left: 21px;
  }
}

.delivery {
  width: 90%;
  margin: auto;
  margin-bottom: 32px;
  margin-top: 32px;
  &__container {
    @include card;
    padding: 16px;
  }
  &__item {
    display: flex;
    font-size: 15px;

    p {
      &:first-of-type {
        margin-right: 8px;
      }
      &:last-of-type {
        color: $charcoal;
      }
    }

    //justify-content: space-between;
  }
}
</style>
