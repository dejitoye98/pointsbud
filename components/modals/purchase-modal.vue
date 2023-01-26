<template>
  <BaseModal @close="$emit('close', true)">
    <template #body>
      <div class="body" @click.stop>
        <div class="modal__header">
          <div class="modal__header__container">
            <div class="modal__header__container">
              <div style="display: flex;">
                <div class="header-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 8H21"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="modal__header__text">
                  <p>Order Product</p>
                  <p>{{product.name}}</p>
                </div>
              </div>
              <svg
                @close="$emit('close', true)"
                width="16"
                height="16"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L7 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
                <path d="M7 1L1 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <template v-if="!old_customer">
          <div class="form">
            <div class="form-input" v-for="(input, i) in form" :key="i">
              <label>{{input.field_name}}</label>
              <input
                :required="input.is_required"
                v-if="input.field_type === 'text'"
                v-model="order_form[input.field_alias]"
                type="text"
              />
              <select
                v-model="order_form[input.field_alias]"
                :required="input.is_required"
                v-else-if="input.field_type === 'multi-choice option'"
                type="text"
              >
                <option v-for="(option, o) in JSON.parse(input.field_options)" :key="o">{{option}}</option>
              </select>

              <template v-else-if="input.field_type === 'one-choice option'">
                <div class="single-choice">
                  <label
                    class="checkbox"
                    v-for="(option, o) in JSON.parse(input.field_options)"
                    :key="o"
                  >
                    <input type="radio" :value="option" v-model="order_form[input.field_alias]" />
                    {{option}}
                  </label>
                </div>
              </template>
            </div>

            <div class="totals">
              <div class="totals__item">
                <p>Price per hour</p>
                <p>NGN {{product.unitprice | money}}</p>
              </div>
              <div class="totals__item">
                <p>Total</p>
                <p>NGN {{totalPrice | money}}</p>
              </div>
            </div>

            <div class="form__footer">
              <button
                :style="{'backgroundColor': color ? color: ''  }"
                @click="createOrder"
                :disabled="loading"
              >Continue</button>
            </div>
          </div>
        </template>

        <template v-else>
          <p
            class="old-customer-label"
          >You're a registered customer on Afflee. Please enter your password to continue the order</p>
          <div class>
            <div class="form">
              <div class="form-input">
                <label for="password">Password</label>
                <input type="password" v-model="password" />
              </div>

              <button>Login and continue</button>
            </div>
          </div>
        </template>
      </div>
    </template>
  </BaseModal>
</template>

<script>
export default {
  props: [
    "close",
    "form",
    "totalPrice",
    "product",
    "quantity",
    "marketer",
    "color"
  ],
  data() {
    return {
      order_created: false,
      order: null,
      order_form: {},
      loading: false,
      old_customer: false,
      password: ""
    };
  },

  mounted() {
    if (this.form) {
      this.form.forEach(field => {
        this.order_form[field.field_alias] = "";
      });
    }
  },
  methods: {
    login(password) {
      this.loading = true;
      const email =
        this.order_form.email ||
        this.order_form.email_address ||
        this.order_form["Email Address"] ||
        this.order_form["email_address"];
      const payload = {
        password: "" + password,
        email,
        is_customer: true
      };

      this.$store
        .dispatch("auth/login", payload)
        .then(async resp => {
          this.$cookies.remove("aff-token");
          window.localStorage.setItem("aff-token", resp.data.data.token);
          await this.$cookies.set("aff-token", resp.data.data.token);
          const product_slug = this.$route.params.slug;
          let url = `/products/${product_slug}/?intent=order&order_id=${this.order.id}`;
          if (this.$route.query.referrer) {
            url += `&referrer=${this.$route.query.referrer}`;
          }
          if (this.$route.query.ref) {
            url += `&referrer=${this.$route.query.ref}`;
          }
          if (this.$route.query.m_uid) {
            url += `&referrer=${this.$route.query.m_uid}`;
          }
          window.open(url, "_self");
        })
        .catch(err => {})
        .finally(() => {
          this.loading = false;
        });
    },
    createOrder() {
      // validate
      const can_continue = true;
      for (let i = 0; i < Object.keys(this.order_form).length; i++) {
        const key = Object.keys(this.order_form)[i];
        if (!this.order_form[key]) {
          alert("Please enter all fields");
          return;
        }
      }
      // end of validation //
      this.loading = true;
      const payload = {
        form: this.order_form,
        product_id: this.product.id,
        amount_paid: this.product.unitprice,
        redir_link:
          this.$route.query.ref ||
          (this.marketer &&
            this.marketer.redir_links &&
            this.marketer.redir_links[0].redir_link) ||
          this.$route.query.referrer,
        referrer: this.$route.query.referrer,
        qty: this.quantity
      };
      this.$api
        .post(`/products/${this.product.id}/order`, payload)
        .then(resp => {
          this.order_created = true;
          this.show_modal = false;
          this.order = resp.data.data.order;
          const is_new_customer = resp.data.data.customer_is_new;

          if (is_new_customer) {
            this.login(resp.data.data.one_time_auth);
          } else {
            this.old_customer = true;
            // this.continuePurchase();
          }
        })
        .catch(err => {
          this.loading = false;
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
        amount: this.totalPrice,
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
          email:
            this.order_form.email ||
            this.order_form.email_address ||
            this.order_form["Email Address"],
          phone_number: this.order_form.phone_number,
          name: this.order_form["Full Name"]
            ? this.order_form["Full Name"]
            : this.order_form.first_name + this.order_form.last_name
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
            product_id: this.product.id,
            ...data
          };
          this.$api.post("/transactions/verify-flw", payload);
        }
      });
      //let payload = {type: 'purchase', order_id: this.order.id, ...{}}

      //this.$api.post('/transactions/verify-flw', payload)
    }
  }
};
</script>

<style lang="scss" scoped>
.old-customer-label {
  display: block;
  width: 90%;
  margin: auto;
  font-size: 13px;
  margin-top: 16px;
  font-weight: 500;
}

.single-choice {
  display: grid;
  grid-template-columns: 20% 20% 20% 20%;
}
.chosen-fill {
  background: $primary;
  border: 1.8px solid $primary;
  color: white;
}
.checkbox {
  position: relative;
  width: 75px;
  height: 40px;
  border: 1.8px solid $charcoal;
  border-radius: 5px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background: $primary;
    border: 2px solid $primary;
    color: white;
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
.form {
  padding: 16px 0px;
  border-bottom: 2px solid whitesmoke;
  width: 90%;
  margin: auto;

  &__footer {
    display: flex;
    justify-content: flex-end;
    button {
      @include smallbutton;
      background: $primary;
    }
  }
  button {
    @include smallbutton;
  }
}
.form-input {
  @include plain-form-input;
  label {
    color: $charcoal;
    font-size: 14px;
  }
  input {
    background: white;
    border: 2px solid whitesmoke !important;

    &:focus {
      outline: 0;
      border: 0;
    }
  }
}

.totals {
  padding: 16px;
  &__item {
    margin-bottom: 8px;
    color: black;
    display: flex;
    justify-content: space-between;
    font-size: 14px;

    p {
      &:first-of-type {
        font-weight: 500;
        color: black;
      }
      color: $charcoal;
      font-weight: 500;
    }
  }
}

.body {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  &__text {
    text-align: center;
    font-size: 15px;
  }
  &__implication {
    font-size: 14px;
    text-align: center;
  }

  &__header {
    font-size: 18px;
    font-weight: 400;
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.27);

    &__container {
      width: 90%;
      margin: auto;
      padding: 16px 0;
    }

    &__caption {
      font-size: 15px;
      color: $charcoal;
    }
  }
}
.footer {
  &__container {
    display: flex;
    justify-content: flex-end;
    padding: 16px;

    button {
      @include smallbutton;
      &:first-of-type {
        background: white;
        margin-right: 8px;
        color: rgb(27, 31, 35);
      }
    }
  }
}

.modal {
  z-index: 10000000000000;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;

  &__mask {
    width: 100vw;
    height: 100%;
    padding: 64px 0;
    position: fixed;
    //margin-left: 120px;
    background-color: rgba(0, 0, 0, 0.612);
    overflow: scroll;

    @include media("<=dashbreak") {
      margin-left: 0 !important;
    }
  }

  &__header {
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.27);

    &__container {
      width: 95%;
      margin: auto;
      padding: 16px 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      svg {
        cursor: pointer;
      }
    }
    &__text {
      p {
        &:first-of-type {
          font-size: 16px;
          color: black;
          font-weight: 500;
        }
        font-size: 14px;
        color: $faint;
      }
      // text-transform: uppercase;
    }
  }

  &__container {
    width: 30%;
    background: white;
    min-height: auto;
    margin: auto;
    //margin-top: 50px;
    margin-top: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
    border-radius: 5px;
    @include media("<=t") {
      width: 90% !important;
    }

    &--half {
      width: 50% !important;
    }

    &--quarter {
      width: 25% !important;
    }
  }

  &__body {
    width: 95%;
    margin: auto;
    padding: 16px 0;
  }

  &__footer {
    padding: 16px;
    justify-content: space-between;
    display: grid;
    grid-template-columns: 49% 49%;
    border-top: 2px solid whitesmoke;

    button {
      @include smallbutton;
      font-weight: 400 !important;
      &:first-of-type {
        background: white;
        color: $charcoal;
        border: 1.5px solid lightgrey;
      }

      &:hover {
        transform: translateY(0);
        box-shadow: rgba(0, 0, 0, 0.1) 0 2px 2px;
      }
    }
  }
}
.header-icon {
  border: 1px solid whitesmoke;
  padding: 8px;
  border-radius: 5px;
  margin-right: 16px;
}
</style>