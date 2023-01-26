<template>
  <div class="modal">
    <div class="modal__mask">
      <div class="modal__container">
        <div class="modal__header">
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
                    d="M18.97 22H4.96997C1.96997 22 1.96997 20.65 1.96997 19V18C1.96997 17.45 2.41997 17 2.96997 17H20.97C21.52 17 21.97 17.45 21.97 18V19C21.97 20.65 21.97 22 18.97 22Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.72 13V17H3.27002V13C3.27002 9.16 5.98002 5.95 9.59002 5.18C10.13 5.06 10.69 5 11.27 5H12.72C13.3 5 13.87 5.06 14.41 5.18C18.02 5.96 20.72 9.16 20.72 13Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.5 4.5C14.5 4.74 14.47 4.96 14.41 5.18C13.87 5.06 13.3 5 12.72 5H11.27C10.69 5 10.13 5.06 9.59 5.18C9.53 4.96 9.5 4.74 9.5 4.5C9.5 3.12 10.62 2 12 2C13.38 2 14.5 3.12 14.5 4.5Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 11H9"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="modal__header__text">
                <p>Make Reservation</p>
                <p>Circa Lagos - January 2, 2024</p>
              </div>
            </div>
            <svg
              @click="closeModal"
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
        <div class="modal__body">
          <div class="hour-choice">
            <button type @click="decreaseHours">-</button>
            <p v-if="model.hours === 1">1 hour</p>
            <p v-else>{{model.hours}} hours</p>
            <button type @click="increaseHours">+</button>
          </div>
          <div class="hours">
            <p>
              <span>From {{startTime}} to {{model.to_time}}</span>
            </p>
          </div>

          <div class="form">
            <div class="form-input" v-for="(input, index) in inputs" :key="index">
              <label>{{input.field_name}}</label>
              <input type name v-model="form[input.field_alias]" />
            </div>
          </div>

          <div class="totals">
            <div class="totals__item">
              <p>Price per hour</p>
              <p>NGN {{computedPrice}}</p>
            </div>
            <div class="totals__item">
              <p>Total</p>
              <p>NGN {{computedTotal}}</p>
            </div>
          </div>
        </div>

        <div class="modal__footer">
          <button type @click="closeModal">Cancel</button>
          <button type @click="createOrder">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: [
    "title",
    "width",
    "close",
    "header",
    "classes",
    "inputs",
    "startTime",
    "day",
    "space",
    "plan"
  ],
  data() {
    return {
      show: true,
      times: [
        "12:00 AM",
        "1:00 AM",
        "2:00 AM",
        "3:00 AM",
        "4:00 AM",
        "5:00 AM",
        "6:00 AM",
        "7:00 AM",
        "8:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
        "9:00 PM",
        "10:00 PM",
        "11:00 PM"
      ],
      model: {
        hours: 1,
        from_time: this.startTime,
        to_time: "",
        day: this.day ? moment(this.day).format("YYYY-MM-DD") : null,
        amount: null
      },
      order_created: false,
      order: {},
      form: {}
    };
  },
  computed: {
    computedStyles() {
      const styles = [];
      if (this.width === "half") {
        styles.push("modal__container--half");
      } else if (this.width === "quarter") {
        styles.push("modal__container--quarter");
      }
      return styles;
    },
    computedPrice() {
      const price = this.space.price * this.model.hours;
      this.model.amount = price;
      return Intl.NumberFormat("en-US").format(price);
    },
    computedTotal() {
      return this.computedPrice;
    }
  },
  methods: {
    continue() {
      FlutterwaveCheckout({
        public_key:
          process.env.FLW_PUBLIC_KEY ||
          "FLWPUBK_TEST-ad1d316f90548fca239af66bd32bd954-X",
        tx_ref: `aftxr_${Date.now()}`,
        amount: parseFloat(this.space.price * this.model.hours),
        currency: "NGN",
        payment_options: "card, banktransfer, ussd",
        //redirect_url: "https://ae83-102-89-45-99.ngrok.io/api/v1/transactions/verify-flw",
        meta: {
          //customer_id: this.userDetails.business ? this.userDetails.business.id : this.userDetails.id,
          //is_business: this.userDetails.business? 1 : 0
          order_id: this.order_id
        },
        narration: `Reservation`,
        customer: {
          email:
            this.form.email ||
            this.form.email_address ||
            this.form["Email Address"],
          phone_number: this.form.phone_number,
          name: this.form.full_name
        },
        customizations: {
          title: "Afflee",
          logo:
            "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg"
        },
        callback: data => {
          //this.$store.commit('dashboard/setActionFundWallet', false);
          let payload = {
            type: "reservation",
            referrer: this.$route.query.referrer,
            order_id: this.order.id,
            reservation_plan_id: this.plan.id,
            reservation_space_id: this.space.id,
            reservation: this.model,

            ...data
          };
          this.$api.post("/transactions/verify-flw", payload);
        }
      });
    },
    closeModal() {
      this.$emit("close", true);
    },
    increaseHours() {
      if (this.model.hours !== 5) {
        // index of startTime
        try {
          const proposed = this.model.hours + 1;
          const start_index = this.times.indexOf(this.startTime);
          const new_index = start_index + proposed;
          const end_time = this.times[new_index];
          this.model.to_time = end_time;
          this.model.hours++;
        } catch (e) {
          console.log(e);
        }
      }
    },
    decreaseHours() {
      if (this.model.hours !== 1) {
        // index of startTime
        try {
          const proposed = this.model.hours - 1;
          const start_index = this.times.indexOf(this.startTime);
          const new_index = start_index + proposed;
          const end_time = this.times[new_index];
          this.model.to_time = end_time;
          this.model.hours--;
        } catch (e) {
          console.log(e);
        }
      }
    },
    createOrder() {
      const payload = {
        form: this.form,
        plan_id: this.plan.id,
        amount_paid: parseFloat(this.space.price * this.model.hours),
        redir_link: this.$route.query.ref,
        referrer: this.$route.query.referrer,
        qty: 1
      };
      this.$api
        .post(`/reservations/${this.plan.id}/order`, payload)
        .then(resp => {
          this.order_created = false;
          this.show_modal = false;
          this.order = resp.data.data;

          this.continue();
        });
    }
  },
  created() {
    // default is 1 hour;
    try {
      const start_index = this.times.indexOf(this.startTime);
      const new_index = start_index + 1;
      const end_time = this.times[new_index];
      this.model.to_time = end_time;
    } catch (e) {}
  }
};
</script>
<style lang="scss" scoped>
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
.hour-choice {
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: black;
    font-size: 30px;
    font-weight: 500;
  }
  button {
    border-radius: 5px;
    border: 0.5px solid lightgrey;
    color: black;
    padding: 4px 16px;
    &:first-of-type {
      margin-right: 16px;
    }
    margin-left: 18px;
    &:hover {
    }
  }
}
.hours {
  border-bottom: 2px solid whitesmoke;
  color: $charcoal;
  text-align: center;
  padding-bottom: 16px;
  font-size: 14px;
}
.form {
  padding: 16px 0px;
  border-bottom: 2px solid whitesmoke;
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
  }
}

.totals {
  padding: 16px 0;
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
</style>