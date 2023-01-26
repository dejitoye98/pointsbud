<template>
  <div class="dashboard">
    <div class="nav">
      <h1>Secured by Afflee</h1>
      <div class="nav__logo">
        <!--<Logo style="width: 150px" />-->
      </div>
    </div>
    <div class="dashboard__container">
      <div class="dashboard__top">
        <div class="dashboard__top__container">
          <div class="nav-item" :class="getActiveClass('Orders')" @click="makeActive('Orders')">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 8H21"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Orders</p>
          </div>
          <div class="nav-item" :class="getActiveClass('Refunds')" @click="makeActive('Refunds')">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.57 10.7701L7 9.19012L8.57 7.62012"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p>Refunds</p>
          </div>
          <!---- MESSAGES --->
          <div class="nav-item" :class="getActiveClass('Messages')" @click="makeActive('Messages')">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 18.97H8C4 18.97 2 17.97 2 12.97V7.96997C2 3.96997 4 1.96997 8 1.96997H16C20 1.96997 22 3.96997 22 7.96997V12.97C22 16.97 20 18.97 16 18.97H15.5C15.19 18.97 14.89 19.12 14.7 19.37L13.2 21.37C12.54 22.25 11.46 22.25 10.8 21.37L9.29999 19.37C9.13999 19.15 8.78 18.97 8.5 18.97Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 8.69995L6 10.7L8 12.7"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 8.69995L18 10.7L16 12.7"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 8.37012L11 13.0302"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Messages</p>
          </div>
          <!--- MESSAGES -->
          <div class="nav-item" :class="getActiveClass('Settings')" @click="makeActive('Settings')">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5699 18.5001V14.6001"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5699 7.45V5.5"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.57 12.65C17.0059 12.65 18.17 11.4859 18.17 10.05C18.17 8.61401 17.0059 7.44995 15.57 7.44995C14.134 7.44995 12.97 8.61401 12.97 10.05C12.97 11.4859 14.134 12.65 15.57 12.65Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.43005 18.5V16.55"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.43005 9.4V5.5"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.42996 16.5501C9.8659 16.5501 11.03 15.386 11.03 13.9501C11.03 12.5142 9.8659 11.3501 8.42996 11.3501C6.99402 11.3501 5.82996 12.5142 5.82996 13.9501C5.82996 15.386 6.99402 16.5501 8.42996 16.5501Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Settings</p>
          </div>
        </div>
      </div>

      <div class="dashboard__main">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  min-height: 100vh;
  height: max-content;
  background: $dashboard-background-color;

  &__container {
    margin: 0;
    padding: 0;
  }
  &__top {
    background: white;
    @include card;
    //border-bottom: 0.5px solid rgba(128, 128, 128, 0.178);

    &__container {
      display: grid;
      width: 50%;
      margin: auto;
      grid-template-columns: 23% 23% 23% 23%;
      justify-content: space-between;

      @include media("<=t") {
        width: 90%;
      }
    }
  }
}

.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  //background: #f1f5f8;
  background: white;
  border-bottom: 0.5px solid rgba(211, 211, 211, 0.61);

  h1 {
    font-weight: 500;
  }

  &__logo {
    margin-left: -20px;
  }
}

.nav-item {
  padding: 16px;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $charcoal;

  &:hover {
    background: $dashboard-background-color;
  }

  @include media("<=t") {
    p {
      font-size: 15px;
    }
  }
}

.active {
  color: $primary;
  svg {
    //fill: $primary;
    //stroke: $primary;
    path {
      stroke: $primary !important;
    }
  }
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("customer_dashboard", ["active"])
  },
  methods: {
    goTo(tab) {
      switch (tab) {
        case "Orders":
          this.$router.push("/customer-dashboard/orders");
          break;
        case "Refunds":
          this.$router.push("/customer-dashboard/refunds");
          break;
        case "Messages":
          this.$router.push("/customer-dashboard/messages");
          break;
        case "Settings":
          this.$router.push("/customer-dashboard/settings");
          break;
      }
    },
    getActiveClass(tab) {
      if (this.active === tab) {
        return ["active"];
      }
    },
    makeActive(tab) {
      this.$store.commit("customer_dashboard/setActive", tab);
      this.goTo(tab);
    }
  }
};
</script>