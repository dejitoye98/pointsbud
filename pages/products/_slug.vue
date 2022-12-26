<template>
  <div class="page">
    <Modal title="Order Form" v-if="show_modal" classes="full-mask half-body" @close="closeModal">
      <div class="form">
        <div class="form-input" v-for="(input, index) in product.order_forms" :key="index">
          <label>{{input.field_name}}</label>
          <input
            :type="input.field_type"
            v-model="form[input.field_alias]"
            v-if="['one-choice option', 'multi-choice']"
          />
          <select v-if="input.field_type === 'one-choice option'">
            <option
              v-for="(option, index) in JSON.parse(input.field_options)"
              :key="index"
            >{{option}}</option>
          </select>
        </div>
        <div class="form-cta">
          <button @click="createOrder">Continue Purchase</button>
        </div>
      </div>
    </Modal>
    <div class="header">
      <div class="header__container">
        <div class="logo">
          <Logo />
        </div>
      </div>
    </div>

    <div class="product" v-if="product && Object.keys(product).length > 0">
      <div class="product__header">
        <div class="product__images">
          <div class="product__images__thumbnail">
            <img :src="product.thumbnail" alt />
          </div>

          <div class="product__images__items" v-if="productImages && productImages.length > 0">
            <div
              class="product__images__items__item"
              v-for="(image, index) in productImages"
              :key="index"
            >
              <img :src="image" alt />
            </div>
          </div>
        </div>

        <div class="product__details">
          <div class="product__details__name">
            <p>{{product.name}}</p>
            <p>
              by
              <span>{{product.business.name}}</span>
            </p>
          </div>

          <div class="product__details__description">
            <p>{{product.description}}</p>
          </div>

          <div class="product__choosequantity">
            <div class @click="decreaseQty">-</div>
            <input type="number" v-model="qty" />
            <div class @click="increaseQty">+</div>
          </div>
          <div class="product__ctas">
            <div class="product__price">
              <p>NGN {{formatMoney(computedPrice)}}</p>
            </div>

            <div class="product__btn" @click="showModal">
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
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 8H21"
                  stroke="white"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p>Purchase</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tabbed-content">
      <div class="tabbed-content__container">
        <div class="tabbed-content__tab">
          <div
            class="tab"
            @click="activeTab = tab"
            :class="[activeTab === tab ? 'selected' : '']"
            v-for="(tab, index) in tabs"
            :key="index"
          >
            <p>{{tab}}</p>
          </div>
        </div>

        <div class="tabbed-content__body" v-if="activeTab === 'Description'">
          <div class>{{product.description}}</div>
        </div>
        <div class="tabbed-content__body" v-if="activeTab === 'Features'">
          <div class="tab-content__body__item tab-content__body__item--features">
            <ul>
              <li v-for="(f, index) in productFeatures" :key="index">{{f}}</li>
            </ul>
          </div>
        </div>
        <div class="tabbed-content__body" v-if="activeTab === 'Delivery Details'">
          <div class="tab-content__body__item tab-content__body__item--delivery">
            <div
              v-for="(d, index) in productDeliveryDetails"
              :key="index"
              style="margin-bottom: 16px"
            >
              <label style="font-weight:800">{{d.name}}</label>
              <p>{{d.value}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import Logo from "../../components/Logo";
import Modal from "../../components/Modal";
export default {
  components: {
    Logo
  },
  created() {
    this.getProduct();
  },
  computed: {
    productFeatures() {
      if (this.product && this.product.meta) {
        const features = JSON.parse(this.product.meta);
        return features;
      }
      return [];
    },
    computedPrice() {
      if (this.product) {
        if (this.qty === 1) {
          return this.product.unitprice;
        } else {
          return parseFloat(
            parseFloat(this.product.unitprice) * this.qty
          ).toFixed(2);
        }
      }
    },
    productImages() {
      if (this.product && this.product.images)
        return JSON.parse(this.product.images);
    },
    productDeliveryDetails() {
      if (this.product && this.product.delivery_details) {
        return JSON.parse(this.product.delivery_details);
      } else {
        return [];
      }
    }
  },

  data() {
    return {
      activeTab: "Description",
      tabs: ["Description", "Features", "Delivery Details"],
      /*images: [
                "https://media-cdn.tripadvisor.com/media/photo-w/15/db/e4/ae/photo0jpg.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-o/19/e8/66/c9/img-20191030-wa0014-largejpg.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-o/1b/12/2e/03/chicken.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-w/1b/1e/8b/89/photo0jpg.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-o/1b/12/2e/1d/complimentary-nuts.jpg",
            ],*/
      images: [],
      product: {},
      form: {},
      show_modal: false,
      order_created: false,
      order: {},
      qty: 1
    };
  },
  methods: {
    formatMoney(value) {
      return Intl.NumberFormat("en-US").format(value);
    },

    decreaseQty() {
      if (this.qty !== 1) {
        this.qty--;
      }
    },
    increaseQty() {
      this.qty++;
    },
    createOrder() {
      const payload = {
        form: this.form,
        product_id: this.product.id,
        amount_paid: this.product.unitprice,
        redir_link: this.$route.query.ref,
        referrer: this.$route.query.referrer,
        qty: 1
      };
      this.$api
        .post(`/products/${this.product.id}/order`, payload)
        .then(resp => {
          this.order_created = false;
          this.show_modal = false;
          this.order = resp.data.data;

          this.continuePurchase();
        });
    },
    populateFormDetails() {
      if (this.product && this.product.order_forms) {
        this.product.order_forms.forEach(field => {
          this.form[field.field_alias] = "";
        });
      }
    },
    continuePurchase() {
      //this.createOrder()
      FlutterwaveCheckout({
        public_key:
          process.env.FLW_PUBLIC_KEY ||
          "FLWPUBK_TEST-ad1d316f90548fca239af66bd32bd954-X",
        tx_ref: `aftx_${Date.now()}`,
        amount: this.product.unitprice,
        currency: "NGN",
        payment_options: "card, banktransfer, ussd",
        //redirect_url: "https://ae83-102-89-45-99.ngrok.io/api/v1/transactions/verify-flw",
        meta: {
          //customer_id: this.userDetails.business ? this.userDetails.business.id : this.userDetails.id,
          //is_business: this.userDetails.business? 1 : 0
          order_id: this.order_id
        },
        narration: `Purchase ${this.product.name}`,
        customer: {
          email: this.form.email || this.form["Email Address"],
          phone_number: this.form.phone_number,
          name: this.form["Full Name"]
            ? this.form["Full Name"]
            : this.form.first_name + this.form.last_name
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
            referrer: this.$route.query.referrer,
            order_id: this.order.id,
            ...data
          };
          this.$api.post("/transactions/verify-flw", payload);
        }
      });
      //let payload = {type: 'purchase', order_id: this.order.id, ...{}}

      //this.$api.post('/transactions/verify-flw', payload)
    },
    showModal() {
      this.show_modal = true;
    },
    closeModal() {
      this.show_modal = false;
    },
    getProduct() {
      const slug = this.$route.params.slug;
      this.$api
        .get("/products/pub/" + slug)
        .then(product => {
          this.product = product.data.data;
          this.populateFormDetails();
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.form-cta {
  button {
    @include largebutton;
    width: 100%;
    margin-top: 16px;
  }
}
.form-input {
  @include form-input;
}
.selected {
  p {
    color: $primary !important;
  }
  border-bottom: 2px solid $primary;
}
.tabbed-content {
  ///width: 70%;

  &__container {
    width: 70%;
    margin: auto;
    @include media("<=t") {
      width: 95%;
    }
  }
  &__tab {
    width: 100%;
    margin: auto;
    display: grid;
    grid-template-columns: 24% 24% 24% 24%;
    justify-content: center;
    border-bottom: 2px solid rgba(211, 211, 211, 0.263);

    @include media("<=t") {
      grid-template-columns: 45% 45%;
      justify-content: space-between;
    }
  }

  .tab {
    cursor: pointer;
    padding: 24px 0;
    p {
      text-align: center;
      @include media("<=t") {
      }
      color: $faint;
      font-size: 14px;
    }
    //border-bottom: 1px solid $darkshade;
  }

  &__body {
    padding: 36px;
    color: $faint;
    font-size: 15px;
    font-weight: 300;
    line-height: 30px;
    text-align: justify;

    &__item {
      &--features {
        ul {
        }
      }
      &--delivery {
        div {
          label {
            font-weight: 700;
          }
        }
      }
    }
  }
}
.header {
  //width: 80%;
  //margin: auto;
  padding: 16px 0;
  background: #9ab2b611;
  //border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);

  &__container {
    @include container;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.logo {
  //margin-bottom: 40px;
  cursor: pointer;
  padding: 0 36px;

  img {
    object-fit: contain;
    height: auto;
    margin: auto;
    margin-bottom: 50px;
    width: 120px !important;
    margin: 0;
  }
}

.product {
  background: #9ab2b611;
  padding: 0 72px;
  //border-bottom: 1px solid grey;

  justify-content: space-between;

  @include media("<=t") {
    padding: 0 32px;

    margin: auto;
  }

  &__choosequantity {
    display: flex;
    align-items: center;
    div {
      font-size: 20px;
      cursor: pointer;
      margin-left: 16px;
      &:first-of-type {
        margin-right: 16px;
        margin-left: 0;
      }
    }

    input {
      border: 0.5px solid lightgrey;
      border-radius: 8px;
      background: white;
      height: 50px;
      padding: 8px 10px;
      text-align: center;
    }
  }

  &__btn {
    @include largebutton;
    position: relative;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;

    @include media("<=t") {
      width: 200px;
    }
    &:hover {
    }

    svg {
      margin-right: 16px;
    }
  }

  &__price {
    color: $charcoal;
    font-weight: 500;
    font-size: 36px;
    @include media("<=t") {
      font-size: 20px;
      margin-bottom: 16px;
    }
  }

  &__ctas {
    //justify-content: space-between;
    margin-top: 50px;
    display: flex;
    align-items: center;
    @include media("<=t") {
      flex-direction: column;
      align-items: flex-start;
    }
    button {
      @include largebutton;
      border-radius: 50px;
      font-size: 50px !important;
      width: 300px;
      margin-top: -30px;
    }
  }
  &__price {
    margin-right: 64px;
  }

  &__header {
    min-height: 500px;
    //border: 1px solid grey;
    width: 100%;
    //border: 1px solid grey;
    padding-top: 100px;
    display: grid;
    padding-bottom: 100px;
    grid-template-columns: 45% 45%;
    justify-content: space-between;

    @include media("<=t") {
      display: grid;
      grid-template-columns: 100%;
    }

    //margin: auto;
  }

  &__images {
    &__thumbnail {
      // border: 1px solid grey;
      width: 100%;
      height: 450px;
      margin-bottom: 30px;
      display: flex;
      justify-content: flex-start;

      @include media("<=t") {
        height: 300px;
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }

    &__items {
      //border: 1px solid grey;
      display: grid;
      grid-template-columns: 15% 15% 15% 15% 15%;
      //justify-content: space-between;
      justify-content: flex-start;
      //border: 1px solid grey;
      //@debugheight: 150px;
      @include media("<=t") {
        grid-template-columns: 29% 29% 29%;
        justify-content: space-between;
      }
      &__item {
        margin-bottom: 20px;
        height: 100px;
        img {
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
        }
      }
    }
  }

  &__details {
    &__name {
      p {
        font-size: 30px;
        font-weight: 500;
        color: $charcoal;

        &:last-of-type {
          font-size: 15px;
        }
      }

      span {
        color: $primary;
      }
    }

    &__description {
      font-size: 15px;
      font-weight: 300;
      margin-top: 30px;
      margin-bottom: 30px;
      color: $charcoal;
    }

    &__options {
      display: grid;
      grid-template-columns: 30% 30% 30%;
      justify-content: space-between;
      select {
        border: 1px solid rgba(211, 211, 211, 0.333);
        padding: 16px;
        color: $faint;
        font-size: 14px;
        border-radius: 5px;
        font-weight: 300;
      }
    }
  }
}
</style>

