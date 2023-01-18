<template>
  <div class="reservations">
    <div class="reservations__container">
      <div class="reservation">
        <template v-if="step === 1">
          <div class="reservation__plan">
            <div class="reservation__plan__header header">
              <p>Campaign Details</p>
            </div>
          </div>
          <div class="reservation__form">
            <div class="reservation__form__container">
              <div class="form-input">
                <label for>Title</label>
                <input type="text" v-model="campaign.title" />
              </div>
              <div class="form-input form-inpu">
                <label for>Description</label>
                <textarea v-model="campaign.description"></textarea>
              </div>
              <div class="form-input form-inpu">
                <label for>Advert Note</label>
                <textarea v-model="campaign.advert_note"></textarea>
              </div>
              <div class="form-input form-input--half">
                <label for>Marketer Commission</label>
                <input type="number" v-model="campaign.pay_per_sale" />
              </div>
              <div class="form-input form-input--half">
                <label for>Marketer Commission Type</label>
                <select v-model="campaign.pay_per_sale_type">
                  <option value="flat">Flat</option>
                  <option value="percent">Percent</option>
                </select>
              </div>

              <div class="form-input form-input--half">
                <label for>No. of Marketers Required</label>
                <input type="number" v-model="campaign.marketers_required" />
              </div>
              <div class="form-input form-input--half">
                <label for>End Date</label>
                <DatePicker v-model="campaign.ends_at" />
              </div>
              <ImageUpload
                product_index="1"
                image_index="1"
                @onImageUploaded="thumbnailUploaded"
                label="Upload Display Picture"
              />
            </div>
          </div>
        </template>
        <template v-if="step === 2">
          <div class="reservation__plan">
            <div class="reservation__plan__header header">
              <p>Reservation Plan</p>
            </div>
            <div class="reservation__form">
              <div class="reservation__form__container">
                <div class="form-input form-input--half">
                  <label for>Name</label>

                  <input v-model="reservation_plan.name" />
                </div>

                <div class="form-input form-input--half">
                  <label for>Type</label>

                  <select for>
                    <option v-for="(type, index) in model.plan_types" :key="index">{{type}}</option>
                  </select>
                </div>

                <div class style="margin-bottom: 16px;">
                  <label
                    for
                    style="font-size: 15px; color: darkgrey; font-weight: 400;color: darkgrey;"
                  >Availability Days</label>
                  <div class="days-grid">
                    <label
                      class="radio-label"
                      for="availability-days"
                      v-for="(day, index) in model.days"
                      :key="index"
                    >
                      <input
                        @change="addReservationPlanDays(day)"
                        name="availability-days"
                        type="checkbox"
                        :checked="reservation_plan.days.includes(day)"
                      />
                      <div class="radio-indicator"></div>
                      <div class="radio-text">{{day}}</div>
                    </label>
                  </div>
                </div>

                <div class="form-input form-input--half">
                  <label for>Opening Hour</label>

                  <select for v-model="reservation_plan.available_from">
                    <option v-for="(hour, index) in model.hours" :key="index">{{hour}}</option>
                  </select>
                </div>
                <div class="form-input form-input--half">
                  <label for>Closing Hour</label>
                  <select for v-model="reservation_plan.available_to">
                    <option v-for="(hour, index) in model.hours" :key="index">{{hour}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!--- Space --->

        <template v-if="step === 3">
          <div class="reservation__plan">
            <div class="reservation__plan__header header">
              <p>Reservation Spaces</p>
            </div>
            <div
              class="reservation__form"
              v-for="(space, index) in reservation_spaces"
              :key="index"
            >
              <div class="reservation__form__container">
                <div class="form-input form-input--half">
                  <label for>Name</label>

                  <input v-model="reservation_spaces[index].name" />
                </div>

                <div class="form-input form-input--half">
                  <label for>Type</label>
                  <select v-model="reservation_spaces[index].type">
                    <option v-for="(type, index) in model.space_types" :key="index">{{type}}</option>
                  </select>
                </div>
                <div class="form-input form-input--half">
                  <label for>Quantity</label>
                  <input type="number" v-model="reservation_spaces[index].quantity" />
                </div>
                <div class="form-input form-input--half">
                  <label for>Price</label>
                  <input type="number" v-model="reservation_spaces[index].price" />
                </div>
                <div class="form-input form-input">
                  <label for>Extra Information</label>
                  <textarea type="text" v-model="reservation_spaces[index].meta.extra_info"></textarea>
                </div>
                <div class="form-input form-input--half">
                  <ImageUpload
                    :product_index="index"
                    image_index="1"
                    @onImageUploaded="uploadSpaceImage"
                    label="Upload Space Photo"
                  />
                </div>
                <div class="form-input form-input">
                  <label for>Features</label>
                  <div
                    style="margin-bottom: 8px; display: flex; justify-content: space-between"
                    v-for="(feature, f_index) in reservation_spaces[index].meta.features"
                    :key="f_index"
                  >
                    <input type="text" v-model="reservation_spaces[index].meta.features[f_index]" />
                  </div>
                  <div>
                    <span class="add" @click="addFeature(index)">Add Feature</span>
                  </div>
                </div>
              </div>
            </div>

            <div class>
              <span class="add add--space" @click="addReservationSpace">Add Another Space</span>
            </div>
          </div>
        </template>
        <div class="cta">
          <button class="cta__back" v-if="step !== 1" @click="goPrevious">Back</button>
          <button class="cta__next" v-if="step !==3" @click="goNext">Next</button>
          <button class="cta__next" v-else-if="step === 3" @click="createCampaign">Create Campaign</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components: {
    DatePicker
  },
  data() {
    return {
      step: 1,
      model: {
        plan_types: ["Restaurant"],
        space_types: ["Seat", "Table", "Room", "Apartment"],
        days: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        hours: [
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
        ]
      },
      campaign: {},
      reservation_plan: {
        days: [],
        name: "",
        type: "",
        available_from: "",
        available_to: "",
        availability_days: []
      },
      reservation_spaces: [
        {
          name: "",
          type: "",
          price: "",
          quantity: 1,
          image: "",
          meta: {
            extra_info: "",
            features: [""]
          }
        }
      ]
    };
  },
  methods: {
    uploadSpaceImage(meta) {
      this.reservation_spaces[meta.product_index].image = meta.image;
    },
    createCampaign() {
      const payload = {
        ...this.campaign,
        reservation_spaces: this.reservation_spaces,
        reservation_plan: this.reservation_plan
      };
      this.$api
        .post("/campaigns", payload)
        .then(resp => {
          /* this.loading = false;

          this.show_success_modal = true;
          //this.$router.push('/dashboard/campaigns')
          this.$store.dispatch("dashboard/actionShowSuccessToast", {
            message: "Campaign was successfully created"
          });*/
        })
        .catch(err => {
          this.loading = false;
          const error = (err.response && err.response.data.data) || err;
          this.$store.dispatch("dashboard/actionShowErrorToast", {
            message: err
          });
        });
    },
    thumbnailUploaded(meta) {
      this.campaign.thumbnail = meta.image;
    },
    addReservationSpace() {
      this.reservation_spaces.push({
        name: "",
        type: "",
        quantity: 1,
        meta: {
          extra_info: "",
          features: [""]
        }
      });
    },
    addFeature(space_index) {
      this.reservation_spaces[space_index].meta.features.push("");
    },
    addReservationPlanDays(day) {
      if (this.reservation_plan.availability_days.includes(day)) {
        const index = this.reservation_plan.availability_days.indexOf(day);
        this.reservation_plan.availability_days.splice(index, 1);
        return;
      }
      this.reservation_plan.availability_days.push(day);
    },
    goPrevious() {
      if (this.step !== 1) {
        this.step--;
      }
    },
    goNext() {
      if (this.step !== 3) {
        this.step++;
      }
    },
    validateStep() {
      if (this.step === 1) {
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  color: $faint;
  font-size: 24px;
  margin-bottom: 16px;
}

.add {
  color: $primary;
  font-size: 14px;
  cursor: pointer;

  &--space {
    display: block;
    margin-top: 16px;
  }
}

.days-grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.radio-label {
  @include radio-label;
}
.form-input {
  @include plain-form-input;
  width: 100%;

  &--half {
    width: 45%;
  }
}
.reservations {
  &__container {
    padding: 50px 120px;
  }
}
.cta {
  display: flex;
  justify-content: flex-end;

  button {
    @include smallbutton;
    margin-top: 16px;
    &:first-of-type {
      margin-right: 16px;
    }
  }
  &__next {
    margin-right: 0 !important;
  }

  &__back {
    background: white !important;
    border: lightgrey 1px solid !important;
    color: $faint !important;
  }
}
.reservation {
  &__plan {
    &__header {
    }
  }
  &__form {
    background: white;
    border-radius: 2px;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    border: 0.5px solid rgba(211, 211, 211, 0.442);
    margin-bottom: 20px;

    &__container {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}
</style>