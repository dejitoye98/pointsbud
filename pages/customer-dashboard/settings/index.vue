<template>
  <div class="settings">
    <div class="settings__container">
      <div class="settings__side">
        <div
          class="settings__side__item"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="makeActiveTab(tab)"
          :class="getActiveClass(tab)"
        >{{tab}}</div>
      </div>
      <div class="settings__main">
        <!--- Addresses --->
        <template v-if="activeTab === 'Addresses'">
          <div class="settings__main__container">
            <div class="form">
              <div class="form-input">
                <label for>Street</label>
                <input v-model="address.street" for type="text" />
              </div>
              <div class="form-input">
                <label for>City</label>
                <input v-model="address.city" for type="text" />
              </div>
              <div class="form-input">
                <label for>State</label>
                <input v-model="address.state" type="text" />
              </div>
              <div class="form-input">
                <label for>Country</label>
                <input v-model="address.country" disabled type="text" />
              </div>

              <div class="input">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="address.is_primary" />Make primary
                </label>
              </div>

              <button @click="createAddress" :disabled="creating_address">Save</button>
            </div>

            <div class="list" v-if="addresses">
              <div class="addresses">
                <div class="address" v-for="(address, index) in addresses" :key="index">
                  <div class="address__container">
                    <p>{{address.street}}, {{address.city}}, {{address.state}}, {{address.country}}</p>
                    <div class="primary-indicator">
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="activeTab === 'Bank Account'">
          <div class="settings__main__container">
            <div class="form">
              <div class="form-input">
                <label for>Bank Name</label>
                <input for type="text" />
              </div>
              <div class="form-input">
                <label for>Account Number</label>
                <input for type="text" inputmode="number" />
              </div>

              <button>Save</button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "customer-dashboard",
  data() {
    return {
      tabs: ["Addresses", "Bank Account"],
      activeTab: "Addresses",
      addresses: null,
      loading: true,

      address: {
        street: "",
        city: "",
        state: "",
        country: "Nigeria",
        postal_code: "",
        is_primary: false
      },
      creating_address: false
    };
  },
  created() {
    this.$store.commit("customer_dashboard/setActive", "Settings");
    this.getAddresses();
  },

  methods: {
    getAddresses() {
      this.loading = true;
      this.$api
        .get("/customers/addresses")
        .then(resp => {
          this.addresses = resp.data.data;
        })
        .catch(err => {})
        .finally(() => {
          this.loading = false;
        });
    },
    createAddress() {
      this.creating_address = true;
      this.$api
        .post("/customers/addresses", this.address)
        .then(resp => {
          this.getAddresses();
        })
        .catch(err => {})
        .finally(() => {
          this.creating_address = false;
        });
    },
    getActiveClass(tab) {
      if (tab === this.activeTab) {
        return ["active"];
      }
    },
    makeActiveTab(tab) {
      this.activeTab = tab;
    }
  }
};
</script>

<style lang="scss" scoped>
.address {
  padding: 16px;
  background: $dashboard-background-color;
  color: $charcoal;
  font-size: 14px;
}
.input {
  margin-bottom: 16px;
}
.checkbox-label {
  color: $charcoal;
}
input[type="checkbox"] {
  color: $charcoal !important;
  margin-right: 8px;
}
.active {
  background: $primary;
  color: white !important;
}
.form-input {
  @include plain-form-input;
}
.form {
  button {
    @include smallbutton;
  }
}
.settings {
  margin-top: 5vh;

  &__container {
    background: white;
    width: 50%;
    margin: auto;
    display: grid;
    grid-template-columns: 20% 79%;
    justify-content: space-between;
  }

  &__main {
    padding: 16px;
    &__container {
      width: 100%;
      display: grid;
      grid-template-columns: 49% 49%;
      justify-content: space-between;
    }
  }

  &__side {
    min-height: 50vh;
    border-right: 1px solid whitesmoke;

    &__item {
      cursor: pointer;
      padding: 16px;
      color: $charcoal;
      font-size: 15px;
      border: 1px solid whitesmoke;
      &:hover {
        //filter: grayscale(1);
        color: $primary;
      }
    }
  }
}
</style>